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
  Moon,
  Layers,
  Monitor
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Rankboard';
import Flashcards from './components/Flashcards';
import { ErrorBoundary } from './components/ErrorBoundary';
import Resources from './components/Resources';
import Forum from './components/Forum';
import QuickNotes from './components/QuickNotes';
import ProgressRing from './components/ProgressRing';
import Celebration from './components/Celebration';
import CanvasBackground from './components/CanvasBackground';
import SneakyAlien from './components/SneakyAlien';
import ProfileMenu from './components/ProfileMenu';
import { sepmSyllabusData } from './data/sepmData';
import { compilerDesignSyllabusData } from './data/compilerDesignData';
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
          { id: 'u1_m1_t3', name: 'The Data Science Process', completed: false, important: true }
        ]
      },
      {
        id: 'm2',
        name: 'Facets of Data',
        topics: [
          { id: 'u1_m2_t1', name: 'Structured vs Unstructured data', completed: false, important: true },
          { id: 'u1_m2_t2', name: 'Natural Language & NLP', completed: false, important: true },
          { id: 'u1_m2_t3', name: 'Machine-generated & Graph data', completed: false, important: true },
          { id: 'u1_m2_t4', name: 'Audio, Video, and Images.', completed: false, important: true },
          { id: 'u1_m2_t5', name: 'Streaming data.', completed: false, important: true }
        ]
      },
      {
        id: 'm3',
        name: 'Data Acquisition',
        topics: [
          { id: 'u1_m3_t1', name: 'Web APIs and Open Data Sources', completed: false, important: true },
          { id: 'u1_m3_t2', name: 'Web Scraping', completed: false, important: true }
        ]
      },
      {
        id: 'm4',
        name: 'NumPy Computing',
        topics: [
          { id: 'u1_m4_t1', name: 'NumPy ndarray features & creation', completed: false, important: true },
          { id: 'u1_m4_t2', name: 'Array shape manipulation & Indexing', completed: false, important: true },
          { id: 'u1_m4_t3', name: 'Array operations and Vectorization', completed: false }
        ]
      },
      {
        id: 'm5',
        name: 'Pandas Manipulation',
        topics: [
          { id: 'u1_m5_t1', name: 'Series and DataFrames', completed: false, important: true },
          { id: 'u1_m5_t2', name: 'Indexing, Selection, & Dropping', completed: false, important: true },
          { id: 'u1_m5_t3', name: 'Sorting, Ranking, & NaN handling', completed: false },
          { id: 'u1_m5_t4', name: 'Summary Statistics & Index Hierarchy', completed: false, important: true }
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
          { id: 'u2_m6_t1', name: 'Online Learning vs Batch', completed: false, important: true },
          { id: 'u2_m6_t2', name: 'MapReduce & Parallelization', completed: false, important: true },
          { id: 'u2_m6_t3', name: 'Python tools (Dask, Numba, etc.)', completed: false, important: true }
        ]
      },
      {
        id: 'm7',
        name: 'Wrangling Process & Cleaning',
        topics: [
          { id: 'u2_m7_t1', name: 'Wrangling Steps & Use Cases', completed: false },
          { id: 'u2_m7_t2', name: 'Handling Missing Data', completed: false, important: true },
          { id: 'u2_m7_t3', name: 'Data Transformation & Strings', completed: false, important: true },
          { id: 'u2_m7_t4', name: 'Discretization, Standardization, Outliers', completed: false, important: true }
        ]
      },
      {
        id: 'm8',
        name: 'Merging & Reshaping',
        topics: [
          { id: 'u2_m8_t1', name: 'Merging and Concatenating', completed: false, important: true },
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
          { id: 'u3_m10_t2', name: 'Subplots & Controlling ticks/labels', completed: false, important: true },
          { id: 'u3_m10_t3', name: 'Legends, Annotations, Saving plots', completed: false, important: true }
        ]
      },
      {
        id: 'm11',
        name: 'Seaborn & Plot Types',
        topics: [
          { id: 'u3_m11_t1', name: 'Seaborn styles and themes', completed: false },
          { id: 'u3_m11_t2', name: 'Line, Scatter, Histograms, Boxplots', completed: false, important: true },
          { id: 'u3_m11_t3', name: 'Pair Plots, Joint Plots, FacetGrid', completed: false, important: true },
          { id: 'u3_m11_t4', name: '3D Plotting & Text Annotations', completed: false, important: true }
        ]
      }
    ]
  }
];

