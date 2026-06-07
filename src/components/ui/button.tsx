import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  "data-cursor": dataCursor = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      data-cursor={dataCursor}
      className={cn(
        "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 disabled:pointer-events-none disabled:opacity-60",
        variant === "primary" &&
          "bg-white text-black shadow-[0_0_42px_rgba(56,189,248,0.35)] hover:scale-[1.03]",
        variant === "secondary" &&
          "border border-white/15 bg-white/8 text-white backdrop-blur-xl hover:border-cyan-300/50 hover:bg-white/12",
        variant === "ghost" &&
          "bg-transparent text-white/75 hover:bg-white/10 hover:text-white",
        className,
      )}
      {...props}
    />
  );
}
