import React, {useState, useEffect} from "react";
import axios from "axios";


const ManageMenuItem = (props) => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const fetchMenuItems =  async () => {
            try{
                let sortedMenuItems =[];
                const unsortedMenuItems = await axios.get('http://localhost:8080/ClubCurry/menuItem/getAll');
                console.log(unsortedMenuItems);
                unsortedMenuItems.data.forEach((menuItem) =>{if(menuItem.menuId.id===props.menu) {sortedMenuItems.push(menuItem);}});
                setMenuItems(sortedMenuItems);
            }
            catch(error){
                console.error("Error fetching menu items", error)
            }
        }
        fetchMenuItems();
    });

    return (
        <div className="manage-menuItems mt-5 pt-5 w-100">
            <table className="w-100">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>MenuId</th>
                </tr>
                </thead>
                <tbody>
                {menuItems.map((menuItem) => (
                        <tr key={menuItem.id}>
                            <td>{menuItem.id}</td>
                            <td>{menuItem.name}</td>
                            <td>{menuItem.description}</td>
                            <td>{menuItem.price}</td>
                            <td>
                                <button className="btn btn-warning">EDIT</button>
                                <button className="btn btn-danger">DELETE</button>
                                <button className="btn btn-danger">VIEW INGREDIENTS</button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>

    );
};

export default ManageMenuItem;