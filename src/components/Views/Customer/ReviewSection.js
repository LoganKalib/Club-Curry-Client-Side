import React, { useState, useEffect } from 'react'; // Import useState and useEffect from React
import axios from 'axios'; // Import axios for making HTTP requests
import { Card } from 'react-bootstrap'; // Import Card component from react-bootstrap
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import StarRating from '../../Common/StarRating';
import '../Customer/CustomerCss/ReviewSection.css'; // Import custom CSS

// Review component to display individual reviews
const Review = ({ review }) => (
  <Card className="review-card mb-3">
    <Card.Body>
      <Card.Title>{review.customer.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">
        <div className="rating-container">
          <div className="rating-item">
            <strong>Food Rating: </strong>
            <StarRating rating={review.rating.foodQuality.toString()} />
          </div>
          <div className="rating-item">
            <strong>Service Rating: </strong>
            <StarRating rating={review.rating.serviceQuality.toString()} />
          </div>
          <div className="rating-item">
            <strong>Atmosphere Rating: </strong>
            <StarRating rating={review.rating.atmosphereQuality.toString()} />
          </div>
        </div>
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
    customer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.shape({
      foodQuality: PropTypes.number.isRequired,
      serviceQuality: PropTypes.number.isRequired,
      atmosphereQuality: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
}; // Updated definition to be in line with the database

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/review/getAll'); // Replace with actual API endpoint
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
      <h2 className="section-heading mb-5 mt-3">Customer Reviews</h2>
      <div className="existing-reviews">
        {reviews.length > 0 ? (
          reviews.map((review) => <Review key={review.id} review={review} />)
        ) : (
          <div class="no-reviews">
  <p>Be the first to share your experience! Your feedback means the world to us. Write a review now!</p>
</div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
