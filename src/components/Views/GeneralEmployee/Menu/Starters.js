import React,{useContext} from 'react';
import OrderContext from '../OrderContext';

const Starters = () => {
  const { addToOrder } = useContext(OrderContext);

  const starters = [
    { id: 6, name: 'Spring Rolls', price: 35, image: 'path/to/spring-rolls.jpg' },
    { id: 7, name: 'Chicken Wings', price: 50, image: 'path/to/chicken-wings.jpg' },
  ];

  return (
    <div className="product-grid">
      {starters.map((starter) => (
        <div key={starter.id} className="product-card" onClick={() => addToOrder(starter)}>
          <img src={starter.image} alt={starter.name} className="product-image" />
          <h3>{starter.name}</h3>
          <p>Price: {starter.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Starters;
