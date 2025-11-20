import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "./App.css";

// Lenis imports
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import LightLoader from "./Design/Loader";
import Navbar from "./components/Navbar";
import Services from "./components/Services";
import RippleBackground from "./Design/RippleBackground";

gsap.registerPlugin(ScrollTrigger);

// Loader Component (global)
// // Loader Component (global)
function Loader({ isVisible }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <LightLoader /> 
    </div>
  );
}


export default function App() {
  const [loading, setLoading] = useState(true);

  // ✅ Sync Lenis scroll with GSAP ScrollTrigger
  useLenis(({ scroll }) => {
    ScrollTrigger.update();
  });

  // Loader timing
  useEffect(() => {
    const MIN_TIME = 1500; // show loader at least 1.5s
    const start = Date.now();

    const timer = setTimeout(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_TIME - elapsed);
      setTimeout(() => setLoading(false), remaining);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.6,
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => 1 - Math.pow(1 - t, 4), 
      }}
      className="relative w-screen min-h-screen overflow-x-auto"
    >

      {/* Global Loader */}
      <Loader isVisible={loading} />
      {/* <RippleBackground /> */}
      {/* Toasts */}
      <Toaster position="top-right" />
      <Navbar />
      {/* Main sections */}
      <Hero />
      <Services />
      {/* Dummy sections for testing scroll */}
      <section className="min-h-screen bg-red-500/10"></section>
      <section className="min-h-screen bg-green-500/10"></section>
      <section className="min-h-screen bg-blue-500/10"></section>
      <section className="min-h-screen bg-yellow-500/10"></section>
      <section className="min-h-screen bg-purple-500/10"></section>
      <section className="min-h-screen bg-pink-500/10"></section>

      <Footer />
    </ReactLenis>
  );
}
