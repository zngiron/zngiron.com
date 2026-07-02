// Identity, about, skills, education, contact — transcribed from Obsidian
// `Portfolio/01 - Identity`, `02 - About`, `03 - Skills`, `06 - Education`,
// `07 - Contact`.

export const identity = {
  name: "Ziedrick Ruen Giron",
  nickname: "Zuen",
  title: "Senior Front-End Developer | Senior UX Designer",
  experienceYears: 17,
  location: "Manila, Philippines",
  coordinates: "14°35′N 120°59′E",
  languages: ["English", "Filipino"],
} as const;

// 003_about editorial statement. The lead lands the thesis; the rest carries
// the detail in mute — mockup `home-full.html` pattern.
export const about = {
  lead: "End-to-end design and engineering.",
  body: "17 years building digital products across fintech, blockchain, gaming, e-commerce, and media — owning the full path from design system to shipped code. Fewer handoffs, fewer surprises, faster iteration.",
  focus:
    "The focus: design systems, reusable component libraries, and accessible interfaces — the foundational layer that lets teams scale output without losing quality.",
} as const;

export type Capability = {
  label: string;
  tools: string;
};

// Condensed capability strip — full matrix stays on the CV (design doc §6:
// "Skills → condensed strip in About"). Curated to what recruiters slot on.
export const designCapabilities: Capability[] = [
  { label: "Design Systems", tools: "Figma · Design Tokens" },
  { label: "UX & Interaction Design", tools: "Figma · Mobbin" },
  { label: "Wireframing & Prototyping", tools: "Figma" },
  { label: "Cross-Platform Design", tools: "Material · HIG" },
  { label: "Accessibility", tools: "WCAG" },
];

export const engineeringCapabilities: Capability[] = [
  { label: "Component Architecture", tools: "React · Next.js · TypeScript" },
  {
    label: "Design System Implementation",
    tools: "Tailwind · Radix · Storybook",
  },
  { label: "State & Data", tools: "TanStack Query · Zustand" },
  { label: "Motion & Animation", tools: "Framer Motion" },
  { label: "Performance", tools: "Core Web Vitals · Lighthouse" },
];

export const education = [
  {
    school: "Phoenix One Knowledge Institute",
    program: "New Media Design, Multimedia Arts",
    period: "2009 – 2011",
  },
  {
    school: "College of the Holy Spirit Manila",
    program: "BFA Advertising",
    period: "2007 – 2009",
  },
  {
    school: "First Academy of Computer Arts",
    program: "Web Design and Development",
    period: "2006 – 2007",
  },
] as const;

export const contact = {
  email: "zngiron@gmail.com",
  github: "https://github.com/zngiron",
  linkedin: "https://linkedin.com/in/zngiron",
  website: "https://zngiron.com",
} as const;
