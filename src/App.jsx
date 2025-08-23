import { useEffect, useState } from "react";
// import MetallicPaint, { parseLogoImage } from "../Design/MetallicPaint";
// import logo from "../assets/D-logo1.svg";
// import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import SplashCursor from "./Design/splash";
import { Toaster } from 'react-hot-toast';
import "./App.css";
export default function App() {
  
  return (
    <>
    {/* <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      
    </div> */}
      {/* <Navbar /> */}
      <Toaster position="top-right" />
      <Hero />
      {/* <SplashCursor /> */}
      {/* Other sections will go here */}
      <Footer />
    </>
  );
}
