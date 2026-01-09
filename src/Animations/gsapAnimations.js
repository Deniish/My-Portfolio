import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   CONNECT GSAP ⇄ REACT LENIS (NO SPEED CHANGE)
===================================================== */
export const setupLenisScrollProxy = (lenis) => {
  if (!lenis) return;

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  const refresh = () => ScrollTrigger.refresh();
  
  // Sync Lenis scroll with ScrollTrigger updates
  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });
  
  lenis.on("resize", refresh);
  ScrollTrigger.refresh();

  return () => {
    lenis.off("scroll", ScrollTrigger.update);
    lenis.off("resize", refresh);
  };
};

/* =====================================================
   HARD HIDE CARDS (NO FLASH ON LOAD)
===================================================== */
export const hardHideCards = (cardsRef) => {
  cardsRef.current.forEach(card => {
    if (card) {
      gsap.set(card, {
        opacity: 0,
        visibility: "hidden",
        y: 120,
        scale: 0.9,
        rotate: 12,
        filter: "blur(8px)",
      });
    }
  });
};

/* =====================================================
   REUSABLE CARD ANIMATION FUNCTION (ENHANCED TILT)
===================================================== */
export const setupCardAnimation = (cardElement, triggerPanel, horizontalScroll, baseRotation = 12) => {
  if (!cardElement || !triggerPanel) return;

  let floatAnimationId;
  let currentRotation = baseRotation;
  let targetRotation = baseRotation;
  let lastProgress = 0;

  const setRotate = gsap.quickSetter(cardElement, "rotate", "deg");

  // ---------------- FLOATING (INDEPENDENT) ----------------
  let floatValue = 0;
  const floatLoop = () => {
    floatValue += 0.018;
    const yOffset = Math.sin(floatValue) * 10;
    gsap.set(cardElement, { y: yOffset, force3D: true });
    floatAnimationId = requestAnimationFrame(floatLoop);
  };

  // 🔥 START FLOATING ONCE
  floatLoop();

  // ---------------- SCROLLTRIGGER ----------------
  ScrollTrigger.create({
    trigger: triggerPanel,
    start: "left 85%",
    end: "right 30%",
    containerAnimation: horizontalScroll,

    onEnter: () => {
      lastProgress = 0;

      gsap.fromTo(
        cardElement,
        {
          opacity: 0,
          visibility: "hidden",
          y: 120,
          scale: 0.9,
          rotate: currentRotation,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          visibility: "visible",
          y: 0,
          scale: 1,
          rotate: currentRotation,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    },

    onUpdate: self => {
      const delta = self.progress - lastProgress;
      lastProgress = self.progress;

      // Enhanced scroll influence for more live/responsive tilt
      targetRotation += delta * -28; // Increased from -18 for more pronounced effect

      // Wider limits for more dramatic rotation
      targetRotation = gsap.utils.clamp(
        baseRotation - 18, // Increased from 12
        baseRotation + 18, // Increased from 12
        targetRotation
      );

      // Faster response for more immediate/live feel
      currentRotation += (targetRotation - currentRotation) * 0.18; // Increased from 0.12

      setRotate(currentRotation);
    },

    onLeave: () => {
      // keep state, do NOTHING to float
      currentRotation = Math.max(currentRotation, baseRotation);
    },

    onLeaveBack: () => {
      // hide only (do NOT stop float) - instant hide to prevent container/media mismatch
      gsap.set(cardElement, {
        opacity: 0,
        visibility: "hidden",
        y: 120,
        scale: 0.9,
        rotate: currentRotation,
        filter: "blur(8px)",
      });

      lastProgress = 0;
    },
  });

  // Return cleanup function
  return () => {
    if (floatAnimationId) {
      cancelAnimationFrame(floatAnimationId);
    }
  };
};

/* =====================================================
   HORIZONTAL SCROLL (SLOW + SMOOTH)
===================================================== */
export const setupHorizontalScroll = (panels, containerRef) => {
  return gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: containerRef.current,
      pin: true,
      scrub: 3.1, // Ultra-slow scroll response (higher = slower, smoother)
      end: () =>
        "+=" +
        containerRef.current.offsetWidth *
          panels.length *
          3.1, // Makes horizontal section take MUCH more scroll distance
      anticipatePin: 1,
      invalidateOnRefresh: true,
      id: "horizontal",
      smoothChildTiming: true, // Smoother nested animation timing
    },
  });
};

