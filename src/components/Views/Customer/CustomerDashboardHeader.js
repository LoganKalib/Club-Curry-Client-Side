import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Customer/CustomerCss/CustomerDashboardHeader.css'; // Import the CSS file for styling

const CustomerDashboardHeader = ({ isLoggedIn, onLogout, onShowCart }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <Navbar className="navbar" expand="lg" fixed="top">
      <Navbar.Brand href="#home">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`} 
          alt="Club Curry Logo"
          height="40" 
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/customer-dashboard-menu" className="nav-link">Menu</NavLink>
          <NavLink to="/customer-dashboard-bookings" className="nav-link">Bookings</NavLink>
          <NavLink to="/customer-dashboard-order-history" className="nav-link">Order History</NavLink>
          <NavLink to="/customer-dashboard-reviews" className="nav-link">Reviews</NavLink>
        </Nav>
        <div className="buttons-container">
          {isLoggedIn && ( // Only show buttons if logged in
            <>
              <Button variant="outline-light" onClick={onShowCart} className="ml-2">
                <i className="fas fa-shopping-cart"></i> Cart
              </Button>
              <Button variant="outline-light" onClick={handleLogout} className="ml-2">
                Logout
              </Button>
            </>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomerDashboardHeader;
