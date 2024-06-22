
# Search Component Documentation

## Summary

The `Search` component provides a search bar and filters to filter through the wellplates data. It manages the search query state, handles input changes, and renders a list of filtered wellplates with links to their detail pages.

## Components

The `Search` component is composed of several subcomponents:

- `SearchInput`
- `FilterSelect`
- `FilteredList`

### `SearchInput`

**File**: `src/components/search/SearchInput.js`

The `SearchInput` component renders a search input field and handles input changes. It updates the query state in the parent component.

**Props:**
- `query` (string): The current search query.
- `onChange` (function): The function to call when the input value changes.

### `FilterSelect`

**File**: `src/components/search/FilterSelect.js`

The `FilterSelect` component renders a dropdown select element for filtering. It updates the selected filter state in the parent component.

**Props:**
- `value` (string): The current selected value.
- `onChange` (function): The function to call when the select value changes.
- `options` (Array): The options to display in the select dropdown.
- `defaultOption` (string): The default option to display.

### `FilteredList`

**File**: `src/components/search/FilteredList.js`

The `FilteredList` component renders a list of filtered items with links to their detail pages.

**Props:**
- `filteredData` (Array): The array of filtered items.

## How It Works

1. **State Management**: The `Search` component manages the state for the search query and selected filters using React's `useState` hook.
2. **Input Handling**: The component includes handlers for input changes (`handleChange`, `handleMaterialChange`, `handleBrandChange`, and `handleNumberOfWellsChange`), which update the corresponding state.
3. **Filtering Data**: The `filteredData` variable filters the `data` prop based on the current state of the search query and selected filters. This is done using a single `.filter` method that combines all the filtering conditions.
4. **Dynamic Filter Options**: The component dynamically generates the available filter options (`availableMaterials`, `availableBrands`, `availableNumberOfWells`) based on the current selection to ensure relevant options are displayed.
5. **Rendering**: The component renders the `SearchInput`, three `FilterSelect` components for materials, brands, and number of wells, and the `FilteredList` component to display the filtered data.

