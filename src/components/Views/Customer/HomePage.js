import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  useEffect(() => {
    const title = document.querySelector('.typewriter-title');
    const text = title.textContent;
    title.textContent = '';

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        title.textContent += text[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust speed of typing here (100ms per letter)
  }, []);

  return (
    <div className="home-page">
      <div className="about-section">
        <h1 className="display-4 mb-4 typewriter-title">About Club Curry</h1>
        <p className="lead mb-4 fade-in-text">
          Welcome to the Club Curry. We offer a variety of delicious curries...
        </p>
        <p className="lead mb-4 fade-in-slide-up-text">
        IN THE HEART OF THE KITCHEN… Our Ayurvedic Head Chef and his gang are from Delhi… 
          They’ve woven North Indian cuisine and music into their souls since they were youngsters. 
          The hub of Club Curry, from deep in the spice kitchens of the famous Taj Palace in Mumbai, 
          the Ayurvedic blending of spice, carefully selected meats, organic veg and pulses creates 
          true food balance and wondrous healthy results.
        </p>
        <p className="lead mb-4 fade-in-slide-down-text">
        They love food… we love them. To Cape Town… from Club Curry with Love x
        </p>
        <Button variant="danger" as={Link} to="/menu" className="buttonmen fade-in-text">
          View Menu & Order
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
