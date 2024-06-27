// App.js

// Summary:
// This file sets up the main structure of the React application, including the router and routes.
// It imports necessary components and data, and defines the main `App` component that wraps everything
// within a router context and sets up the navigation.

import React from 'react'; //Necessary for creating react components.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //handle client-side routing.
//BrowserRouter (aliased as Router): manages the routing in the application using the HTML5 history API.
//Route: Used to define individual routes in the application.
//Routes: container for all the **Route** components.
import './styles/App.css'
import data from './data/database.json';//wellplates database
import Search from './components/views/Search'; //provides the interface for searching and filtering well plates.
import ItemDetail from './components/views/ItemDetail';//displays detailed information about a selected well plate item.
import NotFound from './components/views/NotFound';//when the requested item cannnot be found.
import FetchDatabase from './components/views/FetchDatabase'; // Testing the server

// The main App component that sets up the router and routes.
function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Search data={data.wellplates} />} />
            <Route path="/item/:id" element={<ItemDetail data={data.wellplates} />} />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 page */}
            <Route path="/fetch-database" element={<FetchDatabase />} /> {/* Add the new route */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;