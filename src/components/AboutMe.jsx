import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "../Styles/AboutMe.css";
import ASCIIText from "../Design/AsciiText";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const containerRef = useRef();

  useEffect(() => {
    // MOBILE / SMALL SCREENS → disable horizontal scroll
    if (window.innerWidth < 900) return;

    const panels = gsap.utils.toArray(".about-panel");

    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.5, // Balanced scrub value
        snap: {
          snapTo: 1 / (panels.length - 1), // Snap to each panel exactly
          duration: { min: 0.2, max: 0.5 }, // Variable snap speed
          delay: 0.15, // Pause before snapping
          ease: "power1.inOut", // Smooth easing
          directional: false, // Snap to nearest, not just forward
        },
        end: () => "+=" + (containerRef.current.offsetWidth * 2), // More scroll distance = more control
        anticipatePin: 1,
        invalidateOnRefresh: true, // Recalculate on resize
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="font-light text-white about-container "
      
    >
      {/* PANEL 1 */}
      <div className="bg-black about-panel ">
      
      <div className="absolute inset-0 pointer-events-none grain-overlay z-5" />
        <ASCIIText 
            text='HEY!'
            enableWaves={true}
            asciiFontSize={8}
        />
        {/* <h1 className="title">About Me</h1>
        <p className="desc">
          I'm Denish Sharma — a passionate full-stack developer who blends
          creativity with clean engineering to build smooth, fast, and modern
          digital experiences.
        </p> */}
      </div>

      {/* PANEL 2 */}
      <div className="bg-gray-900 about-panel">
        <h2 className="text-orange-400 title">What I Do</h2>

        <ul className="list">
      
          <li>⚡ Frontend Development (React, GSAP, Tailwind)</li>
          <li>⚙️ Backend APIs (Node.js, Express)</li>
          <li>🗄️ Databases (MongoDB, SQL)</li>
          <li>🚀 Performance & UX Optimization</li>
        </ul>
      </div>

      {/* PANEL 3 */}
      <div className="about-panel bg-[#0f0f0f]">
        <h2 className="text-green-400 title">Experience</h2>

        <p className="desc">
          I am a Full Stack Developer specializing in the MERN stack. I build scalable, AI-integrated web applications and responsive digital solutions enhanced by smooth GSAP animations. Always focusing on speed, smoothness, and clean UX.
        </p>
        <h2 className="text-purple-400 title">Beyond Code</h2>

        <p className="desc">
          When I'm not coding, I explore films, anime, and storytelling —
          and use them to inspire the creative elements of my designs.
        </p>
      </div>

      {/* PANEL 4 */}
      <div className="about-panel bg-[#111]">
        
      </div>
    </section>
  );
}