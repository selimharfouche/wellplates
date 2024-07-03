import { useState } from 'react';

const useFilterManager = (initialFilters = []) => {
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  const [filterValues, setFilterValues] = useState({});
  const [sortOptions, setSortOptions] = useState({});

  const handleAddFilter = () => {
    setActiveFilters([...activeFilters, { type: '', values: [], sort: '' }]);
  };

  const handleFilterTypeChange = (index, type) => {
    const newFilters = [...activeFilters];
    newFilters[index].type = type;
    newFilters[index].values = [];
    newFilters[index].sort = '';
    setActiveFilters(newFilters);
    setFilterValues(prev => ({ ...prev, [type]: [] }));
    setSortOptions(prev => ({ ...prev, [type]: '' }));
  };

  const handleFilterValueChange = (index, values) => {
    const newFilters = [...activeFilters];
    newFilters[index].values = values;
    setActiveFilters(newFilters);
    setFilterValues(prev => ({ ...prev, [newFilters[index].type]: values }));
  };

  const handleSortChange = (index, event) => {
    const sort = event.target.value;
    const newFilters = [...activeFilters];
    newFilters[index].sort = sort;
    setActiveFilters(newFilters);
    setSortOptions(prev => ({ ...prev, [newFilters[index].type]: sort }));
  };

  const handleFilterRemove = (index) => {
    const newFilters = [...activeFilters];
    const removedFilter = newFilters.splice(index, 1);
    setActiveFilters(newFilters);
    setFilterValues(prev => {
      const newValues = { ...prev };
      delete newValues[removedFilter[0].type];
      return newValues;
    });
    setSortOptions(prev => {
      const newSorts = { ...prev };
      delete newSorts[removedFilter[0].type];
      return newSorts;
    });
  };

  return {
    activeFilters,
    filterValues,
    sortOptions,
    handleAddFilter,
    handleFilterTypeChange,
    handleFilterValueChange,
    handleSortChange,
    handleFilterRemove
  };
};

export default useFilterManager;
