import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  className,
}: Readonly<{
  eyebrow: string;
  title: string;
  copy?: string;
  className?: string;
}>) {
  return (
    <div data-cursor="text" className={cn("section-heading max-w-3xl", className)}>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-cyan-200/80">
        {eyebrow}
      </p>
      <h2 className="text-balance text-4xl font-semibold leading-[1.02] text-white md:text-6xl">
        {title}
      </h2>
      {copy ? <p className="mt-6 text-lg leading-8 text-white/62">{copy}</p> : null}
    </div>
  );
}
