/**
 * @namespace utils.fullscreen
 * @description Utility functions to manage fullscreen mode in browsers.
 */

/**
 * Adds a listener for fullscreen mode changes and invokes a callback with the fullscreen state.
 * 
 * @function addFullscreenChangeListener
 * @memberof utils.fullscreen
 * @param {function} callback - The callback function to invoke on fullscreen change.
 * @returns {function} A cleanup function to remove the event listeners.
 */
export const addFullscreenChangeListener = (callback) => {
  const handleFullScreenChange = () => {
    callback(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  };

  if (document.fullscreenEnabled) {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
  } else if (document.webkitFullscreenEnabled) {
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
  } else if (document.mozFullScreenEnabled) {
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
  } else if (document.msFullscreenEnabled) {
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);
  }

  return () => {
    if (document.fullscreenEnabled) {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    } else if (document.webkitFullscreenEnabled) {
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
    } else if (document.mozFullScreenEnabled) {
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
    } else if (document.msFullscreenEnabled) {
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    }
  };
};

/**
 * Requests fullscreen mode for a given element.
 * 
 * @function requestFullscreen
 * @memberof utils.fullscreen
 * @param {Element} element - The element to request fullscreen mode for.
 */
export const requestFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
};

/**
 * Exits fullscreen mode.
 * 
 * @function exitFullscreen
 * @memberof utils.fullscreen
 */
export const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
};
