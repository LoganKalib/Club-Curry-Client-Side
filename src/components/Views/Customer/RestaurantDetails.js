// src/components/RestaurantDetails.js

import React from 'react';
import PropTypes from 'prop-types';
import './CustomerCss/RestaurantDetails.css'; // Create this CSS file for specific styling

const RestaurantDetails = () => {
    return (
      <div className="restaurant-details-section">
        <div className="details-left">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.872085711296!2d18.419742215223726!3d-33.92486898064242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6765df2fa921%3A0x73daccbd1e24d63d!2sCape%20Town%20City%20Centre%2C%20Cape%20Town%2C%208000!5e0!3m2!1sen!2sza!4v1691409942597!5m2!1sen!2sza"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
          <p>Click map to view Google Maps</p>
        </div>
        <div className="details-right">
          <div className="address-section">
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <strong>Address</strong>
            </p>
            <p className="address-description">Come say hello and enjoy some good food!</p>
            <p className="address-details">123 Spice Avenue, Cape Town, 8000</p>
          </div>
          <div className="phone-section">
            <p>
              <i className="fas fa-phone"></i>
              <strong>Phone</strong>
            </p>
            <p className="phone-details">+27 21 123 4567</p>
          </div>
          <div className="email-section">
            <p>
              <i className="fas fa-envelope"></i>
              <strong>Email</strong>
            </p>
            <p className="email-description">Chat with us</p>
            <p className="email-details">contact@clubcurry.co.za</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default RestaurantDetails;