import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageDriver = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchDriver =  async () => {
            try{
                const drivers = await axios.get('http://localhost:8080/ClubCurry/driver/getAll');
                setDrivers(drivers.data);
            }
            catch(error){
                console.error("Error fetching drivers", error)
            }
        }
        fetchDriver();
    });

    return (
        <div className="manage-drivers mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Petrol Allowance</th>
                    <th>Registration Id</th>
                </tr>
                </thead>
                <tbody>
                {drivers.map((driver) => (
                        <tr key={driver.id}>
                            <td>{driver.id}</td>
                            <td>{driver.name}</td>
                            <td>{driver.surname}</td>
                            <td>{driver.username}</td>
                            <td>{driver.password}</td>
                            <td>{driver.petrolAllowance}</td>
                            <td>{driver.registration.id}</td>
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

export default ManageDriver;