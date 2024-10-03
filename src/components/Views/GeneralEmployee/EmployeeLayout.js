import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; 
import OrderSummary from './OrderSummary'; 
import OrderContext from './OrderContext';
import './Employee.css';

const EmployeeLayout = ({ isLoggedIn, onLogout }) => {
  // Correctly use useContext to access OrderContext
  const { orderSummary, setOrderSummary } = useContext(OrderContext); 

  const addToOrder = (product) => {
    const existingItem = orderSummary.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if already in the order
      setOrderSummary([...orderSummary]); // Update the orderSummary state
    } else {
      setOrderSummary([...orderSummary, { ...product, quantity: 1 }]); // Add new item
    }
  };

  const onSubmitOrder = () => {
    setOrderSummary([]); // Clear the order summary
  };

  const location = useLocation(); 
  const showOrderSummary = !['/orderManagement', '/employee'].includes(location.pathname);

  return (
    <div className="employee-container">
      <EmployeeHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <nav className="side-nav">
        <ul>
          <li><a href="/orderManagement"><i className="fas fa-receipt"></i> Order Management</a></li>
          <li><a href="/employee"><i className="fas fa-th-list"></i> All Categories</a></li>
          <li><a href="/drinks"><i className="fas fa-glass-cheers"></i> Drinks</a></li>
          <li><a href="/starters"><i className="fas fa-utensils"></i> Starters</a></li>
          <li><a href="/mains"><i className="fas fa-drumstick-bite"></i> Mains</a></li>
          <li><a href="/curries"><i className="fas fa-pepper-hot"></i> Curries</a></li>
          <li><a href="/desserts"><i className="fas fa-ice-cream"></i> Desserts</a></li>
          <li><a href="/specials"><i className="fas fa-star"></i> Specials</a></li>
        </ul>
      </nav>
      <div className="employee-main-content">
        <Outlet context={{ addToOrder }} /> {/* Only pass addToOrder */}
      </div>
      {showOrderSummary && <OrderSummary summary={orderSummary} onSubmitOrder={onSubmitOrder} />}
    </div>
  );
};

export default EmployeeLayout;
