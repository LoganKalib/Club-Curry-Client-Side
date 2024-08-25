// src/components/BookingModal.js
import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const BookingModal = ({ show, handleClose, handleBooking, isLoggedIn, onShowLogin, onShowSignup }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleSubmit = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    handleBooking({ numPeople, date, time });
    handleClose();
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
    onShowLogin();
  };

  const handleSignupPromptClose = () => {
    setShowLoginPrompt(false);
    onShowSignup();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="booking-modal">
        <Modal.Header closeButton>
          <Modal.Title>Book a Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNumPeople">
              <Form.Label>Number of People</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="8"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={handleClose} className="modal-btn">
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="modal-btn">
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered className="login-prompt-modal">
        <Modal.Header closeButton>
          <Modal.Title>Please Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            You need to be logged in to proceed with booking.
          </Alert>
          <Button variant="primary" onClick={handleLoginPromptClose} className="mr-2">
            Log In
          </Button>
          <Button variant="secondary" onClick={handleSignupPromptClose}>
            Sign Up
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BookingModal;
