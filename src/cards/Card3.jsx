  import React from "react";
  import Monster from "../assets/svg/Monster.jsx";
  import "../Styles/Card.css";

  export default function Card3() {
    return (
      <div className="card-wrapper">
        {/* Card Container */}
        <div className="card">
          
          {/* Inner Card Border */}
          <div className="card-border" />

          {/* Top Center – GIF / Video Placeholder */}
          <div className="gif-placeholder">
              <video autoPlay loop muted playsInline preload="metadata">
              <source src="/assets/Media/gif1.webm" type="video/webm" />
              <source src="/assets/Media/gif1.mp4" type="video/mp4" />
              </video>
          </div>
          
        
        {/* Bottom Right – SVG Placeholder */}
          <div className="svg-placeholder">
              <Monster />
          </div>
          
          {/* Bottom Left – Label */}
          <div className="card-label-2 ">
            <span>Printf("Hello World");</span>
          </div>

          

          {/* Texture Overlay */}
          <div className="card-texture " />
        
        </div>
      </div>
    );
  }
