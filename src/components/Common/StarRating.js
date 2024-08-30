import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './StarRating.css';

const StarRating = ({ rating, onRate }) => {
  const [currentRating, setCurrentRating] = useState(parseInt(rating, 10));

  const handleClick = (rate) => {
    setCurrentRating(rate);
    if (onRate) {
      onRate(rate);
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`star ${index < currentRating ? 'filled' : ''}`}
          onClick={() => handleClick(index + 1)}
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.string.isRequired, // Enum rating as string
  onRate: PropTypes.func,
};

export default StarRating;
