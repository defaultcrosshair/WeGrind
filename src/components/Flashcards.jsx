import { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen, Trophy, Zap } from 'lucide-react';
import { flashcardsData } from '../data/flashcardsData';

// Inject styles once
function injectStyles() {
  if (document.getElementById('flashcard-styles')) return;
  const style = document.createElement('style');
  style.id = 'flashcard-styles';
  style.textContent = `
    /* ── Flip card ── */
    .fc-scene {
      cursor: pointer;
      perspective: 1200px;
      flex: 1;
      min-height: 280px;
      max-width: 100%;
      box-sizing: border-box;
    }
    .fc-card {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 280px;
      transition: transform 0.55s cubic-bezier(0.4, 0.0, 0.2, 1);
      transform-style: preserve-3d;
      max-width: 100%;
      box-sizing: border-box;
    }
    .fc-card.is-flipped { transform: rotateY(180deg); }
    .fc-face {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      gap: 1rem;
      border-radius: var(--radius-md);
      border: 3px solid var(--border-dark);
      box-shadow: 6px 6px 0px var(--border-dark);
      background: var(--panel-bg);
      overflow: hidden;
      max-width: 100%;
      box-sizing: border-box;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .fc-face--back { transform: rotateY(180deg); }

    /* ── Layout ── */
    .fc-layout {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 1.5rem;
      min-height: 70vh;
      max-width: 100%;
    }

    /* ── Subject/Deck selectors ── */
    .fc-left {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .fc-subjects {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .fc-decks {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    /* ── Mobile ── */
    @media (max-width: 768px) {
      .fc-layout {
        grid-template-columns: 1fr;
        gap: 1rem;
        min-height: unset;
        width: 100%;
        overflow: hidden;
      }
      .fc-left {
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
      }
      .fc-subjects {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 4px;
        gap: 0.4rem;
      }
      .fc-subjects button {
        flex-shrink: 0;
        font-size: 0.8rem !important;
        padding: 0.45rem 0.8rem !important;
      }
      .fc-decks {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 4px;
        gap: 0.4rem;
      }
      .fc-decks button {
        flex-shrink: 0;
        font-size: 0.75rem !important;
        padding: 0.4rem 0.7rem !important;
      }
      .fc-decks button .fc-card-count {
        display: none;
      }
      .fc-face {
        padding: 1.5rem 1rem;
        gap: 0.75rem;
      }
      .fc-scene {
        min-height: 240px;
      }
      .fc-card {
        min-height: 240px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Background Question Marks for subtle decoration
const QuestionMarksBG = () => {
  const marks = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 4 + 1}rem`,
      rotation: `${Math.random() * 360}deg`,
      opacity: Math.random() * 0.05 + 0.03
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {marks.map(m => (
        <span key={m.id} style={{
          position: 'absolute',
          top: m.top,
          left: m.left,
          fontSize: m.fontSize,
          transform: `rotate(${m.rotation})`,
          opacity: m.opacity,
          fontWeight: '900',
          color: 'var(--text-secondary)',
          userSelect: 'none'
        }}>?</span>
      ))}
    </div>
  );
};

