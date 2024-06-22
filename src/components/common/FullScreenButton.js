// FullScreenButton.js
//
// ## Summary
//
// The FullScreenButton component provides a button to toggle fullscreen mode for a given element.
// It uses utility functions from the fullscreen.js module to request and exit fullscreen mode.
//
// ## References:
//
// * https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
// * ../../utils/fullscreen.js

// Import necessary libraries and utility functions
import React from 'react';
import { requestFullscreen, exitFullscreen } from '../../utils/fullscreen';

// FullScreenButton Component
//
// This component renders a button that toggles fullscreen mode for a referenced element.
//
// @param {Object} props - The props object containing component properties.
// @param {boolean} props.isFullScreen - Indicates if the element is currently in fullscreen mode.
// @param {Object} props.toggleFullScreen - Ref object for the element to toggle fullscreen mode.
//
const FullScreenButton = ({ isFullScreen, toggleFullScreen }) => {
  
  // handleFullScreen function
  //
  // This function handles the click event for toggling fullscreen mode.
  // It requests fullscreen mode if the element is not in fullscreen and exits fullscreen mode otherwise.
  //
  const handleFullScreen = () => {
    if (!isFullScreen) {
      requestFullscreen(toggleFullScreen.current);
    } else {
      exitFullscreen();
    }
  };

  return (
    // Render the button with an inline style for positioning
    <button 
      onClick={handleFullScreen} 
      style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
    >
      {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
    </button>
  );
};

// Export the FullScreenButton component as the default export
export default FullScreenButton;
