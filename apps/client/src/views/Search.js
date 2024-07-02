/**
 * @namespace views.Search
 * @description Search component allows users to search and filter wellplates.
 * @requires {@link helpers.SearchInput}
 * @requires {@link helpers.FilterSelect}
 * @requires {@link helpers.FilteredList}
 */

import React from "react";
import FilterSelect from "../helpers/Search/FilterSelect";
import FilteredList from "../helpers/Search/FilteredList";
import { handleChange } from '../utils/handlers';
import useFetchData from '../utils/useFetchData';
import useFilterOptions from '../helpers/Search/useFilterOptions';
import useDynamicFilters from '../utils/useDynamicFilters';

/**
 * The base URL for the API.
 * Defaults to "http://localhost:3001" if the environment variable REACT_APP_API_BASE_URL is not set.
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const Search = () => {

  /**
   * Fetches data from the API and manages loading and error states.
   * @returns {Array} data - Array of wellplate objects.
   * @returns {boolean} loading - Loading state.
   * @returns {Object} error - Error state.
   */
  const [data, loading, error] = useFetchData(`${API_BASE_URL}/api/wellplates`);
  
  /**
   * The array of filter keys to be used in the search component.
   * @constant {Array}
   */
  const filterKeys = ["material", "brand", "number_of_wells"]; // Add more filter keys as needed

  /**
   * Uses the custom hook to dynamically generate state variables for the filters.
   * @returns {Object} - Contains the query state and the filters object.
   */
  const { query, setQuery, filters } = useDynamicFilters(filterKeys);

  /**
   * Filters the data based on the query and selected filters.
   * @returns {Array} filteredData - Array of filtered wellplate objects.
   */
  const filteredData = data.filter((item) => {
    return (
      item.name.toLowerCase().includes(query.toLowerCase()) &&
      filterKeys.every(key => {
        const [selectedValue] = filters[key];
        if (key.startsWith("number")) {
          return selectedValue ? item[key] === parseInt(selectedValue) : true;
        }
        return selectedValue ? item[key] === selectedValue : true;
      })
    );
  });

  const { availableMaterials, availableBrands, availableNumberOfWells } = useFilterOptions(
    data, filters.material[0], filters.brand[0], filters.number_of_wells[0]
  );

  const filterOptions = {
    material: availableMaterials,
    brand: availableBrands,
    number_of_wells: availableNumberOfWells
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Search App</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleChange(e, "query", setQuery)}
      />
      {filterKeys.map(key => {
        const [selectedValue, setSelectedValue] = filters[key];
        return (
          <FilterSelect
            key={key}
            value={selectedValue}
            onChange={(e) => handleChange(e, key, setSelectedValue)}
            options={filterOptions[key]}
            defaultOption={`All ${key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase())}`}
          />
        );
      })}
      <FilteredList filteredData={filteredData} />
    </div>
  );
};

export default Search;
