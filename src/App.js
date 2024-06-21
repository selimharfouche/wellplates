// App.js

// Summary:
// This file sets up the main structure of the React application, including the router and routes.
// It imports necessary components and data, and defines the main `App` component that wraps everything
// within a router context and sets up the navigation.

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import data from './data/database.json';
import Search from './components/Search';
import ItemDetail from './components/ItemDetail';

/**
 * The main App component that sets up the router and routes.
 */
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