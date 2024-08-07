import React, { useRef } from 'react';
import FullScreenButton from '../../components/FullScreenButton';

/**
 * @description ImageViewer component renders an image with fullscreen capability.
 * @memberof helpers
 * @param {string} imagePath - Path to the image file.
 * @param {string} altText - Alt text for the image.
 * @returns {JSX.Element} The ImageViewer component.
 * @see {@link views.ItemDetail}
 */
const ImageViewer = ({ imagePath, altText }) => {
  const imageRef = useRef();
  const fullImagePath = `/images/${imagePath}`;

  return (
    <div ref={imageRef} style={{ position: 'relative', textAlign: 'center' }}>
      <FullScreenButton toggleFullScreen={imageRef} />
      <img 
        src={fullImagePath} 
        alt={altText} 
        className={`image-display`}
      />
    </div>
  );
};

export default ImageViewer;
