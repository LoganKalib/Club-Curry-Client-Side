import React,{useContext} from 'react';
import OrderContext from '../OrderContext';

const Desserts = () => {
  const { addToOrder } = useContext(OrderContext);

  const desserts = [
    { id: 4, name: 'Ice Cream', price: 25, image: 'path/to/ice-cream.jpg' },
    { id: 5, name: 'Cake', price: 30, image: 'path/to/cake.jpg' },
  ];

  return (
    <div className="product-grid">
      {desserts.map((dessert) => (
        <div key={dessert.id} className="product-card" onClick={() => addToOrder(dessert)}>
          <img src={dessert.image} alt={dessert.name} className="product-image" />
          <h3>{dessert.name}</h3>
          <p>Price: {dessert.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Desserts;
