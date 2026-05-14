import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw } from 'lucide-react';

export default function SpaceShooter({ onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  
  const requestRef = useRef();
  const audioCtxRef = useRef(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('spaceShooterHighScore');
    if (saved) setHighScore(parseInt(saved, 10));
  }, []);

  // Audio Engine
  const startAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.05; // Quiet volume
    masterGain.connect(ctx.destination);
    
    const notes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63]; // C4, E4, G4, C5, G4, E4
    let noteIndex = 0;
    
    const playNextNote = () => {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
      
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = notes[noteIndex];
      
      const env = ctx.createGain();
      env.gain.setValueAtTime(0.2, ctx.currentTime);
      env.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.connect(env);
      env.connect(masterGain);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      
      noteIndex = (noteIndex + 1) % notes.length;
      
      setTimeout(playNextNote, 150);
    };
    
    playNextNote();
  };

  const stopAudio = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  // Game Engine
  useEffect(() => {
    if (isGameOver) {
      stopAudio();
      return; 
    }

    startAudio();

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = 500;
    canvas.height = 700;

    const keys = { left: false, right: false, space: false };
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
      if (e.key === ' ' && !isGameOver) {
        keys.space = true;
        e.preventDefault();
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
      if (e.key === ' ') keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game state
    let player = {
      x: canvas.width / 2,
      y: canvas.height - 80,
      width: 50,
      height: 30,
      speed: 12 // Fast UFO
    };

    let bullets = [];
    let enemies = [];
    let lastShotTime = 0;
    let frames = 0;
    let currentScore = 0;
    let gameOver = false;

    // Stars
    let stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      });
    }

    const drawPlayer = () => {
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff'; 
      
      // Glass Dome
      ctx.fillStyle = '#8ab4f8'; 
      ctx.beginPath();
      ctx.arc(0, 0, 15, Math.PI, 0); 
      ctx.fill();
      ctx.stroke();

      // Little Alien in dome
      ctx.fillStyle = '#34a853'; 
      ctx.beginPath();
      ctx.arc(0, -5, 6, 0, Math.PI*2);
      ctx.fill();
      
      // UFO Base
      ctx.fillStyle = '#e8eaed'; 
      ctx.beginPath();
      ctx.ellipse(0, 5, 25, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      // Lights
      const flash = (frames % 20 < 10);
      ctx.fillStyle = flash ? '#ea4335' : '#555'; 
      ctx.beginPath(); ctx.arc(-15, 5, 2, 0, Math.PI*2); ctx.fill();
      
      ctx.fillStyle = !flash ? '#fbbc04' : '#555'; 
      ctx.beginPath(); ctx.arc(0, 7, 2, 0, Math.PI*2); ctx.fill();
      
      ctx.fillStyle = flash ? '#34a853' : '#555'; 
      ctx.beginPath(); ctx.arc(15, 5, 2, 0, Math.PI*2); ctx.fill();

      // Thruster
      if (keys.left || keys.right) {
        ctx.fillStyle = '#4285f4';
        ctx.beginPath();
        ctx.moveTo(-10, 13);
        ctx.lineTo(10, 13);
        ctx.lineTo(0, 25);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const drawEnemy = (enemy) => {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(frames * 0.02 * (enemy.speedX > 0 ? 1 : -1));

      ctx.fillStyle = '#9aa0a6'; 
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const offset = Math.sin(angle * 3 + enemy.radius) * 4;
        const r = enemy.radius + offset;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Craters
      ctx.fillStyle = '#5f6368';
      ctx.beginPath();
      ctx.arc(-enemy.radius/3, -enemy.radius/4, enemy.radius/5, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(enemy.radius/3, enemy.radius/3, enemy.radius/6, 0, Math.PI*2);
      ctx.fill();

      ctx.restore();
    };

    const loop = () => {
      if (gameOver) return;
      frames++;

      // Deep space background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Stars
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI*2);
        ctx.fill();
      });

      // Player Movement
      if (keys.left) player.x -= player.speed;
      if (keys.right) player.x += player.speed;
      
      // Boundaries
      if (player.x < 30) player.x = 30;
      if (player.x > canvas.width - 30) player.x = canvas.width - 30;

      // Shooting
      if (keys.space && frames - lastShotTime > 12) {
        bullets.push({ x: player.x, y: player.y - 20, width: 4, height: 15, speed: 15 });
        lastShotTime = frames;
        
        // Shoot sound beep
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          const osc = audioCtxRef.current.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(880, audioCtxRef.current.currentTime);
          osc.frequency.exponentialRampToValueAtTime(110, audioCtxRef.current.currentTime + 0.1);
          
          const env = audioCtxRef.current.createGain();
          env.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
          env.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.1);
          
          osc.connect(env);
          env.connect(audioCtxRef.current.destination);
          osc.start();
          osc.stop(audioCtxRef.current.currentTime + 0.1);
        }
      }

      // Update & Draw Bullets
      ctx.fillStyle = '#ea4335';
      for (let i = bullets.length - 1; i >= 0; i--) {
        let b = bullets[i];
        b.y -= b.speed;
        ctx.fillRect(b.x - b.width/2, b.y, b.width, b.height);
        
        if (b.y < -20) bullets.splice(i, 1);
      }

      // Spawn Meteors
      const spawnRate = Math.max(12, 35 - Math.floor(currentScore / 25));
      if (frames % spawnRate === 0) {
        enemies.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: -30,
          radius: 15 + Math.random() * 20,
          speedY: 3.5 + Math.random() * 3 + (currentScore / 150), // slightly slower meteors
          speedX: (Math.random() - 0.5) * 2.5
        });
      }

      // Update & Draw Meteors & Collisions
      for (let i = enemies.length - 1; i >= 0; i--) {
        let e = enemies[i];
        e.y += e.speedY;
        e.x += e.speedX;
        
        if (e.x < e.radius || e.x > canvas.width - e.radius) e.speedX *= -1;

        drawEnemy(e);

        // Player Collision
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < e.radius + 15) {
          gameOver = true;
          setIsGameOver(true);
          
          setHighScore((prev) => {
            if (currentScore > prev) {
              localStorage.setItem('spaceShooterHighScore', currentScore.toString());
              return currentScore;
            }
            return prev;
          });
          
          // Explosion sound
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            const osc = audioCtxRef.current.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(100, audioCtxRef.current.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, audioCtxRef.current.currentTime + 0.5);
            
            const env = audioCtxRef.current.createGain();
            env.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime);
            env.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.5);
            
            osc.connect(env);
            env.connect(audioCtxRef.current.destination);
            osc.start();
            osc.stop(audioCtxRef.current.currentTime + 0.5);
          }
        }

        // Bullet Collision
        for (let j = bullets.length - 1; j >= 0; j--) {
          let b = bullets[j];
          if (b.x > e.x - e.radius && b.x < e.x + e.radius &&
              b.y > e.y - e.radius && b.y < e.y + e.radius) {
            
            enemies.splice(i, 1);
            bullets.splice(j, 1);
            currentScore += 10;
            setScore(currentScore);
            
            // Hit sound
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
               const osc = audioCtxRef.current.createOscillator();
               osc.type = 'square';
               osc.frequency.setValueAtTime(440, audioCtxRef.current.currentTime);
               osc.frequency.exponentialRampToValueAtTime(220, audioCtxRef.current.currentTime + 0.05);
               const env = audioCtxRef.current.createGain();
               env.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
               env.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + 0.05);
               osc.connect(env);
               env.connect(audioCtxRef.current.destination);
               osc.start();
               osc.stop(audioCtxRef.current.currentTime + 0.05);
            }
            break;
          }
        }
        
        if (e.y > canvas.height + 50 && enemies[i]) {
          enemies.splice(i, 1);
        }
      }

      drawPlayer();

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(requestRef.current);
      stopAudio();
    };
  }, [isGameOver]);

  const handleClose = () => {
    stopAudio();
    onClose();
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 9999, background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)',
      display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        position: 'relative', width: '500px', height: '700px', background: '#0a0a0a',
        border: '4px solid var(--border-dark)', borderRadius: '16px', overflow: 'hidden',
        boxShadow: '12px 12px 0px rgba(0,0,0,0.5)'
      }}>
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        
        <div style={{ position: 'absolute', top: '15px', left: '20px', fontSize: '20px', fontWeight: '800', color: '#ffffff', fontFamily: 'Outfit' }}>
          Score: {score}
        </div>
        
        <div style={{ position: 'absolute', top: '15px', right: '60px', fontSize: '20px', fontWeight: '800', color: 'var(--google-yellow)', fontFamily: 'Outfit' }}>
          High Score: {highScore}
        </div>

        <button 
          onClick={handleClose}
          className="btn-icon"
          style={{
            position: 'absolute', top: '10px', right: '10px',
            background: 'none', border: 'none', 
            cursor: 'pointer', color: '#ffffff', padding: '4px'
          }}
        >
          <X size={28} strokeWidth={3} />
        </button>

        {/* Instructions */}
        <div style={{ position: 'absolute', bottom: '15px', left: 0, width: '100%', textAlign: 'center', color: '#888', fontSize: '14px', fontWeight: '700', letterSpacing: '1px' }}>
          [ SPACE ] TO SHOOT &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; [ ◀ ] [ ▶ ] TO MOVE
        </div>

        {isGameOver && (
          <div className="doodle-panel" style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
            padding: '40px', minWidth: '300px', background: '#1e1e1e', border: '4px solid #ffffff'
          }}>
            <h1 style={{ margin: 0, color: 'var(--google-red)', fontFamily: 'Outfit', fontSize: '48px' }}>GAME OVER</h1>
            <h2 style={{ margin: 0, color: '#ffffff' }}>Score: {score}</h2>
            
            <button 
              className="btn-primary"
              onClick={() => {
                setScore(0);
                setIsGameOver(false);
              }}
              style={{ fontSize: '20px', padding: '12px 24px', width: '100%', justifyContent: 'center' }}
            >
              <RotateCcw size={24} strokeWidth={3} style={{ marginRight: '10px' }} /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
