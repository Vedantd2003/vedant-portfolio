"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SignalObjectProps {
  morphTarget?: number; // 0–3
}

const vertexShader = `
  uniform float uTime;
  uniform float uDisplacement;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), u.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), u.x), u.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), u.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), u.x), u.y),
      u.z
    );
  }

  void main() {
    vNormal = normal;
    float n = noise(position * 1.5 + uTime * 0.3);
    float d = n * uDisplacement;
    vec3 displaced = position + normal * d;
    vPosition = displaced;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float rim = 1.0 - max(dot(viewDir, normalize(vNormal)), 0.0);
    rim = pow(rim, 2.5);

    vec3 rimColor = vec3(0.91, 0.663, 0.302); // amber
    vec3 baseColor = uColor;
    vec3 finalColor = mix(baseColor, rimColor, rim * 0.6);

    float fresnel = pow(1.0 - max(dot(viewDir, normalize(vNormal)), 0.0), 3.0);
    finalColor += rimColor * fresnel * 0.3;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function SignalObject({ morphTarget = 0 }: SignalObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const currentMorphRef = useRef(morphTarget);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDisplacement: { value: 0.08 },
      uColor: { value: new THREE.Color("#1a1a1a") },
    }),
    []
  );

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (meshRef.current && wireRef.current) {
      // Slow Y rotation
      meshRef.current.rotation.y += delta * 0.15;
      wireRef.current.rotation.y += delta * 0.15;

      // Subtle breathing
      const scale = 1 + Math.sin(timeRef.current * 0.5) * 0.02;
      meshRef.current.scale.setScalar(scale);
      wireRef.current.scale.setScalar(scale);
    }

    // Update uniforms
    uniforms.uTime.value = timeRef.current;

    // Lerp morph target displacement
    const targetDisplacement = [0.08, 0.14, 0.18, 0.06][
      Math.min(morphTarget, 3)
    ];
    currentMorphRef.current += (morphTarget - currentMorphRef.current) * 0.02;
    uniforms.uDisplacement.value +=
      (targetDisplacement - uniforms.uDisplacement.value) * 0.05;
  });

  return (
    <group>
      {/* Main mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 3]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.52, 3]} />
        <meshBasicMaterial
          wireframe
          color="#e8a94d"
          opacity={0.12}
          transparent
        />
      </mesh>
    </group>
  );
}
