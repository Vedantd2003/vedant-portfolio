"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/webgl/HeroScene"), {
  ssr: false,
  loading: () => <div style={{ position: "absolute", inset: 0, background: "#0e0e0e" }} />,
});

const HERO_HEADLINE = "Building Intelligent Systems.";
const HERO_SUBHEADLINE = "AI / ML · Full-Stack · Embedded · Pune, India";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const doReveal = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      if (prefersReduced) return;

      const tl = gsap.timeline();
      tl.fromTo(
        line1Ref.current,
        { y: "110%" },
        { y: "0%", duration: 1.2, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }
      ).fromTo(
        subRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      ).fromTo(
        scrollCueRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    };

    // Listen for preloader done event
    const onPreloaderDone = () => doReveal();
    window.addEventListener("preloader:done", onPreloaderDone);

    // Also reveal after 3s as fallback
    const fallback = setTimeout(doReveal, 3000);

    // Hide scroll cue on first scroll
    const onScroll = () => {
      gsap.to(scrollCueRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      window.removeEventListener("scroll", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("preloader:done", onPreloaderDone);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: "100svh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "var(--space-16)",
      }}
      aria-label="Hero section"
    >
      {/* WebGL canvas fills the entire section */}
      <HeroScene morphTarget={0} />

      {/* Headline text — on top of WebGL */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-hero)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            overflow: "hidden",
          }}
        >
          <span
            ref={line1Ref}
            style={{
              display: "block",
              transform: "translateY(110%)",
              color: "var(--color-text-primary)",
            }}
          >
            {HERO_HEADLINE}
          </span>
        </h1>

        <p
          ref={subRef}
          style={{
            marginTop: "var(--space-6)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.1em",
            opacity: 0,
          }}
          aria-label={HERO_SUBHEADLINE}
        >
          {HERO_SUBHEADLINE}
        </p>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollCueRef}
        style={{
          position: "absolute",
          bottom: "var(--space-8)",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--space-2)",
          opacity: 0,
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        {/* Animated arrow */}
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{ animation: "bounce-arrow 1.5s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes bounce-arrow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(6px); }
            }
          `}</style>
          <path
            d="M8 0 L8 20 M2 14 L8 20 L14 14"
            stroke="var(--color-text-secondary)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
