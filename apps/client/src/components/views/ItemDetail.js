// Import necessary libraries and hooks
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ModelViewer from '../display/ModelViewer';
import ImageViewer from '../display/ImageViewer';
import useFetchData from '../../utils/fetchdata';
import '../../styles/ItemDetail.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * ItemDetail component fetches and displays details of an item.
 *
 * @component
 * @requires {@link ImageViewer}
 * @requires {@link ModelViewer}
 * @returns {JSX.Element} The ItemDetail component.
 */
const ItemDetail = () => {
  // useParams hook to access the URL parameters
  const { id } = useParams();
  console.log("ID" + id);

  // Fetch data using the custom hook
  const [item, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates/${id}`);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <Navigate to="/404" replace />;
  }

  console.log("item id" + item.id);

  return (
    <div>
      <h2>{item.name}</h2>
      {Object.keys(item).map((key) => {
        if (key === 'name' || key === 'image' || key === 'model3D') return null;
        return <p key={key}>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${item[key]}`}</p>;
      })}
      {item.image && <ImageViewer imagePath={`${item.id}.png`} altText={item.name} />}
      {item.model3D && <ModelViewer modelPath={`${item.id}.glb`} />}
    </div>
  );
};

export default ItemDetail;
