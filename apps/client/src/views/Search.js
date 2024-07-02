/**
 * @namespace views.Search
 * @description Search component allows users to search and filter wellplates.
 */

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import useFetchData from '../utils/useFetchData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

/**
 * Search component fetches wellplate data and allows users to filter the data by typing in a search input.
 * @function
 * @name Search
 * @returns {JSX.Element} The rendered component.
 */
const Search = () => {
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  /**
   * Filters the fetched data based on the search term.
   * Updates the filtered data whenever the search term or the fetched data changes.
   * @function
   */
  useEffect(() => {
    if (data) {
      setFilteredData(
        data.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [data, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Wellplates Data</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredData.map((item) => (
          <li key={item._id}>
            <Link to={`/item/${item._id}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
