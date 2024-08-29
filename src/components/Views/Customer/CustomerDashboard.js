import React, { useState } from 'react';
import { Nav, Tab, Table } from 'react-bootstrap';
import Cart from './Cart'; // Import the Cart component
import OrderHistorySection from './OrderHistorySection'; // Ensure correct path
import CustomerReviews from './CustomerReviews'; // Import the CustomerReviews component

const CustomerDashboard = ({ 
  menuItems, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity, 
  onCheckout, 
  isLoggedIn, 
  onShowLogin, 
  onShowSignup, 
  bookings = [], // Default to empty array
  customerId = null, // Default to null
}) => {
  const [activeKey, setActiveKey] = useState('bookings');
  const [showCart, setShowCart] = useState(false);
  const [existingReviews, setExistingReviews] = useState([]); // Initialize review state

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Filter bookings by customerId
  const customerBookings = customerId ? bookings.filter(booking => booking.customerId === customerId) : [];

  // Function to add a new review
  const handleAddReview = (newReview) => {
    setExistingReviews([...existingReviews, newReview]);
  };

  // Function to edit an existing review
  const handleEditReview = (updatedReview) => {
    setExistingReviews(existingReviews.map(review =>
      review.id === updatedReview.id ? updatedReview : review
    ));
  };

  // Function to delete a review
  const handleDeleteReview = (reviewId) => {
    setExistingReviews(existingReviews.filter(review => review.id !== reviewId));
  };

  return (
    <div className="customer-dashboard">
      <h2>Your Dashboard</h2>

      <Tab.Container id="left-tabs-example" activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs">
          <Nav.Item>
            <Nav.Link eventKey="bookings">Bookings</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="cart" onClick={handleShowCart}>Cart</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="order-history">Order History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">Reviews</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="bookings">
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
          </Tab.Pane>
          <Tab.Pane eventKey="cart">
            <Cart
              cartItems={cartItems}
              onRemoveItem={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
              onCheckout={onCheckout}
              showCart={showCart}
              onCloseCart={handleCloseCart}
              isLoggedIn={isLoggedIn}
              onShowLogin={onShowLogin}
              onShowSignup={onShowSignup}
            />
          </Tab.Pane>
          <Tab.Pane eventKey="order-history">
            <OrderHistorySection />
          </Tab.Pane>
          <Tab.Pane eventKey="reviews">
            <CustomerReviews
              existingReviews={existingReviews}
              onAddReview={handleAddReview}
              onEditReview={handleEditReview}
              onDeleteReview={handleDeleteReview}
              customerId={customerId}
            />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default CustomerDashboard;
