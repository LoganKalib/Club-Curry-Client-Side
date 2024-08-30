import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders =  async () => {
            try{
                const orders = await axios.get('http://localhost:8080/ClubCurry/orders/getAll');
                setOrders(orders.data);
                console.log(orders);
            }
            catch(error){
                console.error("Error fetching orders", error)
            }
        }
        fetchOrders();
    });

    return (
        <div className="manage-orders mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Date Ordered</th>
                    <th>Collection Type</th>
                    <th>Payment Method</th>
                    <th>Total</th>
                    <th>Is Completed</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.ordered}</td>
                            <td>{order.collectionType}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.total}</td>
                            <td>{order.isComplete}</td>
                            <td>
                                <button className="btn btn-warning">EDIT</button>
                                <button className="btn btn-danger">DELETE</button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>

    );
};

export default ManageOrders;