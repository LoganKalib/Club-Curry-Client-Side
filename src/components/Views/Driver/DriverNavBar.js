import React from 'react';
import '../Driver/DriverCSS/DriverNavbBar.css';
import driverImage from '../../../images/driver.png'

const DriverNavbar = ({ activeSection, setActiveSection }) => {
  // Driver profile data
  const driverProfile = {
    name: 'Jane Smith',
    imageUrl: driverImage// Replace with driver's actual image URL
  };

  return (
    <div className="driver-navbar">
      <div className="driver-navbar-buttons">
        <button 
          className={`driver-nav-button ${activeSection === 'active-deliveries' ? 'active' : ''}`} 
          onClick={() => setActiveSection('active-deliveries')}
        >
          Active Deliveries
        </button>
        <button 
          className={`driver-nav-button ${activeSection === 'completed-deliveries' ? 'active' : ''}`} 
          onClick={() => setActiveSection('completed-deliveries')}
        >
          Completed Deliveries
        </button>
        <button 
          className={`driver-nav-button ${activeSection === 'deliveries' ? 'active' : ''}`} 
          onClick={() => setActiveSection('deliveries')}
        >
          My Deliveries
        </button>
        <button 
          className={`driver-nav-button ${activeSection === 'profile' ? 'active' : ''}`} 
          onClick={() => setActiveSection('profile')}
        >
          Profile
        </button>
      </div>

      {/* Driver profile section */}
      <div className="driver-profile">
        <img src={driverProfile.imageUrl} alt="Driver" className="profile-picture" />
        <p className="driver-name">{driverProfile.name}</p>
      </div>
    </div>
  );
};

export default DriverNavbar;
