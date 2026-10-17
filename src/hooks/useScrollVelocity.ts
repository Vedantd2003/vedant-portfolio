"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/hooks/useLenis";

export function useScrollVelocity(): number {
  const lenis = useLenis();
  const [velocity, setVelocity] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    if (lenis) {
      const onScroll = ({ velocity: v }: { velocity: number }) => {
        // Normalize velocity to 0–1 range (clamp at ±20 px/frame)
        const normalized = Math.min(Math.abs(v) / 20, 1);
        setVelocity(normalized);
      };

      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
      };
    }

    // Fallback: compute from window scroll events
    const onScroll = () => {
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      const dy = window.scrollY - lastScrollRef.current;

      if (dt > 0) {
        const v = Math.abs(dy / dt) * 10; // pixels/ms scaled
        const normalized = Math.min(v, 1);
        setVelocity(normalized);

        // Decay
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setVelocity((prev) => prev * 0.85);
        });
      }

      lastScrollRef.current = window.scrollY;
      lastTimeRef.current = now;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [lenis]);

  return velocity;
}
