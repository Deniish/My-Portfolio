import React, { useRef, useState, useEffect } from "react";
import DenishSignature from "../Design/DenishSignature";
import CardNav from "./CardNav";
import "../Styles/Hero.css";
import ServiceSummary from "../Design/ServiceSummary";
import BackgroundLayer from "../Design/BackgroundLayer";

export default function Hero() {
  const cardNavRef = useRef(null);
  const [bgVisible, setBgVisible] = useState(false);

  // Preload background visuals once Hero mounts
  useEffect(() => {
    const preload = () =>
      Promise.all([
        import("../Design/Particles"),
        import("../Design/RippleBackground"),
      ]);

    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => preload().then(() => setBgVisible(true)));
    } else {
      preload().then(() => setBgVisible(true));
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden text-white sm:px-6 md:px-10 lg:px-20">

        <BackgroundLayer visible={bgVisible} />

        {/* CardNav */}
        <div className="w-full max-w-[90vw] sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto mb-6 sm:mb-8 md:mb-10">
          <CardNav
            ref={cardNavRef}
            items={[
              {
                label: "LinkedIn",
                url: "https://linkedin.com/in/denish-sharma",
                icon: "/icons/linkedin-logo.svg",
                fontFamily: '"Poppins", sans-serif',
              },
              {
                label: "GitHub",
                url: "https://github.com/Deniish",
                icon: "/icons/github-logo.svg",
                fontFamily: '"Monsa-Medium", sans-serif',
              },
              {
                label: "Medium",
                url: "https://medium.com/@denishsharma701",
                icon: "/icons/medium-logo.svg",
                fontFamily: '"Playfair Display", serif',
              },
            ]}
            menuColor="#000"
            ease="power3.out"
          />
        </div>

        {/* Signature centered */}
        {bgVisible && (
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xs p-0 m-0 signature-wrapper sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <DenishSignature cardNavRef={cardNavRef}  />
          </div>


        )}
      </section>

      {/* ServiceSummary Section */} 
      <section className="relative flex flex-col items-center justify-center p-0 px-4 py-24 m-0 overflow-hidden text-white service-summary-section md:py-32">
 
        <BackgroundLayer visible={bgVisible} /> 
        <ServiceSummary /> 
      </section>
    </>
  );
}