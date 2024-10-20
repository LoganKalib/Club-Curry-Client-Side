import React, { useState } from 'react';
import './CustomerCss/FAQ.css'; // Import the updated CSS
import faq from '../../../images/faq.png'; // Import the FAQ image

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-content">

        <div className="faq-category">
          <div className="faq-item">
            <div
              className={`faq-question ${openQuestion === 0 ? 'open' : ''}`}
              onClick={() => toggleQuestion(0)}
            >
              <h4>How do I make a reservation?</h4>
              <span className={`faq-icon ${openQuestion === 0 ? 'rotate' : ''}`}>+</span>
            </div>
            <div className="faq-answer">
              <p>
                To make a reservation, please call us directly at (555) 123-4567.
                We do not accept online reservations at this time.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div
              className={`faq-question ${openQuestion === 1 ? 'open' : ''}`}
              onClick={() => toggleQuestion(1)}
            >
              <h4>How can I cancel my reservation?</h4>
              <span className={`faq-icon ${openQuestion === 1 ? 'rotate' : ''}`}>+</span>
            </div>
            <div className="faq-answer">
              <p>
                You can cancel your reservation by calling us at least 24 hours in advance.
              </p>
            </div>
          </div>
        </div>

        <div className="faq-category">
          <div className="faq-item">
            <div
              className={`faq-question ${openQuestion === 2 ? 'open' : ''}`}
              onClick={() => toggleQuestion(2)}
            >
              <h4>What happens if I am late?</h4>
              <span className={`faq-icon ${openQuestion === 2 ? 'rotate' : ''}`}>+</span>
            </div>
            <div className="faq-answer">
              <p>
                If you're running late, please inform us as soon as possible. We can hold your
                reservation for up to 15 minutes.
              </p>
            </div>
          </div>
        </div>

        <div className="faq-category">
          <div className="faq-item">
            <div
              className={`faq-question ${openQuestion === 3 ? 'open' : ''}`}
              onClick={() => toggleQuestion(3)}
            >
              <h4>Where are you located?</h4>
              <span className={`faq-icon ${openQuestion === 3 ? 'rotate' : ''}`}>+</span>
            </div>
            <div className="faq-answer">
              <p>
                We are located at 123 Curry Lane, Spicyville. For detailed directions,
                you can visit our Contact Us page.
              </p>
            </div>
          </div>

          <div className="faq-item">
            <div
              className={`faq-question ${openQuestion === 4 ? 'open' : ''}`}
              onClick={() => toggleQuestion(4)}
            >
            <h4>Can I sit down without a reservation?</h4>

              <span className={`faq-icon ${openQuestion === 4 ? 'rotate' : ''}`}>+</span>
            </div>
            <div className="faq-answer">
                
              <p>
                Yes, we do accept walk-ins based on table availability. However,
                reservations are highly recommended.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image on the right side */}
      <div className="faq-image">
        <img src={faq} alt="FAQ" />
      </div>
    </div>
  );
};

export default FAQ;
