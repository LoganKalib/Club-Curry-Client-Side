import React, { useState, useEffect } from "react";
import axios from "axios";
import DriverRegistrationForm from "./DriverRegistrationForm";
import "../../../../../CSS/Modal.css";

const ManageDriver = () => {
    const [drivers, setDrivers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDriver, setCurrentDriver] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ClubCurry/driver/getAll');
                setDrivers(response.data);
            } catch (error) {
                console.error("Error fetching drivers", error);
            }
        };
        fetchDrivers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/ClubCurry/driver/delete/${id}`);
            setDrivers(drivers.filter(driver => driver.id !== id));
        } catch (error) {
            console.error("Error deleting driver", error);
        }
    };

    const openModal = (driver = null) => {
        console.log("Opening modal with driver:", driver);
        setCurrentDriver(driver);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log("Closing modal...");
        setCurrentDriver(null);
        setIsModalOpen(false);
    };

    const handleFormSubmit = async () => {
        console.log("Form submitted, refreshing driver list...");
        try {
            const response = await axios.get('http://localhost:8080/ClubCurry/driver/getAll');
            setDrivers(response.data);
        } catch (error) {
            console.error("Error refreshing drivers list", error);
        }
        closeModal();
    };

    return (
        <div className="manage-drivers mt-5 pt-5 w-100">
            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Add New Driver
            </button>
            <table className="w-100">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Petrol Allowance</th>
                        <th>Registration Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver.id}>
                            <td>{driver.id}</td>
                            <td>{driver.name}</td>
                            <td>{driver.surname}</td>
                            <td>{driver.username}</td>
                            <td>{driver.password}</td>
                            <td>{driver.petrolAllowance}</td>
                            <td>{driver.registration.id}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => openModal(driver)}>EDIT</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(driver.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Inline Modal Structure */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{currentDriver ? "Edit Driver" : "Add Driver"}</h2>
                            <button className="close-button" onClick={closeModal}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <DriverRegistrationForm 
                                driver={currentDriver} 
                                onClose={closeModal} 
                                onSubmit={handleFormSubmit} 
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageDriver;
