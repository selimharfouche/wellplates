// ModelViewer.js

import React, { useRef, Suspense} from 'react';
import FullScreenButton from '../common/FullScreenButton';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

/**
 * ModelViewer component renders a 3D model with fullscreen capability.
 *
 * @param {string} modelPath - Path to the 3D model file.
 * @returns {JSX.Element}
 */
const ModelViewer = ({ modelPath }) => {
  const { scene } = useGLTF(`/models/${modelPath}`);
  const canvasRef = useRef();

  return (
    <div ref={canvasRef} style={{ position: 'relative' }}>
      <FullScreenButton toggleFullScreen={canvasRef} />
      <Canvas className="model-display" camera={{ position: [0, 0, 100], fov: 50 }}>
      <Suspense fallback={<Html><div>Loading...</div></Html>}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={true} minDistance={10} maxDistance={100} />
        <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
      </Suspense>
    </Canvas>
    </div>
  );
};

export default ModelViewer;
