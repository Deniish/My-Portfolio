import React from "react";
import Thunder from "../assets/svg/Thunder.jsx";
import "../Styles/Card.css";

export default function Card6() {
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
            <source src="/assets/Media/gif6.mp4" type="video/mp4" />
            <source src="/assets/Media/gif6.webm" type="video/webm" />
          </video>
        </div>



        {/* Bottom Right – SVG Placeholder */}
        <div className="svg-placeholder-3">
          <Thunder />
        </div>

        {/* Texture Overlay */}
        <div className="card-texture " />

      </div>
    </div>
  );
}
