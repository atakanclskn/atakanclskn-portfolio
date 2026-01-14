
import React, { useEffect, useRef } from 'react';

interface InteractiveTextProps {
  text: string;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({ text }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Setup font for measuring
      const fontSize = Math.min(width / (text.length * 0.7), 180);
      ctx.font = `bold ${fontSize}px Space Grotesk`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Measure text to center it
      const metrics = ctx.measureText(text);
      const textX = width / 2;
      const textY = height / 2;

      // Draw vertical scanlines that react to mouse
      const step = 4; // Width of each scanline segment
      const textWidth = metrics.width;
      const startX = textX - textWidth / 2;
      
      // Temporary canvas to draw the text mask
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext('2d')!;
      octx.font = ctx.font;
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.fillStyle = 'white';
      octx.fillText(text, textX, textY);

      const imageData = octx.getImageData(0, 0, width, height).data;

      for (let x = startX; x < startX + textWidth; x += step) {
        // Calculate vertical "stretch" based on mouse proximity
        const dx = x - mouse.current.x;
        const dy = textY - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 300);
        
        // Scan each pixel vertically in this column
        for (let y = 0; y < height; y += 6) {
          const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
          
          if (imageData[idx + 3] > 128) { // If pixel is part of text
            const offset = influence * 60 * Math.sin(time * 0.002 + x * 0.01);
            const stretchY = y + (y - mouse.current.y) * influence * 0.8;
            
            // Vibrant Cyberpunk Colors (Cyan to Magenta to Orange)
            const hue = (x / width) * 60 + (time * 0.02) % 360;
            const colorPos = (x - startX) / textWidth;
            
            let color = '#06b6d4'; // Default cyan
            if (colorPos > 0.3) color = '#d946ef'; // Magenta
            if (colorPos > 0.7) color = '#f59e0b'; // Amber/Orange
            
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.6 + influence * 0.4;
            
            // Draw the "block" or "scanline" segment
            const h = 4 + influence * 20;
            ctx.fillRect(x, stretchY - h/2, step - 1, h);
            
            // Add a glow effect for the active parts
            if (influence > 0.4) {
              ctx.shadowBlur = 15 * influence;
              ctx.shadowColor = color;
            } else {
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text]);

  return (
    <div className="w-full h-full min-h-[400px] relative cursor-none">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Visual Cursor Replacement */}
      <div 
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none mix-blend-difference z-[200] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          left: 'var(--m-x)',
          top: 'var(--m-y)',
        }}
      />
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('mousemove', (e) => {
          document.documentElement.style.setProperty('--m-x', e.clientX + 'px');
          document.documentElement.style.setProperty('--m-y', e.clientY + 'px');
        });
      `}} />
    </div>
  );
};
