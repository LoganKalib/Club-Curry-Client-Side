import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../Driver/DriverCSS/Deliveries.css';

const Deliveries = ({ deliveries = [], onUpdateStatus }) => {
  // Filter only pending deliveries
  const pendingDeliveries = deliveries.filter(delivery => delivery.status === 'pending');

  // Calculate total deliveries and percentage (for demo purposes, using static values)
  const totalPendingDeliveries = pendingDeliveries.length;
  const previousTotalDeliveries = 100; // Example previous value for total deliveries
  const percentagePending = ((totalPendingDeliveries / previousTotalDeliveries) * 100) || 0;

  return (
    <div className="deliveries-container">
      <h2>Pending Deliveries</h2>
      
      <div className="deliveries-summary">
        <h4>Total Pending Deliveries</h4>
        <h1>{totalPendingDeliveries}</h1>
        <div className="progress-circle">
          <CircularProgressbar
            value={percentagePending}
            text={`${Math.round(percentagePending)}%`}
            styles={buildStyles({
              pathColor: '#FF9800', // Customize color for the progress bar
              textColor: '#333',
              trailColor: '#e0e0e0',
            })}
          />
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Contact</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingDeliveries.length === 0 ? (
            <tr>
              <td colSpan="6">No pending deliveries</td>
            </tr>
          ) : (
            pendingDeliveries.map(delivery => (
              <tr key={delivery.deliveryId}>
                <td>{delivery.orderId}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.customerContact}</td>
                <td>{delivery.address}</td>
                <td>{delivery.status}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => onUpdateStatus(delivery.deliveryId, 'in transit')}
                  >
                    In Transit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

Deliveries.propTypes = {
  deliveries: PropTypes.array,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default Deliveries;
