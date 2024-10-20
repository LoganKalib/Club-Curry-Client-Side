import React, { useState } from 'react';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerNavbar from './CustomerNavbar';
import CustomerDashboard from './CustomerDashboard';
import CustomerReviews from './CustomerReviews';
import OrderHistorySection from './OrderHistorySection';
import PropTypes from 'prop-types';
import './CustomerCss/DashboardLayout.css';

const DashboardLayout = ({ isLoggedIn, onLogout }) => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Track the active section

  return (
    <div className="dashboard-layout">
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <CustomerNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="dashboard-content">
        {/* Conditionally render the active section's component */}
        {activeSection === 'dashboard' && <CustomerDashboard />}
        {activeSection === 'reviews' && <CustomerReviews />}
        {activeSection === 'order-history' && <OrderHistorySection />}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardLayout;
