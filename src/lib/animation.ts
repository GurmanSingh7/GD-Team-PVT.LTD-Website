"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function getGsap() {
  if (typeof window !== "undefined" && !registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return gsap;
}

export function refreshScroll() {
  if (typeof window !== "undefined") {
    ScrollTrigger.refresh();
  }
}

