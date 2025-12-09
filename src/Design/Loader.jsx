// MetallicLogoLoader.jsx
// import { useEffect, useState } from "react";
// import MetallicPaint, { parseLogoImage } from "../Design/MetallicPaint";
// import logo from "../assets/D-logo1.svg";

// export default function MetallicLogoLoader({ params }) {
//   const [imageData, setImageData] = useState(null);

//   useEffect(() => {
//   async function loadSvg() {
//     try {
//       const response = await fetch(logo);
//       const blob = await response.blob();
//       console.log("Blob:", blob);


//       const parsed = await parseLogoImage(blob);
//       console.log("Parsed:", parsed);

//       if (parsed?.imageData) {
//         setImageData(parsed.imageData);
//       }
//     } catch (err) {
//       console.error("Error parsing logo:", err);
//     }
//   }
//   loadSvg();
// }, []);



//   return (
//     <>
//     <div className="flex items-center justify-center w-32 h-32 mx-auto">
//         <MetallicPaint
//         imageData={imageData} 
//         params={{
//             patternScale: 3,
//             refraction: 0.02,
//             edge: 1,
//             patternBlur: 0.01,
//             liquid: 0.1,
//             speed: 0.4,
//         }}
//         />
//     </div>
//   </>
// );

// }



import { useEffect, useState } from "react";

export default function LightLoader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let current = 0;

    const interval = setInterval(() => {
      current += Math.random() * 12; // smooth progress effect

      if (current >= 100) {
        current = 100;
        clearInterval(interval);

        // Start fading out
        setIsFadingOut(true);

        // Wait for fade out transition (700ms) before unmounting
        setTimeout(onFinished, 700);
      }

      setProgress(Math.floor(current));
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >

      <p className="mb-4 text-xl tracking-widest animate-pulse">
        Loading {progress}%
      </p>

      <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
        <div
          className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

    </div>
  );
}