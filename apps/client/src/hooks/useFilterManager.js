import { useState } from 'react';

/**
 * Custom hook to manage the state and logic for filters and sorting options.
 * @returns {Object} The filter manager functions and state.
 * @returns {Array} activeFilters - The list of currently active filters.
 * @example
 * // Example value
 * [{ type: 'brand', values: ['Brand A'], sort: 'asc' }]
 * @returns {Object} filterValues - An object where keys are filter types and values are the selected values for those filters.
 * @example
 * // Example value
 * { brand: ['Brand A'], material: ['Material B'] }
 * @returns {Object} sortOptions - An object where keys are filter types and values are the selected sort options for those filters.
 * @example
 * // Example value
 * { brand: 'asc', material: 'desc' }
 * @returns {Function} handleAddFilter - Function to add a new filter.
 * @returns {Function} handleFilterTypeChange - Function to change the filter type at a specified index.
 * @returns {Function} handleFilterValueChange - Function to change the filter values at a specified index.
 * @returns {Function} handleSortChange - Function to change the sort option at a specified index.
 * @returns {Function} handleFilterRemove - Function to remove a filter at a specified index.
 */
const useFilterManager = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [sortOptions, setSortOptions] = useState({});

  /**
   * Adds a new filter to the active filters.
   */
  const handleAddFilter = () => {
    setActiveFilters([...activeFilters, { type: '', values: [], sort: '' }]);
  };

  /**
   * Handles the change of filter type.
   * @param {number} index - The index of the filter being changed.
   * @param {string} type - The new type of the filter.
   */
  const handleFilterTypeChange = (index, type) => {
    const newFilters = [...activeFilters];
    newFilters[index].type = type;
    newFilters[index].values = [];
    newFilters[index].sort = '';
    setActiveFilters(newFilters);
    setFilterValues(prev => ({ ...prev, [type]: [] }));
    setSortOptions(prev => ({ ...prev, [type]: '' }));
  };

  /**
   * Handles the change of filter values.
   * @param {number} index - The index of the filter being changed.
   * @param {Array<string>} values - The new values of the filter.
   */
  const handleFilterValueChange = (index, values) => {
    const newFilters = [...activeFilters];
    newFilters[index].values = values;
    setActiveFilters(newFilters);
    setFilterValues(prev => ({ ...prev, [newFilters[index].type]: values }));
  };

  /**
   * Handles the change of sort options.
   * @param {number} index - The index of the filter being changed.
   * @param {Event} event - The change event.
   */
  const handleSortChange = (index, event) => {
    const sort = event.target.value;
    const newFilters = [...activeFilters];
    newFilters[index].sort = sort;
    setActiveFilters(newFilters);
    setSortOptions(prev => ({ ...prev, [newFilters[index].type]: sort }));
  };

  /**
   * Removes a filter from the active filters.
   * @param {number} index - The index of the filter being removed.
   */
  const handleFilterRemove = (index) => {
    const newFilters = [...activeFilters];
    const removedFilter = newFilters.splice(index, 1);
    setActiveFilters(newFilters);
    setFilterValues(prev => {
      const newValues = { ...prev };
      delete newValues[removedFilter[0].type];
      return newValues;
    });
    setSortOptions(prev => {
      const newSorts = { ...prev };
      delete newSorts[removedFilter[0].type];
      return newSorts;
    });
  };

  return {
    activeFilters,
    filterValues,
    sortOptions,
    handleAddFilter,
    handleFilterTypeChange,
    handleFilterValueChange,
    handleSortChange,
    handleFilterRemove
  };
};

export default useFilterManager;
