import React from 'react';
import './EmployeeNavbar.css';

const EmployeeNavbar = ({ onNewOrder, onOrderManagement, onBooking }) => {
    return (
        <nav className="employee-nav">
            <ul>
                <li>
                    <a href="#" onClick={onNewOrder}>
                        <i className="fas fa-plus-circle"></i> New Order
                    </a>
                </li>
                <li>
                    <a href="#" onClick={onOrderManagement}>
                        <i className="fas fa-clock"></i> Order Management
                    </a>
                </li>
                <li>
                    <a href="#" onClick={onBooking}>
                        <i className="fas fa-calendar-alt"></i> Bookings
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default EmployeeNavbar;