/* =====================================================
   BACKGROUND COLOR TRANSITIONS
===================================================== */
export const setupBackgroundColorTransitions = (panels, containerRef, horizontalScroll) => {
  const colors = [
    "#000000",
    "rgb(102, 176, 92)",
    "rgb(253, 112, 36)",
    "rgb(136, 183, 189)",
    "#000000",
  ];

  panels.forEach((panel, index) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "left center",
      end: "right center",
      containerAnimation: horizontalScroll,
      onEnter: () =>
        gsap.to(containerRef.current, {
          backgroundColor: colors[index],
          duration: 0.8,
          ease: "power1.inOut",
        }),
      onEnterBack: () =>
        gsap.to(containerRef.current, {
          backgroundColor: colors[index],
          duration: 0.8,
          ease: "power1.inOut",
        }),
    });
  });
};

/* =====================================================
   LINE ANIMATIONS
===================================================== */
export const setupLineAnimations = (panels, horizontalScroll) => {
  panels.forEach(panel => {
    const lineTitle = panel.querySelector(".line-title");
    const lineText = panel.querySelector(".line-text");
    if (!lineTitle || !lineText) return;

    gsap.fromTo(
      lineTitle,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineTitle,
          start: "left 75%",
          containerAnimation: horizontalScroll,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    gsap.fromTo(
      lineText,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 1.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: lineText,
          start: "left 75%",
          containerAnimation: horizontalScroll,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });
};

/* =====================================================
   TEXT HIGHLIGHT (HAND-DRAWN STYLE)
===================================================== */
export const setupTextHighlights = (panels, horizontalScroll) => {
  const highlightColors = {
    1: "#e8df2c92",
    2: "#ff3b00",
    3: "#7c4a2d",
  };

  panels.forEach((panel, panelIndex) => {
    const highlights = panel.querySelectorAll(".highlight");
    if (!highlights.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "left 75%",
        containerAnimation: horizontalScroll,
        toggleActions: "play reverse play reverse",
      },
    });

    highlights.forEach((el, i) => {
      tl.fromTo(
        el,
        {
          "--stroke-scale": 0,
          "--stroke-color":
            highlightColors[panelIndex] || "transparent",
        },
        {
          "--stroke-scale": 1.05,
          duration: 1.8 + Math.random() * 0.3,
          ease: "power1.inOut",
        },
        i === 0
          ? 0
          : "-=" + (1.2 + Math.random() * 0.2)
      );
    });
  });
};

