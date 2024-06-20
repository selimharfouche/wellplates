// src/ModelViewer.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const ModelViewer = ({ modelPath }) => {
  return (
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
};

export default ModelViewer;
