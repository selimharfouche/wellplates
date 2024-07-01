// SearchInput.js

import React from 'react';

/**
 * SearchInput Component
 * @description Renders a search input field.
 * @memberof helpers.Search
 * @param {Object} props - Component properties.
 * @param {string} props.query - The current search query.
 * @param {function} props.onChange - Function to handle input value changes.
 * @returns {JSX.Element} The rendered search input component.
 * @see {@link views.Search}
 */
const SearchInput = ({ query, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={query}
    onChange={onChange}
  />
);

export default SearchInput;
