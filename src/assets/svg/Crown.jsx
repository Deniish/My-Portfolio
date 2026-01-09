import React from 'react';

export default function Crown() {
  return (
    <div style={{
      margin: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh'
    }}>
      <style>
        {`
          @keyframes drawStroke {
            0% {
              stroke-dashoffset: 300;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawSpike1 {
            0%, 25% {
              stroke-dashoffset: 100;
            }
            35% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawSpike2 {
            0%, 30% {
              stroke-dashoffset: 100;
            }
            40% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawSpike3 {
            0%, 35% {
              stroke-dashoffset: 100;
            }
            45% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawSpike4 {
            0%, 40% {
              stroke-dashoffset: 100;
            }
            50% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes drawSpike5 {
            0%, 45% {
              stroke-dashoffset: 100;
            }
            55% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          @keyframes popInLoop {
            0%, 50% {
              opacity: 0;
              transform: scale(0);
            }
            60% {
              transform: scale(1.2);
            }
            65%, 100% {
              opacity: 0.8;
              transform: scale(1);
            }
          }
          
          @keyframes drawBand {
            0%, 65% {
              stroke-dashoffset: 100;
            }
            80% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 0;
            }
          }
          
          .base-stroke {
            stroke-dasharray: 300;
            animation: drawStroke 4s ease-out infinite;
          }
          
          .base-stroke-2 {
            stroke-dasharray: 300;
            animation: drawStroke 4s ease-out 0.1s infinite;
          }
          
          .base-stroke-3 {
            stroke-dasharray: 300;
            animation: drawStroke 4s ease-out 0.15s infinite;
          }
          
          .spike-1 {
            stroke-dasharray: 100;
            animation: drawSpike1 4s ease-out infinite;
          }
          
          .spike-2 {
            stroke-dasharray: 100;
            animation: drawSpike2 4s ease-out infinite;
          }
          
          .spike-3 {
            stroke-dasharray: 100;
            animation: drawSpike3 4s ease-out infinite;
          }
          
          .spike-4 {
            stroke-dasharray: 100;
            animation: drawSpike4 4s ease-out infinite;
          }
          
          .spike-5 {
            stroke-dasharray: 100;
            animation: drawSpike5 4s ease-out infinite;
          }
          
          .circle {
            transform-origin: center;
            animation: popInLoop 4s ease-out infinite;
          }
          
          .band {
            stroke-dasharray: 100;
            animation: drawBand 4s ease-out infinite;
          }
        `}
      </style>
      
      <svg width="150" height="100" viewBox="0 0 160 100" xmlns="http://www.w3.org/2000/svg">
        {/* Crown base - wobbly bottom */}
        <path 
          className="base-stroke" 
          d="M 25 75 L 30 50 L 50 52 L 80 48 L 110 52 L 130 50 L 135 75 L 25 75" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="base-stroke-2" 
          d="M 26 74 L 31 51 L 51 53 L 81 49 L 111 53 L 131 51 L 134 74" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        <path 
          className="base-stroke-3" 
          d="M 24 76 L 29 49 L 49 51 L 79 47 L 109 51 L 129 49 L 136 76" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Left spike */}
        <path 
          className="spike-1" 
          d="M 30 50 L 28 30 L 35 48" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="spike-1" 
          d="M 30.5 50 L 29 31 L 35.5 48.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Left-center spike (taller) */}
        <path 
          className="spike-2" 
          d="M 50 52 L 52 22 L 58 50" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="spike-2" 
          d="M 50.5 52 L 53 23 L 58.5 50.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Center spike (tallest, slightly tilted) */}
        <path 
          className="spike-3" 
          d="M 80 48 L 85 15 L 88 50" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="spike-3" 
          d="M 80.5 48.5 L 86 16 L 88.5 50.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.6"
        />
        
        <path 
          className="spike-3" 
          d="M 79.5 47.5 L 84 14 L 87.5 49.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.3"
        />

        {/* Right-center spike */}
        <path 
          className="spike-4" 
          d="M 110 52 L 108 25 L 115 50" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="spike-4" 
          d="M 110.5 52 L 109 26 L 115.5 50.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Right spike (shorter) */}
        <path 
          className="spike-5" 
          d="M 130 50 L 132 33 L 136 49" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        
        <path 
          className="spike-5" 
          d="M 130.5 50 L 133 34 L 136.5 49.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          opacity="0.5"
        />

        {/* Decorative circles on spikes */}
        <circle 
          className="circle" 
          cx="28" 
          cy="30" 
          r="3" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
        />
        
        <circle 
          className="circle" 
          cx="52" 
          cy="22" 
          r="3.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
        />
        
        <circle 
          className="circle" 
          cx="85" 
          cy="15" 
          r="4" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
        />
        
        <circle 
          className="circle" 
          cx="108" 
          cy="25" 
          r="3.5" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
        />
        
        <circle 
          className="circle" 
          cx="132" 
          cy="33" 
          r="3" 
          fill="none" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
        />

        {/* Bottom decorative band */}
        <line 
          className="band" 
          x1="30" 
          y1="62" 
          x2="130" 
          y2="62" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
        />
        
        <line 
          className="band" 
          x1="31" 
          y1="63" 
          x2="129" 
          y2="63" 
          stroke="#FFD700" 
          strokeWidth="1.3" 
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}