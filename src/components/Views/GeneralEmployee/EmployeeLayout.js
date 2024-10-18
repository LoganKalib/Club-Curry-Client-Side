import React, {useEffect, useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import EmployeeHeader from './EmployeeHeader'; 
import OrderSummary from './OrderSummary';
import './Employee.css';
import axios from 'axios';
import Employee from "./Employee";

const EmployeeLayout = ({ isLoggedIn, onLogout }) => {
  const [orderSummary, setOrderSummary] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentMenuId, setCurrentMenuId] = useState(null); // State for current menu ID
  const location = useLocation(); 
  const showOrderSummary = !['/orderManagement', '/employee'].includes(location.pathname);
  const products = [
    { id: 1, name: 'Zinger Burger', price: 150, image: 'path/to/zinger-burger.jpg', menuId: 1 },
    { id: 2, name: 'Pizza', price: 100, image: 'path/to/pizza.jpg', menuId: 1  },
    { id: 3, name: 'Sprite', price: 50, image: 'path/to/sprite.jpg', menuId: 1  },
    { id: 4, name: 'Chicken Tikka', price: 200, image: 'path/to/chicken-tikka.jpg', menuId: 1  },
    { id: 5, name: 'Cheese Lover', price: 120, image: 'path/to/cheese-lover.jpg', menuId: 2 },
    { id: 6, name: 'Double Zinger', price: 180, image: 'path/to/double-zinger.jpg', menuId: 2  },
    { id: 7, name: 'Chicken Burger', price: 130, image: 'path/to/chicken-burger.jpg', menuId: 2 },
    { id: 8, name: 'Beef Kebab', price: 100, image: 'path/to/beef-kebab.jpg', menuId: 2 },
  ];

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

  const onSubmitOrder = () => {
    setOrderSummary([])
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

  const handleAddToOrder = (product) => {
    if(orderSummary.includes(product)) {
      return
    }
    const newOrderSummary = [...orderSummary];
    newOrderSummary.push(product)
    setOrderSummary(newOrderSummary)
  };

  const handleRemoveFromOrder = (product) => {
    const newOrderSummary = [...orderSummary];
    const index = newOrderSummary.findIndex((item) => (item===product))
    newOrderSummary.splice(index,1);
    setOrderSummary(newOrderSummary);
  }

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
          </div>
          <Employee handleAddToOrder={handleAddToOrder} products={products} currentMenuId = {currentMenuId}/>
        <OrderSummary onSubmitOrder={onSubmitOrder} orderSummary={orderSummary} handleRemoveFromOrder={handleRemoveFromOrder}/>
      </div>
  );
};

export default EmployeeLayout;
