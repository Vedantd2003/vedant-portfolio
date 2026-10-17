"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface Project {
  number: string;
  title: string;
  category: string;
  tags: string[];
  stat: string;
  image: string;
  imageAlt: string;
}

const PROJECTS: Project[] = [
  {
    number: "01",
    title: "{{PROJECT_1_TITLE}}",
    category: "{{PROJECT_1_CATEGORY}}",
    tags: ["{{PROJECT_1_TECH_TAGS}}"],
    stat: "{{PROJECT_1_STAT}}",
    image: "{{PROJECT_1_IMAGE}}",
    imageAlt: "{{IMAGE_ALT_TEXT}}",
  },
  {
    number: "02",
    title: "{{PROJECT_2_TITLE}}",
    category: "{{PROJECT_2_CATEGORY}}",
    tags: ["{{PROJECT_2_TECH_TAGS}}"],
    stat: "{{PROJECT_2_STAT}}",
    image: "{{PROJECT_2_IMAGE}}",
    imageAlt: "{{IMAGE_ALT_TEXT}}",
  },
  {
    number: "03",
    title: "{{PROJECT_3_TITLE}}",
    category: "{{PROJECT_3_CATEGORY}}",
    tags: ["{{PROJECT_3_TECH_TAGS}}"],
    stat: "{{PROJECT_3_STAT}}",
    image: "{{PROJECT_3_IMAGE}}",
    imageAlt: "{{IMAGE_ALT_TEXT}}",
  },
];

function StatCounter({ stat }: { stat: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        // Simple fade-in count-up visual effect
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        }
      },
    });
  }, []);

  return (
    <span
      ref={ref}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-label)",
        color: "var(--color-accent)",
        letterSpacing: "0.06em",
        opacity: 0,
      }}
    >
      {stat}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLLIElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLSpanElement>(null);

  const onMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.02,
      duration: 0.6,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    });
    gsap.to(ctaRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.3,
      ease: "power2.in",
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <li
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        opacity: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        cursor: "none",
      }}
    >
      {/* Image area */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 4,
          aspectRatio: "16 / 9",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          ref={imageRef}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {project.image.startsWith("{{") ? (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                color: "var(--color-border)",
                letterSpacing: "0.1em",
              }}
            >
              {project.image}
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.imageAlt}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        {/* View project CTA */}
        <span
          ref={ctaRef}
          data-magnetic
          style={{
            position: "absolute",
            bottom: "var(--space-4)",
            right: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-text-primary)",
            backgroundColor: "var(--color-base)",
            padding: "var(--space-2) var(--space-4)",
            borderRadius: 2,
            opacity: 0,
            transform: "translateY(8px)",
            letterSpacing: "0.06em",
          }}
        >
          View Project →
        </span>
      </div>

      {/* Meta */}
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-text-secondary)",
            letterSpacing: "0.08em",
          }}
        >
          {project.number}
        </span>
        <StatCounter stat={project.stat} />
      </div>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-title)",
          fontWeight: 700,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.01em",
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h3>

      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--text-label)",
          color: "var(--color-text-secondary)",
        }}
      >
        {project.category}
      </span>

      {/* Tech pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {project.tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}

export default function FeaturedWork() {
  const titleRef = useRef<HTMLHeadingElement>(null);

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
      id="work"
      className="section"
      style={{ padding: "var(--space-24) 0" }}
      aria-label="Selected work"
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
            Selected Work
          </h2>
        </div>

        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "var(--space-16)",
            listStyle: "none",
          }}
          role="list"
        >
          {PROJECTS.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </ul>
      </div>
    </section>
  );
}
