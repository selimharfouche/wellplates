/**
 * Custom hook to compute available filter options based on the current selections.
 * 
 * @function useFilterOptions
 * @param {Array} data - The array of wellplate objects.
 * @param {string} selectedMaterial - The currently selected material filter.
 * @param {string} selectedBrand - The currently selected brand filter.
 * @param {string} selectedNumberOfWells - The currently selected number of wells filter.
 * @returns {Object} An object containing arrays of available materials, brands, and numbers of wells.
 * @returns {Array} return.availableMaterials - Array of unique materials based on the selected filters.
 * @returns {Array} return.availableBrands - Array of unique brands based on the selected filters.
 * @returns {Array} return.availableNumberOfWells - Array of unique numbers of wells based on the selected filters.
 * 
 * @example
 * const { availableMaterials, availableBrands, availableNumberOfWells } = useFilterOptions(data, selectedMaterial, selectedBrand, selectedNumberOfWells);
 */
const useFilterOptions = (data, selectedMaterial, selectedBrand, selectedNumberOfWells) => {
    const availableFilters = data.reduce(
      (acc, item) => {
        const { material, brand, number_of_wells } = item;
  
        if (
          (!selectedBrand || brand === selectedBrand) &&
          (!selectedNumberOfWells || number_of_wells === parseInt(selectedNumberOfWells))
        ) {
          acc.materials.add(material);
        }
  
        if (
          (!selectedMaterial || material === selectedMaterial) &&
          (!selectedNumberOfWells || number_of_wells === parseInt(selectedNumberOfWells))
        ) {
          acc.brands.add(brand);
        }
  
        if (
          (!selectedMaterial || material === selectedMaterial) &&
          (!selectedBrand || brand === selectedBrand)
        ) {
          acc.numberOfWells.add(number_of_wells);
        }
  
        return acc;
      },
      { materials: new Set(), brands: new Set(), numberOfWells: new Set() }
    );
  
    return {
      availableMaterials: [...availableFilters.materials],
      availableBrands: [...availableFilters.brands],
      availableNumberOfWells: [...availableFilters.numberOfWells]
    };
  };
  
  export default useFilterOptions;
  