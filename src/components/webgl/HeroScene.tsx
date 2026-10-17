"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import SignalObject from "./SignalObject";

// Spotlight that follows cursor
function CursorSpotlight() {
  const lightRef = useRef<THREE.SpotLight>(null);
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      // Convert to normalized device coordinates
      targetPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    const light = lightRef.current;
    if (!light) return;
    // Lerp spotlight position toward cursor-projected world position
    light.position.x += (targetPos.current.x * 5 - light.position.x) * 0.06;
    light.position.y += (targetPos.current.y * 3 - light.position.y) * 0.06;
  });

  return (
    <spotLight
      ref={lightRef}
      color="#e8a94d"
      intensity={80}
      distance={20}
      angle={Math.PI / 6}
      penumbra={0.5}
      castShadow={false}
      position={[0, 2, 6]}
    />
  );
}

// Visibility pause
function VisibilityPause() {
  const { gl } = useThree();

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null);
      } else {
        gl.setAnimationLoop((time) => {
          gl.render(gl.domElement as unknown as THREE.Scene, new THREE.PerspectiveCamera());
          void time;
        });
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, [gl]);

  return null;
}

interface HeroSceneInnerProps {
  morphTarget: number;
  dpr: number;
}

function HeroSceneInner({ morphTarget, dpr: _dpr }: HeroSceneInnerProps) {
  return (
    <>
      <fog attach="fog" args={["#0e0e0e", 8, 25]} />
      <ambientLight intensity={0.05} />
      <CursorSpotlight />
      <SignalObject morphTarget={morphTarget} />
      <VisibilityPause />
    </>
  );
}

interface HeroSceneProps {
  morphTarget?: number;
}

export default function HeroScene({ morphTarget = 0 }: HeroSceneProps) {
  const [dpr, setDpr] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    setIsMobile(mobile);
    const maxDpr = mobile ? 1.5 : 2;
    setDpr(Math.min(window.devicePixelRatio, maxDpr));
  }, []);

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: false,
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "#0e0e0e",
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => {
          const maxDpr = isMobile ? 1.5 : 2;
          setDpr(Math.min(window.devicePixelRatio, maxDpr));
        }}
      >
        <HeroSceneInner morphTarget={morphTarget} dpr={dpr} />
      </PerformanceMonitor>
    </Canvas>
  );
}
