// ModelDisplay.js
//
// ## Summary
//
// The ModelDisplay component uses @react-three/fiber and @react-three/drei to render a 3D model.
// It defines a Model component to load the GLTF model and a ModelDisplay component to set up the canvas and render the model.
//
// ## References:
//
// * https://github.com/pmndrs/react-three-fiber
// * https://github.com/pmndrs/drei

// Import necessary libraries and components
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

// -------------------- functions --------------------

// Model Component
//
// This component loads the 3D model using useGLTF and renders it as a primitive object.
// 
// @param {string} modelPath - Path to the GLTF model file.
//
const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

// -------------------- main component --------------------

// ModelDisplay Component
//
// This component sets up the Canvas for rendering the 3D model and includes controls for interaction.
//
// @param {string} modelPath - Path to the GLTF model file.
//
const ModelDisplay = ({ modelPath }) => (
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
);

// Export the ModelDisplay component as the default export
export default ModelDisplay;
