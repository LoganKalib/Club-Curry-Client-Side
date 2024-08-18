import React, { useState } from 'react';
import { Table, Button, Container, Form, Card } from 'react-bootstrap';
import DriverDashboardHeader from './DriverDashboardHeader';
import './DriverDashboard.css'; // Import the CSS file

const DriverDashboard = ({ driverId, isLoggedIn, onLogout }) => {
  // Sample driver profile data
  const driverProfile = {
    name: 'Michael Smith',
    vehicleRegistration: 'ABC-1234',
    driverId: driverId,
  };

  // Sample delivery data
  const [deliveries, setDeliveries] = useState([
    {
      deliveryId: 1,
      orderId: 101,
      foodName: 'Pizza',
      price: 12.99,
      quantity: 2,
      customerName: 'John Doe',
      customerContact: '123-456-7890',
      estimatedDeliveryTime: '12:30',
      status: 'pending',
      deliveryTime: null,
      deliveryNote: 'Please ring the doorbell',
    },
    {
      deliveryId: 2,
      orderId: 102,
      foodName: 'Burger',
      price: 8.99,
      quantity: 1,
      customerName: 'Jane Smith',
      customerContact: '987-654-3210',
      estimatedDeliveryTime: '13:00',
      status: 'pending',
      deliveryTime: null,
      deliveryNote: 'Leave at the front desk',
    },
    {
      deliveryId: 3,
      orderId: 103,
      foodName: 'Sushi',
      price: 18.99,
      quantity: 3,
      customerName: 'Alice Johnson',
      customerContact: '555-123-4567',
      estimatedDeliveryTime: '13:30',
      status: 'pending',
      deliveryTime: null,
      deliveryNote: 'Handle with care',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Handler to update the status of a delivery
  const handleUpdateStatus = (deliveryId, newStatus) => {
    const currentTime = newStatus === 'delivered' ? new Date().toLocaleTimeString() : null;
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.deliveryId === deliveryId
          ? { ...delivery, status: newStatus, deliveryTime: currentTime }
          : delivery
      )
    );
  };

  // Filter orders by driverId and search term
  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.driverId === driverId &&
      delivery.orderId.toString().includes(searchTerm)
  );

  return (
    <>
      {/* Include the DriverDashboardHeader */}
      <DriverDashboardHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      
      <Container style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '80px' }}>
        {/* Driver Profile Section */}
        <Card className="mb-4 card-custom driver-profile">
          <Card.Body>
            <Card.Title>Driver Profile</Card.Title>
            <Card.Text><strong>Name:</strong> {driverProfile.name}</Card.Text>
            <Card.Text><strong>Vehicle Registration:</strong> {driverProfile.vehicleRegistration}</Card.Text>
            <Card.Text><strong>Driver ID:</strong> {driverProfile.driverId}</Card.Text>
          </Card.Body>
        </Card>

        <h1>Driver Dashboard</h1>
        <Form.Group controlId="searchBar">
          <Form.Control
            type="text"
            placeholder="Search by Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Customer Name</th>
              <th>Estimated Delivery Time</th>
              <th>Order Status</th>
              <th>Action</th>
              <th>Customer Contact</th>
              <th>Delivery Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeliveries.map((delivery) => (
              <tr key={delivery.deliveryId}>
                <td>{delivery.orderId}</td>
                <td>{delivery.foodName}</td>
                <td>${delivery.price.toFixed(2)}</td>
                <td>{delivery.quantity}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.estimatedDeliveryTime}</td>
                <td>{delivery.status}</td>
                <td>
                  <div className="button-container">
                    <Button
                      className="btn-custom btn-in-transit"
                      onClick={() => handleUpdateStatus(delivery.deliveryId, 'in transit')}
                      disabled={delivery.status === 'delivered'}
                    >
                      In Transit
                    </Button>
                    <Button
                      className="btn-custom btn-delivered"
                      onClick={() => handleUpdateStatus(delivery.deliveryId, 'delivered')}
                      disabled={delivery.status === 'delivered'}
                    >
                      Delivered
                    </Button>
                  </div>
                </td>
                <td>{delivery.customerContact}</td>
                <td>{delivery.deliveryTime ? delivery.deliveryTime : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default DriverDashboard;
