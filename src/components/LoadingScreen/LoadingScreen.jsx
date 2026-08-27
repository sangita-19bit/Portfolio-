import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

/* ── Neural network node positions ─────────────────────── */
const NODES = [
  { id: 'n1',  cx: 160, cy: 80  },
  { id: 'n2',  cx: 80,  cy: 160 },
  { id: 'n3',  cx: 240, cy: 160 },
  { id: 'n4',  cx: 120, cy: 240 },
  { id: 'n5',  cx: 200, cy: 240 },
  { id: 'n6',  cx: 160, cy: 320 },
];

const EDGES = [
  ['n1','n2'], ['n1','n3'],
  ['n2','n4'], ['n2','n5'],
  ['n3','n4'], ['n3','n5'],
  ['n4','n6'], ['n5','n6'],
];

function getNode(id) {
  return NODES.find(n => n.id === id);
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState('loading'); // 'loading' | 'done' | 'exit'
  const rafRef = useRef(null);

  /* ── Progress counter ──────────────────────────────── */
  useEffect(() => {
    const start    = performance.now();
    const duration = 2200;

    function tick(now) {
      const t       = Math.min((now - start) / duration, 1);
      const eased   = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * 100);
      setProgress(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('done');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 550);
        }, 400);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  /* ── Particle data (data packets on edges) ─────────── */
  const packets = EDGES.map(([a, b], i) => ({
    id:    `p${i}`,
    from:  getNode(a),
    to:    getNode(b),
    delay: `${i * 0.28}s`,
    dur:   `${1.1 + (i % 3) * 0.25}s`,
  }));

  return (
    <div className={`loader-screen ${phase === 'exit' ? 'loader-exit' : ''}`} aria-hidden="true">
      {/* Background radial glow */}
      <div className="loader-glow" />

      {/* Neural network SVG */}
      <div className="loader-network">
        <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Static edges */}
          {EDGES.map(([a, b], i) => {
            const na = getNode(a);
            const nb = getNode(b);
            return (
              <line
                key={i}
                x1={na.cx} y1={na.cy}
                x2={nb.cx} y2={nb.cy}
                stroke="rgba(99,102,241,0.18)"
                strokeWidth="1"
              />
            );
          })}

          {/* Animated data packets on edges */}
          {packets.map(p => (
            <circle
              key={p.id}
              r="2.5"
              fill="#818cf8"
              opacity="0"
              style={{
                animationName: 'none',
              }}
            >
              <animateMotion
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
                path={`M ${p.from.cx} ${p.from.cy} L ${p.to.cx} ${p.to.cy}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* Nodes */}
          {NODES.map((node, i) => (
            <g key={node.id}>
              {/* Outer pulse ring */}
              <circle
                cx={node.cx} cy={node.cy} r="10"
                fill="none"
                stroke="rgba(99,102,241,0.25)"
                strokeWidth="1"
                style={{
                  animationName: 'pulse-ring-loader',
                  animationDuration: `${1.8 + i * 0.22}s`,
                  animationDelay: `${i * 0.18}s`,
                  animationTimingFunction: 'ease-out',
                  animationIterationCount: 'infinite',
                }}
              />
              {/* Inner node */}
              <circle
                cx={node.cx} cy={node.cy} r="4"
                fill="#6366f1"
                style={{
                  animationName: 'node-glow',
                  animationDuration: `${2 + i * 0.3}s`,
                  animationDelay: `${i * 0.2}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              />
            </g>
          ))}

          {/* Spinning ring around center */}
          <circle
            cx="160" cy="200" r="90"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="0.75"
            strokeDasharray="30 15"
            className="loader-spin-ring"
          />

          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Monogram + text */}
      <div className="loader-center">
        <div className="loader-monogram">SC</div>
        <p className="loader-name">Sangita Chowdhury</p>
        <p className="loader-role">AI/ML Developer · Software Engineer</p>

        {/* Progress bar */}
        <div className="loader-bar-wrap" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-percent">{String(progress).padStart(3, '0')}%</p>
      </div>
    </div>
  );
}
