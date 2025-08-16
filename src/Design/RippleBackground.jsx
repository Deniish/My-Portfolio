import { useEffect, useRef } from "react";

export default function RippleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ripples = [];

    const handleMouseMove = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 1 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // dark fading background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ripples.forEach((ripple, i) => {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha})`;
        ctx.stroke();

        ripple.r += 2; // ripple expansion speed
        ripple.alpha -= 0.02; // fade speed

        if (ripple.alpha <= 0) ripples.splice(i, 1);
      });

      requestAnimationFrame(draw);
    }
    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen -z-10"
    />
  );
}
