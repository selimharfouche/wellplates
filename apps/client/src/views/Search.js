import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import useFilters from '../hooks/useFilters';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, InputLabel, Box, IconButton } from '@mui/material';
import Filter from '../components/Filter';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';

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
 * Search component fetches wellplate data and allows users to filter the data by typing in a search input.
 * Additionally, users can filter by brand, material, and number of wells.
 * @function
 * @name Search
 * @returns {JSX.Element} The rendered component.
 */
const Search = () => {
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [sortOptions, setSortOptions] = useState({});
  const filteredData = useFilters(data, searchTerm, filterValues, sortOptions);

  const handleAddFilter = () => {
    setActiveFilters([...activeFilters, { type: '', values: [], sort: '' }]);
  };

  const handleFilterTypeChange = (index, type) => {
    const newFilters = [...activeFilters];
    newFilters[index].type = type;
    newFilters[index].values = [];
    newFilters[index].sort = '';
    setActiveFilters(newFilters);
    setFilterValues(prev => ({ ...prev, [type]: [] }));
    setSortOptions(prev => ({ ...prev, [type]: '' }));
  };

  const handleFilterValueChange = (index, values) => {
    const newFilters = [...activeFilters];
    newFilters[index].values = values;
    setActiveFilters(newFilters);
    setFilterValues(prev => ({ ...prev, [newFilters[index].type]: values }));
  };

  const handleSortChange = (index, event) => {
    const sort = event.target.value;
    console.log("Selected Sort Option:", sort);
    const newFilters = [...activeFilters];
    newFilters[index].sort = sort;
    setActiveFilters(newFilters);
    setSortOptions(prev => ({ ...prev, [newFilters[index].type]: sort }));
    console.log("Updated Sort Options State:", sortOptions);
  };

  const handleFilterRemove = (index) => {
    const newFilters = [...activeFilters];
    const removedFilter = newFilters.splice(index, 1);
    setActiveFilters(newFilters);
    setFilterValues(prev => {
      const newValues = { ...prev };
      delete newValues[removedFilter[0].type];
      return newValues;
    });
    setSortOptions(prev => {
      const newSorts = { ...prev };
      delete newSorts[removedFilter[0].type];
      return newSorts;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const brands = [...new Set(data.map(item => item.brand))];
  const materials = [...new Set(data.map(item => item.material))];
  const wellsOptions = [...new Set(data.map(item => item.number_of_wells.toString()))];

  const selectedFilterTypes = activeFilters.map(filter => filter.type);

  return (
    <div>
      <Header />
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
        <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
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
                {filter.type.startsWith('number_') ? (
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
              options={filter.type === 'brand' ? brands : filter.type === 'material' ? materials : wellsOptions}
              selectedOptions={filter.values}
              handleChange={(e) => handleFilterValueChange(index, e.target.value)}
            />
          )}
        </Box>
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
