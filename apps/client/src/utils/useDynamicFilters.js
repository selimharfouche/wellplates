import { useState } from "react";

const useDynamicFilters = (filters) => {
  const [state, setState] = useState(
    filters.reduce((acc, filter) => {
      acc[filter.key] = "";
      return acc;
    }, {})
  );

  const setFilterState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const filterSetters = filters.reduce((acc, filter) => {
    acc[filter.key] = (value) => setFilterState(filter.key, value);
    return acc;
  }, {});

  return [state, filterSetters];
};

export default useDynamicFilters;
