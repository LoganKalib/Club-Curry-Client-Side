// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onShowLogin, onShowSignup, onLogout, onShowCart, onShowBooking }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#">Club Curry</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" onClick={onShowLogin} className="mr-2">
                Login
              </Button>
              <Button variant="outline-light" onClick={onShowSignup}>
                Sign Up
              </Button>
            </>
          )}
          <Nav.Link href="#cart" onClick={onShowCart}>
            <i className="fas fa-shopping-cart"></i> Cart
          </Nav.Link>
          <Nav.Link href="#booking" onClick={onShowBooking}>
            <i className="fas fa-calendar-alt"></i> Book a Table
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
