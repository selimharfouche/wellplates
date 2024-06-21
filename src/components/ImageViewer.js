// src/components/ImageViewer.js
import React, { useRef, useState, useEffect } from 'react';
import { addFullscreenChangeListener, requestFullscreen, exitFullscreen } from '../utils/fullscreen';

const ImageViewer = ({ imagePath, altText }) => {
  const imageRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      requestFullscreen(imageRef.current);
    } else {
      exitFullscreen();
    }
  };

  return (
    <div ref={imageRef} style={{ position: 'relative', textAlign: 'center' }}>
      <button 
        onClick={handleFullScreen} 
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
      >
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
      <img src={imagePath} alt={altText} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default ImageViewer;
