import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Review component to display individual reviews
const Review = ({ review }) => (
  <Card className="review-card mb-3">
    <Card.Body>
      <Card.Title>{review.customerName}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Food Rating: {review.foodRating} | Service Rating: {review.serviceRating} | Atmosphere Rating: {review.atmosphereRating}
      </Card.Subtitle>
      <Card.Text>
        <strong>Recommended Dishes:</strong> {review.recommendedDishes.join(', ')}
      </Card.Text>
      <Card.Text>
        <strong>Comments:</strong> {review.comments}
      </Card.Text>
    </Card.Body>
  </Card>
);

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    foodRating: PropTypes.number.isRequired,
    serviceRating: PropTypes.number.isRequired,
    atmosphereRating: PropTypes.number.isRequired,
    recommendedDishes: PropTypes.arrayOf(PropTypes.string).isRequired,
    comments: PropTypes.string.isRequired,
  }).isRequired,
};

const ReviewSection = () => {
  // Dummy data
  const reviews = [
    {
      id: '1',
      customerName: 'Alice Johnson',
      foodRating: 5,
      serviceRating: 4,
      atmosphereRating: 5,
      recommendedDishes: ['Pasta Carbonara', 'Tiramisu'],
      comments: 'Absolutely loved the food and the ambiance! Will definitely come back.',
    },
    {
      id: '2',
      customerName: 'Bob Smith',
      foodRating: 4,
      serviceRating: 3,
      atmosphereRating: 4,
      recommendedDishes: ['Margherita Pizza', 'Garlic Bread'],
      comments: 'Good food but the service could be improved. The pizza was fantastic though!',
    },
    {
      id: '3',
      customerName: 'Charlie Brown',
      foodRating: 3,
      serviceRating: 5,
      atmosphereRating: 3,
      recommendedDishes: ['Caesar Salad', 'Chicken Wings'],
      comments: 'Service was excellent, but the food was just average. The wings were decent.',
    },
  ];

  return (
    <div className="review-section">
      <h2 className="section-heading">Customer Reviews</h2>
      <div className="existing-reviews">
        {reviews.length > 0 ? (
          reviews.map(review => <Review key={review.id} review={review} />)
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
