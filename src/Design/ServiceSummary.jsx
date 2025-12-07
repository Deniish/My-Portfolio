import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import VariableProximity from "../Design/VariableProximity";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  const containerRefs = {
    service1: useRef(null),
    service2a: useRef(null),
    service2b: useRef(null),
    service3a: useRef(null),
    service3b: useRef(null),
    service3c: useRef(null),
    service4: useRef(null),
  };

  useEffect(() => {
    // 💡 Disable scroll animations on screens <= 900px
    if (window.innerWidth <= 900) return;

    const animations = [
      { id: "#title-service-1", x: 10 },
      { id: "#title-service-2", x: -10 },
      { id: "#title-service-3", x: 20 },
      { id: "#title-service-4", x: -20 },
    ];

    animations.forEach(({ id, x }) => {
      gsap.to(id, {
        xPercent: x,
        scrollTrigger: {
          trigger: id,
          scrub: 0.7,
          ease: "power1.out",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Device tilt effect - ONLY for mobile devices (≤900px)
  useEffect(() => {
    if (window.innerWidth > 900) return; // Don't run on desktop

    const handleOrientation = (event) => {
      const gamma = event.gamma; // Left-right tilt (-90 to 90)
      
      const serviceContainers = document.querySelectorAll('.service-container');
      
      serviceContainers.forEach((container) => {
        container.classList.remove('tilt-left', 'tilt-right');
        
        if (gamma > 5) {
          container.classList.add('tilt-right');
        } else if (gamma < -5) {
          container.classList.add('tilt-left');
        }
      });
    };

    // Check if device supports orientation
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return (
    <section
      className="
        px-4 mt-10 overflow-hidden 
        font-light leading-snug text-center mb-42 
        contact-text-responsive
        -translate-y-10
        mobile-services-section
      "
    >
      <style>
        {`
          @media (max-width: 900px) {
            /* Remove all padding and make full width */
            .mobile-services-section {
              padding: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
              width: 100vw !important;
              position: relative;
              left: 50%;
              right: 50%;
              margin-left: -50vw !important;
              margin-right: -50vw !important;
            }
            
            .service-row {
              flex-direction: column !important;
              gap: 0 !important;
              transform: translateX(0) !important;
              width: 100% !important;
              padding: 0 !important;
            }
            .service-row div {
              width: 100% !important;
              justify-content: center;
              padding: 0 !important;
            }
            .stop-scroll-anim {
              transform: translateX(0) !important;
            }
            
            /* Hide desktop separators on mobile */
            .desktop-separator {
              display: none !important;
            }
            
            /* Show mobile separators */
            .mobile-separator {
              display: block !important;
              width: 100%;
              height: 4px;
              background-color: #ff6b35;
              margin: 10px auto;
            }
            
            /* Full width service containers */
            .service-container {
              width: 100% !important;
              margin: 0 !important;
              padding: 15px 0 !important;
              transition: transform 0.1s ease-out;
            }
            
            /* Variable proximity demo full width */
            .variable-proximity-demo {
              width: 100% !important;
              display: block !important;
              padding: 0 20px !important;
            }
            
            /* Device tilt effect - only on mobile */
            .service-container.tilt-left {
              transform: translateX(-15px) rotate(-2deg) !important;
            }
            
            .service-container.tilt-right {
              transform: translateX(15px) rotate(2deg) !important;
            }
          }
          
          @media (min-width: 901px) {
            .mobile-separator {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Service 1 */}
      <div 
        id="title-service-1" 
        className="stop-scroll-anim service-container"
        ref={containerRefs.service1}
      >
        <VariableProximity
          label="Architecture"
          className="variable-proximity-demo"
          fromFontVariationSettings="'wght' 100, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRefs.service1}
          radius={100}
          falloff="linear"
        />
        <div className="mobile-separator" />
      </div>

      {/* Service 2 */}
      <div
        id="title-service-2"
        className="service-row service-container flex items-center justify-center gap-3 translate-x-20 stop-scroll-anim"
      >
        <div ref={containerRefs.service2a}>
          <VariableProximity
            label="Development"
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 100, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRefs.service2a}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="mobile-separator" />

        <div className="w-10 h-1 md:w-28 bg-orange-dark desktop-separator" />

        <div ref={containerRefs.service2b}>
          <VariableProximity
            label="Deployment"
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 100, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRefs.service2b}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="mobile-separator" />
      </div>

      {/* Service 3 */}
      <div
        id="title-service-3"
        className="service-row service-container flex items-center justify-center gap-3 -translate-x-48 stop-scroll-anim"
      >
        <div ref={containerRefs.service3a}>
          <VariableProximity
            label="APIs"
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 100, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRefs.service3a}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="mobile-separator" />

        <div className="w-7 h-1 md:w-20 bg-orange-dark desktop-separator" />

        <div ref={containerRefs.service3b}>
          <VariableProximity
            label="Frontends"
            className="italic variable-proximity-demo"
            fromFontVariationSettings="'wght' 100, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRefs.service3b}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="mobile-separator" />

        <div className="w-7 h-1 md:w-20 bg-orange-dark desktop-separator" />

        <div ref={containerRefs.service3c}>
          <VariableProximity
            label="Scalability"
            className="variable-proximity-demo"
            fromFontVariationSettings="'wght' 100, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRefs.service3c}
            radius={100}
            falloff="linear"
          />
        </div>
        <div className="mobile-separator" />
      </div>

      {/* Service 4 */}
      <div 
        id="title-service-4" 
        className="translate-x-48 stop-scroll-anim service-container"
        ref={containerRefs.service4}
      >
        <VariableProximity
          label="Databases"
          className="variable-proximity-demo"
          fromFontVariationSettings="'wght' 100, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRefs.service4}
          radius={100}
          falloff="linear"
        />
        <div className="mobile-separator" />
      </div>
    </section>
  );
};

export default ServiceSummary;