import React, {useEffect, useState} from 'react';
import './OrderManagement.css';
import axios from "axios";

// Modal component for viewing details
const OrdersModal = ({ order, onClose }) => {
  if (!order) return null; // Don't render if no order is selected

  return (
    <div className="orders-modal-overlay">
      <div className="orders-modal">
        <h2>Order Details</h2>
        <div className="modal-content">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Payment Type:</strong> {order.paymentMethod}</p>
          <p><strong>Customer Name:</strong> {order.cart.customer.name ? order.cart.customer.name : 'Walk-in Customer'}</p>
          <p><strong>Total:</strong> R{order.cart.items.reduce((total, current) => (total + current.menuItem.price * current.quantity), 0)}</p>
          <h3>Cart Items</h3>
          {order.cart && order.cart.items.length > 0 ? (
              <ul>
              {order.cart.items.map((item, index) => (
                <li key={index}>
                  <p><strong>{item.menuItem.name}</strong> x {item.quantity}</p>
                  <p>Price: R {item.menuItem.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const OrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/ClubCurry/orders/getAll");
        setOrders(response.data);
        console.log("Loaded orders successfully" + orders)
      }
      catch (error){
        console.log("Error fetching orders" + error);
      }
    }

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId && order.status !== 'Cancelled'
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order to be viewed in modal
  };

  const handleCloseModal = () => {
    setSelectedOrder(null); // Close the modal
  };

  const getStatusOptions = (collectionType) => {
    if (collectionType === 'Delivery') {
      return ['Pending', 'In Transit', 'Delivered', 'Cancelled'];
    } else if (collectionType === 'Dine-in') {
      return ['Pending', 'Preparing', 'Completed', 'Cancelled'];
    } else {
      return ['Pending', 'Ready for Pickup', 'Completed', 'Cancelled'];
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toString().includes(searchQuery) ||
    (order.cart.customer.name && order.cart.customer.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="order-management">
     
      <h2 id="OM-header">Order Management</h2>

      <input
        type="text"
        placeholder="Search by Order ID or Customer Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Dine-in Orders Table */}
      <div className="table-container">
        <h3>Dine-in Orders</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Customer</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders
              .filter((order) => order.collectionType === 'DINE_IN')
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.ordered}</td>
                  <td>{order.time}</td>
                  <td>{order.cart.customer.name ? order.cart.customer.name : 'Walk-in Customer'}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <select class="status-dropdown"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={order.status === 'Cancelled'}
                    >
                      {getStatusOptions(order.collectionType).map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td class="action-cell">
                    <button onClick={() => handleViewDetails(order)} class="btn-view-details">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Orders Table */}
      <div className="table-container">
        <h3>Delivery Orders</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Delivery ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Customer</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders
              .filter((order) => order.collectionType === 'DELIVERY')
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.deliveryId}</td>
                  <td>{order.ordered}</td>
                  <td>{order.time}</td>
                  <td>{order.cart.customer.name}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={order.status === 'Cancelled'}
                    >
                      {getStatusOptions(order.collectionType).map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td class="action-cell">
                    <button onClick={() => handleViewDetails(order)} class="btn-view-details">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pickup Orders Table */}
      <div className="table-container">
        <h3>Pickup Orders</h3>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Customer</th>
              <th>Payment Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders
              .filter((order) => order.collectionType === 'PICKUP')
              .map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.ordered}</td>
                  <td>{order.time}</td>
                  <td>{order.cart.customer.name ? order.cart.customer.name : 'Walk-in Customer'}</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={order.status === 'Cancelled'}
                    >
                      {getStatusOptions(order.collectionType).map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td class="action-cell">
                    <button onClick={() => handleViewDetails(order)} class="btn-view-details">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal for viewing order details */}
      <OrdersModal order={selectedOrder} onClose={handleCloseModal} />
    </div>
  );
};

export default OrderManagement;
