
import React, { useState, useEffect } from 'react';

const DriverRegistrationForm = ({ initialDriver, onSubmit, onClose }) => {
    const [driver, setDriver] = useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        petrolAllowance: '',
        registrationId: ''
    });

    useEffect(() => {
        if (initialDriver) {
            setDriver(initialDriver);
        }
    }, [initialDriver]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver((prevDriver) => ({
            ...prevDriver,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(driver);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={driver.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Surname</label>
                <input
                    type="text"
                    name="surname"
                    value={driver.surname}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={driver.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={driver.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                />
            </div>
            <div className="form-group">
                <label>Petrol Allowance</label>
                <input
                    type="number"
                    name="petrolAllowance"
                    value={driver.petrolAllowance}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label>Registration ID</label>
                <input
                    type="text"
                    name="registrationId"
                    value={driver.registrationId}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default DriverRegistrationForm;
