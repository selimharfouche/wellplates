// ItemDetail.js

// Import necessary libraries and hooks
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import ModelViewer from '../display/ModelViewer'; 
import ImageViewer from '../display/ImageViewer'; 
import '../../styles/ItemDetail.css';

/**
 * ItemDetail Component
 * Displays detailed information about a specific wellplate.
 *
 * @returns {JSX.Element} The rendered ItemDetail component.
 */
const ItemDetail = () => {
  // useParams hook to access the URL parameters
  const { id } = useParams();
  console.log("ID" + id);

  // State to hold the item details
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/wellplates/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  console.log("item id"+item.id);
  return (
    <div>
      <h2>{item.name}</h2>
      {Object.keys(item).map((key) => {
        if (key === 'name' || key === 'image' || key === 'model3D') return null;
        return <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`}</p>;
      })}
      {<ImageViewer imagePath={item.id+".png"} altText={item.name} />}

      {<ModelViewer modelPath={item.id+".glb"} />}
    </div>
  );
};

export default ItemDetail;
