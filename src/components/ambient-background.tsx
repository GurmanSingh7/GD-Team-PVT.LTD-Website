"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function AmbientBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 70, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 70, damping: 24 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030407]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(76,201,240,0.2),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(168,85,247,0.15),transparent_28%),linear-gradient(180deg,#030407_0%,#05050b_52%,#030407_100%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.72)_74%)]" />
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />
      <div className="absolute inset-0 noise" />
    </div>
  );
}

