import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ProgressRing({ width = 220, height = 100, stroke = 16, progress, color }) {
  const w = width;
  const h = height;
  
  const rectW = w - (stroke + 6);
  const rectH = h - (stroke + 6);
  const rectX = (stroke + 6) / 2;
  const rectY = (stroke + 6) / 2;
  const r = rectH / 2;
  
  const straightLength = rectW - rectH;
  const circumference = 2 * straightLength + Math.PI * rectH;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(circleRef.current, {
      strokeDashoffset,
      duration: 1.5,
      ease: "power3.out"
    });
    
    // Animate the number counting up
    gsap.to(textRef.current, {
      innerHTML: progress,
      duration: 1.5,
      ease: "power3.out",
      snap: { innerHTML: 1 },
      onUpdate: function() {
        if(textRef.current) {
            textRef.current.innerHTML = Math.round(this.targets()[0].innerHTML) + '%';
        }
      }
    });
  }, [progress, strokeDashoffset]);

  return (
    <div style={{ position: 'relative', width: w, height: h, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        height={h}
        width={w}
        style={{ filter: 'drop-shadow(4px 4px 0px var(--border-dark))' }}
      >
        {/* Neobrutalist Outer Border */}
        <rect
          x={rectX} y={rectY}
          width={rectW} height={rectH}
          rx={r} ry={r}
          stroke="var(--border-dark)"
          fill="var(--panel-bg)"
          strokeWidth={stroke + 6}
        />
        {/* Background Track */}
        <rect
          x={rectX} y={rectY}
          width={rectW} height={rectH}
          rx={r} ry={r}
          stroke="var(--bg-secondary)"
          fill="transparent"
          strokeWidth={stroke}
        />
        {/* Progress Track */}
        <rect
          ref={circleRef}
          x={rectX} y={rectY}
          width={rectW} height={rectH}
          rx={r} ry={r}
          stroke={color || "var(--google-blue)"}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset: circumference, strokeLinecap: 'butt', transition: 'stroke 0.3s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span ref={textRef} style={{ fontSize: '1.75rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--text-primary)' }}>
          0%
        </span>
      </div>
    </div>
  );
}
