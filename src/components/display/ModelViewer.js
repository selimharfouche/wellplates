import React, { useRef, useState, useEffect } from 'react';
import { addFullscreenChangeListener } from '../../utils/fullscreen';
import FullScreenButton from '../common/FullScreenButton';
import ModelDisplay from './ModelDisplay';

const ModelViewer = ({ modelPath }) => {
  const canvasRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  return (
    <div ref={canvasRef} style={{ position: 'relative' }}>
      <FullScreenButton isFullScreen={isFullScreen} toggleFullScreen={canvasRef} />
      <ModelDisplay modelPath={modelPath} />
    </div>
  );
};

export default ModelViewer;
