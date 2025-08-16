"use client";

import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

// GLSL noise
const noise = `
  float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) *
                 43758.5453123);
  }
  float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);

    return mix(a, b, u.x) +
           (c - a) * u.y * (1.0 - u.x) +
           (d - b) * u.x * u.y;
  }
`;

// Create the shader material
const LiquidShader = shaderMaterial(
  // Uniforms
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5), // normalized 0..1
    uResolution: new THREE.Vector2(1, 1),
    uHover: 0
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uHover;
    varying vec2 vUv;

    ${noise}

    void main() {
      vec2 uv = vUv;

      // Add some movement
      float n = noise(uv * 6.0 + uTime * 0.5);

      // If you want a vertical mask, tune it later
      // float mask = smoothstep(0.35, 0.55, uv.y + n * 0.15);

      // Make hover plainly visible first (red -> green)
      vec3 base = mix(vec3(1.0, 0.0, 0.0),   // red when idle
                      vec3(0.0, 1.0, 0.0),   // green when hover
                      clamp(uHover, 0.0, 1.0));

      // Optionally add mouse tint to prove it's wired:
      // base.rg += uMouse * 0.2;

      gl_FragColor = vec4(base, 1.0);
    }
  `
);

extend({ LiquidShader });

function Plane({ mouse, hover }) {
  const mat = useRef();

  useFrame(({ clock, size }) => {
    if (!mat.current) return;
    // Time
    mat.current.uTime = clock.getElapsedTime();
    // Resolution
    mat.current.uResolution.set(size.width, size.height);
    // Mouse
    mat.current.uMouse.copy(mouse.current);
    // Hover with a faster response so it's obvious
    mat.current.uHover = THREE.MathUtils.lerp(
      mat.current.uHover,
      hover ? 1 : 0,
      0.25
    );
  });

  return (
    <mesh>
      {/* Fullscreen plane in NDC with orthographic camera */}
      <planeGeometry args={[2, 2]} />
      <liquidShader ref={mat} />
    </mesh>
  );
}

export default function LiquidBackground() {
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const [hover, setHover] = useState(false);

  // Normalize mouse to 0..1
  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = 1 - e.clientY / window.innerHeight;
    mouse.current.set(x, y);
  };

  // Optional: keep mouse in center on mount
  useEffect(() => {
    mouse.current.set(0.5, 0.5);
  }, []);

  return (
    <div
      className="fixed inset-0 z-0"  /* for testing; lower later if needed */
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      // Ensure the canvas can actually receive pointer/mouse
      style={{ pointerEvents: "auto" }}
    >
      <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
        <Plane mouse={mouse} hover={hover} />
      </Canvas>
    </div>
  );
}
