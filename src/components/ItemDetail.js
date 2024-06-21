// ItemDetail.js

// Summary:
// This file defines the ItemDetail component which displays detailed information about a specific wellplate.
// It imports necessary hooks and components, extracts the item name from the URL parameters, finds the corresponding
// item in the data array, and renders the details or an error message if the item is not found.

// Import necessary libraries and hooks
import React from 'react';
import { useParams } from 'react-router-dom';
import ModelViewer from './ModelViewer'; 
import ImageViewer from './ImageViewer'; 

// ItemDetail Component
// This component displays detailed information about a specific wellplate.
const ItemDetail = ({ data }) => {
  // useParams hook to access the URL parameters
  const { name } = useParams();

  // Decode the name from the URL to match the item name in the data
  const decodedName = decodeURIComponent(name);

  // Find the item in the data array that matches the decoded name
  const item = data.find((item) => item.name === decodedName);

  // If no item is found, display an error message
  if (!item) {
    return <div>Item not found</div>;
  }

  // Render the details of the found item, including the image and model
  return (
    <div>
      <h2>{item.name}</h2>
      <p>Number of Wells: {item.number_of_wells}</p>
      <p>Material: {item.material}</p>
      <p>Brand: {item.brand}</p>
      <p>Comment: {item.comment}</p>
      {item.image && <ImageViewer imagePath={item.image} altText={item.name} />}
      {item.model3D && <ModelViewer modelPath={item.model3D} />}
    </div>
  );
};

export default ItemDetail;
