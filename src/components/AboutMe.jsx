import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../Styles/AboutMe.css";
import ASCIIText from "../Design/AsciiText";
import Card from "../cards/Card";
import Card2 from "../cards/Card2";
import Card3 from "../cards/Card3";
import Card4 from "../cards/Card4";
import { useLenis } from "lenis/react";
import {
  setupLenisScrollProxy,
  hardHideCards,
  setupHorizontalScroll,
  setupBackgroundColorTransitions,
  setupLineAnimations,
  setupTextHighlights,
  setupContentReveal,
  setupAllCardAnimations,
  setupContinuousScrollSlide,
  setupSvgHighlightAnimations,
  configureScrollTrigger,
  cleanupAllAnimations,
} from "../Animations/gsapAnimations";

export default function AboutMe() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const lenis = useLenis();

  /* =====================================================
     CONNECT GSAP ⇄ REACT LENIS (NO SPEED CHANGE)
  ===================================================== */
  useEffect(() => {
    const cleanup = setupLenisScrollProxy(lenis);
    return cleanup;
  }, [lenis]);

  /* =====================================================
     HARD HIDE CARDS (NO FLASH ON LOAD)
  ===================================================== */
  useEffect(() => {
    hardHideCards(cardsRef);
  }, []);

  /* =====================================================
     MAIN SCROLL + PANEL ANIMATIONS
  ===================================================== */
  useEffect(() => {
    if (window.innerWidth < 900) return;

    const panels = gsap.utils.toArray(".about-panel");

    // Setup horizontal scroll
    const horizontalScroll = setupHorizontalScroll(panels, containerRef);

    // Setup background color transitions
    setupBackgroundColorTransitions(panels, containerRef, horizontalScroll);

    // Setup line animations
    setupLineAnimations(panels, horizontalScroll);

    // Setup text highlights
    setupTextHighlights(panels, horizontalScroll);

    // Setup content reveal
    setupContentReveal(panels, horizontalScroll);

    // Setup all card animations
    const cleanupFns = setupAllCardAnimations(cardsRef, panels, horizontalScroll);

    // Setup continuous scroll slide
    setupContinuousScrollSlide(panels, horizontalScroll);

    // Setup SVG highlight animations
    setupSvgHighlightAnimations(panels, horizontalScroll);

    // Configure ScrollTrigger
    configureScrollTrigger();

    return () => {
      cleanupAllAnimations(cleanupFns);
    };
  }, []);

  /* =====================================================
     JSX
  ===================================================== */
  return (
    <section
      id="about"
      ref={containerRef}
      className="font-light text-white about-container"
      style={{ backgroundColor: "#000000" }}
    >
      {/* PANEL 1 */}
      <div className="about-panel">
        <ASCIIText text="HEY!" enableWaves asciiFontSize={8} />
      </div>

      {/* PANEL 2 */}
      <div className="about-panel">
        {/* Left card */}
        <div
          ref={el => cardsRef.current[0] = el}
          className="absolute translate-x-4 translate-y-2 pointer-events-none -bottom-10 -left-20"
        >
          <Card />
        </div>

        {/* Right card */}
        <div
          ref={el => cardsRef.current[1] = el}
          className="absolute translate-x-4 -translate-y-2 pointer-events-none -top-36 right-20"
        >
          <Card2 />
        </div>

        <div className="relative mb-0 -translate-y-1 svg-highlight">
          <img
            src="/svg/WhatIDo.svg"
            alt="What I Do"
            className="title inline-block w-auto h-[3.2rem]"
          />
        </div>

        <div className="line line-title !mb-3 !mt-0" />

        <ul className="mt-1 space-y-1 text-3xl font-normal leading-snug tracking-wider list md:text-4xl lg:text-5xl">
          <li><span className="highlight">⚡ Frontend Development (React, GSAP, Tailwind)</span></li>
          <li><span className="highlight">⚙️ Backend APIs (Node.js, Express)</span></li>
          <li><span className="highlight">🗄️ Databases (MongoDB, SQL)</span></li>
          <li><span className="highlight">🚀 Performance & UX Optimization</span></li>
        </ul>

        <div className="line line-text !mt-2" />
      </div>

      {/* PANEL 3 */}
      <div className="about-panel">
        {/* Left card */}
        <div
          ref={el => cardsRef.current[2] = el}
          className="absolute -translate-x-4 translate-y-2 pointer-events-none -bottom-10 -left-16"
        >
          <Card3 />
        </div>

        {/* Right card */}
        <div
          ref={el => cardsRef.current[3] = el}
          className="absolute translate-x-4 -translate-y-2 pointer-events-none -top-36 right-28"
        >
          <Card4 />
        </div>

        <div className="relative -translate-y-2 svg-highlight">
          <img
            src="/svg/Experience.svg"
            alt="Experience"
            className="title inline-block w-auto h-[3.2rem] top-[8px] relative"
          />
        </div>

        <div className="line line-title" />

        <ul className="list paragraph-list">
          <li><span className="highlight">I am a Full Stack Developer specializing in the MERN stack.</span></li>
          <li><span className="highlight">I build scalable, AI-integrated web applications.</span></li>
          <li><span className="highlight">I focus on responsive digital solutions with smooth GSAP animations.</span></li>
        </ul>

        <div className="line line-text" />
      </div>

      {/* PANEL 4 */}
      <div className="about-panel">
        {/* Left card */}
        <div
          ref={el => cardsRef.current[4] = el}
          className="absolute translate-x-2 pointer-events-none -bottom-10 -left-20"
        >
          <Card />
        </div>

        {/* Right card */}
        <div
          ref={el => cardsRef.current[5] = el}
          className="absolute -translate-x-2 pointer-events-none -top-36 right-24"
        >
          <Card2 />
        </div>

        <div className="relative -translate-y-2 svg-highlight">
          <img
            src="/svg/BeyondCode.svg"
            alt="Beyond Code"
            className="title inline-block w-auto h-[3.2rem] top-[8px] relative"
          />
        </div>

        <div className="line line-title" />

        <ul className="list paragraph-list">
          <li><span className="highlight">When I'm not coding, I explore films and anime.</span></li>
          <li><span className="highlight">I love storytelling and cinematic narratives.</span></li>
          <li><span className="highlight">These inspire the creative elements of my designs.</span></li>
        </ul>

        <div className="line line-text" />
      </div>

      {/* PANEL 5 */}
      <div className="about-panel">
        <h2 className="text-blue-400 title">Let's Connect</h2>
        <p className="desc">
          Ready to bring your ideas to life with cutting-edge web solutions.
        </p>
      </div>

      <div className="absolute inset-0 pointer-events-none grain-overlay-2 z-5" />
    </section>
  );
}