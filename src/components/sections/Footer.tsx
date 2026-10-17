"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const time = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "var(--space-16) 0 var(--space-8)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-label="Site footer"
    >
      {/* Big wordmark */}
      <div
        className="container"
        style={{ position: "relative" }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "min(18vw, 180px)",
            fontWeight: 700,
            color: "var(--color-surface)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            userSelect: "none",
            marginBottom: "var(--space-8)",
          }}
          aria-hidden="true"
        >
          VEDANT
        </p>

        {/* Footer meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "var(--space-4)",
          }}
        >
          {/* Left: location + time */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.08em",
                marginBottom: "var(--space-1)",
              }}
            >
              Based in Pune, India
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-label)",
                color: "var(--color-text-secondary)",
                letterSpacing: "0.08em",
              }}
              aria-label={`Current time in Pune: ${currentTime}`}
            >
              {currentTime || "——:——:——"} IST
            </p>
          </div>

          {/* Right: back to top */}
          <button
            onClick={scrollToTop}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-label)",
              color: "var(--color-text-secondary)",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              cursor: "none",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-text-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-text-secondary)";
            }}
            aria-label="Scroll back to top"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 10 L6 2 M2 6 L6 2 L10 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to top
          </button>
        </div>

        {/* Copyright */}
        <p
          style={{
            marginTop: "var(--space-8)",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-border)",
            letterSpacing: "0.06em",
          }}
        >
          © 2024 Vedant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
