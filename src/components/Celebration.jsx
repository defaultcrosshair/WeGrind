import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CONFETTI_IMAGES = [
  '/confetti/image-removebg-preview (1).png',
  '/confetti/image-removebg-preview.png',
  '/confetti/pngtree-flying-dollars-rich-png-image_9986934.png'
];

// Generate initial particle properties
const generateConfetti = (count) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    image: CONFETTI_IMAGES[Math.floor(Math.random() * CONFETTI_IMAGES.length)],
    scale: 0.3 + Math.random() * 0.8,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 720
  }));
};

export default function Celebration({ onComplete }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const confettiRef = useRef(null);
  const [particles] = useState(() => generateConfetti(80));

  useEffect(() => {
    // Start playing immediately
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Autoplay prevented:", e));
    }

    // Fade in container
    gsap.to(containerRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power2.inOut"
    });

    // Smooth Confetti Explosion + Rain
    if (confettiRef.current) {
      const pieces = confettiRef.current.children;
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      Array.from(pieces).forEach((piece, index) => {
        const particle = particles[index];
        const tl = gsap.timeline();
        
        // Start from bottom center
        const startX = ww / 2 - 50; // center of screen
        const startY = wh + 100; // slightly below bottom
        
        gsap.set(piece, { 
          x: startX, 
          y: startY, 
          rotation: particle.rotation,
          scale: particle.scale,
          opacity: 1
        });

        // Peak of the explosion (shoot up and spread wide)
        const peakX = startX + (Math.random() - 0.5) * ww * 1.5; 
        const peakY = -100 - Math.random() * (wh * 0.3); // Shoot above the top edge
        
        // End position (drift while falling)
        const endX = peakX + (Math.random() - 0.5) * 300;

        // 1. Explode Upwards (fast and sharp)
        tl.to(piece, {
          x: peakX,
          y: peakY,
          rotation: particle.rotation + particle.rotationSpeed * 0.3,
          duration: 0.8 + Math.random() * 0.5,
          ease: "power4.out" // Strong decel at the top
        })
        // 2. Float back down like rain (slow and smooth)
        .to(piece, {
          x: endX,
          y: wh + 200, // fall past the bottom
          rotation: particle.rotation + particle.rotationSpeed,
          duration: 3 + Math.random() * 3, // Slow drift down
          ease: "sine.inOut" // Smooth falling motion
        });
      });
    }

  }, [particles]);

  const handleVideoEnd = () => {
    // Fade out and cleanup
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 2, 
      ease: "power2.inOut",
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'all',
        overflow: 'hidden'
      }}
    >
      <video
        ref={videoRef}
        onEnded={handleVideoEnd}
        style={{
          maxWidth: '80%',
          maxHeight: '80%',
          borderRadius: 'var(--radius-lg)',
          border: '4px solid #000',
          boxShadow: '8px 8px 0px #000',
          zIndex: 9999 // Base video layer
        }}
        controls={false}
      >
        <source src="/celebration.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Confetti Layer - explicitly rendered AFTER the video for DOM stacking, and with a higher z-index */}
      <div 
        ref={confettiRef} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10005 // Significantly higher than video
        }}
      >
        {particles.map(p => (
          <img 
            key={p.id}
            src={p.image}
            alt="confetti"
            style={{
              position: 'absolute',
              width: '100px', // base size, scaled by GSAP
              transformOrigin: 'center center',
              // filter out glitching artifacts by forcing hardware accel
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          />
        ))}
      </div>
      
      <button 
        onClick={handleVideoEnd}
        className="btn-primary"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          zIndex: 10010
        }}
      >
        Skip
      </button>
    </div>
  );
}
