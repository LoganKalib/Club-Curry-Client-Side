import React, { useState } from 'react';
import { Modal, Button, Accordion, Form, Alert } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Cart = ({ cartItems, onRemoveItem, onUpdateQuantity, onCheckout, showCart, onCloseCart, isLoggedIn, onShowLogin, onShowSignup }) => {
  const [orderType, setOrderType] = useState('');
  const [address, setAddress] = useState('');
  const [driverNote, setDriverNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const navigate = useNavigate(); // Use navigate to redirect to home page

  const handleQuantityChange = (uniqueId, change) => {
    onUpdateQuantity(uniqueId, change);
  };

  const handleRemove = (uniqueId) => {
    onRemoveItem(uniqueId);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    if (isLoggedIn) {
      if (!orderType || (orderType === 'Delivery' && (!address || !driverNote)) || !paymentMethod) {
        alert('Please complete all fields before proceeding.');
        return;
      }
      onCheckout();
    } else {
      setShowLoginPrompt(true);
    }
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
    onShowLogin();
  };

  const handleSignupPromptClose = () => {
    setShowLoginPrompt(false);
    onShowSignup();
  };

  const handleModalClose = () => {
    onCloseCart();
    navigate('/');
  };

  return (
    <>
      <div className={`modal-overlay ${showCart ? 'active' : ''}`} onClick={handleModalClose}></div>
      <Modal show={showCart} onHide={handleModalClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length > 0 ? (
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.uniqueId} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-details">
                    <span>{item.name}</span>
                    <span>{item.spiceLevel}</span>
                    <span>Special Instructions: {item.specialNote}</span>
                    <span>R{item.price.toFixed(2)}</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="item-quantity">
                      <Button
                        variant="secondary"
                        onClick={() => handleQuantityChange(item.uniqueId, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="secondary"
                        onClick={() => handleQuantityChange(item.uniqueId, 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => handleRemove(item.uniqueId)}
                      className="remove-button"
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}

          {isLoggedIn && (
            <Accordion defaultActiveKey="0" className="mt-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Order Type</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Check
                      type="radio"
                      label="Delivery"
                      name="orderType"
                      id="delivery"
                      value="Delivery"
                      onChange={(e) => setOrderType(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Collection"
                      name="orderType"
                      id="collection"
                      value="Collection"
                      onChange={(e) => setOrderType(e.target.value)}
                    />
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
              {orderType === 'Delivery' && (
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Delivery Details</Accordion.Header>
                  <Accordion.Body>
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="driverNote" className="mt-3">
                      <Form.Label>Driver Instructions</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter instructions for the driver"
                        value={driverNote}
                        onChange={(e) => setDriverNote(e.target.value)}
                      />
                    </Form.Group>
                  </Accordion.Body>
                </Accordion.Item>
              )}
              <Accordion.Item eventKey="2">
                <Accordion.Header>Payment Method</Accordion.Header>
                <Accordion.Body>
                  <Form>
                    <Form.Check
                      type="radio"
                      label="Card"
                      name="paymentMethod"
                      id="card"
                      value="Card"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="Cash"
                      name="paymentMethod"
                      id="cash"
                      value="Cash"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      label="SnapScan"
                      name="paymentMethod"
                      id="snapscan"
                      value="SnapScan"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="cart-footer">
            <h4>Total: R{getTotal()}</h4>
            <p><i>A tip would be appreciated!</i></p>
            <Button variant="success" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showLoginPrompt} onHide={() => setShowLoginPrompt(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Please Log In or Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="warning">
            You need to be logged in to proceed with checkout.
          </Alert>
          <Button variant="primary" onClick={handleLoginPromptClose} className="mr-2">
            Log In
          </Button>
          <Button variant="secondary" onClick={handleSignupPromptClose}>
            Sign Up
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
