import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Customer/CustomerCss/CustomerDashboardHeader.css'; // Import the CSS file for styling

const CustomerDashboardHeader = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <Navbar className="navbar" expand="lg" fixed="top">
      <Navbar.Brand href="#home">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`} // Update to use your logo
          alt="Club Curry Logo"
          height="40" // Adjust the height according to your needs
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/menu" className="nav-link">Menu</NavLink>
          <NavLink to="/bookings" className="nav-link">Bookings</NavLink>
          <NavLink to="/cart" className="nav-link">Cart</NavLink>
          <NavLink to="/order-history" className="nav-link">Order History</NavLink>
          <NavLink to="/reviews" className="nav-link">Reviews</NavLink>
        </Nav>
        <div className="buttons-container">
          {isLoggedIn && ( // Only show the logout button if the user is logged in
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
