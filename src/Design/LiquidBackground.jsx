import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const LiquidShader = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // distance from mouse in UV space
      vec2 mouseUV = uMouse / uResolution;
      float dist = distance(uv, mouseUV);

      // ripple waves
      float ripple = sin(30.0 * dist - uTime * 4.0);
      float effect = exp(-6.0 * dist) * ripple;

      // base gradient
      vec3 base = mix(vec3(0.1, 0.2, 0.5), vec3(0.3, 0.1, 0.6), uv.y);

      // apply ripple effect
      vec3 color = base + effect * vec3(0.2, 0.5, 1.0);

      gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ LiquidShader });

function Plane({ mouse }) {
  const mat = useRef();

  useFrame(({ clock }) => {
    if (mat.current) {
      mat.current.uTime = clock.getElapsedTime();
      mat.current.uMouse = mouse.current;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <liquidShader ref={mat} />
    </mesh>
  );
}

export default function LiquidBackground() {
  const mouse = useRef(new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2));

  const handleMouseMove = (e) => {
    mouse.current.set(e.clientX, window.innerHeight - e.clientY);
  };

  return (
    <div className="fixed inset-0 -z-10" onMouseMove={handleMouseMove}>
      <Canvas>
        <Plane mouse={mouse} />
      </Canvas>
    </div>
  );
}
