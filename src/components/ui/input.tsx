import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "peer h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 pt-4 text-sm text-white outline-none transition placeholder:text-transparent focus:border-cyan-300/70 focus:bg-white/[0.07]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "peer min-h-36 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 pt-6 text-sm text-white outline-none transition placeholder:text-transparent focus:border-cyan-300/70 focus:bg-white/[0.07]",
        className,
      )}
      {...props}
    />
  );
}

export function FloatingLabel({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <label className="pointer-events-none absolute left-4 top-2 text-xs font-medium uppercase tracking-[0.22em] text-white/45 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.22em] peer-focus:text-cyan-200">
      {children}
    </label>
  );
}

