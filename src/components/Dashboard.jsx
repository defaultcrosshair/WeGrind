import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from 'lucide-react';

function SubjectCard({ subject, index, toggleTopic }) {
  const barWrapperRef = useRef(null);
  const barFillRef = useRef(null);
  const prevProgress = useRef(subject.progress);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    // If progress increased, trigger a swelling effect
    if (subject.progress > prevProgress.current) {
      const tl = gsap.timeline();
      // Swell up
      tl.to(barWrapperRef.current, { height: '14px', duration: 0.15, ease: 'power1.out' })
        // Snap back with elasticity
        .to(barWrapperRef.current, { height: '8px', duration: 0.6, ease: 'elastic.out(1, 0.3)' });
    }
    prevProgress.current = subject.progress;
  }, [subject.progress]);

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const colorArray = ['var(--google-blue)', 'var(--google-red)', 'var(--google-yellow)', 'var(--google-green)', 'var(--google-purple)'];
  const colorIndex = index !== undefined ? index : (typeof subject.id === 'number' ? subject.id - 1 : 0);
  const progressColor = colorArray[colorIndex % colorArray.length];

  return (
    <div className="doodle-panel" style={{ padding: '1.5rem', alignSelf: 'start' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', paddingRight: '1rem' }}>{subject.name}</h3>
        <span style={{ 
          background: progressColor, 
          color: 'white',
          padding: '0.25rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.875rem',
          fontWeight: '700',
          border: '2px solid var(--border-dark)',
          boxShadow: '2px 2px 0px var(--border-dark)',
          flexShrink: 0
        }}>
          {subject.progress}%
        </span>
      </div>

      <div 
        ref={barWrapperRef}
        style={{ height: '8px', background: 'var(--bg-secondary)', border: '2px solid var(--border-dark)', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        <div 
          ref={barFillRef}
          style={{ 
            height: '100%', 
            width: `${subject.progress}%`, 
            background: progressColor,
            borderRight: subject.progress > 0 ? '2px solid var(--border-dark)' : 'none',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {subject.modules.map((module) => {
          const isExpanded = !!expandedModules[module.id];
          const moduleCompleted = module.topics.every(t => t.completed) && module.topics.length > 0;

          return (
            <div key={module.id} style={{ border: '2px solid var(--border-dark)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              
              {/* Module Header (Dropdown Toggle) */}
              <div 
                className={`module-header ${moduleCompleted ? 'completed' : ''}`}
                onClick={() => toggleModule(module.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: moduleCompleted ? 'var(--completed-bg)' : 'var(--bg-secondary)',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}>
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  <span style={{ color: moduleCompleted ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: moduleCompleted ? 'line-through' : 'none' }}>
                    {module.name}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-secondary)' }}>
                  {module.topics.filter(t => t.completed).length} / {module.topics.length}
                </div>
              </div>

              {/* Topics List */}
              {isExpanded && (
                <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', borderTop: '2px solid var(--border-dark)' }}>
                  {module.topics.map(topic => (
                    <div 
                      key={topic.id}
                      onClick={() => toggleTopic(subject.id, module.id, topic.id)}
                      className={`topic-item ${topic.completed ? 'completed' : ''}`}
                      style={{ border: 'none', boxShadow: 'none', padding: '0.75rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                        {topic.completed ? (
                          <CheckCircle2 size={24} className="tick-icon" strokeWidth={3} />
                        ) : (
                          <Circle color="var(--border-dark)" size={24} strokeWidth={2} />
                        )}
                      </div>
                      <span className={`topic-text ${topic.completed ? 'completed' : ''}`} style={{ fontSize: '0.9rem' }}>
                        {topic.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard({ subjects, toggleTopic }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div ref={containerRef} style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
      {subjects.map((subject, index) => (
        <SubjectCard key={subject.id} subject={subject} index={index} toggleTopic={toggleTopic} />
      ))}
    </div>
  );
}
