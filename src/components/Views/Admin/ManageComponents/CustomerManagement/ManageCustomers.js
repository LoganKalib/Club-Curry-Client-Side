import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ManageCustomer.css"// Ensure this file exists and is styled accordingly
import CustomerModal from './CustomerModal'; // Import the CustomerModal

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ClubCurry/customer/getAll');
                setCustomers(response.data);
            } catch (error) {
                console.error("Error fetching customers", error);
            }
        };
        fetchCustomers();
    }, []);

    const handleAddClick = () => {
        setSelectedCustomer(null);
        setIsEdit(false);
        setShowModal(true);
    };

    const handleEditClick = (customer) => {
        setSelectedCustomer(customer);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleDeleteClick = async (email) => {
        try {
            await axios.delete(`http://localhost:8080/ClubCurry/customer/delete/${email}`);
            setCustomers(customers.filter(customer => customer.email !== email));
        } catch (error) {
            console.error('Error deleting customer', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ClubCurry/customer/getAll');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers', error);
            }
        };
        fetchCustomers();
        setShowModal(false);
    };

    return (
        <div className="customer-manage-container">
            <h2 className="customer-manage-heading">Manage Customers</h2>
            <button className="customer-btn customer-btn-primary" onClick={handleAddClick}>Add Customer</button>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Password</th>
                        <th>Mobile Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.email}>
                            <td>{customer.email}</td>
                            <td>{customer.name}</td>
                            <td>{customer.surname}</td>
                            <td>{customer.password}</td>
                            <td>{customer.mobileNo}</td>
                            <td>
                                <button className="customer-btn customer-btn-warning" onClick={() => handleEditClick(customer)}>Edit</button>
                                <button className="customer-btn customer-btn-danger" onClick={() => handleDeleteClick(customer.email)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <CustomerModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    customer={selectedCustomer}
                    onSubmit={handleSubmit}
                    isEdit={isEdit}
                />
            )}
        </div>
    );
};

export default ManageCustomers;
