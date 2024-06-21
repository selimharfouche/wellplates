// src/utils/fullscreen.js
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
  