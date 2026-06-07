"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/data/site";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 130);
  });

  return (
    <motion.header
      className="fixed left-0 right-0 top-5 z-50 px-4"
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <a href="#top" className="flex items-center gap-3" aria-label="Garry's Developers' Team home">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-sm font-black text-black shadow-[0_0_38px_rgba(56,189,248,0.42)]">
            G
          </span>
          <span className="hidden text-sm font-semibold text-white sm:block">
            Garry&apos;s Developers&apos; Team
          </span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm text-white/68 transition hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <Button variant="secondary" className="h-10 gap-2 px-4">
            Start a build <ArrowUpRight size={16} />
          </Button>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-black/80 p-3 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-white/75 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

