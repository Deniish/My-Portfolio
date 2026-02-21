import { gsap } from "gsap";

/**
 * Initialize signature paths with stroke-based animation setup
 * @param {Object} params - Configuration object
 * @param {Array} params.paths - Array of name letter path elements
 * @param {Array} params.scrollTextPaths - Array of tagline letter path elements
 * @param {HTMLElement} params.underline - Underline path element
 * @param {string} params.nameColor - Color for name letters
 * @param {string} params.taglineColor - Color for tagline letters
 */
export const initializeSignaturePaths = ({
  paths,
  scrollTextPaths,
  underline,
  nameColor = "#000000",
  taglineColor = "white"
}) => {
  if (!paths || paths.length === 0) return;

  let offsetX = 0;

  // NAME LETTERS INITIAL SETUP
  paths.forEach((path, i) => {
    const length = path.getTotalLength();
    const bbox = path.getBBox();
    let letterWidth = bbox.width + 5;

    // Adjust spacing for better visual balance
    const spacingAdjustments = {
      0: -10, 1: -8, 2: -6, 3: -10, 4: -8,
      5: 5, 6: -15, 7: -8, 8: -6, 9: -10, 10: -8
    };
    
    if (spacingAdjustments.hasOwnProperty(i)) {
      letterWidth += spacingAdjustments[i];
    }

    // Initial styles with hidden state
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      stroke: nameColor,
      strokeWidth: 2,
      fill: "none",
      opacity: 0,
      visibility: "hidden",
      x: offsetX,
    });

    offsetX += letterWidth;
  });

  // UNDERLINE INITIAL SETUP
  if (underline) {
    const underlineLength = underline.getTotalLength();
    gsap.set(underline, {
      strokeDasharray: underlineLength,
      strokeDashoffset: underlineLength,
      opacity: 0,
    });
  }

  // TAGLINE INITIAL SETUP
  let offsetXTagline = 0;
  scrollTextPaths.forEach((path, i) => {
    const length = path.getTotalLength();
    const bbox = path.getBBox();
    let letterWidth = bbox.width + 5;
    
    // Spacing adjustments for tagline
    const taglineSpacing = { 3: 10, 7: 8, 12: 8 };
    if (taglineSpacing.hasOwnProperty(i)) {
      letterWidth += taglineSpacing[i];
    }

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
      stroke: taglineColor,
      fill: "none",
      strokeWidth: 2,
      opacity: 0,
      visibility: "hidden",
      x: offsetXTagline,
    });

    offsetXTagline += letterWidth;
  });
};

/**
 * Run the complete signature animation sequence
 * @param {Object} params - Configuration object
 * @param {Array} params.namePaths - Array of name letter path elements
 * @param {Array} params.taglinePaths - Array of tagline letter path elements
 * @param {HTMLElement} params.underline - Underline path element
 * @param {HTMLElement} params.textBox - Text box element to reveal
 * @param {Object} params.cardNavRef - Reference to card navigation element
 * @param {Function} params.onIntroStart - Callback when intro starts
 * @param {Function} params.onComplete - Callback when animation completes
 * @param {string} params.fillColor - Color to fill letters after stroke
 */
