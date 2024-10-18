import React, {useState, useContext} from 'react';
import {OrderContext} from './OrderContext';
import './OrderSummary.css'; // Assuming you have the CSS file for styling

const OrderSummary = (props) => {// Use context to get addToOrder
    const [confirmationMessage, setConfirmationMessage] = useState('');
    // Calculate the total price of the order
    const totalPrice = props.orderSummary.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handleSubmit = () => {
        if (props.orderSummary.length === 0) {
            return; // No items to submit
        }
        // Call the function to submit the order

        // Set confirmation message
        setConfirmationMessage(`Order #Insert order Number has been created.`);

        // Clear the order summary
        props.onSubmitOrder(); // Function to clear the order summary

        // Automatically hide the confirmation message after 3 seconds
        setTimeout(() => {
            setConfirmationMessage(''); // Clear the message
        }, 3000);
    };

    return (
        <div className="order-summary-container">
            <h2>Order Summary</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.orderSummary.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.image} alt={item.name} className="order-item-image"/>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.quantity}</td>
                                    <button className="submit-order-button"
                                            onClick={() => props.handleRemoveFromOrder(item)}>
                                        Delete
                                    </button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            <div className="order-total">
            <h3>Total Price: {totalPrice}</h3>
                    </div>
                    <button className="submit-order-button" onClick={handleSubmit}>
                        Submit Order
                    </button>
        </div>
    );
};

export default OrderSummary;
