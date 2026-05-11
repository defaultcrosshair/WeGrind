import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Medal, TrendingUp, BookOpen, Gamepad2, Trophy } from 'lucide-react';
import DoodleAvatar from './DoodleAvatar';
import { db } from '../firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function Leaderboard({ profileName, avatarParams, userSyllabusPoints }) {
  const [filterMode, setFilterMode] = useState('syllabus');
  const [globalData, setGlobalData] = useState([]);
  const listRef = useRef(null);
  const statsRef = useRef(null);

  const localDeviceId = localStorage.getItem('exam_helper_device_id');
  const gameHighScore = parseInt(localStorage.getItem('spaceShooterHighScore') || '0', 10);

  useEffect(() => {
    try {
      const q = query(collection(db, 'leaderboard'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched = snapshot.docs.map(doc => doc.data());
        setGlobalData(fetched);
      });
      return () => unsubscribe();
    } catch(e) {
      console.log("Firestore Leaderboard error - Keys probably missing");
    }
  }, []);

  // Merge global data with local immediate state to prevent lag
  const currentUserObj = {
    id: localDeviceId || 'me',
    name: profileName,
    points: userSyllabusPoints,
    gameScore: gameHighScore,
    avatarParams: avatarParams,
    isCurrent: true,
  };

  let mergedData = [...globalData];
  const userIndex = mergedData.findIndex(u => u.id === localDeviceId);
  if (userIndex !== -1) {
    mergedData[userIndex] = {
      ...mergedData[userIndex],
      isCurrent: true,
      points: userSyllabusPoints,
      gameScore: gameHighScore
    };
  } else {
    mergedData.push(currentUserObj);
  }

  // Sort and assign ranks dynamically
  mergedData.sort((a, b) => {
    if (filterMode === 'syllabus') return (b.points || 0) - (a.points || 0);
    return (b.gameScore || 0) - (a.gameScore || 0);
  });

  mergedData.forEach((user, index) => {
    user.rank = index + 1;
  });

  const currentUser = mergedData.find(u => u.isCurrent) || currentUserObj;

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
    
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: "back.out(1.5)" }
      );
    }
  }, [filterMode, globalData.length]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Trophy color="var(--google-yellow)" strokeWidth={3} />
            Overall Ranking
          </h2>
          
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '0.25rem', borderRadius: 'var(--radius-full)', border: '2px solid var(--border-dark)' }}>
            <button 
              onClick={() => setFilterMode('syllabus')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: filterMode === 'syllabus' ? 'var(--panel-bg)' : 'transparent',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                boxShadow: filterMode === 'syllabus' ? '0px 2px 0px rgba(0,0,0,0.1)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <BookOpen size={16} /> Syllabus
            </button>
            <button 
              onClick={() => setFilterMode('game')}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                background: filterMode === 'game' ? 'var(--panel-bg)' : 'transparent',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                boxShadow: filterMode === 'game' ? '0px 2px 0px rgba(0,0,0,0.1)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <Gamepad2 size={16} /> Game
            </button>
          </div>
        </div>

        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {mergedData.map((user) => (
            <div 
              key={user.id} 
              className="doodle-panel"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem',
                padding: '1rem 1.5rem',
                background: user.isCurrent ? 'var(--current-user-bg)' : 'var(--panel-bg)',
                border: `3px solid var(--border-dark)`,
                borderRadius: 'var(--radius-full)',
                boxShadow: user.isCurrent ? '4px 4px 0px var(--border-dark)' : '2px 2px 0px var(--border-dark)',
                transform: user.isCurrent ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.2s'
              }}
            >
              <div style={{ width: '30px', fontWeight: '800', fontSize: '1.25rem', color: user.rank <= 3 ? 'var(--google-yellow)' : 'var(--text-secondary)' }}>
                #{user.rank}
              </div>
              
              <div style={{ width: '40px', height: '40px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border-dark)', overflow: 'hidden' }}>
                 {user.avatarParams ? (
                    <DoodleAvatar {...user.avatarParams} size={36} />
                 ) : (
                    <span style={{ fontSize: '1.2rem' }}>{typeof user.avatar === 'string' ? user.avatar : (user.avatar?.emoji || '👻')}</span>
                 )}
              </div>
              
              <div style={{ flex: 1, fontWeight: '700', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {user.name}
                {user.isCurrent && <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', background: 'var(--google-blue)', color: 'white', borderRadius: 'var(--radius-full)' }}>YOU</span>}
              </div>
              
              <div style={{ fontWeight: '800', fontSize: '1.25rem', color: filterMode === 'syllabus' ? 'var(--google-blue)' : 'var(--google-red)' }}>
                {filterMode === 'syllabus' ? (user.points || 0) : (user.gameScore || 0)} pts
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: '4.5rem' }}>
        <div ref={statsRef} className="doodle-panel" style={{ padding: '2rem', background: 'var(--bg-secondary)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Medal color="var(--google-red)" strokeWidth={3} />
            Your Stats
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed var(--border-dark)', paddingBottom: '1rem' }}>
              <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Current Rank</span>
              <span style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--google-blue)' }}>
                #{currentUser?.rank || '?'}
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed var(--border-dark)', paddingBottom: '1rem' }}>
              <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>
                {filterMode === 'syllabus' ? 'Syllabus Points' : 'Arcade High Score'}
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'Outfit' }}>
                {filterMode === 'syllabus' ? (currentUser?.points || 0) : (currentUser?.gameScore || 0)}
              </span>
            </div>

            <div style={{ background: 'var(--panel-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-dark)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--google-green)' }}>
                <TrendingUp size={18} strokeWidth={3} /> Keep pushing!
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                {currentUser?.rank === 1 
                  ? "You are unstoppable! Defend your #1 spot!" 
                  : `You need ${(mergedData[Math.max(0, currentUser.rank - 2)]?.[filterMode === 'syllabus' ? 'points' : 'gameScore'] || 0) - (currentUser?.[filterMode === 'syllabus' ? 'points' : 'gameScore'] || 0) + 1} more points to overtake #${currentUser.rank - 1}.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
