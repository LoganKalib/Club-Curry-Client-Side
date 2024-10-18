import {createContext, useContext} from 'react';

export const OrderContext = createContext("");

export const useOrderContext = () => {
    return useContext(OrderContext);
};
