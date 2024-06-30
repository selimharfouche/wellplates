// Search.js

// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SearchInput from '../search/SearchInput';
import FilterSelect from '../search/FilterSelect';
import FilteredList from '../search/FilteredList';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';


const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedNumberOfWells, setSelectedNumberOfWells] = useState("");

  /**
   * Fetch data from the server when the component mounts.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wellplates`); 
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Event handler for updating the search query state.
   * 
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  /**
   * Event handler for updating the selected material state.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The select change event
   */
  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  /**
   * Event handler for updating the selected brand state.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The select change event
   */
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  /**
   * Event handler for updating the selected number of wells state.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The select change event
   */
  const handleNumberOfWellsChange = (e) => {
    setSelectedNumberOfWells(e.target.value);
  };

  /**
   * Filters the data array based on the current values of query, selectedMaterial, selectedBrand, and selectedNumberWells.
   * 
   * @returns {Array} The filtered data array
   */
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedMaterial ? item.material === selectedMaterial : true) &&
      (selectedBrand ? item.brand === selectedBrand : true) &&
      (selectedNumberOfWells ? item.number_of_wells === parseInt(selectedNumberOfWells) : true)
    );
  });

  /**
   * Generates dynamic options for remaining filters based on current selection.
   * 
   * @returns {Array} The available materials array
   */
  const availableMaterials = [...new Set(data.filter(item => 
    (!selectedBrand || item.brand === selectedBrand) && 
    (!selectedNumberOfWells || item.number_of_wells === parseInt(selectedNumberOfWells))
  ).map(item => item.material))];

  /**
   * Generates dynamic options for remaining filters based on current selection.
   * 
   * @returns {Array} The available brands array
   */
  const availableBrands = [...new Set(data.filter(item => 
    (!selectedMaterial || item.material === selectedMaterial) && 
    (!selectedNumberOfWells || item.number_of_wells === parseInt(selectedNumberOfWells))
  ).map(item => item.brand))];

  /**
   * Generates dynamic options for remaining filters based on current selection.
   * 
   * @returns {Array} The available number of wells array
   */
  const availableNumberOfWells = [...new Set(data.filter(item => 
    (!selectedMaterial || item.material === selectedMaterial) && 
    (!selectedBrand || item.brand === selectedBrand)
  ).map(item => item.number_of_wells))];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Search App</h1>
      <SearchInput query={query} onChange={handleChange} />
      <FilterSelect value={selectedMaterial} onChange={handleMaterialChange} options={availableMaterials} defaultOption="All Materials" />
      <FilterSelect value={selectedBrand} onChange={handleBrandChange} options={availableBrands} defaultOption="All Brands" />
      <FilterSelect value={selectedNumberOfWells} onChange={handleNumberOfWellsChange} options={availableNumberOfWells} defaultOption="All Numbers of Wells" />
      <FilteredList filteredData={filteredData} />
    </div>
  );
};

export default Search;
