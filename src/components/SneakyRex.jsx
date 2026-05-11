import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import RexGame from './RexGame';

export default function SneakyRex() {
  const [isPlaying, setIsPlaying] = useState(false);
  const rexRef = useRef(null);

  useEffect(() => {
    // Sneaky idle animation
    if (rexRef.current) {
      gsap.to(rexRef.current, {
        y: 15, // Peek out a little
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        repeatDelay: Math.random() * 5 + 2 // Wait a random amount of time between peeks
      });
    }
  }, []);

  const handleRexClick = () => {
    // Pop out animation
    gsap.killTweensOf(rexRef.current);
    gsap.to(rexRef.current, {
      y: 40,
      duration: 0.2,
      ease: "back.out(2)",
      onComplete: () => setIsPlaying(true)
    });
  };

  const handleClose = () => {
    setIsPlaying(false);
    // Go back to hiding
    gsap.to(rexRef.current, {
      y: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        // Restart idle animation
        gsap.to(rexRef.current, {
          y: 15,
          duration: 2,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: Math.random() * 5 + 2
        });
      }
    });
  };

  return (
    <>
      <div 
        ref={rexRef}
        onClick={handleRexClick}
        style={{
          position: 'fixed',
          top: '-30px', // Hidden by default
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50px',
          height: '40px',
          backgroundColor: 'var(--google-green)',
          border: '3px solid var(--border-dark)',
          borderTop: 'none',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          zIndex: 9998, // Below game overlay
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '4px 4px 0px var(--border-dark)'
        }}
        onMouseEnter={(e) => {
          if(!isPlaying) {
             gsap.to(e.currentTarget, { y: 25, duration: 0.3, ease: "back.out(2)" });
          }
        }}
        onMouseLeave={(e) => {
          if(!isPlaying) {
             gsap.to(e.currentTarget, { y: 15, duration: 0.3 });
          }
        }}
      >
        {/* Sneaky Eyes */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <div style={{ width: '8px', height: '8px', background: 'white', border: '2px solid black' }}></div>
          <div style={{ width: '8px', height: '8px', background: 'white', border: '2px solid black' }}></div>
        </div>
      </div>

      {isPlaying && <RexGame onClose={handleClose} />}
    </>
  );
}
