import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; 
import OrderSummary from './OrderSummary'; 
import OrderContext from './OrderContext';
import './Employee.css';
import axios from 'axios'; 

const EmployeeLayout = ({ isLoggedIn, onLogout }) => {
  const { orderSummary, setOrderSummary } = useContext(OrderContext); 
  const [menus, setMenus] = useState([]);
  const [currentMenuId, setCurrentMenuId] = useState(null); // State for current menu ID
  const location = useLocation(); 
  const showOrderSummary = !['/orderManagement', '/employee'].includes(location.pathname);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/menu/getAll'); // Use Axios to fetch menus
        setMenus(response.data); // Access the data directly from response
      } catch (error) {
        console.error('Error fetching menus:', error); // Log any errors
      }
    };

    fetchMenus();
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

  // Handle menu selection
  const handleMenuSelect = (menuId) => {
    setCurrentMenuId(menuId); // Set the current menu ID
  };

  return (
    <div className="employee-container">
      <EmployeeHeader isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <nav className="side-nav">
        <ul>
          <li>
            <Link to="/orderManagement">
              <i className="fas fa-receipt"></i> Order Management
            </Link>
          </li>
          <li>
            <Link to="/employee">
              <i className="fas fa-th-list"></i> All Categories
            </Link>
          </li>
          {menus.map((menu) => (
            <li key={menu.id}>
              <button 
                className="menu-button-l" 
                onClick={() => handleMenuSelect(menu.id)} // Handle button click
              >
                <i className={`fas fa-${getIconForCategory(menu.name)}`}></i> {menu.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="employee-main-content">
        <Outlet context={{ addToOrder, currentMenuId }} />
      </div>
      {showOrderSummary && <OrderSummary summary={orderSummary} onSubmitOrder={onSubmitOrder} />}
    </div>
  );
};

export default EmployeeLayout;
