"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface TimelineEntry {
  role: string;
  company: string;
  dateRange: string;
  type: "work" | "education";
}

const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    role: "{{ROLE_1}}",
    company: "{{COMPANY_1}}",
    dateRange: "{{DATE_RANGE_1}}",
    type: "work",
  },
  {
    role: "{{ROLE_2}}",
    company: "{{COMPANY_2}}",
    dateRange: "{{DATE_RANGE_2}}",
    type: "work",
  },
  {
    role: "{{ROLE_3}}",
    company: "{{COMPANY_3}}",
    dateRange: "{{DATE_RANGE_3}}",
    type: "work",
  },
  {
    role: "{{EDUCATION_1}}",
    company: "",
    dateRange: "{{EDUCATION_DATE_1}}",
    type: "education",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const linePathRef = useRef<SVGLineElement>(null);
  const entriesRef = useRef<(HTMLLIElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    // Title reveal
    if (!prefersReduced) {
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
    }

    // Scroll-draw the vertical SVG line
    if (!prefersReduced && linePathRef.current) {
      const line = linePathRef.current;
      const length = line.getTotalLength?.() ?? 400;
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(line, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    }

    // Entry reveal animations
    entriesRef.current.forEach((el, i) => {
      if (!el) return;
      if (prefersReduced) {
        el.style.opacity = "1";
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="section"
      style={{ padding: "var(--space-24) 0" }}
      aria-label="Experience"
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
            Experience
          </h2>
        </div>

        <div style={{ display: "flex", gap: "var(--space-12)" }}>
          {/* Vertical line — SVG */}
          <div
            style={{
              position: "relative",
              width: 2,
              flexShrink: 0,
            }}
            aria-hidden="true"
          >
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "visible",
              }}
              aria-hidden="true"
            >
              <line
                ref={linePathRef}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="var(--color-border)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Entries */}
          <ul style={{ flex: 1, listStyle: "none" }} role="list">
            {TIMELINE_ENTRIES.map((entry, i) => (
              <li
                key={i}
                ref={(el) => {
                  entriesRef.current[i] = el;
                }}
                style={{
                  padding: "var(--space-8) 0",
                  borderBottom:
                    i < TIMELINE_ENTRIES.length - 1
                      ? "1px solid var(--color-border)"
                      : "none",
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: "var(--space-2)",
                    marginBottom: "var(--space-2)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-title)",
                      fontWeight: 500,
                      color: "var(--color-text-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {entry.role}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "var(--text-label)",
                      color: "var(--color-text-secondary)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {entry.dateRange}
                  </span>
                </div>
                {entry.company && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {entry.type === "work" ? "at " : ""}
                    {entry.company}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
