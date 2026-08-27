import { useEffect, useRef, useState } from 'react';
import './LoadingScreen.css';

/* ── Node positions — abstract geometric pattern ─────────── */
const NODES = [
  { id: 'n1', cx: 160, cy: 80  },
  { id: 'n2', cx: 80,  cy: 160 },
  { id: 'n3', cx: 240, cy: 160 },
  { id: 'n4', cx: 120, cy: 240 },
  { id: 'n5', cx: 200, cy: 240 },
  { id: 'n6', cx: 160, cy: 320 },
];

const EDGES = [
  ['n1','n2'], ['n1','n3'],
  ['n2','n4'], ['n2','n5'],
  ['n3','n4'], ['n3','n5'],
  ['n4','n6'], ['n5','n6'],
];

function getNode(id) { return NODES.find(n => n.id === id); }

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState('loading');
  const rafRef = useRef(null);

  useEffect(() => {
    const start    = performance.now();
    const duration = 2000;

    function tick(now) {
      const t     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('done');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(onComplete, 600);
        }, 350);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  const packets = EDGES.map(([a, b], i) => ({
    id:   `p${i}`,
    from: getNode(a),
    to:   getNode(b),
    delay: `${i * 0.3}s`,
    dur:   `${1.2 + (i % 3) * 0.28}s`,
  }));

  return (
    <div className={`loader-screen ${phase === 'exit' ? 'loader-exit' : ''}`} aria-hidden="true">
      <div className="loader-glow" />

      {/* Abstract geometric SVG */}
      <div className="loader-network">
        <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          {EDGES.map(([a, b], i) => {
            const na = getNode(a);
            const nb = getNode(b);
            return (
              <line
                key={i}
                x1={na.cx} y1={na.cy}
                x2={nb.cx} y2={nb.cy}
                stroke="rgba(201,178,124,0.2)"
                strokeWidth="0.75"
              />
            );
          })}

          {packets.map(p => (
            <circle key={p.id} r="2" fill="#C9B27C" opacity="0">
              <animateMotion
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
                path={`M ${p.from.cx} ${p.from.cy} L ${p.to.cx} ${p.to.cy}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.9;0.9;0"
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {NODES.map((node, i) => (
            <g key={node.id}>
              <circle
                cx={node.cx} cy={node.cy} r="9"
                fill="none"
                stroke="rgba(201,178,124,0.15)"
                strokeWidth="1"
                style={{
                  animationName: 'pulse-ring-loader',
                  animationDuration: `${2 + i * 0.25}s`,
                  animationDelay: `${i * 0.2}s`,
                  animationTimingFunction: 'ease-out',
                  animationIterationCount: 'infinite',
                }}
              />
              <circle
                cx={node.cx} cy={node.cy} r="3.5"
                fill={i % 2 === 0 ? '#C9B27C' : '#8F7650'}
                style={{
                  animationName: 'node-glow',
                  animationDuration: `${2.4 + i * 0.22}s`,
                  animationDelay: `${i * 0.18}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                }}
              />
            </g>
          ))}

          <ellipse
            cx="160" cy="200" rx="110" ry="130"
            fill="none"
            stroke="rgba(201,178,124,0.08)"
            strokeWidth="0.75"
            strokeDasharray="18 12"
            className="loader-spin-ring"
          />

          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8F7650" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#C9B27C" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Monogram + text */}
      <div className="loader-center">
        <div className="loader-monogram">SC</div>
        <p className="loader-name">Sangita Chowdhury</p>
        <p className="loader-role">AI / ML Developer · Software Engineer</p>

        <div className="loader-bar-wrap" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="loader-percent">{String(progress).padStart(3, '0')}</p>
      </div>
    </div>
  );
}
