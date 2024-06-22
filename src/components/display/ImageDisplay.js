// ImageDisplay.js
//
// ## Summary
//
// The ImageDisplay component renders an image and adjusts its size based on whether it is in fullscreen mode.
// It takes the image path, alternative text, and fullscreen state as props.
//
// ## References:
//
// * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img

// Import necessary libraries
import React from 'react';

// ImageDisplay Component
//
// This component displays an image with dynamic styling based on the fullscreen state.
//
// @param {Object} props - The props object containing component properties.
// @param {string} props.imagePath - Path to the image file.
// @param {string} props.altText - Alternative text for the image.
// @param {boolean} props.isFullScreen - Indicates if the image is currently in fullscreen mode.
//
const ImageDisplay = ({ imagePath, altText, isFullScreen }) => (
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
);

// Export the ImageDisplay component as the default export
export default ImageDisplay;