export const runSignatureAnimation = ({
  namePaths,
  taglinePaths,
  underline,
  textBox,
  cardNavRef,
  onIntroStart,
  onComplete,
  fillColor = "white"
}) => {
  const tl = gsap.timeline({
    defaults: {
      ease: "none"  // Use linear for strokeDashoffset, custom easing per animation
    }
  });

  // ========== NAME LETTERS ANIMATION ==========
  namePaths.forEach((path, i) => {
    // Stroke reveal - slower and smoother
    tl.to(
      path,
      {
        strokeDashoffset: 0,
        duration: 0.9,           // Slower for elegance (was 0.6)
        opacity: 1,
        visibility: "visible",
        ease: "power1.inOut",    // Smoother easing
      },
      i * 0.2                    // Slower stagger (was 0.15)
    );
    
    // Fill animation - slower overlap
    tl.to(
      path,
      { 
        fill: fillColor, 
        duration: 0.6,           // Slower fill (was 0.4)
        ease: "power1.inOut" 
      },
      i * 0.2 + 0.4              // Slower timing (was 0.3)
    );
  });

  // ========== UNDERLINE ANIMATION ==========
  if (underline) {
    tl.to(
      underline,
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1.0,           // Slower underline (was 0.8)
        ease: "power1.inOut",
      },
      "-=0.6"                    // Less overlap for clarity (was -0.5)
    );
  }

  // ========== TAGLINE ANIMATION ==========
  tl.add("taglineStart", "-=0.4");  // Less overlap (was -0.3)
  
  // Call intro start callback
  if (onIntroStart) {
    tl.call(onIntroStart, null, "taglineStart");
  }

  // Tagline stroke reveal - slower continuous flow
  tl.to(
    taglinePaths,
    {
      strokeDashoffset: 0,
      duration: 0.7,             // Slower (was 0.5)
      ease: "power1.inOut",      // Smoother easing
      opacity: 1,
      visibility: "visible",
      stagger: 0.12,             // Slower stagger (was 0.08)
    },
    "taglineStart"
  );

  // Tagline fill - slower overlap
  tl.to(
    taglinePaths,
    {
      fill: fillColor,
      duration: 0.5,             // Slower (was 0.3)
      ease: "power1.inOut",
      stagger: 0.12,             // Matches stroke stagger
    },
    "taglineStart+=0.3"          // Slower start (was 0.2)
  );

  // ========== TEXT BOX REVEAL ==========
  tl.add("taglineDone", "-=0.6");  // Less overlap (was -0.5)
  
  if (textBox) {
    tl.fromTo(
      textBox,
      {
        autoAlpha: 0,
        y: 10                    // Slightly more movement
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,           // Slower (was 0.6)
        ease: "power2.out",
      },
      "taglineDone"
    );
  }

  // ========== CARD NAV ANIMATION ==========
  if (cardNavRef?.current) {
    // Use fromTo instead of set + to for smoother animation
    tl.fromTo(
      cardNavRef.current,
      {
        y: -40,
        opacity: 0,
        filter: "blur(4px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,           // Slower (was 1.2)
        ease: "power2.out",      // Smooth deceleration
      },
      "taglineDone"              // Start with textBox
    );
  }

  // ========== COMPLETION CALLBACK ==========
  if (onComplete) {
    tl.call(onComplete, null, "+=0");
  }

  return tl;
};

/**
 * Initialize 3D hover effect for signature container
 * @param {HTMLElement} wrapper - Container element
 * @param {HTMLElement} target - Target element to transform
 * @returns {Function} Cleanup function
 */
export const init3DHoverEffect = (wrapper, target) => {
  if (!wrapper || !target) return () => {};

  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;

  const onMove = (e) => {
    const { left, top, width, height } = wrapper.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;

    // Calculate rotation values with subtle multipliers
    targetY = ((offsetX - width / 2) / width) * 15;   // More subtle (was 18)
    targetX = -((offsetY - height / 2) / height) * 15;
  };

  const update = () => {
    // Slower, smoother interpolation
    currentX += (targetX - currentX) * 0.06;  // Slower (was 0.09)
    currentY += (targetY - currentY) * 0.06;

    gsap.set(target, {
      rotationY: currentY,
      rotationX: currentX,
      transformPerspective: 1000,
      scale: 1.03,                // More subtle scale (was 1.04)
    });
  };

  gsap.ticker.add(update);
  wrapper.addEventListener("mousemove", onMove);

  // Return cleanup function
  return () => {
    wrapper.removeEventListener("mousemove", onMove);
    gsap.ticker.remove(update);
  };
};

/**
 * Reset all animations to initial state
 * @param {Object} params - Configuration object
 * @param {Array} params.namePaths - Name letter paths
 * @param {Array} params.taglinePaths - Tagline letter paths
 * @param {HTMLElement} params.underline - Underline element
 * @param {HTMLElement} params.textBox - Text box element
 */
export const resetSignatureAnimation = ({
  namePaths,
  taglinePaths,
  underline,
  textBox
}) => {
  gsap.killTweensOf([...namePaths, ...taglinePaths, underline, textBox]);
  
  // Reset to initial hidden state
  [...namePaths, ...taglinePaths].forEach(path => {
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDashoffset: length,
        opacity: 0,
        visibility: "hidden",
        fill: "none"
      });
    }
  });

  if (underline) {
    const length = underline.getTotalLength();
    gsap.set(underline, {
      strokeDashoffset: length,
      opacity: 0
    });
  }

  if (textBox) {
    gsap.set(textBox, {
      autoAlpha: 0,
      y: 10
    });
  }
};
