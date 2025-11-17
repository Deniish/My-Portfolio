import React, { useEffect, useRef, useState, useCallback } from 'react';

// Enhanced Buttermax-inspired liquid cursor with organic shapes and interactive scaling
export default function RippleBackground({ children }) {
  const disabledOnTouch = useRef(false);
  const mouse = useRef({ x: -9999, y: -9999, down: false });
  const blobs = useRef([]);
  const particles = useRef([]);
  const rafRef = useRef(null);
  const lastPointerTime = useRef(0);
  const lastMoveTime = useRef(0);
  const maxTrail = 22;
  const containerRef = useRef(null);
  const [enabled, setEnabled] = useState(true);
  const isOverInteractive = useRef(false);
  const idleTimeoutRef = useRef(null);
  const [isIdle, setIsIdle] = useState(false);

  // Refs to DOM nodes
  const mainBlobRef = useRef(null);
  const trailContainerRef = useRef(null);
  const bubbleContainerRef = useRef(null);

  // disable on touch devices
  useEffect(() => {
    const hasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      disabledOnTouch.current = true;
      setEnabled(false);
      document.body.style.cursor = '';
    } else {
      // Keep normal cursor visible
      document.body.style.cursor = 'auto';
    }
    return () => { document.body.style.cursor = ''; };
  }, []);

  // Throttled mouse move handler
  const handlePointerMove = useCallback((e) => {
    if (disabledOnTouch.current) return;
    const now = performance.now();
    if (now - lastPointerTime.current < 16) return;
    lastPointerTime.current = now;
    lastMoveTime.current = now;
    
    // Reset idle state on movement
    setIsIdle(false);
    clearTimeout(idleTimeoutRef.current);
    
    // Set idle after 800ms of no movement
    idleTimeoutRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 800);

    const x = e.clientX;
    const y = e.clientY;
    mouse.current.x = x;
    mouse.current.y = y;

    // push to blobs list
    blobs.current.push({ x, y, t: now, id: now });
    if (blobs.current.length > maxTrail) blobs.current.shift();

    // spawn bubbles
    if (Math.random() < 0.08) {
      const id = Date.now() + Math.random();
      particles.current.push({
        id,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
        r: 4 + Math.random() * 12,
        vy: -0.3 - Math.random() * 0.6,
        life: 1,
      });
    }

    // Check if over interactive element
    const el = document.elementFromPoint(x, y);
    if (el) {
      let interactive = el.closest && el.closest('.glassy-hover');
      isOverInteractive.current = !!interactive;
      
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        interactive.style.setProperty('--mouse-x', (x - rect.left) + 'px');
        interactive.style.setProperty('--mouse-y', (y - rect.top) + 'px');
      }
    } else {
      isOverInteractive.current = false;
    }
  }, []);

  // Click effect
  const handlePointerDown = useCallback((e) => {
    if (disabledOnTouch.current) return;
    mouse.current.down = true;
    const x = e.clientX, y = e.clientY;
    for (let i = 0; i < 8; i++) {
      const id = Date.now() + '-c-' + i + Math.random();
      particles.current.push({ 
        id, x, y, 
        r: 6 + Math.random() * 8, 
        vy: -0.2 - Math.random() * 1.4, 
        vx: (Math.random() - .5) * 3, 
        life: 1 
      });
    }
  }, []);

  const handlePointerUp = useCallback(() => { 
    mouse.current.down = false; 
  }, []);

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      clearTimeout(idleTimeoutRef.current);
    };
  }, [enabled, handlePointerMove, handlePointerDown, handlePointerUp]);

  // animation loop
  useEffect(() => {
    const ease = (a, b, k) => a + (b - a) * k;

    const loop = () => {
      const mb = mainBlobRef.current;
      if (mb) {
        mb.dataset.tx = mouse.current.x;
        mb.dataset.ty = mouse.current.y;
      }

      // update trail DOM
      const trailC = trailContainerRef.current;
      if (trailC) {
        const nodes = Array.from(trailC.children);
        while (nodes.length < blobs.current.length) {
          const el = document.createElement('div');
          el.className = 'trail-blob';
          trailC.appendChild(el);
          nodes.push(el);
        }
        while (nodes.length > blobs.current.length) {
          const rem = nodes.shift();
          rem && rem.remove();
        }

        for (let i = 0; i < blobs.current.length; i++) {
          const target = blobs.current[blobs.current.length - 1 - i];
          const node = nodes[i];
          if (!target || !node) continue;
          
          const cx = parseFloat(node.dataset.cx || target.x) || target.x;
          const cy = parseFloat(node.dataset.cy || target.y) || target.y;
          const k = 0.12 + (i / blobs.current.length) * 0.16;
          const nx = ease(cx, target.x, k);
          const ny = ease(cy, target.y, k);
          
          // Larger blob size
          const baseSize = 50;
          const size = baseSize - (i * 1.5);
          const offset = size / 2;
          
          node.style.transform = `translate3d(${nx - offset}px, ${ny - offset}px, 0) scale(${1 - i * 0.015})`;
          node.style.opacity = `${Math.max(0, isIdle ? 0 : 1 - i * 0.04)}`;
          node.dataset.cx = nx;
          node.dataset.cy = ny;
        }
      }

      // update main blob
      if (mb) {
        const cx = parseFloat(mb.dataset.cx || mouse.current.x) || mouse.current.x;
        const cy = parseFloat(mb.dataset.cy || mouse.current.y) || mouse.current.y;
        const speed = mouse.current.down ? 0.35 : 0.18;
        const nx = ease(cx, mouse.current.x, speed);
        const ny = ease(cy, mouse.current.y, speed);
        
        // Scale up when over interactive elements
        const scaleBase = mouse.current.down ? 1.15 : 1.0;
        const scaleInteractive = isOverInteractive.current ? 1.25 : 1.0;
        const finalScale = scaleBase * scaleInteractive;
        const opacity = isIdle ? 0 : 1;
        
        mb.style.transform = `translate3d(${nx - 40}px, ${ny - 40}px, 0) scale(${finalScale})`;
        mb.style.opacity = opacity;
        mb.dataset.cx = nx;
        mb.dataset.cy = ny;
      }

      // update particles
      const bubC = bubbleContainerRef.current;
      if (bubC) {
        const doms = Array.from(bubC.children);
        while (doms.length < particles.current.length) {
          const d = document.createElement('div');
          d.className = 'bubble';
          bubC.appendChild(d);
          doms.push(d);
        }
        while (doms.length > particles.current.length) {
          const rem = doms.shift();
          rem && rem.remove();
        }

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += (p.vx || 0) || 0;
          p.y += p.vy;
          p.vy += -0.01 * 0.5;
          p.life -= 0.013;
          const node = bubC.children[i];
          if (!node) continue;
          node.style.transform = `translate3d(${p.x - p.r}px, ${p.y - p.r}px, 0) scale(${Math.max(0.2, p.life)})`;
          node.style.width = node.style.height = `${p.r * 2}px`;
          node.style.opacity = `${Math.max(0, isIdle ? 0 : p.life)}`;
          if (p.life <= 0) {
            particles.current.splice(i, 1);
            node.remove();
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(rafRef.current); };
  }, [isIdle]);

  // cleanup
  useEffect(() => {
    const id = setInterval(() => {
      if (blobs.current.length > maxTrail) blobs.current.splice(0, blobs.current.length - maxTrail);
      if (particles.current.length > 80) particles.current.splice(0, particles.current.length - 80);
    }, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} className="liquid-cursor-root">
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="gooey-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="gooey" />
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>

          <filter id="liquid-distortion">
            <feTurbulence baseFrequency="0.8" numOctaves="1" seed="2" result="t" />
            <feDisplacementMap in="SourceGraphic" in2="t" scale="8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="trail-wrap" ref={trailContainerRef} style={{ filter: 'url(#gooey-effect)' }} />
      <div ref={mainBlobRef} className="main-blob" />
      <div ref={bubbleContainerRef} className="bubble-wrap" />
      <div className="content-wrap">{children}</div>

      <style>{`
        .liquid-cursor-root { position: relative; pointer-events: none; }
        .trail-wrap { 
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 100%; 
          height: 100%; 
          z-index: 9999; 
          pointer-events: none; 
          mix-blend-mode: normal; 
        }
        .trail-wrap .trail-blob { 
          position: absolute; 
          width: 50px; 
          height: 50px; 
          background: rgba(0,0,0,0.78); 
          transform: translate3d(-9999px,-9999px,0); 
          will-change: transform, opacity; 
          box-shadow: 0 2px 16px rgba(0,0,0,0.2); 
          border-radius: 42% 58% 70% 30% / 45% 60% 40% 55%;
          animation: blob-morph 4s ease-in-out infinite;
          transition: opacity 0.4s ease;
        }
        
        @keyframes blob-morph {
          0%, 100% { border-radius: 42% 58% 70% 30% / 45% 60% 40% 55%; }
          25% { border-radius: 58% 42% 30% 70% / 55% 40% 60% 45%; }
          50% { border-radius: 45% 55% 60% 40% / 50% 45% 55% 50%; }
          75% { border-radius: 55% 45% 40% 60% / 60% 50% 50% 40%; }
        }
        
        .main-blob { 
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 80px; 
          height: 80px; 
          background: #000; 
          transform: translate3d(-9999px,-9999px,0); 
          will-change: transform, opacity; 
          z-index: 10000; 
          pointer-events: none; 
          box-shadow: 0 8px 35px rgba(0,0,0,0.35); 
          border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
          animation: main-blob-morph 5s ease-in-out infinite;
          transition: opacity 0.5s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1);
        }
        
        @keyframes main-blob-morph {
          0%, 100% { border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%; }
          20% { border-radius: 62% 38% 55% 45% / 59% 56% 44% 41%; }
          40% { border-radius: 45% 55% 48% 52% / 52% 48% 52% 48%; }
          60% { border-radius: 55% 45% 62% 38% / 48% 52% 48% 52%; }
          80% { border-radius: 50% 50% 45% 55% / 55% 45% 55% 45%; }
        }
        
        .bubble-wrap { 
          position: fixed; 
          left: 0; 
          top: 0; 
          width: 100%; 
          height: 100%; 
          z-index: 9998; 
          pointer-events: none; 
        }
        .bubble { 
          position: absolute; 
          border-radius: 50%; 
          border: 1px solid rgba(0,0,0,0.9); 
          background: rgba(0,0,0,0.04); 
          will-change: transform, opacity; 
          transition: opacity 0.3s ease;
        }

        .glassy-hover { 
          position: relative; 
          overflow: hidden; 
          --mouse-x: 50%; 
          --mouse-y: 50%; 
          pointer-events: auto; 
        }
        .glassy-hover::before { 
          content: ''; 
          position: absolute; 
          inset: 0; 
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.32), transparent 50%); 
          backdrop-filter: blur(10px); 
          opacity: 0; 
          transition: opacity 320ms ease; 
          pointer-events: none; 
        }
        .glassy-hover:hover::before { opacity: 1; }
        .glassy-hover { 
          transition: transform 380ms cubic-bezier(.2,.9,.2,1), filter 480ms ease; 
        }
        .glassy-hover:hover { 
          transform: scale(1.02) skewX(-0.3deg); 
          filter: url(#liquid-distortion); 
          animation: morph 3.8s ease-in-out infinite; 
        }

        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          75% { border-radius: 60% 30% 40% 70% / 70% 40% 60% 30%; }
        }

        .trail-blob, .main-blob, .bubble { contain: paint; }

        @media (max-width: 900px) {
          .liquid-cursor-root { display: none; }
          body { cursor: auto !important; }
        }
      `}</style>
    </div>
  );
}

export function GlassyHover({ children, className = '', style = {}, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      el.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    };
    el.addEventListener('pointermove', move);
    return () => el.removeEventListener('pointermove', move);
  }, []);

  return (
    <div ref={ref} className={`glassy-hover ${className}`} style={style} {...rest}>
      {children}
    </div>
  );
}