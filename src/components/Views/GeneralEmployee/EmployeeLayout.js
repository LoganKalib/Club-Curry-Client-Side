import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; 
import OrderSummary from './OrderSummary'; 
import OrderContext from './OrderContext';
import './Employee.css';

const EmployeeLayout = ({ isLoggedIn, onLogout }) => {
  const { orderSummary, setOrderSummary } = useContext(OrderContext); 
  const [menus, setMenus] = useState([]);

  // Fetch menus dynamically from the backend
  useEffect(() => {
    fetch('http://localhost:8080/ClubCurry/menu/getAll')
      .then(response => response.json())
      .then(data => setMenus(data))
      .catch(error => console.error('Error fetching menus:', error));
  }, []);

  const addToOrder = (product) => {
    const existingItem = orderSummary.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
      setOrderSummary([...orderSummary]);
    } else {
      setOrderSummary([...orderSummary, { ...product, quantity: 1 }]);
    }
  };

  const onSubmitOrder = () => {
    setOrderSummary([]);
  };

  const location = useLocation(); 
  const showOrderSummary = !['/orderManagement', '/employee'].includes(location.pathname);

  // Helper function to map category names to Font Awesome icons
  const getIconForCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'drinks': return 'glass-cheers';
      case 'starters': return 'utensils';
      case 'mains': return 'drumstick-bite';
      case 'curries': return 'pepper-hot';
      case 'desserts': return 'ice-cream';
      case 'specials': return 'star';
      default: return 'utensils'; // Default icon if no match
    }
  };

  return (
    <div className="employee-container">
      <EmployeeHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <nav className="side-nav">
        <ul>
          <li><a href="/orderManagement"><i className="fas fa-receipt"></i> Order Management</a></li> {/* Hardcoded Order Management */}
          <li><a href="/employee"><i className="fas fa-th-list"></i> All Categories</a></li>
          {menus.map((menu) => (
            <li key={menu.id}>
              <a href={`/${menu.name.toLowerCase()}`}>
                <i className={`fas fa-${getIconForCategory(menu.name)}`}></i> {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="employee-main-content">
        <Outlet context={{ addToOrder }} />
      </div>
      {showOrderSummary && <OrderSummary summary={orderSummary} onSubmitOrder={onSubmitOrder} />}
    </div>
  );
};

export default EmployeeLayout;
