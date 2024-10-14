// Employee.js
import React from 'react';
import './Employee.css';

const Employee = ({ addToOrder }) => {
    const products = [
        { id: 1, name: 'Zinger Burger', price: 150, image: 'path/to/zinger-burger.jpg' },
        { id: 2, name: 'Pizza', price: 100, image: 'path/to/pizza.jpg' },
        { id: 3, name: 'Sprite', price: 50, image: 'path/to/sprite.jpg' },
        { id: 4, name: 'Chicken Tikka', price: 200, image: 'path/to/chicken-tikka.jpg' },
        { id: 5, name: 'Cheese Lover', price: 120, image: 'path/to/cheese-lover.jpg' },
        { id: 6, name: 'Double Zinger', price: 180, image: 'path/to/double-zinger.jpg' },
        { id: 7, name: 'Chicken Burger', price: 130, image: 'path/to/chicken-burger.jpg' },
        { id: 8, name: 'Beef Kebab', price: 100, image: 'path/to/beef-kebab.jpg' },
    ];

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card" onClick={() => addToOrder(product)}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>Price: {product.price}</p>
                </div>
            ))}
        </div>
    );
};

export default Employee;
