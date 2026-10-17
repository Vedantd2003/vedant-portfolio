"use client";

import { useContext } from "react";
import { LenisContext } from "@/components/layout/SmoothScroll";
import type Lenis from "lenis";

export function useLenis(): Lenis | null {
  const context = useContext(LenisContext);
  return context;
}
