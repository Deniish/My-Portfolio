import React, { useState, useEffect, useRef } from 'react';
import { Settings } from 'lucide-react';

// ============================================
// 1. RingCursor.jsx - Save this as a separate file
// ============================================
export function RingCursor({ enabled }) {
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest?.('button, a, [role="button"], input, textarea, [data-interactive]') || false;
      setIsPointer(isInteractive);
    };

    const animate = () => {
      if (!ringRef.current) return;

      // Smooth follow
      currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.15;

      const size = isPointer ? 50 : 32;
      const offset = size / 2;

      ringRef.current.style.transform = `translate3d(${currentPos.current.x - offset}px, ${currentPos.current.y - offset}px, 0)`;
      ringRef.current.style.width = `${size}px`;
      ringRef.current.style.height = `${size}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, isPointer]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      style={{
        position: 'fixed',
        width: '32px',
        height: '32px',
        border: '2px solid rgba(99, 102, 241, 0.6)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        borderColor: isPointer ? 'rgba(99, 102, 241, 0.9)' : 'rgba(99, 102, 241, 0.6)',
        boxShadow: isPointer ? '0 0 20px rgba(99, 102, 241, 0.4)' : '0 0 10px rgba(99, 102, 241, 0.2)',
      }}
    />
  );
}