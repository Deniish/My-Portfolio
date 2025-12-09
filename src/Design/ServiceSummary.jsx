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
    // Desktop scroll animations (> 900px)
    if (window.innerWidth > 900) {
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
    }

    // Mobile animations (≤ 900px)
    if (window.innerWidth <= 900) {
      // Service 1 - Slide in from left
      gsap.fromTo("#title-service-1 .variable-proximity-demo", 
        { x: -100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#title-service-1",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Service 2 - Slide in from right
      gsap.fromTo("#title-service-2 .variable-proximity-demo", 
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#title-service-2",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Service 3 - Slide in from left with fade
      gsap.fromTo("#title-service-3 .variable-proximity-demo", 
        { x: -100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: "#title-service-3",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Service 4 - Slide in from right
      gsap.fromTo("#title-service-4 .variable-proximity-demo", 
        { x: 100, opacity: 0 },
        { 
          x: 0, 
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#title-service-4",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      className="
        px-4 mt-10 overflow-hidden 
        font-light leading-snug text-center mb-42 
        contact-text-responsive
        cursor-default
        -translate-y-10
        mobile-services-section
      "
    >
      <style>
        {`
          @media (max-width: 900px) {
            /* Remove all padding and center content */
            .mobile-services-section {
              padding: 0 !important;
              margin: 0 auto !important;
              width: 100% !important;
              max-width: 100vw !important;
              overflow-x: hidden !important;
              transform: translateY(0) !important;
              margin-top: 40px !important;
            }
            
            .service-row {
              flex-direction: column !important;
              gap: 0 !important;
              transform: translateX(0) !important;
              width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .service-row div {
              width: 100% !important;
              justify-content: center;
              padding: 0 !important;
              margin: 0 !important;
            }
            .stop-scroll-anim {
              transform: translateX(0) !important;
            }
            
            /* Hide desktop separators on mobile */
            .desktop-separator {
              display: none !important;
            }
            
            /* Show mobile separators - FIXED position */
            .mobile-separator {
              display: block !important;
              width: 100%;
              height: 4px;
              background-color: #ff6b35;
              margin: 10px auto;
              transform: none !important;
            }
            
            /* Full width service containers - NO GAPS */
            .service-container {
              width: 100% !important;
              margin: 0 auto !important;
              padding: 10px 0 !important;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            
            /* Variable proximity demo */
            .variable-proximity-demo {
              width: 100% !important;
              display: block !important;
              padding: 0 20px !important;
              margin: 0 !important;
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