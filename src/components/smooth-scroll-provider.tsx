"use client";

import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
import { refreshScroll } from "@/lib/animation";

export function SmoothScrollProvider({ children }: Readonly<{ children: ReactNode }>) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);
    lenis.on("scroll", refreshScroll);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}

