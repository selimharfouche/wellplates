// FilterSelect.js

import React from 'react';

/**
 * FilterSelect Component
 * Renders a dropdown select element for filtering.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.value - The current selected value.
 * @param {function} props.onChange - Function to handle select value changes.
 * @param {Array<string>} props.options - Options to display in the dropdown.
 * @param {string} props.defaultOption - Default option to display.
 * @returns {JSX.Element} The rendered filter select component.
 */
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

export default FilterSelect;
