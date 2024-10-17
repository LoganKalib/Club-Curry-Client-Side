import React from 'react';
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './StarRating.css';

const ratingValues = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const StarRating = ({ rating, onRate, readOnly }) => {
  const currentRating = ratingValues[rating] || 0;

  const handleClick = (rate) => {
    if (!readOnly && onRate) {
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
          style={{ cursor: readOnly ? 'default' : 'pointer' }} // Change cursor style for readOnly
        />
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.oneOf(Object.keys(ratingValues)).isRequired,
  onRate: PropTypes.func,
  readOnly: PropTypes.bool,
};

StarRating.defaultProps = {
  onRate: () => {},
  readOnly: false,
};

export default StarRating;
