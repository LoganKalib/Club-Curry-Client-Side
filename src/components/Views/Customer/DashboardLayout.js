import React, { useState } from 'react';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerDashboard from './CustomerDashboard';
import CustomerReviews from './CustomerReviews';
import OrderHistorySection from './OrderHistorySection';
import PropTypes from 'prop-types';

const DashboardLayout = ({ isLoggedIn, onLogout, onShowCart }) => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Track the active section

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
      
      {/* Navigation bar for customer sections */}
      <div className="customer-navbar">
        <button 
          className={`customer-nav-button ${activeSection === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveSection('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`customer-nav-button ${activeSection === 'reviews' ? 'active' : ''}`} 
          onClick={() => setActiveSection('reviews')}
        >
          Reviews
        </button>
        <button 
          className={`customer-nav-button ${activeSection === 'order-history' ? 'active' : ''}`} 
          onClick={() => setActiveSection('order-history')}
        >
          Order History
        </button>
      </div>

      <div className="dashboard-content">
        {/* Conditionally render the active section's component */}
        {activeSection === 'dashboard' && <CustomerDashboard />}
        {activeSection === 'reviews' && (
          <CustomerReviews 
            onAddReview={handleAddReview} 
            onDeleteReview={handleDeleteReview} 
          />
        )}
        {activeSection === 'order-history' && <OrderHistorySection />}
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
