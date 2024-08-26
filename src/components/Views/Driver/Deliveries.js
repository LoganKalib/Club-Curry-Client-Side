import React from 'react';
import PropTypes from 'prop-types';


const Deliveries = ({ deliveries = [], onUpdateStatus }) => {
  const outstandingDeliveries = Array.isArray(deliveries)
    ? deliveries.filter((delivery) => delivery.status !== 'delivered')
    : [];

  return (
    <div className="deliveries-container">
      <h2>Outstanding Deliveries</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Food Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Customer Name</th>
            <th>Estimated Delivery Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {outstandingDeliveries.length === 0 ? (
            <tr>
              <td colSpan="8">No outstanding deliveries</td>
            </tr>
          ) : (
            outstandingDeliveries.map((delivery) => (
              <tr key={delivery.deliveryId}>
                <td>{delivery.orderId}</td>
                <td>{delivery.foodName}</td>
                <td>${delivery.price.toFixed(2)}</td>
                <td>{delivery.quantity}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.estimatedDeliveryTime}</td>
                <td>{delivery.status}</td>
                <td>
                  {delivery.status === 'pending' && (
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        onUpdateStatus(delivery.deliveryId, 'in transit')
                      }
                    >
                      In Transit
                    </button>
                  )}
                  {delivery.status === 'in transit' && (
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        onUpdateStatus(delivery.deliveryId, 'delivered')
                      }
                    >
                      Delivered
                    </button>
                  )}
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
