/**
 * Custom hook to compute available filter options based on the current selections.
 * 
 * @function useFilterOptions
 * @param {Array} data - The array of wellplate objects.
 * @param {Object} filters - The currently selected filters.
 * @param {Array} filterKeys - The array of filter keys.
 * @returns {Object} An object containing arrays of available filter options based on the selected filters.
 * 
 * @example
 * const availableFilters = useFilterOptions(data, filters, filterKeys);
 */
const useFilterOptions = (data, filters, filterKeys) => {
  const availableFilters = data.reduce((acc, item) => {
    filterKeys.forEach(key => {
      const selectedValue = filters[key][0];
      if (!selectedValue || item[key] === (key.startsWith("number") ? parseInt(selectedValue) : selectedValue)) {
        acc[key] = acc[key] || new Set();
        acc[key].add(item[key]);
      }
    });
    return acc;
  }, {});

  const result = {};
  filterKeys.forEach(key => {
    result[`available${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, '')}`] = [...availableFilters[key] || []];
  });

  return result;
};

export default useFilterOptions;
