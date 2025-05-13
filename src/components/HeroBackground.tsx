
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

    // Particle system
    interface Particle {
      x: number;
      y: number;
      z: number;
      prevZ: number;
      size: number;
      color: string;
      speed: number;
      angle: number;
    }

    // Create particles
    const particleCount = 500;
    const particles: Particle[] = [];
    
    const colors = [
      'rgba(100, 120, 255, 0.7)',  // Blue
      'rgba(120, 100, 255, 0.6)',  // Purple
      'rgba(100, 255, 200, 0.5)',  // Teal
      'rgba(255, 100, 150, 0.4)',  // Pink
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1500 + 500,
        prevZ: 0,
        size: Math.random() * 5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.8 + 0.2,
        angle: Math.random() * Math.PI * 2
      });
    }

    // Connection lines
    const connectionDistance = 150;
    
    // Animation
    let animationFrame: number;
    let time = 0;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Draw particles
      particles.forEach((p, i) => {
        // Update position - 3D effect with perspective
        p.prevZ = p.z;
        p.z -= p.speed;

        // Reset when particle goes beyond the screen
        if (p.z <= 0) {
          p.z = 2000;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.prevZ = p.z;
        }

        // Apply perspective - objects get larger as they come closer
        const scale = 2000 / p.z;
        const perspectiveX = (p.x - centerX) * scale + centerX;
        const perspectiveY = (p.y - centerY) * scale + centerY;
        
        // Move particles in a slow wave pattern
        const sizeScale = scale * p.size;
        const waveX = Math.sin(time + i * 0.1) * 20;
        const waveY = Math.cos(time + i * 0.1) * 20;

        // Draw particle
        ctx.beginPath();
        ctx.arc(
          perspectiveX + waveX, 
          perspectiveY + waveY, 
          Math.max(0.5, sizeScale), 
          0, 
          Math.PI * 2
        );
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connection lines (for particles close enough)
        particles.slice(i + 1).forEach(p2 => {
          const scale2 = 2000 / p2.z;
          const p2x = (p2.x - centerX) * scale2 + centerX + Math.sin(time + i * 0.1) * 20;
          const p2y = (p2.y - centerY) * scale2 + centerY + Math.cos(time + i * 0.1) * 20;
          
          const dx = perspectiveX + waveX - p2x;
          const dy = perspectiveY + waveY - p2y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance && p.z < 1500 && p2.z < 1500) {
            ctx.beginPath();
            ctx.moveTo(perspectiveX + waveX, perspectiveY + waveY);
            ctx.lineTo(p2x, p2y);
            
            // Opacity based on distance
            const opacity = (1 - dist / connectionDistance) * 0.3;
            ctx.strokeStyle = `rgba(180, 180, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw occasional light flares
      if (Math.random() > 0.99) {
        const flareX = Math.random() * canvas.width;
        const flareY = Math.random() * canvas.height;
        const radius = Math.random() * 100 + 50;
        
        const gradient = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.2, 'rgba(180, 220, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(flareX, flareY, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
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
    />
  );
};

export default HeroBackground;
