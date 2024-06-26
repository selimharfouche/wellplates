# Wellplate Viewer React Application

## Overview
This React application allows users to search, filter, and view detailed information about wellplates. The application includes functionality for searching and filtering wellplates, as well as viewing detailed information including images and 3D models.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
  - [Search Component](#search-component)
  - [ItemDetail Component](#itemdetail-component)
  - [NotFound Component](#notfound-component)
  - [Common Components](#common-components)
- [Data Flow](#data-flow)
- [Documentation](#documentation)


## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
```sh
    git clone https://github.com/selimharfouche/wellplates.git 
```
2. Navigate to the project directory:
```sh
    cd wellplates
```
3. Install dependencies:
```sh
    npm install
```

4. Start the development server:
```sh
    npm start
```
## Usage
After starting the development server, you can access the application in your web browser at `http://localhost:3000`.

## Project Structure
! MAY NOT BE UP TO DATE AS IT WILL ALWAYS BE UPDATED LAST
```sh
wellplates/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── FullScreenButton.js
│   │   │   └── ...
│   │   ├── display/
│   │   │   ├── ImageViewer.js
│   │   │   ├── ModelViewer.js
│   │   │   └── ModelDisplay.js
│   │   ├── search/
│   │   │   ├── FilterSelect.js
│   │   │   ├── SearchInput.js
│   │   │   └── FilteredList.js
│   │   ├── views/
│   │   │   ├── Search.js
│   │   │   ├── ItemDetail.js
│   │   │   └── NotFound.js
│   │   └── ...
│   ├── data/
│   │   ├── database.json
│   │   ├── filters.json
│   │   └── ...
│   ├── styles/
│   │   └── ...
│   ├── utils/
│   │   ├── fullscreen.js
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
└── package.json

```

## Components

### Search Component
- **Search.js**: Manages the state for search queries and filters, and passes down the necessary state and event handler functions as props to its subcomponents.
- **SearchInput.js**: Renders a search input field and handles input changes.
- **FilterSelect.js**: Renders a dropdown select element for filtering.
- **FilteredList.js**: Renders a list of filtered wellplate items with links to their detail pages.

### ItemDetail Component
- **ItemDetail.js**: Displays detailed information about a specific wellplate item based on the URL parameter.
- **ImageViewer.js**: Renders an image with fullscreen capability.
- **ModelViewer.js**: Renders a 3D model with fullscreen capability.
- **ModelDisplay.js**: Sets up the canvas for rendering a 3D model.

### NotFound Component
- **NotFound.js**: Displays a custom 404 error page with a count-up animation for the "404" number.

### Common Components
- **FullScreenButton.js**: Provides a button to toggle fullscreen mode for a given element.

## Data Flow
### Search Component
1. User types in the search input -> `SearchInput` calls `onChange` -> `Search` updates `query` state.
2. User selects a filter option -> `FilterSelect` calls `onChange` -> `Search` updates the corresponding filter state.
3. `Search` component filters the data based on `query` and selected filters -> passes filtered data to `FilteredList`.
4. `FilteredList` renders the filtered items.

### ItemDetail Component
1. `ItemDetail` extracts the `name` parameter from the URL.
2. `ItemDetail` finds the item in the data array that matches the decoded `name`.
3. If the item has an `image` property:
   - `ItemDetail` renders `ImageViewer`, passing `imagePath` and `altText` props.
4. If the item has a `model3D` property:
   - `ItemDetail` renders `ModelViewer`, passing the `modelPath` prop.
   - `ModelViewer` internally uses `ModelDisplay` to set up the canvas and render the 3D model.

## Documentation
For detailed documentation on the key components, refer to the following files in the `docs` directory:
- [search.md](docs/Search.md): Explains in depth how `Search.js` interacts with its subcomponents.
- [itemdetail.md](./docs/ItemDetail.md): Explains in depth how `ItemDetail.js` interacts with its subcomponents.

