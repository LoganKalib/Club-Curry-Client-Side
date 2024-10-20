import React, { useState, useEffect } from 'react';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerNavbar from './CustomerNavbar';
import CustomerDashboard from './CustomerDashboard';
import CustomerReviews from './CustomerReviews';
import OrderHistorySection from './OrderHistorySection';
import PropTypes from 'prop-types';
import './CustomerCss/DashboardLayout.css';
import axios from 'axios';

const DashboardLayout = ({ isLoggedIn, onLogout, decodedValue }) => {
  const [activeSection, setActiveSection] = useState('dashboard'); // Track the active section
  const [customer, setCustomer] = useState(null); // State to store customer data
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(decodedValue.sub);
        // Fetch customer data based on decoded token
        const userResponse = await axios.get(`http://localhost:8080/ClubCurry/customer/readByUsername/${decodedValue.sub}`);
        const userData = await userResponse.data;
        console.log(userData);
        // Assuming userData contains an id property for the user
        const userId = userData.email;
        
        const customerResponse = await axios.get(`http://localhost:8080/ClubCurry/customer/get/${userId}`);
        const customerData = await customerResponse.data;
        console.log(customerData);
        setCustomer(customerData); // Set the fetched customer data
      } catch (error) {
        console.error('Error fetching user data or customer data:', error);
        setError('Failed to load customer data'); // Set error message
      }
    };

    if (decodedValue) {
      fetchUserData(); // Fetch data when decodedValue is available
    }
  }, [decodedValue]);

  return (
    <div className="dashboard-layout">
      <CustomerDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <CustomerNavbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <div className="dashboard-content">
        {/* Conditionally render the active section's component */}
        {error && <div className="error-message">{error}</div>}
        {activeSection === 'dashboard' && <CustomerDashboard customer={customer} />}
        {activeSection === 'reviews' && <CustomerReviews customer={customer} />}
        {activeSection === 'order-history' && <OrderHistorySection customer={customer} />}
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  decodedValue: PropTypes.object.isRequired, // Expect decoded token
};

export default DashboardLayout;
