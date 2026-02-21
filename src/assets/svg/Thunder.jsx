import React from 'react';

export default function Thunder() {
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
          @keyframes drawStrokeLoop {
            0% {
              stroke-dashoffset: 350;
            }
            50% {
              stroke-dashoffset: 0;
            }
            85% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 350;
            }
          }
          
          .lightning-stroke {
            stroke-dasharray: 350;
            animation: drawStrokeLoop 3s ease-out infinite;
          }
          
          .lightning-stroke-2 {
            stroke-dasharray: 350;
            animation: drawStrokeLoop 3s ease-out 0.08s infinite;
          }
          
          .lightning-stroke-3 {
            stroke-dasharray: 350;
            animation: drawStrokeLoop 3s ease-out 0.15s infinite;
          }
          
          .lightning-stroke-4 {
            stroke-dasharray: 350;
            animation: drawStrokeLoop 3s ease-out 0.22s infinite;
          }
        `}
            </style>

            <svg width="200" height="80" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
                {/* Lightning bolt - main jagged path with multiple strokes */}
                <path
                    className="lightning-stroke"
                    d="M 55 10 L 45 50 L 60 52 L 40 90 L 58 92 L 35 150"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                <path
                    className="lightning-stroke-2"
                    d="M 56 11 L 46 51 L 61 53 L 41 91 L 59 93 L 36 151"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.7"
                />

                <path
                    className="lightning-stroke-3"
                    d="M 54 9 L 44 49 L 59 51 L 39 89 L 57 91 L 34 149"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.5"
                />

                <path
                    className="lightning-stroke-4"
                    d="M 55.5 10.5 L 45.5 50.5 L 60.5 52.5 L 40.5 90.5 L 58.5 92.5 L 35.5 150.5"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.3"
                />
            </svg>
        </div>
    );
}