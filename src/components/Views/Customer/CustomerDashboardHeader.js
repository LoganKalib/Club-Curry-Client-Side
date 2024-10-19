import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import '../Customer/CustomerCss/CustomerDashboardHeader.css'; // Import the CSS file for styling

const CustomerDashboardHeader = ({ isLoggedIn, onLogout, onShowCart, handleSectionSwitch }) => {
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
          {/* Trigger section switch when buttons are clicked */}
          <Button variant="outline-light" onClick={() => handleSectionSwitch('dashboard')} className="ml-2">
            Dashboard
          </Button>
          <Button variant="outline-light" onClick={() => handleSectionSwitch('order-history')} className="ml-2">
            Order History
          </Button>
          <Button variant="outline-light" onClick={() => handleSectionSwitch('reviews')} className="ml-2">
            Reviews
          </Button>
        </Nav>
        <div className="buttons-container">
          {isLoggedIn && (
            <>
              <Button variant="outline-light" onClick={onShowCart} className="ml-2">
                <i className="fas fa-shopping-cart"></i> Cart
              </Button>
              <Button variant="outline-light" onClick={onLogout} className="ml-2">
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
