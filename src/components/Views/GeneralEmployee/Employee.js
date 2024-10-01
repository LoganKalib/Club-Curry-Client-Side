import React, { useState } from 'react';
import OrderSummary from './OrderSummary';
import './Employee.css'; // Include your CSS file for styles

const Employee = () => {
    // Dummy data for products
    const [products] = useState([
        { id: 1, name: 'Zinger Burger', price: 150, image: 'path/to/zinger-burger.jpg' },
        { id: 2, name: 'Pizza', price: 100, image: 'path/to/pizza.jpg' },
        { id: 3, name: 'Sprite', price: 50, image: 'path/to/sprite.jpg' },
        { id: 4, name: 'Chicken Tikka', price: 200, image: 'path/to/chicken-tikka.jpg' },
        { id: 5, name: 'Cheese Lover', price: 120, image: 'path/to/cheese-lover.jpg' },
        { id: 6, name: 'Double Zinger', price: 180, image: 'path/to/double-zinger.jpg' },
        { id: 7, name: 'Chicken Burger', price: 130, image: 'path/to/chicken-burger.jpg' },
        { id: 8, name: 'Beef Kebab', price: 100, image: 'path/to/beef-kebab.jpg' },
    ]);

    const [orderSummary, setOrderSummary] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]); // State to track order history

    const addToOrder = (product) => {
        const existingItem = orderSummary.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if already in the order
        } else {
            setOrderSummary([...orderSummary, { ...product, quantity: 1 }]); // Add new item
        }
    };

    const addOrderToHistory = (order) => {
        setOrderHistory([...orderHistory, order]); // Add order to history
    };

    const clearOrderSummary = () => {
        setOrderSummary([]); // Clear the order summary
    };

    return (
        <div className="employee-container">
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => addToOrder(product)}>
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
            <OrderSummary 
                summary={orderSummary} 
                onSubmitOrder={clearOrderSummary} 
                addOrderToHistory={addOrderToHistory} 
            />
        </div>
    );
};

export default Employee;
