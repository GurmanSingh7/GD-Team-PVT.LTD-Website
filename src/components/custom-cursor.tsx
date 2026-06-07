"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/animation";
import { cn } from "@/lib/utils";

type CursorMode = "default" | "button" | "card" | "project" | "video" | "assistant" | "text" | "form";

const modeCopy: Record<CursorMode, string> = {
  default: "",
  button: "Launch",
  card: "Explore",
  project: "View",
  video: "Play",
  assistant: "Interact",
  text: "Read",
  form: "Type",
};

const modeScale: Record<CursorMode, number> = {
  default: 1,
  button: 2.6,
  card: 2.15,
  project: 3.05,
  video: 2.7,
  assistant: 2.35,
  text: 1.55,
  form: 1.75,
};

const cursorModes = new Set<CursorMode>([
  "default",
  "button",
  "card",
  "project",
  "video",
  "assistant",
  "text",
  "form",
]);

type Particle = {
  element: HTMLSpanElement;
  life: number;
  maxLife: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
};

type Shockwave = {
  element: HTMLSpanElement;
  life: number;
  maxLife: number;
  x: number;
  y: number;
};

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const shockwavesRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -120, y: -120 });
  const coreRefPos = useRef({ x: -120, y: -120 });
  const followerRefPos = useRef({ x: -120, y: -120 });
  const velocityRef = useRef({ x: 0, y: 0, speed: 0 });
  const modeRef = useRef<CursorMode>("default");
  const magneticRef = useRef<HTMLElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const shockwaves = useRef<Shockwave[]>([]);
  const particleClock = useRef(0);
  const [mode, setMode] = useState<CursorMode>("default");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || reduceMotion) return;

    const gsap = getGsap();
    const root = rootRef.current;
    const core = coreRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;
    const particleLayer = particlesRef.current;
    const shockwaveLayer = shockwavesRef.current;
    if (!root || !core || !follower || !label || !particleLayer || !shockwaveLayer) return;

    const quickCoreX = gsap.quickSetter(core, "x", "px");
    const quickCoreY = gsap.quickSetter(core, "y", "px");
    const quickFollowerX = gsap.quickSetter(follower, "x", "px");
    const quickFollowerY = gsap.quickSetter(follower, "y", "px");
    const quickRootOpacity = gsap.quickTo(root, "opacity", { duration: 0.24, ease: "power2.out" });
    const quickCoreScale = gsap.quickTo(core, "scale", { duration: 0.28, ease: "power3.out" });
    const quickFollowerScale = gsap.quickTo(follower, "scale", {
      duration: 0.5,
      ease: "elastic.out(1, 0.55)",
    });
    const quickFollowerOpacity = gsap.quickTo(follower, "opacity", {
      duration: 0.24,
      ease: "power2.out",
    });

    const resetMagnetic = () => {
      if (magneticRef.current) {
        gsap.to(magneticRef.current, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.55,
          ease: "elastic.out(1, 0.55)",
          overwrite: true,
        });
        magneticRef.current = null;
      }
    };

    const updateMode = (nextMode: CursorMode, element?: HTMLElement | null) => {
      if (modeRef.current === nextMode && magneticRef.current === element) return;
      if (magneticRef.current && magneticRef.current !== element) {
        gsap.to(magneticRef.current, {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.55)",
          overwrite: true,
        });
      }
      modeRef.current = nextMode;
      setMode(nextMode);
      quickCoreScale(modeScale[nextMode]);
      quickFollowerScale(nextMode === "default" ? 1 : modeScale[nextMode] * 1.15);
      quickFollowerOpacity(nextMode === "default" ? 0.52 : 0.92);
      if (nextMode === "default") {
        resetMagnetic();
      } else {
        magneticRef.current = element ?? null;
      }
    };

    const createParticle = (x: number, y: number, boosted = false) => {
      const element = document.createElement("span");
      const maxLife = boosted ? 44 : 28;
      const angle = Math.random() * Math.PI * 2;
      const force = boosted ? 2.8 + Math.random() * 2 : 0.9 + Math.random() * 1.2;
      const size = boosted ? 4 + Math.random() * 9 : 2 + Math.random() * 4;
      element.className = "cursor-particle";
      particleLayer.appendChild(element);
      particles.current.push({
        element,
        life: maxLife,
        maxLife,
        x,
        y,
        vx: Math.cos(angle) * force + velocityRef.current.x * 0.05,
        vy: Math.sin(angle) * force + velocityRef.current.y * 0.05,
        size,
      });
    };

    const createShockwave = (x: number, y: number) => {
      const element = document.createElement("span");
      element.className = "cursor-shockwave";
      shockwaveLayer.appendChild(element);
      shockwaves.current.push({ element, life: 36, maxLife: 36, x, y });
      for (let index = 0; index < 14; index += 1) {
        createParticle(x, y, true);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      setActive(true);
      quickRootOpacity(1);
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;

      const target = event.target as HTMLElement;
      const interactive = target.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select",
      );
      const attr = interactive?.dataset.cursor;
      let nextMode: CursorMode =
        attr && cursorModes.has(attr as CursorMode) ? (attr as CursorMode) : "default";
      if (!attr && interactive?.matches("button")) nextMode = "button";
      if (!attr && interactive?.matches("a")) nextMode = "button";
      if (!attr && interactive?.matches("input, textarea, select")) nextMode = "form";
      updateMode(nextMode, interactive);
    };

    const onPointerLeave = () => {
      setActive(false);
      quickRootOpacity(0);
      updateMode("default");
    };

    const onPointerDown = () => {
      root.classList.add("cursor-clicking");
      createShockwave(targetRef.current.x, targetRef.current.y);
      gsap.to(core, {
        scale: modeScale[modeRef.current] * 0.74,
        duration: 0.08,
        overwrite: true,
        yoyo: true,
        repeat: 1,
        ease: "power3.out",
      });
    };

    const onPointerUp = () => {
      root.classList.remove("cursor-clicking");
      quickCoreScale(modeScale[modeRef.current]);
    };

    const tick = () => {
      const target = targetRef.current;
      const corePos = coreRefPos.current;
      const followerPos = followerRefPos.current;
      const previousX = corePos.x;
      const previousY = corePos.y;
      const modeNow = modeRef.current;
      const coreEase = modeNow === "default" ? 0.34 : 0.42;
      const followerEase = modeNow === "default" ? 0.13 : 0.18;

      corePos.x += (target.x - corePos.x) * coreEase;
      corePos.y += (target.y - corePos.y) * coreEase;
      followerPos.x += (target.x - followerPos.x) * followerEase;
      followerPos.y += (target.y - followerPos.y) * followerEase;

      velocityRef.current.x = corePos.x - previousX;
      velocityRef.current.y = corePos.y - previousY;
      velocityRef.current.speed = Math.min(
        34,
        Math.hypot(velocityRef.current.x, velocityRef.current.y),
      );

      const speed = velocityRef.current.speed;
      const rotation = Math.atan2(velocityRef.current.y, velocityRef.current.x) * (180 / Math.PI);
      quickCoreX(corePos.x - 13);
      quickCoreY(corePos.y - 13 + Math.sin(performance.now() * 0.002) * 1.5);
      quickFollowerX(followerPos.x - 35);
      quickFollowerY(followerPos.y - 35);

      gsap.set(core, {
        rotate: Number.isFinite(rotation) ? rotation : 0,
        "--cursor-velocity": 1 + speed / 70,
      });
      gsap.set(follower, {
        rotate: Number.isFinite(rotation) ? rotation * 0.28 : 0,
        scaleX: (modeNow === "default" ? 1 : modeScale[modeNow] * 1.1) + speed / 120,
        scaleY: (modeNow === "default" ? 1 : modeScale[modeNow] * 0.96) - speed / 230,
      });

      particleClock.current += 1;
      if (particleClock.current % (modeNow === "default" ? 5 : 3) === 0 && active) {
        createParticle(corePos.x, corePos.y, modeNow !== "default");
      }

      if (magneticRef.current && modeNow !== "form") {
        const rect = magneticRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = target.x - centerX;
        const distanceY = target.y - centerY;
        gsap.to(magneticRef.current, {
          x: distanceX * 0.11,
          y: distanceY * 0.13,
          rotateX: -distanceY * 0.025,
          rotateY: distanceX * 0.025,
          duration: 0.42,
          ease: "power3.out",
          overwrite: true,
        });
      }

      particles.current = particles.current.filter((particle) => {
        particle.life -= 1;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.94;
        particle.vy *= 0.94;
        const progress = particle.life / particle.maxLife;
        particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, 0) scale(${progress})`;
        particle.element.style.opacity = `${Math.max(0, progress * 0.8)}`;
        particle.element.style.width = `${particle.size}px`;
        particle.element.style.height = `${particle.size}px`;
        if (particle.life <= 0) {
          particle.element.remove();
          return false;
        }
        return true;
      });

      shockwaves.current = shockwaves.current.filter((wave) => {
        wave.life -= 1;
        const progress = 1 - wave.life / wave.maxLife;
        wave.element.style.transform = `translate3d(${wave.x - 12}px, ${wave.y - 12}px, 0) scale(${1 + progress * 8})`;
        wave.element.style.opacity = `${Math.max(0, 0.55 - progress * 0.55)}`;
        if (wave.life <= 0) {
          wave.element.remove();
          return false;
        }
        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      resetMagnetic();
      particles.current.forEach((particle) => particle.element.remove());
      shockwaves.current.forEach((wave) => wave.element.remove());
    };
  }, [active]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "advanced-cursor pointer-events-none fixed inset-0 z-[150] hidden opacity-0 lg:block",
        `cursor-mode-${mode}`,
      )}
    >
      <div ref={shockwavesRef} className="absolute inset-0" />
      <div ref={particlesRef} className="absolute inset-0" />
      <div ref={followerRef} className="cursor-follower">
        <span className="cursor-follower__scan" />
      </div>
      <div ref={coreRef} className="cursor-core">
        <span className="cursor-core__aura" />
        <span className="cursor-core__lens" />
        <span ref={labelRef} className="cursor-core__label">
          {modeCopy[mode]}
        </span>
      </div>
    </div>
  );
}
