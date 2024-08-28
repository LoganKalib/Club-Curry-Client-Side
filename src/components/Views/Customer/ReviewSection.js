import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews'); // Replace with  API endpoint
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error loading reviews: {error}</p>;

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
