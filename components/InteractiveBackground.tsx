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
    let time = 0;
    
    interface Point {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      phaseX: number;
      phaseY: number;
      size: number;
      driftSpeed: number;
      amplitude: number;
    }
    
    let points: Point[] = [];
    const mouse = { x: -2000, y: -2000 };
    const mouseRadius = 250; 

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = [];
      
      const spacing = width < 768 ? 60 : 50; 
      
      for(let x = -spacing; x < width + spacing; x += spacing) {
        for(let y = -spacing; y < height + spacing; y += spacing) {
          const randomX = (Math.random() - 0.5) * 20;
          const randomY = (Math.random() - 0.5) * 20;
          const size = 0.5 + Math.random() * 1.0;
          
          points.push({
            x: x + randomX,
            y: y + randomY,
            baseX: x + randomX,
            baseY: y + randomY,
            vx: 0,
            vy: 0,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            size: size,
            driftSpeed: 0.12 + (size * 0.04), 
            amplitude: 12 + Math.random() * 12
          });
        }
      }
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();

    const animate = () => {
      time += 0.003; 
      ctx.clearRect(0, 0, width, height);
      
      points.forEach(point => {
        // 1. Autonomous Wave Movement (The constant "drift")
        const driftX = Math.sin(time * point.driftSpeed + point.phaseX) * point.amplitude;
        const driftY = Math.cos(time * 0.8 * point.driftSpeed + point.phaseY) * point.amplitude;
        
        // This is the ideal position the point wants to be in
        const targetX = point.baseX + driftX;
        const targetY = point.baseY + driftY;

        // 2. Subtle Mouse Displacement (Pushing away, not pulling)
        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          // Push strength based on distance squared for a very soft falloff
          const force = Math.pow((mouseRadius - distance) / mouseRadius, 2);
          const pushX = (dx / distance) * force * 1.2;
          const pushY = (dy / distance) * force * 1.2;

          point.vx += pushX;
          point.vy += pushY;
        }

        // 3. Fluid Physics
        // Spring back to the wave target position
        const springX = (targetX - point.x) * 0.02;
        const springY = (targetY - point.y) * 0.02;
        
        point.vx += springX;
        point.vy += springY;

        // High friction for "water-like" resistance
        point.vx *= 0.93;
        point.vy *= 0.93;

        point.x += point.vx;
        point.y += point.vy;

        // 4. Drawing Logic
        const isNear = distance < 150;
        const pulse = (Math.sin(time * 0.5 + point.phaseX) + 1) * 0.5;
        
        ctx.beginPath();
        if (isNear) {
          // Reactive glow when mouse is hovering
          const reactiveAlpha = (1 - distance / 150) * 0.4;
          ctx.fillStyle = `rgba(6, 182, 212, ${reactiveAlpha + 0.1})`;
          ctx.arc(point.x, point.y, point.size + 0.5, 0, Math.PI * 2);
        } else {
          // Standard breathing background dot
          const opacity = 0.03 + pulse * 0.05;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        }
        ctx.fill();
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
      style={{ opacity: 1 }}
    />
  );
};