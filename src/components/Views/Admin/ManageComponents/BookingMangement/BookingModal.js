import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingModal.css'; // Importing CSS specific to BookingModal

const BookingModal = ({ isOpen, onClose, booking, onSubmit }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        tableNo: '',
        sectionNo: '',
        status: '',
        bookedById: ''
    });

    useEffect(() => {
        if (booking) {
            setFormData({
                date: booking.date,
                time: booking.time,
                tableNo: booking.tableNo,
                sectionNo: booking.sectionNo,
                status: booking.status,
                bookedById: booking.bookedById
            });
        }
    }, [booking]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (booking) {
                // Update existing booking
                await axios.put('http://localhost:8080/ClubCurry/booking/update', formData);
            } else {
                // Add new booking
                await axios.post('http://localhost:8080/ClubCurry/booking/save', formData);
            }
            onSubmit();
            onClose();
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay-bookingA">
            <div className="modal-content-bookingA">
                <h2>{booking ? 'Edit Booking' : 'Add Booking'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Time:
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Table No:
                        <input
                            type="number"
                            name="tableNo"
                            value={formData.tableNo}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Section No:
                        <input
                            type="number"
                            name="sectionNo"
                            value={formData.sectionNo}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Status:
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="0">Pending</option>
                            <option value="1">Confirmed</option>
                            <option value="2">Cancelled</option>
                        </select>
                    </label>
                    <label>
                        Booked By ID:
                        <input
                            type="text"
                            name="bookedById"
                            value={formData.bookedById}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <div className="modal-actions-bookingA">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
