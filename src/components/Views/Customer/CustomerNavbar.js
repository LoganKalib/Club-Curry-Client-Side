import React from 'react';
import './CustomerCss/CustomerNavbar.css';

const CustomerNavbar = ({ activeSection, setActiveSection }) => {
  return (
    <div className="customer-navbar">
      <div className="customer-navbar-buttons">
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
    </div>
  );
};

export default CustomerNavbar;
