// ItemDetail.js
//
// ## Summary
//
// The ItemDetail component displays detailed information about a specific wellplate.
// It imports necessary hooks and components, extracts the item name from the URL parameters, finds the corresponding
// item in the data array, and renders the details or an error message if the item is not found.
//
// ## References:
//
// * https://reactjs.org/docs/hooks-intro.html
// * https://reactrouter.com/web/api/useParams

// Import necessary libraries and hooks
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ModelViewer from './ModelViewer'; 
import ImageViewer from '../display/ImageViewer'; 
import '../../styles/ItemDetail.css'

// ItemDetail Component
//
// This component displays detailed information about a specific wellplate.
//
// @param {Object} props - The props object containing component properties.
// @param {Array} props.data - Array of wellplate objects passed as a prop.
//
const ItemDetail = ({ data }) => {
  // useParams hook to access the URL parameters
  const { name } = useParams();

  // Decode the name from the URL to match the item name in the data
  const decodedName = decodeURIComponent(name);

  // Find the item in the data array that matches the decoded name
  const item = data.find((item) => item.name === decodedName);

  if (!item) {
    return <Navigate to="/404" replace/>;
  }

  // Render the details of the found item dynamically
  return (
    <div>
      <h2>{item.name}</h2>
      {Object.keys(item).map((key) => {
        // Skip the name, image, and model3D fields as they are handled separately
        if (key === 'name' || key === 'image' || key === 'model3D') return null;
        return <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`}</p>;
      })}
      {item.image && <ImageViewer imagePath={item.image} altText={item.name} />}
      {item.model3D && <ModelViewer modelPath={item.model3D} />}
    </div>
  );
};

// Export the ItemDetail component as the default export
export default ItemDetail;