/**
 * @file App.js
 * @summary Sets up the main structure of the React application, including the router and routes.
 * @returns {JSX.Element} The application's main component with routing configured.
 */


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Search from './views/Search';
import ItemDetail from './views/ItemDetail';
import NotFound from './views/NotFound';



function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
