import React, { useState, useEffect } from "react";
import axios from "axios";

const DriverRegistrationForm = ({ driver, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        surname: "",
        username: "",
        password: "",
        petrolAllowance: "",
        registrationId: ""
    });

    useEffect(() => {
        if (driver) {
            setFormData({
                id: driver.id,
                name: driver.name,
                surname: driver.surname,
                username: driver.username,
                password: driver.password,
                petrolAllowance: driver.petrolAllowance,
                registrationId: driver.registration.id
            });
        } else {
            setFormData({
                id: "",
                name: "",
                surname: "",
                username: "",
                password: "",
                petrolAllowance: "",
                registrationId: ""
            });
        }
    }, [driver]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (driver) {
                await axios.put('http://localhost:8080/ClubCurry/driver/update', formData);
            } else {
                await axios.post('http://localhost:8080/ClubCurry/driver/save', formData);
            }
            onSubmit(); // Refresh list and close modal
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Surname" required />
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <input type="number" name="petrolAllowance" value={formData.petrolAllowance} onChange={handleChange} placeholder="Petrol Allowance" required />
            <input type="text" name="registrationId" value={formData.registrationId} onChange={handleChange} placeholder="Registration Id" required />
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default DriverRegistrationForm;
