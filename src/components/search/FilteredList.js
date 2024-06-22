// FilteredList.js
//
// ## Summary
//
// The FilteredList component renders a list of filtered items with links to their detail pages.
//
// ## References:
//
// * https://reactjs.org/docs/lists-and-keys.html
// * https://reactrouter.com/web/api/Link

// Import necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';

// FilteredList Component
//
// This component renders a list of filtered items with links to their detail pages.
//
// @param {Object} props - The props object containing component properties.
// @param {Array} props.filteredData - The array of filtered items.
//
const FilteredList = ({ filteredData }) => (
  <ul>
    {filteredData.map((item) => (
      <li key={item.name}>
        <Link to={`/item/${encodeURIComponent(item.name)}`}>
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

// Export the FilteredList component as the default export
export default FilteredList;
