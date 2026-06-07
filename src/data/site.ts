import {
  AppWindow,
  Bot,
  BrainCircuit,
  CloudCog,
  Cpu,
  LayoutTemplate,
  Network,
  Rocket,
  Sparkles,
  Workflow,
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Projects completed", value: 128, suffix: "+" },
  { label: "Clients served", value: 72, suffix: "+" },
  { label: "AI models built", value: 46, suffix: "+" },
  { label: "Team members", value: 18, suffix: "" },
];

export const services = [
  {
    title: "AI Development",
    copy: "Custom agents, copilots, retrieval systems, and production AI workflows.",
    icon: BrainCircuit,
  },
  {
    title: "Web Development",
    copy: "High-performance web platforms with premium UX and scalable architecture.",
    icon: AppWindow,
  },
  {
    title: "App Development",
    copy: "Mobile-first product experiences engineered for speed and adoption.",
    icon: Rocket,
  },
  {
    title: "UI/UX Design",
    copy: "Sharp product design systems that turn complex software into clarity.",
    icon: LayoutTemplate,
  },
  {
    title: "Automation",
    copy: "Operational automations that remove friction across teams and tools.",
    icon: Workflow,
  },
  {
    title: "SaaS Products",
    copy: "From MVP to enterprise-grade SaaS with billing, analytics, and growth loops.",
    icon: Sparkles,
  },
  {
    title: "Cloud Solutions",
    copy: "Secure cloud-native infrastructure, deployments, observability, and DevOps.",
    icon: CloudCog,
  },
  {
    title: "Machine Learning",
    copy: "Predictive models, data pipelines, and model evaluation systems.",
    icon: Cpu,
  },
];

export const projects = [
  {
    title: "NeuralOps Command Center",
    category: "AI",
    metric: "42% faster support triage",
    copy: "A multi-agent operations cockpit with live intent routing, knowledge retrieval, and executive analytics.",
  },
  {
    title: "Pulse Commerce Cloud",
    category: "SaaS",
    metric: "$8.4M GMV supported",
    copy: "A conversion-focused commerce platform with real-time pricing, subscriptions, and inventory intelligence.",
  },
  {
    title: "Atlas Mobile Studio",
    category: "Apps",
    metric: "4.9 app rating",
    copy: "A polished mobile product suite for field teams with offline-first sync and role-aware dashboards.",
  },
  {
    title: "FinSight Intelligence",
    category: "Web",
    metric: "31% higher activation",
    copy: "An interactive analytics portal with cinematic onboarding and deeply responsive data visualization.",
  },
];

export const team = [
  {
    name: "Gurman Singh",
    role: "Founder / AI Product Architect",
    initials: "GS",
    accent: "from-cyan-300 to-violet-400",
  },
  {
    name: "Mr.Andrew",
    role: "Full-Stack Systems Engineer",
    initials: "A",
    accent: "from-emerald-300 to-cyan-400",
  },
  {
    name: "Mr.Charley",
    role: "Experience Design Lead",
    initials: "C",
    accent: "from-fuchsia-300 to-rose-400",
  },
  {
    name: "Mr.Halton Wilmson",
    role: "Cloud Automation Engineer",
    initials: "HW",
    accent: "from-sky-300 to-lime-300",
  },
];

export const testimonials = [
  {
    quote:
      "Garry's Developers' Team turned our AI idea into a production platform faster than our internal roadmap thought possible.",
    name: "Rhea Malhotra",
    title: "COO, NovaGrid",
  },
  {
    quote:
      "The product feels premium, fast, and deeply considered. Their engineering taste is obvious in every interaction.",
    name: "Marcus Lee",
    title: "Founder, SignalForge",
  },
  {
    quote:
      "They gave us the rare combination of cinematic design, practical automation, and clean cloud architecture.",
    name: "Elena Cross",
    title: "VP Product, Aster Labs",
  },
];

export const chatMessages = [
  "I can map your idea into a product roadmap.",
  "Scanning market, workflows, stack, and launch risks...",
  "Recommendation ready: start with an AI workflow MVP and instrument every user action.",
];

export const filters = ["All", "AI", "SaaS", "Apps", "Web"];

export const footerLinks = [
  { label: "LinkedIn", href: "www.linkedin.com/in/gurmansingh07" },
  { label: "GitHub", href: "https://github.com/GurmanSingh7" },
  { label: "X", href: "https://x.com/GurmanSingh101" },
];

export const capabilities = [
  "Agentic AI",
  "Realtime UX",
  "Cloud scale",
  "Design systems",
  "Automation",
  "Data products",
  "Security",
  "Launch strategy",
];

export const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "GSAP",
  "Framer Motion",
  "Lenis",
  "Three.js",
  "Tailwind",
];

export const process = [
  {
    icon: Network,
    title: "Discover",
    copy: "We isolate the highest-value workflow and define the product narrative.",
  },
  {
    icon: Bot,
    title: "Prototype",
    copy: "We build tangible interfaces, AI flows, and technical proof points quickly.",
  },
  {
    icon: Cpu,
    title: "Scale",
    copy: "We harden the system with analytics, infrastructure, security, and iteration loops.",
  },
];