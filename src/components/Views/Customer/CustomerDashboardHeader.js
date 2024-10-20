import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Customer/CustomerCss/CustomerDashboardHeader.css';

const CustomerDashboardHeader = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar className="navbar" expand="lg" fixed="top">
      <Navbar.Brand href="#home">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`} // Use your logo image
          alt="Club Curry Logo"
          height="40"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="buttons-container">
          {isLoggedIn && (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomerDashboardHeader;
