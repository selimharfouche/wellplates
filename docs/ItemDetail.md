# Interaction Between ItemDetail and its Subcomponents

## ItemDetail.js
- The `ItemDetail` component displays detailed information about a specific wellplate item.
- It retrieves the item details based on the URL parameter (`name`) and uses the item data to conditionally render subcomponents.

## ImageViewer.js
- Renders an image with fullscreen capability.
- Receives the image path (`imagePath`) and alt text (`altText`) as props.
- If the item in `ItemDetail` has an `image` property, `ImageViewer` is rendered with the appropriate props to display the item's image.

## ModelDisplay.js
- Sets up the canvas for rendering a 3D model using `@react-three/fiber` and `@react-three/drei`.
- Receives the model path (`modelPath`) as a prop.
- Used within `ModelViewer` to load and display the 3D model on a canvas with interactive controls.

## ModelViewer.js
- Renders a 3D model with fullscreen capability.
- Receives the model path (`modelPath`) as a prop.
- If the item in `ItemDetail` has a `model3D` property, `ModelViewer` is rendered with the appropriate props to display the item's 3D model.
- Utilizes `ModelDisplay` internally to handle the actual rendering of the 3D model.

## Data Flow
1. `ItemDetail` extracts the `name` parameter from the URL.
2. `ItemDetail` finds the item in the data array that matches the decoded `name`.
3. If the item has an `image` property:
   - `ItemDetail` renders `ImageViewer`, passing `imagePath` and `altText` props.
4. If the item has a `model3D` property:
   - `ItemDetail` renders `ModelViewer`, passing the `modelPath` prop.
   - `ModelViewer` internally uses `ModelDisplay` to set up the canvas and render the 3D model.

# Example Flow (will be edited once database contains real items)
1. User navigates to the detail page for a specific wellplate.
2. `ItemDetail` extracts the `name` from the URL and finds the corresponding item in the data array.
3. If the item has an `image` property, `ItemDetail` renders `ImageViewer` with the image path.
4. If the item has a `model3D` property, `ItemDetail` renders `ModelViewer` with the model path.
5. `ModelViewer` uses `ModelDisplay` to render the 3D model on a canvas with interactive controls.
