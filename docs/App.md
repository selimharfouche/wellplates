# App.js

## Summary

The App.js file sets up the main structure of the React application, including the router and routes. It imports necessary components and data, and defines the main App component that wraps everything within a router context and sets up the navigation.

## Code

javascript
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import data from './data/database.json';
import Search from './components/search/Search';
import ItemDetail from './components/views/ItemDetail';
import NotFound from './components/views/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Search data={data.wellplates} />} />
            <Route path="/item/:name" element={<ItemDetail data={data.wellplates} />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;


## Imports

- **React** and other necessary modules from React.
- **BrowserRouter**, **Route**, and **Routes** from react-router-dom for routing.
- **CSS** file for styling.
- Data from a **JSON** file.
- Components: **Search**, **ItemDetail**, and **NotFound**.


## App Component

### Router Setup:

#### BrowserRouter (Router):
- Acts as the top-level router component that provides the routing context to the rest of the application.
- Manages the application's history using the HTML5 History API (pushState, replaceState, and the popstate event).
- Ensures that the UI is in sync with the URL.

### Routes:

#### Routes:
- A container for all Route components.
- Matches the current URL against the defined set of child Route components and renders the one whose path matches the URL.

#### Route:
- Defines a mapping between a URL path and a component.
- When the URL matches the path prop of a Route, the specified component is rendered.
- Supports dynamic segments in the path, such as /item/:name, where :name is a dynamic part of the URL that can be accessed in the component.

### Route Definitions:

#### Home Page (/):
- Route path="/" element={<Search data={data.wellplates} />}: Renders the Search component and passes the wellplates data as a prop.

#### Item Detail Page (/item/:name):
- Route path="/item/:name" element={<ItemDetail data={data.wellplates} />}: Renders the ItemDetail component for a specific wellplate. The name parameter in the URL is used to identify the wellplate, and the wellplates data is passed as a prop.

#### Catch-All Route (*):
- Route path="*" element={<NotFound />}: Renders the NotFound component for any URL that doesn't match the defined routes. This acts as a 404 error page.


## References

- [React Router Documentation](https://reactrouter.com/)
- [React Documentation](https://reactjs.org/)