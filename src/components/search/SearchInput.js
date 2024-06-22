// SearchInput.js
//
// ## Summary
//
// The SearchInput component renders a search input field and handles input changes.
// It updates the query state in the parent component.
//
// ## References:
//
// * https://reactjs.org/docs/forms.html

// Import necessary libraries
import React from 'react';

// SearchInput Component
//
// This component renders a search input field.
//
// @param {Object} props - The props object containing component properties.
// @param {string} props.query - The current search query.
// @param {function} props.onChange - The function to call when the input value changes.
//
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
