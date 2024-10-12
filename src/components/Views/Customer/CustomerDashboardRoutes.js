import React, { useState } from 'react';
import { Tab } from 'react-bootstrap';
import Cart from './Cart';
import OrderHistorySection from './OrderHistorySection';
import CustomerReviews from './CustomerReviews';
import Menu from './Menu';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerBookings from './CustomerBookings'; // Import the new CustomerBookings component

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
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <h2>Your Dashboards</h2>

      <Tab.Container id="left-tabs-example" activeKey={activeKey} onSelect={setActiveKey}>
        <Tab.Content>
          <Tab.Pane eventKey="bookings">
            <CustomerBookings bookings={bookings} customerId={customerId} />
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
