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
          <li><a href="/orderManagement"><i className="fas fa-receipt"></i> Order Management</a></li>
          <li><a href="/employee"><i className="fas fa-th-list"></i> All Categories</a></li>
          <li><a href="/drinks"><i className="fas fa-glass-cheers"></i> Drinks</a></li>
          <li><a href="/starters"><i className="fas fa-utensils"></i> Starters</a></li>
          <li><a href="/mains"><i className="fas fa-drumstick-bite"></i> Mains</a></li>
          <li><a href="/curries"><i className="fas fa-pepper-hot"></i> Curries</a></li>
          <li><a href="/desserts"><i className="fas fa-ice-cream"></i> Desserts</a></li>
          <li><a href="/specials"><i className="fas fa-star"></i> Specials</a></li>
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
