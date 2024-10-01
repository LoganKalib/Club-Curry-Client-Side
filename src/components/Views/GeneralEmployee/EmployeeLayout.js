import React from 'react';
import { Outlet } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; // Make sure to import EmployeeHeader
import './Employee.css';

const EmployeeLayout = ({ isLoggedIn, onLogout }) => { // Accept props
  return (
    <div className="employee-container">
      <EmployeeHeader isLoggedIn={isLoggedIn} onLogout={onLogout} /> {/* Pass props */}
      <nav className="side-nav">
        <ul>
          <li><a href="/new-order"><i className="fas fa-plus-circle"></i> New Order</a></li>
          <li><a href="/orderManagement"><i className="fas fa-clock"></i> Order Management</a></li>
          <li><a href="/bookings"><i className="fas fa-calendar-alt"></i> Bookings</a></li>
        </ul>
      </nav>
      <div className="employee-main-content">
        {/* This is where the specific page content will be rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeLayout;
