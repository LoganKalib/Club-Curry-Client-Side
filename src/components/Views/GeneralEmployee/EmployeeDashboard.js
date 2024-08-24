import React, { useState } from 'react';
import './employeeDashboard.css'; // Ensure you have a CSS file for styling

// Sample order data
const orders = [
  { 
    orderId: '1', 
    description: 'Cheeseburger, Fries', 
    price: '10.00', 
    customerName: 'John Doe', 
    contactNumber: '123-456-7890',
    orderTime: '12:00 PM', 
    orderDate: '2024-08-15', 
    status: 'pending', 
    sitDownOrPickUp: 'pick-up', 
    driverId: 'driver1', 
    tableNumber: '', 
    notes: 'Extra pickles requested.'
  },
  { 
    orderId: '2', 
    description: 'Margherita Pizza, Garlic Bread', 
    price: '15.00', 
    customerName: 'Jane Smith', 
    contactNumber: '987-654-3210',
    orderTime: '1:00 PM', 
    orderDate: '2024-08-15', 
    status: 'completed', 
    sitDownOrPickUp: 'sit-down', 
    driverId: 'driver2', 
    tableNumber: '5', 
    notes: 'No cheese on half of the pizza.'
  },
  // Add more sample data as needed
];

function EmployeeDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const results = orders.filter(order =>
      order.orderId.toLowerCase().includes(value) ||
      order.customerName.toLowerCase().includes(value)
    );

    setFilteredOrders(results);
  };

  const handleAssignDriver = (orderId) => {
    // Logic to assign driver
    console.log(`Assign driver for order ${orderId}`);
  };

  const handleEditOrder = (orderId) => {
    // Logic to edit order
    console.log(`Edit order ${orderId}`);
  };

  const sitDownOrders = filteredOrders.filter(order => order.sitDownOrPickUp === 'sit-down');
  const pickUpOrders = filteredOrders.filter(order => order.sitDownOrPickUp === 'pick-up');

  return (
    <div className="employee-dashboard">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Order ID or Customer Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="table-container">
        <h2>Sit-Down Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>Customer Name</th>
              <th>Contact Number</th>
              <th>Order Time</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Table Number</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sitDownOrders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.description}</td>
                <td>{order.price}</td>
                <td>{order.customerName}</td>
                <td>{order.contactNumber}</td>
                <td>{order.orderTime}</td>
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
                <td>{order.tableNumber}</td>
                <td>{order.notes}</td>
                <td>
                  <button onClick={() => handleEditOrder(order.orderId)}>Edit Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-container">
        <h2>Pick-Up Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Description</th>
              <th>Price</th>
              <th>Customer Name</th>
              <th>Contact Number</th>
              <th>Order Time</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Driver ID</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pickUpOrders.map(order => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.description}</td>
                <td>{order.price}</td>
                <td>{order.customerName}</td>
                <td>{order.contactNumber}</td>
                <td>{order.orderTime}</td>
                <td>{order.orderDate}</td>
                <td>{order.status}</td>
                <td>{order.driverId}</td>
                <td>{order.notes}</td>
                <td>
                  <button onClick={() => handleAssignDriver(order.orderId)}>Assign Driver</button>
                  <button onClick={() => handleEditOrder(order.orderId)}>Edit Order</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
