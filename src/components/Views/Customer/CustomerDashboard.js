import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CustomerDashboardHeader from './CustomerDashboardHeader';
import './CustomerCss/CustomerDashboard.css';
import axios from 'axios';
import FAQ from './FAQ';
import Cart from './Cart'; // Import Cart component
import RestaurantDetails from './RestaurantDetails';

const CustomerDashboard = ({
  // cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  isLoggedIn,
  onShowLogin,
  onShowSignup,
  bookings = [],
  customerId = null,
  //addToCart,
  onLogout,
  decodedValue,
  customerName = 'Aaniquah', // Default name for the customer
}) => {
  console.log(decodedValue)
  const [cartItems, setCartItems] = useState([]);
  const [specials, setSpecials] = useState([]); // State to hold specials
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [showCart, setShowCart] = useState(false); // State to control cart modal visibility
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch specials data on component mount
  useEffect(() => {
    const fetchSpecials = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        // Fetch all menu items
        const response = await axios.get('http://localhost:8080/ClubCurry/menuItem/getAll');
        
        // Fetch all menus to get the ID for "Specials"
        const menuResponse = await axios.get('http://localhost:8080/ClubCurry/menu/getAll');
        const specialsMenu = menuResponse.data.find(menu => menu.name === "Specials");
        
        if (specialsMenu) {
          // Filter items belonging to the "Specials" menu
          const specialItems = response.data.filter(item => item.menuId.id === specialsMenu.id);

          // Fetch images for special items
          const specialItemsWithImages = await Promise.all(specialItems.map(async (item) => {
            try {
              const imageResponse = await axios.get(`http://localhost:8080/ClubCurry/image/getByMenuId/${item.id}`, {
                responseType: 'blob', // Expecting binary data
              });
              const imageUrl = URL.createObjectURL(imageResponse.data); // Create object URL for the image
              
              return {
                ...item,
                image: imageUrl, 
              };
            } catch (error) {
              console.error('Error fetching image for item:', item.id, error);
              return {
                ...item,
                image: 'path/to/default/image.png', // Set to default image if fetching fails
              };
            }
          }));

          setSpecials(specialItemsWithImages); // Update state with special items and their images
        } else {
          console.warn('Specials menu not found.');
        }
      } catch (error) {
        setError('Error fetching specials. Please try again later.'); // Set error state
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSpecials();
  }, []);

  const handleViewMenu = () => {
    navigate('/menu'); // Navigate to the Menu route
  };

  // Function to handle adding an item to the cart
  const addToCart = async (item) => {
    const cartItemData = {
      menuItem: {
        id: item.id,  // The ID of the menu item
        name: item.name,  // The name of the menu item
        description: item.description,  // Description of the menu item
        price: item.price,  // Price of the menu item
        menuId: { id: item.menuId.id } // Assuming menuId is an object; adjust if necessary
      },
      quantity: item.quantity || 1, // Default quantity
      note: item.note || 'Add your note', // Optional note, adjust as necessary
      spiceLevel: item.spiceLevel || 'MED', // Use a default spice level if not provided
   
    };

    console.log('Cart Item Data:', cartItemData) // Log cart item data

    try {
      // Call the API to save the cart item
      const response = await axios.post('http://localhost:8080/ClubCurry/cartMenuItems/save', cartItemData);
      console.log('API Response:', response); // Log API response

      if (response.status === 200) {
        // If successful, update local cart items state
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(cartItem => cartItem.menuItem.id === item.id);
          if (existingItem) {
            // Update the quantity if the item already exists
            return prevItems.map(cartItem =>
              cartItem.menuItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }
          // If item doesn't exist, add it to the cart with a quantity of 1
          return [...prevItems, { ...cartItemData }];
        });
        alert('Item added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    }

  }; 
  
  const handleShowCart = () => {
    setShowCart(true); // Show the cart modal
  };

  const handleCloseCart = () => {
    setShowCart(false); // Hide the cart modal
  };
  
  return (
    <div className="customer-dashboard">
      {/* Header Section */}
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} onShowCart={handleShowCart} /> {/* Pass the handleShowCart function */}

      {/* Welcome Section */}
      <div className="welcome-section">
        <h2>Welcome Back, {customerName}!</h2>
        <p>Discover our delicious specials and manage your orders with ease.</p>
        <button onClick={handleViewMenu} className="view-menu-btn">View Menu</button> {/* View Menu Button */}
      </div>

      {/* Specials Section */}
      <div className="menu-section">
        <h3>ClubCurry Specials</h3>
        <div className="menu-grid">
          {loading && <p>Loading specials...</p>} {/* Loading Indicator */}
          {error && <p className="error-message">{error}</p>} {/* Error Message */}
          {specials.length > 0 ? (
            specials.map(item => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: R{item.price}</p>
                  <button onClick={() => addToCart(item)} className="order-now-btn">Order Now</button>
                </div>
                <img src={item.image} alt={item.name} className="menu-item-image" /> {/* Use the object URL for the image */}
              </div>
            ))
          ) : (
            <p>No specials available at the moment. Please check back later!</p>
          )}
        </div>
      </div>

      {/* Cart Modal */}
      <Cart
        cartItems={cartItems}
        onRemoveItem={onRemoveItem}
        onUpdateQuantity={onUpdateQuantity}
        onCheckout={onCheckout}
        showCart={showCart}
        onCloseCart={handleCloseCart}
        isLoggedIn={isLoggedIn}
        onShowLogin={onShowLogin}
        onShowSignup={onShowSignup}
      />
    {/* FAQ Section */}
    <FAQ /> {/* Insert FAQ component here */}

    <RestaurantDetails></RestaurantDetails>

</div>
  );

};

export default CustomerDashboard;
