// ModelViewer.js

import React, { useRef, useState, useEffect } from 'react';
import { addFullscreenChangeListener } from '../../utils/fullscreen';
import FullScreenButton from '../common/FullScreenButton';
import ModelDisplay from './ModelDisplay';

/**
 * ModelViewer component renders a 3D model with fullscreen capability.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.modelPath - Path to the 3D model file.
 * @returns {JSX.Element}
 */
const ModelViewer = ({ modelPath }) => {
  const canvasRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  // Construct the full path to the model
  console.log("MODEL PATH"+ modelPath);
  const fullModelPath = `/models/${modelPath}`;

  return (
    <div ref={canvasRef} style={{ position: 'relative' }}>
      <FullScreenButton isFullScreen={isFullScreen} toggleFullScreen={canvasRef} />
      <ModelDisplay modelPath={fullModelPath} />
    </div>
  );
};

export default ModelViewer;
