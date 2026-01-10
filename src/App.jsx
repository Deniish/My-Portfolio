import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Lenis imports
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Navbar from "./components/Navbar";
import Services from "./components/Services";
import AboutMe from "./components/AboutMe";

// Smooth Loading Screen
import LightLoader from "./Design/Loader";
import { AccessibilityButton } from "./Design/AccessibilityButton";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [ready, setReady] = useState(false);

  // Sync Lenis → ScrollTrigger
  useLenis(() => ScrollTrigger.update());
  useLenis((lenis) => {
  gsap.ticker.tick(lenis.raf);
});


  return (
    <ReactLenis
      root
      options={{
        duration: 1.1,
        lerp: 0.15,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      }}
      className="relative w-screen min-h-screen overflow-x-hidden"
    >
      {/* Loader - visible UNTIL ready becomes true */}
      {!ready && <LightLoader onFinished={() => setReady(true)} />}

      {/* Mount entire site immediately so it's ready behind the loader */}
      <div className="opacity-100">

        <Toaster position="top-right" />
        <AccessibilityButton />
        <Navbar />
        <Hero ready={ready} />
        <Services />
        <AboutMe />
        {/* Dummy test scroll sections */}
        <section className="min-h-screen bg-red-500/10"></section>
        <section className="min-h-screen bg-green-500/10"></section>
        <section className="min-h-screen bg-blue-500/10"></section>
        <section className="min-h-screen bg-yellow-500/10"></section>
        <section className="min-h-screen bg-purple-500/10"></section>
        <section className="min-h-screen bg-pink-500/10"></section>

        <Footer />
      </div>
    </ReactLenis>
  );
}