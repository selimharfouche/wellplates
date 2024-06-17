// src/components/WellplatesSearch.js
import React, { useState, useEffect } from 'react';

const WellplatesSearch = () => {
  const [database, setDatabase] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');
  const [wellsFilter, setWellsFilter] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('/database.json')
      .then(response => response.json())
      .then(data => setDatabase(data.wellplates));
  }, []);

  useEffect(() => {
    const filteredResults = database.filter(wellplate => {
      return (
        (wellplate.name.toLowerCase().includes(searchInput.toLowerCase()) 
||
          
wellplate.brand.toLowerCase().includes(searchInput.toLowerCase())) &&
        (materialFilter === '' || wellplate.material === materialFilter) 
&&
        (wellsFilter === '' || wellplate.number_of_wells === 
Number(wellsFilter))
      );
    });
    setResults(filteredResults);
  }, [searchInput, materialFilter, wellsFilter, database]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Search Wellplates</h1>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or brand"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Filter by Material</label>
        <select
          className="form-control"
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Polystyrene">Polystyrene</option>
          <option value="Polypropylene">Polypropylene</option>
          <option value="Polycarbonate">Polycarbonate</option>
        </select>
      </div>
      <div className="form-group">
        <label>Filter by Number of Wells</label>
        <select
          className="form-control"
          value={wellsFilter}
          onChange={(e) => setWellsFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="96">96</option>
          <option value="384">384</option>
          <option value="1536">1536</option>
        </select>
      </div>
      <div id="results" className="mt-4">
        {results.length === 0 ? (
          <div className="alert alert-warning">No results found.</div>
        ) : (
          <ul className="list-group">
            {results.map((result, index) => (
              <li key={index} className="list-group-item">
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(result.name, searchInput),
                  }}
                />{' '}
                -{' '}
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightText(result.brand, searchInput),
                  }}
                />{' '}
                ({result.material}, {result.number_of_wells} wells)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WellplatesSearch;

