// src/Search.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Search = ({ data }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredData = data.filter(item =>
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
        {filteredData.map(item => (
          <li key={item.name}>
            <Link to={`/item/${encodeURIComponent(item.name)}`}>
              {item.name} - {item.number_of_wells} wells
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
