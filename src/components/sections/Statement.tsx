"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const ABOUT_STATEMENT =
  "I engineer systems that learn, move, and scale — from neural nets on the edge to full-stack platforms that millions can use.";

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      wordsRef.current.forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const words = wordsRef.current.filter(Boolean);
    if (!words.length) return;

    // Set all words dim initially
    gsap.set(words, { opacity: 0.15 });

    // ScrollTrigger scrub opacity word-by-word
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    tl.to(words, {
      opacity: 1,
      stagger: 0.04,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === containerRef.current) st.kill();
      });
    };
  }, []);

  const setWordRef = (el: HTMLSpanElement | null, i: number) => {
    if (el) wordsRef.current[i] = el;
  };

  const words = ABOUT_STATEMENT.split(/\s+/).filter(Boolean);

  return (
    <section
      id="about"
      style={{
        padding: "var(--space-48) var(--gutter)",
        display: "flex",
        alignItems: "center",
        minHeight: "80svh",
      }}
      aria-label="About statement"
    >
      <div className="container">
        <div
          ref={containerRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-title)",
            fontWeight: 500,
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "var(--color-text-primary)",
            maxWidth: "20ch",
          }}
          aria-label={ABOUT_STATEMENT}
        >
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => setWordRef(el, i)}
              style={{
                display: "inline-block",
                opacity: 0.15,
                marginRight: "0.25em",
              }}
              aria-hidden="true"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
