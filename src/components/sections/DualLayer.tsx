"use client";

import { useEffect, useRef, useState } from "react";

export default function DualLayer() {
  const sectionRef = useRef<HTMLElement>(null);
  const topLayerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [showTop, setShowTop] = useState(true);
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const radiusRef = useRef(0);
  const targetRadiusRef = useRef(0);
  const mouseInsideRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    if (touch) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const top = topLayerRef.current;
    if (!section || !top) return;

    const onMouseMove = (e: MouseEvent) => {
      const bounds = section.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;

      // Velocity-based radius
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      velocityRef.current = { x: dx, y: dy };
      lastPosRef.current = { x, y };

      const speedRadius = Math.min(speed * 2, 80);
      targetRadiusRef.current = mouseInsideRef.current
        ? 120 + speedRadius
        : 0;

      top.style.clipPath = `circle(${radiusRef.current}px at ${x}px ${y}px)`;
    };

    const onMouseEnter = () => {
      mouseInsideRef.current = true;
      targetRadiusRef.current = 120;
    };

    const onMouseLeave = () => {
      mouseInsideRef.current = false;
      targetRadiusRef.current = 0;
    };

    // Smooth radius lerp
    const tick = () => {
      radiusRef.current +=
        (targetRadiusRef.current - radiusRef.current) * 0.1;

      const { x, y } = lastPosRef.current;
      if (top) {
        top.style.clipPath = `circle(${radiusRef.current}px at ${x}px ${y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    section.addEventListener("mousemove", onMouseMove, { passive: true });
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const sectionStyle: React.CSSProperties = {
    position: "relative",
    minHeight: "100svh",
    overflow: "hidden",
    cursor: isTouch ? "default" : "none",
  };

  const layerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    padding: "var(--space-24) var(--gutter)",
  };

  return (
    <section
      ref={sectionRef}
      id="dual-layer"
      style={sectionStyle}
      aria-label="What I build"
    >
      {/* Bottom layer: under the hood */}
      <div
        style={{
          ...layerStyle,
          backgroundColor: "var(--color-surface)",
          zIndex: 0,
        }}
        aria-hidden={!isTouch || showTop}
      >
        <div className="container">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-4)",
            }}
          >
            UNDER THE HOOD
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.8rem, 1vw, 0.95rem)",
              color: "var(--color-text-secondary)",
              lineHeight: 1.8,
              maxWidth: "60ch",
            }}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "inherit",
                margin: 0,
              }}
            >{`// Architecture overview
class IntelligentSystem {
  constructor(
    private model: NeuralNet,
    private api: FastAPI,
    private frontend: NextJS
  ) {}

  async process(input: Tensor) {
    const features = await this.model
      .extract(input);
    return this.api.serve(features);
  }
}`}</pre>
          </div>
        </div>
      </div>

      {/* Top layer: polished presentation — mask reveals bottom on hover */}
      <div
        ref={topLayerRef}
        style={{
          ...layerStyle,
          backgroundColor: "var(--color-base)",
          zIndex: 1,
          clipPath: "circle(0px at 50% 50%)",
        }}
        aria-hidden={isTouch && !showTop}
      >
        <div className="container">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-secondary)",
              fontSize: "var(--text-label)",
              letterSpacing: "0.1em",
              marginBottom: "var(--space-4)",
            }}
          >
            WHAT I BUILD
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              maxWidth: "12ch",
            }}
          >
            Systems that learn and scale.
          </h2>
          <p
            style={{
              marginTop: "var(--space-6)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
              maxWidth: "50ch",
              lineHeight: 1.6,
            }}
          >
            Move your cursor to peek under the surface.
          </p>
        </div>
      </div>

      {/* Touch toggle */}
      {isTouch && (
        <button
          onClick={() => setShowTop((v) => !v)}
          style={{
            position: "absolute",
            bottom: "var(--space-8)",
            right: "var(--space-6)",
            zIndex: 2,
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-text-primary)",
            border: "1px solid var(--color-border)",
            borderRadius: 4,
            padding: "var(--space-2) var(--space-4)",
            backgroundColor: "var(--color-surface)",
            letterSpacing: "0.06em",
          }}
          aria-label={showTop ? "Show under the hood" : "Show presentation"}
        >
          {showTop ? "Under the hood →" : "← Presentation"}
        </button>
      )}
    </section>
  );
}
