import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../../Common/Modal";
import DriverRegistrationForm from "./DriverRegistrationForm";

const ManageDriver = () => {
    const [drivers, setDrivers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentDriver, setCurrentDriver] = useState(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/driver/getAll');
                setDrivers(response.data);
            } catch (error) {
                console.error("Error fetching drivers", error);
            }
        };
        fetchDrivers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/driver/delete/${id}`);
            setDrivers(drivers.filter(driver => driver.id !== id));
        } catch (error) {
            console.error("Error deleting driver", error);
        }
    };

    const openModal = (driver = null) => {
        setCurrentDriver(driver);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentDriver(null);
        setIsModalOpen(false);
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
            <Modal 
                isOpen={isModalOpen} 
                title={currentDriver ? "Edit Driver" : "Add Driver"} 
                onClose={closeModal} 
                onSubmit={() => {/* Handle form submit */}}
            >
                <DriverRegistrationForm 
                    driver={currentDriver} 
                    onClose={closeModal} 
                    onSubmit={() => {/* Handle form submit */}} 
                />
            </Modal>
        </div>
    );
};

export default ManageDriver;
