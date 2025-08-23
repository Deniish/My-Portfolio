import React, { useRef, useState, lazy, Suspense, useEffect } from "react";
import DenishSignature from "../Design/DenishSignature";
import CardNav from "./CardNav";
import "../Styles/Hero.css";
import LightLoader from "../Design/Loader";

// Lazy-load heavy visual components
const Particles = lazy(() => import("../Design/Particles"));
const RippleBackground = lazy(() => import("../Design/RippleBackground"));

const LOADER_MIN_TIME = 1500; // ms, ensures loader is shown at least once

// 👇 Single Loader component
function LoaderBackground({ isVisible }) {
  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading, please wait"
    >
      {/* Smooth radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.03)_40%,transparent_80%)]" />

      {/* Center Loader */}
      <div className="relative z-10">
        <LightLoader />
        {/* Hidden text for screen readers */}
        <span className="sr-only">Loading content...</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const cardNavRef = useRef(null);
  const [bgVisible, setBgVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Preload heavy assets more gracefully
  useEffect(() => {
    const start = Date.now();

    const preload = () =>
      Promise.all([
        import("../Design/Particles"),
        import("../Design/RippleBackground"),
      ]);

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        preload().then(() => {
          const elapsed = Date.now() - start;
          const remaining = Math.max(0, LOADER_MIN_TIME - elapsed);

          setTimeout(() => {
            setLoading(false); // hide loader
            setBgVisible(true); // show main backgrounds
          }, remaining);
        });
      });
    } else {
      preload().then(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, LOADER_MIN_TIME - elapsed);

        setTimeout(() => {
          setLoading(false);
          setBgVisible(true);
        }, remaining);
      });
    }
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white">
      {/* Loader (only one, no double render) */}
      <LoaderBackground isVisible={loading} />

      {/* Backgrounds (only visible when ready) */}
      <Suspense fallback={null}>
        {bgVisible && (
          <>
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
            <RippleBackground />
            <div className="absolute inset-0 pointer-events-none grain-overlay z-5" />
          </>
        )}
      </Suspense>

      {/* CardNav */}
      <CardNav
        ref={cardNavRef}
        items={[
          {
            label: "LinkedIn",
            url: "https://linkedin.com/in/denish-sharma",
            icon: "/icons/linkedin-logo.svg",
            fontFamily: '"Poppins", sans-serif',
          },
          {
            label: "GitHub",
            url: "https://github.com/Deniish",
            icon: "/icons/github-logo.svg",
            fontFamily: '"Monsa-Medium", sans-serif',
          },
          {
            label: "Medium",
            url: "https://medium.com/@denishsharma701",
            icon: "/icons/medium-logo.svg",
            fontFamily: '"Playfair Display", serif',
          },
        ]}
        menuColor="#000"
        ease="power3.out"
      />

      {/* Signature only after background is ready */}
      {bgVisible && (
        <div
          className="relative z-10 flex flex-col items-center px-4 
          opacity-0 animate-fade-in-smooth"
        >
          <DenishSignature cardNavRef={cardNavRef} />
        </div>
      )}
    </section>
  );
}
