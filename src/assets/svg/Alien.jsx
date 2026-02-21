import React from 'react';

export default function Alien() {
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
          @keyframes fadeInLoop {
            0%, 15% {
              opacity: 0;
            }
            25% {
              opacity: 0.9;
            }
            90% {
              opacity: 0.9;
            }
            100% {
              opacity: 0;
            }
          }
          
          @keyframes drawStrokeLoop {
            0% {
              stroke-dashoffset: 500;
            }
            40% {
              stroke-dashoffset: 0;
            }
            90% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 500;
            }
          }
          
          @keyframes drawHornLoop {
            0%, 30% {
              stroke-dashoffset: 60;
            }
            45% {
              stroke-dashoffset: 0;
            }
            90% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 60;
            }
          }
          
          @keyframes fadeElementLoop {
            0%, 35% {
              opacity: 0;
            }
            45% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          
          @keyframes popInLoop {
            0%, 45% {
              opacity: 0;
              transform: scale(0);
            }
            55% {
              opacity: 1;
              transform: scale(1.15);
            }
            60%, 90% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(0);
            }
          }
          
          @keyframes drawMouthLoop {
            0%, 50% {
              stroke-dashoffset: 80;
            }
            60% {
              stroke-dashoffset: 0;
            }
            90% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 80;
            }
          }
          
          @keyframes drawArmLoop {
            0%, 48% {
              stroke-dashoffset: 40;
            }
            58% {
              stroke-dashoffset: 0;
            }
            90% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 40;
            }
          }
          
          @keyframes fadeSpotLoop {
            0%, 65% {
              opacity: 0;
            }
            75% {
              opacity: 0.8;
            }
            90% {
              opacity: 0.8;
            }
            100% {
              opacity: 0;
            }
          }
          
          .body-fill {
            animation: fadeInLoop 5s ease-out infinite;
          }
          
          .body-stroke {
            stroke-dasharray: 500;
            animation: drawStrokeLoop 5s ease-out infinite;
          }
          
          .body-stroke-2 {
            stroke-dasharray: 500;
            animation: drawStrokeLoop 5s ease-out 0.1s infinite;
          }
          
          .horn {
            stroke-dasharray: 60;
            animation: drawHornLoop 5s ease-out infinite;
          }
          
          .horn-left {
            animation-delay: 0s;
          }
          
          .horn-right {
            animation-delay: 0.1s;
          }
          
          .spike {
            animation: fadeElementLoop 5s ease-out infinite;
          }
          
          .spike-1 { animation-delay: 0s; }
          .spike-2 { animation-delay: 0.05s; }
          .spike-3 { animation-delay: 0.1s; }
          .spike-4 { animation-delay: 0.15s; }
          .spike-5 { animation-delay: 0.2s; }
          
          .eye-group {
            transform-origin: center;
            animation: popInLoop 5s ease-out infinite;
          }
          
          .eye-left {
            animation-delay: 0s;
          }
          
          .eye-right {
            animation-delay: 0.15s;
          }
          
          .mouth-stroke {
            stroke-dasharray: 80;
            animation: drawMouthLoop 5s ease-out infinite;
          }
          
          .mouth-1 {
            animation-delay: 0s;
          }
          
          .mouth-2 {
            animation-delay: 0.05s;
          }
          
          .tooth {
            animation: fadeElementLoop 5s ease-out infinite;
          }
          
          .tooth-1 { animation-delay: 0.2s; }
          .tooth-2 { animation-delay: 0.3s; }
          .tooth-3 { animation-delay: 0.4s; }
          
          .spot {
            animation: fadeSpotLoop 5s ease-out infinite;
          }
          
          .spot-1 { animation-delay: 0s; }
          .spot-2 { animation-delay: 0.1s; }
          .spot-3 { animation-delay: 0.2s; }
          .spot-4 { animation-delay: 0.3s; }
          
          .arm {
            stroke-dasharray: 40;
            animation: drawArmLoop 5s ease-out infinite;
          }
          
          .arm-left {
            animation-delay: 0s;
          }
          
          .arm-right {
            animation-delay: 0.1s;
          }
        `}
      </style>
      
      <svg width="100" height="100" viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg">
        {/* Monster body - blob shape with color fill */}
        <path 
          className="body-fill" 
          d="M 90 40 Q 120 38, 135 60 Q 145 80, 143 100 Q 145 120, 135 140 Q 115 160, 90 158 Q 65 160, 45 140 Q 35 120, 37 100 Q 35 80, 45 60 Q 60 38, 90 40" 
          fill="#4ECDC4" 
          opacity="0.9"
        />
        
        <path 
          className="body-stroke" 
          d="M 90 40 Q 120 38, 135 60 Q 145 80, 143 100 Q 145 120, 135 140 Q 115 160, 90 158 Q 65 160, 45 140 Q 35 120, 37 100 Q 35 80, 45 60 Q 60 38, 90 40" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="body-stroke-2" 
          d="M 91 39 Q 121 37, 136 59 Q 146 79, 144 99 Q 146 119, 136 139 Q 116 159, 91 157 Q 66 159, 46 139 Q 36 119, 38 99 Q 36 79, 46 59 Q 61 37, 91 39" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Curved horns (striped) */}
        <g className="horn horn-left">
          <path 
            d="M 60 50 Q 48 38, 45 28" 
            fill="none" 
            stroke="#FF6B6B" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d="M 59 48 L 56 44 M 57 44 L 54 40 M 55 40 L 52 36 M 53 36 L 50 32" 
            fill="none" 
            stroke="#fdf6e3" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </g>
        
        <g className="horn horn-right">
          <path 
            d="M 120 50 Q 132 38, 135 28" 
            fill="none" 
            stroke="#FF6B6B" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d="M 121 48 L 124 44 M 123 44 L 126 40 M 125 40 L 128 36 M 127 36 L 130 32" 
            fill="none" 
            stroke="#fdf6e3" 
            strokeWidth="2.5" 
            strokeLinecap="round"
          />
        </g>

        {/* Back spikes (triangles) */}
        <path className="spike spike-1" d="M 50 90 L 40 85 L 45 95 Z" fill="#FFB86F" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
        <path className="spike spike-2" d="M 50 110 L 38 108 L 45 118 Z" fill="#FFB86F" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
        <path className="spike spike-3" d="M 130 90 L 140 85 L 135 95 Z" fill="#FFB86F" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
        <path className="spike spike-4" d="M 130 110 L 142 108 L 135 118 Z" fill="#FFB86F" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>
        <path className="spike spike-5" d="M 90 30 L 85 20 L 95 20 Z" fill="#FFB86F" stroke="#2C3E50" strokeWidth="2" strokeLinejoin="round"/>

        {/* Left eye (larger with eyestalk) */}
        <g className="eye-group eye-left">
          <line x1="70" y1="75" x2="65" y2="60" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="65" cy="55" r="12" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="2.5"/>
          <circle cx="67" cy="53" r="6" fill="#2C3E50"/>
          <circle cx="69" cy="51" r="2.5" fill="#FFFFFF"/>
        </g>

        {/* Right eye (smaller with eyestalk) */}
        <g className="eye-group eye-right">
          <line x1="110" y1="80" x2="118" y2="68" stroke="#2C3E50" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="120" cy="62" r="10" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="2.5"/>
          <circle cx="121" cy="61" r="5" fill="#2C3E50"/>
          <circle cx="123" cy="59" r="2" fill="#FFFFFF"/>
        </g>

        {/* Arms */}
        <path 
          className="arm arm-left" 
          d="M 55 115 Q 40 118, 35 125" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />
        
        <path 
          className="arm arm-right" 
          d="M 125 115 Q 140 118, 145 125" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="3.5" 
          strokeLinecap="round"
        />

        {/* Big smile */}
        <path 
          className="mouth-stroke mouth-1" 
          d="M 65 110 Q 75 125, 90 127 Q 105 125, 115 110" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="2.5" 
          strokeLinecap="round"
        />
        
        <path 
          className="mouth-stroke mouth-2" 
          d="M 64 109 Q 74 124, 89 126 Q 104 124, 116 109" 
          fill="none" 
          stroke="#2C3E50" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Triangle teeth */}
        <path className="tooth tooth-1" d="M 75 118 L 78 113 L 81 118 Z" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="1.5" strokeLinejoin="round"/>
        <path className="tooth tooth-2" d="M 88 121 L 91 115 L 94 121 Z" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="1.5" strokeLinejoin="round"/>
        <path className="tooth tooth-3" d="M 101 118 L 104 113 L 107 118 Z" fill="#FFFFFF" stroke="#2C3E50" strokeWidth="1.5" strokeLinejoin="round"/>

        {/* Spots on body */}
        <circle className="spot spot-1" cx="70" cy="90" r="5" fill="#FF6B6B" opacity="0.8"/>
        <circle className="spot spot-2" cx="95" cy="95" r="4" fill="#FFB86F" opacity="0.8"/>
        <circle className="spot spot-3" cx="110" cy="105" r="6" fill="#FF6B6B" opacity="0.8"/>
        <circle className="spot spot-4" cx="80" cy="135" r="4.5" fill="#FFB86F" opacity="0.8"/>
      </svg>
    </div>
  );
}