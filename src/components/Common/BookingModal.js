import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BookingModal = ({ show, handleClose, handleBooking, booking }) => {
  const [bookingData, setBookingData] = useState({
    bookingId: '',
    date: '',
    time: '',
    tableNo: '',
    sectionNo: '',
    status: '',
    bookedBy: { name: '' }
  });

  useEffect(() => {
    if (booking) {
      setBookingData(booking); // Populate booking data if editing
    } else {
      setBookingData({
        bookingId: '',
        date: '',
        time: '',
        tableNo: '',
        sectionNo: '',
        status: '',
        bookedBy: { name: '' }
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    handleBooking(bookingData); // Call the parent function to save the booking
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{booking ? 'Edit Booking' : 'New Booking'}</Modal.Title>
      </Modal.Header>

      {/* Modal body for form content */}
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Booking ID</Form.Label>
            <Form.Control
              type="text"
              name="bookingId"
              value={bookingData.bookingId}
              onChange={handleChange}
              disabled={!booking} // Allow editing only when it's an existing booking
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={bookingData.time}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Table Number</Form.Label>
            <Form.Control
              type="number"
              name="tableNo"
              value={bookingData.tableNo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Section Number</Form.Label>
            <Form.Control
              type="number"
              name="sectionNo"
              value={bookingData.sectionNo}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={bookingData.status}
              onChange={handleChange}
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Booked By (Employee Name)</Form.Label>
            <Form.Control
              type="text"
              name="bookedBy"
              value={bookingData.bookedBy.name}
              onChange={(e) =>
                setBookingData(prevState => ({
                  ...prevState,
                  bookedBy: { name: e.target.value }
                }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Footer for action buttons */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
