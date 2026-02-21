import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SignaturePaths, { TaglinePaths } from "../assets/svg/SignaturePaths";
import {
  initializeSignaturePaths,
  runSignatureAnimation,
  init3DHoverEffect,
} from "../Animations/signatureAnimations";

const DenishSignature = ({ 
  cardNavRef, 
  onComplete, 
  onIntroStart, 
  isReady,
  // Color customization props
  nameColor = "#000000",
  taglineColor = "white",
  fillColor = "white",
  underlineGradient = {
    start: "#E6E6E6",
    middle: "#C0C0C0",
    end: "#B0B0B0"
  }
}) => {
  const wrapRef = useRef(null);
  const targetRef = useRef(null);

  // PATH refs
  const pathsRef = useRef([]);
  const scrollTextPathsRef = useRef([]);

  // Element refs
  const underlineRef = useRef(null);
  const textBoxRef = useRef(null);

  // ====== INITIAL SETUP ======
  useEffect(() => {
    const ctx = gsap.context(() => {
      initializeSignaturePaths({
        paths: pathsRef.current,
        scrollTextPaths: scrollTextPathsRef.current,
        underline: underlineRef.current,
        nameColor,
        taglineColor
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [nameColor, taglineColor]);

  // ====== RUN ANIMATIONS ======
  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      runSignatureAnimation({
        namePaths: pathsRef.current,
        taglinePaths: scrollTextPathsRef.current,
        underline: underlineRef.current,
        textBox: textBoxRef.current,
        cardNavRef,
        onIntroStart,
        onComplete,
        fillColor
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [isReady, cardNavRef, onComplete, onIntroStart, fillColor]);

  // ====== 3D HOVER EFFECT ======
  useEffect(() => {
    const cleanup = init3DHoverEffect(wrapRef.current, targetRef.current);
    return cleanup;
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative z-10 flex flex-col items-center px-4 signature-container"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        overflow: "visible",
        willChange: "transform",
      }}
    >
      {/* Main SVG Container */}
      <svg
        ref={targetRef}
        className="w-[100vw] max-w-[1200px] h-auto md:translate-x-10 sm:translate-x-0 block mx-auto overflow-visible"
        style={{
          visibility: isReady ? "visible" : "hidden",
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        viewBox="0 0 300 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <SignaturePaths
          pathsRef={pathsRef}
          scrollTextPathsRef={scrollTextPathsRef}
          underlineRef={underlineRef}
          nameColor={nameColor}
          taglineColor={taglineColor}
          underlineGradientColors={underlineGradient}
        />
      </svg>

      {/* Tagline Container */}
      <div className="absolute mt-5 top-20 left-4 tagline-container">
        <div className="flex items-center gap-2 text-xl font-semibold tagline-content">
          {/* Tagline SVG */}
          <svg
            className="scroll-text w-[300px] h-auto -ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 450 57.75"
            style={{
              visibility: isReady ? "visible" : "hidden",
              opacity: isReady ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <TaglinePaths
              scrollTextPathsRef={scrollTextPathsRef}
              taglineColor={taglineColor}
            />
          </svg>
          
          {/* Text Box */}
          <div className="textBox" ref={textBoxRef}>
            <ul>
              <li>Full Stack Developer</li>
              <li>MERN Specialist</li>
              <li>Cloud Explorer</li>
              <li>AI Innovator</li>
              <li>UI/UX Designer</li>
              <li>Jr. Data Analytics</li>
              <li>Full Stack Developer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DenishSignature;
