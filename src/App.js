// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import HomePage from './components/HomePage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Cart from './components/Cart';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CSS/App.css';
import './CSS/Menu.css';
import './CSS/Cart.css';
import './CSS/Footer.css';

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
    setCartItems(prevItems => [
      ...prevItems,
      { ...item, spiceLevel: item.spiceLevel, specialNote: item.notes, quantity: item.quantity, uniqueId: uuidv4() }
    ]);
  };

  const removeFromCart = (uniqueId) => {
    setCartItems(prevItems => prevItems.filter(item => item.uniqueId !== uniqueId));
  };

  const handleUpdateQuantity = (uniqueId, change) => {
    setCartItems(prevItems => prevItems.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, quantity: Math.max(item.quantity + change, 1) };
      }
      return item;
    }));
  };

  const toggleCart = () => {
    setShowCart(prevState => !prevState);
  };

  const handleCheckout = () => {
    alert('Checkout is not yet implemented.');
  };

  return (
    <Router>
      <div className="App">
        <Header
          isLoggedIn={isLoggedIn}
          onShowLogin={() => setShowLogin(true)}
          onShowSignup={() => setShowSignup(true)}
          onLogout={handleLogout}
          onShowCart={toggleCart}
        />
        <Container>
          <Routes>
            <Route path="/" element={
              isLoggedIn ? (
                <div>
                  <h1>Welcome, {user.email}</h1>
                  <Menu addToCart={addToCart} />
                </div>
              ) : (
                <HomePage />
              )
            } />
            <Route path="/menu" element={<Menu addToCart={addToCart} />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Container>
        <Footer />
        <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
        <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} handleSignup={handleSignup} />
        <Cart
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
          showCart={showCart}
          onCloseCart={toggleCart}
        />
      </div>
    </Router>
  );
}

export default App;
