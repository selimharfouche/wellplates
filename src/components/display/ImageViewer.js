import React, { useRef, useState, useEffect } from 'react';
import { addFullscreenChangeListener } from '../../utils/fullscreen';
import FullScreenButton from '../common/FullScreenButton';
//import './DisplayComponents.css';

const ImageViewer = ({ imagePath, altText }) => {
  const imageRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  return (
    <div ref={imageRef} style={{ position: 'relative', textAlign: 'center' }}>
      <FullScreenButton isFullScreen={isFullScreen} toggleFullScreen={imageRef} />
      <img 
    src={imagePath} 
    alt={altText} 
    className={`image-display ${isFullScreen ? 'fullscreen' : ''}`}
  />
    </div>
  );
};

export default ImageViewer;
