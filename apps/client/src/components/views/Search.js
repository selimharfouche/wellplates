// Search.js

import React, { useState } from "react";
import SearchInput from "../search/SearchInput";
import FilterSelect from "../search/FilterSelect";
import FilteredList from "../search/FilteredList";
import { handleChange } from '../../utils/handlers';
import useFetchData from '../../utils/fetchdata';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

/**
 * Search component allows users to search and filter wellplates.
 *
 * @component
 * @requires {@link SearchInput}
 * @requires {@link FilterSelect}
 * @requires {@link FilteredList}
 */
const Search = () => {
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  const [query, setQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedNumberOfWells, setSelectedNumberOfWells] = useState("");

  /**
   * Filtered and available options for the search component.
   *
   * @typedef {Object} FilteredOptions
   * @property {Array} filteredData - Data filtered based on the search query and selected filters.
   * @property {Array} availableMaterials - Available materials for the filter based on the selected brand and number of wells.
   * @property {Array} availableBrands - Available brands for the filter based on the selected material and number of wells.
   * @property {Array} availableNumberOfWells - Available numbers of wells for the filter based on the selected material and brand.
   */

  /**
   * @type {FilteredOptions}
   */
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedMaterial ? item.material === selectedMaterial : true) &&
      (selectedBrand ? item.brand === selectedBrand : true) &&
      (selectedNumberOfWells
        ? item.number_of_wells === parseInt(selectedNumberOfWells)
        : true)
    );
  });

  const availableMaterials = [
    ...new Set(
      data
        .filter(
          (item) =>
            (!selectedBrand || item.brand === selectedBrand) &&
            (!selectedNumberOfWells ||
              item.number_of_wells === parseInt(selectedNumberOfWells)),
        )
        .map((item) => item.material),
    ),
  ];

  const availableBrands = [
    ...new Set(
      data
        .filter(
          (item) =>
            (!selectedMaterial || item.material === selectedMaterial) &&
            (!selectedNumberOfWells ||
              item.number_of_wells === parseInt(selectedNumberOfWells)),
        )
        .map((item) => item.brand),
    ),
  ];

  const availableNumberOfWells = [
    ...new Set(
      data
        .filter(
          (item) =>
            (!selectedMaterial || item.material === selectedMaterial) &&
            (!selectedBrand || item.brand === selectedBrand),
        )
        .map((item) => item.number_of_wells),
    ),
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Search App</h1>
      <SearchInput query={query} onChange={(e) => handleChange(e, "query", setQuery)} />
      <FilterSelect
        value={selectedMaterial}
        onChange={(e) => handleChange(e, "material", setSelectedMaterial)}
        options={availableMaterials}
        defaultOption="All Materials"
      />
      <FilterSelect
        value={selectedBrand}
        onChange={(e) => handleChange(e, "brand", setSelectedBrand)}
        options={availableBrands}
        defaultOption="All Brands"
      />
      <FilterSelect
        value={selectedNumberOfWells}
        onChange={(e) => handleChange(e, "numberOfWells", setSelectedNumberOfWells)}
        options={availableNumberOfWells}
        defaultOption="All Numbers of Wells"
      />
      <FilteredList filteredData={filteredData} />
    </div>
  );
};

export default Search;
