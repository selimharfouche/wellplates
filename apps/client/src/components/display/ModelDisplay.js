import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

/**
 * ModelDisplay component loads and renders a 3D model, sets up the canvas, and provides controls.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.modelPath - Path to the GLTF model file.
 * @returns {JSX.Element}
 */
const ModelDisplay = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);

  return (
    <Canvas className="model-display" camera={{ position: [0, 0, 100], fov: 50 }}>
      <Suspense fallback={<Html><div>Loading...</div></Html>}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={true} minDistance={10} maxDistance={100} />
        <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
      </Suspense>
    </Canvas>
  );
};

export default ModelDisplay;
