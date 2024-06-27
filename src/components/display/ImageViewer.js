// ImageViewer.js

import React, { useRef, useState, useEffect } from 'react';
import { addFullscreenChangeListener } from '../../utils/fullscreen';
import FullScreenButton from '../common/FullScreenButton';

/**
 * ImageViewer component renders an image with fullscreen capability.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.imagePath - Path to the image file.
 * @param {string} props.altText - Alt text for the image.
 * @returns {JSX.Element}
 */
const ImageViewer = ({ imagePath, altText }) => {

  const imageRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  const fullImagePath = `/images/${imagePath}`;

  return (
    <div ref={imageRef} style={{ position: 'relative', textAlign: 'center' }}>
      <FullScreenButton isFullScreen={isFullScreen} toggleFullScreen={imageRef} />
      <img 
        src={fullImagePath} 
        alt={altText} 
        className={`image-display ${isFullScreen ? 'fullscreen' : ''}`}
      />
    </div>
  );
};

export default ImageViewer;
