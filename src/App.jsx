import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  CheckSquare, 
  Trophy, 
  FileText, 
  MessageSquare, 
  Sparkles,
  Bell,
  Search,
  Clock,
  ToggleLeft,
  ToggleRight,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Rankboard';
import { ErrorBoundary } from './components/ErrorBoundary';
import Resources from './components/Resources';
import Forum from './components/Forum';
import ProgressRing from './components/ProgressRing';
import Celebration from './components/Celebration';
import CanvasBackground from './components/CanvasBackground';
import SneakyAlien from './components/SneakyAlien';
import ProfileMenu from './components/ProfileMenu';
import { sepmSyllabusData } from './data/sepmData';
import { db, auth } from './firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const ADJECTIVES = ["Sleepy", "Hyper", "Caffeinated", "Lazy", "Genius", "Panicking", "Creative", "Bored", "Hacking"];
const NOUNS = ["Coder", "Student", "Scholar", "Ninja", "Doodle", "T-Rex", "Master", "Wizard", "Debug"];

const getRandomProfile = () => {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  return `${adj} ${noun}`;
};

const getRandomAvatar = () => ({
  eyeIndex: Math.floor(Math.random() * 11),
  mouthIndex: Math.floor(Math.random() * 9),
  hatIndex: Math.floor(Math.random() * 13)
});

