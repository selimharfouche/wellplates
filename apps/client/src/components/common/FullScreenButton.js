import React, { useEffect, useState } from 'react';
import { requestFullscreen, exitFullscreen, addFullscreenChangeListener } from '../../utils/fullscreen';
import '../../styles/FullScreenButton.css';

/**
 * Renders a button that toggles fullscreen mode for a referenced element.
 *
 * @component
 * @param {Object} props - The props object containing component properties.
 * @param {Object} props.toggleFullScreen - Ref object for the element to toggle fullscreen mode.
 */
const FullScreenButton = ({ toggleFullScreen }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  /**
   * Handles the click event for toggling fullscreen mode.
   * Requests fullscreen mode if the element is not in fullscreen and exits fullscreen mode otherwise.
   */
  const handleFullScreen = () => {
    if (!isFullScreen) {
      requestFullscreen(toggleFullScreen.current);
    } else {
      exitFullscreen();
    }
  };

  return (
    <button onClick={handleFullScreen} className="fullscreen-button">
      {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
    </button>
  );
};

export default FullScreenButton;
