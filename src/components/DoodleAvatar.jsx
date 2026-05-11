import React from 'react';

export default function DoodleAvatar({ eyeIndex = 0, mouthIndex = 0, hatIndex = 0, size = 100 }) {
  
  const renderEyes = (index) => {
    switch(index) {
      case 0: // Dots
        return (
          <g fill="var(--border-dark)">
            <circle cx="35" cy="45" r="4" />
            <circle cx="65" cy="45" r="4" />
          </g>
        );
      case 1: // Sleepy (half closed)
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" fill="none">
            <path d="M 30 45 Q 35 40 40 45" />
            <path d="M 60 45 Q 65 40 70 45" />
          </g>
        );
      case 2: // Glasses
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" fill="none">
            <rect x="25" y="40" width="20" height="15" rx="4" />
            <rect x="55" y="40" width="20" height="15" rx="4" />
            <line x1="45" y1="45" x2="55" y2="45" />
            <circle cx="35" cy="47" r="2" fill="var(--border-dark)" stroke="none" />
            <circle cx="65" cy="47" r="2" fill="var(--border-dark)" stroke="none" />
          </g>
        );
      case 3: // Crazy
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" fill="none">
            <circle cx="35" cy="45" r="8" />
            <circle cx="65" cy="45" r="6" />
            <circle cx="35" cy="45" r="2" fill="var(--border-dark)" />
            <circle cx="65" cy="45" r="2" fill="var(--border-dark)" />
          </g>
        );
      case 4: // Sunglasses
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round" fill="#1a1a1a">
            <path d="M 20 40 Q 35 40 45 45 Q 35 55 20 40 Z" />
            <path d="M 55 45 Q 65 40 80 40 Q 80 55 55 45 Z" />
            <line x1="45" y1="45" x2="55" y2="45" />
            <line x1="10" y1="35" x2="20" y2="40" />
            <line x1="90" y1="35" x2="80" y2="40" />
          </g>
        );
      case 5: // Anime
        return (
          <g stroke="var(--border-dark)" strokeWidth="3" fill="none">
            <ellipse cx="35" cy="45" rx="8" ry="12" />
            <ellipse cx="65" cy="45" rx="8" ry="12" />
            <circle cx="35" cy="42" r="4" fill="var(--border-dark)" />
            <circle cx="65" cy="42" r="4" fill="var(--border-dark)" />
            <circle cx="32" cy="38" r="2" fill="#ffffff" stroke="none" />
            <circle cx="62" cy="38" r="2" fill="#ffffff" stroke="none" />
          </g>
        );
      case 6: // Pirate
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="65" cy="45" r="4" fill="var(--border-dark)" />
            <path d="M 25 40 Q 35 35 45 40 Q 40 55 25 40 Z" fill="#1a1a1a" />
            <line x1="10" y1="30" x2="25" y2="40" />
            <line x1="45" y1="40" x2="90" y2="30" />
          </g>
        );
      case 7: // Cyborg
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="35" cy="45" r="4" fill="var(--border-dark)" />
            <circle cx="65" cy="45" r="10" fill="#e5e7eb" />
            <circle cx="65" cy="45" r="3" fill="var(--google-red)" stroke="none" />
            <line x1="65" y1="35" x2="65" y2="25" />
            <line x1="75" y1="45" x2="85" y2="45" />
          </g>
        );
      case 8: // Lazy
        return (
          <g fill="var(--border-dark)">
            <circle cx="35" cy="45" r="4" />
            <circle cx="65" cy="40" r="3" />
          </g>
        );
      case 9: // Dark circle
        return (
          <g stroke="var(--border-dark)" strokeWidth="4">
            <circle cx="35" cy="45" r="4" fill="var(--border-dark)" />
            <circle cx="65" cy="45" r="4" fill="var(--border-dark)" />
            <path d="M 28 52 Q 35 58 42 52" fill="none" strokeWidth="2" stroke="var(--text-secondary)" />
            <path d="M 58 52 Q 65 58 72 52" fill="none" strokeWidth="2" stroke="var(--text-secondary)" />
          </g>
        );
      case 10: // Swirl
        return (
          <g stroke="var(--border-dark)" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 35 45 m 0 -8 a 8 8 0 1 1 -1 0 a 6 6 0 1 1 1 0 a 4 4 0 1 1 -1 0 a 2 2 0 1 1 1 0" />
            <path d="M 65 45 m 0 -8 a 8 8 0 1 1 -1 0 a 6 6 0 1 1 1 0 a 4 4 0 1 1 -1 0 a 2 2 0 1 1 1 0" />
          </g>
        );
      default: return null;
    }
  }

  const renderMouth = (index) => {
    switch(index) {
      case 0: // Smile
        return <path d="M 35 65 Q 50 80 65 65" stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 1: // Frown
        return <path d="M 35 70 Q 50 60 65 70" stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" fill="none" />;
      case 2: // Neutral
        return <line x1="40" y1="68" x2="60" y2="68" stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" />;
      case 3: // Open Mouth
        return <ellipse cx="50" cy="70" rx="8" ry="12" fill="var(--border-dark)" />;
      case 4: // Buck teeth
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round">
            <path d="M 35 65 Q 50 70 65 65" fill="none" />
            <rect x="42" y="68" width="7" height="8" fill="#ffffff" />
            <rect x="51" y="68" width="7" height="8" fill="#ffffff" />
          </g>
        );
      case 5: // Wavy
        return (
          <path d="M 35 68 Q 42 60 50 68 T 65 68" stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" fill="none" />
        );
      case 6: // Drooling
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 35 65 Q 50 75 65 65" fill="none" />
            <path d="M 55 68 Q 60 85 55 95 Q 50 85 50 68" fill="#93c5fd" />
          </g>
        );
      case 7: // Tongue
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="35" y1="65" x2="65" y2="65" />
            <path d="M 45 65 L 45 80 Q 50 85 55 80 L 55 65 Z" fill="var(--google-red)" />
            <line x1="50" y1="65" x2="50" y2="75" strokeWidth="2" />
          </g>
        );
      case 8: // Mask
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round">
            <path d="M 30 60 L 70 60 L 65 80 L 35 80 Z" fill="#ffffff" />
            <line x1="10" y1="50" x2="30" y2="60" />
            <line x1="90" y1="50" x2="70" y2="60" />
            <line x1="30" y1="65" x2="70" y2="65" strokeWidth="2" opacity="0.2" />
            <line x1="30" y1="70" x2="70" y2="70" strokeWidth="2" opacity="0.2" />
            <line x1="30" y1="75" x2="70" y2="75" strokeWidth="2" opacity="0.2" />
          </g>
        );
      default: return null;
    }
  }

  const renderHat = (index) => {
    switch(index) {
      case 0: // None
        return null;
      case 1: // Party Hat
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round" fill="var(--google-yellow)">
            <path d="M 30 25 L 50 -10 L 70 25 Z" />
            <circle cx="50" cy="-10" r="6" fill="var(--google-red)" />
          </g>
        );
      case 2: // Baseball Cap
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round" fill="var(--google-blue)">
            <path d="M 20 25 Q 50 -5 80 25 Z" />
            <path d="M 10 25 L 75 25" strokeLinecap="round" />
          </g>
        );
      case 3: // Crown
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round" fill="var(--google-yellow)">
            <path d="M 25 25 L 20 -5 L 40 10 L 50 -15 L 60 10 L 80 -5 L 75 25 Z" />
          </g>
        );
      case 4: // Balloon
        return (
          <g stroke="var(--border-dark)" strokeWidth="4">
            <path d="M 50 10 Q 60 -10 70 -30" strokeLinecap="round" fill="none" />
            <ellipse cx="70" cy="-45" rx="15" ry="20" fill="var(--google-red)" />
            <path d="M 65 -25 L 75 -25 L 70 -30 Z" fill="var(--google-red)" strokeLinejoin="round" />
          </g>
        );
      case 5: // Roadcone
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round">
            <ellipse cx="50" cy="15" rx="25" ry="5" fill="#f97316" />
            <path d="M 35 15 L 45 -30 L 55 -30 L 65 15 Z" fill="#f97316" />
            <path d="M 40 -5 L 60 -5 L 57 -15 L 43 -15 Z" fill="#ffffff" />
          </g>
        );
      case 6: // Leaf
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 50 10 Q 55 -5 65 -5" fill="none" />
            <path d="M 65 -5 C 80 -10, 85 5, 85 5 C 85 5, 70 10, 65 -5 Z" fill="var(--google-green)" />
          </g>
        );
      case 7: // Rubber Ducky
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="45" cy="5" rx="25" ry="10" fill="var(--google-yellow)" />
            <circle cx="65" cy="-15" r="12" fill="var(--google-yellow)" />
            <path d="M 75 -15 L 85 -10 L 75 -5 Z" fill="#f97316" />
            <circle cx="68" cy="-18" r="2" fill="var(--border-dark)" stroke="none" />
          </g>
        );
      case 8: // Lizard
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="var(--google-green)">
            <path d="M 20 15 C 30 -10, 70 -10, 80 15" fill="none" strokeWidth="8" />
            <circle cx="78" cy="12" r="6" />
            <path d="M 22 13 Q 10 20 5 10" fill="none" />
            <line x1="30" y1="0" x2="25" y2="-10" />
            <line x1="65" y1="-2" x2="75" y2="-12" />
          </g>
        );
      case 9: // Police Siren
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <rect x="35" y="5" width="30" height="5" fill="#333333" />
            <path d="M 38 5 L 42 -15 Q 50 -20 58 -15 L 62 5 Z" fill="var(--google-red)" />
            <line x1="25" y1="-10" x2="15" y2="-15" stroke="var(--google-red)" />
            <line x1="75" y1="-10" x2="85" y2="-15" stroke="var(--google-red)" />
            <line x1="50" y1="-25" x2="50" y2="-35" stroke="var(--google-red)" />
          </g>
        );
      case 10: // Siren
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round">
            <path d="M 40 -10 L 60 -10 L 65 10 L 35 10 Z" fill="var(--google-red)" />
            <path d="M 45 -10 L 55 -10 L 55 10 L 45 10 Z" fill="#ff8a80" />
            <line x1="30" y1="-20" x2="35" y2="-10" strokeWidth="3" />
            <line x1="70" y1="-20" x2="65" y2="-10" strokeWidth="3" />
            <line x1="50" y1="-25" x2="50" y2="-15" strokeWidth="3" />
            <line x1="35" y1="10" x2="65" y2="10" strokeWidth="6" />
          </g>
        );
      case 11: // Punk Hair
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round" fill="var(--google-red)">
            <path d="M 35 15 L 40 -10 L 45 10 L 50 -15 L 55 10 L 60 -10 L 65 15 Z" />
          </g>
        );
      case 12: // Simple Hairstyle
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#5c3a21">
            <path d="M 25 35 C 20 10, 40 5, 50 10 C 60 5, 80 10, 75 35 C 80 20, 60 10, 50 15 C 40 10, 20 20, 25 35 Z" />
            <path d="M 50 15 Q 60 25 70 20" fill="none" strokeWidth="3" />
            <path d="M 50 15 Q 40 25 30 20" fill="none" strokeWidth="3" />
          </g>
        );
      case 13: // Colorful Hairstyle
        return (
          <g stroke="var(--border-dark)" strokeWidth="4" strokeLinejoin="round">
            <circle cx="35" cy="15" r="15" fill="var(--google-blue)" />
            <circle cx="65" cy="15" r="15" fill="var(--google-yellow)" />
            <circle cx="50" cy="5" r="15" fill="var(--google-green)" />
            <circle cx="50" cy="20" r="12" fill="var(--google-red)" />
          </g>
        );
      default: return null;
    }
  }

  return (
    <svg viewBox="-20 -40 140 140" width={size} height={size} style={{ display: 'block', flexShrink: 0, overflow: 'visible' }}>
      {/* Base Head */}
      <path 
        d="M 50 10 C 70 8, 90 20, 92 45 C 95 70, 75 90, 50 92 C 25 94, 5 75, 8 50 C 10 25, 30 12, 50 10 Z" 
        fill="#ffffff" 
        stroke="var(--border-dark)" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {renderEyes(eyeIndex)}
      {renderMouth(mouthIndex)}
      {renderHat(hatIndex)}
    </svg>
  );
}
