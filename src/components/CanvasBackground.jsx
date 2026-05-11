import React, { useEffect, useRef } from 'react';

export default function CanvasBackground({ isDarkMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Grid spacing matches the original CSS 24px grid
    const spacing = 24;
    const radius = 1.5;
    // Extremely subtle dot color, adapting to dark mode
    const color = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.15)';
    
    // Magnetic parameters
    const maxDistance = 120; // Radius of magnetic effect
    const pullStrength = 0.4; // How strongly it pulls towards cursor
    
    let mouse = { x: -1000, y: -1000 };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    let dots = [];
    
    const initGrid = () => {
      dots = [];
      for (let x = 0; x <= width + spacing; x += spacing) {
        for (let y = 0; y <= height + spacing; y += spacing) {
          dots.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y
          });
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    initGrid();

    let animationFrameId;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Calculate distance to mouse
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (dist < maxDistance) {
          // Magnet effect: pull towards mouse
          const force = (maxDistance - dist) / maxDistance;
          targetX = dot.baseX + (dx * force * pullStrength);
          targetY = dot.baseY + (dy * force * pullStrength);
        }

        // Spring physics to move towards target smoothly
        dot.x += (targetX - dot.x) * 0.15;
        dot.y += (targetY - dot.y) * 0.15;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, 
        pointerEvents: 'none' 
      }}
    />
  );
}
