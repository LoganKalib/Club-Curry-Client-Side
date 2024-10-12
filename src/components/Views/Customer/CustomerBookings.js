import React from 'react';
import { Table } from 'react-bootstrap';

const CustomerBookings = ({ bookings, customerId }) => {
  // Filter bookings for the current customer
  const customerBookings = customerId ? bookings.filter(booking => booking.customerId === customerId) : [];

  return (
    <div className="customer-bookings">
      <h2>Upcoming Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customerBookings.length > 0 ? (
            customerBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>{booking.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No bookings available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerBookings;
