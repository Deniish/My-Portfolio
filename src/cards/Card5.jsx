  import React from "react";
  import Monster from "../assets/svg/Monster.jsx";
  import "../Styles/Card.css";
import Alien from "../assets/svg/Alien.jsx";

  export default function Card5() {
    return (
      <div className="card-wrapper">
        {/* Card Container */}
        <div className="card">
          
          {/* Inner Card Border */}
          <div className="card-border" />

          {/* Top Center – GIF / Video Placeholder */}
          <div className="gif-placeholder">
              <video autoPlay loop muted playsInline preload="metadata">
              <source src="/assets/Media/gif5.webm" type="video/webm" />
              <source src="/assets/Media/gif5.mp4" type="video/mp4" />
              </video>
          </div>
          
        
        {/* Bottom Right – SVG Placeholder */}
          <div className="svg-placeholder">
              <Alien />
          </div>
          
          {/* Bottom Left – Label */}
         <div className="card-label-3">
          <img src="/icons/anchor-tp.png" alt="Anchor"  />
          <img src="/icons/Strawhats-tp.png" alt="StrawHat"  />
        </div>


          

          {/* Texture Overlay */}
          <div className="card-texture " />
        
        </div>
      </div>
    );
  }
