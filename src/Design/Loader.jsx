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
export default function LightLoader() {
  return (
    <div role="status" aria-label="Loading" className="inline-flex items-center gap-2">
      <span className="sr-only">Loading</span>
      <div className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:-0.2s]" />
      <div className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:-0.1s]" />
      <div className="h-2 w-2 rounded-full bg-white animate-bounce" />
    </div>
  );
}
