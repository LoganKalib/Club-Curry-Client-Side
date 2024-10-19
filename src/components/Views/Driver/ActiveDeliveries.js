import React from 'react';
import PropTypes from 'prop-types';
import '../Driver/DriverCSS/ActiveDeliveries.css'; // Make sure you have this CSS file for styling

const ActiveDeliveries = ({ deliveries = [], onUpdateStatus }) => {
  // Filter only deliveries that are in transit
  const inTransitDeliveries = deliveries.filter(delivery => delivery.status === 'in transit');

  return (
    <div className="active-deliveries-container">
      <h2>Orders In Transit</h2>
      <div className="active-deliveries-card-grid">
        {inTransitDeliveries.length === 0 ? (
          <p>No active deliveries</p>
        ) : (
          inTransitDeliveries.map(delivery => (
            <div key={delivery.deliveryId} className="active-delivery-card">
              <h3>Order #{delivery.orderId}</h3>
              <p><strong>Customer Name:</strong> {delivery.customerName}</p>
              <p><strong>Customer Contact:</strong> {delivery.customerContact}</p>
              <p><strong>Address:</strong> {delivery.address}</p>
              <p><strong>Status:</strong> {delivery.status}</p>
              <button
                className="active-delivery-btn delivered-btn"
                onClick={() => onUpdateStatus(delivery.deliveryId, 'delivered')}
              >
                Mark as Delivered
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ActiveDeliveries.propTypes = {
  deliveries: PropTypes.array,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default ActiveDeliveries;
