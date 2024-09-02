import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CustomerModal.css"; // Ensure this file exists and is styled accordingly

const CustomerModal = ({ isOpen, onClose, customer, onSubmit, isEdit }) => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        password: '',
        mobileNo: '',
        addresses: [{ streetName: '', streetNo: '', suburb: { suburbName: '', postalCode: 0 } }]
    });
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'address'
    const [activeAddressIndex, setActiveAddressIndex] = useState(0);

    useEffect(() => {
        if (customer) {
            setFormData({
                email: customer.email || '',
                name: customer.name || '',
                surname: customer.surname || '',
                password: customer.password || '',
                mobileNo: customer.mobileNo || '',
                addresses: customer.addresses || [{ streetName: '', streetNo: '', suburb: { suburbName: '', postalCode: 0 } }]
            });
            setActiveAddressIndex(0); // Reset to first address when customer changes
        }
    }, [customer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        const updatedAddresses = [...formData.addresses];
        updatedAddresses[activeAddressIndex] = {
            ...updatedAddresses[activeAddressIndex],
            [name]: value
        };
        setFormData(prevData => ({
            ...prevData,
            addresses: updatedAddresses
        }));
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`http://localhost:8080/ClubCurry/customer/update`, formData);
            } else {
                await axios.post(`http://localhost:8080/ClubCurry/customer/save`, formData);
            }
            onSubmit();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="customer-modal-overlay">
            <div className="customer-modal-content">
                <button className="close" onClick={handleClose}>×</button>
                <h2>{isEdit ? 'Edit Customer' : 'Add Customer'}</h2>
                <div className="tabs">
                    <button
                        type="button"
                        className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                        onClick={() => handleTabChange('info')}
                    >
                        Customer Info
                    </button>
                    <button
                        type="button"
                        className={`tab ${activeTab === 'address' ? 'active' : ''}`}
                        onClick={() => handleTabChange('address')}
                    >
                        Address
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    {activeTab === 'info' && (
                        <div className="info-tab">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isEdit}
                                />
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Surname</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input
                                    type="text"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                    {activeTab === 'address' && (
                        <div className="address-tab">
                            <div className="address-tabs">
                                {formData.addresses.map((address, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        className={`address-tab-btn ${activeAddressIndex === index ? 'active' : ''}`}
                                        onClick={() => setActiveAddressIndex(index)}
                                    >
                                        Address {index + 1}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    className="address-tab-btn address-tab-add"
                                    onClick={() => setFormData(prevData => ({
                                        ...prevData,
                                        addresses: [...prevData.addresses, { streetName: '', streetNo: '', suburb: { suburbName: '', postalCode: 0 } }]
                                    }))}
                                >
                                    Add Address
                                </button>
                            </div>
                            {formData.addresses.length > 0 && (
                                <div className="address-details">
                                    <div className="form-group">
                                        <label>Street Name</label>
                                        <input
                                            type="text"
                                            name="streetName"
                                            value={formData.addresses[activeAddressIndex].streetName}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Street No</label>
                                        <input
                                            type="text"
                                            name="streetNo"
                                            value={formData.addresses[activeAddressIndex].streetNo}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Suburb Name</label>
                                        <input
                                            type="text"
                                            name="suburbName"
                                            value={formData.addresses[activeAddressIndex].suburb.suburbName}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Postal Code</label>
                                        <input
                                            type="number"
                                            name="postalCode"
                                            value={formData.addresses[activeAddressIndex].suburb.postalCode}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="customer-modal-actions">
                        <button type="submit" className="customer-btn customer-btn-success">{isEdit ? 'Update' : 'Add'}</button>
                        <button type="button" className="customer-btn customer-btn-secondary" onClick={handleClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomerModal;
