import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import useFilters from '../hooks/useFilters';
import useFilterManager from '../hooks/useFilterManager';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import FilterRow from '../components/FilterRow';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// Columns to display in the table
const displayColumns = [
  { label: 'Name', key: 'name' },
  { label: 'Brand', key: 'brand' },
  { label: 'Material', key: 'material' },
  { label: 'Number of Wells', key: 'number_of_wells' },
];

// Available filters for filtering the data
const availableFilters = [
  { label: 'Brand', key: 'brand' },
  { label: 'Material', key: 'material' },
  { label: 'Number of Wells', key: 'number_of_wells' },
];

/**
 * Generates filter options dynamically based on the data and available filters.
 * @param {Array} data - The array of data items.
 * @param {Array} filters - The array of available filters.
 * @returns {Object} The filter options.
 */
const generateFilterOptions = (data, filters) => {
  const options = {};
  filters.forEach(filter => {
    options[filter.key] = [...new Set(data.map(item => item[filter.key]?.toString()))];
  });
  return options;
};

/**
 * Search component fetches wellplate data and allows users to filter the data by typing in a search input.
 * Additionally, users can filter by brand, material, and number of wells.
 * @function
 * @name Search
 * @returns {JSX.Element} The rendered component.
 */
const Search = () => {
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  const [searchTerm, setSearchTerm] = useState("");  // Define searchTerm before using it
  const { activeFilters, filterValues, sortOptions, handleAddFilter, handleFilterTypeChange, handleFilterValueChange, handleSortChange, handleFilterRemove } = useFilterManager();
  const filteredData = useFilters(data, searchTerm, filterValues, sortOptions);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filterOptions = generateFilterOptions(data, availableFilters);

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>
      {activeFilters.map((filter, index) => (
        <FilterRow
          key={index}
          filter={filter}
          index={index}
          handleFilterTypeChange={handleFilterTypeChange}
          handleSortChange={handleSortChange}
          handleFilterValueChange={handleFilterValueChange}
          handleFilterRemove={handleFilterRemove}
          availableFilters={availableFilters}
          filterOptions={filterOptions}
          activeFilters={activeFilters}  // Pass activeFilters as a prop
        />
      ))}
      <Button onClick={handleAddFilter} sx={{ mb: 2 }}>Add Filter</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {displayColumns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item._id}>
                {displayColumns.map((column) => (
                  <TableCell key={column.key}>
                    {column.key === 'name' ? (
                      <Link to={`/item/${item._id}`}>
                        {item[column.key]}
                      </Link>
                    ) : (
                      item[column.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Search;
