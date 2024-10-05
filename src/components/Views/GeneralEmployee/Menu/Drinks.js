import React,{useContext} from 'react';
import OrderContext from '../OrderContext';

const Drinks = () => {
  const { addToOrder } = useContext(OrderContext);

  const drinks = [
    { id: 1, name: 'Coke', price: 20, image: 'path/to/coke.jpg' },
    { id: 2, name: 'Sprite', price: 18, image: 'path/to/sprite.jpg' },
    { id: 3, name: 'Fanta', price: 18, image: 'path/to/fanta.jpg' },
  ];

  return (
    <div className="product-grid">
      {drinks.map((drink) => (
        <div key={drink.id} className="product-card" onClick={() => addToOrder(drink)}>
          <img src={drink.image} alt={drink.name} className="product-image" />
          <h3>{drink.name}</h3>
          <p>Price: {drink.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Drinks;
