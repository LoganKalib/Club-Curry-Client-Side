import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverModal.css';

const DriverModal = ({ isOpen, onClose, driver = null, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        surname: "",
        username: "",
        password: "",
        petrolAllowance: "",
        registrationId: { id: "" } // Initialize with an empty object to avoid null references
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Effect hook to set form data when a driver is passed in props
    useEffect(() => {
        if (driver) {
            setFormData({
                id: driver.id || "",
                name: driver.name || "",
                surname: driver.surname || "",
                username: driver.username || "",
                password: driver.password || "",
                petrolAllowance: driver.petrolAllowance || "",
                registrationId: driver.registration ? { id: driver.registration.id } : { id: "" }
            });
        } else {
            resetForm();
        }
    }, [driver]);

    // Reset form to its initial state
    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            surname: "",
            username: "",
            password: "",
            petrolAllowance: "",
            registrationId: { id: "" }
        });
        setError("");
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "registrationId") {
            setFormData(prevState => ({
                ...prevState,
                registrationId: { id: value }
            }));
        } else {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Perform client-side validation before sending data to the server
        if (!formData.registrationId.id) {
            setError("Registration ID is required.");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:8080/ClubCurry/driver/save', formData);
            onSubmit();  // Notify parent to refresh data
            onClose();   // Close modal after successful submission
        } catch (error) {
            setError("Error submitting form. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    // Return null if the modal should not be visible
    if (!isOpen) return null;

    return (
        <div className="modal-overlay-driver">
            <div className="modal-content-driver">
                <div className="modal-header-driver">
                    <h2>{driver ? "Edit Driver" : "Add Driver"}</h2>
                    <button className="close-button" onClick={onClose} aria-label="Close modal">
                        &times;
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body-driver">
                        {error && <p className="error-message">{error}</p>}
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="ID"
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            required
                        />
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Surname"
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                        <input
                            type="number"
                            name="petrolAllowance"
                            value={formData.petrolAllowance}
                            onChange={handleChange}
                            placeholder="Petrol Allowance"
                            required
                        />
                        <input
                            type="text"
                            name="registrationId"
                            value={formData.registrationId.id || ""}
                            onChange={handleChange}
                            placeholder="Registration Id"
                            required
                        />
                    </div>
                    <div className="modal-footer-driver">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DriverModal;
