import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { FileText, Download, ExternalLink, Star, Plus, X, Upload, File } from 'lucide-react';
import { auth, provider, db } from '../firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from 'firebase/firestore';

export default function Resources() {
  const gridRef = useRef(null);
  const fileInputRef = useRef(null);
  const [resources, setResources] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState('All Subjects');
  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Data Science');
  const [link, setLink] = useState('');

  // Setup Auth Listener
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Firebase Auth error - Keys probably missing");
    }
  }, []);

  // Fetch Resources Live
  useEffect(() => {
    try {
      const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setResources(fetched);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Firestore error - Keys probably missing");
    }
  }, []);

  // GSAP animation for grid items
  useEffect(() => {
    if (gridRef.current && resources.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)" }
      );
    }
  }, [resources.length]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setShowModal(true); // Open modal automatically after login
    } catch (error) {
      alert("Login Failed: Please make sure your Firebase keys are configured in firebase.js");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert('Please provide a title');
    if (!link) return alert('Please provide a link');
    
    setIsSubmitting(true);
    
    try {

      // Determine color based on category
      let color = 'var(--google-blue)';
      if (category === 'SEPM') color = 'var(--google-purple)';
      if (category === 'Compiler Design') color = 'var(--google-red)';
      if (category === 'General') color = 'var(--google-green)';
      
      await addDoc(collection(db, 'resources'), {
        title,
        category,
        type: 'Link',
        link: link,
        size: '--',
        author: user.displayName || 'Anonymous',
        authorId: user.uid,
        rating: 5.0, // Default rating
        color,
        createdAt: serverTimestamp()
      });
      
      // Reset and close
      setTitle('');
      setLink('');
      setShowModal(false);
    } catch (error) {
      alert("Post Failed: Check your network and try again");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <FileText color="var(--google-blue)" strokeWidth={3} />
          Study Materials
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ 
            background: 'var(--bg-primary)', 
            border: '3px solid var(--border-dark)', 
            color: 'var(--text-primary)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-full)',
            outline: 'none',
            fontFamily: 'inherit',
            fontWeight: '700',
            boxShadow: '2px 2px 0px var(--border-dark)',
            cursor: 'pointer'
          }}>
            <option>All Subjects</option>
            <option>Data Science</option>
            <option>SEPM</option>
            <option>Compiler Design</option>
            <option>General</option>
          </select>
          {user ? (
            <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setShowModal(true)}>
              <Plus size={18} strokeWidth={3} /> Add Resource
            </button>
          ) : (
            <button className="btn-primary" style={{ padding: '0.5rem 1.5rem', background: 'var(--google-blue)', color: 'white' }} onClick={handleLogin}>
              Sign in to Contribute
            </button>
          )}
        </div>
      </div>

      {resources.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</div>
          <p style={{ fontWeight: '600' }}>No resources posted yet. Be the first!</p>
        </div>
      ) : (
        <div ref={gridRef} style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
          {(filter === 'All Subjects' ? resources : resources.filter(r => r.category === filter)).map(resource => (
            <div key={resource.id} className="doodle-panel" onClick={() => window.open(resource.link, '_blank')} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ 
                  background: resource.color, 
                  color: resource.color === 'var(--google-yellow)' ? 'var(--text-primary)' : 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: '800',
                  border: '2px solid var(--border-dark)',
                  boxShadow: '2px 2px 0px var(--border-dark)'
                }}>
                  {resource.type}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: '700' }}>
                  <Star size={16} fill="var(--google-yellow)" strokeWidth={2} /> {resource.rating}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {resource.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '600' }}>
                  {resource.category} • {resource.size}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '3px solid var(--border-dark)' }}>
                <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>
                  {resource.author.substring(0, 2).toUpperCase()}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: '700' }}>{resource.author}</span>
                
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                  {user && (user.uid === resource.authorId || user.displayName === resource.author) && (
                    <button 
                      className="btn-icon" 
                      style={{ width: '36px', height: '36px', background: 'var(--google-red)', color: 'white' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this resource?')) {
                          import('firebase/firestore').then(({ doc, deleteDoc }) => {
                            deleteDoc(doc(db, 'resources', resource.id));
                          });
                        }
                      }}
                    >
                      <X size={18} strokeWidth={2.5} />
                    </button>
                  )}
                  <button className="btn-icon" style={{ width: '36px', height: '36px' }}>
                    {resource.type === 'Link' ? <ExternalLink size={18} strokeWidth={2.5} /> : <Download size={18} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal via Portal for perfect centering */}
      {showModal && createPortal(
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div className="doodle-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', background: 'var(--panel-bg)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>Share a Resource</h3>
              <button className="btn-icon" onClick={() => {
                setShowModal(false);
                setFile(null);
                setLink('');
                setTitle('');
              }}><X size={20} strokeWidth={3} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem' }}>Resource Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. OS Final Notes 2024"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-dark)', fontFamily: 'inherit', fontWeight: '500', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem' }}>Subject Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-dark)', fontFamily: 'inherit', fontWeight: '600', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                    <option>Data Science</option>
                    <option>SEPM</option>
                    <option>Compiler Design</option>
                    <option>General</option>
                  </select>
                </div>
              </div>

              <div className="doodle-panel" style={{ padding: '1.5rem', background: 'var(--bg-primary)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', marginBottom: '0.75rem' }}>
                  <ExternalLink size={18} color="var(--google-blue)" strokeWidth={3} />
                  External Resource Link
                </label>
                <input 
                  type="url" 
                  value={link} 
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://drive.google.com/share/..."
                  style={{ width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', border: '3px solid var(--border-dark)', fontFamily: 'inherit', fontWeight: '600', background: 'white', color: 'black', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05)' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.75rem', fontWeight: '600' }}>
                  Paste a link to Google Drive, Dropbox, Notion, or any other site.
                </p>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                {isSubmitting ? 'Posting...' : (
                  <>
                    <Star size={20} fill="white" />
                    Post Resource
                  </>
                )}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
