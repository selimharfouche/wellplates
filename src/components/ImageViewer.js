// ImageViewer.js

// Summary:
// This file defines the ImageViewer component which displays an image with full-screen functionality.
// It imports necessary hooks and components, manages the full-screen state, handles full-screen toggling,
// and renders the image with appropriate styling for both normal and full-screen modes.

// Import necessary libraries and hooks
import React, { useRef, useState, useEffect } from 'react';
import { addFullscreenChangeListener, requestFullscreen, exitFullscreen } from '../utils/fullscreen';

// ImageViewer Component
/**
 * The ImageViewer component provides functionality to view an image in full-screen mode.
 * 
 * Props:
 * - imagePath (string): Path to the image file.
 * - altText (string): Alternative text for the image.
 * 
 * @param {Object} props - The props object containing component properties.
 * @param {string} props.imagePath - Path to the image file.
 * @param {string} props.altText - Alternative text for the image.
 * 
 * The component uses destructuring to extract imagePath and altText directly from the props object
 * for cleaner and more readable code.
 */
const ImageViewer = ({ imagePath, altText }) => {
  // Reference to the image container div
  const imageRef = useRef();
  
  // useState hook to manage the full-screen state
  const [isFullScreen, setIsFullScreen] = useState(false);

  // useEffect hook to add and clean up the full-screen change event listener
  useEffect(() => {
    // Callback function to handle full-screen state changes
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    // Clean up the event listener on component unmount
    return cleanup;
  }, []);

  // Event handler for toggling full-screen mode
  const handleFullScreen = () => {
    if (!isFullScreen) {
      // Request to enter full-screen mode for the element referenced by imageRef.current
      requestFullscreen(imageRef.current);
    } else {
      // Exit full-screen mode
      exitFullscreen();
    }
  };

  return (
    // Container div for the image and button, with a ref for full-screen functionality
    <div ref={imageRef} style={{ position: 'relative', textAlign: 'center' }}>
      {/* Button to toggle full-screen mode */}
      <button 
        onClick={handleFullScreen} 
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
      >
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
      {/* Image element with conditional styling for normal and full-screen modes */}
      <img 
        src={imagePath} 
        alt={altText} 
        style={{ 
          maxWidth: isFullScreen ? '100%' : '600px', 
          maxHeight: isFullScreen ? '100vh' : '400px', 
          height: 'auto',
          width: 'auto' 
        }} 
      />
    </div>
  );
};

export default ImageViewer; // Exporting the ImageViewer component as the default export
