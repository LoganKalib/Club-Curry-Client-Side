import React, { useState } from 'react';
import EmployeeHeader from './EmployeeHeader';
import './OrderManagement.css';

// Mock data for demonstration purposes
const deliveryData = [
    { id: 1, deliveryId: 'D001', name: 'John Doe', deliveryTime: '12:00', address1: '123 Main St', address2: '', eta: '15 mins', status: 'Pending' },
    // Add more data as needed
];

const bookingData = [
    { id: 1, bookingId: 'B001', name: 'Jane Doe', date: '2024-09-01', time: '19:00', tableNumber: '12', sectionNumber: 'A', status: 'Pending', bookedBy: 'Employee 1' },
    // Add more data as needed
];

const OrderManagement = () => {
    const [showDeliveryModal, setShowDeliveryModal] = useState(false);
    const [selectedDeliveryOrder, setSelectedDeliveryOrder] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Handlers for delivery modal
    const handleEditDeliveryOrder = (order) => {
        setSelectedDeliveryOrder(order);
        setShowDeliveryModal(true);
    };

    const handleCloseDeliveryModal = () => {
        setShowDeliveryModal(false);
        setSelectedDeliveryOrder(null);
    };

    const handleSaveDelivery = () => {
        // Axios ingestion will go here for delivery
        console.log('Delivery order saved:', selectedDeliveryOrder);
        handleCloseDeliveryModal();
    };

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setSelectedDeliveryOrder(prevOrder => ({
            ...prevOrder,
            [name]: value,
        }));
    };

    // Handlers for booking modal
    const handleEditBooking = (booking) => {
        setSelectedBooking(booking);
        setShowBookingModal(true);
    };

    const handleCloseBookingModal = () => {
        setShowBookingModal(false);
        setSelectedBooking(null);
    };

    const handleSaveBooking = () => {
        // Axios ingestion will go here for booking
        console.log('Booking saved:', selectedBooking);
        handleCloseBookingModal();
    };

    const handleBookingChange = (e) => {
        const { name, value } = e.target;
        setSelectedBooking(prevBooking => ({
            ...prevBooking,
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
                                <td><button className="OM-btn-edit" onClick={() => handleEditDeliveryOrder(order)}>Edit Order</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showDeliveryModal && (
                <div className="OM-modal">
                    <div className="OM-modal-content">
                        <span className="OM-close" onClick={handleCloseDeliveryModal}>&times;</span>
                        <h2>Edit Delivery Order</h2>
                        <div className="OM-form-group">
                            <label>Delivery ID:</label>
                            <input type="text" value={selectedDeliveryOrder.deliveryId} readOnly />
                        </div>
                        <div className="OM-form-group">
                            <label>Order ID:</label>
                            <input type="text" value={selectedDeliveryOrder.id} readOnly />
                        </div>
                        <div className="OM-form-group">
                            <label>Customer Name:</label>
                            <input type="text" value={selectedDeliveryOrder.name} onChange={handleDeliveryChange} name="name" />
                        </div>
                        <div className="OM-form-group">
                            <label>Delivery Time:</label>
                            <input type="time" value={selectedDeliveryOrder.deliveryTime} onChange={handleDeliveryChange} name="deliveryTime" />
                        </div>
                        <div className="OM-form-group">
                            <label>Address 1:</label>
                            <input type="text" value={selectedDeliveryOrder.address1} onChange={handleDeliveryChange} name="address1" />
                        </div>
                        <div className="OM-form-group">
                            <label>Address 2:</label>
                            <input type="text" value={selectedDeliveryOrder.address2} onChange={handleDeliveryChange} name="address2" />
                        </div>
                        <div className="OM-form-group">
                            <label>ETA:</label>
                            <select value={selectedDeliveryOrder.eta} onChange={handleDeliveryChange} name="eta">
                                <option value="15 mins">15 mins</option>
                                <option value="30 mins">30 mins</option>
                                <option value="45 mins">45 mins</option>
                                <option value="55 mins">55 mins</option>
                            </select>
                        </div>
                        <div className="OM-form-group">
                            <label>Status:</label>
                            <select value={selectedDeliveryOrder.status} onChange={handleDeliveryChange} name="status">
                                <option value="Pending">Pending</option>
                                <option value="Transit">Transit</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                        <button className="OM-btn-save" onClick={handleSaveDelivery}>Save</button>
                    </div>
                </div>
            )}

            <div className="order-container">
                <h2>Bookings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Table Number</th>
                            <th>Section Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookingData.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.bookingId}</td>
                                <td>{booking.name}</td>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{booking.tableNumber}</td>
                                <td>{booking.sectionNumber}</td>
                                <td>{booking.status}</td>
                                <td><button className="book-btn-edit" onClick={() => handleEditBooking(booking)}>Edit Booking</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showBookingModal && (
                <div className="book-modal">
                    <div className="book-modal-content">
                        <span className="book-close" onClick={handleCloseBookingModal}>&times;</span>
                        <h2>Edit Booking</h2>
                        <div className="book-form-group">
                            <label>Booking ID:</label>
                            <input type="text" value={selectedBooking.bookingId} readOnly />
                        </div>
                        <div className="book-form-group">
                            <label>Customer Name:</label>
                            <input type="text" value={selectedBooking.name} onChange={handleBookingChange} name="name" />
                        </div>
                        <div className="book-form-group">
                            <label>Date:</label>
                            <input type="date" value={selectedBooking.date} onChange={handleBookingChange} name="date" />
                        </div>
                        <div className="book-form-group">
                            <label>Time:</label>
                            <input type="time" value={selectedBooking.time} onChange={handleBookingChange} name="time" />
                        </div>
                        <div className="book-form-group">
                            <label>Table Number:</label>
                            <input type="text" value={selectedBooking.tableNumber} onChange={handleBookingChange} name="tableNumber" />
                        </div>
                        <div className="book-form-group">
                            <label>Section Number:</label>
                            <input type="text" value={selectedBooking.sectionNumber} onChange={handleBookingChange} name="sectionNumber" />
                        </div>
                        <div className="book-form-group">
                            <label>Booked By:</label>
                            <input type="text" value={selectedBooking.bookedBy} readOnly />
                        </div>
                        <div className="book-form-group">
                            <label>Status:</label>
                            <select value={selectedBooking.status} onChange={handleBookingChange} name="status">
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Denied">Denied</option>
                            </select>
                        </div>
                        <button className="book-btn-save" onClick={handleSaveBooking}>Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderManagement;
