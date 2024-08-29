import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageMenuItem = (menu) => {
    const [menuItems, setMenu] = useState([]);

    useEffect(() => {
        const fetchBooking =  async () => {
            try{
                const bookings = await axios.get('http://localhost:8080/ClubCurry/booking/getAll');
                setBookings(bookings.data);
            }
            catch(error){
                console.error("Error fetching bookings", error)
            }
        }
        fetchBooking();
    });

    return (
        <div className="manage-bookings mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Table No</th>
                    <th>Section No</th>
                    <th>Status</th>
                    <th>Booked By Name</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map((booking) => (
                        <tr key={booking.bookingId}>
                            <td>{booking.bookingId}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.tableNo}</td>
                            <td>{booking.sectionNo}</td>
                            <td>{booking.status}</td>
                            <td>{booking.bookedBy.name}</td>
                            <td>
                                <button className="btn btn-warning" >EDIT</button>
                                <button className="btn btn-danger" >DELETE</button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>

    );
};

export default ManageBooking;