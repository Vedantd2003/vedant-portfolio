"use client";

import { useEffect, useRef } from "react";
import { useScrollVelocity } from "@/hooks/useScrollVelocity";

const TECH_STACK = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "C++",
  "ROS",
  "Arduino",
  "Three.js",
  "WebGL",
  "GSAP",
  "Figma",
  "{{MORE_TOOLS}}",
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const velocity = useScrollVelocity();

  // Adjust marquee speed based on scroll velocity
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Base duration 30s, faster with scroll velocity (down to 10s)
    const duration = 30 - velocity * 20;
    track.style.animationDuration = `${Math.max(duration, 10)}s`;
  }, [velocity]);

  const items = [...TECH_STACK, ...TECH_STACK]; // duplicate for seamless loop

  return (
    <section
      aria-label="Technology stack"
      style={{
        padding: "var(--space-12) 0",
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        ref={trackRef}
        className="marquee-track"
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              color:
                i % TECH_STACK.length === TECH_STACK.length - 1
                  ? "var(--color-text-secondary)"
                  : "var(--color-text-primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              paddingInline: "var(--space-6)",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--space-6)",
            }}
          >
            {item}
            {/* Amber dot separator */}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "var(--color-accent)",
                opacity: 0.5,
              }}
            />
          </span>
        ))}
      </div>

      {/* Accessible list for screen readers */}
      <ul
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
        }}
        role="list"
      >
        {TECH_STACK.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
