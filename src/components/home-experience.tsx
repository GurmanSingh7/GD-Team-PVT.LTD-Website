"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Mic,
  Play,
  Send,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { AmbientBackground } from "@/components/ambient-background";
import { AnimatedCounter } from "@/components/animated-counter";
import { CustomCursor } from "@/components/custom-cursor";
import { HeroCanvas } from "@/components/hero-canvas";
import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionHeading } from "@/components/section-heading";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { Button } from "@/components/ui/button";
import { FloatingLabel, Input, Textarea } from "@/components/ui/input";
import {
  capabilities,
  chatMessages,
  filters,
  footerLinks,
  process,
  projects,
  services,
  stack,
  stats,
  team,
  testimonials,
} from "@/data/site";
import { getGsap } from "@/lib/animation";
import { cn } from "@/lib/utils";

export function HomeExperience() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const visibleProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const gsap = getGsap();
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 120,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.25,
      });

      gsap.from(".hero-fade", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.72,
      });

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 84%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".stagger-group").forEach((group) => {
        gsap.from(group.querySelectorAll(".stagger-item"), {
          y: 48,
          opacity: 0,
          duration: 0.85,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: group,
            start: "top 78%",
          },
        });
      });

      gsap.to(".parallax-slow", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".horizontal-track", {
        xPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: "+=900",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((index) => (index + 1) % testimonials.length);
    }, 4300);
    return () => window.clearInterval(timer);
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 2400);
  };

  return (
    <SmoothScrollProvider>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <AmbientBackground />
      <Navbar />
      <main id="top" className="overflow-hidden">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          visibleProjects={visibleProjects}
          setSelectedProject={setSelectedProject}
        />
        <TeamSection />
        <AssistantSection />
        <StatsSection />
        <TestimonialsSection
          testimonialIndex={testimonialIndex}
          setTestimonialIndex={setTestimonialIndex}
        />
        <ContactSection onSubmit={onSubmit} submitted={submitted} />
      </main>
      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <BackToTop />
    </SmoothScrollProvider>
  );
}

