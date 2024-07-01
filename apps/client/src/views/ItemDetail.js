/**
 * @namespace views.ItemDetail
 * @description This component fetches and displays the details of a wellplate item.
 * @requires {@link helpers.ItemDetailHelpers.ImageViewer}
 * @requires {@link helpers.ItemDetailHelpers.ModelViewer}
 */

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ModelViewer from '../helpers/ModelViewer';
import ImageViewer from '../helpers/ImageViewer';
import useFetchData from '../utils/useFetchData';
import '../styles/ItemDetail.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * @memberof views.ItemDetail
 * @description Fetches and displays the details of a wellplate item.
 */
const ItemDetail = () => {
  /**
   * @member {Object} id
   * @memberof views.ItemDetail
   * @description The ID parameter from the URL.
   */
  const { id } = useParams();
  console.log("mongodb id: " + id);

  /**
   * @member {Object} item
   * @memberof views.ItemDetail
   * @description The wellplate item data fetched from the server.
   */
  /**
   * @member {boolean} loading
   * @memberof views.ItemDetail
   * @description The loading state indicating whether data is being fetched.
   */
  /**
   * @member {Error|null} error
   * @memberof views.ItemDetail
   * @description The error state indicating whether there was an error fetching the data.
   */
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

  console.log("json id: " + item.id);

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
