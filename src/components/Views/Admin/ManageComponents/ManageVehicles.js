import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageVehicles = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles =  async () => {
            try{
                const vehicles = await axios.get('http://localhost:8080/ClubCurry/vehicle/getAll');
                setVehicles(vehicles.data);
            }
            catch(error){
                console.error("Error fetching vehicles", error)
            }
        }
        fetchVehicles();
    });

    return (
        <div className="manage-vehicles mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Color</th>
                    <th>Make</th>
                    <th>Model</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.color}</td>
                            <td>{vehicle.make}</td>
                            <td>{vehicle.model}</td>
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

export default ManageVehicles;