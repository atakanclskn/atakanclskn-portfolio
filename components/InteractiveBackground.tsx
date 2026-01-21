
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
    const mouseRadius = 300; 

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      points = [];
      
      const spacing = width < 768 ? 60 : 45; 
      
      for(let x = -spacing; x < width + spacing; x += spacing) {
        for(let y = -spacing; y < height + spacing; y += spacing) {
          const randomX = (Math.random() - 0.5) * 20;
          const randomY = (Math.random() - 0.5) * 20;
          const size = 0.5 + Math.random() * 0.8;
          
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
            driftSpeed: 0.1 + (size * 0.03), 
            amplitude: 10 + Math.random() * 10
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
      time += 0.002; 
      ctx.clearRect(0, 0, width, height);
      
      // Draw Aurora/Fog Effect - subtle global gradient
      const gradient = ctx.createRadialGradient(
        width / 2 + Math.sin(time) * 200, 
        height / 2 + Math.cos(time * 0.5) * 200, 
        0, 
        width / 2, 
        height / 2, 
        width
      );
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.03)'); // Cyan
      gradient.addColorStop(0.5, 'rgba(217, 70, 239, 0.02)'); // Magenta
      gradient.addColorStop(1, 'rgba(5, 5, 5, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      points.forEach(point => {
        const driftX = Math.sin(time * point.driftSpeed + point.phaseX) * point.amplitude;
        const driftY = Math.cos(time * 0.8 * point.driftSpeed + point.phaseY) * point.amplitude;
        const targetX = point.baseX + driftX;
        const targetY = point.baseY + driftY;

        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = Math.pow((mouseRadius - distance) / mouseRadius, 1.5);
          const pushX = (dx / distance) * force * 2;
          const pushY = (dy / distance) * force * 2;
          point.vx += pushX;
          point.vy += pushY;
        }

        point.vx += (targetX - point.x) * 0.015;
        point.vy += (targetY - point.y) * 0.015;
        point.vx *= 0.92;
        point.vy *= 0.92;
        point.x += point.vx;
        point.y += point.vy;

        const pulse = (Math.sin(time * 0.4 + point.phaseX) + 1) * 0.5;
        ctx.beginPath();
        if (distance < 200) {
          const reactiveAlpha = (1 - distance / 200) * 0.3;
          ctx.fillStyle = `rgba(6, 182, 212, ${reactiveAlpha + 0.1})`;
          ctx.arc(point.x, point.y, point.size + 1, 0, Math.PI * 2);
        } else {
          const opacity = 0.02 + pulse * 0.04;
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
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* CSS Ambient Glows - Fixed background for continuity across sections */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/20 dark:bg-primary/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse opacity-50 dark:opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-multiply dark:mix-blend-screen opacity-50 dark:opacity-60" />

        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
        />
    </div>
  );
};
