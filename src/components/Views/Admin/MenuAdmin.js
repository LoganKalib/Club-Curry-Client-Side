import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const MenuAdmin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    menuId: ''
  });
  const [categories, setCategories] = useState([]);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [structuredMenu, setStructuredMenu] = useState({}); 

  useEffect(() => {
    const loadData = async () => {
      try {
        const itemsResponse = await axios.get("http://localhost:8080/ClubCurry/menuItem/getAll");
        structureMenuItems(itemsResponse.data); 

        const menuResponse = await axios.get("http://localhost:8080/ClubCurry/menu/getAll");
        setCategories(menuResponse.data);
      } catch (error) {
        console.error('Error loading items or categories:', error);
      }
    };

    loadData();
  }, []);

  const structureMenuItems = (items) => {
    const structured = {};
    items.forEach(item => {
      const category = item.menuId.name; 
      if (!structured[category]) {
        structured[category] = [];
      }
      structured[category].push({
        id: item.id,
        name: item.name,
        description: item.description,
        image: `http://localhost:8080/ClubCurry/image/getByMenuId/${item.id}`,
        price: item.price,
      });
    });
    setStructuredMenu(structured); 
  };

  const handleAddShow = () => {
    setNewItem({
      name: '',
      description: '',
      price: '',
      menuId: {}, 
    });
    setImageFile(null);
    setShowAddModal(true);
  };

  const handleAddClose = () => setShowAddModal(false);

  const handleDeleteClose = () => setShowDeleteModal(false);

  const handleDeleteShow = (id) => {
    setItemToDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const itemToSave = {
      name: newItem.name,
      price: parseFloat(newItem.price),
      description: newItem.description,
      menuId: { id: newItem.menuId }
    };

    try {
      console.log(itemToSave);
      const results = await axios.post('http://localhost:8080/ClubCurry/menuItem/save', itemToSave);
      var resultData = { ...results.data };
      formData.append("itemId", Number(resultData.id));
      
      try {
        await axios.post(`http://localhost:8080/ClubCurry/image/save`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const itemsResponse = await axios.get("http://localhost:8080/ClubCurry/menuItem/getAll");
        structureMenuItems(itemsResponse.data); 

        const menuResponse = await axios.get("http://localhost:8080/ClubCurry/menu/getAll");
        setCategories(menuResponse.data);
        handleAddClose();

      } catch (error) {
        alert("Unable to save Image to database, please check the details.");
        console.error('Error uploading image:', error);
      }
    } catch (error) {
      alert("Unable to save Item to database, please check the details.");
      console.error('Error saving item', error);
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleDelete = async () => {
    try {
      //A new method need to be created before delete can work
      // const result = await axios.get(`http://localhost:8080/ClubCurry/image/getByMenuId/${itemToDeleteId}`);
      // console.log(result.data);
      // await axios.delete(`http://localhost:8080/ClubCurry/menuItem/delete/${result.data.id}`);
      setStructuredMenu(prevStructuredMenu => {
        const updatedMenu = { ...prevStructuredMenu };
        for (const category in updatedMenu) {
          updatedMenu[category] = updatedMenu[category].filter(item => item.id !== itemToDeleteId);
        }
        return updatedMenu;
      });
      handleDeleteClose();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="menu-admin-container">
      <div className="add-item-section">
        <Button className="add-item-button" onClick={handleAddShow}>
          Add New Item
        </Button>
        {/* need a function and modal for adding menus */}
        <Button className="add-item-button" onClick="">
          Add New Menu
        </Button>
      </div>
      <div className="menu-items">
        {Object.keys(structuredMenu).map(category => (
          <div key={category} className="menu-category">
            <h4>{category}</h4>
            {structuredMenu[category].map(item => (
              <div key={item.id} className="menu-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h5>{item.name}</h5>
                  <p>{item.description}</p>
                </div>
                <p>Price: ${item.price}</p>
                <Button variant="danger" onClick={() => handleDeleteShow(item.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <Modal show={showAddModal} onHide={handleAddClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
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
                required
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
                required
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
                required
              />
            </Form.Group>
            <Form.Group controlId="formItemCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="menuId"
                value={newItem.menuId}
                onChange={handleChange}
                required
              >
                <option selected>please select a category...</option>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading...</option>
                )}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formItemImage">
              <Form.Label>Image Upload</Form.Label>
              <Form.Control
                type="file"
                accept="image/*" 
                onChange={handleImageChange}
                required
              />
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteModal} onHide={handleDeleteClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the item with ID: {itemToDeleteId}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MenuAdmin;