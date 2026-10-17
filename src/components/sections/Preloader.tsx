"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: (audioEnabled: boolean) => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "enter">("loading");
  const [audioChoice, setAudioChoice] = useState<boolean | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLDivElement>(null);
  const displayProgress = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Simulate/track loading progress
  useEffect(() => {
    let target = 0;
    const interval = setInterval(() => {
      target = Math.min(target + Math.random() * 15 + 5, 100);
      setProgress(target);
      if (target >= 100) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Lerp display counter
  useEffect(() => {
    const tick = () => {
      displayProgress.current += (progress - displayProgress.current) * 0.08;
      const counter = counterRef.current;
      if (counter) {
        const val = Math.round(displayProgress.current);
        counter.textContent = String(val).padStart(3, "0");
      }
      if (Math.abs(progress - displayProgress.current) > 0.1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (progress >= 100) {
        if (counter) counter.textContent = "100";
        // Brief hold, then switch to ENTER
        setTimeout(() => {
          setPhase("enter");
          gsap.fromTo(
            audioRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
          );
        }, 400);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress]);

  const handleEnter = (audio: boolean) => {
    setAudioChoice(audio);
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Emit custom event
        window.dispatchEvent(
          new CustomEvent("preloader:done", { detail: { audioEnabled: audio } })
        );
        onComplete(audio);
      },
    });

    tl.to(counterRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
    }).to(
      overlay,
      {
        y: "-100%",
        duration: 1.2,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      "-=0.1"
    );
  };

  return (
    <div
      ref={overlayRef}
      className="preloader"
      role="status"
      aria-label="Loading portfolio"
      style={{ zIndex: 10002 }}
    >
      <div
        ref={counterRef}
        className="preloader__counter"
        aria-live="polite"
      >
        000
      </div>

      <div ref={audioRef} style={{ opacity: 0 }}>
        {phase === "enter" ? (
          <div className="preloader__audio" role="group" aria-label="Sound preference">
            <button
              className={`preloader__audio-btn${audioChoice === true ? " preloader__audio-btn--active" : ""}`}
              onClick={() => handleEnter(true)}
              aria-label="Enable sound and enter"
            >
              Sound On
            </button>
            <button
              className={`preloader__audio-btn${audioChoice === false ? " preloader__audio-btn--active" : ""}`}
              onClick={() => handleEnter(false)}
              aria-label="Enter without sound (default)"
            >
              Sound Off
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
