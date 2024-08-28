import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

// CustomerReviewSection component for customers to submit reviews
const CustomerReviews = ({ onAddReview, customerId, reviews }) => {
  const [showModal, setShowModal] = useState(false);
  const [foodRating, setFoodRating] = useState('');
  const [serviceRating, setServiceRating] = useState('');
  const [atmosphereRating, setAtmosphereRating] = useState('');
  const [recommendedDishes, setRecommendedDishes] = useState('');
  const [comments, setComments] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  // Filter reviews for the specific customer
  const customerReviews = reviews.filter(review => review.customerId === customerId);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!foodRating || !serviceRating || !atmosphereRating || !comments) {
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    // Create a new review object
    const newReview = {
      id: Date.now().toString(), // Unique ID for the review
      customerId, // Actual customer ID
      customerName: 'Customer', // Replace with actual customer name if available
      foodRating: parseInt(foodRating),
      serviceRating: parseInt(serviceRating),
      atmosphereRating: parseInt(atmosphereRating),
      recommendedDishes: recommendedDishes.split(',').map(dish => dish.trim()),
      comments,
    };

    // Pass the new review to the parent component
    onAddReview(newReview);

    // Reset the form fields
    setFoodRating('');
    setServiceRating('');
    setAtmosphereRating('');
    setRecommendedDishes('');
    setComments('');
    setAlertMessage('Thank you for your review!');

    // Close the modal after submission
    handleCloseModal();
  };

  return (
    <div className="review-section">
      <h3 className="form-heading">Your Reviews</h3>
      
      {customerReviews.length === 0 ? (
        <p>No reviews found. Click below to make a review.</p>
      ) : (
        <ul>
          {customerReviews.map((review) => (
            <li key={review.id}>
              <strong>Food Rating:</strong> {review.foodRating}/5 <br />
              <strong>Service Rating:</strong> {review.serviceRating}/5 <br />
              <strong>Atmosphere Rating:</strong> {review.atmosphereRating}/5 <br />
              <strong>Comments:</strong> {review.comments} <br />
            </li>
          ))}
        </ul>
      )}
      
      <Button variant="primary" onClick={handleOpenModal} className="mt-3">
        Make a Review
      </Button>

      {/* Modal for review form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="foodRating">
              <Form.Label>Food Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={foodRating}
                onChange={(e) => setFoodRating(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="serviceRating" className="mt-3">
              <Form.Label>Service Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={serviceRating}
                onChange={(e) => setServiceRating(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="atmosphereRating" className="mt-3">
              <Form.Label>Atmosphere Rating (1-5)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={atmosphereRating}
                onChange={(e) => setAtmosphereRating(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="recommendedDishes" className="mt-3">
              <Form.Label>Recommended Dishes (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={recommendedDishes}
                onChange={(e) => setRecommendedDishes(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="comments" className="mt-3">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

CustomerReviews.propTypes = {
  onAddReview: PropTypes.func.isRequired,
  customerId: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      foodRating: PropTypes.number.isRequired,
      serviceRating: PropTypes.number.isRequired,
      atmosphereRating: PropTypes.number.isRequired,
      recommendedDishes: PropTypes.arrayOf(PropTypes.string),
      comments: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomerReviews;
