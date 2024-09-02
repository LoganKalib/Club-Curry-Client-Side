import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageVehicles.css';
import VehicleModal from './VehicleModal';

const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Fetch vehicles from the server
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ClubCurry/vehicle/getAll');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles', error);
            }
        };
        fetchVehicles();
    }, []);

    const handleAddClick = () => {
        setSelectedVehicle(null);
        setShowModal(true);
    };

    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowModal(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/ClubCurry/vehicle/delete/${id}`);
            setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        } catch (error) {
            console.error('Error deleting vehicle', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = () => {
        // Refetch vehicles after adding/editing
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ClubCurry/vehicle/getAll');
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles', error);
            }
        };
        fetchVehicles();
        setShowModal(false);
    };

    return (
        <div className="vehicle-manage-container">
            <h2 className="vehicle-manage-heading">Manage Vehicles</h2>
            <button className="vehicle-btn vehicle-btn-primary" onClick={handleAddClick}>Add Vehicle</button>
            <table className="vehicle-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Make</th>
                        <th>Model</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
                            <td>{vehicle.color}</td>
                            <td>
                                <button className="vehicle-btn vehicle-btn-warning" onClick={() => handleEditClick(vehicle)}>Edit</button>
                                <button className="vehicle-btn vehicle-btn-danger" onClick={() => handleDeleteClick(vehicle.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <VehicleModal
                    isOpen={showModal}
                    onClose={handleCloseModal}
                    vehicle={selectedVehicle}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default ManageVehicles;
