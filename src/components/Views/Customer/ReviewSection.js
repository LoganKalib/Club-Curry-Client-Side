import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import StarRating from '../../Common/StarRating';
import '../Customer/CustomerCss/ReviewSection.css';
import bg from '../../../images/bg.png';

// Individual Review Component (with all ratings and floating avatar)
const Review = ({ review }) => (
  <div className="review-card-custom">
    <div className="avatar-wrapper">
      <img
        src="https://via.placeholder.com/80x80.png?text=Avatar" // Default placeholder image
        alt="Customer Avatar"
        className="customer-avatar"
      />
    </div>
   
    <h3 className="review-author">{review.customer.name}</h3>
{/* Horizontal line below the customer name */}
<hr className="review-divider" />

    {/* Displaying all the ratings */}
    <div className="rating-section">
      <div className="rating-item">
        <p>Food Quality</p>
        <StarRating rating={review.rating.foodQuality} readOnly />
      </div>
      <div className="rating-item">
        <p>Service Quality</p>
        <StarRating rating={review.rating.serviceQuality} readOnly />
      </div>
      <div className="rating-item">
        <p>Atmosphere Quality</p>
        <StarRating rating={review.rating.atmosphereQuality} readOnly />
      </div>
    </div>

    {/* Horizontal line below the customer name */}
    <hr className="review-divider" />

    <p className="review-note">{review.note}</p>
  </div>
);

// Prop types validation
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
};

// Main Review Section with Carousel
const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/review/getAll');
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
    <div className="review-section-custom">
      <h2 className="section-heading">Customer Reviews</h2>
      {reviews.length > 0 ? (
        <Carousel interval={null} className="carousel-container-custom">
          {reviews.map((review) => (
            <Carousel.Item key={review.id}>
              <Review review={review} />
            </Carousel.Item>
          ))}
          <style>
            {`
              .carousel-indicators [data-bs-target] {
                background-color: black; /* Set background color of the indicators to black */
              }
              .carousel-indicators .active {
                background-color: #343a40; /* A darker shade for the active indicator (optional) */
              }
            `}
          </style>
        </Carousel>
      ) : (
        <p>No reviews yet. Be the first to leave a review!</p>
      )}
    </div>
  );
};

export default ReviewSection;
