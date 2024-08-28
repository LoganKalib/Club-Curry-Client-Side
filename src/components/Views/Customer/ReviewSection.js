import React, { useState } from 'react';
import { Card, Form, Button, Alert, Modal } from 'react-bootstrap';

// Sample data for existing reviews (initial values)
const initialReviews = [
  {
    id: 1,
    foodRating: 4,
    serviceRating: 5,
    atmosphereRating: 4,
    dishes: ['Chicken Curry', 'Naan Bread'],
    comments: 'Great food and service! Highly recommend.',
  },
  {
    id: 2,
    foodRating: 3,
    serviceRating: 4,
    atmosphereRating: 5,
    dishes: ['Paneer Butter Masala'],
    comments: 'Good atmosphere, but the food was average.',
  },
  {
    id: 3,
    foodRating: 5,
    serviceRating: 5,
    atmosphereRating: 5,
    dishes: ['Lamb Vindaloo', 'Vegetable Biryani'],
    comments: 'Absolutely amazing experience. Will come back again!',
  }
];

const ReviewSection = ({ menuItems }) => {
  const [existingReviews, setExistingReviews] = useState(initialReviews);
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [atmosphereRating, setAtmosphereRating] = useState(0);
  const [recommendedDishes, setRecommendedDishes] = useState([]);
  const [comments, setComments] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDishChange = (event) => {
    const value = Array.from(event.target.selectedOptions, option => option.value);
    setRecommendedDishes(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new review object
    const newReview = {
      id: existingReviews.length + 1, // Generate a new ID
      foodRating,
      serviceRating,
      atmosphereRating,
      dishes: recommendedDishes,
      comments,
    };

    // Update the existing reviews with the new review
    setExistingReviews([...existingReviews, newReview]);

    // Reset form fields
    setFoodRating(0);
    setServiceRating(0);
    setAtmosphereRating(0);
    setRecommendedDishes([]);
    setComments('');
    setShowForm(false);
    setSubmitted(true);

    // Hide the success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <>
      <Card className="review-section-card">
        <Card.Body>
          <h2 className="mb-4">Customer Reviews</h2>

          <div className="existing-reviews mb-4">
            {existingReviews.map(review => (
              <Card className="review-card" key={review.id}>
                <Card.Body>
                  <Card.Title>Review {review.id}</Card.Title>
                  <Card.Text>
                    <strong>Food Rating:</strong> {review.foodRating} / 5<br />
                    <strong>Service Rating:</strong> {review.serviceRating} / 5<br />
                    <strong>Atmosphere Rating:</strong> {review.atmosphereRating} / 5<br />
                    <strong>Recommended Dishes:</strong> {review.dishes.join(', ')}<br />
                    <strong>Comments:</strong> {review.comments}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="encouragement-message mb-4">
            <p>We love to hear about your experiences with us, good or bad. Let’s try and make this better!</p>
          </div>

          <Button variant="danger" onClick={() => setShowForm(true)}>
            Make a Review
          </Button>
        </Card.Body>
      </Card>

      {/* Review Form Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal>

      {submitted && (
        <Alert variant="success" className="mt-3">
          Thank you for your review!
        </Alert>
      )}
    </>
  );
};

export default ReviewSection;
