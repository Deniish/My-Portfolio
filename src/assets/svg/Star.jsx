import React from 'react';

export default function Star() {
  return (
    <div style={{
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    }}>
      <style>
        {`
          @keyframes drawStroke {
            0% {
              stroke-dashoffset: 400;
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes continuousFade {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }
          
          .star-stroke {
            stroke-dasharray: 400;
            animation: drawStroke 4s ease-out infinite;
          }
          
          .star-stroke-2 {
            stroke-dasharray: 400;
            animation: drawStroke 4s ease-out 0.1s infinite;
          }
          
          .star-stroke-3 {
            stroke-dasharray: 400;
            animation: drawStroke 4s ease-out 0.18s infinite;
          }
          
          .sparkle {
            stroke-dasharray: 20;
            stroke-dashoffset: 0;
            animation: continuousFade 2s ease-in-out infinite;
          }
          
          .sparkle-1 { animation-delay: 0s; }
          .sparkle-2 { animation-delay: 0.3s; }
          .sparkle-3 { animation-delay: 0.6s; }
          .sparkle-4 { animation-delay: 0.9s; }
        `}
      </style>
      
      <svg width="200" height="80" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        {/* Star shape - uneven and asymmetrical with multiple strokes */}
        <path 
          className="star-stroke" 
          d="M 70 25 L 78 58 L 112 62 L 85 85 L 92 118 L 70 102 L 48 118 L 55 85 L 28 62 L 62 58 Z" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="star-stroke-2" 
          d="M 70.5 24 L 79 57 L 113 61 L 86 84 L 93 117 L 70.5 101 L 48.5 117 L 55.5 84 L 28.5 61 L 62.5 57 Z" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        <path 
          className="star-stroke-3" 
          d="M 69.5 26 L 77.5 59 L 111 63 L 84 86 L 91 119 L 69.5 103 L 47.5 119 L 54.5 86 L 27.5 63 L 61.5 59 Z" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Sparkle lines around the star - parallel curved lines stacked on 4 sides */}
        
        {/* Top sparkles (2 curved lines stacked vertically) */}
        <path 
          className="sparkle sparkle-1" 
          d="M 62 10 Q 70 7, 78 10" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />
        <path 
          className="sparkle sparkle-1" 
          d="M 62 14 Q 70 11, 78 14" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />

        {/* Right sparkles (2 curved lines stacked horizontally) */}
        <path 
          className="sparkle sparkle-2" 
          d="M 126 62 Q 129 70, 126 78" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />
        <path 
          className="sparkle sparkle-2" 
          d="M 130 62 Q 133 70, 130 78" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />

        {/* Bottom sparkles (2 curved lines stacked vertically) */}
        <path 
          className="sparkle sparkle-3" 
          d="M 62 126 Q 70 129, 78 126" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />
        <path 
          className="sparkle sparkle-3" 
          d="M 62 130 Q 70 133, 78 130" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />

        {/* Left sparkles (2 curved lines stacked horizontally) */}
        <path 
          className="sparkle sparkle-4" 
          d="M 14 62 Q 11 70, 14 78" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />
        <path 
          className="sparkle sparkle-4" 
          d="M 10 62 Q 7 70, 10 78" 
          fill="none"
          stroke="#2C3E50" 
          strokeWidth="1.4" 
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}