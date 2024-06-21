# Detailed Explanation of Key Code Sections in `Search.js`

## Component Definition

### `const Search = ({ data }) =>`
This line defines the `Search` component as a functional component in React. The component takes a single prop, `data`, which is an array of wellplate objects. The `data` prop is used within the component to filter and display wellplate information based on the user's search query.

## State Management

### `const [query, setQuery] = useState("");`
This line uses the `useState` hook to create a state variable `query` and a function `setQuery` to update its value. The initial state of `query` is an empty string. The `query` state is used to store the current value of the search input, allowing the component to re-render and filter the wellplates as the user types.

## Data Filtering

### `const filteredData = data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));`
This line creates a new array `filteredData` that contains only the wellplates whose names include the current search query. The `filter` method iterates over each item in the `data` array, and the `includes` method checks if the `name` property of the item (converted to lowercase) contains the search query (also converted to lowercase). This makes the search case-insensitive.

## Rendering Filtered Data

### `{filteredData.map((item) => ( <li key={item.name}> <Link to={`/item/${encodeURIComponent(item.name)}`}> {item.name} - {item.number_of_wells} wells </Link> </li> ))}`
This block of code iterates over the `filteredData` array using the `map` method, rendering a list item (`<li>`) for each wellplate. Each list item contains a `Link` component from `react-router-dom`, which creates a clickable link to the detail page of the wellplate. The `to` prop of the `Link` component is set to the URL path `/item/${encodeURIComponent(item.name)}`, where `item.name` is URL-encoded to ensure it is a valid URL segment. Inside the `Link`, the name of the wellplate and the number of wells are displayed.

- `key={item.name}`: Each list item is given a unique `key` prop using the wellplate name to help React identify which items have changed, are added, or are removed.
- `encodeURIComponent(item.name)`: This function encodes the wellplate name to ensure that special characters are properly formatted for the URL.

### Link Explanation

The `Link` component from `react-router-dom` is used to create navigation links that enable client-side routing in a React application. In this case, the `Link` component is used to generate links to the detail pages of each wellplate. When a user clicks on one of these links, the URL changes to `/item/<wellplate-name>`, and the corresponding `ItemDetail` component is rendered.

- **URL Encoding**: `encodeURIComponent(item.name)` is used to encode the wellplate name so that it can be safely included in the URL. This ensures that special characters in the wellplate name are properly formatted for the URL.
- **Navigation**: Clicking on the `Link` navigates the user to the detail page of the selected wellplate, where the `ItemDetail` component is rendered with the relevant data.

By iterating over `filteredData`, this block dynamically generates the list of wellplates that match the search query, updating in real-time as the user types.
