export interface SkillCategoryData {
  capabilities: readonly string[];
  technologies: readonly string[];
  titleLines: readonly string[];
}

export const SKILL_CATEGORIES = [
  'Front-End Development',
  'UX Design',
  'Backend Development',
  'Cloud and DevOps',
  'Testing and Performance',
  'Collaboration and Planning',
] as const;

export type SkillCategoryKey = (typeof SKILL_CATEGORIES)[number];

export const SKILLS_SECTION = {
  number: '003',
  title: 'Skills',
} as const;

export const SKILLS_DATA: Record<SkillCategoryKey, SkillCategoryData> = {
  'Front-End Development': {
    capabilities: [
      'Component-Based Architecture',
      'State Management',
      'Performance Optimization',
      'Accessibility (WCAG)',
      'Design System Implementation',
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
      'Storybook',
      'Framer Motion',
      'Capacitor.js',
    ],
    titleLines: ['Front-End', 'Development'],
  },
  'UX Design': {
    capabilities: [
      'User Research & Testing',
      'Wireframing & Prototyping',
      'Interaction Design',
      'Design Systems',
      'Information Architecture',
    ],
    technologies: ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Sketch', 'InVision', 'Zeplin', 'Miro'],
    titleLines: ['UX', 'Design'],
  },
  'Backend Development': {
    capabilities: [
      'RESTful API Design',
      'Database Modeling',
      'Authentication & Authorization',
      'Server-Side Rendering',
      'Microservices Architecture',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Prisma', 'GraphQL', 'Redis', 'Firebase'],
    titleLines: ['Backend', 'Development'],
  },
  'Cloud and DevOps': {
    capabilities: [
      'CI/CD Pipelines',
      'Container Orchestration',
      'Infrastructure as Code',
      'Monitoring & Logging',
      'Cloud Architecture',
    ],
    technologies: ['AWS', 'Google Cloud', 'Vercel', 'Docker', 'GitHub Actions', 'Terraform', 'Cloudflare', 'Netlify'],
    titleLines: ['Cloud and', 'DevOps'],
  },
  'Testing and Performance': {
    capabilities: [
      'End-to-End Testing',
      'Unit & Integration Testing',
      'Accessibility Auditing',
      'Performance Profiling',
      'Core Web Vitals',
    ],
    technologies: ['Playwright', 'Jest', 'Vitest', 'Testing Library', 'Lighthouse', 'Axe', 'Sentry', 'Chrome DevTools'],
    titleLines: ['Testing and', 'Performance'],
  },
  'Collaboration and Planning': {
    capabilities: [
      'Agile & Scrum',
      'Cross-Functional Leadership',
      'Technical Documentation',
      'Code Review Practices',
      'Stakeholder Communication',
    ],
    technologies: ['Jira', 'Confluence', 'Notion', 'Linear', 'GitHub', 'Slack', 'Loom'],
    titleLines: ['Collaboration', 'and Planning'],
  },
} as const;
