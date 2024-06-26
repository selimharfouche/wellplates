// FilteredList.js

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * FilteredList Component
 * Renders a list of filtered items with links to their detail pages.
 *
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.filteredData - The array of filtered items.
 * @returns {JSX.Element} The rendered filtered list component.
 */
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

export default FilteredList;
