import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageOrders = () => {
    const [order, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders =  async () => {
            try{
                const customers = await axios.get('http://localhost:8080/ClubCurry/customer/getAll');
                setCustomers(customers.data);
            }
            catch(error){
                console.error("Error fetching customers", error)
            }
        }
        fetchCustomers();
    });

    return (
        <div className="manage-customers mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Password</th>
                    <th>Mobile Number</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                        <tr key={customer.email}>
                            <td>{customer.email}</td>
                            <td>{customer.name}</td>
                            <td>{customer.surname}</td>
                            <td>{customer.password}</td>
                            <td>{customer.mobileNo}</td>
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

export default ManageCustomers;