import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../../CSS/BookingModal.css'; // Import your CSS for additional custom styling

const BookingModal = ({ show, handleClose, booking, handleBooking }) => {
  const [tableNo, setTableNo] = useState(booking?.tableNo || 1);
  const [sectionNo, setSectionNo] = useState(booking?.sectionNo || 'A');
  const [status, setStatus] = useState(booking?.status || 'Pending');
  const [bookedBy, setBookedBy] = useState(booking?.bookedBy || ''); // Updated from orderStatus to bookedBy
  const [date, setDate] = useState(booking?.date || '');
  const [time, setTime] = useState(booking?.time || '');
  const [fullName, setFullName] = useState(booking?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(booking?.phoneNumber || '');

  const handleSubmit = () => {
    if (tableNo && sectionNo && date && time && status && bookedBy && fullName && phoneNumber) {
      const updatedBooking = {
        tableNo,
        sectionNo,
        status,
        bookedBy: {id: bookedBy}, // Include bookedBy instead of orderStatus
        date,
        time,
        fullName,
        phoneNumber,
        orderStatus: "PENDING"
      };

      // Make an Axios request to the backend
      const url = booking ? `http://localhost:8080/ClubCurry/booking/update/${booking.id}` : 'http://localhost:8080/ClubCurry/booking/save'; // URL for POST (new) or PUT (update)

      const method = booking ? 'put' : 'post'; // Use PUT if updating, POST if creating new booking

      axios({
        method: method,
        url: url,
        data: updatedBooking,
      })
        .then((response) => {
          console.log('Booking successful:', response.data);
          handleClose(); // Close the modal after successful booking
          handleBooking(updatedBooking);
        })
        .catch((error) => {
          console.error('There was an error creating/updating the booking!', error);
        });
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="booking-modal">
      <div className="modal-content">
        <Row noGutters>
          <Col md={12}>
            <Modal.Header className="border-0">
              <Modal.Title>{booking ? 'Edit Booking' : 'New Booking'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {booking && (
                  <Form.Group controlId="formBookingId">
                    <Form.Label>Booking ID</Form.Label>
                    <Form.Control type="text" value={booking.id} readOnly />
                  </Form.Group>
                )}
                <Row>
                  <Col>
                    <Form.Group controlId="formTableNo">
                      <Form.Label>Table Number</Form.Label>
                      <Form.Control
                        type="number"
                        value={tableNo}
                        onChange={(e) => setTableNo(e.target.value)}
                        min="1"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formSectionNo">
                      <Form.Label>Section</Form.Label>
                      <Form.Control
                        as="select"
                        value={sectionNo}
                        onChange={(e) => setSectionNo(e.target.value)}
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formStatus">
                      <Form.Label>Booking Status</Form.Label>
                      <Form.Control
                        as="select"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="DENIED">DENIED</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formBookedBy"> {/* Updated control ID */}
                      <Form.Label>Booked By (Employee ID)</Form.Label>
                      <Form.Control
                        type="text"
                        value={bookedBy}
                        onChange={(e) => setBookedBy(e.target.value)} // Updated to handle bookedBy
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
                <Row>
                  <Col>
                    <Form.Group controlId="formFullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formPhoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
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
                {booking ? 'Update Booking' : 'Create Booking'}
              </Button>
            </Modal.Footer>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default BookingModal;