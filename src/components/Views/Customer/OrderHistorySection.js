import React, { useState, useEffect } from 'react';
import { Table, Card, Row, Col, Button } from 'react-bootstrap';


const OrderHistorySection = () => {
  // Initial dummy data
  const [orders, setOrders] = useState([
    {
      orderId: 101,
      items: [{ name: 'Pizza', quantity: 1 }],
      totalAmount: 12.99,
      orderDate: '2024-08-28T12:00:00Z',
      status: 'delivered',
    },
    {
      orderId: 102,
      items: [{ name: 'Burger', quantity: 2 }],
      totalAmount: 19.98,
      orderDate: '2024-08-27T15:00:00Z',
      status: 'delivered',
    },
    {
      orderId: 103,
      items: [{ name: 'Sushi', quantity: 1 }],
      totalAmount: 15.99,
      orderDate: '2024-08-26T18:00:00Z',
      status: 'delivered',
    },
  ]);

  const [activeDeliveries, setActiveDeliveries] = useState([
    {
      deliveryId: 201,
      orderId: 104,
      items: [{ name: 'Pasta', quantity: 1 }],
      totalAmount: 11.99,
      customerName: 'Michael Brown',
      address: '321 Maple Ave',
      status: 'in transit',
    },
    {
      deliveryId: 202,
      orderId: 105,
      items: [{ name: 'Salad', quantity: 2 }],
      totalAmount: 8.99,
      customerName: 'Laura White',
      address: '654 Pine St',
      status: 'pending',
    },
  ]);

  // Function to simulate driver updating the status
  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setActiveDeliveries(prevDeliveries => {
      const updatedDeliveries = prevDeliveries.map(delivery =>
        delivery.deliveryId === deliveryId
          ? { ...delivery, status: newStatus }
          : delivery
      );

      // Move delivered delivery to orders
      if (newStatus === 'delivered') {
        const deliveredDelivery = updatedDeliveries.find(delivery => delivery.deliveryId === deliveryId);
        setOrders(prevOrders => [...prevOrders, {
          orderId: deliveredDelivery.orderId,
          items: deliveredDelivery.items,
          totalAmount: deliveredDelivery.totalAmount,
          orderDate: new Date().toISOString(),
          status: newStatus,
        }]);
        return updatedDeliveries.filter(delivery => delivery.deliveryId !== deliveryId);
      }

      return updatedDeliveries;
    });
  };

  // Simulate driver status update after component mounts
  useEffect(() => {
    // This is a placeholder for actual data fetching or socket updates
    // Example: Simulating the driver marking a delivery as "delivered" after 5 seconds
    const timer = setTimeout(() => {
      updateDeliveryStatus(201, 'delivered');
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="order-history-section">
      <Row>
        <Col md={6}>
          {/* Active Deliveries Section */}
          <Card className="mb-4">
            <Card.Header>Active Deliveries</Card.Header>
            <Card.Body>
              {activeDeliveries.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Delivery ID</th>
                      <th>Order ID</th>
                      <th>Items</th>
                      <th>Total Amount</th>
                      <th>Customer Name</th>
                      <th>Address</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeDeliveries.map(delivery => (
                      <tr key={delivery.deliveryId}>
                        <td>{delivery.deliveryId}</td>
                        <td>{delivery.orderId}</td>
                        <td>
                          <ul>
                            {delivery.items.map((item, index) => (
                              <li key={index}>{item.name} (x{item.quantity})</li>
                            ))}
                          </ul>
                        </td>
                        <td>${delivery.totalAmount.toFixed(2)}</td>
                        <td>{delivery.customerName}</td>
                        <td>{delivery.address}</td>
                        <td>{delivery.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No active deliveries.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* Completed Orders Section */}
          <Card>
            <Card.Header>Order History</Card.Header>
            <Card.Body>
              {orders.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Items</th>
                      <th>Total Amount</th>
                      <th>Order Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>{item.name} (x{item.quantity})</li>
                            ))}
                          </ul>
                        </td>
                        <td>${order.totalAmount.toFixed(2)}</td>
                        <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No completed orders found.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderHistorySection;
