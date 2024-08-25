import React, { useState } from 'react';
import { Tab, Tabs, Row, Col, Card } from 'react-bootstrap';
import DriverDashboard from './DriverDashboard';

const DriverDashboardContainer = ({ onLogout }) => {
  const [deliveries, setDeliveries] = useState([
    // Sample delivery data
    {
      deliveryId: 1,
      orderId: 101,
      foodName: 'Pizza',
      price: 12.99,
      quantity: 2,
      customerName: 'John Doe',
      customerContact: '123-456-7890',
      address: '123 Main St',
      estimatedDeliveryTime: '12:30',
      status: 'pending',
      deliveryTime: null,
      deliveryNote: 'Please ring the doorbell',
    },
    {
      deliveryId: 2,
      orderId: 102,
      foodName: 'Burger',
      price: 8.49,
      quantity: 1,
      customerName: 'Jane Smith',
      customerContact: '987-654-3210',
      address: '456 Elm St',
      estimatedDeliveryTime: '13:00',
      status: 'in transit',
      deliveryTime: null,
      deliveryNote: 'Leave at the front door',
    },
    {
      deliveryId: 3,
      orderId: 103,
      foodName: 'Pasta',
      price: 15.99,
      quantity: 3,
      customerName: 'Emily Johnson',
      customerContact: '555-6789',
      address: '789 Pine St',
      estimatedDeliveryTime: '12:45',
      status: 'delivered',
      deliveryTime: '12:50',
      deliveryNote: 'Knock gently',
    },
  ]);

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

  const outstandingDeliveries = deliveries.filter(
    (delivery) => delivery.status !== 'delivered'
  );

  const deliveredDeliveries = deliveries.filter(
    (delivery) => delivery.status === 'delivered'
  );

  const totalNewOrders = outstandingDeliveries.length;
  const totalCompletedOrders = deliveredDeliveries.length;

  return (
    <div className="driver-dashboard-container">
      <DriverDashboard isLoggedIn={true} onLogout={onLogout} />
      <Tabs defaultActiveKey="new-orders" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="profile" title="Driver Profile">
          <Row className="m-3">
            <Col md={12}>
              <Card className="dashboard-card mb-3">
                <Card.Header>Driver Profile</Card.Header>
                <Card.Body>
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Email:</strong> driver@example.com</p>
                  <p><strong>Phone:</strong> 555-1234</p>
                  <p><strong>Vehicle:</strong> Toyota Camry</p>
                  <p><strong>License Plate:</strong> ABC123</p>
                </Card.Body>
              </Card>
              <Card className="dashboard-card mb-3">
                <Card.Header>Performance Summary</Card.Header>
                <Card.Body>
                  <p><strong>Total New Orders:</strong> {totalNewOrders}</p>
                  <p><strong>Total Completed Orders:</strong> {totalCompletedOrders}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="new-orders" title="New Orders">
          <Row className="m-3">
            {outstandingDeliveries.length > 0 ? (
              outstandingDeliveries.map((delivery) => (
                <Col md={6} lg={4} key={delivery.deliveryId}>
                  <Card className="dashboard-card mb-3">
                    <Card.Header>Order ID: {delivery.orderId}</Card.Header>
                    <Card.Body>
                      <p><strong>Address:</strong> {delivery.address}</p>
                      <p><strong>Status:</strong> {delivery.status}</p>
                      <p><strong>Customer Contact:</strong> {delivery.customerContact}</p>
                      <p><strong>Customer Name:</strong> {delivery.customerName}</p>
                      <p><strong>Food Name:</strong> {delivery.foodName}</p>
                      <p><strong>Price:</strong> ${delivery.price.toFixed(2)}</p>
                      <p><strong>Quantity:</strong> {delivery.quantity}</p>
                      <p><strong>Estimated Delivery Time:</strong> {delivery.estimatedDeliveryTime}</p>
                      {delivery.status === 'pending' && (
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            handleUpdateStatus(delivery.deliveryId, 'in transit')
                          }
                        >
                          In Transit
                        </button>
                      )}
                      {delivery.status === 'in transit' && (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleUpdateStatus(delivery.deliveryId, 'delivered')
                          }
                        >
                          Delivered
                        </button>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>No outstanding deliveries.</p>
              </Col>
            )}
          </Row>
        </Tab>
        <Tab eventKey="completed-orders" title="Completed Orders">
          <Row className="m-3">
            {deliveredDeliveries.length > 0 ? (
              deliveredDeliveries.map((delivery) => (
                <Col md={6} lg={4} key={delivery.deliveryId}>
                  <Card className="dashboard-card mb-3">
                    <Card.Header>Order ID: {delivery.orderId}</Card.Header>
                    <Card.Body>
                      <p><strong>Address:</strong> {delivery.address}</p>
                      <p><strong>Status:</strong> {delivery.status}</p>
                      <p><strong>Customer Contact:</strong> {delivery.customerContact}</p>
                      <p><strong>Customer Name:</strong> {delivery.customerName}</p>
                      <p><strong>Food Name:</strong> {delivery.foodName}</p>
                      <p><strong>Price:</strong> ${delivery.price.toFixed(2)}</p>
                      <p><strong>Quantity:</strong> {delivery.quantity}</p>
                      <p><strong>Estimated Delivery Time:</strong> {delivery.estimatedDeliveryTime}</p>
                      <p><strong>Delivery Time:</strong> {delivery.deliveryTime}</p>
                      <p><strong>Delivery Note:</strong> {delivery.deliveryNote}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>No completed deliveries.</p>
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

export default DriverDashboardContainer;
