// src/Search.js
import React, { useState } from 'react';

const Search = ({ data }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = data.wellplates.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            {item.name} - {item.number_of_wells} wells - {item.material} - {item.brand}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
