// src/App.js
import React from 'react';
import './App.css';
import data from './database.json';
import Search from './Search';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Search App</h1>
        <Search data={data} />
      </header>
    </div>
  );
}

export default App;
