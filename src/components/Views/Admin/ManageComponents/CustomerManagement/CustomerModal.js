import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerModal.css'; // Ensure this file exists and is styled accordingly

const CustomerModal = ({ isOpen, onClose, customer, onSubmit, isEdit }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        mobileNo: ''
    });

    useEffect(() => {
        if (customer) {
            setFormData(customer);
        } else {
            setFormData({
                email: '',
                name: '',
                surname: '',
                password: '',
                mobileNo: ''
            });
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                // Update existing customer
                await axios.put('http://localhost:8080/ClubCurry/customer/update', formData);
            } else {
                // Add new customer
                await axios.post('http://localhost:8080/ClubCurry/customer/save', formData);
            }
            onSubmit();
        } catch (error) {
            console.error('Error saving customer', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="customer-modal-overlay">
            <div className="customer-modal-content">
                <h2>{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isEdit}
                        />
                    </label>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Surname:
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Mobile Number:
                        <input
                            type="text"
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="customer-modal-actions">
                        <button type="submit" className="customer-btn customer-btn-success">Save</button>
                        <button type="button" className="customer-btn customer-btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerModal;
