import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const AnimatedTextLines = ({ text, className }) => {
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  const lines = text.split("\n").filter((l) => l.trim() !== "");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(lineRefs.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out",
        scrollTrigger: {
          trigger: containerRef.current,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => (
        <span
          key={i}
          ref={(el) => (lineRefs.current[i] = el)}
          className="block leading-relaxed tracking-wide"
        >
          {line}
        </span>
      ))}
    </div>
  );
};
