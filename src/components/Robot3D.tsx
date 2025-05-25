// src/components/Robot3D.tsx

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

function RobotModel(props: JSX.IntrinsicElements["group"]) {
  const { scene, animations } = useGLTF("/robo.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction?.reset().play();
    }
  }, [actions, animations]);

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/robo.glb");

function AnimatedRobot() {
  const groupRef = useRef<THREE.Group>(null);
  const positions = [-2, 0, 2, 0]; // Left, Center, Right, Center
  const [index, setIndex] = useState(0);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const targetX = positions[index];
    const currentX = group.position.x;

    // Smooth movement
    group.position.x += (targetX - currentX) * 0.02;

    // If close to target, switch to next position
    if (Math.abs(targetX - currentX) < 0.01) {
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % positions.length);
      }, 1000); // wait 1 second before moving again
    }
  });

  return (
    <group ref={groupRef}>
      <RobotModel scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

export default function Robot3D() {
  return (
    <Canvas style={{ width: "100%", height: 400 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <AnimatedRobot />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
