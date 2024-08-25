import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../CSS/LoginModal.css'; 

const LoginModal = ({ show, handleClose, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isDriverLogin, setIsDriverLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let role = 'user';
    if (isAdminLogin) role = 'admin';
    else if (isDriverLogin) role = 'driver';

    handleLogin({ email, password }, isAdminLogin, isDriverLogin);

    if (role === 'admin') navigate('/admin');
    else if (role === 'driver') navigate('/driver');
    else navigate('/');
  };

  return (
    <Modal show={show} onHide={handleClose} className="login-modal">
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
              setIsDriverLogin(false);
            }}
            className="mt-3"
          />
          <Form.Check
            type="checkbox"
            label="Driver Login"
            checked={isDriverLogin}
            onChange={(e) => {
              setIsDriverLogin(e.target.checked);
              setIsAdminLogin(false);
            }}
            className="mt-2"
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
