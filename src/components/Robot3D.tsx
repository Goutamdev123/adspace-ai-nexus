// src/components/Robot3D.tsx

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";

function RobotModel(props: JSX.IntrinsicElements["group"]) {
  const { scene, animations } = useGLTF("/robo.glb"); // Ensure public/robo.glb exists
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction?.reset().play(); // reset ensures animation starts from beginning
    }
  }, [actions, animations]);

  return <primitive object={scene} {...props} />;
}

// Preload GLTF once to avoid loading lag
useGLTF.preload("/robo.glb");

export default function Robot3D() {
  return (
    <Canvas style={{ width: "100%", height: 400 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Suspense fallback={null}>
        <RobotModel scale={1.5} position={[0, -1, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
