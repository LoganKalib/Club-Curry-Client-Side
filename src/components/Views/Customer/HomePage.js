import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookingModal from '../../Common/BookingModal';
import ReviewSection from './ReviewSection'; // Import the new component
import '../../../CSS/HomePage.css';
import chef from '../../../images/chefs.jpg';
import food from '../../../images/food.jpg';

const sampleMenuItems = [
  { id: 1, name: 'Chicken Curry' },
  { id: 2, name: 'Lamb Vindaloo' },
  { id: 3, name: 'Vegetable Biryani' },
  { id: 4, name: 'Paneer Butter Masala' },
  { id: 5, name: 'Naan Bread' }
];

function HomePage({ setShowBooking, showBooking }) {
  return (
    <div className="home-page">
      {/* About Section */}
      <div className="about-section">
        <h1 className="display-7 mb-4 typewriter-title">A Symphony of Authentic Indian Flavors</h1>
        <h3 className="lead mb-4 fade-in-text">
          <b>Welcome to Club Curry. We offer a variety of delicious curries...</b>
        </h3>
        <p className="lead-p">
          At Club Curry, we are passionate about bringing the authentic taste of North Indian cuisine to you.<br />
          Our skilled chefs use a blend of traditional Ayurvedic spices and the freshest ingredients to create<br />
          dishes that are both healthy and delicious. Join us for a meal and experience the rich flavors of India.
        </p>
        <Button variant="danger" as={Link} to="/menu" className="buttonmen fade-in-text">
          View Menu & Order
        </Button>
      </div>

      {/* About Us Section */}
      <div className="wrapper">
        <div className="about-us-section">
          <div className="about-us-images">
            <img src={chef} alt="chefs preparing dishes" />
            <img src={food} alt="various food dishes" />
          </div>
          <div className="about-us-content">
            <h2 className="about-us-heading">About Us</h2><br />
            <p className="lead">
              AT THE HEART OF OUR KITCHEN…<br /><br />
              Our Ayurvedic Head Chef and his team hail from Delhi, where they have
              embraced North Indian cuisine and music since childhood. At Club Curry,
              we bring the essence of the Taj Palace’s renowned spice kitchens from
              Mumbai right to your table. Our Ayurvedic approach combines expertly
              blended spices with carefully selected meats, organic vegetables, and
              pulses to create a harmonious balance of flavors and promote delightful,
              healthy results.
            </p>
            <Button variant="danger" className="button-booking" onClick={() => setShowBooking(true)}>
              Book a Table
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection menuItems={sampleMenuItems} />

      {/* Restaurant Details Section */}
      <div className="restaurant-details-section">
        <div className="details-left">
          <div className="trading-hours">
            <h3>Trading Hours</h3>
            <ul>
              <li>Monday - Saturday: 11:00 AM - 10:00 PM</li>
              <li>Sunday: 12:00 PM - 8:00 PM</li>
              <li>Public Holidays: 12:00 PM - 8:00 PM</li>
            </ul>
          </div>
          <div className="map-container">
            {/* Embed Google Maps centered on Cape Town */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.872085711296!2d18.419742215223726!3d-33.92486898064242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc6765df2fa921%3A0x73daccbd1e24d63d!2sCape%20Town%20City%20Centre%2C%20Cape%20Town%2C%208000!5e0!3m2!1sen!2sza!4v1691409942597!5m2!1sen!2sza"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
        </div>
        <div className="details-right">
          <div className="address-section">
            <p>
              <i className="fas fa-map-marker-alt"></i>
              <h3><strong>Address</strong></h3>
            </p>
            <p className="address-description">
              Come say hello and enjoy some good food!
            </p>
            <p className="address-details">123 Spice Avenue, Cape Town, 8000</p>
          </div>
          <div className="phone-section">
            <p>
              <i className="fas fa-phone"></i>
              <h3><strong>Phone</strong></h3>
            </p>
            <p className="phone-details">+27 21 123 4567</p>
          </div>
          <div className="email-section">
            <p>
              <i className="fas fa-envelope"></i>
              <h3><strong>Email</strong></h3>
            </p>
            <p className="email-description">Chat with us</p>
            <p className="email-details">contact@clubcurry.co.za</p>
          </div>
        </div>
      </div>

      {showBooking && <BookingModal show={showBooking} onHide={() => setShowBooking(false)} />}
    </div>
  );
}

export default HomePage;
