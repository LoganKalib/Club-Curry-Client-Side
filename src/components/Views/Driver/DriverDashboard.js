import React from 'react';

import DriverDashboardHeader from './DriverDashboardHeader';
import './DriverDashboard.css';

const DriverDashboard = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      <DriverDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />

      
    </>
  );
};

export default DriverDashboard;
