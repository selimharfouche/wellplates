/**
 * @namespace views.Search
 * @description Search component allows users to search and filter wellplates.
 * @requires {@link helpers.SearchInput}
 * @requires {@link helpers.FilterSelect}
 * @requires {@link helpers.FilteredList}
 */

import React, { useState } from "react";
import SearchInput from "../helpers/Search/SearchInput";
import FilterSelect from "../helpers/Search/FilterSelect";
import FilteredList from "../helpers/Search/FilteredList";
import { handleChange } from '../utils/handlers';
import useFetchData from '../utils/useFetchData';
import useFilterOptions from '../helpers/Search/useFilterOptions';

/**
 * The base URL for the API.
 * Defaults to "http://localhost:3001" if the environment variable REACT_APP_API_BASE_URL is not set.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";


const Search = () => {

  /**
   * Fetches data from the API and provides loading and error states.
   * 
   * @returns {[Array, boolean, Error]}
   */
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);

  /**
   * State variables for the search component.
   * Each state variable is a string with a corresponding setter function.
   * 
   * @type {Array.<[string, Function]>}
   */
  const [query, setQuery] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedNumberOfWells, setSelectedNumberOfWells] = useState("");

  /**
   * Filters the data based on user input.
   * @function
   * @memberof views.Search
   * @param {object} item - An item from the data array.
   * @returns {boolean} - Whether the item matches the search criteria.
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

  const { availableMaterials, availableBrands, availableNumberOfWells } = useFilterOptions(
    data, selectedMaterial, selectedBrand, selectedNumberOfWells
  );

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
