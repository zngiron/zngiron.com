// Canonical project index, transcribed from Obsidian `Portfolio/05 - Projects`
// (source of truth for content; this module is the build source so CI never
// depends on a local vault). Order matches the note — grouped by client,
// newest engagement first — and the 1-based position doubles as the spec
// index (`05.NN`) used across 002_work and 005_projects.

export type Project = {
  client: string;
  brand: string;
  subBrand?: string;
  project: string;
  industry: string;
  type:
    | "Website"
    | "Web App"
    | "Mobile"
    | "Microsite"
    | "Brand"
    | "Campaign"
    | "Pitch"
    | "Event"
    | "App";
  tags?: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    client: "Beyond Now",
    brand: "Beyond Now",
    project: "Confidential SaaS",
    industry: "Software",
    type: "Web App",
  },
  {
    client: "Cuida Group",
    brand: "Ziedrick Giron",
    project: "Portfolio",
    industry: "Software",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://zngiron.com",
  },
  {
    client: "Cuida Group",
    brand: "Scott Moore",
    project: "Portfolio",
    industry: "Finance",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://scottmoore.co",
  },
  {
    client: "Cuida Group",
    brand: "Designee",
    project: "Portfolio",
    industry: "Advertising",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://designee.com",
  },
  {
    client: "Cuida Group",
    brand: "Artelyara",
    project: "Platform",
    industry: "Art",
    type: "Web App",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://artelayara.com",
  },
  {
    client: "Cuida Group",
    brand: "Inday Trending",
    project: "Blog",
    industry: "Media",
    type: "Website",
    tags: ["Next.js", "TailwindCSS", "GraphQL", "WordPress"],
    url: "https://indaytrending.com",
  },
  {
    client: "Cuida Group",
    brand: "The Healthy Hack",
    project: "Blog",
    industry: "Health & Wellness",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://thehealthyhack.com",
  },
  {
    client: "Cuida Group",
    brand: "Inspire Pinas",
    project: "Blog",
    industry: "Media",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://inspirepinas.com",
  },
  {
    client: "Lakefront Finance",
    brand: "DeFiCurrent",
    project: "SaaS",
    industry: "Blockchain",
    type: "Web App",
    tags: ["Next.js", "React"],
    url: "https://deficurrent.com",
  },
  {
    client: "Lakefront Finance",
    brand: "Lakefront Finance",
    project: "SaaS",
    industry: "Fintech",
    type: "Web App",
    tags: ["Next.js", "React Query", "Zustand", "shadcn/ui", "Plaid"],
    url: "https://app.lakefront.finance",
  },
  {
    client: "Lakefront Finance",
    brand: "Lakefront Finance",
    project: "Corporate Site",
    industry: "Fintech",
    type: "Website",
    tags: ["Next.js", "Strapi"],
    url: "https://lakefront.finance",
  },
  {
    client: "Lightning Sharks",
    brand: "BitcoinSV",
    project: "Corporate Site",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://bitcoinsv.com",
  },
  {
    client: "Lightning Sharks",
    brand: "BSV Blockchain",
    project: "Corporate Site",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://bsvblockchain.org",
  },
  {
    client: "Lightning Sharks",
    brand: "BSV Academy",
    project: "Platform",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js"],
    url: "https://academy.bsvblockchain.org",
  },
  {
    client: "Lightning Sharks",
    brand: "Global Blockchain Convention",
    project: "Corporate Site",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://globalblockchainconvention.com",
  },
  {
    client: "Lightning Sharks",
    brand: "CoinGeek",
    project: "Corporate Site",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js", "Custom CMS"],
    url: "https://coingeek.com",
  },
  {
    client: "Lightning Sharks",
    brand: "CoinGeek",
    project: "Conference Site",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://coingeekconference.com",
  },
  {
    client: "Lightning Sharks",
    brand: "London Blockchain Conference",
    project: "Corporate Site",
    industry: "Blockchain",
    type: "Website",
    tags: ["Next.js", "TailwindCSS"],
    url: "https://londonblockchainconference.com",
  },
  {
    client: "Lightning Sharks",
    brand: "Ayre Group",
    project: "Corporate Site",
    industry: "Media",
    type: "Website",
    tags: ["Next.js", "WordPress"],
    url: "https://ayre.group",
  },
  {
    client: "Lightning Sharks",
    brand: "Canada Place",
    project: "Corporate Site",
    industry: "Gaming",
    type: "Website",
    url: "https://canadaplace.ag",
  },
  {
    client: "LenddoEFL",
    brand: "LenddoEFL",
    project: "Platform",
    industry: "Fintech",
    type: "Website",
    url: "https://lenddoefl.com",
  },
  {
    client: "Rebus Technologies",
    brand: "OneLotto",
    project: "Gaming Platform",
    industry: "Gaming",
    type: "Website",
    tags: ["React", "Redux", "Laravel"],
    url: "https://onelotto.com",
  },
  {
    client: "Rebus Technologies",
    brand: "WeBet",
    project: "Gaming Platform",
    industry: "Gaming",
    type: "Website",
    tags: ["React", "REST APIs"],
    url: "https://webet88.com",
  },
  {
    client: "Audy Global Enterprises",
    brand: "Fleadom",
    project: "E-commerce",
    industry: "E-commerce",
    type: "Website",
    tags: ["WordPress", "PHP"],
  },
  {
    client: "Audy Global Enterprises",
    brand: "GoVision",
    project: "E-commerce",
    industry: "E-commerce",
    type: "Website",
    tags: ["WordPress", "WooCommerce", "PHP"],
    url: "https://govisionusa.com",
  },
  {
    client: "Audy Global Enterprises",
    brand: "OrganizeMe",
    project: "E-commerce",
    industry: "E-commerce",
    type: "Website",
    tags: ["WordPress", "PHP"],
  },
  {
    client: "Audy Global Enterprises",
    brand: "QuadTrek",
    project: "E-commerce",
    industry: "E-commerce",
    type: "Website",
    tags: ["WordPress", "WooCommerce"],
  },
  {
    client: "Audy Global Enterprises",
    brand: "Simply Natural",
    project: "E-commerce",
    industry: "E-commerce",
    type: "Website",
    tags: ["WordPress"],
  },
  {
    client: "Amplify Experience Agency",
    brand: "Amplify",
    project: "Brand Identity",
    industry: "Advertising",
    type: "Brand",
  },
  {
    client: "Amplify Experience Agency",
    brand: "Amplify",
    project: "Corporate Site",
    industry: "Advertising",
    type: "Website",
    url: "https://ampup.com.ph",
  },
  {
    client: "Amplify Experience Agency",
    brand: "Master Halco",
    project: "Corporate Site",
    industry: "Construction",
    type: "Website",
  },
  {
    client: "Amplify Experience Agency",
    brand: "Nestlé",
    subBrand: "Nestogen",
    project: "Nestogen Lying In Finder",
    industry: "Nutrition",
    type: "App",
  },
  {
    client: "Amplify Experience Agency",
    brand: "Bayer",
    subBrand: "Berocca",
    project: "Berocca",
    industry: "Pharmaceutical",
    type: "Pitch",
  },
  {
    client: "Amplify Experience Agency",
    brand: "Bayer",
    project: "National Conference 2016",
    industry: "Pharmaceutical",
    type: "Pitch",
  },
  {
    client: "Amplify Experience Agency",
    brand: "Globe",
    project: "Globe Exploration",
    industry: "Telecom",
    type: "Campaign",
  },
  {
    client: "Excite",
    brand: "Excite",
    subBrand: "Agency",
    project: "Corporate Site",
    industry: "Advertising",
    type: "Website",
    tags: ["HTML/CSS"],
  },
  {
    client: "Excite",
    brand: "Nestlé",
    subBrand: "NAN",
    project: "Mobile App",
    industry: "Nutrition",
    type: "Mobile",
  },
  {
    client: "Excite",
    brand: "Excite",
    subBrand: "Advertising",
    project: "Event Branding",
    industry: "Advertising",
    type: "Event",
  },
  {
    client: "Excite",
    brand: "Freshgear",
    project: "Brand Identity",
    industry: "Fashion",
    type: "Brand",
  },
  {
    client: "Excite",
    brand: "Unilab",
    project: "Campaign",
    industry: "Pharmaceutical",
    type: "Campaign",
  },
  {
    client: "Excite",
    brand: "Smart",
    project: "Campaign",
    industry: "Telecom",
    type: "Campaign",
  },
  {
    client: "Excite",
    brand: "Talk N' Text",
    project: "Campaign",
    industry: "Telecom",
    type: "Campaign",
  },
  {
    client: "BreadTalk Philippines",
    brand: "BreadTalk",
    project: "Corporate Site",
    industry: "Food & Beverage",
    type: "Website",
    tags: ["PHP", "HTML", "CSS", "JavaScript"],
    url: "https://breadtalk.com.ph",
  },
  {
    client: "BreadTalk Philippines",
    brand: "BreadTalk",
    subBrand: "Sanrio",
    project: "BreadTalk x Sanrio",
    industry: "Food & Beverage",
    type: "Microsite",
    url: "https://breadtalk.com.ph/sanrio",
  },
  {
    client: "Freelance",
    brand: "Standout Motors",
    project: "Brand Identity",
    industry: "Automotive",
    type: "Brand",
    url: "https://standoutmotors.com",
  },
  {
    client: "Freelance",
    brand: "Fiona Jewelry",
    project: "Corporate Site",
    industry: "Fashion",
    type: "Website",
    url: "https://fionajewelry.com",
  },
  {
    client: "Freelance",
    brand: "Vintage Avenue Manila",
    project: "E-commerce",
    industry: "Fashion",
    type: "Website",
  },
  {
    client: "Freelance",
    brand: "Lugang Cafe",
    project: "Corporate Site",
    industry: "Food & Beverage",
    type: "Website",
    url: "https://lugangcafe.com",
  },
  {
    client: "Freelance",
    brand: "Xiu",
    project: "Corporate Site",
    industry: "Food & Beverage",
    type: "Website",
    url: "https://xiu.com.ph",
  },
  {
    client: "Freelance",
    brand: "Holiday Palace",
    project: "Corporate Site",
    industry: "Gaming",
    type: "Website",
  },
  {
    client: "Freelance",
    brand: "Odds Pub",
    project: "Microsite",
    industry: "Gaming",
    type: "Website",
  },
  {
    client: "Freelance",
    brand: "DoctR",
    project: "Mobile App",
    industry: "Healthcare",
    type: "Mobile",
  },
  {
    client: "Freelance",
    brand: "PhilCare",
    subBrand: "Portal",
    project: "Member Portal",
    industry: "Healthcare",
    type: "Web App",
    url: "https://philcare.com.ph",
  },
  {
    client: "Freelance",
    brand: "PhilCare",
    subBrand: "Go! Mobile",
    project: "Mobile App",
    industry: "Healthcare",
    type: "Mobile",
  },
  {
    client: "Freelance",
    brand: "Calata Foundation",
    project: "Corporate Site",
    industry: "Non-profit",
    type: "Website",
  },
  {
    client: "Freelance",
    brand: "VirtualStaff.ph",
    project: "Corporate Site",
    industry: "Staffing",
    type: "Website",
    url: "https://virtualstaff.ph",
  },
];

