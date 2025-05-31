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
  const [direction, setDirection] = useState<"left" | "right">("right");

  const timeRef = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const speed = 0.5;
    const minX = -2.2;
    const maxX = 2.2;

    if (direction === "right") {
      group.position.x += speed * delta;
      if (group.position.x >= maxX) {
        group.position.x = maxX;
        setDirection("left");
      }
    } else {
      group.position.x -= speed * delta;
      if (group.position.x <= minX) {
        group.position.x = minX;
        setDirection("right");
      }
    }

    timeRef.current += delta;

    const bounceHeight = 0.1;
    const bounceSpeed = 2;
    group.position.y = -1 + Math.sin(timeRef.current * bounceSpeed) * bounceHeight;
  });

  return (
    <group ref={groupRef}>
      <RobotModel scale={1.5} position={[0, 0, 0]} />
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
      {/* Disable user interaction */}
      <OrbitControls enabled={false} />
    </Canvas>
  );
}
