// Employee.js
import React, {useEffect} from 'react';
import './Employee.css';


const Employee = (props) => {

    useEffect(() => {
        console.log(props.decodeValue)
    }, []);

    return (
        <div className="product-grid">
            {props.products.map((product) => (product.menuId.id == props.currentMenuId ? (
                <div key={product.id} className="product-card" onClick={() => props.handleAddToOrder(product)}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>Price: {product.price}</p>
                </div>) : <></>
            ))}
        </div>
    );
};

export default Employee;
