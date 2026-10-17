"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useMagnetic } from "@/hooks/useMagnetic";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="nav-link" aria-label={label}>
      <span className="nav-link__inner" aria-hidden="true">
        {label}
      </span>
      <span className="nav-link__hover" aria-hidden="true">
        {label}
      </span>
    </a>
  );
}

function MagneticCTA() {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, { strength: 0.3, radius: 70 });

  return (
    <a
      ref={ref}
      href="#contact"
      data-magnetic
      className="pill"
      style={{
        borderColor: "var(--color-accent)",
        color: "var(--color-accent)",
        fontSize: "var(--text-label)",
        letterSpacing: "0.08em",
        paddingInline: "var(--space-4)",
        paddingBlock: "var(--space-2)",
        transition: "background-color var(--dur-fast) var(--ease-soft)",
        cursor: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "var(--color-accent-dim)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
      }}
    >
      Let&apos;s talk
    </a>
  );
}

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(
        menu,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        menuLinksRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          delay: 0.1,
        }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menu, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const setMenuLinkRef = (el: HTMLElement | null, i: number) => {
    if (el) menuLinksRef.current[i] = el;
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "var(--space-4) var(--gutter)",
          mixBlendMode: "difference",
        }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "var(--color-text-primary)",
            letterSpacing: "-0.02em",
            cursor: "none",
          }}
          aria-label="Vedant — home"
        >
          V.
        </a>

        {/* Desktop links */}
        <div
          style={{
            display: "flex",
            gap: "var(--space-8)",
            alignItems: "center",
          }}
          role="list"
        >
          {navLinks.map((link) => (
            <div key={link.label} role="listitem">
              <NavLink label={link.label} href={link.href} />
            </div>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div
          style={{ display: "flex", gap: "var(--space-4)", alignItems: "center" }}
        >
          <div className="hidden-mobile">
            <MagneticCTA />
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              width: 40,
              height: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
              cursor: "none",
            }}
          >
            <span
              style={{
                display: "block",
                width: "100%",
                height: 1,
                backgroundColor: "var(--color-text-primary)",
                transformOrigin: "center",
                transition: "transform 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translateY(3.5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "100%",
                height: 1,
                backgroundColor: "var(--color-text-primary)",
                transformOrigin: "center",
                transition: "transform 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translateY(-3.5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--color-base)",
          zIndex: 999,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-8)",
        }}
      >
        {navLinks.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            ref={(el) => setMenuLinkRef(el, i)}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              opacity: 0,
              cursor: "none",
            }}
          >
            {link.label}
          </a>
        ))}

        <a
          href="#contact"
          ref={(el) => setMenuLinkRef(el, navLinks.length)}
          onClick={() => setMenuOpen(false)}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-label)",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            marginTop: "var(--space-8)",
            opacity: 0,
          }}
        >
          Let&apos;s talk →
        </a>
      </div>
    </>
  );
}
