import React, { useEffect, useRef } from 'react';

export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Store particles
    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
    }
    
    let points: Point[] = [];
    const mouse = { x: -1000, y: -1000 };
    const connectionDistance = 100;
    const mouseRadius = 200;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = [];
      
      // Grid density based on screen size
      const spacing = width < 768 ? 60 : 40; 
      
      for(let x = 0; x < width + spacing; x += spacing) {
        for(let y = 0; y < height + spacing; y += spacing) {
          // Add some randomness to initial position
          const randomX = (Math.random() - 0.5) * 20;
          const randomY = (Math.random() - 0.5) * 20;
          
          points.push({
            x: x + randomX,
            y: y + randomY,
            baseX: x + randomX,
            baseY: y + randomY,
            vx: 0,
            vy: 0
          });
        }
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      points.forEach(point => {
        // Mouse interaction physics
        const dx = mouse.x - point.x;
        const dy = mouse.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move points away from mouse (Repulsion effect)
        // or Towards mouse (Attraction). Let's do a slight magnetic pull.
        
        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouseRadius - distance) / mouseRadius;
          const directionX = forceDirectionX * force * 5; // Strength
          const directionY = forceDirectionY * force * 5;

          // Pull slightly towards mouse
          point.vx += directionX * 0.5;
          point.vy += directionY * 0.5;
        }

        // Spring back to base
        const baseDx = point.baseX - point.x;
        const baseDy = point.baseY - point.y;
        point.vx += baseDx * 0.05;
        point.vy += baseDy * 0.05;

        // Friction
        point.vx *= 0.85;
        point.vy *= 0.85;

        point.x += point.vx;
        point.y += point.vy;

        // Draw Point
        const active = distance < mouseRadius;
        
        // Visuals
        ctx.beginPath();
        if (active) {
          ctx.fillStyle = `rgba(6, 182, 212, ${1 - distance/mouseRadius})`; // Cyan glow
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'; // Faint inactive
          ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        }
        ctx.fill();

        // Connect to mouse if very close
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.2 * (1 - distance/100)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};