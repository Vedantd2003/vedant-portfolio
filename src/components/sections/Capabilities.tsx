"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface Capability {
  number: string;
  title: string;
  description: string;
  morphTarget: number;
}

const CAPABILITIES: Capability[] = [
  {
    number: "01",
    title: "AI / ML Engineering",
    description:
      "From model architecture to production inference pipelines.",
    morphTarget: 0,
  },
  {
    number: "02",
    title: "Full-Stack Development",
    description:
      "End-to-end web systems, APIs, and scalable infrastructure.",
    morphTarget: 1,
  },
  {
    number: "03",
    title: "Embedded & Robotics",
    description:
      "Firmware, real-time control systems, and hardware integration.",
    morphTarget: 2,
  },
  {
    number: "04",
    title: "Creative Development",
    description:
      "3D, WebGL, and interactive experiences at the frontier of UI.",
    morphTarget: 3,
  },
];

interface CapabilityItemProps {
  item: Capability;
  isLast: boolean;
  onHover: (morphTarget: number | null) => void;
}

function CapabilityItem({ item, isLast, onHover }: CapabilityItemProps) {
  const itemRef = useRef<HTMLLIElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Reveal animation
    gsap.fromTo(
      itemRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );

    // Divider scaleX reveal
    if (!isLast && lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, [isLast]);

  const onMouseEnter = (e: React.MouseEvent) => {
    setHovered(true);
    onHover(item.morphTarget);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
    void e;
  };

  const onMouseLeave = () => {
    setHovered(false);
    onHover(null);
    if (thumbRef.current) {
      gsap.to(thumbRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!thumbRef.current) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    gsap.to(thumbRef.current, {
      x: x - 60,
      y: y - 60,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <li
      ref={itemRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        padding: "var(--space-8) 0",
        opacity: 0,
        cursor: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "var(--space-6)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: hovered ? "var(--color-accent)" : "var(--color-text-secondary)",
            letterSpacing: "0.1em",
            transition: "color 0.3s ease",
            minWidth: "2.5ch",
          }}
        >
          {item.number}
        </span>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-title)",
              fontWeight: 500,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              marginTop: "var(--space-2)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* Cursor-following thumbnail */}
      <div
        ref={thumbRef}
        style={{
          position: "absolute",
          width: 120,
          height: 120,
          borderRadius: 4,
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          opacity: 0,
          transform: "scale(0.9)",
          zIndex: 10,
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
          }}
        >
          {item.number}
        </span>
      </div>

      {!isLast && (
        <div
          ref={lineRef}
          className="divider"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            transformOrigin: "left center",
            transform: "scaleX(0)",
          }}
        />
      )}
    </li>
  );
}

interface CapabilitiesProps {
  onMorphChange?: (target: number) => void;
}

export default function Capabilities({ onMorphChange }: CapabilitiesProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleHover = (morphTarget: number | null) => {
    if (morphTarget !== null && onMorphChange) {
      onMorphChange(morphTarget);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      titleRef.current,
      { y: "110%" },
      {
        y: "0%",
        duration: 1.0,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="capabilities"
      className="section"
      style={{ padding: "var(--space-24) 0" }}
      aria-label="Capabilities"
    >
      <div className="container">
        <div style={{ overflow: "hidden", marginBottom: "var(--space-16)" }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              transform: "translateY(110%)",
            }}
          >
            What I Do
          </h2>
        </div>

        <ul style={{ listStyle: "none" }} role="list">
          {CAPABILITIES.map((item, i) => (
            <CapabilityItem
              key={item.number}
              item={item}
              isLast={i === CAPABILITIES.length - 1}
              onHover={handleHover}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
