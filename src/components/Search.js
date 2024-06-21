// Search.js

// Summary:
// This file defines the Search component which includes a search bar to filter through the wellplates data.
// It imports necessary hooks and components, manages the search query state, handles input changes,
// and renders a list of filtered wellplates with links to their detail pages.

import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * The Search component provides a search bar to filter through the wellplates data.
 * 
 * @param {Array} data - Array of wellplate objects passed as a prop
 */
const Search = ({ data }) => {
  const [query, setQuery] = useState("");

  // Event handler for input changes in the search box
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Filters the data based on the current query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <ul>
        {filteredData.map((item) => (
          <li key={item.name}>
            <Link to={`/item/${encodeURIComponent(item.name)}`}>
              {item.name} - {item.number_of_wells} wells
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search; 