// Spec index for a project: 1-based position in the canonical list, zero-padded
// ("09"), shown as `05.09` — section 005 × row. Derived, never hand-numbered.
export function projectIndex(project: Project): string {
  return String(projects.indexOf(project) + 1).padStart(2, "0");
}

export type FeaturedProject = {
  project: Project;
  image: string;
  /** One-line proof: what it is + what carried the work. */
  note: string;
};

// 002_work curation — six projects chosen for brand recognition, industry
// range (fintech, blockchain, healthcare, media), and product depth (two full
// web apps, not just marketing sites). Placeholder shots live in /public/work
// until real captures replace them.
function find(brand: string, project: string): Project {
  const match = projects.find(
    (p) => p.brand === brand && p.project === project,
  );
  if (!match) throw new Error(`Featured project missing: ${brand} ${project}`);
  return match;
}

export const featuredProjects: FeaturedProject[] = [
  {
    project: find("Lakefront Finance", "SaaS"),
    image: "/work/lakefront.png",
    note: "Personal-finance SaaS — budgeting, Plaid-linked accounts, design system to shipped React.",
  },
  {
    project: find("CoinGeek", "Corporate Site"),
    image: "/work/coingeek.png",
    note: "High-traffic blockchain media platform on a custom CMS — news, video, events.",
  },
  {
    project: find("BSV Blockchain", "Corporate Site"),
    image: "/work/bsv.png",
    note: "Corporate site for a global blockchain association — docs, ecosystem, multi-language.",
  },
  {
    project: find("PhilCare", "Member Portal"),
    image: "/work/philcare.png",
    note: "HMO member portal — plans, claims, and clinic finder for a national health insurer.",
  },
  {
    project: find("Inday Trending", "Blog"),
    image: "/work/indaytrending.png",
    note: "Cuida-owned media brand — headless WordPress front end built for speed and scale.",
  },
  {
    project: find("DeFiCurrent", "SaaS"),
    image: "/work/deficurrent.png",
    note: "DeFi analytics SaaS — real-time dashboards over on-chain data.",
  },
];
