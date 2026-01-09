  import React from "react";
  import Crown from "../assets/svg/Crown.jsx";
  import "../Styles/Card.css";

  export default function Card4() {
    return (
      <div className="card-wrapper">
        {/* Card Container */}
        <div className="card-2">
          
          {/* Inner Card Border */}
          <div className="card-border-2" />

          {/* Top Center – GIF / Video Placeholder */}
          <div className="gif-placeholder-2">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
            >
                <source src="/assets/Media/gif4.mp4" type="video/mp4" />
                <source src="/assets/Media/gif4.webm" type="video/webm" />
            </video>
            </div>

          

          {/* Bottom Right – SVG Placeholder */}
          <div className="svg-placeholder-2">
              <Crown />
          </div>

          {/* Texture Overlay */}
          <div className="card-texture " />
        
        </div>
      </div>
    );
  }
