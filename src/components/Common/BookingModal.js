import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../../CSS/BookingModal.css'; // Import your CSS for additional custom styling
import friends from '../../images/friends.png'; // Import your image

const BookingModal = () => {
  const [show, setShow] = useState(false); // State to manage modal visibility
  const [guestName, setGuestName] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleClose = () => setShow(false); // Close the modal
  const handleShow = () => setShow(true); // Open the modal

  const handleSubmit = () => {
    if (guestName && date && time) { // Simple validation
      handleBooking({ guestName, numPeople, event, date, time });
      handleClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleBooking = (bookingDetails) => {
    // Handle the booking details (e.g., send to an API or update state)
    console.log('Booking details:', bookingDetails);
    // You can add further logic here, like API calls
  };

  return (
    <>
      {/* Button to open the modal */}
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Open Booking Modal
      </Button>

      {/* Booking Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg" className="booking-modal">
        <div className="modal-content">
          <Row noGutters>
            {/* Left Column for the Form */}
            <Col md={7}>
              <Modal.Header className="border-0">
                <Modal.Title>Reservation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  We provide a convenient online reservation system. Simply select your desired date, time, and party size, and we will make sure that your table is ready upon your arrival.
                </p>
                <Form>
                  <Form.Group controlId="formGuestName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                    />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group controlId="formNumPeople">
                        <Form.Label>Guests</Form.Label>
                        <Form.Control
                          as="select"
                          value={numPeople}
                          onChange={(e) => setNumPeople(e.target.value)}
                        >
                          {[...Array(8).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formEvent">
                        <Form.Label>Event</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Anniversary?"
                          value={event}
                          onChange={(e) => setEvent(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  style={{ width: '100%' }}
                  className="book-button"
                >
                  Book a table
                </Button>
              </Modal.Footer>
            </Col>

            {/* Right Column for the Image */}
            <Col md={5} className="d-none d-md-block">
              <div className="image-section">
                <img
                  src={friends} // Use imported image variable
                  alt="Friends enjoying a meal"
                  className="img-fluid"
                />
                {/* Close Button on Image */}
                <button
                  type="button"
                  className="close-button"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default BookingModal;
