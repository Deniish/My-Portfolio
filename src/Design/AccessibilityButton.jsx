import React, { useState, useEffect, useRef } from 'react';
import { RingCursor } from '../Design/RingCursor';

// Custom Animated Ghost Component
function AnimatedGhost({ isHovered, mousePos, buttonRect }) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  // Random blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Calculate eye movement based on cursor position
  useEffect(() => {
    if (!buttonRect || !mousePos) return;

    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const angle = Math.atan2(mousePos.y - buttonCenterY, mousePos.x - buttonCenterX);
    const maxDistance = 3;

    const pupilX = Math.cos(angle) * maxDistance;
    const pupilY = Math.sin(angle) * maxDistance;

    setEyePos({ x: pupilX, y: pupilY });
  }, [mousePos, buttonRect]);

  return (
    <svg 
      width="37" 
      height="37" 
      viewBox="0 0 24 24" 
      fill="none"
      style={{
        transition: 'transform 0.2s ease',
        transform: isHovered ? 'translateX(0)' : 'translateX(0)',
      }}
    >
      {/* Ghost body */}
      <path 
        d="M12 3C8.134 3 5 6.134 5 10v7c0 .552.448 1 1 1s1-.448 1-1c0-.552.448-1 1-1s1 .448 1 1 .448 1 1 1 1-.448 1-1 .448-1 1-1 1 .448 1 1 .448 1 1 1 1-.448 1-1s.448-1 1-1 1 .448 1 1c0 .552.448 1 1 1s1-.448 1-1v-7c0-3.866-3.134-7-7-7z" 
        fill="white"
        opacity="0.95"
      />
      
      {/* Left Eye */}
      <g transform={`translate(${9 + eyePos.x}, ${9 + eyePos.y})`}>
        {isBlinking || isHovered ? (
          // Closed eye (line) or hovered state
          <line 
            x1="-1.5" 
            y1="0" 
            x2="1.5" 
            y2="0" 
            stroke="black" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        ) : (
          // Open eye (dot)
          <circle cx="0" cy="0" r="1.5" fill="black" />
        )}
      </g>
      
      {/* Right Eye */}
      <g transform={`translate(${15 + eyePos.x}, ${9 + eyePos.y})`}>
        {isBlinking || isHovered ? (
          // Closed eye (line) or hovered state
          <line 
            x1="-1.5" 
            y1="0" 
            x2="1.5" 
            y2="0" 
            stroke="black" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
        ) : (
          // Open eye (dot)
          <circle cx="0" cy="0" r="1.5" fill="black" />
        )}
      </g>
      
    </svg>
  );
}

export function AccessibilityButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBlobEnabled, setIsBlobEnabled] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [buttonRect, setButtonRect] = useState(null);
  const scrollTimeoutRef = useRef(null);
  const buttonRef = useRef(null);

  // Check if mobile/tablet view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track mouse position for eye movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (buttonRef.current) {
        setButtonRect(buttonRef.current.getBoundingClientRect());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(false);
      
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Toggle blob cursor
  const handleToggle = () => {
    setIsBlobEnabled(!isBlobEnabled);
    
    // Dispatch custom event to notify BlobCursor component
    window.dispatchEvent(new CustomEvent('blobCursorToggle', { 
      detail: { enabled: !isBlobEnabled } 
    }));
  };

  return (
    <>
      {/* Ring Cursor - shown when blob is disabled */}
      <RingCursor enabled={!isBlobEnabled} />

      {/* Hide button on mobile/tablet */}
      {!isMobile && (
        <>
          {/* Accessibility Button */}
          <button
            ref={buttonRef}
            onClick={() => setIsDialogOpen(!isDialogOpen)}
            className="accessibility-btn"
            style={{
              position: 'fixed',
              right: 'clamp(10px, 2vw, 20px)',
              top: 'clamp(20px, 5vh, 40px)',
              width: 'clamp(44px, 5vw, 48px)',
              height: 'clamp(44px, 5vw, 48px)',
              borderRadius: '50%',
              backgroundColor: '#383838',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              cursor: 'pointer',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: isVisible ? 1 : 0,
              pointerEvents: isVisible ? 'auto' : 'none',
              transform: `scale(${isVisible ? 1 : 0.8})`,
            }}
            onMouseEnter={(e) => {
              setIsHovered(true);
              e.currentTarget.style.backgroundColor = '#1a1a1a';
              e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.4)';
              e.currentTarget.style.animation = 'shake 0.5s ease-in-out infinite';
            }}
            onMouseLeave={(e) => {
              setIsHovered(false);
              e.currentTarget.style.backgroundColor = '#2e2e2e';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
              e.currentTarget.style.animation = 'none';
            }}
            aria-label="Accessibility settings"
          >
            <AnimatedGhost 
              isHovered={isHovered} 
              mousePos={mousePos} 
              buttonRect={buttonRect}
            />
          </button>

          {/* Dialog Box */}
          {isDialogOpen && (
            <>
              {/* Backdrop */}
              <div
                onClick={() => setIsDialogOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  zIndex: 9997,
                  opacity: isDialogOpen ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              />
              
              {/* Dialog */}
              <div
                style={{
                  position: 'fixed',
                  right: 'clamp(70px, 8vw, 80px)',
                  top: 'clamp(60px, 8vh, 80px)',
                  backgroundColor: 'white',
                  borderRadius: 'clamp(8px, 1.5vw, 12px)',
                  padding: 'clamp(12px, 2vw, 16px) clamp(16px, 2.5vw, 20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                  zIndex: 9999,
                  minWidth: 'clamp(180px, 20vw, 220px)',
                  maxWidth: '90vw',
                  animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <h3 style={{ 
                  margin: '0 0 clamp(8px, 1.5vw, 12px) 0', 
                  fontSize: 'clamp(14px, 1.8vw, 16px)', 
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  Cursor Settings
                </h3>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'clamp(8px, 1.5vw, 12px)'
                }}>
                  <label 
                    htmlFor="blob-cursor-toggle"
                    style={{ 
                      fontSize: 'clamp(12px, 1.6vw, 14px)', 
                      color: '#4b5563',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    Blob Cursor
                  </label>
                  
                  {/* Toggle Switch */}
                  <button
                    id="blob-cursor-toggle"
                    role="switch"
                    aria-checked={isBlobEnabled}
                    onClick={handleToggle}
                    style={{
                      position: 'relative',
                      width: 'clamp(44px, 5vw, 48px)',
                      height: 'clamp(22px, 2.5vw, 24px)',
                      borderRadius: 'clamp(11px, 1.5vw, 12px)',
                      backgroundColor: isBlobEnabled ? '#6366f1' : '#d1d5db',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      padding: 0,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '2px',
                        left: isBlobEnabled ? 'calc(100% - 22px)' : '2px',
                        width: 'clamp(18px, 2.2vw, 20px)',
                        height: 'clamp(18px, 2.2vw, 20px)',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Global Styles for Animations */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0) scale(1.05); }
            25% { transform: translateX(-2px) scale(1.05); }
            75% { transform: translateX(2px) scale(1.05); }
          }

          .accessibility-btn:active {
            transform: scale(0.95) !important;
            animation: none !important;
          }

          @media (max-width: 900px) {
            .accessibility-btn {
              display: none !important;
            }
          }

          @media (max-width: 1024px) {
            .accessibility-btn {
              right: 10px !important;
              top: 20px !important;
            }
          }
        `}
      </style>
    </>
  );
}