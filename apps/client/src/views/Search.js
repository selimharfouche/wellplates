import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetchData from '../utils/useFetchData';
import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';

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
  const [filteredData, setFilteredData] = useState([]);

  /**
   * Filters the fetched data based on the search term, selected brands, selected materials, and selected number of wells.
   * Updates the filtered data whenever the search term, selected brands, selected materials, selected wells, or the fetched data changes.
   * @function
   */
  useEffect(() => {
    if (data) {
      let filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedBrands.length === 0 || selectedBrands.includes(item.brand)) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(item.material)) &&
        (selectedWells.length === 0 || selectedWells.includes(item.number_of_wells.toString()))
      );

      setFilteredData(filtered);
    }
  }, [data, searchTerm, selectedBrands, selectedMaterials, selectedWells]);

  /**
   * Handles the change of selected brands.
   * @param {Event} e - The change event.
   */
  const handleBrandChange = (event) => {
    const { target: { value } } = event;
    setSelectedBrands(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /**
   * Handles the change of selected materials.
   * @param {Event} e - The change event.
   */
  const handleMaterialChange = (event) => {
    const { target: { value } } = event;
    setSelectedMaterials(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  /**
   * Handles the change of selected number of wells.
   * @param {Event} e - The change event.
   */
  const handleWellsChange = (event) => {
    const { target: { value } } = event;
    setSelectedWells(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Extract unique brands, materials, and number of wells for filter options
  const brands = [...new Set(data.map(item => item.brand))];
  const materials = [...new Set(data.map(item => item.material))];
  const wellsOptions = [...new Set(data.map(item => item.number_of_wells.toString()))];

  return (
    <div>
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
                <FormControl fullWidth>
                  <Select
                    multiple
                    displayEmpty
                    value={selectedBrands}
                    onChange={handleBrandChange}
                    renderValue={(selected) => selected.length === 0 ? "Filter by Brand" : selected.join(', ')}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        <Checkbox checked={selectedBrands.indexOf(brand) > -1} />
                        <ListItemText primary={brand} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    multiple
                    displayEmpty
                    value={selectedMaterials}
                    onChange={handleMaterialChange}
                    renderValue={(selected) => selected.length === 0 ? "Filter by Material" : selected.join(', ')}
                  >
                    {materials.map((material) => (
                      <MenuItem key={material} value={material}>
                        <Checkbox checked={selectedMaterials.indexOf(material) > -1} />
                        <ListItemText primary={material} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Select
                    multiple
                    displayEmpty
                    value={selectedWells}
                    onChange={handleWellsChange}
                    renderValue={(selected) => selected.length === 0 ? "Filter by Wells" : selected.join(', ')}
                  >
                    {wellsOptions.map((wells) => (
                      <MenuItem key={wells} value={wells}>
                        <Checkbox checked={selectedWells.indexOf(wells) > -1} />
                        <ListItemText primary={wells} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
    </div>
  );
};

export default Search;
