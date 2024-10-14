import React from 'react';
import CustomerDashboardHeader from './CustomerDashboardHeader';

const DashboardContainer = ({ children, isLoggedIn, onLogout }) => {
  return (
    <div className="dashboard-container">
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="dashboard-content">
        {children} {/* This will render the specific content passed to the container */}
      </div>
    </div>
  );
};

export default DashboardContainer;
