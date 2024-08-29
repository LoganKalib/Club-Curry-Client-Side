import React,{useState, useEffect} from "react";
import ManageBooking from "./ManageComponents/ManageBooking";
import ManageDriver from "./ManageComponents/ManageDriver";
import './AdminDashboard.css'

const AdminDashboard = () =>{
    return(
        <div className="admin-dashboard-container">
        <ManageBooking/>
        <ManageDriver/>
        </div>
    );
};

export default AdminDashboard;
