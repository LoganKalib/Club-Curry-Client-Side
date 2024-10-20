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
        registrationId: { id: "" },
        model: "",
        color: "",
        make: ""
    });
    const [currentTab, setCurrentTab] = useState(1); // Track current tab
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (driver) {
            setFormData({
                id: driver.id || "",
                name: driver.name || "",
                surname: driver.surname || "",
                username: driver.username || "",
                password: driver.password || "",
                petrolAllowance: driver.petrolAllowance || "",
                registrationId: driver.registration ? { id: driver.registration.id } : { id: "" },
                model: driver.model || "",
                color: driver.color || "",
                make: driver.make || "",
            });
        } else {
            resetForm();
        }
    }, [driver]);

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            surname: "",
            username: "",
            password: "",
            petrolAllowance: "",
            registrationId: { id: "" },
            model: "",
            color: "",
            make: ""
        });
        setError("");
        setCurrentTab(1); // Reset to first tab
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!formData.registrationId.id) {
            setError("Registration ID is required.");
            setLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:8080/ClubCurry/driver/save', formData);
            onSubmit();
            onClose();
        } catch (error) {
            setError("Error submitting form. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const validateFirstTab = () => {
        return formData.id && formData.name && formData.surname && formData.username && formData.password && formData.petrolAllowance;
    };

    const handleNext = () => {
        if (validateFirstTab()) {
            setCurrentTab(2);
        } else {
            setError("Please fill in all fields before proceeding.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-driver">
            <div className="modal-content-driver">
                <div className="modal-header-driver">
                    <h2>{driver ? "Edit Driver" : "Add Driver"}</h2>
                    <button className="close-button" onClick={onClose} aria-label="Close modal">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body-driver">
                        {error && <p className="error-message">{error}</p>}

                        {currentTab === 1 && (
                            <>
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
                            </>
                        )}

                        {currentTab === 2 && (
                            <>
                                <input
                                    type="text"
                                    name="registrationId"
                                    value={formData.registrationId.id || ""}
                                    onChange={handleChange}
                                    placeholder="Registration Id"
                                    required
                                />
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model || ""}
                                    onChange={handleChange}
                                    placeholder="Model"
                                    required
                                />
                                <input
                                    type="text"
                                    name="color"
                                    value={formData.color || ""}
                                    onChange={handleChange}
                                    placeholder="Color"
                                    required
                                />
                                <input
                                    type="text"
                                    name="make"
                                    value={formData.make || ""}
                                    onChange={handleChange}
                                    placeholder="Make"
                                    required
                                />
                            </>
                        )}
                    </div>

                    <div className="modal-footer-driver">
                        {currentTab === 1 && (
                            <>
                                <button type="button" className="btn btn-primary" onClick={handleNext}>
                                    Next
                                </button>
                            </>
                        )}

                        {currentTab === 2 && (
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        )}
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
