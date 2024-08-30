import React, { useState } from "react";
import ManageBooking from "./ManageComponents/BookingMangement/ManageBooking";
import ManageDriver from "./ManageComponents/DriverManagement/ManageDriver";
import './AdminDashboard.css';
import MenuAdmin from "./MenuAdmin";
import ManageCustomers from "./ManageComponents/CustomerManagement/ManageCustomers";
import ManageVehicles from "./VehicleManagement/ManageVehicles";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'bookings':
                return <ManageBooking />;
            case 'drivers':
                return <ManageDriver />;
            case 'menu':
                return <MenuAdmin />; // Use MenuAdmin component here
            case 'customers':
                return <ManageCustomers />;
            case 'vehicles':
                return <ManageVehicles />;
        
            default:
                return <ManageBooking />;
        }
    };

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-tabs">
                <button onClick={() => setActiveTab('bookings')}>Manage Bookings</button>
                <button onClick={() => setActiveTab('drivers')}>Manage Drivers</button>
                <button onClick={() => setActiveTab('menu')}>Manage Menu</button>
                <button onClick={() => setActiveTab('customers')}>Manage Customers</button>
                <button onClick={() => setActiveTab('vehicles')}>Manage Vehicles</button>
            </div>
            <div className="admin-dashboard-content">
                {renderActiveTab()}
            </div>
        </div>
    );
};

export default AdminDashboard;
