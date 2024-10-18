import React, { useState } from 'react';
import BookingModal from './BookingModal'; // Adjust the import path as necessary
import { Button } from 'react-bootstrap';

const BookingTest = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleBooking = (bookingDetails) => {
    // Handle the booking details here (e.g., send to an API)
    console.log('Booking Details:', bookingDetails);
  };

  return (
    <div>
      <h1>Welcome to Our Restaurant</h1>
      <Button variant="primary" onClick={handleOpen}>
      
      </Button>

      <BookingModal 
        show={showModal} 
        handleClose={handleClose} 
        handleBooking={handleBooking} 
      />
    </div>
  );
};

export default BookingTest;
