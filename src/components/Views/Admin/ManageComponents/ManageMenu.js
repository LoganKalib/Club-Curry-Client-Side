import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageMenu = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchMenus =  async () => {
            try{
                const menus = await axios.get('http://localhost:8080/ClubCurry/menu/getAll');
                setMenus(menus.data);
            }
            catch(error){
                console.error("Error fetching menus", error)
            }
        }
        fetchMenus();
    });

    return (
        <div className="manage-menus mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Menu Id</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {menus.map((menu) => (
                        <tr key={menu.menuId}>
                            <td>{menu.id}</td>
                            <td>{menu.name}</td>
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

export default ManageMenu;