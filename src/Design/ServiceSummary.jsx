import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import VariableProximity from "../Design/VariableProximity";

gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  // ✅ Each word gets its own ref
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
    const animations = [
      { id: "#title-service-1", x: 10 },
      { id: "#title-service-2", x: -10 },
      { id: "#title-service-3", x: 20 },
      { id: "#title-service-4", x: -30 },
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

  return (
    <section className="w-full px-4 mt-20 mb-42 overflow-hidden font-light leading-snug text-center contact-text-responsive">
      {/* Service 1 */}
      <div id="title-service-1" ref={containerRefs.service1}>
        <VariableProximity
          label="Architecture"
          className="variable-proximity-demo"
          fromFontVariationSettings="'wght' 100, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRefs.service1}
          radius={100}
          falloff="linear"
        />
      </div>

      {/* Service 2 */}
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3 translate-x-16"
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
        <div className="w-10 h-1 md:w-32 bg-orange-dark" />
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
      </div>

      {/* Service 3 */}
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3 -translate-x-48"
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
        <div className="w-10 h-1 md:w-32 bg-orange-dark" />
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
        <div className="w-10 h-1 md:w-32 bg-orange-dark" />
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
      </div>

      {/* Service 4 */}
      <div
        id="title-service-4"
        className="translate-x-48"
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
      </div>
    </section>
  );
};

export default ServiceSummary;
