// App.js

// Summary:
// This file sets up the main structure of the React application, including the router and routes.
// It imports necessary components and data, and defines the main `App` component that wraps everything
// within a router context and sets up the navigation.

// Includes
import React from 'react'; // Importing React library
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing components from react-router-dom for routing
import './App.css'; // Importing the CSS file for styling
import data from './data/database.json'; // Importing the JSON data
import Search from './components/Search'; // Importing the Search component
import ItemDetail from './components/ItemDetail'; // Importing the ItemDetail component

// App Component
/**
 * The main App component that sets up the router and routes.
 */
function App() {
  return (
    // Wrapping the entire application in a Router context for routing
    <Router>
      {/* Main container for the App component */}
      <div className="App">
        {/* Header section of the App */}
        <header className="App-header">
          {/* Main title of the application */}
          <h1>Search App</h1>
          {/* Routes container defining the different routes in the app */}
          <Routes>
            {/* Route for the home page displaying the Search component */}
            <Route path="/" element={<Search data={data.wellplates} />} />
            {/* Route for the item detail page displaying the ItemDetail component */}
            <Route path="/item/:name" element={<ItemDetail data={data.wellplates} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App; // Exporting the App component as the default export
