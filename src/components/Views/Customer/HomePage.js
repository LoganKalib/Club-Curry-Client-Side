// src/components/HomePage.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../../CSS/HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <div className="about-section">
        <h1 className="display-4 mb-4">About Club Curry</h1>
        <p className="lead mb-4">
          Welcome to Club Curry, where we offer a variety of delicious curries...
        </p>
        <Button variant="primary" as={Link} to="/menu" className="button-menu">
          View Menu & Order
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
