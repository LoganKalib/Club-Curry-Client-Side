import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleModal from "./VehicleModal"; // Make sure this path is correct
import "./ManageVehicles.css"; // Importing the CSS for styling

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVehicle, setCurrentVehicle] = useState(null);

    // Fetch vehicles when the component mounts
    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get("http://localhost:8080/ClubCurry/vehicle/getAll");
            setVehicles(response.data);
        } catch (error) {
            console.error("Error fetching vehicles", error);
        }
    };

    // Open modal and set current vehicle if editing
    const openModal = (vehicle = null) => {
        setCurrentVehicle(vehicle);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setCurrentVehicle(null);
        setIsModalOpen(false);
    };

    // Handle deletion of vehicle
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this vehicle?")) {
            try {
                await axios.delete(`http://localhost:8080/ClubCurry/vehicle/delete/${id}`);
                setVehicles(vehicles.filter(vehicle => vehicle.id !== id)); // Remove vehicle from state
            } catch (error) {
                console.error("Error deleting vehicle", error);
            }
        }
    };

    // Refresh vehicle list after adding or editing a vehicle
    const handleFormSubmit = () => {
        fetchVehicles(); // Refresh list after form submission
        closeModal();
    };

    return (
        <div className="manage-vehicles-container mt-5 pt-5 w-100">
            <h2 className="vehicle-table-heading">Manage Vehicles</h2>
            <button className="btn btn-primary mb-3" onClick={() => openModal()}>
                Add New Vehicle
            </button>
            <table className="vehicle-table w-100">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Color</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.color}</td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
                            <td>
                                <button className="btn btn-warning mr-2" onClick={() => openModal(vehicle)}>EDIT</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(vehicle.id)}>DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <VehicleModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    vehicle={currentVehicle}
                    onSubmit={handleFormSubmit}
                />
            )}
        </div>
    );
};

export default ManageVehicles;
