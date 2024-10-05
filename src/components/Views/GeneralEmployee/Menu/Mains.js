import React,{useContext} from 'react';
import OrderContext from '../OrderContext';

const Mains = () => {
  const { addToOrder } = useContext(OrderContext);

  const mains = [
    { id: 8, name: 'Grilled Chicken', price: 120, image: 'path/to/grilled-chicken.jpg' },
    { id: 9, name: 'Beef Steak', price: 150, image: 'path/to/beef-steak.jpg' },
  ];

  return (
    <div className="product-grid">
      {mains.map((main) => (
        <div key={main.id} className="product-card" onClick={() => addToOrder(main)}>
          <img src={main.image} alt={main.name} className="product-image" />
          <h3>{main.name}</h3>
          <p>Price: {main.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Mains;
