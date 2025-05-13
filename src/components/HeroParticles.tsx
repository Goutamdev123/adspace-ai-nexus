
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
}

const HeroParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Define vibrant color palette
    const colors = [
      'rgba(125, 90, 255, 0.8)',  // Vibrant Purple
      'rgba(255, 105, 180, 0.7)', // Hot Pink
      'rgba(0, 191, 255, 0.6)',   // Deep Sky Blue
      'rgba(50, 205, 50, 0.5)',   // Lime Green
      'rgba(255, 165, 0, 0.6)',   // Orange
      'rgba(255, 255, 255, 0.7)', // White glow
    ];

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        size: Math.random() * 8 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.6 + 0.4,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.005
        }
      });
    }

    // Create connection lines between nearby particles
    const drawConnections = (particles: Particle[]) => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Draw a particle with a glowing effect
    const drawParticle = (particle: Particle) => {
      const { x, y, size, color, opacity } = particle;
      
      // Create a glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
      gradient.addColorStop(0, color.replace(/[\d.]+\)$/g, `${opacity})`));
      gradient.addColorStop(1, color.replace(/[\d.]+\)$/g, '0)'));
      
      ctx.beginPath();
      ctx.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Add a bright center
      ctx.beginPath();
      ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
      ctx.fill();
    };

    // Animation loop
    let animationFrame: number;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Track mouse position for interactivity
    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Touch support for mobile
    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    });

    const animate = () => {
      // Create a semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(10, 15, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        // Move toward mouse position slightly
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Subtle attraction to mouse
        if (distance < 400) {
          particle.x += (dx / distance) * (particle.speed * 0.5);
          particle.y += (dy / distance) * (particle.speed * 0.5);
        }
        
        // Add some natural movement with sine waves
        particle.x += Math.sin(Date.now() * 0.001 + particle.z * 0.01) * particle.speed;
        particle.y += Math.cos(Date.now() * 0.001 + particle.z * 0.01) * particle.speed;
        
        // Boundary check with wrapping
        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;
        
        // Draw the particle
        drawParticle(particle);
      });

      // Draw connections between nearby particles
      drawConnections(particles);
      
      // Add occasional glow burst effect
      if (Math.random() < 0.02) {
        const burstX = Math.random() * canvas.width;
        const burstY = Math.random() * canvas.height;
        const burstSize = Math.random() * 100 + 50;
        const burstGradient = ctx.createRadialGradient(
          burstX, burstY, 0, burstX, burstY, burstSize
        );
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        burstGradient.addColorStop(0, randomColor.replace(/[\d.]+\)$/g, '0.5)'));
        burstGradient.addColorStop(1, randomColor.replace(/[\d.]+\)$/g, '0)'));
        ctx.beginPath();
        ctx.arc(burstX, burstY, burstSize, 0, Math.PI * 2);
        ctx.fillStyle = burstGradient;
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

export default HeroParticles;
