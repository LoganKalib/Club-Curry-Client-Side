import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import './CustomerCss/CustomerDashboard.css';
import axios from 'axios';
import FAQ from './FAQ';
import Cart from './Cart';
import RestaurantDetails from './RestaurantDetails';

const CustomerDashboard = ({
  customer,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
  isLoggedIn,
  onShowLogin,
  onShowSignup,
  onLogout,
}) => {
  const [cartItems, setCartItems] = useState([]);
  const [specials, setSpecials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecials = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/menuItem/getAll');
        const menuResponse = await axios.get('http://localhost:8080/ClubCurry/menu/getAll');
        const specialsMenu = menuResponse.data.find(menu => menu.name === "Specials");

        if (specialsMenu) {
          const specialItems = response.data.filter(item => item.menuId.id === specialsMenu.id);
          const specialItemsWithImages = await Promise.all(specialItems.map(async (item) => {
            try {
              const imageResponse = await axios.get(`http://localhost:8080/ClubCurry/image/getByMenuId/${item.id}`, {
                responseType: 'blob',
              });
              const imageUrl = URL.createObjectURL(imageResponse.data);
              return { ...item, image: imageUrl };
            } catch (error) {
              console.error('Error fetching image for item:', item.id, error);
              return { ...item, image: 'path/to/default/image.png' };
            }
          }));
          setSpecials(specialItemsWithImages);
        } else {
          console.warn('Specials menu not found.');
        }
      } catch (error) {
        setError('Error fetching specials. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecials();
  }, []);

  const handleViewMenu = () => {
    navigate('/menu');
  };

  const addToCart = async (item) => {
    const cartItemData = {
      menuItem: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        menuId: { id: item.menuId.id },
      },
      quantity: item.quantity || 1,
      note: item.note || 'Add your note',
      spiceLevel: item.spiceLevel || 'MED',
    };

    try {
      const response = await axios.post('http://localhost:8080/ClubCurry/cartMenuItems/save', cartItemData);
      if (response.status === 200) {
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(cartItem => cartItem.menuItem.id === item.id);
          if (existingItem) {
            return prevItems.map(cartItem =>
              cartItem.menuItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          }
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
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <div className="customer-dashboard">
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} onShowCart={handleShowCart} />

      <div className="welcome-section">
        <h2>Welcome Back, {customer ? customer.name : 'Guest'}!</h2>
        <p>Discover our delicious specials and manage your orders with ease.</p>
        <button onClick={handleViewMenu} className="view-menu-btn">View Menu</button>
      </div>

      <div className="menu-section">
        <h3>ClubCurry Specials</h3>
        <div className="menu-grid">
          {loading && <p>Loading specials...</p>}
          {error && <p className="error-message">{error}</p>}
          {specials.length > 0 ? (
            specials.map(item => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <p>Price: R{item.price}</p>
                  <button onClick={() => addToCart(item)} className="order-now-btn">Order Now</button>
                </div>
                <img src={item.image} alt={item.name} className="menu-item-image" />
              </div>
            ))
          ) : (
            <p>No specials available at the moment. Please check back later!</p>
          )}
        </div>
      </div>

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

      <FAQ />
      <RestaurantDetails />
    </div>
  );
};

export default CustomerDashboard;
