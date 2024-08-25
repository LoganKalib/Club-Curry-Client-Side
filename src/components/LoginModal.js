import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginModal = ({ show, handleClose, handleLogin, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false); // Track admin login
  const navigate = useNavigate(); // Create a navigate instance

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password }, isAdminLogin); // Pass admin status
    if (isAdminLogin) {
      navigate('/admin'); // Redirect to Admin page if admin
    } else {
      navigate('/'); // Redirect to HomePage for regular users
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
            onChange={(e) => setIsAdminLogin(e.target.checked)}
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
