// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import data from './database.json';
import Search from './Search';
import ItemDetail from './ItemDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Search App</h1>
          <Routes>
            <Route path="/" element={<Search data={data.wellplates} />} />
            <Route path="/item/:name" element={<ItemDetail data={data.wellplates} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
