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
      <section className="relative flex flex-col justify-end items-center min-h-screen overflow-hidden text-white">
        <BackgroundLayer visible={bgVisible} />

        {/* CardNav */}
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

        {/* Signature centered */}
        {bgVisible && (
          <div className="relative z-10 flex flex-col justify-center items-center px-4">
            <DenishSignature cardNavRef={cardNavRef} />
          </div>
        )}
      </section>

      {/* ServiceSummary Section */}
      <section className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden text-white">
        <BackgroundLayer visible={bgVisible} />
        <ServiceSummary />
      </section>
    </>
  );
}
