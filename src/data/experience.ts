// Employer history, transcribed from Obsidian `Portfolio/04 - Work`.
// Employer-level record only — the project list lives in ./projects.ts.
// Order: newest first (recruiters read top-down).

export type Employer = {
  company: string;
  /** Role progression, earliest → latest. Single-entry when no progression. */
  roles: string[];
  industry: string;
  period: string;
  location: string;
  mode: string;
  workType: string;
  current?: boolean;
};

export const employers: Employer[] = [
  {
    company: "Cuida Group",
    roles: ["Founder"],
    industry: "Media",
    period: "2025 — Present",
    location: "Manila, PH",
    mode: "Remote",
    workType: "Self-employed",
    current: true,
  },
  {
    company: "Beyond Now",
    roles: ["Software Developer"],
    industry: "Software",
    period: "2025 — 2026",
    location: "Graz, AT",
    mode: "Remote",
    workType: "Full-time",
  },
  {
    company: "Lakefront Finance",
    roles: ["UX Developer"],
    industry: "Fintech",
    period: "2023 — 2025",
    location: "Redmond, US",
    mode: "Remote",
    workType: "Full-time",
  },
  {
    company: "Lightning Sharks",
    roles: ["UX Lead"],
    industry: "Blockchain",
    period: "2020 — 2023",
    location: "Makati, PH",
    mode: "Hybrid",
    workType: "Full-time",
  },
  {
    company: "LenddoEFL",
    roles: ["UX Designer"],
    industry: "Fintech",
    period: "2019 — 2020",
    location: "Makati, PH",
    mode: "On-site",
    workType: "Full-time",
  },
  {
    company: "Rebus Technologies",
    roles: ["UX Specialist", "Senior UX Engineer", "UX Consultant"],
    industry: "Gaming",
    period: "2016 — 2019",
    location: "Makati, PH",
    mode: "On-site",
    workType: "Full-time",
  },
  {
    company: "Audy Global Enterprises",
    roles: ["UX Developer", "UX Lead"],
    industry: "E-commerce",
    period: "2015 — 2016",
    location: "Pasig, PH",
    mode: "On-site",
    workType: "Full-time",
  },
  {
    company: "Amplify Experience Agency",
    roles: ["Graphic Designer", "Art Director"],
    industry: "Advertising",
    period: "2015 — 2019",
    location: "Pasig, PH",
    mode: "Hybrid",
    workType: "Retainer",
  },
  {
    company: "Excite",
    roles: ["Graphic Designer", "Art Director"],
    industry: "Advertising",
    period: "2012 — 2015",
    location: "Quezon City, PH",
    mode: "On-site",
    workType: "Full-time",
  },
  {
    company: "MMTI Marketing Philippines",
    roles: ["Pre-Production Specialist"],
    industry: "Marketing",
    period: "2011",
    location: "Pasig, PH",
    mode: "On-site",
    workType: "Full-time",
  },
  {
    company: "BreadTalk Philippines",
    roles: ["Art Director", "Web Designer & Developer"],
    industry: "Food & Beverage",
    period: "2009 — 2013",
    location: "Taguig, PH",
    mode: "Hybrid",
    workType: "Retainer",
  },
];
