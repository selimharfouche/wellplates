import { useState, useEffect } from "react";

/**
 * Custom hook to filter data based on search term, selected brands, selected materials, and selected number of wells.
 * 
 * @function useFilters
 * @param {Array} data - The array of data to filter.
 * @param {string} searchTerm - The search term to filter the data.
 * @param {Array<string>} selectedBrands - The selected brands to filter the data.
 * @param {Array<string>} selectedMaterials - The selected materials to filter the data.
 * @param {Array<string>} selectedWells - The selected number of wells to filter the data.
 * @returns {Array} - The filtered data.
 */
const useFilters = (data, searchTerm, selectedBrands, selectedMaterials, selectedWells) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data) {
      let filtered = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedBrands.length === 0 || selectedBrands.includes(item.brand)) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(item.material)) &&
        (selectedWells.length === 0 || selectedWells.includes(item.number_of_wells.toString()))
      );

      setFilteredData(filtered);
    }
  }, [data, searchTerm, selectedBrands, selectedMaterials, selectedWells]);

  return filteredData;
};

export default useFilters;