export default function Flashcards() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(flashcardsData[1].id);
  const [selectedDeckId, setSelectedDeckId] = useState(flashcardsData[1].decks[0].id);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const deckListRef = useRef(null);

  useEffect(() => { injectStyles(); }, []);

  const subject = flashcardsData.find(s => s.id === selectedSubjectId);
  const deck = subject?.decks.find(d => d.id === selectedDeckId);
  const cards = deck?.cards || [];
  const card = cards[currentCardIndex];

  useEffect(() => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsDone(false);
  }, [selectedDeckId]);

  useEffect(() => {
    setIsFlipped(false);
  }, [currentCardIndex]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      // Deck Navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = subject?.decks.findIndex(d => d.id === selectedDeckId);
        if (currentIndex !== -1 && currentIndex < (subject?.decks.length || 0) - 1) {
          setSelectedDeckId(subject.decks[currentIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = subject?.decks.findIndex(d => d.id === selectedDeckId);
        if (currentIndex > 0) {
          setSelectedDeckId(subject.decks[currentIndex - 1].id);
        }
      }

      if (isDone) return;
      
      // Card Navigation
      if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, isDone, cards.length, subject, selectedDeckId]); // Dependencies needed for goNext/goPrev to work properly in the closure

  useEffect(() => {
    if (deckListRef.current) {
      gsap.fromTo(
        deckListRef.current.children,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.25, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [selectedSubjectId]);

  const goNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(i => i + 1);
    } else {
      setIsDone(true);
    }
  };

  const goPrev = () => {
    if (currentCardIndex > 0) setCurrentCardIndex(i => i - 1);
  };

  const restartDeck = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setIsDone(false);
  };

  return (
    <div className="fc-layout">

      {/* ── Left Panel ── */}
      <div className="fc-left">

        {/* Subject */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Subject</p>
          <div className="fc-subjects">
            {flashcardsData.map(s => (
              <button
                key={s.id}
                onClick={() => { setSelectedSubjectId(s.id); setSelectedDeckId(s.decks[0].id); }}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  border: `2.5px solid ${selectedSubjectId === s.id ? s.color : 'var(--border-dark)'}`,
                  background: selectedSubjectId === s.id ? `${s.color}18` : 'var(--panel-bg)',
                  fontWeight: '700',
                  color: selectedSubjectId === s.id ? s.color : 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <BookOpen size={15} />
                {s.subject}
              </button>
            ))}
          </div>
        </div>

        {/* Decks */}
        <div>
          <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Deck
            <span style={{ fontSize: '0.65rem', background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '1.5px solid var(--border-dark)', padding: '1px 4px', borderRadius: '4px', textTransform: 'none', letterSpacing: 'normal', opacity: 0.8 }}>↑/↓</span>
          </p>
          <div ref={deckListRef} className="fc-decks">
            {subject?.decks.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDeckId(d.id)}
                style={{
                  padding: '0.55rem 1rem 0.55rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedDeckId === d.id ? subject.color : 'var(--border-dark)'}`,
                  background: selectedDeckId === d.id ? `${subject.color}12` : 'var(--panel-bg)',
                  fontWeight: '600',
                  color: selectedDeckId === d.id ? subject.color : 'var(--text-secondary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.8rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{d.name}</span>
                <span className="fc-card-count" style={{
                  fontSize: '0.65rem', fontWeight: '800',
                  background: 'var(--bg-secondary)', padding: '0.1rem 0.4rem',
                  borderRadius: 'var(--radius-full)', color: 'var(--text-secondary)',
                  flexShrink: 0
                }}>
                  {d.cards.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-primary)' }}>{deck?.name}</h2>
            <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              Tap card to flip
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: '800', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {Math.min(currentCardIndex + 1, cards.length)} / {cards.length}
            </span>
            <button
              onClick={restartDeck}
              style={{
                background: 'var(--panel-bg)', border: '2px solid var(--border-dark)',
                borderRadius: 'var(--radius-full)', padding: '0.35rem 0.7rem',
                cursor: 'pointer', color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                fontWeight: '700', fontSize: '0.75rem',
              }}
            >
              <RotateCcw size={13} /> Restart
            </button>
          </div>
        </div>

        {/* Progress bar — Matched to Checklist style */}
        <div style={{ height: '8px', background: 'var(--bg-secondary)', border: '2px solid var(--border-dark)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${cards.length > 0 ? ((currentCardIndex + 1) / cards.length) * 100 : 0}%`, 
              background: subject?.color || 'var(--google-blue)',
              borderRight: (currentCardIndex + 1) < cards.length ? '2px solid var(--border-dark)' : 'none',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }} 
          />
        </div>

        {isDone ? (
          /* ── Done screen ── */
          <div className="doodle-panel" style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '1.25rem', padding: '2.5rem 1.5rem', textAlign: 'center',
            background: 'var(--panel-bg)',
          }}>
            <Trophy size={48} color="var(--google-yellow)" strokeWidth={2} />
            <div>
              <h2 style={{ margin: '0 0 0.4rem 0', fontSize: '1.75rem' }}>Deck Complete!</h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>{deck?.name} — {cards.length} cards reviewed</p>
            </div>
            <div style={{
              background: `${subject?.color}15`, border: `2px solid ${subject?.color}40`,
              borderRadius: 'var(--radius-md)', padding: '0.65rem 1.25rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              fontWeight: '800', color: subject?.color, fontSize: '0.95rem',
            }}>
              <Zap size={16} /> Great session! Keep grinding.
            </div>
            <button
              onClick={restartDeck}
              style={{
                padding: '0.7rem 1.75rem', borderRadius: 'var(--radius-full)',
                background: subject?.color || 'var(--google-blue)',
                border: '3px solid var(--border-dark)', color: 'white',
                fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer',
                boxShadow: '4px 4px 0px var(--border-dark)',
                display: 'flex', alignItems: 'center', gap: '0.4rem',
              }}
            >
              <RotateCcw size={15} /> Study Again
            </button>
          </div>
        ) : (
          <>
            {/* ── Flip Card ── */}
            <div className="fc-scene" onClick={() => setIsFlipped(f => !f)}>
              <div className={`fc-card${isFlipped ? ' is-flipped' : ''}`}>

                {/* Front — Question */}
                <div className="fc-face fc-face--front">
                  <QuestionMarksBG />
                  <div style={{
                    fontSize: '0.62rem', fontWeight: '800', textTransform: 'uppercase',
                    letterSpacing: '1.5px', color: subject?.color || 'var(--google-blue)',
                    background: `${subject?.color || '#4285f4'}15`,
                    padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)',
                    border: `1.5px solid ${subject?.color || '#4285f4'}40`,
                    position: 'relative', zIndex: 2
                  }}>
                    Question
                  </div>
                  <p style={{
                    fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)',
                    margin: 0, lineHeight: 1.4, maxWidth: '650px', position: 'relative', zIndex: 2
                  }}>
                    {card?.q}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', margin: 0, position: 'relative', zIndex: 2 }}>
                    Tap to reveal answer
                  </p>
                </div>

                {/* Back — Answer */}
                <div className="fc-face fc-face--back" style={{ 
                  borderColor: subject?.color || 'var(--border-dark)',
                  background: 'var(--completed-bg)' // Subtle green background, theme aware
                }}>
                  <div style={{
                    fontSize: '0.62rem', fontWeight: '800', textTransform: 'uppercase',
                    letterSpacing: '1.5px', color: '#16a34a',
                    background: '#16a34a15',
                    padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)',
                    border: '1.5px solid #16a34a40',
                  }}>
                    Answer
                  </div>
                  <p style={{
                    fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)',
                    margin: 0, lineHeight: 1.5, maxWidth: '650px'
                  }}>
                    {card?.a}
                  </p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600', margin: 0 }}>
                    Tap to see question
                  </p>
                </div>
              </div>
            </div>

            {/* ── Nav ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
              <button
                onClick={goPrev}
                disabled={currentCardIndex === 0}
                style={{
                  padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)',
                  border: '2.5px solid var(--border-dark)', background: '#fee2e2',
                  fontWeight: '700', color: 'var(--google-red)',
                  cursor: currentCardIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: currentCardIndex === 0 ? 0.35 : 1,
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.9rem', boxShadow: '3px 3px 0px var(--border-dark)',
                  transition: 'opacity 0.2s, transform 0.15s, box-shadow 0.15s',
                }}
                onMouseDown={e => { if (currentCardIndex > 0) { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '1px 1px 0px var(--border-dark)'; }}}
                onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0px var(--border-dark)'; }}
              >
                <ChevronLeft size={17} /> Previous
              </button>

              <button
                onClick={goNext}
                style={{
                  padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)',
                  border: '2.5px solid var(--border-dark)',
                  background: subject?.color || 'var(--google-blue)',
                  fontWeight: '700', color: 'white',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.9rem', boxShadow: '3px 3px 0px var(--border-dark)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translate(2px,2px)'; e.currentTarget.style.boxShadow = '1px 1px 0px var(--border-dark)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '3px 3px 0px var(--border-dark)'; }}
              >
                Next <ChevronRight size={17} />
              </button>
            </div>
            
            {/* Keyboard Hint */}
            <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: '700', opacity: 0.9 }}>
              <span style={{ background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '2px solid var(--border-dark)', padding: '2px 8px', borderRadius: '6px', margin: '0 4px', boxShadow: '2px 2px 0px var(--border-dark)' }}>←</span>
              <span style={{ background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '2px solid var(--border-dark)', padding: '2px 8px', borderRadius: '6px', margin: '0 4px', boxShadow: '2px 2px 0px var(--border-dark)' }}>Space</span>
              <span style={{ background: 'var(--panel-bg)', color: 'var(--text-primary)', border: '2px solid var(--border-dark)', padding: '2px 8px', borderRadius: '6px', margin: '0 4px', boxShadow: '2px 2px 0px var(--border-dark)' }}>→</span>
              to navigate
            </div>
          </>
        )}
      </div>
    </div>
  );
}
