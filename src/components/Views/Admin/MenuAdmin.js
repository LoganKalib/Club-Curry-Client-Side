import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const MenuAdmin = ({ initialItems, onUpdateItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [newItem, setNewItem] = useState({
    id: uuidv4(),
    name: '',
    description: '',
    image: '',
    price: '',
    category: 'Starters',
    available: true,
  });

  const handleShow = (item = null) => {
    setEditMode(!!item);
    setCurrentItem(item);
    setNewItem(item || {
      id: uuidv4(),
      name: '',
      description: '',
      image: '',
      price: '',
      category: 'Starters',
      available: true,
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    if (editMode) {
      // Update existing item
      onUpdateItems(prevItems => prevItems.map(item =>
        item.id === currentItem.id ? { ...newItem } : item
      ));
    } else {
      // Add new item
      onUpdateItems(prevItems => [...prevItems, newItem]);
    }
    handleClose();
  };

  const handleDelete = () => {
    onUpdateItems(prevItems => prevItems.filter(item => item.id !== currentItem.id));
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div>
      <Button variant="primary" onClick={() => handleShow()}>
        Add New Item
      </Button>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Item' : 'Add New Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item name"
                name="name"
                value={newItem.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formItemDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item description"
                name="description"
                value={newItem.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formItemImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={newItem.image}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formItemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter item price"
                name="price"
                value={newItem.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formItemCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={newItem.category}
                onChange={handleChange}
              >
                <option>Starters</option>
                <option>Mains</option>
                <option>Desserts</option>
                <option>Drinks</option>
                <option>Sides</option>
                <option>Specials</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formItemAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                name="available"
                checked={newItem.available}
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
            {editMode && (
              <Button variant="danger" onClick={handleDelete} className="ml-2">
                Delete
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MenuAdmin;