const initialSubjectsData = [
  {
    id: 1,
    name: 'Unit 1: Intro to Data Science',
    progress: 0,
    modules: [
      {
        id: 'm1',
        name: 'Overview of Data Science',
        topics: [
          { id: 'u1_m1_t1', name: 'Benefits and uses of Data Science.', completed: false },
          { id: 'u1_m1_t2', name: 'Big Data vs. Data Science.', completed: false },
          { id: 'u1_m1_t3', name: 'The Data Science Process', completed: false }
        ]
      },
      {
        id: 'm2',
        name: 'Facets of Data',
        topics: [
          { id: 'u1_m2_t1', name: 'Structured vs Unstructured data', completed: false },
          { id: 'u1_m2_t2', name: 'Natural Language & NLP', completed: false },
          { id: 'u1_m2_t3', name: 'Machine-generated & Graph data', completed: false },
          { id: 'u1_m2_t4', name: 'Audio, Video, and Images.', completed: false },
          { id: 'u1_m2_t5', name: 'Streaming data.', completed: false }
        ]
      },
      {
        id: 'm3',
        name: 'Data Acquisition',
        topics: [
          { id: 'u1_m3_t1', name: 'Web APIs and Open Data Sources', completed: false },
          { id: 'u1_m3_t2', name: 'Web Scraping', completed: false }
        ]
      },
      {
        id: 'm4',
        name: 'NumPy Computing',
        topics: [
          { id: 'u1_m4_t1', name: 'NumPy ndarray features & creation', completed: false },
          { id: 'u1_m4_t2', name: 'Array shape manipulation & Indexing', completed: false },
          { id: 'u1_m4_t3', name: 'Array operations and Vectorization', completed: false }
        ]
      },
      {
        id: 'm5',
        name: 'Pandas Manipulation',
        topics: [
          { id: 'u1_m5_t1', name: 'Series and DataFrames', completed: false },
          { id: 'u1_m5_t2', name: 'Indexing, Selection, & Dropping', completed: false },
          { id: 'u1_m5_t3', name: 'Sorting, Ranking, & NaN handling', completed: false },
          { id: 'u1_m5_t4', name: 'Summary Statistics & Index Hierarchy', completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Unit 2: Data Wrangling',
    progress: 0,
    modules: [
      {
        id: 'm6',
        name: 'Handling Large Datasets',
        topics: [
          { id: 'u2_m6_t1', name: 'Online Learning vs Batch', completed: false },
          { id: 'u2_m6_t2', name: 'MapReduce & Parallelization', completed: false },
          { id: 'u2_m6_t3', name: 'Python tools (Dask, Numba, etc.)', completed: false }
        ]
      },
      {
        id: 'm7',
        name: 'Wrangling Process & Cleaning',
        topics: [
          { id: 'u2_m7_t1', name: 'Wrangling Steps & Use Cases', completed: false },
          { id: 'u2_m7_t2', name: 'Handling Missing Data', completed: false },
          { id: 'u2_m7_t3', name: 'Data Transformation & Strings', completed: false },
          { id: 'u2_m7_t4', name: 'Discretization, Standardization, Outliers', completed: false }
        ]
      },
      {
        id: 'm8',
        name: 'Merging & Reshaping',
        topics: [
          { id: 'u2_m8_t1', name: 'Merging and Concatenating', completed: false },
          { id: 'u2_m8_t2', name: 'Pivoting, Melting, Stacking', completed: false }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Unit 3: Data Visualization',
    progress: 0,
    modules: [
      {
        id: 'm10',
        name: 'Matplotlib',
        topics: [
          { id: 'u3_m10_t1', name: 'Pyplot, Figure, and Axes', completed: false },
          { id: 'u3_m10_t2', name: 'Subplots & Controlling ticks/labels', completed: false },
          { id: 'u3_m10_t3', name: 'Legends, Annotations, Saving plots', completed: false }
        ]
      },
      {
        id: 'm11',
        name: 'Seaborn & Plot Types',
        topics: [
          { id: 'u3_m11_t1', name: 'Seaborn styles and themes', completed: false },
          { id: 'u3_m11_t2', name: 'Line, Scatter, Histograms, Boxplots', completed: false },
          { id: 'u3_m11_t3', name: 'Pair Plots, Joint Plots, FacetGrid', completed: false },
          { id: 'u3_m11_t4', name: '3D Plotting & Text Annotations', completed: false }
        ]
      }
    ]
  }
];

const EXAMS = [
  { courseId: 'c1', name: 'Data Science', date: new Date('2026-05-12T14:00:00+05:30'), start: new Date('2026-05-01T00:00:00+05:30') },
  { courseId: 'c2', name: 'SEPM', date: new Date('2026-05-15T10:00:00+05:30'), start: new Date('2026-05-01T00:00:00+05:30') },
  { courseId: 'c3', name: 'Compiler Design', date: new Date('2026-05-16T10:00:00+05:30'), start: new Date('2026-05-01T00:00:00+05:30') }
];

const calculateTimers = () => {
  const now = new Date();
  return EXAMS.map(exam => {
    const difference = exam.date - now;
    const totalDuration = exam.date - exam.start;
    const elapsed = now - exam.start;
    
    let progress = 0;
    if (elapsed > 0) {
      progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    }

    if (difference <= 0) {
      return { ...exam, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, progress: 100 };
    }

    return {
      ...exam,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
      progress
    };
  });
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('eh_courses');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'c1', name: 'Data Science', units: initialSubjectsData },
      { id: 'c2', name: 'SEPM', units: sepmSyllabusData },
      { id: 'c3', name: 'Compiler Design', units: [
        { id: 'cd_u1', name: 'Syllabus Coming Soon...', progress: 0, modules: [] }
      ]}
    ];
  });

  const [showTimer, setShowTimer] = useState(true);
  
  const [examTimers, setExamTimers] = useState(calculateTimers());
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('eh_profileName') || getRandomProfile();
  });
  const [avatarParams, setAvatarParams] = useState(() => {
    const saved = localStorage.getItem('eh_avatar');
    return saved ? JSON.parse(saved) : getRandomAvatar();
  });
  
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem('eh_profileName', profileName);
      localStorage.setItem('eh_avatar', JSON.stringify(avatarParams));
      localStorage.setItem('eh_courses', JSON.stringify(courses));
    }
  }, [profileName, avatarParams, courses, currentUser]);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const contentRef = useRef(null);

  const navItems = [
    { id: 'dashboard', label: 'Checklist', icon: CheckSquare },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'resources', label: 'Resources', icon: FileText },
    { id: 'forum', label: 'Community', icon: MessageSquare },
  ];

  // Calculate Overall Progress for current course
  const currentCourse = courses[currentCourseIndex];
  const totalTopics = currentCourse.units.reduce((acc, unit) => acc + unit.modules.reduce((mAcc, m) => mAcc + m.topics.length, 0), 0);
  const completedTopics = currentCourse.units.reduce((acc, unit) => acc + unit.modules.reduce((mAcc, m) => mAcc + m.topics.filter(t => t.completed).length, 0), 0);
  const overallProgress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  // Celebration Logic
  useEffect(() => {
    if (overallProgress === 100 && totalTopics > 0 && !hasCelebrated) {
      setShowCelebration(true);
      setHasCelebrated(true);
    } else if (overallProgress < 100) {
      setHasCelebrated(false);
    }
  }, [overallProgress, hasCelebrated, totalTopics]);

  // Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setExamTimers(calculateTimers());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // GSAP Tab Transition
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab, currentCourseIndex]);

  const toggleTopic = (unitId, moduleId, topicId) => {
    setCourses(prev => prev.map((course, cIdx) => {
      if (cIdx !== currentCourseIndex) return course;
      
      const newUnits = course.units.map(unit => {
        if (unit.id !== unitId) return unit;
        
        const newModules = unit.modules.map(module => {
          if (module.id !== moduleId) return module;
          const newTopics = module.topics.map(topic => 
            topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
          );
          return { ...module, topics: newTopics };
        });
        
        let completedCount = 0;
        let totalCount = 0;
        newModules.forEach(m => {
          totalCount += m.topics.length;
          completedCount += m.topics.filter(t => t.completed).length;
        });
        const newProgress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
        
        return { ...unit, modules: newModules, progress: newProgress };
      });
      return { ...course, units: newUnits };
    }));
  };

  const userSyllabusPoints = courses.reduce((acc, course) => 
    acc + course.units.reduce((uAcc, unit) => 
      uAcc + unit.modules.reduce((mAcc, module) => 
        mAcc + module.topics.filter(t => t.completed).length * 10
      , 0)
    , 0)
  , 0);

  const [deviceId, setDeviceId] = useState('');

  // Generate anonymous device ID and handle Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        setDeviceId(user.uid);
        try {
          const docRef = doc(db, 'leaderboard', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.name) setProfileName(data.name);
            if (data.avatarParams) setAvatarParams(data.avatarParams);
            if (data.courses) setCourses(data.courses);
          }
        } catch (e) {}
      } else {
        let id = localStorage.getItem('exam_helper_device_id');
        if (!id) {
          id = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
          localStorage.setItem('exam_helper_device_id', id);
        }
        setDeviceId(id);
        
        const savedName = localStorage.getItem('eh_profileName');
        if (savedName) setProfileName(savedName);
        const savedAvatar = localStorage.getItem('eh_avatar');
        if (savedAvatar) setAvatarParams(JSON.parse(savedAvatar));
        const savedCourses = localStorage.getItem('eh_courses');
        if (savedCourses) setCourses(JSON.parse(savedCourses));
      }
    });
    return () => unsubscribe();
  }, []);

  const gameHighScore = parseInt(localStorage.getItem('spaceShooterHighScore') || '0', 10);

  // Silent Background Sync to Leaderboard
  useEffect(() => {
    if (!deviceId || !profileName) return;
    if (!currentUser) return; // Only save to leaderboard if logged in
    
    try {
      const userRef = doc(db, 'leaderboard', deviceId);
      setDoc(userRef, {
        id: deviceId,
        name: profileName,
        points: userSyllabusPoints,
        gameScore: gameHighScore,
        avatarParams: avatarParams,
        courses: courses,
        lastActive: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      // Fail silently
    }
  }, [deviceId, profileName, userSyllabusPoints, gameHighScore, avatarParams, courses, currentUser]);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard subjects={currentCourse.units} toggleTopic={toggleTopic} />;
      case 'leaderboard': return (
        <ErrorBoundary>
          <Leaderboard profileName={profileName} avatarParams={avatarParams} userSyllabusPoints={userSyllabusPoints} deviceId={deviceId} />
        </ErrorBoundary>
      );
      case 'resources': return <Resources />;
      case 'forum': return <Forum />;
      default: return <Dashboard subjects={currentCourse.units} toggleTopic={toggleTopic} />;
    }
  };

  return (
    <div className="app-container">
      <CanvasBackground isDarkMode={isDarkMode} />
      <SneakyAlien isDarkMode={isDarkMode} />
      {showCelebration && <Celebration onComplete={() => setShowCelebration(false)} />}
      
      <aside className="sidebar">
        <div className="sidebar-logo" style={{ paddingBottom: '1rem' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: '900', fontFamily: 'Outfit', fontSize: '2.5rem', letterSpacing: '-1px' }}>WeGrind.</span>
        </div>
        
        <nav className="nav-links">
          {navItems.map(item => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <ProgressRing width={200} height={90} stroke={14} progress={overallProgress} color="var(--google-blue)" />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall Progress</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit' }}>{currentCourse.name}</div>
            </div>
          </div>

          <div className="doodle-panel" style={{ padding: '1rem', marginBottom: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                <Clock size={16} color="var(--google-red)" /> 
                Exam Countdown
              </h4>
              <button 
                onClick={() => setShowTimer(!showTimer)}
                style={{ color: showTimer ? 'var(--google-green)' : 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {showTimer ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
              </button>
            </div>
            
            {showTimer && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {(() => {
                  const timer = examTimers.find(t => t.courseId === currentCourse.id);
                  if (!timer) return <div style={{ color: 'var(--text-secondary)' }}>No exam scheduled.</div>;
                  
                  return (
                    <div key={timer.name}>
                      <div style={{ fontSize: '0.75rem', fontWeight: '800', marginBottom: '0.25rem', color: timer.isPast ? 'var(--google-green)' : 'var(--text-primary)' }}>
                        {timer.name} {timer.isPast && '✅'}
                      </div>
                      <div style={{ display: 'flex', gap: '0.2rem', justifyContent: 'space-between', opacity: timer.isPast ? 0.5 : 1 }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'Outfit' }}>{String(timer.days).padStart(2, '0')}</div>
                          <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '700' }}>DAYS</div>
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>:</div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'Outfit' }}>{String(timer.hours).padStart(2, '0')}</div>
                          <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '700' }}>HRS</div>
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>:</div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'Outfit' }}>{String(timer.minutes).padStart(2, '0')}</div>
                          <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '700' }}>MIN</div>
                        </div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)' }}>:</div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.95rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--google-red)' }}>{String(timer.seconds).padStart(2, '0')}</div>
                          <div style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', fontWeight: '700' }}>SEC</div>
                        </div>
                      </div>
                      
                      <div style={{ height: '4px', background: 'var(--bg-secondary)', border: '2px solid var(--border-dark)', borderRadius: 'var(--radius-full)', marginTop: '0.5rem', overflow: 'hidden' }}>
                        <div style={{ 
                          height: '100%', 
                          width: `${timer.progress}%`, 
                          background: timer.isPast ? 'var(--google-green)' : 'var(--google-blue)',
                          borderRight: timer.progress > 0 ? '2px solid var(--border-dark)' : 'none',
                          transition: 'width 1s linear'
                        }} />
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            {activeTab === 'dashboard' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <button 
                  onClick={() => setCurrentCourseIndex(prev => Math.max(0, prev - 1))}
                  className="btn-icon"
                  disabled={currentCourseIndex === 0}
                  style={{ 
                    opacity: currentCourseIndex === 0 ? 0.3 : 1,
                    width: '40px', height: '40px',
                    border: '3px solid var(--border-dark)'
                  }}
                >
                  <ChevronLeft size={24} strokeWidth={3} />
                </button>
                
                <div>
                  <h1 style={{ fontSize: '2.5rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>
                    {currentCourse.name}
                  </h1>
                </div>

                <button 
                  onClick={() => setCurrentCourseIndex(prev => Math.min(courses.length - 1, prev + 1))}
                  className="btn-icon"
                  disabled={currentCourseIndex === courses.length - 1}
                  style={{ 
                    opacity: currentCourseIndex === courses.length - 1 ? 0.3 : 1,
                    width: '40px', height: '40px',
                    border: '3px solid var(--border-dark)'
                  }}
                >
                  <ChevronRight size={24} strokeWidth={3} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', height: '40px' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1 }}>
                  {navItems.find(i => i.id === activeTab)?.label}
                </h1>
              </div>
            )}
          </div>

          <div className="user-profile">
            <button className="btn-icon" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
            </button>
            <ProfileMenu 
              profileName={profileName} 
              setProfileName={setProfileName}
              avatarParams={avatarParams} 
              setAvatarParams={setAvatarParams} 
            />
          </div>
        </header>

        <div ref={contentRef} key={activeTab}>
          {renderContent()}
        </div>
      </main>

      {/* Floating Footer Disclaimer */}
      <div style={{ 
        position: 'fixed', 
        bottom: '1rem', 
        right: '1.5rem', 
        textAlign: 'right', 
        fontSize: '0.65rem', 
        color: 'var(--text-secondary)', 
        fontWeight: '600', 
        lineHeight: '1.4', 
        zIndex: 10,
        opacity: 0.7,
        pointerEvents: 'none'
      }}>
        <p style={{ marginBottom: '0.25rem' }}>⚠️ <strong>Disclaimer:</strong> Verify with official materials.</p>
        <p style={{ marginBottom: '0.25rem' }}>© {new Date().getFullYear()} WeGrind.</p>
        <p style={{ pointerEvents: 'auto' }}>Built by <a href="https://github.com/defaultcrosshair" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: '800' }}>@defaultcrosshair</a></p>
      </div>

    </div>
  );
}
