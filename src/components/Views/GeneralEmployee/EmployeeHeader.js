import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './EmployeeHeader.css'; // Import the CSS file for styling

const EmployeeHeader = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    window.location.href = '/';
  };

  const handleHomeRedirect = () => {
    navigate('/employee');
  };

  // Functions to handle navigation for the new buttons
  const handleNew = () => {
    navigate('/new'); // Change this route as necessary
  };

  const handleBookings = () => {
    navigate('/bookings'); // Change this route as necessary
  };

  const handleDelivery = () => {
    navigate('/delivery'); // Change this route as necessary
  };

  const handleTakeAway = () => {
    navigate('/takeaway'); // Change this route as necessary
  };

  const handleDineIn = () => {
    navigate('/dinein'); // Change this route as necessary
  };

  return (
    <Navbar className="e-navbar" expand="lg" fixed="top">
      <Navbar.Brand onClick={handleHomeRedirect}>
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt="Club Curry Logo"
          height="40"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="e-basic-navbar-nav" />
      <Navbar.Collapse id="e-basic-navbar-nav">
        <div className="e-buttons-container">
          <Button variant="outline-light" onClick={handleNew}>
            <i className="fas fa-plus" style={{ marginRight: '5px' }}></i> New
          </Button>
          <Button variant="outline-light" onClick={handleBookings}>
            <i className="fas fa-calendar-check" style={{ marginRight: '5px' }}></i> Bookings
          </Button>
          <Button variant="outline-light" onClick={handleDelivery}>
            <i className="fas fa-truck" style={{ marginRight: '5px' }}></i> Delivery
          </Button>
          <Button variant="outline-light" onClick={handleTakeAway}>
            <i className="fas fa-box" style={{ marginRight: '5px' }}></i> Take Away
          </Button>
          <Button variant="outline-light" onClick={handleDineIn}>
            <i className="fas fa-utensils" style={{ marginRight: '5px' }}></i> Dine In
          </Button>
        </div>
        {isLoggedIn && (
          <Button variant="outline-light" className="logout-button" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt" style={{ marginRight: '5px' }}></i> Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default EmployeeHeader;
