"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";

interface MagneticOptions {
  strength?: number;
  radius?: number;
}

export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
): void {
  const { strength = 0.4, radius = 80 } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = ref.current;
    if (!el) return;

    let bounds: DOMRect;

    const onMouseMove = (e: MouseEvent) => {
      bounds = el.getBoundingClientRect();
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.6,
          ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(el);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
