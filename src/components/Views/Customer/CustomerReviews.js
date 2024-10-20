import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from '../../Common/StarRating';
import '../Customer/CustomerCss/CustomerReviews.css';
import review from '../../../images/review.png';
import QR from '../../../images/QR.png';
import RestaurantDetails from './RestaurantDetails';


// Mapping numeric ratings to enum values
const ratingValues = {
  0: 'ZERO',
  1: 'ONE',
  2: 'TWO',
  3: 'THREE',
  4: 'FOUR',
  5: 'FIVE',
};

const CustomerReviews = ({ onAddReview, onDeleteReview, decodedValue }) => {
  console.log(decodedValue);
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [foodRating, setFoodRating] = useState('ZERO'); // Changed to string representation
  const [serviceRating, setServiceRating] = useState('ZERO'); // Changed to string representation
  const [atmosphereRating, setAtmosphereRating] = useState('ZERO'); // Changed to string representation
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
    setFoodRating('ZERO');
    setServiceRating('ZERO');
    setAtmosphereRating('ZERO');

    setComments('');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (foodRating === 'ZERO' || serviceRating === 'ZERO' || atmosphereRating === 'ZERO' || !comments) {
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      customerId,
      customerName: 'Customer', // Replace with actual customer name
      foodRating: Object.keys(ratingValues).find(key => ratingValues[key] === foodRating),
      serviceRating: Object.keys(ratingValues).find(key => ratingValues[key] === serviceRating),
      atmosphereRating: Object.keys(ratingValues).find(key => ratingValues[key] === atmosphereRating),
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


<img src={review} 
            alt="review header"
            className="review-image"
             />
  
  <div className="reviews-container">
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
                <div className="rating-item">
                  <p><strong>Food Rating:</strong> {review.foodRating}/5</p>
                  <StarRating rating={ratingValues[review.foodRating]} readOnly />
                  </div>
                  <div className="rating-item">
                  <p><strong>Service Rating:</strong> {review.serviceRating}/5</p>
                  <StarRating rating={ratingValues[review.serviceRating]} readOnly />
                  </div>
                  <div className="rating-item">
                    <p><strong>Atmosphere Rating:</strong> {review.atmosphereRating}/5</p>
                  <StarRating rating={ratingValues[review.atmosphereRating]} readOnly />

                  </div>
                  <div className="rating-item">
                  <p><strong></strong> {review.comments}</p>
                  </div>
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
      </div>

          {/* Feedback Section */}
  <div className="feedback-section">
  <div className="feedback-text">
  <h3>Thank you for being part of our family!</h3>
    <p>
      As a token of appreciation, every reviewer will receive a <strong>10% discount</strong> on their next visit. Don't forget to ask us about it!
    </p>
    <p>
      Your insights are vital to our journey of culinary excellence. 
    </p>
    
    <Button variant="primary" onClick={handleOpenModal} className="add-review-button">
      Add Review
    </Button>
    </div>
    <img src={QR} alt="QR code" className="qr-image" />
    
  </div>

      <RestaurantDetails></RestaurantDetails>

      {/* Modal for adding a review */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
          <Form onSubmit={handleSubmitReview}>
            <Form.Group>
              <Form.Label>Food Rating</Form.Label>
              <StarRating rating={foodRating} onRate={(rate) => setFoodRating(ratingValues[rate])} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Service Rating</Form.Label>
              <StarRating rating={serviceRating} onRate={(rate) => setServiceRating(ratingValues[rate])} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Atmosphere Rating</Form.Label>
              <StarRating rating={atmosphereRating} onRate={(rate) => setAtmosphereRating(ratingValues[rate])} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
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
