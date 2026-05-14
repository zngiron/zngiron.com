export interface SkillCategoryData {
  capabilities: readonly string[];
  technologies: readonly string[];
  titleLines: readonly string[];
}

export const SKILL_CATEGORIES = [
  'Design',
  'Front-End Engineering',
  'AI Tools',
  'Back-End',
  'Cloud & DevOps',
  'Testing',
  'CMS',
  'Collaboration',
] as const;

export type SkillCategoryKey = (typeof SKILL_CATEGORIES)[number];

export const SKILL_TIERS: ReadonlyArray<{
  name: string;
  categories: readonly SkillCategoryKey[];
}> = [
  { name: 'Core Strengths', categories: ['Design', 'Front-End Engineering'] },
  { name: 'AI Tools', categories: ['AI Tools'] },
  {
    name: 'Additional Capabilities',
    categories: ['Back-End', 'Cloud & DevOps', 'Testing', 'CMS', 'Collaboration'],
  },
];

export const SKILLS = {
  number: '003',
  title: 'Skills',
} as const;

export const SKILLS_DATA: Record<SkillCategoryKey, SkillCategoryData> = {
  Design: {
    capabilities: [
      'Design Systems',
      'Cross-Platform Design',
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Interaction Design',
      'Information Architecture',
      'Accessibility (WCAG)',
    ],
    technologies: ['Figma', 'Design Tokens', 'Material Design', 'Human Interface Guidelines', 'Mobbin'],
    titleLines: ['Design'],
  },
  'Front-End Engineering': {
    capabilities: [
      'Component-Based Architecture',
      'State Management',
      'Design System Implementation',
      'Authentication',
      'Internationalization',
      'Animation',
      'Performance Optimization',
      'Responsive Web Design',
      'Build & Tooling',
      'Accessibility (WCAG)',
    ],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Zustand',
      'Redux',
      'TailwindCSS',
      'shadcn/ui',
      'Radix',
      'Storybook',
      'Framer Motion',
      'Supabase Auth',
      'next-intl',
      'Bun',
      'Webpack',
      'Babel',
      'Turborepo',
    ],
    titleLines: ['Front-End', 'Engineering'],
  },
  'AI Tools': {
    capabilities: ['Code Assistants', 'General Reasoning', 'Media Generation'],
    technologies: ['Claude Code', 'Codex', 'Cursor', 'ChatGPT', 'Claude', 'Magnific', 'Eleven Labs'],
    titleLines: ['AI', 'Tools'],
  },
  'Back-End': {
    capabilities: [
      'RESTful API Design',
      'Database Modeling',
      'Authentication & Authorization',
      'Server-Side Rendering',
      'Microservices Architecture',
    ],
    technologies: [
      'Node.js',
      'Express',
      'Hono',
      'PostgreSQL',
      'MongoDB',
      'SQL',
      'Prisma',
      'Supabase',
      'GraphQL',
      'REST APIs',
    ],
    titleLines: ['Back-End'],
  },
  'Cloud & DevOps': {
    capabilities: [
      'CI/CD Pipelines',
      'Container Orchestration',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Cloud Architecture',
    ],
    technologies: ['Vercel', 'AWS', 'GCP', 'Cloudflare', 'Docker', 'GitHub Actions'],
    titleLines: ['Cloud &', 'DevOps'],
  },
  Testing: {
    capabilities: [
      'End-to-End Testing',
      'Unit & Integration Testing',
      'Accessibility Auditing',
      'Performance Profiling',
      'Core Web Vitals',
      'Observability',
    ],
    technologies: ['Playwright', 'Vitest', 'Lighthouse', 'Sentry'],
    titleLines: ['Testing'],
  },
  CMS: {
    capabilities: ['Headless CMS Integration', 'Content Modeling', 'Editorial Workflows', 'Theming'],
    technologies: ['Strapi', 'WordPress', 'WooCommerce'],
    titleLines: ['CMS'],
  },
  Collaboration: {
    capabilities: [
      'Agile & Scrum',
      'Cross-Functional Leadership',
      'Technical Documentation',
      'Code Review Practices',
      'Stakeholder Communication',
    ],
    technologies: ['Jira', 'Confluence', 'Azure DevOps', 'Notion', 'GitHub', 'Microsoft Teams', 'Slack'],
    titleLines: ['Collaboration'],
  },
};
