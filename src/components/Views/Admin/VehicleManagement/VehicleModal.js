import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VehicleModal.css"; // Importing CSS for consistent styling

const VehicleModal = ({ isOpen, onClose, vehicle, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: "",    // Initialize with an empty string
        color: "",
        make: "",
        model: ""
    });

    useEffect(() => {
        if (vehicle) {
            setFormData(vehicle);  // Populate formData with the selected vehicle details if editing
        } else {
            setFormData({
                id: "",    // Reset to empty string for new vehicles
                color: "",
                make: "",
                model: ""
            });
        }
    }, [vehicle]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                // Update existing vehicle
                await axios.put("http://localhost:8080/ClubCurry/vehicle/update", formData);
            } else {
                // Add new vehicle
                await axios.post("http://localhost:8080/ClubCurry/vehicle/save", formData);
            }
            onSubmit();
            onClose();
        } catch (error) {
            console.error("Error saving vehicle", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={`vehicle-modal-overlay ${isOpen ? "show" : ""}`}>
            <div className="vehicle-modal-content">
                <div className="vehicle-modal-header">
                    <h2>{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h2>
                    <button type="button" className="vehicle-modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="vehicle-modal-body">
                    <form onSubmit={handleSubmit}>
                        {/* ID Input Field */}
                        <div className="vehicle-form-group">
                            <label>ID</label>
                            <input
                                type="text"
                                className="vehicle-form-control"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                disabled={!!vehicle}  // Disable if editing existing vehicle to prevent changing ID
                                required
                            />
                        </div>
                        <div className="vehicle-form-group">
                            <label>Make</label>
                            <input
                                type="text"
                                className="vehicle-form-control"
                                name="make"
                                value={formData.make}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="vehicle-form-group">
                            <label>Model</label>
                            <input
                                type="text"
                                className="vehicle-form-control"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="vehicle-form-group">
                            <label>Color</label>
                            <input
                                type="text"
                                className="vehicle-form-control"
                                name="color"
                                value={formData.color}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="vehicle-modal-actions">
                            <button type="submit" className="vehicle-btn vehicle-btn-primary">Save</button>
                            <button type="button" className="vehicle-btn vehicle-btn-secondary" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VehicleModal;
