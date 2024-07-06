import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import useFilters from "../hooks/useFilters";
import useFilterManager from "../hooks/useFilterManager";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import FilterRow from "../components/FilterRow";
import Header from "../components/Header";
import generateFilterOptions from '../utils/generateFilterOptions';
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

/**
 * Columns to display in the table.
 * @type {Array<{label: string, key: string}>}
 * @property {string} label - The value displayed to the client.
 * @property {string} key - The value used for querying the database.
 * @remark This array can be modified to reflect the specific columns the developer wishes to display.
 */
const displayColumns = [
  { label: "Name", key: "name" },
  { label: "Brand", key: "brand" },
  { label: "Material", key: "material" },
  { label: "Number of Wells", key: "number_of_wells" },
];

/**
 * Available filters for filtering the data.
 * @type {Array<{label: string, key: string}>}
 * @property {string} label - The value displayed to the client.
 * @property {string} key - The value used for querying the database.
 * @remark This array can be modified to reflect the specific filters the developer wishes to offer.
 */
const availableFilters = [
  // { label: "ID", key: "id" },
  { label: "Brand", key: "brand" },
  { label: "Material", key: "material" },
  { label: "Number of Wells", key: "number_of_wells" },
];

/**
 * Search component fetches wellplate data and allows users to filter the data by typing in a search input.
 * Additionally, users can filter by properties such as brand, material, number of wells...
 * @function
 * @name Search
 * @returns {JSX.Element} The rendered component.
 */
const Search = () => {
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    activeFilters,
    filterValues,
    sortOptions,
    handleAddFilter,
    handleFilterTypeChange,
    handleFilterValueChange,
    handleSortChange,
    handleFilterRemove,
  } = useFilterManager();
  const filteredData = useFilters(data, searchTerm, filterValues, sortOptions);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filterOptions = generateFilterOptions(data, availableFilters, activeFilters);
  return (
    <div>
      {/* Header component */}
      <Header />

      {/* Search input field */}
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Search by Name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Dynamic filter rows */}
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
          activeFilters={activeFilters}
        />
      ))}

      {/* Button to add a new filter */}
      <Button onClick={handleAddFilter} sx={{ mb: 2 }}>
        Add Filter
      </Button>

      {/* Table to display filtered data */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Table headers */}
              {displayColumns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Table rows with filtered data */}
            {filteredData.map((item) => (
              <TableRow key={item._id}>
                {displayColumns.map((column) => (
                  <TableCell key={column.key}>
                    {column.key === "name" ? (
                      <Link to={`/item/${item._id}`}>{item[column.key]}</Link>
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
