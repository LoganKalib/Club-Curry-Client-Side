import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminModal.css';

const AdminModal = ({ isOpen, onClose, admin = null, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        surname: "",
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (admin) {
            setFormData({
                id: admin.id || "",
                name: admin.name || "",
                surname: admin.surname || "",
                username: admin.username || "",
                password: admin.password || ""
            });
        } else {
            resetForm();
        }
    }, [admin]);

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            surname: "",
            username: "",
            password: ""
        });
        setError("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post('http://localhost:8080/ClubCurry/admin/save', formData);
            onSubmit();
            onClose();
        } catch (error) {
            setError("Error submitting form. Please try again.");
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-admin">
            <div className="modal-content-admin">
                <div className="modal-header-admin">
                    <h2>{admin ? "Edit Admin" : "Add Admin"}</h2>
                    <button className="close-button" onClick={onClose} aria-label="Close modal">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-body-admin">
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
                    </div>
                    <div className="modal-footer-admin">
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

export default AdminModal;
