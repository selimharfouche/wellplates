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



# Code
### App.js
This is the main structure of the application, it includes routing.

### database.json
Contains the wellplate data used in the application.

## components/views
1. **Search.js**: landing page, /src/components/search/Search.js
2. **ItemDetail.js**: item page, /src/components/views/ItemDetail.js
3. **NotFound.js**: for 404, /src/components/views/NotFound.js


### Search.js
**Purpose**: provides a search bar and filters to filter through the well plates data.

**Key features**:
1. Manages search query and filter states using 'useState'.
2. Filters wellplate data based on current query and selected filters.
3. Dynamically generates filter options based on current selections.

### ItemDetail.js

**Purpose**: Displays detailed information about a specific wellplate based on the name parameter in the URL.

**Key features**:
1. Extracts the name parameter from the URL and decodes it to match it with the item names in the data.
2. Finds the corresponding item in the data array using the decoded name.
    - If the item is not found, redirects to a 404 page using the Navigate component.
    - Else renders the details of the found item 
### NotFound.js
404 template

## components/search

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

###

### ImageViewer.js

**Purpose**: Displays an image with the capability to view it in fullscreen mode.

**Components Used**:
1. ImageDisplay.js: displays the actual image
2. FullScreenButton: Button to toggle fullscreen mode.
    

### ModelViewer.js
Same as ImageViewer but uses ModelDisplay.js instead of ImageDisplay.js