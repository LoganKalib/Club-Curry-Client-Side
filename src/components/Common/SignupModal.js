import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSS/SignupModal.css';
import curryCollage from '../../images/currycollage.jpg'; // Import the image

const countryOptions = [
  { code: '+27', name: 'South Africa' },
  { code: '+1', name: 'United States' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+33', name: 'France' },
  { code: '+49', name: 'Germany' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+61', name: 'Australia' },
  { code: '+55', name: 'Brazil' },
  { code: '+7', name: 'Russia' },
  { code: '+86', name: 'China' },
  { code: '+81', name: 'Japan' },
  { code: '+91', name: 'India' },
  { code: '+52', name: 'Mexico' },
  { code: '+82', name: 'South Korea' },
  { code: '+41', name: 'Switzerland' },
  { code: '+31', name: 'Netherlands' },
  { code: '+46', name: 'Sweden' },
  { code: '+47', name: 'Norway' },
  { code: '+48', name: 'Poland' },
  { code: '+353', name: 'Ireland' },
  { code: '+98', name: 'Iran' },
  { code: '+966', name: 'Saudi Arabia' },
  { code: '+60', name: 'Malaysia' },
  { code: '+65', name: 'Singapore' },
  { code: '+64', name: 'New Zealand' },
  { code: '+54', name: 'Argentina' },
  { code: '+58', name: 'Venezuela' },
  { code: '+62', name: 'Indonesia' },
  { code: '+63', name: 'Philippines' },
  { code: '+351', name: 'Portugal' },
  { code: '+420', name: 'Czech Republic' },
];

const SignupModal = ({ show, handleClose, onSignup }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]); // Default to South Africa
  const navigate = useNavigate();

  const handleCountrySelect = (countryCode) => {
    const country = countryOptions.find(c => c.code === countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  };

  
  // Function to handle form submission
     const handleSubmit = async (e) => {
      e.preventDefault();
      const signupData = {
        email: email,
        name: name,
        surname: surname,
        mobileNo: phoneNumber,
        password: password
      };
  
      console.log(signupData)
      try {
        const response = await axios.post("http://localhost:8080/ClubCurry/customer/save", signupData);
        alert('Signup Successful');
  
          // Clear input fields
          setName('');
          setSurname('');
          setEmail('');
          setPassword('');
          setPhoneNumber('');
  
        handleClose(); // Close the modal
        navigate('/'); // Redirect to HomePage after signup
  
      } catch (error) {
        console.error('Error during signup:', error);
        alert(`Signup failed: ${error.response?.data || 'Signup Failed'}`); // Display error message from the response
      }
  
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
                alt="Signup Illustration" 
                className="img-fluid"
              />
            </Col>
            
            {/* Signup form column */}
            <Col md={8} className="form-column">
              <Button className="custom-close-button" onClick={handleClose}>&times;</Button>
              <div className="form-title">Sign Up</div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicSurname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <div className="d-flex">
                    <Dropdown onSelect={handleCountrySelect}>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {selectedCountry.code}
                      </Dropdown.Toggle>
                      <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {countryOptions.map((country) => (
                          <Dropdown.Item key={country.code} eventKey={country.code}>
                            {country.name} ({country.code})
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                      type="text"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="ml-2"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button type="submit" className="custom-button mt-3"> {/* Apply custom button class */}
                  Sign Up
                </Button>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupModal;
