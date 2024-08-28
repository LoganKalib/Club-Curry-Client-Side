import React, { useState } from 'react';
import { Nav, Tab, Form, Button, Alert, Table } from 'react-bootstrap';
import Cart from './Cart'; // Import the Cart component
import OrderHistorySection from './OrderHistorySection'; // Ensure correct path
import ReviewSection from './ReviewSection'; // Import the ReviewSection

const CustomerDashboard = ({ 
  menuItems, 
  existingReviews, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity, 
  onCheckout, 
  isLoggedIn, 
  onShowLogin, 
  onShowSignup, 
  bookings = [], // Default to empty array
  customerId = null // Default to null
}) => {
  const [activeKey, setActiveKey] = useState('bookings');
  const [showCart, setShowCart] = useState(false);
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [atmosphereRating, setAtmosphereRating] = useState(0);
  const [recommendedDishes, setRecommendedDishes] = useState([]);
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDishChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setRecommendedDishes(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you'd normally send the review data to a server
    console.log({
      foodRating,
      serviceRating,
      atmosphereRating,
      recommendedDishes,
      comments
    });

    setFoodRating(0);
    setServiceRating(0);
    setAtmosphereRating(0);
    setRecommendedDishes([]);
    setComments('');
    setSubmitted(true);

    // Hide the success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Filter bookings by customerId
  const customerBookings = customerId ? bookings.filter(booking => booking.customerId === customerId) : [];

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
            <h3>Submit Your Review</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="foodRating">
                <Form.Label>Food Rating (out of 5 stars)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  value={foodRating}
                  onChange={(e) => setFoodRating(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="serviceRating" className="mt-3">
                <Form.Label>Service Rating (out of 5 stars)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  value={serviceRating}
                  onChange={(e) => setServiceRating(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="atmosphereRating" className="mt-3">
                <Form.Label>Atmosphere Rating (out of 5 stars)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  value={atmosphereRating}
                  onChange={(e) => setAtmosphereRating(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="recommendedDishes" className="mt-3">
                <Form.Label>Recommended Dishes</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={recommendedDishes}
                  onChange={handleDishChange}
                  required
                >
                  {menuItems.map(item => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="comments" className="mt-3">
                <Form.Label>Additional Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Group>

              <Button variant="danger" type="submit" className="mt-3">
                Submit Review
              </Button>
            </Form>

            {submitted && (
              <Alert variant="success" className="mt-3">
                Thank you for your review!
              </Alert>
            )}

            {/* Display Reviews */}
            <ReviewSection menuItems={menuItems} existingReviews={existingReviews} />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default CustomerDashboard;
