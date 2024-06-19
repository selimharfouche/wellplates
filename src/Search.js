import React, { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({ data }) => {
  //https://react.dev/reference/react/useState
  const [query, setQuery] = useState("");

  //On each input on the search box, setQuery will update the value of query with the current innput
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  //returns search result
  const filteredData = data.filter((item) =>
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
        {/* for each item return name and number of wells, clickable */}
        {filteredData.map((item) => (
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
