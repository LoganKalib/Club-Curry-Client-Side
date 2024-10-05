import React,{useContext} from 'react';
import OrderContext from '../OrderContext';

const Specials = () => {
  const { addToOrder } = useContext(OrderContext);

  const specials = [
    { id: 12, name: 'Chef’s Special', price: 180, image: 'path/to/chefs-special.jpg' },
    { id: 13, name: 'Seafood Platter', price: 220, image: 'path/to/seafood-platter.jpg' },
  ];

  return (
    <div className="product-grid">
      {specials.map((special) => (
        <div key={special.id} className="product-card" onClick={() => addToOrder(special)}>
          <img src={special.image} alt={special.name} className="product-image" />
          <h3>{special.name}</h3>
          <p>Price: {special.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Specials;
