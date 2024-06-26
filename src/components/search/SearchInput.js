// SearchInput.js

// Import necessary libraries
import React from 'react';

/**
 * SearchInput Component
 * Renders a search input field.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.query - The current search query.
 * @param {function} props.onChange - Function to handle input value changes.
 * @returns {JSX.Element} The rendered search input component.
 */
const SearchInput = ({ query, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={query}
    onChange={onChange}
  />
);

// Export the SearchInput component as the default export
export default SearchInput;
