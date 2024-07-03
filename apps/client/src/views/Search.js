import React, { useState } from "react";
import { Link } from "react-router-dom";
import useFetchData from '../hooks/useFetchData';
import useFilters from '../hooks/useFilters';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Filter from '../components/Filter';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

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
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedWells, setSelectedWells] = useState([]);
  const filteredData = useFilters(data, searchTerm, selectedBrands, selectedMaterials, selectedWells);

  /**
   * Handles the change of selected brands.
   * Triggered when a brand filter is selected.
   * @param {Event} event - The change event.     
   * @see {@link Filter}
   */
  const handleBrandChange = (event) => {
    const { target: { value } } = event;
    setSelectedBrands(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /**
   * Handles the change of selected materials.
   * Triggered when a material filter is selected.
   * @param {Event} event - The change event.
   * @see {@link Filter}
   */
  const handleMaterialChange = (event) => {
    const { target: { value } } = event;
    setSelectedMaterials(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /**
   * Handles the change of selected number of wells.
   * Triggered when a well filter is selected.
   * @param {Event} event - The change event.
   * @see {@link Filter}
   */
  const handleWellsChange = (event) => {
    const { target: { value } } = event;
    setSelectedWells(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /**
   * Reflects the current state of the data fetching.
   * Displays a loading message while data is being fetched.
   */
  if (loading) {
    return <div>Loading...</div>;
  }

  /**
   * Reflects the current state of the data fetching.
   * Displays an error message if there was an error during data fetching.
   */
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  /**
   * Extracts unique brands for filter options from the fetched data.
   * @type {string[]}
   */
  const brands = [...new Set(data.map(item => item.brand))];

  /**
   * Extracts unique materials for filter options from the fetched data.
   * @type {string[]}
   */
  const materials = [...new Set(data.map(item => item.material))];

  /**
   * Extracts unique number of wells for filter options from the fetched data.
   * @type {string[]}
   */
  const wellsOptions = [...new Set(data.map(item => item.number_of_wells.toString()))];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TextField
                label="Search by Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
              />
            </TableCell>
            <TableCell>
              <Filter
                label="Brand"
                options={brands}
                selectedOptions={selectedBrands}
                handleChange={handleBrandChange}
              />
            </TableCell>
            <TableCell>
              <Filter
                label="Material"
                options={materials}
                selectedOptions={selectedMaterials}
                handleChange={handleMaterialChange}
              />
            </TableCell>
            <TableCell>
              <Filter
                label="Wells"
                options={wellsOptions}
                selectedOptions={selectedWells}
                handleChange={handleWellsChange}
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <Link to={`/item/${item._id}`}>
                  {item.name}
                </Link>
              </TableCell>
              <TableCell>{item.brand}</TableCell>
              <TableCell>{item.material}</TableCell>
              <TableCell>{item.number_of_wells}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Search;
