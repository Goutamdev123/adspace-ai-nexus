import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';

function RobotModel(props: JSX.IntrinsicElements['group']) {
  const { scene, animations } = useGLTF('/robo.glb'); // ✅ updated path
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAnimation = actions[Object.keys(actions)[0]];
      firstAnimation?.play();
    }
  }, [actions, animations]);

  return <primitive object={scene} {...props} />;
}

export default function Robot3D() {
  return (
    <Canvas style={{ width: '100%', height: 400 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <RobotModel scale={1.5} position={[0, -1, 0]} />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
