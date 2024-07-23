import React, { useState } from 'react';
import { Button, Container, Modal, Card, Row, Col } from 'react-bootstrap';

const Menu = () => {
  const categories = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Sides', 'Specials'];
  const [showModal, setShowModal] = useState(null);
  
  const initialItems = {
    Starters: [
      { id: 1, name: 'Starter Dish 1', description: 'Delicious starter 1', image: 'path_to_image_1', price: 5.99, quantity: 1 },
      { id: 2, name: 'Starter Dish 2', description: 'Delicious starter 2', image: 'path_to_image_2', price: 6.99, quantity: 1 },
      // Add more starter items here
    ],
    Mains: [
      { id: 1, name: 'Main Dish 1', description: 'Delicious main dish 1', image: 'path_to_image_1', price: 12.99, quantity: 1 },
      { id: 2, name: 'Main Dish 2', description: 'Delicious main dish 2', image: 'path_to_image_2', price: 14.99, quantity: 1 },
      // Add more main items here
    ],
    Desserts: [
      { id: 1, name: 'Dessert Dish 1', description: 'Delicious dessert 1', image: 'path_to_image_1', price: 4.99, quantity: 1 },
      { id: 2, name: 'Dessert Dish 2', description: 'Delicious dessert 2', image: 'path_to_image_2', price: 5.99, quantity: 1 },
      // Add more dessert items here
    ],
    Drinks: [
      { id: 1, name: 'Drink 1', description: 'Refreshing drink 1', image: 'path_to_image_1', price: 2.99, quantity: 1 },
      { id: 2, name: 'Drink 2', description: 'Refreshing drink 2', image: 'path_to_image_2', price: 3.49, quantity: 1 },
      // Add more drink items here
    ],
    Sides: [
      { id: 1, name: 'Side Dish 1', description: 'Tasty side dish 1', image: 'path_to_image_1', price: 3.99, quantity: 1 },
      { id: 2, name: 'Side Dish 2', description: 'Tasty side dish 2', image: 'path_to_image_2', price: 4.49, quantity: 1 },
      // Add more side items here
    ],
    Specials: [
      { id: 1, name: 'Special Dish 1', description: 'Special dish 1', image: 'path_to_image_1', price: 15.99, quantity: 1 },
      { id: 2, name: 'Special Dish 2', description: 'Special dish 2', image: 'path_to_image_2', price: 17.99, quantity: 1 },
      // Add more special items here
    ]
  };

  const [itemQuantities, setItemQuantities] = useState(initialItems);

  const handleShow = (category) => setShowModal(category);
  const handleClose = () => setShowModal(null);

  const handleIncrement = (category, itemId) => {
    setItemQuantities(prevState => {
      const updatedItems = prevState[category].map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...prevState, [category]: updatedItems };
    });
  };

  const handleDecrement = (category, itemId) => {
    setItemQuantities(prevState => {
      const updatedItems = prevState[category].map(item => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { ...prevState, [category]: updatedItems };
    });
  };

  return (
    <Container className="menu-container">
      {categories.map((category, index) => (
        <Button
          key={index}
          variant="primary"
          className="menu-button"
          onClick={() => handleShow(category)}
        >
          {category}
        </Button>
      ))}

      {categories.map((category, index) => (
        <Modal key={index} show={showModal === category} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{category}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {itemQuantities[category].map((item) => (
                <Col key={item.id} xs={12} md={6} className="menu-item">
                  <Card>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.description}
                        <br />
                        <strong>Price: R{item.price.toFixed(2)}</strong>
                      </Card.Text>
                      <div className="item-controls">
                        <Button variant="primary">Add to Cart</Button>
                        <div className="item-quantity">
                          <Button variant="secondary" onClick={() => handleDecrement(category, item.id)}>-</Button>
                          <span>{item.quantity}</span>
                          <Button variant="secondary" onClick={() => handleIncrement(category, item.id)}>+</Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success">View Cart</Button>
          </Modal.Footer>
        </Modal>
      ))}
    </Container>
  );
};

export default Menu;
