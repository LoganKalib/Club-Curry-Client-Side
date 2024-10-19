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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/menu/getAll'); // Use Axios to fetch menus
        setMenus(response.data); // Access the data directly from response
      } catch (error) {
        console.error('Error fetching menus:', error); // Log any errors
      }
    };
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ClubCurry/menuItem/getAll'); // Use Axios to fetch menus
        setProducts(response.data); // Access the data directly from response
      } catch (error) {
        console.error('Error fetching menu items:', error); // Log any errors
      }
    };
    fetchMenus();
    fetchProducts();
  }, []);

  const onSubmitOrder = () => {
    const submitOrder = async () => {
      const newOrderSummary = [...orderSummary];
      for(let i= 0; i<orderSummary.length; i++){

        newOrderSummary[i].note = "N/A";
        newOrderSummary[i].spiceLevel = "LOW";
      }
      const response = axios.post('http://localhost:8080/ClubCurry/cart/save', {customer: {email: "kay@email.com"}, items: [{}]});
      const order = (await response).data;
      order.items = newOrderSummary;
      const response2 = axios.put("http://localhost:8080/ClubCurry/cart/updateItems", order);
      console.log(response);
      console.log(response2);
    }
    submitOrder();
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
    const newOrderSummary = [...orderSummary];
    if(newOrderSummary.find((item) => (item.menuItem.id === product.id))) {
      const index = newOrderSummary.findIndex((item) => (item.menuItem.id === product.id));
      newOrderSummary[index].quantity++;
      setOrderSummary(newOrderSummary);
      return
    }
    const newItem = { menuItem: product, quantity: 1}
    newOrderSummary.push(newItem)
    setOrderSummary(newOrderSummary)
  };

  const handleRemoveFromOrder = (product) => {
    const newOrderSummary = [...orderSummary];
    const index = newOrderSummary.findIndex((item) => (item.menuItem.id===product.menuItem.id), 0);
    if(newOrderSummary[index].quantity>1){
      newOrderSummary[index].quantity--;
      setOrderSummary(newOrderSummary);
      return
    }
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
                  <i className="fas fa-th-list"></i> Manage Bookings
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
