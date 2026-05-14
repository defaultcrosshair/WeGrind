import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import SpaceShooter from './SpaceShooter';

export default function SneakyAlien({ isDarkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const alienRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!leftPupilRef.current || !rightPupilRef.current) return;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Proximity for Tooltip
      const rect = leftPupilRef.current.getBoundingClientRect();
      const dist = Math.hypot(mouseX - (rect.left + rect.width/2), mouseY - (rect.top + rect.height/2));
      setIsHovered(dist < 150);

      const movePupil = (pupilRef) => {
        const pupilRect = pupilRef.getBoundingClientRect();
        const eyeCenterX = pupilRect.left + pupilRect.width / 2;
        const eyeCenterY = pupilRect.top + pupilRect.height / 2;
        
        let angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        const maxDist = 6; 
        
        gsap.to(pupilRef, {
          x: Math.cos(angle) * maxDist,
          y: Math.sin(angle) * maxDist,
          duration: 0.1
        });
      };

      movePupil(leftPupilRef.current);
      movePupil(rightPupilRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Hover animation effect
  useEffect(() => {
    if (alienRef.current && !isPlaying) {
      gsap.to(alienRef.current, { y: isHovered ? 6 : 0, duration: 0.3, ease: isHovered ? "back.out(2)" : "power2.out" });
    }
  }, [isHovered, isPlaying]);

  // Random blink effect
  useEffect(() => {
    if (!alienRef.current) return;
    const eyes = alienRef.current.querySelectorAll('.alien-eye');
    let timeoutId;
    let blinkTween;

    // Ensure eyes start fully open (fixes squished eyes on revisit)
    gsap.set(eyes, { scaleY: 1 });
    
    const blink = () => {
      // Fast open and close blink
      blinkTween = gsap.to(eyes, { scaleY: 0.1, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => {
        // Guarantee eyes are fully open after blink completes
        gsap.set(eyes, { scaleY: 1 });
      }});
      
      const nextBlink = Math.random() * 4000 + 2000; 
      timeoutId = setTimeout(blink, nextBlink);
    };
    
    timeoutId = setTimeout(blink, 3000);
    return () => {
      clearTimeout(timeoutId);
      if (blinkTween) blinkTween.kill();
      // Reset eyes to fully open on unmount
      gsap.set(eyes, { scaleY: 1 });
    };
  }, []);

  return (
    <>
      <div 
        className="hide-on-mobile"
        ref={alienRef}
        onClick={() => setIsPlaying(true)}
        style={{
          position: 'fixed',
          top: '-20px', 
          left: '70%', 
          transform: 'translateX(-50%)',
          width: '85px',
          height: '95px',
          backgroundColor: 'var(--google-green)',
          border: '3px solid var(--border-dark)',
          borderTop: 'none',
          borderBottomLeftRadius: '45px',
          borderBottomRightRadius: '45px',
          zIndex: 9998,
          cursor: 'pointer',
          boxShadow: '4px 4px 0px var(--border-dark)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '28px'
        }}
      >
        {/* Upside-down Smile (Chin area, near ceiling) */}
        <div style={{
           width: '12px', height: '6px', 
           borderTop: '3px solid var(--border-dark)', 
           borderRadius: '10px 10px 0 0',
           marginBottom: '10px'
        }} />

        {/* Round Alien Eyes */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="alien-eye" style={{ width: '28px', height: '28px', background: 'white', borderRadius: '50%', position: 'relative', overflow: 'hidden', border: '2px solid var(--border-dark)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div ref={leftPupilRef} style={{ width: '12px', height: '12px', background: 'var(--border-dark)', borderRadius: '50%', position: 'relative' }}>
                <div style={{ width: '4px', height: '4px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }} />
             </div>
          </div>
          <div className="alien-eye" style={{ width: '28px', height: '28px', background: 'white', borderRadius: '50%', position: 'relative', overflow: 'hidden', border: '2px solid var(--border-dark)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <div ref={rightPupilRef} style={{ width: '12px', height: '12px', background: 'var(--border-dark)', borderRadius: '50%', position: 'relative' }}>
                <div style={{ width: '4px', height: '4px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }} />
             </div>
          </div>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        top: '60px',
        left: '70%',
        transform: 'translateX(-50%)',
        background: 'var(--bg-secondary)',
        color: 'var(--text-primary)',
        padding: '6px 12px',
        borderRadius: '8px',
        border: '2px solid var(--border-dark)',
        fontFamily: 'Outfit',
        fontSize: '12px',
        fontWeight: 'bold',
        opacity: isHovered && !isPlaying ? 1 : 0,
        pointerEvents: 'none',
        transition: 'opacity 0.2s',
        zIndex: 9999,
        whiteSpace: 'nowrap',
        boxShadow: '4px 4px 0px rgba(0,0,0,0.1)'
      }}>
        Click on me to launch game!
      </div>

      {isPlaying && <SpaceShooter onClose={() => setIsPlaying(false)} />}
    </>
  );
}
