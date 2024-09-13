import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './DriverNavbBar.css';

const DriverNavbar = () => {
  // Driver profile data
  const driverProfile = {
    name: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/50', // Replace with driver's actual image URL
  };

  return (
    <div className="driver-navbar">
      <Nav className="flex-column">
        <Nav.Item>
          <Link to="/driver/dashboard" className="nav-link">
            Dashboard
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/driver/active-deliveries" className="driver-nav-link">
            Active Deliveries
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/driver/completed-deliveries" className="driver-nav-link">
            Completed Deliveries
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/driver/my-deliveries" className="driver-nav-link">
            My Deliveries
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/driver/profile" className="driver-nav-link">
            Profile
          </Link>
        </Nav.Item>
      </Nav>

      {/* Driver profile section */}
      <div className="driver-profile">
        <img src={driverProfile.imageUrl} alt="Driver" className="profile-picture" />
        <p className="driver-name">{driverProfile.name}</p>
      </div>
    </div>
  );
};

export default DriverNavbar;
