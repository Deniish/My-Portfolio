import React, { useEffect, useRef, useState, useCallback } from 'react';
import "../Styles/RippleBackground.css";

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
  const idleTimeoutRef = useRef(null);
  const [isIdle, setIsIdle] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const [eyePos, setEyePos] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  const [isBlinking, setIsBlinking] = useState(false);
  const blinkTimeoutRef = useRef(null);
  const [blobPos, setBlobPos] = useState({ x: 0, y: 0 });
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const SCROLL_REDUCE_TIMEOUT = 150;

  // Refs to DOM nodes
  const mainBlobRef = useRef(null);
  const trailContainerRef = useRef(null);
  const bubbleContainerRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const eyeContainerRef = useRef(null);

  // disable on touch devices
  useEffect(() => {
    const hasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    if (hasTouch) {
      disabledOnTouch.current = true;
      setEnabled(false);
      document.body.style.cursor = '';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => { document.body.style.cursor = ''; };
  }, []);

  // Detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Random blinking
  useEffect(() => {
    const scheduleNextBlink = () => {
      const blinkDelay = 3000 + Math.random() * 4000;
      blinkTimeoutRef.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 150);
      }, blinkDelay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeoutRef.current);
  }, []);

  // Throttled mouse move handler
  const handlePointerMove = useCallback((e) => {
    if (disabledOnTouch.current || isScrolling) return;
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

    // Check if hovering over interactive element (button, link, etc)
    const el = document.elementFromPoint(x, y);
    const isOverInteractive = el?.closest?.('button, a, [role="button"], input, textarea, [data-interactive]') || false;
    mouse.current.isOverInteractive = isOverInteractive;

    // Calculate eye pupil positions - follow cursor in all directions
    if (mainBlobRef.current) {
      const blobRect = mainBlobRef.current.getBoundingClientRect();
      const blobCenterX = blobRect.left + blobRect.width / 2;
      const blobCenterY = blobRect.top + blobRect.height / 2;

      const angle = Math.atan2(y - blobCenterY, x - blobCenterX);
      const maxDistance = 4.5;

      const pupilX = Math.cos(angle) * maxDistance;
      const pupilY = Math.sin(angle) * maxDistance;

      setEyePos({
        left: { x: pupilX, y: pupilY },
        right: { x: pupilX, y: pupilY },
      });
    }

    // Reduce trail when over interactive elements
    const trailCount = isOverInteractive ? 3 : maxTrail;

    // push to blobs list
    blobs.current.push({ x, y, t: now, id: now });
    if (blobs.current.length > trailCount) blobs.current.splice(0, blobs.current.length - trailCount);

    // spawn bubbles - less frequent over interactive
    const bubbleChance = isOverInteractive ? 0.02 : 0.08;
    if (Math.random() < bubbleChance) {
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
  }, [isScrolling]);

  // Click effect
  const handlePointerDown = useCallback((e) => {
    if (disabledOnTouch.current || isScrolling) return;
    mouse.current.down = true;
    const x = e.clientX, y = e.clientY;
    for (let i = 0; i < 8; i++) {
      const id = Date.now() + '-c-' + i + Math.random();
      particles.current.push({
        id,
        x,
        y,
        r: 6 + Math.random() * 8,
        vy: -0.2 - Math.random() * 1.4,
        vx: (Math.random() - 0.5) * 3,
        life: 1,
      });
    }
  }, [isScrolling]);

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

  // Lenis/native scroll detection integration
  useEffect(() => {
    let scrollTimer = null;
    
    // hook Lenis if present (best method - doesn't interfere)
    try {
      const lenis = window?.lenis || window?.Lenis || null;
      if (lenis && typeof lenis.on === 'function') {
        lenis.on('scroll', () => {
          isScrollingRef.current = true;
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            isScrollingRef.current = false;
          }, SCROLL_REDUCE_TIMEOUT);
          if (scrollTimerRef) scrollTimerRef.current = scrollTimer;
        });
      }
    } catch (e) {
      // ignore
    }

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  // animation loop
  useEffect(() => {
    const ease = (a, b, k) => a + (b - a) * k;

    const loop = () => {
      const mb = mainBlobRef.current;
      if (mb) {
        mb.dataset.tx = mouse.current.x;
        mb.dataset.ty = mouse.current.y;
      }

      // update trail DOM - hide during scroll
      const trailC = trailContainerRef.current;
      if (trailC) {
        trailC.style.opacity = isScrolling ? '0' : '1';
        trailC.style.pointerEvents = isScrolling ? 'none' : 'auto';

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

          const baseSize = 50;
          const size = baseSize - i * 1.5;
          const offset = size / 2;

          node.style.transform = `translate3d(${nx - offset}px, ${ny - offset}px, 0) scale(${1 - i * 0.015})`;
          
          // Hide trail when over interactive element
          const trailOpacity = mouse.current.isOverInteractive ? 0 : Math.max(0, isIdle ? 0 : 1 - i * 0.04);
          node.style.opacity = `${trailOpacity}`;
          
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

        const scaleBase = mouse.current.down ? 1.15 : 1.0;
        const opacity = isIdle || isScrolling ? 0 : 1;

        // Check if over interactive element
        const isOverInteractive = mouse.current.isOverInteractive;
        const scale = isOverInteractive ? 1.3 : scaleBase;

        mb.style.transform = `translate3d(${nx - 40}px, ${ny - 40}px, 0) scale(${scale})`;
        mb.style.opacity = opacity;
        mb.style.pointerEvents = 'none';
        mb.dataset.cx = nx;
        mb.dataset.cy = ny;

        // Apply interactive mode class
        if (isOverInteractive) {
          mb.classList.add('interactive-mode');
        } else {
          mb.classList.remove('interactive-mode');
        }
      }

      // update particles - hide during scroll
      const bubC = bubbleContainerRef.current;
      if (bubC) {
        bubC.style.opacity = isScrolling ? '0' : '1';
        bubC.style.pointerEvents = isScrolling ? 'none' : 'auto';

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
          node.style.opacity = `${Math.max(0, isIdle || isScrolling ? 0 : p.life)}`;
          if (p.life <= 0) {
            particles.current.splice(i, 1);
            node.remove();
          }
        }
      }

      // Update eyes
      if (leftEyeRef.current && rightEyeRef.current) {
        leftEyeRef.current.style.transform = `translate(${isBlinking ? 0 : eyePos.left?.x || 0}px, ${isBlinking ? 0 : eyePos.left?.y || 0}px)`;
        rightEyeRef.current.style.transform = `translate(${isBlinking ? 0 : eyePos.right?.x || 0}px, ${isBlinking ? 0 : eyePos.right?.y || 0}px)`;
      }

      // Update eye container position
      if (eyeContainerRef.current && mb) {
        const blobX = parseFloat(mb.dataset.cx || mouse.current.x);
        const blobY = parseFloat(mb.dataset.cy || mouse.current.y);
        eyeContainerRef.current.style.left = `${blobX - 40}px`;
        eyeContainerRef.current.style.top = `${blobY - 40}px`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isIdle, isScrolling, eyePos, isBlinking]);

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

      <div className="trail-wrap" ref={trailContainerRef} style={{ filter: 'url(#gooey-effect)', transition: 'opacity 0.2s ease' }} />
      <div ref={mainBlobRef} className="main-blob" style={{ transition: 'opacity 0.2s ease' }} />

      {/* Eyes Container - Positioned relative to main blob */}
      <div
        ref={eyeContainerRef}
        className="eye-container"
        style={{
          opacity: isIdle || isScrolling ? '0' : '1',
        }}
      >
        {/* Left Eye */}
        <div className={`eye-white ${isBlinking ? 'blink' : ''}`}>
          <div ref={leftEyeRef} className="eye-pupil">
            <div className="eye-glint" />
          </div>
        </div>

        {/* Right Eye */}
        <div className={`eye-white eye-right ${isBlinking ? 'blink' : ''}`}>
          <div ref={rightEyeRef} className="eye-pupil">
            <div className="eye-glint" />
          </div>
        </div>
      </div>

      <div ref={bubbleContainerRef} className="bubble-wrap" style={{ transition: 'opacity 0.2s ease' }} />
      <div className="content-wrap">{children}</div>
    </div>
  );
}