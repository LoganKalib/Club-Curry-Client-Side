import React, { useState, useContext } from 'react';
import OrderContext from './OrderContext';
import './OrderSummary.css'; // Assuming you have the CSS file for styling

const OrderSummary = ({ summary, onSubmitOrder }) => {
    const { addToOrder } = useContext(OrderContext); // Use context to get addToOrder
    const [confirmationMessage, setConfirmationMessage] = useState('');

    // Calculate the total price of the order
    const totalPrice = summary.reduce((acc, product) => acc + product.price * product.quantity, 0);

    const handleSubmit = () => {
        if (summary.length === 0) {
            return; // No items to submit
        }

        // Generate a unique order number (this can be improved based on your requirements)
        const orderNumber = Math.floor(Math.random() * 10000); // Random order number for demo purposes

        // Call the function to submit the order
        addToOrder({ orderNumber, summary, totalPrice });

        // Set confirmation message
        setConfirmationMessage(`Order #${orderNumber} has been created.`);

        // Clear the order summary
        onSubmitOrder(); // Function to clear the order summary

        // Automatically hide the confirmation message after 3 seconds
        setTimeout(() => {
            setConfirmationMessage(''); // Clear the message
        }, 3000);
    };

    return (
        <div className="order-summary-container">
            <h2>Order Summary</h2>
            {summary.length > 0 && (
                <>
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
                            {summary.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.image} alt={item.name} className="order-item-image" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{item.price * item.quantity}</td>
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
                </>
            )}
            {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </div>
    );
};

export default OrderSummary;
