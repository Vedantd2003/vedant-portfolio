"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMagnetic } from "@/hooks/useMagnetic";

const EMAIL = "{{EMAIL}}";
const CONTACT_TAGLINE =
  "Available for full-time roles, freelance projects, and research collaborations.";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/{{GITHUB_USERNAME}}" },
  { label: "LinkedIn", href: "https://linkedin.com/in/{{LINKEDIN_USERNAME}}" },
  { label: "Twitter", href: "https://twitter.com/{{TWITTER_USERNAME}}" },
];

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-link"
      aria-label={`${label} (opens in new tab)`}
      style={{ cursor: "none" }}
    >
      <span className="nav-link__inner" aria-hidden="true">{label}</span>
      <span className="nav-link__hover" aria-hidden="true">{label}</span>
    </a>
  );
}

function RotatingBadge() {
  const badgeRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let angle = 0;
    let rafId: number;

    const tick = () => {
      angle += 0.3;
      if (badge.parentElement) {
        badge.parentElement.style.transform = `rotate(${angle}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, []);

  const text = "AVAILABLE FOR WORK • PUNE, INDIA • ";

  return (
    <div
      style={{
        width: 120,
        height: 120,
        position: "relative",
        flexShrink: 0,
      }}
      aria-label="Available for work, based in Pune, India"
    >
      <svg
        viewBox="0 0 120 120"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      >
        <defs>
          <path
            id="circle-path"
            d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          />
        </defs>
        <text
          ref={badgeRef}
          fill="var(--color-text-secondary)"
          fontSize="9"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          <textPath href="#circle-path">{text}</textPath>
        </text>
        {/* Center dot */}
        <circle cx="60" cy="60" r="3" fill="var(--color-accent)" />
      </svg>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  useMagnetic(emailRef, { strength: 0.2, radius: 100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      headlineRef.current,
      { y: "110%" },
      {
        y: "0%",
        duration: 1.2,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, []);

  const copyEmail = () => {
    if (EMAIL.startsWith("{{")) {
      // Placeholder — don't copy
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "var(--space-24) 0",
        position: "relative",
      }}
      aria-label="Contact"
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "var(--space-8)",
            marginBottom: "var(--space-12)",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <h2
              ref={headlineRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-hero)",
                fontWeight: 700,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 0.95,
                transform: "translateY(110%)",
              }}
            >
              Let&apos;s Build
              <br />
              Something.
            </h2>
          </div>

          <RotatingBadge />
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-body)",
            color: "var(--color-text-secondary)",
            maxWidth: "50ch",
            lineHeight: 1.6,
            marginBottom: "var(--space-12)",
          }}
        >
          {CONTACT_TAGLINE}
        </p>

        {/* Email */}
        <div style={{ marginBottom: "var(--space-12)" }}>
          <button
            ref={emailRef}
            onClick={copyEmail}
            data-magnetic
            data-cursor-label="Click to copy"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              color: copied ? "var(--color-accent)" : "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.0,
              transition: "color 0.3s ease",
              cursor: "none",
              background: "none",
              border: "none",
              display: "block",
              textAlign: "left",
              padding: 0,
            }}
            aria-label={`Email: ${EMAIL}. Click to copy.`}
          >
            {EMAIL}
          </button>

          {/* Toast */}
          <div
            role="status"
            aria-live="polite"
            style={{
              marginTop: "var(--space-2)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
              opacity: copied ? 1 : 0,
              transform: copied ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            Copied!
          </div>
        </div>

        {/* Social links */}
        <nav
          aria-label="Social links"
          style={{
            display: "flex",
            gap: "var(--space-8)",
            flexWrap: "wrap",
          }}
        >
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} label={link.label} href={link.href} />
          ))}
        </nav>
      </div>
    </section>
  );
}
