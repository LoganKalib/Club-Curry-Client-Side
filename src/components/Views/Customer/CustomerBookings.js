import React, { useState } from 'react';
import { Table, Button, Form, Alert, Accordion } from 'react-bootstrap';
import './CustomerCss/CustomerBookings.css'; // Import the CSS file for styling

const CustomerBookings = () => {
  // Dummy booking data
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customerId: 'cust1',
      date: '2024-10-15',
      time: '19:00',
      guests: 2,
      status: 'confirmed',
    },
    {
      id: 2,
      customerId: 'cust1',
      date: '2024-10-20',
      time: '18:00',
      guests: 4,
      status: 'pending',
    },
    {
      id: 3,
      customerId: 'cust1',
      date: '2024-10-25',
      time: '20:00',
      guests: 3,
      status: 'canceled',
    },
    {
      id: 4,
      customerId: 'cust1',
      date: '2024-11-01',
      time: '19:30',
      guests: 5,
      status: 'confirmed',
    },
    {
      id: 5,
      customerId: 'cust1',
      date: '2024-11-05',
      time: '17:00',
      guests: 2,
      status: 'pending',
    },
    {
      id: 6,
      customerId: 'cust2',
      date: '2024-10-12',
      time: '15:00',
      guests: 1,
      status: 'confirmed',
    },
  ]);

  const [updatedBooking, setUpdatedBooking] = useState({
    id: null,
    date: '',
    time: '',
    guests: '',
  });

  const [showAlert, setShowAlert] = useState(false);

  const customerId = 'cust1'; // Hardcoded for demonstration

  const handleCancelBooking = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'canceled' } : booking
      )
    );
  };

  const handleUpdateBooking = (bookingId) => {
    const bookingToUpdate = bookings.find((booking) => booking.id === bookingId);
    setUpdatedBooking(bookingToUpdate);
  };

  const handleSaveUpdatedBooking = () => {
    if (updatedBooking.id) {
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === updatedBooking.id
            ? { ...booking, ...updatedBooking }
            : booking
        )
      );
      setUpdatedBooking({ id: null, date: '', time: '', guests: '' });
      setShowAlert(true);
    }
  };

  const customerBookings = bookings.filter((booking) => booking.customerId === customerId);

  const upcomingBookings = customerBookings
    .filter((booking) => booking.status === 'confirmed' && new Date(booking.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const pendingAndCanceledBookings = customerBookings.filter(
    (booking) => booking.status === 'pending' || booking.status === 'canceled'
  );

  return (
    <div className="customer-bookings">
      <h2>Upcoming Bookings</h2>
      
      {/* Display recent confirmed upcoming bookings */}
      <div className="upcoming-bookings-container">
        {upcomingBookings.length > 0 ? (
          upcomingBookings.map((booking) => (
            <div key={booking.id} className="upcoming-booking">
              <h4>Booking ID: {booking.id}</h4>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Guests: {booking.guests}</p>
              <Button variant="danger" onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</Button>
            </div>
          ))
        ) : (
          <p>No upcoming confirmed bookings.</p>
        )}
      </div>

      <h2 className="mt-4">Pending and Canceled Bookings</h2>
      <div className="pending-canceled-table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingAndCanceledBookings.length > 0 ? (
              pendingAndCanceledBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.guests}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === 'pending' && (
                      <Button variant="primary" onClick={() => handleUpdateBooking(booking.id)}>
                        Update Booking
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No pending or canceled bookings.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Update Booking Form */}
      {updatedBooking.id && (
        <div className="mt-4">
          <h3>Update Booking</h3>
          <Form>
            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={updatedBooking.date}
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, date: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={updatedBooking.time}
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, time: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGuests">
              <Form.Label>Guests</Form.Label>
              <Form.Control
                type="number"
                value={updatedBooking.guests}
                onChange={(e) => setUpdatedBooking({ ...updatedBooking, guests: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleSaveUpdatedBooking}>
              Save Changes
            </Button>
          </Form>
        </div>
      )}

      {/* Alert for successful update */}
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Booking updated successfully!
        </Alert>
      )}

      {/* FAQ Section */}
      <div className="mt-4 faq-section">
        <h3>Frequently Asked Questions (FAQ)</h3>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do I change my booking?</Accordion.Header>
            <Accordion.Body>
              If your booking is pending, click the "Update Booking" button next to your booking to change the date, time, or number of guests.
              If your booking is confirmed, you must cancel it and create a new booking.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Can I cancel my booking?</Accordion.Header>
            <Accordion.Body>
              Yes, you can cancel your booking at any time if it is pending. For confirmed bookings, click the "Cancel Booking" button to mark it as canceled.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What happens if I miss my booking?</Accordion.Header>
            <Accordion.Body>
              If you miss your booking, please contact us as soon as possible. Depending on the circumstances, we may be able to reschedule your booking.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>How do I contact customer support?</Accordion.Header>
            <Accordion.Body>
              You can contact our customer support via the "Contact Us" section on our website or call us at (123) 456-7890 for assistance.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default CustomerBookings;
