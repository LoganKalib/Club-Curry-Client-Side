import React from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../Customer/CustomerCss/CustomerDashboardHeader.css'; // Import the CSS file for styling

const CustomerDashboardHeader = ({ isLoggedIn, onLogout, onShowCart }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to the home page after logout
  };

  // Functions to handle navigation to specific sections
  const handleGoToDashboard = () => navigate('/customer-dashboard');
  const handleGoToOrderHistory = () => navigate('/customer-dashboard-order-history');
  const handleGoToReviews = () => navigate('/customer-dashboard-reviews');

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
          {/* Replace NavLinks with Buttons */}
          <Button variant="outline-light" onClick={handleGoToDashboard} className="ml-2">
            Dashboard
          </Button>
          <Button variant="outline-light" onClick={handleGoToOrderHistory} className="ml-2">
            Order History
          </Button>
          <Button variant="outline-light" onClick={handleGoToReviews} className="ml-2">
            Reviews
          </Button>
        </Nav>
        <div className="buttons-container">
          {isLoggedIn && (
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
