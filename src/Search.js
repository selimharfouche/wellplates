// Search.js

// Summary:
// This file defines the Search component which includes a search bar to filter through the wellplates data.
// It imports necessary hooks and components, manages the search query state, handles input changes,
// and renders a list of filtered wellplates with links to their detail pages.

// Includes
import React, { useState } from "react"; // Importing React library and useState hook
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation

// Search Component
/**
 * The Search component provides a search bar to filter through the wellplates data.
 * 
 * @param {Array} data - Array of wellplate objects passed as a prop
 */
const Search = ({ data }) => {
  // useState hook to manage the search query state
  // Reference: https://react.dev/reference/react/useState
  const [query, setQuery] = useState("");

  // Event handler for input changes in the search box
  /**
   * Updates the query state with the current input value.
   * 
   * @param {Object} e - Event object from the input field
   */
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // Filters the data based on the current query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Input field for the search query */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <ul>
        {/* For each filtered item, return a list item with a link to the detail page */}
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

export default Search; // Exporting the Search component as the default export
