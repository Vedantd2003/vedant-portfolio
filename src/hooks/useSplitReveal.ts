"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface SplitRevealOptions {
  by?: "lines" | "words";
  delay?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
}

interface SplitRevealReturn {
  isRevealed: boolean;
}

export function useSplitReveal(
  ref: RefObject<HTMLElement | null>,
  options: SplitRevealOptions = {}
): SplitRevealReturn {
  const {
    by = "lines",
    delay = 0,
    stagger = 0.07,
    duration = 1.2,
    ease = "cubic-bezier(0.16, 1, 0.3, 1)",
    start = "top 80%",
  } = options;

  const [isRevealed, setIsRevealed] = useState(false);
  const splitElementsRef = useRef<HTMLElement[]>([]);
  const wrappersRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const el = ref.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReduced) {
      setIsRevealed(true);
      return;
    }

    // Simple text split without external library
    const originalHTML = el.innerHTML;
    const text = el.textContent ?? "";
    const splitItems: string[] =
      by === "words" ? text.split(/\s+/).filter(Boolean) : [text];

    // For "lines" just wrap the whole content, for "words" split each
    const elements: HTMLElement[] = [];
    const wrappers: HTMLElement[] = [];

    if (by === "words") {
      el.innerHTML = "";
      splitItems.forEach((word, i) => {
        const wrapper = document.createElement("span");
        wrapper.style.cssText = "overflow:hidden;display:inline-block;vertical-align:bottom;";

        const span = document.createElement("span");
        span.textContent = word;
        span.style.cssText = "display:inline-block;transform:translateY(110%);";
        if (i < splitItems.length - 1) {
          span.innerHTML = word + "&nbsp;";
        }

        wrapper.appendChild(span);
        el.appendChild(wrapper);
        elements.push(span);
        wrappers.push(wrapper);
      });
    } else {
      // Lines: treat the whole element as one line unit
      const children = Array.from(el.children) as HTMLElement[];
      if (children.length > 0) {
        children.forEach((child) => {
          const wrapper = document.createElement("div");
          wrapper.style.cssText = "overflow:hidden;";
          child.style.cssText = "transform:translateY(110%);display:block;";
          child.parentNode?.insertBefore(wrapper, child);
          wrapper.appendChild(child);
          elements.push(child);
          wrappers.push(wrapper);
        });
      } else {
        // Text node — wrap in a span
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "overflow:hidden;";
        const span = document.createElement("span");
        span.style.cssText = "transform:translateY(110%);display:block;";
        span.innerHTML = originalHTML;
        wrapper.appendChild(span);
        el.innerHTML = "";
        el.appendChild(wrapper);
        elements.push(span);
        wrappers.push(wrapper);
      }
    }

    splitElementsRef.current = elements;
    wrappersRef.current = wrappers;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
        onEnter: () => setIsRevealed(true),
      },
      delay,
    });

    tl.to(elements, {
      y: 0,
      duration,
      ease,
      stagger,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === el) st.kill();
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isRevealed };
}
