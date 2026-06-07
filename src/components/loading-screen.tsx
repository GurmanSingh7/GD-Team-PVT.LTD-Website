"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Particle = {
  x: number;
  duration: number;
  delay: number;
};

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * 1000,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 3,
    }));

    setParticles(generatedParticles);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          setTimeout(() => {
            setShow(false);
          }, 400);

          return 100;
        }

        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-black"
          exit={{
            opacity: 0,
            y: "-100%",
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />

            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/20 blur-[120px]" />
          </div>

          {/* Particles */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyan-300"
              initial={{
                x: particle.x,
                y: 1000,
                opacity: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}

          <div className="relative flex h-full flex-col items-center justify-center">
            {/* Outer Ring */}
            <motion.div
              className="absolute h-52 w-52 rounded-full border border-cyan-400/20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner Ring */}
            <motion.div
              className="absolute h-40 w-40 rounded-full border-t-2 border-cyan-400 border-r-2 border-fuchsia-400"
              animate={{ rotate: -360 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Logo */}
            <motion.h1
              className="mb-4 text-center text-4xl font-black tracking-wider text-white md:text-6xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                textShadow: [
                  "0 0 10px #22d3ee",
                  "0 0 30px #22d3ee",
                  "0 0 10px #22d3ee",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              GD TEAM
            </motion.h1>

            <motion.p
              className="mb-10 text-center uppercase tracking-[0.5em] text-cyan-200 text-xs md:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Garry's Developers' Team
              <br />
              <br />
              Owner - Gurman Singh
            </motion.p>

            {/* Progress Bar */}
            <div className="w-[280px] md:w-[400px]">
              <div className="mb-3 flex justify-between text-sm text-cyan-300">
                <span>Loading Experience</span>
                <span>{progress}%</span>
              </div>

              <div className="h-[4px] overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Bottom Text */}
            <motion.p
              className="mt-8 text-center text-xs uppercase tracking-[0.4em] text-white/40"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Building The Future With AI
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}