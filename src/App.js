import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Menu from './components/Views/Customer/Menu';
import CustomerReviews from './components/Views/Customer/CustomerReviews';
import OrderHistorySection from './components/Views/Customer/OrderHistorySection';
import HomePage from './components/Views/Customer/HomePage';
import CustomerDashboard from './components/Views/Customer/CustomerDashboard';
import CustomerDashboardHeader from './components/Views/Customer/CustomerDashboardHeader';
import LoginModal from './components/Common/LoginModal';
import SignupModal from './components/Common/SignupModal';
import DriverDashboardContainer from './components/Views/Driver/DriverDashboardContainer';
//import Deliveries from './components/Views/Driver/Deliveries';
import BookingTest from './components/Common/BookingTest';
import Employee from './components/Views/GeneralEmployee/Employee';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './CSS/App.css';
import './CSS/Cart.css';
import './CSS/Header.css';
import './CSS/Footer.css';
import './CSS/Overlay.css';
import './CSS/HomePage.css';
import AdminDashboard from './components/Views/Admin/AdminDashboard';
import Cart from './components/Views/Customer/Cart'; // Import Cart component

import { jwtDecode } from 'jwt-decode';

const decodeJWT = (token) => {
    try {
        // Decode the JWT and return the resulting object
        return jwtDecode(token);
    } catch (error) {
        console.error('Invalid token:', error);
        return null; // Return null if the token is invalid
    }
};

function AppRoutes({ isLoggedIn, userRole, decodedValue, setIsLoggedIn, onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole) {
      console.log(`User role set to: ${userRole}`);
      navigate(getDashboardRoute(userRole));
    }
  }, [userRole, navigate]);

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'customer':
        return '/customer-dashboard';
      case 'admin':
        return '/admin';
      case 'driver':
        return '/driver';
      case 'generalStaff':
        return '/employee';
      default:
        return '/';
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {isLoggedIn && userRole === 'customer' && (
        <>
          <Route 
            path="/customer-dashboard" 
            element={<CustomerDashboard 
              isLoggedIn={isLoggedIn} 
              onLogout={onLogout} 
              decodedValue={decodedValue} // Pass decodedValue to CustomerDashboard
            />} 
          />
        </>
      )}
      <Route path="/admin" element={isLoggedIn && userRole === 'admin' ? <AdminDashboard decodedValue={decodedValue} /> : <div>Page Not Found</div>} />
      <Route path="/driver" element={isLoggedIn && userRole === 'driver' ? <DriverDashboardContainer decodedValue={decodedValue} /> : <div>Page Not Found</div>} />
      <Route path="/employee" element={isLoggedIn && userRole === 'generalStaff' ? <Employee decodedValue={decodedValue} /> : <div>Page Not Found</div>} />
      <Route path="/customer-dashboard-reviews" element={<CustomerReviews decodedValue={decodedValue} />} />
      <Route path="/customer-dashboard-order-history" element={<OrderHistorySection decodedValue={decodedValue} />} />
      <Route path="/customer-dashboard-bookings" element={<BookingTest decodedValue={decodedValue} />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCart, setShowCart] = useState(false); // State for cart modal
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [decodedValue, setDecodedValue] = useState({})

  const handleLogin = async (userData) => {
    let role = null;

    if (userData.email.endsWith('@ccadmin.com')) {
      role = 'admin';
    } else if (userData.email.endsWith('@ccdriver.com')) {
      role = 'driver';
    } else if (userData.email.endsWith('@ccstaff.com')) {
      role = 'generalStaff';
    } else {
      role = 'customer';
    }

    try {
      const loginData = role === 'customer'
        ? { email: userData.email, password: userData.password }
        : { username: userData.email, password: userData.password };

      const response = await axios.post(`http://localhost:8080/ClubCurry/${role}/login`, loginData);

      if (response.status === 200 && response.data) {
        console.log(`Successful login for role: ${role}`);
        localStorage.setItem('token', response.data);
        const decoded = decodeJWT(localStorage.token);
        setDecodedValue(decoded); // Set the decoded value
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
        setIsLoggedIn(true);
        setUserRole(role);
        setShowLogin(false);
        return;
      }
    } catch (error) {
      console.error(`Error logging in as ${role}:`, error.response ? error.response.data : error.message);
    }

    alert('Invalid username or password.');
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('token');
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  return (
    <Router>
      <div className="App">
        {userRole === 'customer' ? (
          <CustomerDashboardHeader
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onShowCart={toggleCart} // Show cart function
          />
        ) : (
          <Header
            isLoggedIn={isLoggedIn}
            onShowLogin={() => setShowLogin(true)}
            onShowSignup={() => setShowSignup(true)}
            onLogout={handleLogout}
            onShowCart={toggleCart} // Show cart function
          />
        )}
        <Container>
          <AppRoutes 
            isLoggedIn={isLoggedIn}
            userRole={userRole}
            decodedValue={decodedValue} // Pass decodedValue to AppRoutes
            setIsLoggedIn={setIsLoggedIn}
            onLogout={handleLogout}
          />
          {/* Pass cart-related props to Cart component */}
          <Cart 
            cartItems={cartItems} 
            onRemoveItem={(id) => setCartItems(cartItems.filter(item => item.uniqueId !== id))}
            onUpdateQuantity={(id, change) => {
              setCartItems(cartItems.map(item => item.uniqueId === id ? { ...item, quantity: item.quantity + change } : item));
            }}
            onCheckout={() => alert('Checkout functionality to be implemented.')}
            showCart={showCart}
            onCloseCart={toggleCart}
            isLoggedIn={isLoggedIn}
            onShowLogin={() => setShowLogin(true)}
            onShowSignup={() => setShowSignup(true)}
          />
        </Container>
        <Footer />
        <LoginModal 
          show={showLogin} 
          handleClose={() => setShowLogin(false)} 
          handleLogin={handleLogin} 
        />
        <SignupModal 
          show={showSignup} 
          handleClose={() => setShowSignup(false)} 
        />
      </div>
    </Router>
  );
}

export default App;