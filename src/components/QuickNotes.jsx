import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { StickyNote, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

export default function QuickNotes() {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem('eh_quick_notes') || '');
  const panelRef = useRef(null);
  const tabRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('eh_quick_notes', notes);
  }, [notes]);

  useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        x: isOpen ? 0 : '100%',
        duration: 0.4,
        ease: 'power3.out'
      });
    }
  }, [isOpen]);

  const clearNotes = () => {
    if (window.confirm('Clear all notes?')) {
      setNotes('');
    }
  };

  return (
    <>
      {/* Pull Tab */}
      <button
        ref={tabRef}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          right: isOpen ? '320px' : '0',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          background: 'var(--google-yellow)',
          border: '3px solid var(--border-dark)',
          borderRight: 'none',
          borderRadius: 'var(--radius-md) 0 0 var(--radius-md)',
          padding: '1rem 0.5rem',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '-4px 0 0 var(--border-dark)',
          transition: 'right 0.4s ease, background 0.2s',
        }}
      >
        {isOpen ? <ChevronRight size={20} color="#000" /> : <ChevronLeft size={20} color="#000" />}
        <StickyNote size={24} color="#000" />
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: '320px',
          background: 'var(--panel-bg)',
          borderLeft: '4px solid var(--border-dark)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
          transform: 'translateX(100%)',
        }}
      >
        <div style={{ 
          padding: '1.5rem', 
          borderBottom: '3px solid var(--border-dark)',
          background: 'var(--google-yellow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem', color: '#000' }}>
            <StickyNote size={20} /> Scratchpad
          </h3>
          <button 
            onClick={() => setIsOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', opacity: 0.7 }}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div style={{ 
          flex: 1, 
          position: 'relative', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#fff9c4', // Paper-like color
          overflow: 'hidden'
        }}>
          {/* Paper Texture Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.4,
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />

          {/* Grid Pattern Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }} />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Jot down notes, paste YT links, or anything else here... (Auto-saves!)"
            style={{
              flex: 1,
              width: '100%',
              padding: '1.5rem',
              border: 'none',
              background: 'transparent',
              resize: 'none',
              fontSize: '1rem',
              fontFamily: "'Coming Soon', cursive, sans-serif",
              lineHeight: 1.6,
              color: '#333',
              outline: 'none',
              zIndex: 1,
              backgroundAttachment: 'local'
            }}
          />
        </div>

        <div style={{ 
          padding: '1rem', 
          borderTop: '3px solid var(--border-dark)',
          background: 'var(--bg-secondary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            {notes.length} Characters
          </div>
          <button 
            onClick={clearNotes}
            style={{
              background: '#fee2e2',
              border: '2px solid var(--border-dark)',
              borderRadius: 'var(--radius-md)',
              padding: '0.4rem 0.8rem',
              cursor: 'pointer',
              color: 'var(--google-red)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: '800',
              boxShadow: '2px 2px 0px var(--border-dark)',
            }}
          >
            <Trash2 size={14} /> Clear
          </button>
        </div>
      </div>

      {/* Overlay to close when clicking outside */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'transparent',
            zIndex: 998,
          }}
        />
      )}
    </>
  );
}
