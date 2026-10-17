"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DisplacementShaderProps {
  texture?: THREE.Texture;
  distortion?: number;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uDistortion;
  varying vec2 vUv;

  void main() {
    vec2 distortedUv = vUv;
    distortedUv.x += sin(vUv.y * 8.0 + uTime * 0.5) * uDistortion * 0.015;
    distortedUv.y += cos(vUv.x * 8.0 + uTime * 0.5) * uDistortion * 0.015;
    gl_FragColor = texture2D(uTexture, distortedUv);
  }
`;

export default function DisplacementShader({
  texture,
  distortion = 0,
}: DisplacementShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: texture ?? new THREE.Texture(),
      },
      uTime: { value: 0 },
      uDistortion: { value: distortion },
    }),
    [texture, distortion]
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    uniforms.uDistortion.value +=
      (distortion - uniforms.uDistortion.value) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
