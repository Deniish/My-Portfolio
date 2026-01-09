import React from 'react';

export default function Monster() {
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
            40% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawHorn {
            0%, 35% {
              stroke-dashoffset: 50;
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes popInLoop {
            0%, 45% {
              opacity: 0;
              transform: scale(0);
            }
            55% {
              transform: scale(1.2);
            }
            60%, 100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes drawSmile {
            0%, 55% {
              stroke-dashoffset: 100;
              opacity: 1;
            }
            70% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            95% {
              stroke-dashoffset: 0;
              opacity: 0;
            }
            100% {
              stroke-dashoffset: 100;
              opacity: 0;
            }
          }
          
          @keyframes drawTooth {
            0%, 70% {
              stroke-dashoffset: 20;
              opacity: 1;
            }
            80% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            95% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            100% {
              stroke-dashoffset: 20;
              opacity: 0;
            }
          }
          
          .head-stroke {
            stroke-dasharray: 400;
            animation: drawStroke 4s ease-out infinite;
          }
          
          .head-stroke-2 {
            stroke-dasharray: 400;
            animation: drawStroke 4s ease-out 0.1s infinite;
          }
          
          .head-stroke-3 {
            stroke-dasharray: 400;
            animation: drawStroke 4s ease-out 0.15s infinite;
          }
          
          .horn {
            stroke-dasharray: 50;
            animation: drawHorn 4s ease-out infinite;
          }
          
          .horn-left {
            animation-delay: 0s;
          }
          
          .horn-right {
            animation-delay: 0.05s;
          }
          
          .eye-left-monster, .eye-right-monster {
            transform-origin: center;
            animation: popInLoop 4s ease-out infinite;
          }
          
          .eye-left-monster {
            animation-delay: 0s;
          }
          
          .eye-right-monster {
            animation-delay: 0.05s;
          }
          
          .smile-stroke {
            stroke-dasharray: 100;
            animation: drawSmile 4s ease-out infinite;
          }
          
          .tooth {
            stroke-dasharray: 20;
            animation: drawTooth 4s ease-out infinite;
          }
          
          .tooth-1 {
            animation-delay: 0s;
          }
          
          .tooth-2 {
            animation-delay: 0.05s;
          }
          
          .tooth-3 {
            animation-delay: 0.1s;
          }
        `}
      </style>
      
      <svg width="100" height="100" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        {/* Monster head - blob shape with multiple strokes */}
        <path 
          className="head-stroke" 
          d="M 70 25 Q 95 22, 105 40 Q 115 55, 113 70 Q 115 85, 105 100 Q 90 115, 70 113 Q 50 115, 35 100 Q 25 85, 27 70 Q 25 55, 35 40 Q 50 22, 70 25" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="head-stroke-2" 
          d="M 71 24 Q 96 21, 106 39 Q 116 54, 114 69 Q 116 84, 106 99 Q 91 114, 71 112 Q 51 114, 36 99 Q 26 84, 28 69 Q 26 54, 36 39 Q 51 21, 71 24" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        <path 
          className="head-stroke-3" 
          d="M 69 26 Q 94 23, 104 41 Q 114 56, 112 71 Q 114 86, 104 101 Q 89 116, 69 114 Q 49 116, 34 101 Q 24 86, 26 71 Q 24 56, 34 41 Q 49 23, 69 26" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Left horn - curved spike */}
        <path 
          className="horn horn-left" 
          d="M 45 35 Q 38 28, 35 22 Q 37 26, 42 32" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="horn horn-left" 
          d="M 45.5 35.5 Q 39 29, 36 23" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Right horn - curved spike */}
        <path 
          className="horn horn-right" 
          d="M 95 35 Q 102 28, 105 22 Q 103 26, 98 32" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="horn horn-right" 
          d="M 94.5 35.5 Q 101 29, 104 23" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Left eye - larger oval */}
        <g className="eye-left-monster">
          <ellipse 
            cx="52" 
            cy="60" 
            rx="5" 
            ry="7" 
            fill="#000000"
          />
          <ellipse 
            cx="52.3" 
            cy="60.2" 
            rx="5.3" 
            ry="7.3" 
            fill="none"
            stroke="#000000" 
            strokeWidth="1.4" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Right eye - smaller oval */}
        <g className="eye-right-monster">
          <ellipse 
            cx="88" 
            cy="58" 
            rx="3.5" 
            ry="5" 
            fill="#000000"
          />
          <ellipse 
            cx="88.2" 
            cy="58.3" 
            rx="3.8" 
            ry="5.3" 
            fill="none"
            stroke="#000000" 
            strokeWidth="1.4" 
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Crooked smile - multiple overlapping strokes */}
        <path 
          className="smile-stroke" 
          d="M 45 80 Q 52 90, 65 92 Q 78 91, 90 85" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="smile-stroke" 
          d="M 44 79 Q 51 89, 64 91 Q 77 90, 91 84" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.7"
        />
        
        <path 
          className="smile-stroke" 
          d="M 46 81 Q 53 91, 66 93 Q 79 92, 89 86" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Triangle teeth */}
        <path 
          className="tooth tooth-1" 
          d="M 55 87 L 57 82 L 59 87" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="tooth tooth-2" 
          d="M 68 90 L 70 84 L 72 90" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="tooth tooth-3" 
          d="M 80 88 L 82 83 L 84 88" 
          fill="none" 
          stroke="#000000" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}