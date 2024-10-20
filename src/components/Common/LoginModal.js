import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../CSS/LoginModal.css';
import curryCollage from '../../images/currycollage.jpg'; // Import the image

const LoginModal = ({ show, handleClose, handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Define valid credentials for admin, driver, and employee roles
  const validCredentials = {
    admin: { email: 'admin@email.com', password: 'admin123' },
    driver: { email: 'driver@email.com', password: 'driver123' },
    employee: { email: 'employee@email.com', password: 'employee123' },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let role = 'customer'; // Default role

    // Check if the email and password match any of the predefined roles
    if (
      email === validCredentials.admin.email &&
      password === validCredentials.admin.password
    ) {
      role = 'admin';
    } else if (
      email === validCredentials.driver.email &&
      password === validCredentials.driver.password
    ) {
      role = 'driver';
    } else if (
      email === validCredentials.employee.email &&
      password === validCredentials.employee.password
    ) {
      role = 'employee';
    }

    // Handle login and navigate based on the role
    handleLogin({ email, password }, role);

    // Navigate to the appropriate page based on the role
    if (role === 'admin') navigate('/admin');
    else if (role === 'driver') navigate('/driver');
    else if (role === 'employee') navigate('/employee');
    else navigate('/'); // Default to customer home page if no role matches
  };

  return (
    <>
      {show && <div className="custom-backdrop" />} {/* Add custom backdrop here */}
      <Modal show={show} onHide={handleClose} className="custom-modal" centered>
        <Modal.Body>
          <Row className="m-0">
            {/* Image column */}
            <Col md={4} className="p-0 img-container">
              <img 
                src={curryCollage} // Use the imported image
                alt="Login Illustration" 
                className="img-fluid"
              />
            </Col>
            
            {/* Login form column */}
            <Col md={8} className="form-column">

              {/* Close button inside the form */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                  style={{ position: 'absolute', right: '10px', top: '10px' }}
                ></button>
              </div>

              <div className="form-title">Login</div>
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
                <Button type="submit" className="custom-button mt-3"> {/* Apply custom button class */}
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
