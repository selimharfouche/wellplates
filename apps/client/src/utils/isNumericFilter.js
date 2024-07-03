/**
 * Determines if a given filter key corresponds to a numeric parameter in the database.
 *
 * This function allows defining the numeric parameters used for filtering the data.
 * It considers keys that start with 'number_', as well as specific keys like 'id' and 'price', as numeric.
 *
 * @param {string} key - The key to be checked.
 * @returns {boolean} - Returns true if the key corresponds to a numeric parameter, otherwise false.
 */
const isNumericFilter = (key) => {
    return key.startsWith('number_') || key === 'id' || key === 'price';
  };
  
  export default isNumericFilter;
  