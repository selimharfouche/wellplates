import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Custom hook to fetch data from a given URL.
 * 
 * @function useFetchData
 * @param {string} url - The URL to fetch data from.
 * @returns {Array} - Returns an array containing the fetched data, loading state, and error state.
 */
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
};

export default useFetchData;
