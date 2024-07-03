import React from 'react';
import { FormControl, Select, MenuItem, InputLabel, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Filter from './Filter';
import isNumericFilter from '../utils/isNumericFilter';

const FilterRow = ({ filter, index, handleFilterTypeChange, handleSortChange, handleFilterValueChange, handleFilterRemove, availableFilters, filterOptions, activeFilters }) => {
  const selectedFilterTypes = activeFilters.map(f => f.type);

  return (
    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <IconButton color="secondary" onClick={() => handleFilterRemove(index)}>
        <CloseIcon />
      </IconButton>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Filter Type</InputLabel>
        <Select
          value={filter.type}
          onChange={(e) => handleFilterTypeChange(index, e.target.value)}
          displayEmpty
        >
          {availableFilters.map((option) => (
            <MenuItem key={option.key} value={option.key} disabled={selectedFilterTypes.includes(option.key)}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {filter.type && (
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={filter.sort}
            onChange={(e) => handleSortChange(index, e)}
            displayEmpty
          >
            {isNumericFilter(filter.type) ? (
              [
                <MenuItem key="asc" value="asc">Ascending</MenuItem>,
                <MenuItem key="desc" value="desc">Descending</MenuItem>
              ]
            ) : (
              [
                <MenuItem key="asc" value="asc">A-Z</MenuItem>,
                <MenuItem key="desc" value="desc">Z-A</MenuItem>
              ]
            )}
          </Select>
        </FormControl>
      )}
      {filter.type && (
        <Filter
          label={availableFilters.find(f => f.key === filter.type)?.label}
          options={filterOptions[filter.type]}
          selectedOptions={filter.values}
          handleChange={(e) => handleFilterValueChange(index, e.target.value)}
        />
      )}
    </Box>
  );
};

export default FilterRow;
