/**
 * @namespace views.Search
 * @description Search component allows users to search and filter wellplates.
 * @requires {@link helpers.Search.SearchInput}
 * @requires {@link helpers.Search.FilterSelect}
 * @requires {@link helpers.Search.FilteredList}
 */

import React, { useState } from "react";
import SearchInput from "../helpers/SearchInput";
import FilterSelect from "../helpers/FilterSelect";
import FilteredList from "../helpers/FilteredList";
import { handleChange } from '../utils/handlers';
import useFetchData from '../utils/useFetchData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

/**
 * @memberof views.Search
 * @description Fetches data for wellplates and initializes state variables.
 */
const Search = () => {
  /**
   * @member {Array} data
   * @memberof views.Search
   * @description The data fetched from the server.
   */
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  
  /**
   * @member {string} query
   * @memberof views.Search
   * @description The search query entered by the user.
   */
  const [query, setQuery] = useState("");

  /**
   * @member {string} selectedMaterial
   * @memberof views.Search
   * @description The selected material filter.
   */
  const [selectedMaterial, setSelectedMaterial] = useState("");

  /**
   * @member {string} selectedBrand
   * @memberof views.Search
   * @description The selected brand filter.
   */
  const [selectedBrand, setSelectedBrand] = useState("");

  /**
   * @member {string} selectedNumberOfWells
   * @memberof views.Search
   * @description The selected number of wells filter.
   */
  const [selectedNumberOfWells, setSelectedNumberOfWells] = useState("");

  /**
   * @description Filter the data based on the search query and selected filters.
   * @memberof views.Search
   * @returns {Array} Data filtered based on the search query and selected filters.
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

  /**
   * Get available materials for the filter based on the selected brand and number of wells.
   * @memberof views.Search
   * @returns {Array} Available materials for the filter.
   */
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

  /**
   * Get available brands for the filter based on the selected material and number of wells.
   * @memberof views.Search
   * @returns {Array} Available brands for the filter.
   */
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

  /**
   * Get available numbers of wells for the filter based on the selected material and brand.
   * @memberof views.Search
   * @returns {Array} Available numbers of wells for the filter.
   */
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
