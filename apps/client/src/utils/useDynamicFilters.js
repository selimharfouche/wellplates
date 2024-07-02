import { useState, useMemo } from 'react';

const useDynamicFilters = (filterKeys) => {
  const [query, setQuery] = useState("");

  const filters = useMemo(() => {
    const stateObjects = filterKeys.map((key) => {
      const [value, setValue] = useState("");
      return { key, value, setValue };
    });
    return stateObjects.reduce((acc, { key, value, setValue }) => {
      acc[key] = [value, setValue];
      return acc;
    }, {});
  }, [filterKeys]);

  return { query, setQuery, filters };
};

export default useDynamicFilters;
