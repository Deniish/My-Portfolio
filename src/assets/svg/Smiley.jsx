import React from 'react';

export default function Smiley() {
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
          @keyframes drawFace {
            0% {
              stroke-dashoffset: 320;
            }
            40% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawSmile {
            0%, 40% {
              stroke-dashoffset: 80;
            }
            60% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes popInLoop {
            0%, 35% {
              opacity: 0;
              transform: scale(0);
            }
            
            50%, 100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .face-stroke {
            stroke-dasharray: 320;
            animation: drawFace 4.5s ease-out infinite;
          }
          
          .face-stroke-2 {
            stroke-dasharray: 320;
            animation: drawFace 4.5s ease-out 0.1s infinite;
          }
          
          .face-stroke-3 {
            stroke-dasharray: 320;
            animation: drawFace 4.5s ease-out 0.15s infinite;
          }
          
          .eye-left-svg, .eye-right-svg {
            transform-origin: center;
            animation: popInLoop 4.5s ease-out infinite;
          }
          
          .smile-stroke {
            stroke-dasharray: 80;
            animation: drawSmile 4.5s ease-out infinite;
          }
        `}
      </style>
      
      <svg width="100" height="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        {/* Face outline - multiple overlapping strokes (more circular) */}
        <path 
          className="face-stroke" 
          d="M 60 20 Q 80 20, 90 35 Q 100 50, 100 60 Q 100 70, 90 85 Q 80 100, 60 100 Q 40 100, 30 85 Q 20 70, 20 60 Q 20 50, 30 35 Q 40 20, 60 20" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="face-stroke-2" 
          d="M 61 21 Q 81 21, 91 36 Q 99 51, 99 60 Q 99 69, 91 84 Q 81 99, 61 99 Q 41 99, 31 84 Q 21 69, 21 60 Q 21 51, 31 36 Q 41 21, 61 21" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        <path 
          className="face-stroke-3" 
          d="M 59 19 Q 79 19, 89 34 Q 101 49, 101 60 Q 101 71, 89 86 Q 79 101, 59 101 Q 39 101, 29 86 Q 19 71, 19 60 Q 19 49, 29 34 Q 39 19, 59 19" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Left eye - oval shaped filled dot */}
        <g className="eye-left-svg">
          <ellipse 
            cx="45" 
            cy="50" 
            rx="2" 
            ry="3" 
            fill="#000000"
          />
          <ellipse 
            cx="45.2" 
            cy="50.1" 
            rx="2.2" 
            ry="3.2" 
            fill="none"
            stroke="#000000" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Right eye - oval shaped filled dot */}
        <g className="eye-right-svg">
          <ellipse 
            cx="75" 
            cy="49" 
            rx="2.2" 
            ry="3.2" 
            fill="#000000"
          />
          <ellipse 
            cx="75.2" 
            cy="49.2" 
            rx="2" 
            ry="3" 
            fill="none"
            stroke="#000000" 
            strokeWidth="1.2" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Smile - longer wobbly curved mouth */}
        <path 
          className="smile-stroke" 
          d="M 38 68 Q 48 78, 60 79 Q 72 78, 82 68" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="smile-stroke" 
          d="M 37 67 Q 47 77, 59 78 Q 71 77, 83 67" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.7"
        />
        
        <path 
          className="smile-stroke" 
          d="M 39 69 Q 49 79, 61 80 Q 73 79, 81 69" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />
        
        <path 
          className="smile-stroke" 
          d="M 38 68.3 Q 48.3 77.8, 60 78.5 Q 71.7 77.8, 82 68.3" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}