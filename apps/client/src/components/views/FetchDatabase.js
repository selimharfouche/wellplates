import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchDatabase = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/wellplates'); // Adjust the URL as needed
        console.log("API Response:", response.data); // Log the response data
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="database-container">
      <h1>Wellplates Database</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.material}, {item.brand}, {item['number of wells']} wells
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchDatabase;
