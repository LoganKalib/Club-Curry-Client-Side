import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Menu from './components/Views/Customer/Menu';
import HomePage from './components/Views/Customer/HomePage';
import CustomerDashboard from './components/Views/Customer/CustomerDashboard';
import LoginModal from './components/Common/LoginModal';
import SignupModal from './components/Common/SignupModal';
import Cart from './components/Views/Customer/Cart';
import BookingModal from './components/Common/BookingModal';
import DriverDashboardContainer from './components/Views/Driver/DriverDashboardContainer';
import Employee from './components/Views/GeneralEmployee/Employee';
import OrderHistorySection from './components/Views/Customer/OrderHistorySection';
import ReviewSection from './components/Views/Customer/ReviewSection';
import OrderManagement from './components/Views/GeneralEmployee/OrderManagement';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CSS/App.css';
import './CSS/Cart.css';
import './CSS/Header.css';
import './CSS/Footer.css';
import './CSS/Overlay.css';
import './CSS/HomePage.css';
import AdminDashboard from "./components/Views/Admin/AdminDashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false); // New state for Customer
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [showBooking, setShowBooking] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleLogin = async (userData) => {
    try {
      // Try logging in as Admin
      let response = await axios.post('http://localhost:8080/ClubCurry/admin/login', {
        username: userData.email,
        password: userData.password,
      });

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setIsAdmin(true);
        setUser(userData);
        localStorage.setItem('token', response.data); // Store JWT
        setShowLogin(false);
        return;
      }
    } catch (error) {
      console.log('Admin login failed. Trying Driver...');
    }

    try {
      // Try logging in as Driver
      let response = await axios.post('http://localhost:8080/ClubCurry/driver/login', {
        username: userData.email,
        password: userData.password,
      });

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setIsDriver(true);
        setUser(userData);
        localStorage.setItem('token', response.data); // Store JWT
        setShowLogin(false);
        return;
      }
    } catch (error) {
      console.log('Driver login failed. Trying Employee...');
    }

    try {
      // Try logging in as Employee
      let response = await axios.post('http://localhost:8080/ClubCurry/employee/login', {
        username: userData.email,
        password: userData.password,
      });

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setIsEmployee(true);
        setUser(userData);
        localStorage.setItem('token', response.data); // Store JWT
        setShowLogin(false);
        return;
      }
    } catch (error) {
      console.log('Employee login failed. Trying Customer...');
    }

    try {
      // Finally, try logging in as Customer
      let response = await axios.post('http://localhost:8080/ClubCurry/customer/login', {
        username: userData.email,
        password: userData.password,
      });

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setIsCustomer(true); // Set state for Customer role
        setUser(userData);
        localStorage.setItem('token', response.data); // Store JWT
        setShowLogin(false);
        return;
      }
    } catch (error) {
      console.log('Customer login failed. Invalid credentials.');
    }

    // If we get here, all login attempts failed
    alert('Invalid username or password');
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
    setIsDriver(false);
    setIsEmployee(false);
    setIsCustomer(false); // Reset customer state on logout
    localStorage.removeItem('token'); // Optional: Clear token on logout
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [
      ...prevItems,
      { ...item, spiceLevel: item.spiceLevel, specialNote: item.notes, quantity: item.quantity, uniqueId: uuidv4() },
    ]);
  };

  const removeFromCart = (uniqueId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
  };

  const handleUpdateQuantity = (uniqueId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.uniqueId === uniqueId) {
          return { ...item, quantity: Math.max(item.quantity + change, 1) };
        }
        return item;
      })
    );
  };

  const toggleCart = () => {
    setShowCart((prevState) => !prevState);
  };

  const handleCheckout = () => {
    alert('Checkout is not yet implemented.');
    setOrderHistory([...orderHistory, ...cartItems]);
    setCartItems([]);
  };

  const handleBooking = (bookingData) => {
    console.log('Booking Data:', bookingData);
    alert('Booking Confirmed!');
  };

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <Router>
      <div className="App">
        {!isDriver && (
          <Header
            isLoggedIn={isLoggedIn}
            onShowLogin={() => setShowLogin(true)}
            onShowSignup={() => setShowSignup(true)}
            onLogout={handleLogout}
            onShowCart={toggleCart}
            onShowBooking={() => setShowBooking(true)}
          />
        )}
        {(showCart || showBooking) && <div className="overlay"></div>}
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  isDriver ? (
                    <DriverDashboardContainer onLogout={handleLogout} />
                  ) : isAdmin ? (
                    <AdminDashboard />
                  ) : isEmployee ? (
                    <Employee />
                  ) : isCustomer ? ( // Check if the user is a Customer
                    <CustomerDashboard
                      cartItems={cartItems}
                      menuItems={menuItems}
                      onAddToCart={addToCart}
                      onShowCart={toggleCart}
                      onShowBooking={() => setShowBooking(true)}
                      onCheckout={handleCheckout}
                      onRemoveFromCart={removeFromCart}
                      onUpdateQuantity={handleUpdateQuantity}
                      orderHistory={orderHistory}
                      customerReviews={reviews.filter(review => review.customerId === user.id)}
                      onAddReview={handleAddReview}
                    />
                  ) : (
                    <HomePage setShowBooking={setShowBooking} showBooking={showBooking} />
                  )
                ) : (
                  <HomePage setShowBooking={setShowBooking} showBooking={showBooking} />
                )
              }
            />
            <Route path="/menu" element={<Menu addToCart={addToCart} items={menuItems} />} />
            <Route path="/admin" element={isAdmin ? <AdminDashboard /> : <div>Access Denied</div>} />
            <Route path="/driver" element={<DriverDashboardContainer onLogout={handleLogout} />} />
            <Route path="/employee" element={isEmployee ? <Employee /> : <div>Access Denied</div>} />
            <Route path="/order-history" element={<OrderHistorySection orders={orderHistory} />} />
            <Route path="/reviews" element={<ReviewSection existingReviews={reviews} onAddReview={handleAddReview} />} />
            <Route path="/orderManagement" element={<OrderManagement />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Container>

        <Footer />
        <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
        <SignupModal show={showSignup} handleClose={() => setShowSignup(false)} onSignup={handleSignup} />
        <Cart
          cartItems={cartItems}
          onRemoveItem={removeFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
          showCart={showCart}
          onCloseCart={() => setShowCart(false)}
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