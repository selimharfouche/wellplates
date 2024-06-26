// Search.js
//
// ## Summary
//
// The Search component provides a search bar and filters to filter through the wellplates data.
// It manages the search query state, handles input changes, and renders a list of filtered wellplates with links to their detail pages.
//
// ## References:
// * https://react.dev/reference/react/useState
// * https://reactjs.org/docs/hooks-state.html

// Import necessary libraries and components
import React, { useState } from "react";
import SearchInput from '../search/SearchInput';
import FilterSelect from '../search/FilterSelect';
import FilteredList from '../search/FilteredList';
import filters from '../../data/filters.json'; // to be used later on, 
// goal is to import the first set of filters, 
// and then generate dynamically the rest of the filters
// thus saving time from iterating over the whole database for the first set of filters

/**
 * The Search component provides a search bar and filters to filter through the wellplates data.
 * 
 * @param {Object} props - The properties object
 * @param {Array} props.data - Array of wellplate objects passed as a prop
 * @returns {JSX.Element} The rendered Search component
 */
const Search = ({ data }) => {
  
  /** 
   * The useState hook returns an array with two elements:
   * 1. The current state value
   * 2. A function that lets us update the state value
   * 
   * @type {[string, Function]}
   */
  const [query, setQuery] = useState("");

  /** @type {[string, Function]} */
  const [selectedMaterial, setSelectedMaterial] = useState("");

  /** @type {[string, Function]} */
  const [selectedBrand, setSelectedBrand] = useState("");

  /** @type {[string, Function]} */
  const [selectedNumberOfWells, setSelectedNumberOfWells] = useState("");

  /**
   * Event handler for updating the search query state.
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
