import React,{useState, useEffect} from "react";
import ManageBooking from "./ManageComponents/ManageBooking";
import ManageDriver from "./ManageComponents/DriverManagement/ManageDriver";
import './AdminDashboard.css'
import ManageMenuItems from "./ManageComponents/ManageMenuItems";
import ManageMenu from "./ManageComponents/ManageMenu";
import ManageCustomers from "./ManageComponents/ManageCustomers";
import ManageVehicles from "./ManageComponents/ManageVehicles";
import ManageOrders from "./ManageComponents/ManageOrders";

const AdminDashboard = () =>{
    return(
        <div className="admin-dashboard-container">
        <ManageBooking/>
        <ManageDriver/>
        <ManageMenuItems menu={1}/>
        <ManageMenu/>
        <ManageCustomers/>
        <ManageVehicles/>
        <ManageOrders/>
        </div>
    );
};

export default AdminDashboard;
