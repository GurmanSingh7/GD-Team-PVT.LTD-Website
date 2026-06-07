"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/animation";

export function AnimatedCounter({
  value,
  suffix = "",
}: Readonly<{ value: number; suffix?: string }>) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const gsap = getGsap();
    const target = { value: 0 };
    const ctx = gsap.context(() => {
      gsap.to(target, {
        value,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => setDisplay(Math.round(target.value)),
      });
    }, ref);

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

