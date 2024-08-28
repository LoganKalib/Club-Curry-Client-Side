import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

// Review component to display individual reviews
const Review = ({ review }) => (
  <Card className="review-card mb-3">
    <Card.Body>
      <Card.Title>{review.customer.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        Food Rating: {review.rating.foodQuality} | Service Rating: {review.rating.serviceQuality} | Atmosphere Rating: {review.rating.atmosphereQuality} {/*I changed the review rating access*/}
      </Card.Subtitle>
      <Card.Text>
        <strong>Comments:</strong> {review.note}
      </Card.Text>
    </Card.Body>
  </Card>
);

Review.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    customer: PropTypes.object,
    rating: PropTypes.object.isRequired
  }).isRequired,
};{/*changed definition to be in line with the database */}

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/review/getAll');// Replace with  API endpoint
        console.log(response);
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
