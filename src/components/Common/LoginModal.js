import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, handleClose, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Track admin login
  const [isDriverLogin, setIsDriverLogin] = useState(false); // Track driver login
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Determine login type
    if (isAdminLogin) {
      handleLogin({ email, password, role: 'admin' }); // Pass role as admin
      navigate('/admin'); // Redirect to Admin page
    } else if (isDriverLogin) {
      handleLogin({ email, password, role: 'driver' }); // Pass role as driver
      navigate('/driver'); // Redirect to Driver Dashboard
    } else {
      handleLogin({ email, password, role: 'user' }); // Pass role as regular user
      navigate('/'); // Redirect to HomePage
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Admin Login"
            checked={isAdminLogin}
            onChange={(e) => {
              setIsAdminLogin(e.target.checked);
              setIsDriverLogin(false); // Ensure only one role is selected
            }}
            className="mt-3"
          />
          <Form.Check
            type="checkbox"
            label="Driver Login"
            checked={isDriverLogin}
            onChange={(e) => {
              setIsDriverLogin(e.target.checked);
              setIsAdminLogin(false); // Ensure only one role is selected
            }}
            className="mt-3"
          />
          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
