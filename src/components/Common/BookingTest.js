import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingModal from './BookingModal'; // Adjust the import path as necessary
import { Button, Table, Form, FormControl } from 'react-bootstrap';
import './EmployeeBookingManagement.css'; // Assuming you'll style this view

const EmployeeBookingManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    // Dummy data for demonstration
    const dummyData = [
      {
        bookingId: 1,
        date: '2024-10-19',
        time: '18:00',
        tableNo: 5,
        sectionNo: 2,
        status: 'Confirmed',
        bookedBy: { name: 'Alice Johnson' },
      },
      {
        bookingId: 2,
        date: '2024-10-20',
        time: '19:00',
        tableNo: 3,
        sectionNo: 1,
        status: 'Pending',
        bookedBy: { name: 'Bob Smith' },
      },
      {
        bookingId: 3,
        date: '2024-10-21',
        time: '20:00',
        tableNo: 4,
        sectionNo: 3,
        status: 'Cancelled',
        bookedBy: { name: 'Charlie Brown' },
      },
    ];
    
    // Set the dummy data to the state
    setBookings(dummyData);
    setFilteredBookings(dummyData); // Initialize filtered bookings
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = bookings.filter(booking =>
        booking.bookingId.toString().includes(term)
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings); // Reset when search is cleared
    }
  };

  const handleEdit = (booking) => {
    setCurrentBooking(booking);
    setShowModal(true);
  };

  const handleBookingUpdate = async (updatedBooking) => {
    try {
      // Replace with your API call
      console.log('Updating booking:', updatedBooking);
      // Refresh bookings after updating (here you might want to refetch from your API)
      fetchBookings(); 
      setShowModal(false);
    } catch (error) {
      console.error("Error updating booking", error);
    }
  };

  const handleOpen = () => {
    setCurrentBooking(null); // Clear current booking for new entry
    setShowModal(true);
  };

  return (
    <div className="EBM-container">
      <h1 class="EMB-title">Employee - Manage Bookings</h1>

      {/* Welcome message and button to open the employee booking modal */}
      <div>
        <Button variant="primary" id="btn-new-booking" onClick={handleOpen}>
          Employee New Booking
        </Button>

        <BookingModal 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          handleBooking={handleBookingUpdate} 
          booking={currentBooking} // Pass current booking if editing
        />
      </div>

      {/* Search by Booking ID */}
      <Form inline className="EBM-search-form mb-4">
        <FormControl
          type="text"
          placeholder="Search by Booking ID"
          value={searchTerm}
          onChange={handleSearch}
          className="EBM-mr-sm-2"
        />
      </Form>

      {/* Bookings Table */}
      <Table striped bordered hover className="EBM-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Table Number</th>
            <th>Section Number</th>
            <th>Status</th>
            <th>Booked By (Employee Name)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingId}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>{booking.tableNo}</td>
              <td>{booking.sectionNo}</td>
              <td>{booking.status}</td>
              <td>{booking.bookedBy.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(booking)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Booking Modal for Editing */}
      {currentBooking && (
        <BookingModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          booking={currentBooking}
          handleBooking={handleBookingUpdate}
        />
      )}
    </div>
  );
};

export default EmployeeBookingManagement;
