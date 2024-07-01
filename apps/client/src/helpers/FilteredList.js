// FilteredList.js

// Import necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * FilteredList Component
 * @description Renders a list of filtered items with links to their detail pages.
 *
 * @memberof helpers
 * @param {Array} filteredData - Array of filtered items.
 * @returns {JSX.Element} The rendered filtered list component.
 * @see {@link views.Search}
 */
const FilteredList = ({ filteredData }) => (
  <ul>
    {filteredData.map((item) => (
      <li key={item._id}>
        <Link to={`/item/${item._id}`}>
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
);

export default FilteredList;
