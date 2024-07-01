// handlers.js

/**
 * @description Handle changes in various inputs.
 *
 * @param {Object} e - Event object.
 * @param {string} type - Type of filter to be updated.
 * @param {Function} setState - State setter function.
 * @memberof utils
 */
export const handleChange = (e, type, setState) => {
    const value = e.target.value;
    setState(value);
  };
  