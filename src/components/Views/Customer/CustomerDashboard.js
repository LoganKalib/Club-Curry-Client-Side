import React, { useState } from 'react';
import { Tab, Table } from 'react-bootstrap';
import Cart from './Cart';
import OrderHistorySection from './OrderHistorySection';
import CustomerReviews from './CustomerReviews';
import Menu from './Menu';
import CustomerDashboardHeader from './CustomerDashboardHeader'; // Import the new header component

const CustomerDashboard = ({ 
  menuItems, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity, 
  onCheckout, 
  isLoggedIn, 
  onShowLogin, 
  onShowSignup, 
  bookings = [], 
  customerId = null, 
  addToCart, 
  onLogout // Pass the onLogout function
}) => {
  const [activeKey, setActiveKey] = useState('bookings');
  const [showCart, setShowCart] = useState(false);
  const [existingReviews, setExistingReviews] = useState([]);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const customerBookings = customerId ? bookings.filter(booking => booking.customerId === customerId) : [];

  const handleAddReview = (newReview) => {
    setExistingReviews([...existingReviews, newReview]);
  };

  const handleEditReview = (updatedReview) => {
    setExistingReviews(existingReviews.map(review =>
      review.id === updatedReview.id ? updatedReview : review
    ));
  };

  const handleDeleteReview = (reviewId) => {
    setExistingReviews(existingReviews.filter(review => review.id !== reviewId));
  };

  return (
    <div className="customer-dashboard">
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} /> {/* Use the custom header here */}
      
      <h2>Your Dashboard</h2>

      <Tab.Container id="left-tabs-example" activeKey={activeKey} onSelect={setActiveKey}>
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
              cartItems={cartItems || []}
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

          <Tab.Pane eventKey="menu">
            <Menu addToCart={addToCart} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default CustomerDashboard;
