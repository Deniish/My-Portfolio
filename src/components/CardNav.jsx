import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import toast from "react-hot-toast";
import "../Styles/CardNav.css";
import MetallicPaint, { parseLogoImage } from "../Design/MetallicPaint";
// replace with your own SVG
import logo from "../assets/D-logo1.svg"; 
import ShinyText from '../Design/ShinyText';

const CardNav = forwardRef(
  (
    {
      // logo,
      logoAlt = "Logo",
      items,
      className = "",
      ease = "power3.out",
      baseColor = "#ffffff",
      menuColor,
    },
    ref
  ) => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const navRef = useRef(null);
    const cardsRef = useRef([]);
    const tlRef = useRef(null);

    // expose <nav> to parent
    useImperativeHandle(ref, () => navRef.current);

    const calculateHeight = () => {
      const navEl = navRef.current;
      if (!navEl) return 260;

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (isMobile) {
        const contentEl = navEl.querySelector(".card-nav-content");
        if (contentEl) {
          const wasVisible = contentEl.style.visibility;
          const wasPointerEvents = contentEl.style.pointerEvents;
          const wasPosition = contentEl.style.position;
          const wasHeight = contentEl.style.height;

          contentEl.style.visibility = "visible";
          contentEl.style.pointerEvents = "auto";
          contentEl.style.position = "static";
          contentEl.style.height = "auto";

          // force layout
          contentEl.offsetHeight;

          const topBar = 60;
          const padding = 16;
          const contentHeight = contentEl.scrollHeight;

          contentEl.style.visibility = wasVisible;
          contentEl.style.pointerEvents = wasPointerEvents;
          contentEl.style.position = wasPosition;
          contentEl.style.height = wasHeight;

          return topBar + contentHeight + padding;
        }
      }
      return 200;
    };

    const createTimeline = () => {
      const navEl = navRef.current;
      if (!navEl) return null;

      // IMPORTANT: do NOT touch opacity/transform here (avoid fighting the entrance animation)
      gsap.set(navEl, { height: 60, overflow: "hidden" });
      gsap.set(cardsRef.current, { y: 30, opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(navEl, {
        height: calculateHeight,
        duration: 0.4,
        ease,
      });

      tl.to(
        cardsRef.current,
        { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
        "-=0.1"
      );

      return tl;
    };

    // setup expand/collapse timeline once
    useLayoutEffect(() => {
      const tl = createTimeline();
      tlRef.current = tl;

      return () => {
        tl?.kill();
        tlRef.current = null;
      };
    }, [ease, items]);

    // keep timeline correct on resize
    useLayoutEffect(() => {
      const handleResize = () => {
        if (!tlRef.current) return;

        if (isExpanded) {
          const newHeight = calculateHeight();
          gsap.set(navRef.current, { height: newHeight });

          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) {
            newTl.progress(1);
            tlRef.current = newTl;
          }
        } else {
          tlRef.current.kill();
          const newTl = createTimeline();
          if (newTl) {
            tlRef.current = newTl;
          }
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [isExpanded]);

    const toggleMenu = () => {
      const tl = tlRef.current;
      if (!tl) return;
      if (!isExpanded) {
        setIsHamburgerOpen(true);
        setIsExpanded(true);
        tl.play(0);
      } else {
        setIsHamburgerOpen(false);
        tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
        tl.reverse();
      }
    };

    const setCardRef = (i) => (el) => {
      if (el) cardsRef.current[i] = el;
    };
    const [imageData, setImageData] = useState(null);
    
   useEffect(() => {
    async function loadSvg() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob(); // Convert to Blob
        const file = new File([blob], "D-logo1.svg", { type: blob.type });

        const parsed = await parseLogoImage(file);
        setImageData(parsed.imageData); // only pass imageData
      } catch (err) {
        console.error("Error parsing logo:", err);
      }
    }
    loadSvg();
  }, []);

    return (
      <div className={`card-nav-container ${className}`}>
        <nav
          ref={navRef}
          className={`card-nav navbar-grain-effect ${isExpanded ? "open" : ""}`}
          // start hidden/offscreen to avoid flash-of-content on refresh
          style={{
            backgroundColor: baseColor,
            opacity: 0,
            transform: "translateY(-80px)",
          }}
        >
          <div className="card-nav-top">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? "Close menu" : "Open menu"}
              tabIndex={0}
              style={{ color: menuColor || "#000" }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>
              {/* <div className="logo-container">
            <img src={logo} alt={logoAlt} className="logo" />
          </div> */}
          <div className="logo-container">
          {imageData ? (
        <MetallicPaint imageData={imageData}  params={{
          patternScale: 3,
          refraction: 0.02,
          edge: 1,
          patternBlur: 0.01,
          liquid: 0.1,
          speed: 0.4,
        }}/>
            ) : (
              <p>Loading metallic logo...</p>
            )}
        </div>





          
            <div className="menu-logo-text">
              <img src="/icons/tree-logo.svg" alt="Logo" className="menu-logo" />
              <span className="menu-text">Link Tree</span>
            </div>
              
            <a
              href="/resume.pdf"
              download="Denish_Sharma_Resume.pdf"
              className="card-nav-cta-button"
              onClick={() => toast.success("Download Completed!")}
            >
              <span>Resume</span>
              <span>Download</span>
            </a>
          </div>

          <div className="card-nav-content" aria-hidden={!isExpanded}>
            {(items || []).slice(0, 3).map((item, idx) => (
              <a
                key={`${item.label}-${idx}`}
                ref={setCardRef(idx)}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`nav-card ${item.label.toLowerCase()}`}
                style={{
                  backgroundColor: item.bgColor,
                  fontFamily: item.fontFamily,
                }}
              >
                <span className="nav-card-label-with-icon">
                  <img
                    src={item.icon}
                    alt={`${item.label} icon`}
                    className="nav-card-svg"
                  />
                  {item.label}
                  <GoArrowUpRight className="nav-card-icon" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    );
  }
);

export default CardNav;
