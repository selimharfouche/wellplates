import React from "react";
import { FormControl, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

/**
 * Filter component renders a multi-select dropdown with checkboxes for filtering options.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label for the filter dropdown.
 * @param {Array<string>} props.options - The array of options to display in the dropdown.
 * @param {Array<string>} props.selectedOptions - The array of currently selected options.
 * @param {function} props.handleChange - The function to handle changes in the selected options.
 * @returns {JSX.Element} The rendered component.
 */
const Filter = ({ label, options, selectedOptions, handleChange }) => {
  return (
    <FormControl fullWidth>
      <Select
        multiple
        displayEmpty
        value={selectedOptions}
        onChange={handleChange}
        renderValue={(selected) => selected.length === 0 ? `Filter by ${label}` : selected.join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Filter;
