// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import MenuAdmin from './components/MenuAdmin';
import HomePage from './components/HomePage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import Cart from './components/Cart';
import BookingModal from './components/BookingModal'; // Import BookingModal
import { v4 as uuidv4 } from 'uuid';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CSS/App.css';
import './CSS/Menu.css';
import './CSS/Cart.css';
import './CSS/Footer.css';

const ADMIN_CREDENTIALS = {
  username: 'admin@email.com',
  password: 'admin123'
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [showBooking, setShowBooking] = useState(false);

  const handleLogin = (userData, admin = false) => {
    if (admin) {
      if (userData.email === ADMIN_CREDENTIALS.username && userData.password === ADMIN_CREDENTIALS.password) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setUser(userData);
        setShowLogin(false);
        return;
      } else {
        alert('Invalid admin credentials');
        return;
      }
    }

    setIsLoggedIn(true);
    setIsAdmin(false);
    setUser(userData);
    setShowLogin(false);
  };

  const handleSignup = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowSignup(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
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

  const handleBooking = (bookingData) => {
    console.log('Booking Data:', bookingData);
    alert('Booking Confirmed!');
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
          onShowBooking={() => setShowBooking(true)} // Add onShowBooking handler
        />
        <Container>
          <Routes>
            <Route path="/" element={
              isLoggedIn ? (
                <div>
                  <h1>Welcome, {user.email}</h1>
                  <Menu addToCart={addToCart} items={menuItems} />
                </div>
              ) : (
                <HomePage />
              )
            } />
            <Route path="/menu" element={<Menu addToCart={addToCart} items={menuItems} />} />
            <Route path="/admin" element={isAdmin ? (
              <MenuAdmin initialItems={menuItems} onUpdateItems={setMenuItems} />
            ) : (
              <div>Access Denied</div>
            )} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Container>
        <Footer />
        <LoginModal
          show={showLogin}
          handleClose={() => setShowLogin(false)}
          handleLogin={handleLogin}
        />
        <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} onSignup={handleSignup} />
        <Cart
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
          showCart={showCart}
          onCloseCart={toggleCart}
          isLoggedIn={isLoggedIn}
          onShowLogin={() => setShowLogin(true)}
          onShowSignup={() => setShowSignup(true)}
        />
        <BookingModal
          show={showBooking}
          handleClose={() => setShowBooking(false)}
          handleBooking={handleBooking}
          isLoggedIn={isLoggedIn}
          onShowLogin={() => setShowLogin(true)}
          onShowSignup={() => setShowSignup(true)}
        />
      </div>
    </Router>
  );
}

export default App;
