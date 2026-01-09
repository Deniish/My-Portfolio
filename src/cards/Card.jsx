  import React from "react";
  import Smiley from "../assets/svg/Smiley.jsx";
  import "../Styles/Card.css";

  export default function Card() {
    return (
      <div className="card-wrapper">
        {/* Card Container */}
        <div className="card">
          
          {/* Inner Card Border */}
          <div className="card-border" />

          {/* Top Center – GIF / Video Placeholder */}
          <div className="gif-placeholder">
              <video autoPlay loop muted playsInline preload="metadata">
              <source src="/assets/Media/gif3.webm" type="video/webm" />
              <source src="/assets/Media/gif3.mp4" type="video/mp4" />
              </video>
          </div>
          

          {/* Bottom Left – Label */}
          <div className="card-label">
            <span>Code → Coffee</span>
          </div>

          {/* Bottom Right – SVG Placeholder */}
          <div className="svg-placeholder">
              <Smiley />
          </div>

          {/* Texture Overlay */}
          <div className="card-texture " />
        
        </div>
      </div>
    );
  }
