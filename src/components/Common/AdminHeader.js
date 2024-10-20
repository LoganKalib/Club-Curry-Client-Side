// src/components/AdminHeader.js
import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminHeader = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/'); // Redirect to the home page or login page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
       <Navbar.Brand as={NavLink} to="/">
        {/* Replace text with logo image */}
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}  // Path to the logo image
          alt="Club Curry Logo"
          height="40"  // Adjust the height as needed
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Button variant="outline-light" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminHeader;
