import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import '../Driver/DriverCSS/DriverDashboardContainer.css';
import DriverDashboardHeader from './DriverDashboardHeader';
import DriverNavbar from './DriverNavBar';
import ActiveDeliveries from '../Driver/ActiveDeliveries';
import CompletedDeliveries from '../Driver/CompletedDeliveries';
import Deliveries from '../Driver/Deliveries';
import DriverProfile from '../Driver/DriverProfile';

const DriverDashboardContainer = ({ onLogout, decodedValue }) => {
  console.log(decodedValue);
  // State to manage the list of deliveries
  const [deliveries, setDeliveries] = useState([
    {
      deliveryId: 1,
      orderId: 101,
      order: 'Pizza',
      price: 12.99,
      customerName: 'John Doe',
      customerContact: '123-456-7890',
      address: '123 Main St',
      status: 'pending',
      deliveryTime: null,
      deliveryNote: 'Please ring the doorbell',
    },
    {
      deliveryId: 2,
      orderId: 102,
      order: 'Burger',
      price: 9.99,
      customerName: 'Jane Smith',
      customerContact: '987-654-3210',
      address: '456 Elm St',
      status: 'in transit',
      deliveryTime: null,
      deliveryNote: 'Leave at the doorstep',
    },
    {
      deliveryId: 3,
      orderId: 103,
      order: 'Sushi',
      price: 15.99,
      customerName: 'Emily Johnson',
      customerContact: '555-123-4567',
      address: '789 Oak St',
      status: 'delivered',
      deliveryTime: '13:25',
      deliveryNote: '',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('active-deliveries'); // Track the active section

  // Example state for performance metrics
  const [activeDeliveries, setActiveDeliveries] = useState(125);
  const [activeChange, setActiveChange] = useState(-5); // Example percentage change
  const [averageDeliveries, setAverageDeliveries] = useState(80);
  const [averageChange, setAverageChange] = useState(-3);

  // Function to update the status of a delivery
  const handleUpdateStatus = (deliveryId, newStatus) => {
    const currentTime = newStatus === 'delivered' ? new Date().toLocaleString() : null;
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery.deliveryId === deliveryId
          ? { ...delivery, status: newStatus, deliveryTime: currentTime }
          : delivery
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter deliveries to get outstanding (not delivered) deliveries
  const outstandingDeliveries = deliveries.filter(
    (delivery) => delivery.status !== 'delivered'
  );

  // Filter deliveries to get completed (delivered) deliveries
  const deliveredDeliveries = deliveries.filter(
    (delivery) => delivery.status === 'delivered'
  );

  const filteredDeliveredDeliveries = deliveredDeliveries.filter(delivery =>
    delivery.orderId.toString().includes(searchTerm)
  );

  return (
    <div className="driver-dashboard-container">
      <DriverDashboardHeader isLoggedIn={true} onLogout={onLogout} />
      <Row>
        <Col md={2}>
          <DriverNavbar 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} // Pass down the state and setter
          />
        </Col>
        <Col md={10}>
          {/* Conditionally render the active section's component */}
          <div className="tabs-container">
            {activeSection === 'active-deliveries' && (
              <ActiveDeliveries
                deliveries={outstandingDeliveries}
                handleUpdateStatus={handleUpdateStatus}
              />
            )}
            {activeSection === 'completed-deliveries' && (
              <CompletedDeliveries
                deliveries={filteredDeliveredDeliveries}
                handleSearchChange={handleSearchChange}
                searchTerm={searchTerm}
              />
            )}
            {activeSection === 'deliveries' && <Deliveries deliveries={deliveries} />}
            {activeSection === 'profile' && <DriverProfile />}
            {activeSection === 'performance-overview' && (
              <div className="performance-overview">
                <h2 className="overview-title">Performance Overview</h2>
                <Row>
                  <Col md={6}>
                    <Card className="overview-card">
                      <Card.Body>
                        <div className="delivery-metrics">
                          <div>
                            <h3 className="metric-title">Active Deliveries</h3>
                            <h1 className="metric-value">{activeDeliveries}</h1>
                            <span className={`metric-change ${activeChange < 0 ? 'down' : 'up'}`}>
                              {activeChange}% {activeChange < 0 ? '▼' : '▲'}
                            </span>
                          </div>
                          <div className="metric-graph">
                            <div className="bar-graph">
                              <div className="bar" style={{ height: '70%' }}></div>
                              <div className="bar" style={{ height: '50%' }}></div>
                              <div className="bar" style={{ height: '80%' }}></div>
                              <div className="bar" style={{ height: '60%' }}></div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="overview-card">
                      <Card.Body>
                        <div className="delivery-metrics">
                          <div>
                            <h3 className="metric-title">Average Deliveries</h3>
                            <h1 className="metric-value">{averageDeliveries}</h1>
                            <span className={`metric-change ${averageChange < 0 ? 'down' : 'up'}`}>
                              {averageChange}% {averageChange < 0 ? '▼' : '▲'}
                            </span>
                          </div>
                          <div className="metric-graph">
                            <div className="bar-graph">
                              <div className="bar" style={{ height: '70%' }}></div>
                              <div className="bar" style={{ height: '60%' }}></div>
                              <div className="bar" style={{ height: '50%' }}></div>
                              <div className="bar" style={{ height: '80%' }}></div>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DriverDashboardContainer;
