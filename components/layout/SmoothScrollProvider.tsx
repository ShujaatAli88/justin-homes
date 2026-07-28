"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    lenisInstance?: Lenis;
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      autoRaf: true,
    });

    // Exposed so other components (e.g. the navbar logo) can trigger a
    // smooth scroll-to-top that Lenis is aware of, instead of fighting it
    // with a plain window.scrollTo. Named lenisInstance — the `lenis`
    // package itself already reserves window.lenis for its own internal use.
    window.lenisInstance = lenis;

    return () => {
      lenis.destroy();
      delete window.lenisInstance;
    };
  }, []);

  return <>{children}</>;
}
