import { useState, useEffect } from "react";

/**
 * Custom hook to filter and sort data based on search term, dynamic filter values, and sort options.
 * @param {Array} data - The array of data to filter and sort.
 * @param {string} searchTerm - The search term to filter the data.
 * @param {Object} filterValues - The dynamic filter values to filter the data.
 * @param {Object} sortOptions - The dynamic sort options to sort the data.
 * @returns {Array} - The filtered and sorted data.
 */
const useFilters = (data, searchTerm, filterValues, sortOptions) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      console.log("Original Data:", data);
      console.log("Search Term:", searchTerm);
      console.log("Filter Values:", filterValues);
      console.log("Sort Options:", sortOptions);

      let filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        Object.keys(filterValues).every(key => {
          const filterValue = filterValues[key];
          if (filterValue.length === 0) return true;
          if (key.startsWith('number_')) {
            return filterValue.includes(item[key].toString());
          }
          return filterValue.includes(item[key]);
        })
      );

      console.log("Filtered Data before Sorting:", filtered);

      // Apply sorting
      Object.keys(sortOptions).forEach(key => {
        if (sortOptions[key]) {
          filtered = filtered.sort((a, b) => {
            if (key.startsWith('number_')) {
              return sortOptions[key] === 'asc'
                ? a[key] - b[key]
                : b[key] - a[key];
            }
            return sortOptions[key] === 'asc'
              ? a[key].localeCompare(b[key])
              : b[key].localeCompare(a[key]);
          });
        }
      });

      console.log("Filtered Data after Sorting:", filtered);

      setFilteredData(filtered);
    }
  }, [data, searchTerm, filterValues, sortOptions]);

  return filteredData;
};

export default useFilters;
