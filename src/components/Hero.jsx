import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import DenishSignature from "../Design/DenishSignature";
import "../Styles/Hero.css";  
import RippleBackground from "../Design/RippleBackground";
import Particles from "../Design/Particles";
import CardNav from "./CardNav";

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

  const items = [
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
  }
];



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

       <CardNav  
          // logo={logo}
          logoAlt="Company Logo"
          items={items}
          // baseColor="#fff"
          menuColor="#000"
          // buttonBgColor="#111"
          // buttonTextColor="#fff"
          ease="power3.out"
        />
        
      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <DenishSignature />

        
      </div>
    </section>
  );
}