function HeroSection() {
  const words = "Building The Future With AI & Innovation".split(" ");

  return (
    <section className="relative flex min-h-screen items-start px-4 pt-28 md:items-center md:pt-20">
      <HeroCanvas />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030407] to-transparent" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.98fr_1.02fr]">
        <div>
          <div className="hero-fade mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-xl">
            <Sparkles size={15} />
            Software, AI and product engineering
          </div>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.95] text-white md:text-7xl lg:text-[6.2rem] xl:text-[6.8rem]">
            {words.map((word) => (
              <span key={word} className="mr-3 inline-flex overflow-hidden md:mr-5">
                <span className="hero-word inline-block">{word}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-8 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
            Garry&apos;s Developers&apos; Team designs and ships AI-native software,
            cinematic web experiences, intelligent automations, and cloud products for ambitious
            companies.
          </p>
          <div className="hero-fade mt-9 flex flex-col gap-4 sm:flex-row">
            <Button className="gap-2">
              Build with us <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" className="gap-2" data-cursor="video">
              Watch showreel <Play size={17} />
            </Button>
          </div>
        </div>
        <div className="hero-fade relative hidden min-h-[560px] lg:block">
          <div className="absolute right-0 top-20 w-[26rem] rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm font-semibold text-white">Live product lab</span>
              <span className="rounded-full bg-emerald-300/15 px-3 py-1 text-xs text-emerald-200">
                Online
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {stack.slice(0, 6).map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-300"
                      initial={{ width: 0 }}
                      animate={{ width: `${68 + index * 5}%` }}
                      transition={{ duration: 1.6, delay: 1 + index * 0.1 }}
                    />
                  </div>
                  <span className="w-20 text-right text-xs text-white/55">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-20 left-4 w-72 rounded-[2rem] border border-white/10 bg-black/35 p-5 backdrop-blur-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">Velocity</p>
            <p className="mt-3 text-5xl font-semibold text-white">12x</p>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Faster from product concept to polished market-ready launch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="parallax-slow">
          <SectionHeading
            eyebrow="About"
            title="A compact elite team for software that feels inevitable."
            copy="We combine product strategy, AI engineering, interface craft, and cloud execution to turn bold ideas into systems people actually want to use."
          />
        </div>
        <div className="stagger-group grid gap-5 md:grid-cols-2">
          {process.map((item) => (
            <article
              key={item.title}
              data-cursor="card"
              className="stagger-item group rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.08]"
            >
              <item.icon className="mb-8 text-cyan-200" size={30} />
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 leading-7 text-white/58">{item.copy}</p>
            </article>
          ))}
          <article className="stagger-item rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.12] to-white/[0.035] p-6 backdrop-blur-2xl md:col-span-2">
            <div className="grid gap-6 md:grid-cols-3">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-semibold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-sm text-white/52">{stat.label}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
      <div className="reveal mx-auto mt-16 flex max-w-7xl flex-wrap gap-3">
        {capabilities.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-white/65"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          title="Engineering, AI, and design under one premium product studio."
          copy="Each capability is designed as a launch system: strategy, interface, model behavior, infrastructure, analytics, and iteration."
        />
        <div className="stagger-group mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <motion.article
              key={service.title}
              className="stagger-item group relative min-h-64 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl"
              whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              data-cursor="card"
            >
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_40%_20%,rgba(34,211,238,0.24),transparent_35%),radial-gradient(circle_at_70%_90%,rgba(232,121,249,0.16),transparent_38%)]" />
              <service.icon className="relative text-cyan-200" size={34} />
              <h3 className="relative mt-10 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="relative mt-4 leading-7 text-white/56">{service.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({
  activeFilter,
  setActiveFilter,
  visibleProjects,
  setSelectedProject,
}: Readonly<{
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  visibleProjects: typeof projects;
  setSelectedProject: (project: (typeof projects)[number]) => void;
}>) {
  return (
    <section id="projects" className="relative px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Projects"
            title="Portfolio systems built to look expensive and perform harder."
          />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition",
                  activeFilter === filter
                    ? "border-cyan-200 bg-cyan-200 text-black"
                    : "border-white/10 bg-white/[0.045] text-white/58 hover:text-white",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="horizontal-track mt-14 flex gap-5">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                className="stagger-item group min-h-[30rem] w-[82vw] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl md:w-[33rem]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                data-cursor="project"
              >
                <div className="relative mb-8 h-56 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#070910]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),transparent_38%),linear-gradient(315deg,rgba(232,121,249,0.2),transparent_42%)]" />
                  <div className="absolute inset-8 rounded-[1.1rem] border border-white/10 bg-black/30 p-4 transition duration-500 group-hover:scale-105">
                    <div className="flex gap-2">
                      <span className="h-2 w-2 rounded-full bg-rose-300" />
                      <span className="h-2 w-2 rounded-full bg-amber-300" />
                      <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    </div>
                    <div className="mt-8 grid gap-3">
                      {[0, 1, 2, 3].map((line) => (
                        <div
                          key={line}
                          className="h-3 rounded-full bg-white/10"
                          style={{ width: `${92 - line * 14 + index * 2}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200/75">
                  {project.category}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{project.title}</h3>
                <p className="mt-4 leading-7 text-white/58">{project.copy}</p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-200/70 hover:bg-white/10"
                >
                  View details <ArrowRight size={16} />
                </button>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Team"
          title="Senior builders with product taste and launch discipline."
          copy="A small team stays close to the work, which means faster feedback, cleaner code, and sharper product decisions."
        />
        <div className="stagger-group mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              data-cursor="card"
              className="stagger-item group rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-cyan-200/40"
            >
              <div
                className={cn(
                  "grid aspect-square place-items-center overflow-hidden rounded-[1.4rem] bg-gradient-to-br text-5xl font-black text-black",
                  member.accent,
                )}
              >
                <span className="transition duration-500 group-hover:scale-110">{member.initials}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{member.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{member.role}</p>
              <div className="mt-5 flex gap-2">
                <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 hover:bg-white/10 hover:text-white" aria-label={`${member.name} LinkedIn`}>
                  <Share2 size={16} />
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 hover:bg-white/10 hover:text-white" aria-label={`${member.name} GitHub`}>
                  <Code2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AssistantSection() {
  return (
    <section className="px-4 py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <SectionHeading
          eyebrow="AI Assistant"
          title="A futuristic chat interface for every serious product."
          copy="This demo panel shows the kind of AI-native interface Garry's Developers' Team can embed into your workflows, dashboards, and customer experiences."
        />
        <div data-cursor="assistant" className="reveal rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 p-3">
            <div>
              <p className="font-semibold text-white">Garry AI</p>
              <p className="text-xs text-emerald-200">Voice and strategy assistant active</p>
            </div>
            <button className="grid h-11 w-11 place-items-center rounded-full bg-cyan-200 text-black shadow-[0_0_32px_rgba(103,232,249,0.35)]" aria-label="Voice assistant">
              <Mic size={18} />
            </button>
          </div>
          <div className="space-y-4 p-4">
            {chatMessages.map((message, index) => (
              <motion.div
                key={message}
                className={cn(
                  "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6",
                  index === 1
                    ? "ml-auto bg-white text-black"
                    : "border border-white/10 bg-black/30 text-white/72",
                )}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.22 }}
              >
                {message}
              </motion.div>
            ))}
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 p-2">
              <span className="flex-1 px-3 text-sm text-white/42">Ask about your next AI product...</span>
              <button className="grid h-10 w-10 place-items-center rounded-full bg-white text-black" aria-label="Send message">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="px-4 py-20">
      <div className="reveal mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.4rem] bg-black/25 p-6">
            <p className="text-5xl font-semibold text-white">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-sm text-white/52">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({
  testimonialIndex,
  setTestimonialIndex,
}: Readonly<{ testimonialIndex: number; setTestimonialIndex: (index: number) => void }>) {
  const active = testimonials[testimonialIndex];

  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-5xl text-center">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by founders who care about quality."
          className="mx-auto"
        />
        <div className="reveal mt-12 rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 text-left backdrop-blur-2xl md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.quote}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-2xl leading-10 text-white md:text-4xl md:leading-[1.25]">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-between gap-6">
                <div>
                  <p className="font-semibold text-white">{active.name}</p>
                  <p className="mt-1 text-sm text-white/52">{active.title}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/70 hover:bg-white/10"
                    onClick={() =>
                      setTestimonialIndex(
                        (testimonialIndex - 1 + testimonials.length) % testimonials.length,
                      )
                    }
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white/70 hover:bg-white/10"
                    onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ContactSection({
  onSubmit,
  submitted,
}: Readonly<{ onSubmit: (event: FormEvent<HTMLFormElement>) => void; submitted: boolean }>) {
  return (
    <section id="contact" className="px-4 py-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Contact"
          title="Bring us the ambitious thing. We will make it feel real."
          copy="Share the product, AI workflow, or company website you want to build. We will respond with a sharp first direction."
        />
        <form data-cursor="form" onSubmit={onSubmit} className="reveal rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-2xl md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <Input required placeholder="Name" />
              <FloatingLabel>Name</FloatingLabel>
            </div>
            <div className="relative">
              <Input required type="email" placeholder="Email" />
              <FloatingLabel>Email</FloatingLabel>
            </div>
          </div>
          <div className="relative mt-5">
            <Input required placeholder="Company or idea" />
            <FloatingLabel>Company or idea</FloatingLabel>
          </div>
          <div className="relative mt-5">
            <Textarea required placeholder="Project brief" />
            <FloatingLabel>Project brief</FloatingLabel>
          </div>
          <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <Button type="submit" className="gap-2">
              {submitted ? "Message sent" : "Send request"} <Send size={17} />
            </Button>
            <p className="text-sm text-white/45">Validated, accessible, and ready for real backend wiring.</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-sm font-black text-black">
              G
            </span>
            <span className="font-semibold text-white">Garry&apos;s Developers&apos; Team</span>
          </a>
          <div className="flex flex-wrap gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/58 transition hover:border-cyan-200/50 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <p className="mt-6 text-sm text-white/38">
          Copyright 2026 Garry&apos;s Developers&apos; Team. Premium software, AI, and automation.
        </p>
      </div>
    </footer>
  );
}

function ProjectModal({
  project,
  onClose,
}: Readonly<{ project: (typeof projects)[number] | null; onClose: () => void }>) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/70 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-2xl rounded-[2rem] border border-white/10 bg-[#080a12] p-6 shadow-2xl"
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-200">
                  {project.category}
                </p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{project.title}</h3>
              </div>
              <button
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 text-white/70 hover:bg-white/10"
                onClick={onClose}
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-6 text-lg leading-8 text-white/64">{project.copy}</p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">Outcome</p>
              <p className="mt-3 text-2xl font-semibold text-white">{project.metric}</p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BackToTop() {
  return (
    <a
      href="#top"
      className="fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur-xl transition hover:bg-white hover:text-black"
      aria-label="Back to top"
    >
      <ArrowRight className="-rotate-90" size={18} />
    </a>
  );
}