/* =====================================================
   ENHANCED CONTENT REVEAL
===================================================== */
export const setupContentReveal = (panels, horizontalScroll) => {
  panels.forEach(panel => {
    const content = panel.querySelectorAll(
      ".title, .desc, .line, .list"
    );

    gsap.fromTo(
      content,
      {
        opacity: 0,
        y: 60,
        scale: 0.96,
        filter: "blur(6px)",
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panel,
          start: "left 65%",
          containerAnimation: horizontalScroll,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};

/* =====================================================
   SETUP ALL CARD ANIMATIONS (SCALABLE)
===================================================== */
export const setupAllCardAnimations = (cardsRef, panels, horizontalScroll) => {
  const cleanupFns = [];

  // Configuration: [cardIndex, panelIndex, baseRotation]
  const cardConfigs = [
    [0, 1, 12],    // Card 0 on panel 2 (left), rotate 12°
    [1, 1, -8],    // Card 1 on panel 2 (right), rotate -8°
    [2, 2, 15],    // Card 2 on panel 3 (left), rotate 15°
    [3, 2, -10],   // Card 3 on panel 3 (right), rotate -10°
    [4, 3, 5],     // Card 4 on panel 4 (left), rotate 5°
    [5, 3, -12],   // Card 5 on panel 4 (right), rotate -12°
  ];

  cardConfigs.forEach(([cardIdx, panelIdx, rotation]) => {
    const card = cardsRef.current[cardIdx];
    const panel = panels[panelIdx];
    
    if (card && panel) {
      const cleanup = setupCardAnimation(card, panel, horizontalScroll, rotation);
      if (cleanup) cleanupFns.push(cleanup);
    }
  });

  return cleanupFns;
};

/* =====================================================
   CONTINUOUS SCROLL SLIDE (KEPT AS ORIGINAL)
===================================================== */
export const setupContinuousScrollSlide = (panels, horizontalScroll) => {
  panels.forEach(panel => {
    const svgWrapper = panel.querySelector(".svg-highlight");
    const lines = panel.querySelectorAll(".line-title, .line-text");
    const listItems = panel.querySelectorAll("ul li");

    if (!svgWrapper && !lines.length && !listItems.length) return;

    let currentX = 0;
    let targetX = 0;
    let lastProgress = 0;
    let rafId = null;

    // Smooth RAF-based position updates (eliminates jitter)
    const smoothUpdate = () => {
      currentX += (targetX - currentX) * 0.05; // Even slower interpolation for ultra-smooth

      if (Math.abs(targetX - currentX) > 0.01) {
        /* -------- APPLY MOTION -------- */
        if (svgWrapper) {
          gsap.set(svgWrapper, { 
            x: currentX * 3, // Reduced multiplier for subtler motion
            force3D: true,
            willChange: "transform"
          });
        }

        if (lines.length) {
          gsap.set(lines, { 
            x: currentX * 2, // Reduced multiplier
            force3D: true,
            willChange: "transform"
          });
        }

        if (listItems.length) {
          gsap.set(listItems, { 
            x: currentX * 2, // Reduced multiplier
            force3D: true,
            willChange: "transform"
          });
        }

        rafId = requestAnimationFrame(smoothUpdate);
      } else {
        rafId = null;
      }
    };

    ScrollTrigger.create({
      trigger: panel,
      start: "left 80%",
      end: "right 40%",
      containerAnimation: horizontalScroll,

      onUpdate: self => {
        const delta = self.progress - lastProgress;
        lastProgress = self.progress;

        // accumulate scroll motion (reduced for slower movement)
        targetX += delta * -100; // Reduced from -80 for even slower motion
        targetX = gsap.utils.clamp(-70, 70, targetX); // Tighter clamp for subtler effect

        // Start RAF loop if not running
        if (!rafId) {
          rafId = requestAnimationFrame(smoothUpdate);
        }
      },

      onLeave: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },

      onLeaveBack: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    });
  });
};

/* =====================================================
   SVG HIGHLIGHT (BOX) ANIMATION
===================================================== */
export const setupSvgHighlightAnimations = (panels, horizontalScroll) => {
  const svgHighlightColors = {
    1: "#2791a4",
    2: "#fd7024",
    3: "#2e2111",
  };

  panels.forEach((panel, panelIndex) => {
    const svgHighlight = panel.querySelector(".svg-highlight");
    if (!svgHighlight) return;

    gsap.fromTo(
      svgHighlight,
      {
        "--stroke-scale": 0,
        "--stroke-color":
          svgHighlightColors[panelIndex] || "transparent",
      },
      {
        "--stroke-scale": 1.05,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: svgHighlight,
          start: "left 70%",
          containerAnimation: horizontalScroll,
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });
};

/* =====================================================
   SCROLLTRIGGER CONFIG
===================================================== */
export const configureScrollTrigger = () => {
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    limitCallbacks: true,
    syncInterval: 16, // Match 60fps for smoother updates
  });
  
  // Enable hardware acceleration globally
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
  
  // Prevent jitter on scroll stop
  gsap.ticker.lagSmoothing(0);
};

/* =====================================================
   CLEANUP ALL ANIMATIONS
===================================================== */
export const cleanupAllAnimations = (cleanupFns = []) => {
  ScrollTrigger.getAll().forEach(t => t.kill());
  cleanupFns.forEach(fn => fn());
};