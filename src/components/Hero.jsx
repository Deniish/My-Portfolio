  import { useLayoutEffect, useRef } from "react";
  import { gsap } from "gsap";
  import LightRays from "../Design/lightray";
import DenishSignature from "../Design/DenishSignature";
import "../Styles/Hero.css";
import RippleBackground from "../Design/RippleBackground";
import LiquidBackground from "../Design/LiquidBackground";
  export default function Hero() {
    const denishRef = useRef(null);

    useLayoutEffect(() => {
      const denishPath = denishRef.current;
      if (!denishPath) return;

      const length = denishPath.getTotalLength();

      // Initial state
      gsap.set(denishPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
        stroke: "white",
        fill: "transparent",
        filter: "drop-shadow(0 0 0px white)"
      });

      // Timeline animation
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .to(denishPath, { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" })
        .to(denishPath, { fill: "white", duration: 1 }, "-=1");
    }, []);

    return (
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white">
        {/* Background Light Rays */}
        <div className="absolute inset-0 z-0">
          {/* <LightRays
            raysOrigin="top-center"
            raysColor="#00ffff"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
          /> */}
        </div>
        <RippleBackground />
        {/* <LiquidBackground /> */}
       {/* Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none grain-overlay z-5"></div>
        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center px-4">
          <DenishSignature />
          

          {/* Subtitle */}
          {/* <p className="max-w-xl mx-auto mt-6 text-lg text-gray-300 md:text-2xl">
            A passionate developer creating modern web experiences with React & 3D effects.
          </p> */}
        </div>
      </section>
    );
  }
