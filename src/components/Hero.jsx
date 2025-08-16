import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import DenishSignature from "../Design/DenishSignature";
import "../Styles/Hero.css";
import RippleBackground from "../Design/RippleBackground";
import Particles from "../Design/Particles";

export default function Hero() {
  const denishRef = useRef(null);

  useLayoutEffect(() => {
    const denishPath = denishRef.current;
    if (!denishPath) return;

    const length = denishPath.getTotalLength();

    gsap.set(denishPath, {
      strokeDasharray: length,
      strokeDashoffset: length,
      stroke: "white",
      fill: "transparent",
      filter: "drop-shadow(0 0 0px white)"
    });

    gsap.timeline({ defaults: { ease: "power2.out" } })
      .to(denishPath, { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" })
      .to(denishPath, { fill: "white", duration: 1 }, "-=1");
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-white">
      
      {/* Particles as background */}
      <div className="absolute inset-0 z-0 width: '100%'">
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

      <div className="absolute inset-0 pointer-events-none grain-overlay z-5"></div>

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <DenishSignature />
      </div>
    </section>
  );
}
