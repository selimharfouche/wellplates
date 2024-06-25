# Wellplate Viewer Application

## Overview
The Wellplate Viewer Application is a React-based application designed to help users search, filter, and view detailed information about various wellplates. The application includes features such as a search bar, filters, detailed item views, and the ability to view images and 3D models in fullscreen.

## Table of Contents

## Features
- **Search Functionality**: Easily search for wellplates using a search bar.
- **Filtering Options**: Filter wellplates by material, brand, and number of wells.
- **Detailed Views**: View detailed information about each wellplate, including images and 3D models.
- **Fullscreen Mode**: View images and 3D models in fullscreen.

## Installation
To get started with the Wellplate Viewer Application, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/selimharfouche/wellplates.git
    cd wellplates
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the development server**:
    ```bash
    npm start
    ```

## Usage

## Project Structure
``` bash
wellplates/
│
├── public/
│   ├── images/
│   │   └── [image files]
│   ├── models/
│   │   └── [model files]
│   ├── 404.html
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── FullScreenButton.js
│   │   │   └── FullScreenButton.css
│   │   ├── display/
│   │   │   ├── ImageDisplay.js
│   │   │   ├── ModelDisplay.js
│   │   │   └── DisplayComponents.css
│   │   ├── search/
│   │   │   ├── FilterSelect.js
│   │   │   ├── FilteredList.js
│   │   │   ├── Search.js
│   │   │   └── SearchInput.js
│   │   ├── views/
│   │   │   ├── ImageViewer.js
│   │   │   ├── ItemDetail.js
│   │   │   ├── ModelViewer.js
│   │   │   ├── NotFound.css
│   │   │   └── NotFound.js
│   ├── data/
│   │   ├── database.json
│   │   └── filters.json
│   ├── utils/
│   │   └── fullscreen.js
│   ├── App.css
│   ├── App.js
│   ├── index.js
│   └── reportWebVitals.js
├── docs/
│   └── [documentation files]
├── package.json
└── README.md
```

## Main
### App.js
This is the main structure of the application, it includes routing.
Renders:
1. **Search.js**: landing page, /src/components/search/Search.js
2. **ItemDetail.js**: item page, /src/components/views/ItemDetail.js
3. **NotFound.js**: for 404, /src/components/views/NotFound.js

### database.json
Contains the wellplate data used in the application

## Search
**components/search/**: This directory contains all the scripts related to the search feature

### Search.js
**Purpose**: provides a search bar and filters to filter through the well plates data
**Key features**:
1. Manages serch query and filter states usinng 'useState;
2. Filters wellplate data based onn current query and selected filters
3. Dynamically generates filter options based on current selections.

### SearchInput.js
**Purpose**: renders a search input field and handles input changes.
**Props**:
1. query: Current search query.
2. onChange: Function to update the query state.

### FilterSelect.js

**Purpose**: renders a dropdown select element for filtering and updates the selected filter state.

**Props**:
1. value: Current selected value.
2. onChange: Function to update the selected value.
3. options: Array of options for the dropdown.
4. defaultOption: Default option displayed in the dropdown.

### FilteredList.js

**Purpose**: renders a list of filtered wellplate items with links to their detail pages.

**Props**:
filteredData : Array of filtered wellplate items.


