// Search.js

// Summary:
// This file defines the Search component which includes a search bar to filter through the wellplates data.
// It imports necessary hooks and components, manages the search query state, handles input changes,
// and renders a list of filtered wellplates with links to their detail pages.

import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/database.json";
import filters from "../data/filters.json";

/**
 * The Search component provides a search bar to filter through the wellplates data.
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

  const filteredData = data
    .filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    )
    .filter((item) =>
      selectedMaterial ? item.material === selectedMaterial : true
    )
    .filter((item) =>
      selectedBrand ? item.brand === selectedBrand : true
    )
    .filter((item) =>
      selectedNumberOfWells ? item.number_of_wells === parseInt(selectedNumberOfWells) : true
    );

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
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />

      <select value={selectedMaterial} onChange={handleMaterialChange}>
        <option value="">All Materials</option>
        {availableMaterials.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
      </select>

      <select value={selectedBrand} onChange={handleBrandChange}>
        <option value="">All Brands</option>
        {availableBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select value={selectedNumberOfWells} onChange={handleNumberOfWellsChange}>
        <option value="">All Numbers of Wells</option>
        {availableNumberOfWells.map((number) => (
          <option key={number} value={number}>
            {number}
          </option>
        ))}
      </select>

      <ul>
        {filteredData.map((item) => (
          <li key={item.name}>
            <Link to={`/item/${encodeURIComponent(item.name)}`}>
              {item.name} - {item.number_of_wells} wells
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;