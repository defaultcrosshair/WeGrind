import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MessageSquare, Plus, CheckCircle2, BarChart2, MessageCircle, X } from 'lucide-react';
import { auth, provider, db } from '../firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, doc, updateDoc, increment, arrayUnion } from 'firebase/firestore';

export default function Forum() {
  const feedRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Composer state
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Doubt'); // 'Doubt' or 'Poll'
  const [pollOptions, setPollOptions] = useState(['', '']);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, setUser);
      return () => unsubscribe();
    } catch (e) {
      console.log("Firebase Auth error - keys likely missing");
    }
  }, []);

  useEffect(() => {
    try {
      const q = query(collection(db, 'forum_posts'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPosts(fetched);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log("Firestore error - keys likely missing");
    }
  }, []);

  // GSAP animation for new posts
  useEffect(() => {
    if (feedRef.current && posts.length > 0) {
      gsap.fromTo(
        feedRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [posts.length]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Login Failed: Please configure Firebase keys in firebase.js");
      console.error(error);
    }
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const addPollOption = () => {
    if (pollOptions.length < 5) setPollOptions([...pollOptions, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    
    if (postType === 'Poll') {
      const validOptions = pollOptions.filter(o => o.trim() !== '');
      if (validOptions.length < 2) return alert('Polls need at least 2 valid options');
    }
    
    setIsSubmitting(true);
    
    try {
      const newPost = {
        author: user.displayName || 'Anonymous',
        authorId: user.uid,
        content,
        type: postType,
        createdAt: serverTimestamp(),
      };
      
      if (postType === 'Poll') {
        const filteredOptions = pollOptions.filter(o => o.trim() !== '');
        newPost.options = filteredOptions;
        const votesObj = {};
        filteredOptions.forEach((_, i) => votesObj[i] = 0);
        newPost.votes = votesObj;
        newPost.totalVotes = 0;
        newPost.voters = []; // Initialize empty array for tracking voters
      }
      
      await addDoc(collection(db, 'forum_posts'), newPost);
      
      // Reset
      setContent('');
      setPollOptions(['', '']);
      setPostType('Doubt');
    } catch (error) {
      alert("Post Failed: Check Firebase configuration");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (postId, optionIndex) => {
    if (!user) {
      alert("Please sign in to vote!");
      return handleLogin();
    }
    
    // Check if user already voted
    const post = posts.find(p => p.id === postId);
    if (post && post.voters && post.voters.includes(user.uid)) {
      alert("You have already voted on this poll!");
      return;
    }
    
    try {
      const postRef = doc(db, 'forum_posts', postId);
      await updateDoc(postRef, {
        [`votes.${optionIndex}`]: increment(1),
        totalVotes: increment(1),
        voters: arrayUnion(user.uid)
      });
    } catch (error) {
      alert("Vote failed. Check Firebase rules.");
      console.error(error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare color="var(--google-blue)" strokeWidth={3} />
          Community Discussion
        </h2>
      </div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr', maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Composer */}
        <div className="doodle-panel" style={{ padding: '1.5rem' }}>
          {!user ? (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Join the conversation!</h3>
              <button className="btn-primary" onClick={handleLogin}>Sign in with Google</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--border-dark)', paddingBottom: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => setPostType('Doubt')}
                  style={{ background: 'none', border: 'none', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', color: postType === 'Doubt' ? 'var(--google-blue)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <MessageCircle size={18} strokeWidth={3} /> Ask a Doubt
                </button>
                <button 
                  type="button"
                  onClick={() => setPostType('Poll')}
                  style={{ background: 'none', border: 'none', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', color: postType === 'Poll' ? 'var(--google-red)' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <BarChart2 size={18} strokeWidth={3} /> Create Poll
                </button>
              </div>

              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={postType === 'Poll' ? "Ask a question for your poll..." : "What's on your mind? Got a doubt?"}
                style={{ width: '100%', minHeight: '100px', padding: '1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-dark)', fontFamily: 'inherit', fontWeight: '500', background: 'var(--bg-primary)', color: 'var(--text-primary)', resize: 'vertical' }}
              />

              {postType === 'Poll' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontWeight: '700' }}>Poll Options</label>
                  {pollOptions.map((opt, idx) => (
                    <input 
                      key={idx}
                      type="text" 
                      value={opt}
                      onChange={(e) => handlePollOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--border-dark)', fontFamily: 'inherit', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  ))}
                  {pollOptions.length < 5 && (
                    <button type="button" onClick={addPollOption} style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: 'var(--google-blue)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.5rem' }}>
                      <Plus size={16} strokeWidth={3} /> Add Option
                    </button>
                  )}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ alignSelf: 'flex-end', marginTop: '0.5rem' }}>
                {isSubmitting ? 'Posting...' : 'Post to Community'}
              </button>
            </form>
          )}
        </div>

        {/* Feed */}
        <div ref={feedRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem 0' }}>
              <p style={{ fontWeight: '600' }}>No posts yet. Start the discussion!</p>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.id} className="doodle-panel" style={{ padding: '1.5rem', background: 'var(--panel-bg)', borderColor: post.type === 'Poll' ? 'var(--google-red)' : 'var(--border-dark)', borderWidth: post.type === 'Poll' ? '4px' : '3px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="avatar" style={{ width: '40px', height: '40px', fontSize: '1rem', background: post.type === 'Poll' ? 'var(--google-red)' : 'var(--google-blue)', color: 'white' }}>
                    {post.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', color: 'var(--text-primary)' }}>{post.author}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                      {post.type}
                    </div>
                  </div>
                  
                  {user && (user.uid === post.authorId || user.displayName === post.author) && (
                    <button 
                      className="btn-icon" 
                      style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', color: 'var(--google-red)', border: '2px solid var(--border-dark)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm('Delete this post?')) {
                          import('firebase/firestore').then(({ doc, deleteDoc }) => {
                            deleteDoc(doc(db, 'forum_posts', post.id));
                          });
                        }
                      }}
                    >
                      <X size={16} strokeWidth={3} />
                    </button>
                  )}
                </div>

                <p style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: post.type === 'Poll' ? '1.5rem' : '0', whiteSpace: 'pre-wrap' }}>
                  {post.content}
                </p>

                {post.type === 'Poll' && post.options && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {post.options.map((option, idx) => {
                      const votesForOption = post.votes ? post.votes[idx] : 0;
                      const percentage = post.totalVotes > 0 ? Math.round((votesForOption / post.totalVotes) * 100) : 0;
                      const hasVoted = post.voters && user && post.voters.includes(user.uid);
                      
                      return (
                        <div key={idx} onClick={() => handleVote(post.id, idx)} style={{ position: 'relative', padding: '1rem', border: '2px solid var(--border-dark)', borderRadius: 'var(--radius-md)', cursor: hasVoted ? 'default' : 'pointer', overflow: 'hidden', background: 'var(--bg-primary)' }}>
                          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: `${percentage}%`, background: 'rgba(234, 67, 53, 0.2)', transition: 'width 0.4s cubic-bezier(0.65, 0, 0.35, 1)' }} />
                          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', fontWeight: '700', zIndex: 1, color: 'var(--text-primary)' }}>
                            <span>{option}</span>
                            <span>{hasVoted ? `${percentage}%` : ''}</span>
                          </div>
                        </div>
                      );
                    })}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '700', textAlign: 'right', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{post.voters && user && post.voters.includes(user.uid) ? '✅ You voted' : ''}</span>
                      <span>{post.totalVotes} total votes</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
