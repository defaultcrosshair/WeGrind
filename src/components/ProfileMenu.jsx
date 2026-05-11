import { useState, useRef, useEffect } from 'react';
import DoodleAvatar from './DoodleAvatar';
import { ChevronLeft, ChevronRight, Dices, Edit2, Check, LogOut } from 'lucide-react';
import gsap from 'gsap';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const ADJECTIVES = ["Sleepy", "Hyper", "Caffeinated", "Lazy", "Genius", "Panicking", "Creative", "Bored", "Hacking"];
const NOUNS = ["Coder", "Student", "Scholar", "Ninja", "Doodle", "T-Rex", "Master", "Wizard", "Debug"];

const MAX_EYES = 11;
const MAX_MOUTH = 9;
const MAX_HAT = 13;

export default function ProfileMenu({ profileName, setProfileName, avatarParams, setAvatarParams }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profileName);
  const [currentUser, setCurrentUser] = useState(null);
  
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const randomizeAll = () => {
    setAvatarParams({
      eyeIndex: Math.floor(Math.random() * MAX_EYES),
      mouthIndex: Math.floor(Math.random() * MAX_MOUTH),
      hatIndex: Math.floor(Math.random() * MAX_HAT)
    });
    
    const randomAdj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const randomNoun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    setProfileName(`${randomAdj} ${randomNoun}`);
  };

  const handleSaveName = () => {
    if (editName.trim()) setProfileName(editName.trim());
    setIsEditing(false);
  };

  useEffect(() => {
    if (isOpen && menuRef.current) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, y: -10, scale: 0.95, transformOrigin: "top right" },
        { opacity: 1, y: 0, scale: 1, duration: 0.2, ease: "back.out(1.5)" }
      );
    }
  }, [isOpen]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('#profile-btn')) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        id="profile-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
          transition: 'transform 0.2s', transform: isOpen ? 'scale(0.95)' : 'scale(1)',
          display: 'flex'
        }}
      >
        <div style={{ 
          width: '40px', height: '40px', borderRadius: 'var(--radius-full)', 
          background: 'var(--bg-secondary)', border: '2px solid var(--border-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
        }}>
          <DoodleAvatar eyeIndex={avatarParams.eyeIndex} mouthIndex={avatarParams.mouthIndex} hatIndex={avatarParams.hatIndex} size={36} />
        </div>
      </button>

      {isOpen && (
        <div 
          ref={menuRef}
          className="doodle-panel"
          style={{
            position: 'absolute',
            top: '120%',
            right: '0',
            width: '280px',
            padding: '1.5rem',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          {isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
              <input 
                autoFocus
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                style={{
                  flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                  border: '2px solid var(--border-dark)', background: 'var(--bg-primary)',
                  color: 'var(--text-primary)', fontWeight: '700', fontSize: '1rem',
                  fontFamily: 'inherit', width: '100%'
                }}
              />
              <button onClick={handleSaveName} className="btn-icon" style={{ background: 'var(--google-green)', color: 'white', border: '2px solid var(--border-dark)' }}>
                <Check size={16} strokeWidth={3} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', textAlign: 'center' }}>
                {profileName}
              </h3>
              <button 
                onClick={() => { setEditName(profileName); setIsEditing(true); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.25rem' }}
              >
                <Edit2 size={16} />
              </button>
            </div>
          )}
          
          <div style={{ padding: '1rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border-dark)', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DoodleAvatar eyeIndex={avatarParams.eyeIndex} mouthIndex={avatarParams.mouthIndex} hatIndex={avatarParams.hatIndex} size={120} />
          </div>

          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Selector label="Eyes" value={avatarParams.eyeIndex} max={MAX_EYES} onChange={(v) => setAvatarParams(prev => ({ ...prev, eyeIndex: v }))} />
            <Selector label="Mouth" value={avatarParams.mouthIndex} max={MAX_MOUTH} onChange={(v) => setAvatarParams(prev => ({ ...prev, mouthIndex: v }))} />
            <Selector label="Hat" value={avatarParams.hatIndex} max={MAX_HAT} onChange={(v) => setAvatarParams(prev => ({ ...prev, hatIndex: v }))} />
          </div>

          <button 
            className="btn-primary" 
            onClick={randomizeAll}
            style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem', padding: '0.75rem' }}
          >
            <Dices size={20} />
            Randomize
          </button>

          {currentUser && (
            <button 
              onClick={handleLogout}
              style={{ 
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.75rem', background: 'var(--google-red)', color: 'white', border: '2px solid var(--border-dark)',
                borderRadius: 'var(--radius-full)', fontWeight: '700', cursor: 'pointer', marginTop: '0.5rem'
              }}
            >
              <LogOut size={16} strokeWidth={3} />
              Logout Gmail
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Selector({ label, value, max, onChange }) {
  const prev = () => onChange((value - 1 + max) % max);
  const next = () => onChange((value + 1) % max);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-secondary)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button className="btn-icon" onClick={prev} style={{ width: '28px', height: '28px', padding: 0 }}><ChevronLeft size={16} strokeWidth={3} /></button>
        <span style={{ fontSize: '0.9rem', fontWeight: '800', width: '20px', textAlign: 'center', color: 'var(--text-primary)' }}>{value + 1}</span>
        <button className="btn-icon" onClick={next} style={{ width: '28px', height: '28px', padding: 0 }}><ChevronRight size={16} strokeWidth={3} /></button>
      </div>
    </div>
  );
}
