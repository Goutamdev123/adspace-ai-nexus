
import React, { useEffect, useRef } from 'react';

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full width/height
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Create a more vibrant color palette
    const colors = [
      'rgba(125, 90, 255, 0.8)',  // Vibrant Purple
      'rgba(255, 105, 180, 0.7)', // Hot Pink
      'rgba(0, 191, 255, 0.6)',   // Deep Sky Blue
      'rgba(50, 205, 50, 0.5)',   // Lime Green
      'rgba(255, 165, 0, 0.6)',   // Orange
    ];

    // 3D Cube parameters
    interface Cube {
      x: number;
      y: number;
      z: number;
      size: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      rotationSpeed: {x: number, y: number, z: number};
      color: string;
    }

    // Create 3D cubes
    const cubeCount = 15;
    const cubes: Cube[] = [];
    
    for (let i = 0; i < cubeCount; i++) {
      cubes.push({
        x: (Math.random() - 0.5) * canvas.width * 1.5,
        y: (Math.random() - 0.5) * canvas.height * 1.5,
        z: Math.random() * 3000 + 500,
        size: Math.random() * 150 + 50,
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.005
        },
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Create floating light orbs
    interface Orb {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
    }

    const orbCount = 40;
    const orbs: Orb[] = [];

    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1500 + 500,
        radius: Math.random() * 15 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.4
      });
    }

    // Function to draw a 3D cube with perspective
    const drawCube = (cube: Cube) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Apply perspective - objects get larger as they come closer
      const scale = 2000 / cube.z;
      const size = cube.size * scale;

      // Apply rotations
      const rotatePoint = (x: number, y: number, z: number, rx: number, ry: number, rz: number) => {
        // Rotate around X axis
        let y1 = y * Math.cos(rx) - z * Math.sin(rx);
        let z1 = y * Math.sin(rx) + z * Math.cos(rx);
        
        // Rotate around Y axis
        let x1 = x * Math.cos(ry) + z1 * Math.sin(ry);
        let z2 = -x * Math.sin(ry) + z1 * Math.cos(ry);
        
        // Rotate around Z axis
        let x2 = x1 * Math.cos(rz) - y1 * Math.sin(rz);
        let y2 = x1 * Math.sin(rz) + y1 * Math.cos(rz);
        
        return { x: x2, y: y2, z: z2 };
      };

      // Define vertices of cube (relative to center)
      const halfSize = cube.size / 2;
      const vertices = [
        { x: -halfSize, y: -halfSize, z: -halfSize },
        { x: halfSize, y: -halfSize, z: -halfSize },
        { x: halfSize, y: halfSize, z: -halfSize },
        { x: -halfSize, y: halfSize, z: -halfSize },
        { x: -halfSize, y: -halfSize, z: halfSize },
        { x: halfSize, y: -halfSize, z: halfSize },
        { x: halfSize, y: halfSize, z: halfSize },
        { x: -halfSize, y: halfSize, z: halfSize }
      ];

      // Rotate vertices
      const rotatedVertices = vertices.map(v => 
        rotatePoint(v.x, v.y, v.z, cube.rotationX, cube.rotationY, cube.rotationZ)
      );

      // Apply perspective to vertices
      const projectedVertices = rotatedVertices.map(v => {
        const vx = v.x + cube.x;
        const vy = v.y + cube.y;
        const vz = v.z + cube.z;
        
        const perspective = 2000 / (2000 + vz);
        return {
          x: (vx * perspective) + centerX,
          y: (vy * perspective) + centerY,
          z: vz,
          perspective
        };
      });

      // Define edges (vertex pairs)
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0],
        [4, 5], [5, 6], [6, 7], [7, 4],
        [0, 4], [1, 5], [2, 6], [3, 7]
      ];

      // Draw edges
      edges.forEach(edge => {
        const v1 = projectedVertices[edge[0]];
        const v2 = projectedVertices[edge[1]];
        
        // Calculate edge opacity based on z distance
        const avgZ = (v1.z + v2.z) / 2;
        const opacity = Math.max(0, Math.min(1, (3000 - avgZ) / 3000));
        
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineWidth = 2 * Math.max(v1.perspective, v2.perspective);
        
        // Fix the rgba color format - only use one opacity value
        const baseColor = cube.color.substring(0, cube.color.lastIndexOf(','));
        ctx.strokeStyle = `${baseColor}, ${opacity})`;
        ctx.stroke();
      });

      // Draw face highlights
      const faces = [
        [0, 1, 2, 3], // front
        [4, 5, 6, 7], // back
        [0, 3, 7, 4], // left
        [1, 2, 6, 5], // right
        [0, 1, 5, 4], // top
        [3, 2, 6, 7]  // bottom
      ];

      faces.forEach(face => {
        const v1 = projectedVertices[face[0]];
        const v2 = projectedVertices[face[1]];
        const v3 = projectedVertices[face[2]];
        const v4 = projectedVertices[face[3]];
        
        // Calculate face depth for opacity
        const avgZ = (v1.z + v2.z + v3.z + v4.z) / 4;
        const opacity = Math.max(0, Math.min(0.3, (3000 - avgZ) / 10000));
        
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.lineTo(v3.x, v3.y);
        ctx.lineTo(v4.x, v4.y);
        ctx.closePath();
        
        // Fix the rgba color format - only use one opacity value
        const baseColor = cube.color.substring(0, cube.color.lastIndexOf(','));
        ctx.fillStyle = `${baseColor}, ${opacity})`;
        ctx.fill();
      });
    };

    // Draw light orb
    const drawOrb = (orb: Orb) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Apply perspective
      const scale = 2000 / orb.z;
      const radius = orb.radius * scale;
      const perspectiveX = (orb.x - centerX) * scale + centerX;
      const perspectiveY = (orb.y - centerY) * scale + centerY;
      
      // Calculate opacity based on z distance
      const opacity = orb.opacity * Math.max(0.2, Math.min(1, (2000 - orb.z) / 2000));
      
      // Draw glow effect
      const gradient = ctx.createRadialGradient(
        perspectiveX, perspectiveY, 0,
        perspectiveX, perspectiveY, radius * 2
      );
      
      // Fix the rgba color format - only use one opacity value
      const baseColor = orb.color.substring(0, orb.color.lastIndexOf(','));
      gradient.addColorStop(0, `${baseColor}, ${opacity})`);
      gradient.addColorStop(0.5, `${baseColor}, ${opacity * 0.5})`);
      gradient.addColorStop(1, `${baseColor}, 0)`);
      
      ctx.beginPath();
      ctx.arc(perspectiveX, perspectiveY, radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw core
      ctx.beginPath();
      ctx.arc(perspectiveX, perspectiveY, radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.fill();
    };

    // Animation
    let animationFrame: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw a subtle gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(10, 15, 30, 1)');
      bgGradient.addColorStop(1, 'rgba(30, 20, 60, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw cubes
      cubes.forEach(cube => {
        // Update rotation
        cube.rotationX += cube.rotationSpeed.x;
        cube.rotationY += cube.rotationSpeed.y;
        cube.rotationZ += cube.rotationSpeed.z;
        
        // Slow drift of position
        cube.x += Math.sin(time + cubes.indexOf(cube)) * 0.5;
        cube.y += Math.cos(time * 0.7 + cubes.indexOf(cube)) * 0.5;
        
        // Draw the cube
        drawCube(cube);
      });

      // Update and draw orbs
      orbs.forEach(orb => {
        // Move orbs
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        
        // Bounce off edges with some padding
        const padding = orb.radius * 4;
        if (orb.x < padding || orb.x > canvas.width - padding) {
          orb.speedX *= -1;
        }
        if (orb.y < padding || orb.y > canvas.height - padding) {
          orb.speedY *= -1;
        }
        
        // Fluctuating z position for depth changes
        orb.z = orb.z + Math.sin(time + orbs.indexOf(orb)) * 5;
        
        // Draw the orb
        drawOrb(orb);
      });

      // Occasional lens flare effect
      if (Math.random() > 0.995) {
        const flareX = Math.random() * canvas.width;
        const flareY = Math.random() * (canvas.height * 0.7);
        const flareSize = Math.random() * 200 + 100;
        
        const flareGradient = ctx.createRadialGradient(
          flareX, flareY, 0, 
          flareX, flareY, flareSize
        );
        flareGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        flareGradient.addColorStop(0.2, 'rgba(150, 150, 255, 0.4)');
        flareGradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(flareX, flareY, flareSize, 0, Math.PI * 2);
        ctx.fillStyle = flareGradient;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    />
  );
};

export default HeroBackground;
