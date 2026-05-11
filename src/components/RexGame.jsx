import React, { useEffect, useRef, useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import gsap from 'gsap';

export default function RexGame({ onClose }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Pop in animation
    gsap.fromTo(containerRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" }
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set fixed internal resolution, scale up with CSS
    const width = 800;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    // Game Variables
    const groundY = height - 40;
    let frame = 0;
    let scoreCounter = 0;
    let isGameOver = false;
    let gameSpeed = 6;
    let animationId;

    // Player (Doodle T-Rex)
    const player = {
      x: 50,
      y: groundY - 40, // Base height
      width: 30,
      height: 40,
      dy: 0,
      gravity: 0.6,
      jumpPower: -11,
      isGrounded: true
    };

    // Obstacles
    let obstacles = [];

    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'ArrowUp') && player.isGrounded && !isGameOver) {
        player.dy = player.jumpPower;
        player.isGrounded = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const drawDino = (p) => {
      ctx.fillStyle = '#34A853'; // Google Green
      
      // Main Body
      ctx.fillRect(p.x, p.y, p.width, p.height);
      
      // Snout
      ctx.fillRect(p.x + 15, p.y - 15, 30, 25);
      
      // Eye
      ctx.fillStyle = 'white';
      ctx.fillRect(p.x + 30, p.y - 10, 5, 5);
      
      // Tail
      ctx.fillStyle = '#34A853';
      ctx.fillRect(p.x - 15, p.y + 10, 15, 10);

      // Legs (animate if grounded)
      const legOffset = (player.isGrounded && frame % 10 < 5) ? 4 : 0;
      ctx.fillRect(p.x + 5, p.y + p.height, 8, 12 - legOffset);
      ctx.fillRect(p.x + 18, p.y + p.height, 8, 12 + legOffset);
    };

    const drawCactus = (obs) => {
      ctx.fillStyle = '#202124'; // Dark Doodle color
      // Main trunk
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      // Left arm
      ctx.fillRect(obs.x - 10, obs.y + 10, 10, obs.height - 25);
      ctx.fillRect(obs.x - 10, obs.y + 10, 5, 5);
      // Right arm
      ctx.fillRect(obs.x + obs.width, obs.y + 20, 10, obs.height - 35);
      ctx.fillRect(obs.x + obs.width + 5, obs.y + 20, 5, 5);
    };

    const loop = () => {
      if (isGameOver) return;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw Ground Line
      ctx.fillStyle = '#202124';
      ctx.fillRect(0, groundY + 12, width, 4);

      // Apply Physics
      player.dy += player.gravity;
      player.y += player.dy;

      if (player.y >= groundY - 40) {
        player.y = groundY - 40;
        player.dy = 0;
        player.isGrounded = true;
      }

      // Draw Player
      drawDino(player);

      // Spawn Obstacles
      if (frame % Math.max(60, Math.floor(120 - gameSpeed * 5)) === 0) {
        const heightChoice = Math.random() > 0.5 ? 40 : 55;
        obstacles.push({
          x: width,
          y: groundY + 12 - heightChoice,
          width: 15,
          height: heightChoice
        });
      }

      // Update & Draw Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        let obs = obstacles[i];
        obs.x -= gameSpeed;

        drawCactus(obs);

        // AABB Collision Detection (adjusted hitboxes for the doodle shapes)
        const hitX = player.x + 15 < obs.x + obs.width && player.x + player.width > obs.x - 10;
        const hitY = player.y - 15 < obs.y + obs.height && player.y + player.height + 12 > obs.y;

        if (hitX && hitY) {
          isGameOver = true;
          setGameOver(true);
        }

        // Remove offscreen obstacles
        if (obs.x + obs.width < 0) {
          obstacles.splice(i, 1);
        }
      }

      // Update Score & Speed
      frame++;
      if (frame % 5 === 0) {
        scoreCounter++;
        setScore(scoreCounter);
      }
      
      // Gradually increase speed
      if (frame % 300 === 0 && gameSpeed < 15) {
        gameSpeed += 0.5;
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver]); // Restart loop when gameOver changes from true to false

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(4px)',
      zIndex: 99999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div 
        ref={containerRef}
        className="doodle-panel" 
        style={{ 
          position: 'relative',
          padding: '2rem', 
          background: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <button 
          onClick={onClose}
          className="btn-icon"
          style={{ position: 'absolute', top: '-15px', right: '-15px', width: '36px', height: '36px', background: 'var(--google-red)', color: 'white' }}
        >
          <X size={20} strokeWidth={3} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 1rem' }}>
          <h2 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🦖</span> Dino Run
          </h2>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: '800', 
            fontFamily: 'Outfit',
            color: 'var(--text-primary)'
          }}>
            {String(score).padStart(5, '0')}
          </div>
        </div>

        <canvas 
          ref={canvasRef}
          style={{
            border: '4px solid var(--border-dark)',
            boxShadow: '4px 4px 0px var(--border-dark)',
            borderRadius: 'var(--radius-sm)',
            width: '100%',
            maxWidth: '800px',
            background: 'var(--bg-secondary)',
            imageRendering: 'pixelated'
          }}
        />

        <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
          Press <kbd style={{ background: '#eee', padding: '0.2rem 0.5rem', border: '2px solid var(--border-dark)', borderRadius: '4px', color: '#000' }}>Space</kbd> to jump
        </div>

        {gameOver && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(255,255,255,0.7)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--google-red)', textShadow: '2px 2px 0px #000', WebkitTextStroke: '1px #000' }}>GAME OVER</h1>
            <button className="btn-primary" onClick={restartGame} style={{ marginTop: '1rem', background: 'var(--google-blue)' }}>
              <RotateCcw size={20} /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
