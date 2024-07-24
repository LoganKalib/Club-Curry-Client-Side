// src/components/Menu.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Menu = ({ addToCart }) => {
  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Sides', 'Specials'];
  const [showModal, setShowModal] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [spiceLevel, setSpiceLevel] = useState('Mild');
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  const initialItems = {
    Starters: [
      { id: 1, name: 'Starter Dish 1', description: 'Delicious starter 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 5.99 },
      { id: 2, name: 'Starter Dish 2', description: 'Delicious starter 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 6.99 },
      // Add more starter items here
    ],
    Mains: [
      { id: 1, name: 'Main Dish 1', description: 'Delicious main dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 12.99 },
      { id: 2, name: 'Main Dish 2', description: 'Delicious main dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 14.99 },
      // Add more main items here
    ],
    Desserts: [
      { id: 1, name: 'Dessert Dish 1', description: 'Delicious dessert 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.99 },
      { id: 2, name: 'Dessert Dish 2', description: 'Delicious dessert 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 5.99 },
      // Add more dessert items here
    ],
    Drinks: [
      { id: 1, name: 'Drink 1', description: 'Refreshing drink 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 2.99 },
      { id: 2, name: 'Drink 2', description: 'Refreshing drink 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 3.49 },
      // Add more drink items here
    ],
    Sides: [
      { id: 1, name: 'Side Dish 1', description: 'Tasty side dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 3.99 },
      { id: 2, name: 'Side Dish 2', description: 'Tasty side dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 4.49 },
      // Add more side items here
    ],
    Specials: [
      { id: 1, name: 'Special Dish 1', description: 'Special dish 1', image: process.env.PUBLIC_URL + '/logo192.png', price: 15.99 },
      { id: 2, name: 'Special Dish 2', description: 'Special dish 2', image: process.env.PUBLIC_URL + '/logo192.png', price: 17.99 },
      // Add more special items here
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
    handleClose();
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
                <span>
                  <strong>{item.name}</strong><br />
                  {item.description}
                </span>
                <span className="item-price">R{item.price.toFixed(2)}</span>
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
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Menu;