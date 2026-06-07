"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[90] h-px w-full origin-left bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400"
      style={{ scaleX }}
    />
  );
}

