import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

const Header = ({ isLoggedIn, onShowLogin, onShowSignup, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">Club Curry</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#menu">Menu</Nav.Link>
          <Nav.Link href="#order">Order</Nav.Link>
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={onLogout}>
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
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
