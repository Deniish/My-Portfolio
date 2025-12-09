// BackgroundLayer.jsx
import React, { Suspense } from "react";

const Particles = React.lazy(() => import("../Design/Particles"));
const BlobCursor = React.lazy(() => import("../Design/BlobCursor"));

export default function BackgroundLayer({ visible = true }) {
  if (!visible) return null;

  return (
    <Suspense fallback={null}>
      <div className="absolute inset-0 z-0 transition-opacity duration-1000 opacity-100">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={1000}
          particleSpread={20}
          speed={0.3}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      <BlobCursor  />
      <div className="absolute inset-0 pointer-events-none grain-overlay z-5" />
    </Suspense>
  );
}