// useFilterOptions.js
const useFilterOptions = (data, ...args) => {
    // Logic to extract available options for each key
    // For simplicity, assume it returns an object with keys matching filter keys
    const options = args.map((arg, index) => {
      const key = data[index];
      const values = [...new Set(data.map(item => item[key]))];
      return values;
    });
  
    return options.reduce((acc, val, index) => {
      const key = data[index];
      acc[`available${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, '')}`] = val;
      return acc;
    }, {});
  };
  
  export default useFilterOptions;
  