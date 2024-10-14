import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from '../../Common/StarRating';
import '../Customer/CustomerCss/CustomerReviews.css';

const CustomerReviews = ({ onAddReview, onDeleteReview }) => {
  const [existingReviews, setExistingReviews] = useState([
    {
      id: '1',
      customerId: '101',
      customerName: 'Emily R.',
      foodRating: 5,
      serviceRating: 5,
      atmosphereRating: 4,
      recommendedDishes: ['Pasta', 'Lasagna'],
      comments: 'The pasta was delicious and the service was excellent. Will come back again!',
      timestamp: '2 days ago',
    },
    {
      id: '2',
      customerId: '101',
      customerName: 'Emily R.',
      foodRating: 4,
      serviceRating: 5,
      atmosphereRating: 4,
      recommendedDishes: ['Lasagna'],
      comments: 'Loved the ambiance and the variety of dishes. Highly recommend the lasagna!',
      timestamp: '1 week ago',
    },
    {
      id: '3',
      customerId: '102',
      customerName: 'John D.',
      foodRating: 5,
      serviceRating: 4,
      atmosphereRating: 5,
      recommendedDishes: ['Butter Chicken', 'Naan'],
      comments: 'Amazing food and great atmosphere!',
      timestamp: '3 days ago',
    },
    {
      id: '4',
      customerId: '103',
      customerName: 'Sarah K.',
      foodRating: 3,
      serviceRating: 5,
      atmosphereRating: 4,
      recommendedDishes: ['Biryani'],
      comments: 'The biryani was good, but a bit too spicy for my taste.',
      timestamp: '1 week ago',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [foodRating, setFoodRating] = useState('0');
  const [serviceRating, setServiceRating] = useState('0');
  const [atmosphereRating, setAtmosphereRating] = useState('0');
  const [recommendedDishes, setRecommendedDishes] = useState('');
  const [comments, setComments] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const customerId = '101'; // Dummy customer ID
  const customerReviews = existingReviews.filter((review) => review.customerId === customerId);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setAlertMessage('');
    resetFormFields();
  };

  const resetFormFields = () => {
    setFoodRating('0');
    setServiceRating('0');
    setAtmosphereRating('0');
    setRecommendedDishes('');
    setComments('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (foodRating === '0' || serviceRating === '0' || atmosphereRating === '0' || !comments) {
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      customerId,
      customerName: 'Customer', // Replace with actual customer name
      foodRating,
      serviceRating,
      atmosphereRating,
      recommendedDishes: recommendedDishes.split(',').map((dish) => dish.trim()),
      comments,
      timestamp: new Date().toLocaleDateString(),
    };

    setExistingReviews([...existingReviews, newReview]);
    setAlertMessage('Thank you for your review!');
    handleCloseModal();
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setExistingReviews(existingReviews.filter((review) => review.id !== reviewId));
      onDeleteReview(reviewId);
    }
  };

  return (
    
    <div className="review-section">
      {/* Enhanced feedback section */}
      <div className="feedback-section">
        <h3>We Value Your Feedback! 🌟</h3>
        <p>
          At <strong>ClubCurry</strong>, we believe every dish tells a story, and your feedback helps us create a
          better dining experience. Whether it's a delightful meal or a suggestion for improvement, we want to hear from you!
        </p>
        <p>
          As a token of appreciation, every reviewer will receive a <strong>10% discount</strong> on their next visit. Don't forget to ask us about it!
        </p>
        <p>
          Your insights are vital to our journey of culinary excellence. Thank you for being part of our family!
        </p>
        <p>
          🍽️ Join us for our upcoming <strong>Wine Tasting Night</strong> on Friday! Limited seats available.
        </p>
      </div>

      <h3>Your Reviews</h3>

      {customerReviews.length === 0 ? (
        <p>No reviews found. Click below to make a review.</p>
      ) : (
        <div className="reviews-slider">
          <button className="arrow left-arrow" onClick={() => {/* Handle left scroll */}}>
            &lt;
          </button>
          <div className="reviews-list">
            {customerReviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <span>{review.customerName}</span>
                  <span className="review-timestamp">{review.timestamp}</span>
                </div>
                <div className="review-body">
                  <p><strong>Food Rating:</strong> {review.foodRating}/5</p>
                  <StarRating rating={review.foodRating} />
                  <p><strong>Service Rating:</strong> {review.serviceRating}/5</p>
                  <StarRating rating={review.serviceRating} />
                  <p><strong>Atmosphere Rating:</strong> {review.atmosphereRating}/5</p>
                  <StarRating rating={review.atmosphereRating} />
                  <p><strong>Recommended Dishes:</strong> {review.recommendedDishes.join(', ')}</p>
                  <p><strong>Comments:</strong> {review.comments}</p>
                </div>
                <div className="review-actions">
                  <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <button className="arrow right-arrow" onClick={() => {/* Handle right scroll */}}>
            &gt;
          </button>
        </div>
      )}

      <Button variant="primary" onClick={handleOpenModal} className="mt-3">
        Add Review
      </Button>

      {/* Modal for adding a review */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Leave a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
          <Form onSubmit={handleSubmitReview}>
            <Form.Group controlId="foodRating">
              <Form.Label>Food Rating</Form.Label>
              <StarRating rating={foodRating} onRate={setFoodRating} />
            </Form.Group>
            <Form.Group controlId="serviceRating" className="mt-3">
              <Form.Label>Service Rating</Form.Label>
              <StarRating rating={serviceRating} onRate={setServiceRating} />
            </Form.Group>
            <Form.Group controlId="atmosphereRating" className="mt-3">
              <Form.Label>Atmosphere Rating</Form.Label>
              <StarRating rating={atmosphereRating} onRate={setAtmosphereRating} />
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
  onDeleteReview: PropTypes.func.isRequired,
};

export default CustomerReviews;
