import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Cart from './components/Cart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleSignup = (userData) => {
    console.log('User signed up:', userData);
    setIsLoggedIn(true);
    setUser(userData);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const newItem = { ...item, spiceLevel: item.spiceLevel, specialNote: item.notes };
  
      // Create a unique identifier based on item ID, spice level, and notes
      const existingItemIndex = prevItems.findIndex(
        i => i.id === item.id && i.spiceLevel === item.spiceLevel && i.specialNote === item.specialNote
      );
  
      if (existingItemIndex > -1) {
        // Update quantity if item already exists
        return prevItems.map((i, index) =>
          index === existingItemIndex
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      // Add new item to the cart
      return [...prevItems, { ...newItem, quantity: item.quantity }];
    });
  };
  
  
  const removeFromCart = (itemId, specialNote) => {
    setCartItems(prevItems => {
      // Remove item with matching id and specialNote
      const updatedItems = prevItems.filter(item =>
        !(item.id === itemId && item.specialNote === specialNote)
      );
      return updatedItems;
    });
  };
  
  
  

  const toggleCart = () => {
    setShowCart(prevState => !prevState);
  };

  const handleCheckout = () => {
    alert('Checkout is not yet implemented.');
  };
// Example of updating quantity in App.js or your main component
const handleUpdateQuantity = (itemId, specialNote, change) => {
  setCartItems(prevItems => prevItems.map(item => {
    if (item.id === itemId && item.specialNote === specialNote) {
      // Update quantity
      return { ...item, quantity: Math.max(item.quantity + change, 1) };
    }
    return item;
  }));
};
  return (
    <div className="App">
      <Header
        isLoggedIn={isLoggedIn}
        onShowLogin={() => setShowLogin(true)}
        onShowSignup={() => setShowSignup(true)}
        onLogout={handleLogout}
        onShowCart={toggleCart}
      />
      <Container>
        {isLoggedIn ? (
          <div>
            <h1>Welcome, {user.email}</h1>
            <Menu addToCart={addToCart} />
          </div>
        ) : (
          <div>
            <h1>Welcome to Club Curry</h1>
            
          </div>
        )}
      </Container>
      <Footer />
      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} onLogin={handleLogin} />
      <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} onSignup={handleSignup} />
      <Cart
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        showCart={showCart}
        onCloseCart={toggleCart}
      />
    </div>
  );
}

export default App;
