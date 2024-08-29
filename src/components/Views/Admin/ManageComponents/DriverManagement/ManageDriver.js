// src/Components/Views/ManageDriver.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../../../Common/Modal";
import DriverRegistrationForm from "./DriverRegistrationForm";

const ManageDriver = () => {
    const [drivers, setDrivers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);

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

    const handleAddDriver = () => {
        setSelectedDriver(null); // No driver selected, this is for adding a new driver
        setIsModalOpen(true);
    };

    const handleEdit = (driver) => {
        setSelectedDriver(driver); // Set the driver to be edited
        setIsModalOpen(true); // Open the modal
    };

    const handleDelete = async (driverId) => {
        try {
            await axios.delete(`http://localhost:8080/ClubCurry/driver/delete/${driverId}`);
            setDrivers(drivers.filter(driver => driver.id !== driverId));
        } catch (error) {
            console.error(`Error deleting driver with ID ${driverId}`, error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedDriver(null); // Reset the selected driver
    };

    const handleDriverSubmit = async (driverData) => {
        try {
            if (selectedDriver) {
                // Update driver
                await axios.put(`http://localhost:8080/ClubCurry/driver/update/${selectedDriver.id}`, driverData);
                setDrivers(drivers.map(driver => (driver.id === selectedDriver.id ? driverData : driver)));
            } else {
                // Add new driver
                const response = await axios.post('http://localhost:8080/ClubCurry/driver/add', driverData);
                setDrivers([...drivers, response.data]);
            }
            setIsModalOpen(false); // Close the modal
        } catch (error) {
            console.error("Error adding/updating driver", error);
        }
    };

    return (
        <div className="manage-drivers mt-5 pt-5 w-100">
            <div className="d-flex justify-content-between mb-3">
                <h2>Manage Drivers</h2>
                <button className="btn btn-success" onClick={handleAddDriver}>
                    Add New Driver
                </button>
            </div>
            <div className="table-container">
                <table className="table w-100">
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
                                    <button className="btn btn-warning" onClick={() => handleEdit(driver)}>
                                        EDIT
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(driver.id)}>
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title={selectedDriver ? "Edit Driver" : "Add New Driver"}
                    onClose={handleModalClose}
                    onSubmit={() => {}} // Empty onSubmit for now, using form's onSubmit
                >
                    <DriverRegistrationForm
                        initialDriver={selectedDriver}
                        onSubmit={handleDriverSubmit}
                        onClose={handleModalClose}
                    />
                </Modal>
            )}
        </div>
    );
};

export default ManageDriver;
