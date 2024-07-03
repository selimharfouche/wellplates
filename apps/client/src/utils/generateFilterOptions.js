/**
 * Generates available filter options based on the current data and active filters.
 *
 * When a new filter is added, the available options for the new filter are constrained by the currently active filters.
 *
 * @param {Array<Object>} data - The dataset to be filtered.
 * @param {Array<{label: string, key: string}>} filters - The available filters.
 * @param {Array<{type: string, values: Array<string>}>} activeFilters - The currently active filters.
 * @returns {Object} - Returns an object containing the available options for each filter key.
 */
const generateFilterOptions = (data, filters, activeFilters) => {
  const options = {};

  filters.forEach(filter => {
    let filteredData = data;

    // Apply active filters except for the current filter type
    activeFilters.forEach(activeFilter => {
      if (activeFilter.type && activeFilter.type !== filter.key && activeFilter.values.length > 0) {
        filteredData = filteredData.filter(item =>
          activeFilter.values.includes(item[activeFilter.type]?.toString())
        );
      }
    });

    // Generate options based on filtered data
    options[filter.key] = [...new Set(filteredData.map(item => item[filter.key]?.toString()))];
  });

  return options;
};

export default generateFilterOptions;
