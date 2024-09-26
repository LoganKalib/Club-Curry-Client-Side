import React from 'react';

import DriverDashboardHeader from './DriverDashboardHeader';
import DriverNavbar from './DriverNavBar';

const DriverDashboard = ({ isLoggedIn, onLogout }) => {
  return (
    <>
      <DriverDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <DriverNavbar></DriverNavbar>
      
    </>
  );
};

export default DriverDashboard;
