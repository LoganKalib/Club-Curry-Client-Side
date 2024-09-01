import React, { useState } from 'react';
import EmployeeHeader from './EmployeeHeader'; 
import './OrderManagement.css';

// Mock data for demonstration purposes
const deliveryData = [
    { id: 1, deliveryId: 'D001', name: 'John Doe', deliveryTime: '12:00', address1: '123 Main St', address2: '', eta: '15 mins', status: 'Pending' },
];

const OrderManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    const handleSave = () => {
        // Axios ingestion will go here
        console.log('Order saved:', selectedOrder);
        handleCloseModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedOrder(prevOrder => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    return (
        <div className="order-management-container">
            <EmployeeHeader isLoggedIn={true} onLogout={() => console.log('Logged out')} />
            <h1 className="order-header">Order Management</h1>

            <div className="order-container">
                <h2>Delivery</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Delivery ID</th>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Delivery Time</th>
                            <th>Address 1</th>
                            <th>Address 2</th>
                            <th>ETA</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryData.map(order => (
                            <tr key={order.id}>
                                <td>{order.deliveryId}</td>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.deliveryTime}</td>
                                <td>{order.address1}</td>
                                <td>{order.address2}</td>
                                <td>{order.eta}</td>
                                <td>{order.status}</td>
                                <td><button className="OM-btn-edit" onClick={() => handleEditOrder(order)}>Edit Order</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="OM-modal">
                    <div className="OM-modal-content">
                        <span className="OM-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Edit Order</h2>
                        <div className="OM-form-group">
                            <label>Delivery ID:</label>
                            <input type="text" value={selectedOrder.deliveryId} readOnly />
                        </div>
                        <div className="OM-form-group">
                            <label>Order ID:</label>
                            <input type="text" value={selectedOrder.id} readOnly />
                        </div>
                        <div className="OM-form-group">
                            <label>Customer Name:</label>
                            <input type="text" value={selectedOrder.name} onChange={handleChange} name="name" />
                        </div>
                        <div className="OM-form-group">
                            <label>Delivery Time:</label>
                            <input type="time" value={selectedOrder.deliveryTime} onChange={handleChange} name="deliveryTime" />
                        </div>
                        <div className="OM-form-group">
                            <label>Address 1:</label>
                            <input type="text" value={selectedOrder.address1} onChange={handleChange} name="address1" />
                        </div>
                        <div className="OM-form-group">
                            <label>Address 2:</label>
                            <input type="text" value={selectedOrder.address2} onChange={handleChange} name="address2" />
                        </div>
                        <div className="OM-form-group">
                            <label>ETA:</label>
                            <select value={selectedOrder.eta} onChange={handleChange} name="eta">
                                <option value="15 mins">15 mins</option>
                                <option value="30 mins">30 mins</option>
                                <option value="45 mins">45 mins</option>
                                <option value="55 mins">55 mins</option>
                            </select>
                        </div>
                        <div className="OM-form-group">
                            <label>Status:</label>
                            <select value={selectedOrder.status} onChange={handleChange} name="status">
                                <option value="Pending">Pending</option>
                                <option value="Transit">Transit</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                        <button className="OM-btn-save" onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
