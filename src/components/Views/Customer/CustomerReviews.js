import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from '../../Common/StarRating';
import '../Customer/CustomerCss/CustomerReviews.css';

const CustomerReviews = ({ onAddReview, onEditReview, onDeleteReview, customerId, existingReviews }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [foodRating, setFoodRating] = useState('0');
  const [serviceRating, setServiceRating] = useState('0');
  const [atmosphereRating, setAtmosphereRating] = useState('0');
  const [recommendedDishes, setRecommendedDishes] = useState('');
  const [comments, setComments] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [editReview, setEditReview] = useState(null);

  // Filter reviews for the specific customer
  const customerReviews = existingReviews.filter(review => review.customerId === customerId);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setAlertMessage('');
    resetFormFields();
  };

  const handleOpenEditModal = (review) => {
    setEditReview(review);
    setFoodRating(review.foodRating.toString());
    setServiceRating(review.serviceRating.toString());
    setAtmosphereRating(review.atmosphereRating.toString());
    setRecommendedDishes(review.recommendedDishes.join(', '));
    setComments(review.comments);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditReview(null);
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

    // Validate required fields
    if (foodRating === '0' || serviceRating === '0' || atmosphereRating === '0' || !comments) {
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    // Create a new review object
    const newReview = {
      id: Date.now().toString(),
      customerId,
      customerName: 'Customer', // Replace with actual customer name if available
      foodRating,
      serviceRating,
      atmosphereRating,
      recommendedDishes: recommendedDishes.split(',').map(dish => dish.trim()),
      comments,
    };

    // Pass the new review to the parent component
    onAddReview(newReview);
    setAlertMessage('Thank you for your review!');
    handleCloseModal();
  };

  const handleEditReview = (e) => {
    e.preventDefault();

    // Validate required fields
    if (foodRating === '0' || serviceRating === '0' || atmosphereRating === '0' || !comments) {
      setAlertMessage('Please fill in all required fields.');
      return;
    }

    // Create an updated review object
    const updatedReview = {
      ...editReview,
      foodRating,
      serviceRating,
      atmosphereRating,
      recommendedDishes: recommendedDishes.split(',').map(dish => dish.trim()),
      comments,
    };

    // Pass the updated review to the parent component
    onEditReview(updatedReview);
    setAlertMessage('Review updated successfully!');
    handleCloseEditModal();
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDeleteReview(reviewId);
    }
  };

  return (
    <div className="review-section">
      <h3 className="form-heading">Your Reviews</h3>

      {customerReviews.length === 0 ? (
        <p>No reviews found. Click below to make a review.</p>
      ) : (
        <div className="card-slider">
          <div className="card-slider-inner">
            {customerReviews.map((review) => (
              <Card key={review.id} className="review-card">
                <Card.Body>
                  <Card.Title>{review.customerName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Food Rating:</strong> {review.foodRating}/5
                    <StarRating rating={review.foodRating} />
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Service Rating:</strong> {review.serviceRating}/5
                    <StarRating rating={review.serviceRating} />
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Atmosphere Rating:</strong> {review.atmosphereRating}/5
                    <StarRating rating={review.atmosphereRating} />
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Recommended Dishes:</strong> {review.recommendedDishes.join(', ')}
                  </Card.Text>
                  <Card.Text>
                    <strong>Comments:</strong> {review.comments}
                  </Card.Text>
                  <Button variant="secondary" onClick={() => handleOpenEditModal(review)} className="mr-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteReview(review.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Button variant="primary" onClick={handleOpenModal} className="mt-3">
        Make a Review
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

      {/* Modal for editing a review */}
      {editReview && (
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
            <Form onSubmit={handleEditReview}>
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
                Update Review
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

CustomerReviews.propTypes = {
  onAddReview: PropTypes.func.isRequired,
  onEditReview: PropTypes.func.isRequired,
  onDeleteReview: PropTypes.func.isRequired,
  customerId: PropTypes.string.isRequired,
  existingReviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      foodRating: PropTypes.string.isRequired,
      serviceRating: PropTypes.string.isRequired,
      atmosphereRating: PropTypes.string.isRequired,
      recommendedDishes: PropTypes.arrayOf(PropTypes.string).isRequired,
      comments: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomerReviews;