// Build a lookup map of topic ID -> important flag from all static course data
const importantTopicIds = new Set();
[initialSubjectsData, sepmSyllabusData, compilerDesignSyllabusData].forEach(units => {
  if (!Array.isArray(units)) return;
  units.forEach(unit => {
    unit.modules?.forEach(module => {
      module.topics?.forEach(topic => {
        if (topic.important) importantTopicIds.add(topic.id);
      });
    });
  });
});

// Merge the important flag from static data into loaded courses (from Firestore/localStorage)
const mergeImportantFlags = (courses) => {
  if (!Array.isArray(courses)) return courses;
  return courses.map(course => ({
    ...course,
    units: course.units.map(unit => ({
      ...unit,
      modules: (unit.modules || []).map(module => ({
        ...module,
        topics: (module.topics || []).map(topic => ({
          ...topic,
          important: importantTopicIds.has(topic.id) || false
        }))
      }))
    }))
  }));
};

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
  const [currentCourseIndex, setCurrentCourseIndex] = useState(1);
  
  const defaultCourses = [
    { id: 'c1', name: 'Data Science', units: initialSubjectsData },
    { id: 'c2', name: 'SEPM', units: sepmSyllabusData },
    { id: 'c3', name: 'Compiler Design', units: compilerDesignSyllabusData }
  ];

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('eh_courses');
    if (saved) {
      let parsed = JSON.parse(saved);
      // Force update Compiler Design if it doesn't have all 5 units
      parsed = parsed.map(c => {
        if (c.id === 'c3' && (!c.units || c.units.length < 5)) {
          return { ...c, units: compilerDesignSyllabusData };
        }
        return c;
      });
      return mergeImportantFlags(parsed);
    }
    return defaultCourses;
  });

  const [showTimer, setShowTimer] = useState(true);
  
  const [examTimers, setExamTimers] = useState(calculateTimers());
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('eh_darkMode');
    return saved === 'true';
  });
  
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('eh_profileName') || getRandomProfile();
  });
  const [avatarParams, setAvatarParams] = useState(() => {
    const saved = localStorage.getItem('eh_avatar');
    return saved ? JSON.parse(saved) : getRandomAvatar();
  });
  
  const [currentUser, setCurrentUser] = useState(null);
  
  // Flag to prevent background sync from overwriting Firestore data before it's loaded
  const [firestoreLoaded, setFirestoreLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem('eh_profileName', profileName);
    localStorage.setItem('eh_avatar', JSON.stringify(avatarParams));
    localStorage.setItem('eh_courses', JSON.stringify(courses));
  }, [profileName, avatarParams, courses]);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('eh_darkMode', isDarkMode);
  }, [isDarkMode]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const contentRef = useRef(null);

  const navItems = [
    { id: 'dashboard', label: 'Checklist', icon: CheckSquare },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
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

  // Sync Timer to Document Title (Browser Tab)
  useEffect(() => {
    const timer = examTimers.find(t => t.courseId === currentCourse.id);
    if (timer && !timer.isPast) {
      document.title = `${timer.days}d ${timer.hours}h ${timer.minutes}m ${timer.seconds}s - WeGrind`;
    } else {
      document.title = "WeGrind - Exam Helper";
    }
  }, [examTimers, currentCourse.id]);

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

  const gameHighScore = parseInt(localStorage.getItem('spaceShooterHighScore') || '0', 10);

  // Handle Auth state and load/save user data from Firestore
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowMobileWarning(true);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setFirestoreLoaded(false); // Reset on auth change
      
      if (user) {
        setDeviceId(user.uid);
        try {
          const docRef = doc(db, 'leaderboard', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            // Always restore profile from Firestore if available
            if (data.name) setProfileName(data.name);
            if (data.avatarParams) setAvatarParams(data.avatarParams);

            // Always restore courses from Firestore if they exist and have content
            if (Array.isArray(data.courses) && data.courses.length > 0) {
              let parsedCourses = data.courses.map(c => {
                if (c.id === 'c3' && (!c.units || c.units.length < 5)) {
                  return { ...c, units: compilerDesignSyllabusData };
                }
                return c;
              });
              setCourses(mergeImportantFlags(parsedCourses));
            }
          } else {
            // First-time user: save current local state to Firestore
            const currentLocalCourses = JSON.parse(localStorage.getItem('eh_courses') || 'null');
            const coursesToSave = Array.isArray(currentLocalCourses) && currentLocalCourses.length > 0
              ? currentLocalCourses
              : defaultCourses;
            
            await setDoc(docRef, {
              id: user.uid,
              name: profileName,
              points: userSyllabusPoints,
              gameScore: gameHighScore,
              avatarParams,
              courses: coursesToSave,
              lastActive: serverTimestamp()
            }, { merge: true });
          }
        } catch (e) {
          console.error('Failed to load or initialize user data from Firestore', e);
        }
        
        // Mark Firestore as loaded so background sync can start
        setFirestoreLoaded(true);
      } else {
        // User logged out — clear saved course progress from localStorage
        // so stale data doesn't get synced under an anonymous ID
        localStorage.removeItem('eh_courses');
        
        // Reset to fresh default courses
        setCourses(defaultCourses);
        
        // Generate/restore anonymous device ID
        let id = localStorage.getItem('exam_helper_device_id');
        if (!id) {
          id = 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
          localStorage.setItem('exam_helper_device_id', id);
        }
        setDeviceId(id);
        
        // Restore anonymous profile
        const savedName = localStorage.getItem('eh_profileName');
        if (savedName) setProfileName(savedName);
        const savedAvatar = localStorage.getItem('eh_avatar');
        if (savedAvatar) setAvatarParams(JSON.parse(savedAvatar));
        
        setFirestoreLoaded(true);
      }
    });
    return () => unsubscribe();
  }, []);

  // Silent Background Sync to Leaderboard — only after Firestore data is loaded
  useEffect(() => {
    if (!deviceId || !profileName || !firestoreLoaded) return;

    const saveLeaderboard = async () => {
      try {
        const userRef = doc(db, 'leaderboard', deviceId);
        await setDoc(userRef, {
          id: deviceId,
          name: profileName,
          points: userSyllabusPoints,
          gameScore: gameHighScore,
          avatarParams: avatarParams,
          courses: courses,
          lastActive: serverTimestamp()
        }, { merge: true });
      } catch (e) {
        console.error('Leaderboard sync failed', e);
      }
    };

    saveLeaderboard();
  }, [deviceId, profileName, userSyllabusPoints, gameHighScore, avatarParams, courses, firestoreLoaded]);

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard subjects={currentCourse.units} toggleTopic={toggleTopic} />;
      case 'flashcards': return <Flashcards />;
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
      <QuickNotes />
      
      <aside className="sidebar">
        <div className="sidebar-logo" style={{ paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: '900', fontFamily: 'Outfit', fontSize: '2.5rem', letterSpacing: '-1px' }}>WeGrind.</span>
          
          {/* Mobile User Profile */}
          <div className="user-profile mobile-only" style={{ display: 'none', gap: '0.75rem' }}>
            <button className="btn-icon" onClick={() => setIsDarkMode(!isDarkMode)} style={{ width: '36px', height: '36px' }}>
              {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
            </button>
            <ProfileMenu 
              profileName={profileName} 
              setProfileName={setProfileName}
              avatarParams={avatarParams} 
              setAvatarParams={setAvatarParams} 
              small={true}
            />
          </div>
        </div>
        
        <nav className="nav-links">
          {navItems.map(item => (
            <button 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''} ${item.id === 'flashcards' ? 'hide-on-mobile' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hide-on-mobile" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          
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

          <div className="user-profile desktop-only">
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

      {showMobileWarning && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(8px)' }}>
          <div className="doodle-panel" style={{ padding: '2.5rem 1.5rem', textAlign: 'center', maxWidth: '380px', width: '90%', border: '4px solid var(--google-red)', boxShadow: '8px 8px 0px var(--google-red)', background: 'var(--panel-bg)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--google-red)', color: 'white', padding: '1.25rem', borderRadius: '50%', border: '3px solid var(--border-dark)', boxShadow: '4px 4px 0px var(--border-dark)' }}>
                <Monitor size={48} strokeWidth={2.5} />
              </div>
            </div>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: '900', color: 'var(--google-red)' }}>ATTENTION</h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '700', lineHeight: 1.4 }}>
              WeGrind is strictly designed for larger screens! 
              <br/><br/>
              Please open this site on a <strong>PC or Tablet</strong> to access <strong>Flashcards</strong>, <strong>Games</strong>, and the full study experience.
            </p>
            <button className="btn-primary" onClick={() => setShowMobileWarning(false)} style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', background: 'var(--text-primary)', color: 'var(--bg-primary)' }}>Got it, I'll switch later</button>
          </div>
        </div>
      )}

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

        <p style={{ marginBottom: '0.25rem' }}>© {new Date().getFullYear()} WeGrind.</p>
        <p style={{ pointerEvents: 'auto' }}>Built by <a href="https://github.com/defaultcrosshair" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontWeight: '800' }}>@defaultcrosshair</a></p>
      </div>

    </div>
  );
}
