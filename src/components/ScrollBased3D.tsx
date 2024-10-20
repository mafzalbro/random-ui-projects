import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import React, { useRef } from 'react';
import * as THREE from 'three';

// Camera controller to animate the camera position
interface CameraControllerProps {
  cameraPositionY: MotionValue<number>;
  cameraPositionX: MotionValue<number>;
  cameraPositionZ: MotionValue<number>;
}

const CameraController: React.FC<CameraControllerProps> = ({
  cameraPositionY,
  cameraPositionX,
  cameraPositionZ,
}) => {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.y = cameraPositionY.get(); // Animate Y position
    camera.position.x = cameraPositionX.get(); // Animate X position
    camera.position.z = cameraPositionZ.get(); // Animate Z position
  });

  return null; // No need to return JSX as we are only controlling the camera here
};

// Box component to animate its rotation based on scroll
const RotatingBox: React.FC<{ rotationY: number; rotationX: number; rotationZ: number }> = ({
  rotationY,
  rotationX,
  rotationZ,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      // Set the rotation based on scroll
      meshRef.current.rotation.y = rotationY;
      meshRef.current.rotation.x = rotationX;
      meshRef.current.rotation.z = rotationZ; // Rotate on Z axis
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={'blue'} />
    </mesh>
  );
};

const ScrollBased3D: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Map scroll progress to camera's position and box rotation
  const cameraPositionY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const cameraPositionX = useTransform(scrollYProgress, [0, 1], [-5, 5]); // Adjust X position based on scroll
  const cameraPositionZ = useTransform(scrollYProgress, [0, 1], [5, 10]); // Adjust Z position based on scroll

  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]); // Full rotation (360 degrees)
  const rotationX = useTransform(scrollYProgress, [0, 1], [0, Math.PI]); // Half rotation (180 degrees)
  const rotationZ = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]); // Full rotation on Z axis

  return (
    <>
      <motion.h1 className='text-3xl' initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
        Just Start Scrolling and See...
      </motion.h1>

      <motion.div style={{ height: '300vh', position: 'relative' }}>
        <div style={{ backgroundColor: '#1e1e1e', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1000 }} />
        <Canvas
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }} // Disable pointer events
          shadows
        >
          {/* Animate the camera movement */}
          <CameraController
            cameraPositionY={cameraPositionY}
            cameraPositionX={cameraPositionX}
            cameraPositionZ={cameraPositionZ}
          />
          <OrbitControls enableZoom={false} enablePan={false} />

          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* Render and rotate the box based on scroll */}
          <RotatingBox rotationY={rotationY.get()} rotationX={rotationX.get()} rotationZ={rotationZ.get()} />
        </Canvas>

        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'auto', // Ensure this div can receive pointer events
          }}
        >
          <h1>3D Object Scroll</h1>
        </motion.div>

        <div style={{ marginTop: '150vh', textAlign: 'center', position: 'relative', zIndex: 1000 }}>
          <h1>End of Page But Still Scrolling...</h1>
        </div>
      </motion.div>
    </>
  );
};

export default ScrollBased3D;
