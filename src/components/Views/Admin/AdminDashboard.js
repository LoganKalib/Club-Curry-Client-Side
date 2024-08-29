import React,{useState, useEffect} from "react";
import ManageBooking from "./ManageComponents/ManageBooking";
import ManageDriver from "./ManageComponents/ManageDriver";
import './AdminDashboard.css'
import ManageMenuItems from "./ManageComponents/ManageMenuItems";
import ManageMenu from "./ManageComponents/ManageMenu";
import ManageCustomers from "./ManageComponents/ManageCustomers";

const AdminDashboard = () =>{
    return(
        <div className="admin-dashboard-container">
        <ManageBooking/>
        <ManageDriver/>
        <ManageMenuItems menu={1}/>
        <ManageMenu/>
        <ManageCustomers/>
        </div>
    );
};

export default AdminDashboard;
