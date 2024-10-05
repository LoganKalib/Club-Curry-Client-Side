import React,{useContext} from 'react';
import OrderContext from '../OrderContext';

const Curries = () => {
  const { addToOrder } = useContext(OrderContext);

  const curries = [
    { id: 10, name: 'Chicken Curry', price: 130, image: 'path/to/chicken-curry.jpg' },
    { id: 11, name: 'Lamb Curry', price: 160, image: 'path/to/lamb-curry.jpg' },
  ];

  return (
    <div className="product-grid">
      {curries.map((curry) => (
        <div key={curry.id} className="product-card" onClick={() => addToOrder(curry)}>
          <img src={curry.image} alt={curry.name} className="product-image" />
          <h3>{curry.name}</h3>
          <p>Price: {curry.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Curries;
