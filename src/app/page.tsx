"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import Statement from "@/components/sections/Statement";
import FeaturedWork from "@/components/sections/FeaturedWork";
import Capabilities from "@/components/sections/Capabilities";
import Timeline from "@/components/sections/Timeline";
import Marquee from "@/components/sections/Marquee";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Preloader is client-only — no SSR needed
const Preloader = dynamic(() => import("@/components/sections/Preloader"), {
  ssr: false,
});

// DualLayer uses client-only mouse events
const DualLayer = dynamic(() => import("@/components/sections/DualLayer"), {
  ssr: false,
});

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [morphTarget, setMorphTarget] = useState(0);

  const handlePreloaderComplete = useCallback((_audioEnabled: boolean) => {
    setPreloaderDone(true);
    // Audio setup would happen here if enabled
  }, []);

  const handleMorphChange = useCallback((target: number) => {
    setMorphTarget(target);
  }, []);

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Hero receives morphTarget for WebGL scene sync */}
      <Hero />

      {/* DualLayer — what I build / under the hood */}
      <DualLayer />

      {/* Statement — scroll-scrubbed word opacity */}
      <Statement />

      {/* Featured work */}
      <FeaturedWork />

      {/* Capabilities — triggers morph on hover */}
      <Capabilities onMorphChange={handleMorphChange} />

      {/* Tools marquee */}
      <Marquee />

      {/* Timeline */}
      <Timeline />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Dev indicator — morphTarget */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: "var(--space-4)",
            left: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-accent)",
            pointerEvents: "none",
            zIndex: 9000,
            opacity: 0.5,
          }}
          aria-hidden="true"
        >
          morph: {morphTarget}
        </div>
      )}
    </>
  );
}
