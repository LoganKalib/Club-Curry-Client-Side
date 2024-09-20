import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './StarRating.css';

// Mapping enum values to numeric ratings
const ratingValues = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const StarRating = ({ rating, onRate, readOnly }) => {
  const currentRating = ratingValues[rating]; // Get numeric rating based on enum

  const handleClick = (rate) => {
    if (!readOnly) {
      if (onRate) {
        onRate(rate);
      }
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`star ${index < currentRating ? 'filled' : ''}`}
          onClick={() => handleClick(index + 1)}
          style={{ cursor: readOnly ? 'default' : 'pointer' }} // Change cursor style for readOnly
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.oneOf(Object.keys(ratingValues)).isRequired, // Enum keys as valid props
  onRate: PropTypes.func,
  readOnly: PropTypes.bool,
};

StarRating.defaultProps = {
  onRate: () => {},
  readOnly: false,
};

export default StarRating;
