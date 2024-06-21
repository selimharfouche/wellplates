// src/components/ModelViewer.js
import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const ModelViewer = ({ modelPath }) => {
  const canvasRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement === canvasRef.current ||
        document.webkitFullscreenElement === canvasRef.current ||
        document.mozFullScreenElement === canvasRef.current ||
        document.msFullscreenElement === canvasRef.current
      );
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('MSFullscreenChange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullScreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullScreenChange);
    };
  }, []);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (canvasRef.current.requestFullscreen) {
        canvasRef.current.requestFullscreen();
      } else if (canvasRef.current.mozRequestFullScreen) { // Firefox
        canvasRef.current.mozRequestFullScreen();
      } else if (canvasRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
        canvasRef.current.webkitRequestFullscreen();
      } else if (canvasRef.current.msRequestFullscreen) { // IE/Edge
        canvasRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
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
