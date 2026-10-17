"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CursorPos {
  x: number;
  y: number;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [labelText, setLabelText] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label) return;

    setVisible(true);

    const pos: CursorPos = { x: 0, y: 0 };
    const ringPos: CursorPos = { x: 0, y: 0 };
    let rafId: number;
    let isMagnetic = false;
    let magneticTarget: HTMLElement | null = null;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;

      // Dot follows directly
      gsap.set(dot, { x: pos.x, y: pos.y });

      // Label follows
      gsap.set(label, { x: pos.x, y: pos.y });

      // Check for data-magnetic
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-magnetic]"
      );
      if (target && !isMagnetic) {
        isMagnetic = true;
        magneticTarget = target;
        ring.classList.add("cursor-ring--expanded");
      } else if (!target && isMagnetic) {
        isMagnetic = false;
        magneticTarget = null;
        ring.classList.remove("cursor-ring--expanded");
      }

      // Check for data-cursor-label
      const labelEl = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor-label]"
      );
      if (labelEl) {
        const text = labelEl.dataset.cursorLabel ?? "";
        setLabelText(text);
        label.classList.add("cursor-label--visible");
      } else {
        label.classList.remove("cursor-label--visible");
      }

      // Magnetic snap
      if (isMagnetic && magneticTarget) {
        const bounds = magneticTarget.getBoundingClientRect();
        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;
        gsap.to(ring, {
          x: cx,
          y: cy,
          duration: 0.4,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        });
      }
    };

    const onMouseEnter = () => setVisible(true);
    const onMouseLeave = () => setVisible(false);

    // RAF loop for ring lerp (only when not magnetic)
    const tick = () => {
      if (!isMagnetic) {
        ringPos.x = lerp(ringPos.x, pos.x, 0.12);
        ringPos.y = lerp(ringPos.y, pos.y, 0.12);
        gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={labelRef}
        className="cursor-label"
        aria-hidden="true"
      >
        {labelText}
      </div>
    </>
  );
}
