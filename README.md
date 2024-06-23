# Wellplate Viewer Application

## Overview
The Wellplate Viewer Application is a React-based application designed to help users search, filter, and view detailed information about various wellplates. The application includes features such as a search bar, filters, detailed item views, and the ability to view images and 3D models in fullscreen.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Data](#data)
- [Utilities](#utilities)


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
1. **Search for Wellplates**: Use the search bar on the home page to search for specific wellplates by name.
2. **Filter Wellplates**: Apply filters for material, brand, and number of wells to narrow down the search results.
3. **View Details**: Click on a wellplate name to view detailed information, including images and 3D models.
4. **Fullscreen Mode**: Click the fullscreen button on images and 3D models to view them in fullscreen.

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
## Usage

The application allows users to:
- Search for wellplates by name.
- Filter wellplates by material, brand, and number of wells.
- View detailed information about each wellplate, including images and 3D models.

## Components Overview

### Common Components

- **FullScreenButton**: A button to toggle fullscreen mode for a given element.

### Display Components

- **ImageDisplay**: Displays an image with dynamic styling based on fullscreen state.
- **ModelDisplay**: Renders a 3D model using `@react-three/fiber` and `@react-three/drei`.

### Search Components

- **Search**: Provides a search bar and filters to filter through the wellplates data.
- **SearchInput**: Renders a search input field.
- **FilterSelect**: Renders a dropdown select element for filtering.
- **FilteredList**: Renders a list of filtered items with links to their detail pages.

### Views

- **ImageViewer**: Manages and displays an image that can be toggled to fullscreen mode.
- **ItemDetail**: Displays detailed information about a specific wellplate.
- **ModelViewer**: Displays a 3D model of a wellplate.
- **NotFound**: A simple 404 page for undefined routes.

## Data

- **database.json**: Contains wellplate data including name, number of wells, material, brand, image path, 3D model path, and comments.
- **filters.json**: Contains arrays of materials, brands, and numbers of wells used in wellplates.

## Utilities

- **fullscreen.js**: Provides functions to handle fullscreen functionality, including entering, exiting, and listening for changes in fullscreen state



## Components Overview

### Common Components

- **FullScreenButton**: A button to toggle fullscreen mode for a given element.

### Display Components

- **ImageDisplay**: Displays an image with dynamic styling based on fullscreen state.
- **ModelDisplay**: Renders a 3D model using `@react-three/fiber` and `@react-three/drei`.

### Search Components

- **Search**: Provides a search bar and filters to filter through the wellplates data.
- **SearchInput**: Renders a search input field.
- **FilterSelect**: Renders a dropdown select element for filtering.
- **FilteredList**: Renders a list of filtered items with links to their detail pages.

### Views

- **ImageViewer**: Manages and displays an image that can be toggled to fullscreen mode.
- **ItemDetail**: Displays detailed information about a specific wellplate.
- **ModelViewer**: Displays a 3D model of a wellplate.
- **NotFound**: A simple 404 page for undefined routes.

## Data

- **database.json**: Contains wellplate data including name, number of wells, material, brand, image path, 3D model path, and comments.
- **filters.json**: Contains arrays of materials, brands, and numbers of wells used in wellplates.

## Utilities

- **fullscreen.js**: Provides functions to handle fullscreen functionality, including entering, exiting, and listening for changes in fullscreen state.

## Additional Documentation

For detailed documentation on each component and feature, please refer to the `docs` directory.
