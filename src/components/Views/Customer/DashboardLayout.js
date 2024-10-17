import React from 'react';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerDashboard from './CustomerDashboard';
import CustomerReviews from './CustomerReviews';
import OrderHistorySection from './OrderHistorySection';
import PropTypes from 'prop-types';

const DashboardLayout = ({ isLoggedIn, onLogout, onShowCart }) => {
  const handleAddReview = (newReview) => {
    console.log('New Review Added:', newReview);
  };

  const handleDeleteReview = (reviewId) => {
    console.log('Review Deleted:', reviewId);
  };

  return (
    <div className="dashboard-layout">
      <CustomerDashboardHeader 
        isLoggedIn={isLoggedIn} 
        onLogout={onLogout} 
        onShowCart={onShowCart} 
      />
      <div className="dashboard-content">
        <CustomerDashboard />
        <CustomerReviews onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} />
        <OrderHistorySection />
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onShowCart: PropTypes.func.isRequired,
};

export default DashboardLayout;
