import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderSummary, setOrderSummary] = useState([]);

  const addToOrder = (product) => {
    setOrderSummary((prevSummary) => {
      const existingItem = prevSummary.find(item => item.id === product.id);
      if (existingItem) {
        // Increase quantity if already in the order
        return prevSummary.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new item
        return [...prevSummary, { ...product, quantity: 1 }];
      }
    });
  };

  const onSubmitOrder = () => {
    setOrderSummary([]); // Clear the order summary
  };

  return (
    <OrderContext.Provider value={{ orderSummary, addToOrder, onSubmitOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export default OrderContext;
