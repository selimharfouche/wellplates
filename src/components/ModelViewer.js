// src/components/ModelViewer.js
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { addFullscreenChangeListener, requestFullscreen, exitFullscreen } from '../utils/fullscreen';

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const ModelViewer = ({ modelPath }) => {
  const canvasRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const cleanup = addFullscreenChangeListener((isFullScreen) => {
      setIsFullScreen(!!isFullScreen);
    });

    return cleanup;
  }, []);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      requestFullscreen(canvasRef.current);
    } else {
      exitFullscreen();
    }
  };

  return (
    <div ref={canvasRef} style={{ position: 'relative' }}>
      <button 
        onClick={handleFullScreen} 
        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}
      >
        {isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
      </button>
      <Canvas
        style={{ height: '400px', width: '100%' }}
        camera={{ position: [0, 0, 100], fov: 50 }}  
      >
        <Suspense fallback={<Html><div>Loading...</div></Html>}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls 
            enableZoom={true} 
            minDistance={10} 
            maxDistance={100} 
          />
          <Model modelPath={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
