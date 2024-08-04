import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function HomePage() {
  return (
    <div className="home-page">
      <div className="about-section">
        <h1 className="display-4 mb-4">About Club Curry</h1>
        <p className="lead mb-4">
          Welcome to the Club Curry. We offer a variety of delicious curries...
        </p>
        <Button variant="primary" as={Link} to="/menu" className="buttonmen">
          View Menu & Order
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
