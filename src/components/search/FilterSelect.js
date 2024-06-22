// FilterSelect.js
//
// ## Summary
//
// The FilterSelect component renders a dropdown select element for filtering.
// It updates the selected filter state in the parent component.
//
// ## References:
//
// * https://reactjs.org/docs/forms.html

// Import necessary libraries
import React from 'react';

// FilterSelect Component
//
// This component renders a dropdown select element for filtering.
//
// @param {Object} props - The props object containing component properties.
// @param {string} props.value - The current selected value.
// @param {function} props.onChange - The function to call when the select value changes.
// @param {Array} props.options - The options to display in the select dropdown.
// @param {string} props.defaultOption - The default option to display.
//
const FilterSelect = ({ value, onChange, options, defaultOption }) => (
  <select value={value} onChange={onChange}>
    <option value="">{defaultOption}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

// Export the FilterSelect component as the default export
export default FilterSelect;
