// ItemDetail.js

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ModelViewer from '../display/ModelViewer'; 
import ImageViewer from '../display/ImageViewer'; 
import '../../styles/ItemDetail.css';

/**
 * The ItemDetail component displays detailed information about a specific wellplate.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {Array} props.data - Array of wellplate objects passed as a prop.
 * @returns {JSX.Element} The rendered component.
 */
const ItemDetail = ({ data }) => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const item = data.find((item) => item.name === decodedName);

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      {Object.keys(item).map((key) => {
        if (key === 'name' || key === 'image' || key === 'model3D') return null;
        return <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`}</p>;
      })}
      {item.image && <ImageViewer imagePath={item.image} altText={item.name} />}
      {item.model3D && <ModelViewer modelPath={item.model3D} />}
    </div>
  );
};

export default ItemDetail;
