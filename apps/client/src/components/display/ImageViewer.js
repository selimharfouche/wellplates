import React, { useRef } from 'react';
import FullScreenButton from '../common/FullScreenButton';

/**
 * ImageViewer component renders an image with fullscreen capability.
 *
 * @component
 * @param {Object} props - Component properties.
 * @param {string} props.imagePath - Path to the image file.
 * @param {string} props.altText - Alt text for the image.
 * @returns {JSX.Element} The ImageViewer component.
 * @see {@link ItemDetail}
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
