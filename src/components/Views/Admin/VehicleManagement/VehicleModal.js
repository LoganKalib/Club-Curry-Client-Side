import React, { useState, useEffect } from "react";
import axios from "axios";

const VehicleModal = ({ isOpen, onClose, vehicle, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: "",
        color: "",
        make: "",
        model: ""
    });

    useEffect(() => {
        if (vehicle) {
            setFormData(vehicle);
        } else {
            setFormData({
                id: "",
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
        } catch (error) {
            console.error("Error saving vehicle", error);
        }
    };

    return (
        <div className={`modal ${isOpen ? "show" : ""}`} style={{ display: isOpen ? "block" : "none" }}>
            <div className="modal-dialog-vehicle">
                <div className="modal-content-vehicle">
                    <div className="modal-header-vehicle">
                        <h5 className="modal-title-vehicle">{vehicle ? "Edit Vehicle" : "Add Vehicle"}</h5>
                        <button type="button" className="close" onClick={onClose}>
                            &times;
                        </button>
                    </div>
                    <div className="modal-body-vehicle">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Make</label>
                                <input type="text" className="form-control" name="make" value={formData.make} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Model</label>
                                <input type="text" className="form-control" name="model" value={formData.model} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Color</label>
                                <input type="text" className="form-control" name="color" value={formData.color} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-success">Save</button>
                            <button type="button" className="btn btn-secondary ml-2" onClick={onClose}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleModal;
