// src/components/Menu.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa'; // Import cart icon

const Menu = ({ addToCart }) => {
  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Sides', 'Specials'];
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [spiceLevel, setSpiceLevel] = useState('Mild');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');
  

  const initialItems = {
    Starters: [
      { id: 1, name: 'Starter Dish 1', description: 'Delicious starter 1', image: process.env.PUBLIC_URL + '/ch-sagwala.jpg', price: 5.99 },
      { id: 2, name: 'Starter Dish 2', description: 'Delicious starter 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 6.99 },
      { id: 3, name: 'Starter Dish 3', description: 'Delicious starter 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 7.99 },
      { id: 4, name: 'Starter Dish 4', description: 'Delicious starter 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 8.99 },
      { id: 5, name: 'Starter Dish 5', description: 'Delicious starter 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 9.99 },
      { id: 6, name: 'Starter Dish 6', description: 'Delicious starter 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 10.99 },
    ],
    Mains: [
      { id: 1, name: 'Main Dish 1', description: 'Delicious main dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 12.99 },
      { id: 2, name: 'Main Dish 2', description: 'Delicious main dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 14.99 },
      { id: 3, name: 'Main Dish 3', description: 'Delicious main dish 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 13.99 },
      { id: 4, name: 'Main Dish 4', description: 'Delicious main dish 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 15.99 },
      { id: 5, name: 'Main Dish 5', description: 'Delicious main dish 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 16.99 },
      { id: 6, name: 'Main Dish 6', description: 'Delicious main dish 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 17.99 },
      { id: 7, name: 'Main Dish 1', description: 'Delicious main dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 12.99 },
      { id: 8, name: 'Main Dish 2', description: 'Delicious main dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 14.99 },
      { id: 9, name: 'Main Dish 3', description: 'Delicious main dish 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 13.99 },
      { id: 10, name: 'Main Dish 4', description: 'Delicious main dish 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 15.99 },
      { id: 11, name: 'Main Dish 5', description: 'Delicious main dish 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 16.99 },
      { id: 12, name: 'Main Dish 6', description: 'Delicious main dish 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 17.99 },
    ],
    Desserts: [
      { id: 1, name: 'Dessert Dish 1', description: 'Delicious dessert 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.99 },
      { id: 2, name: 'Dessert Dish 2', description: 'Delicious dessert 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 5.99 },
      { id: 3, name: 'Dessert Dish 3', description: 'Delicious dessert 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 6.99 },
      { id: 4, name: 'Dessert Dish 4', description: 'Delicious dessert 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 7.99 },
      { id: 5, name: 'Dessert Dish 5', description: 'Delicious dessert 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 8.99 },
      { id: 6, name: 'Dessert Dish 6', description: 'Delicious dessert 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 9.99 },
    ],
    Drinks: [
      { id: 1, name: 'Drink 1', description: 'Refreshing drink 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 2.99 },
      { id: 2, name: 'Drink 2', description: 'Refreshing drink 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 3.49 },
      { id: 3, name: 'Drink 3', description: 'Refreshing drink 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 3.99 },
      { id: 4, name: 'Drink 4', description: 'Refreshing drink 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.49 },
      { id: 5, name: 'Drink 5', description: 'Refreshing drink 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.99 },
      { id: 6, name: 'Drink 6', description: 'Refreshing drink 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 5.49 },
    ],
    Sides: [
      { id: 1, name: 'Side Dish 1', description: 'Tasty side dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 3.99 },
      { id: 2, name: 'Side Dish 2', description: 'Tasty side dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.49 },
      { id: 3, name: 'Side Dish 3', description: 'Tasty side dish 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.99 },
      { id: 4, name: 'Side Dish 4', description: 'Tasty side dish 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 5.49 },
      { id: 5, name: 'Side Dish 5', description: 'Tasty side dish 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 5.99 },
      { id: 6, name: 'Side Dish 6', description: 'Tasty side dish 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 6.49 },
    ],
    Specials: [
      { id: 1, name: 'Special Dish 1', description: 'Special dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 15.99 },
      { id: 2, name: 'Special Dish 2', description: 'Special dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 17.99 },
      { id: 3, name: 'Special Dish 3', description: 'Special dish 3', image: process.env.PUBLIC_URL + '/logo192.png', price: 16.99 },
      { id: 4, name: 'Special Dish 4', description: 'Special dish 4', image: process.env.PUBLIC_URL + '/logo192.png', price: 18.99 },
      { id: 5, name: 'Special Dish 5', description: 'Special dish 5', image: process.env.PUBLIC_URL + '/logo192.png', price: 19.99 },
      { id: 6, name: 'Special Dish 6', description: 'Special dish 6', image: process.env.PUBLIC_URL + '/logo192.png', price: 20.99 },
    ]
  };

  const handleShow = (category, item) => {
    setSelectedItem(item);
    setShowModal(category);
  };

  const handleClose = () => setShowModal(null);

  const handleAddToCart = () => {
    addToCart({ ...selectedItem, spiceLevel, notes, quantity });
    setQuantity(1); // Reset quantity after adding to cart
    setNotes(''); // Reset notes after adding to cart
    setNotification(`Added ${quantity} ${selectedItem.name} to cart`);
    setTimeout(() => setNotification(''), 1000); // Clear message after 0.5 seconds
  };

  return (
    <div className="menu-wrapper">
      <div className="menu-container">
        <div className="alert-info">
          Note: Curries contain nuts. Please specify if you have any allergies.
        </div>
        {categories.map((category, index) => (
          <div key={index} className="category-section">
            <h2>{category}</h2>
            {initialItems[category].map((item) => (
              <Button
                key={item.id}
                className="menu-button"
                onClick={() => handleShow(category, item)}
              >
                <img src={item.image} alt={item.name} />
                <span className="menu-text">
                  <strong>{item.name}</strong><br />
                  {item.description}
                  <br/>
                  R{item.price.toFixed(2)}
                </span>
              </Button>
            ))}
          </div>
        ))}
      </div>

      

      {selectedItem && (
        <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={selectedItem.image} alt={selectedItem.name} />
            <p>{selectedItem.description}</p>
            <Form>
              <Form.Group>
                <Form.Label>Spice Level</Form.Label>
                <Form.Control as="div">
                  <Form.Check 
                    type="radio" 
                    label="Mild" 
                    name="spiceLevel" 
                    checked={spiceLevel === 'Mild'}
                    onChange={() => setSpiceLevel('Mild')}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Medium" 
                    name="spiceLevel" 
                    checked={spiceLevel === 'Medium'}
                    onChange={() => setSpiceLevel('Medium')}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Medium to Hot" 
                    name="spiceLevel" 
                    checked={spiceLevel === 'Medium to Hot'}
                    onChange={() => setSpiceLevel('Medium to Hot')}
                  />
                  <Form.Check 
                    type="radio" 
                    label="Hot" 
                    name="spiceLevel" 
                    checked={spiceLevel === 'Hot'}
                    onChange={() => setSpiceLevel('Hot')}
                  />
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)} 
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <div className="item-quantity">
                  <Button 
                    variant="secondary" 
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                  >
                    -
                  </Button>
                  <span>{quantity}</span>
                  <Button 
                    variant="secondary" 
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </Button>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <p><strong>R{selectedItem.price.toFixed(2)}</strong></p>
              </Form.Group>
              <Button 
                variant="primary" 
                onClick={handleAddToCart}
              >
                Add to Cart
                
              </Button>
              {notification && <div className="notification">{notification}</div>}
              <Button 
                variant="link" 
                className="cart-icon" 
                
              >
                <FaShoppingCart />
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Menu;