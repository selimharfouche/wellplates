// src/Detail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const Detail = ({ data }) => {
  const { id } = useParams();
  const item = data.find(d => d.id === parseInt(id));

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Age: {item.age}</p>
      {/* Add more details if needed */}
    </div>
  );
};

export default Detail;
