//ModelDisplay.js

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

/**
 * Model component loads and renders a 3D model.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.modelPath - Path to the GLTF model file.
 * @returns {JSX.Element}
 */
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

/**
 * ModelDisplay component sets up the canvas and renders the 3D model with controls.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.modelPath - Path to the GLTF model file.
 * @returns {JSX.Element}
 */
const ModelDisplay = ({ modelPath }) => (
  <Canvas className="model-display" camera={{ position: [0, 0, 100], fov: 50 }}>
    <Suspense fallback={<Html><div>Loading...</div></Html>}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls enableZoom={true} minDistance={10} maxDistance={100} />
      <Model modelPath={modelPath} />
    </Suspense>
  </Canvas>
);

export default ModelDisplay;
