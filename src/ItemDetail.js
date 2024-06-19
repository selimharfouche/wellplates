// src/ItemDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = ({ data }) => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const item = data.find((item) => item.name === decodedName);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Number of Wells: {item.number_of_wells}</p>
      <p>Material: {item.material}</p>
      <p>Brand: {item.brand}</p>
      <p>Comment: {item.comment}</p>
    </div>
  );
};

export default ItemDetail;
