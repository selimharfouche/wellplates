// FilterSelect.js

import React from 'react';

/**
 * FilterSelect Component
 * Renders a dropdown select element for filtering.
 * 
 * @component
 * @param {string} value - The current selected value.
 * @param {function} onChange - Function to handle select value changes.
 * @param {Array<string>} options - Options to display in the dropdown.
 * @param {string} defaultOption - Default option to display.
 * @returns {JSX.Element} The rendered filter select component.
 * @see {@link Search}
 */
const FilterSelect = ({ value, onChange, options, defaultOption }) => (
  <select value={value} onChange={onChange}>
    <option value="">{defaultOption}</option>
    {options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default FilterSelect;
