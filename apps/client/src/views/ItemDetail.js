/**
 * @namespace ItemDetail
 * @description This component fetches and displays the details of a wellplate item.
 * @requires {@link helpers.ImageViewer}
 * @requires {@link helpers.ModelViewer}
 * @description The database has a field id which is set by the programmer.
 * This field is not to be confused with the _id field that is automatically created by mongodb.
 * ItemDetail gets the id from the item and renders the image and the 3d model located in the directory with the same name.
 */

import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ModelViewer from '../helpers/ItemDetail/ModelViewer';
import ImageViewer from '../helpers/ItemDetail/ImageViewer';
import useFetchData from '../hooks/useFetchData';
import '../styles/ItemDetail.css';
import Header from '../components/Header';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

/**
 * @memberof ItemDetail
 * @description Fetches and displays the details of a wellplate item.
 */
const ItemDetail = () => {
  /**
   * @member {Object} id
   * @memberof ItemDetail
   * @description The ID parameter from the URL.
   */
  const { id } = useParams();
  console.log("mongodb id: " + id);

  /**
   * @member {Object} item
   * @memberof ItemDetail
   * @description The wellplate item data fetched from the server.
   */
  /**
   * @member {boolean} loading
   * @memberof ItemDetail
   * @description The loading state indicating whether data is being fetched.
   */
  /**
   * @member {Error|null} error
   * @memberof ItemDetail
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
      <Header />
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
