import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../OrderContext';
import '../Employee.css'; 

const Curries = () => {
  const { addToOrder } = useContext(OrderContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [curries, setCurries] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/ClubCurry/menuItem/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        
        // Log the fetched data for debugging
        console.log('Fetched Menu Items:', data);

        // Assuming you have a specific menuId for curries, e.g., 4
        const curriesMenuId = 4; 
        const filteredCurries = data.filter(menuItem => menuItem.menuId === curriesMenuId);

        // Log the filtered curries for debugging
        console.log('Filtered Curries:', filteredCurries);
        
        setCurries(filteredCurries);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading curries...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-grid">
      {curries.map((curry) => (
        <div key={curry.id} className="product-card" onClick={() => addToOrder(curry)}>
          <img src={curry.image} alt={curry.name} className="product-image" />
          <h3>{curry.name}</h3>
          <p>Price: R{curry.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default Curries;
