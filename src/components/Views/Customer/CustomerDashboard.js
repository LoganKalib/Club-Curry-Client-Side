import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CustomerDashboardHeader from './CustomerDashboardHeader';
import './CustomerCss/CustomerDashboard.css';
import axios from 'axios';
import Cart from './Cart'; // Import Cart component

const CustomerDashboard = ({
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  isLoggedIn,
  onShowLogin,
  onShowSignup,
  bookings = [],
  customerId = null,
  addToCart,
  onLogout,
  customerName = 'Aaniquah', // Default name for the customer
}) => {
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
                image: imageUrl, // Add image URL to the item
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
    </div>
  );
};

export default CustomerDashboard;
