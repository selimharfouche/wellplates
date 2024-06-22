// Search.js
//
// ## Summary
//
// The Search component provides a search bar and filters to filter through the wellplates data.
// It manages the search query state, handles input changes, and renders a list of filtered wellplates with links to their detail pages.
//
// ## References:
//
// * https://reactjs.org/docs/hooks-state.html
// * https://reactrouter.com/web/api/Link

// Import necessary libraries and components
import React, { useState } from "react";
import SearchInput from './SearchInput';
import FilterSelect from './FilterSelect';
import FilteredList from './FilteredList';

/**
 * The Search component provides a search bar and filters to filter through the wellplates data.
 * 
 * @param {Array} data - Array of wellplate objects passed as a prop
 */
const Search = ({ data }) => {
  const [query, setQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedNumberOfWells, setSelectedNumberOfWells] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handleNumberOfWellsChange = (e) => {
    setSelectedNumberOfWells(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedMaterial ? item.material === selectedMaterial : true) &&
      (selectedBrand ? item.brand === selectedBrand : true) &&
      (selectedNumberOfWells ? item.number_of_wells === parseInt(selectedNumberOfWells) : true)
    );
  });

  // Generate dynamic options for remaining filters based on current selection
  const availableMaterials = [...new Set(data.filter(item => 
    (!selectedBrand || item.brand === selectedBrand) && 
    (!selectedNumberOfWells || item.number_of_wells === parseInt(selectedNumberOfWells))
  ).map(item => item.material))];

  const availableBrands = [...new Set(data.filter(item => 
    (!selectedMaterial || item.material === selectedMaterial) && 
    (!selectedNumberOfWells || item.number_of_wells === parseInt(selectedNumberOfWells))
  ).map(item => item.brand))];

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
