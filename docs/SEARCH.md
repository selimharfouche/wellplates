# Interaction Between Search and its Subcomponents

## Search.js
- The `Search` component manages the state for search queries and filters.
- It passes down the necessary state and event handler functions as props to its subcomponents.

## SearchInput.js
- Renders a search input field.
- Receives the current search query (`query`) and a function to handle changes (`onChange`) as props.
- When the user types in the search input, it calls the `onChange` function, which updates the `query` state in the `Search` component.

## FilterSelect.js
- Renders a dropdown select element for filtering.
- Receives the current selected value (`value`), a function to handle changes (`onChange`), available options (`options`), and a default option (`defaultOption`) as props.
- When the user selects an option, it calls the `onChange` function, which updates the corresponding filter state in the `Search` component (e.g., `selectedMaterial`, `selectedBrand`, `selectedNumberOfWells`).

## FilteredList.js
- Renders a list of filtered items with links to their detail pages.
- Receives the filtered data (`filteredData`) as a prop.
- The filtered data is generated in the `Search` component based on the current search query and selected filters.
- Displays the filtered list of wellplate items.

## Data Flow
1. User types in the search input -> `SearchInput` calls `onChange` -> `Search` updates `query` state.
2. User selects a filter option -> `FilterSelect` calls `onChange` -> `Search` updates the corresponding filter state.
3. `Search` component filters the data based on `query` and selected filters -> passes filtered data to `FilteredList`.
4. `FilteredList` renders the filtered items.

# Example Flow
1. User types "test" in the search input.
2. `SearchInput` calls `onChange`, `Search` updates `query` to "test".
3. User selects "BrandA" from the brand filter.
4. `FilterSelect` calls `onChange`, `Search` updates `selectedBrand` to "BrandA".
5. `Search` filters the data using `query` and `selectedBrand`, passes filtered data to `FilteredList`.
6. `FilteredList` renders the list of items that match "test" and "BrandA".
