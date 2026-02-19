export interface ProjectEntry {
  name: string;
  details: string;
  tags: string[];
  link?: string;
}

export interface WorkEntry {
  id: string;
  number: string;
  client: string;
  industry: string;
  role: string;
  year: string;
  projects: ProjectEntry[];
}

export const PORTFOLIO_SECTION = {
  number: '004',
  title: 'Work',
  badge: 'Fig 4.1 — Portfolio',
} as const;

export const PORTFOLIO_DATA: WorkEntry[] = [
  {
    id: 'freelance',
    number: '01',
    client: 'Freelance',
    industry: 'Web Development',
    role: 'UX Designer / Front-End Developer',
    year: '2009 - Present',
    projects: [
      { name: 'Inday Trending', details: 'Story Website', tags: ['Next.js', 'TailwindCSS', 'GraphQL'] },
      { name: 'Designee', details: 'Design Agency', tags: ['Next.js', 'TailwindCSS', 'Vercel'] },
    ],
  },
  {
    id: 'lakefront',
    number: '02',
    client: 'Lakefront Finance',
    industry: 'Fintech',
    role: 'UX Developer',
    year: '2023 - 2025',
    projects: [
      { name: 'DeFiCurrent', details: 'Crypto Wallet Interface', tags: ['Next.js', 'React', 'Crypto'] },
      {
        name: 'Lakefront Finance App',
        details: 'Financial Platform',
        tags: ['Next.js', 'REST APIs'],
        link: 'https://app.lakefront.finance',
      },
      {
        name: 'Lakefront Finance Website',
        details: 'Corporate Website',
        tags: ['Next.js', 'Strapi'],
        link: 'https://lakefront.finance',
      },
    ],
  },
  {
    id: 'lightning',
    number: '03',
    client: 'Lightning Sharks',
    industry: 'Blockchain',
    role: 'UX Team Lead',
    year: '2020 - 2023',
    projects: [
      { name: 'Ayre Group', details: 'Media Platform', tags: ['Next.js', 'WordPress'] },
      { name: 'CoinGeek', details: 'Blockchain News', tags: ['Next.js', 'Custom CMS'], link: 'https://coingeek.com' },
      {
        name: 'CoinGeek Conference',
        details: 'Conference Website',
        tags: ['Next.js', 'Bitcoin SV'],
        link: 'https://coingeekconference.com',
      },
      { name: 'BitcoinSV', details: 'Blockchain Platform', tags: ['API Integration'] },
    ],
  },
  {
    id: 'lendoefl',
    number: '04',
    client: 'LendoEFL',
    industry: 'Fintech',
    role: 'UX Designer',
    year: '2019 - 2020',
    projects: [{ name: 'Lenddo App', details: 'Credit Scoring UX', tags: ['Figma', 'UX Design', 'Prototyping'] }],
  },
  {
    id: 'rebus',
    number: '05',
    client: 'Rebus Technologies',
    industry: 'Online Gaming',
    role: 'UX Designer / Front-End Developer',
    year: '2016 - 2019',
    projects: [
      {
        name: 'OneLotto',
        details: 'Gaming Platform SPA',
        tags: ['React', 'Laravel', 'Redux'],
        link: 'https://onelotto.com',
      },
      { name: 'Webet88', details: 'Betting Platform', tags: ['React', 'SPA', 'REST APIs'] },
    ],
  },
  {
    id: 'audy',
    number: '06',
    client: 'Audy Global Enterprises',
    industry: 'E-commerce',
    role: 'UX Designer / WordPress Developer',
    year: '2015 - 2016',
    projects: [
      {
        name: 'GoVision',
        details: 'E-commerce Solution',
        tags: ['WordPress', 'WooCommerce'],
        link: 'https://govisionusa.com',
      },
      { name: 'QuadTrek', details: 'E-commerce Platform', tags: ['WordPress', 'WooCommerce'] },
      { name: 'OrganizeMe', details: 'Organization Tools', tags: ['WordPress', 'PHP'] },
      { name: 'Fleadom', details: 'Marketplace Platform', tags: ['WordPress', 'E-Commerce'] },
      { name: 'Simply Natural', details: 'Natural Products', tags: ['WordPress', 'Custom Themes'] },
    ],
  },
  {
    id: 'excite',
    number: '07',
    client: 'Excite',
    industry: 'Marketing and Events',
    role: 'Graphic Designer / Art Director',
    year: '2013 - 2015',
    projects: [
      { name: 'Excite Events', details: 'Event Branding', tags: ['Photoshop', 'Illustrator', 'Print Design'] },
    ],
  },
  {
    id: 'breadtalk',
    number: '08',
    client: 'BreadTalk Philippines',
    industry: 'Food and Beverage',
    role: 'Art Director / Web Developer',
    year: '2009 - 2013',
    projects: [
      {
        name: 'BreadTalk Website',
        details: 'Corporate Website',
        tags: ['Web Design', 'HTML/CSS', 'JavaScript'],
        link: 'https://breadtalk.com.ph',
      },
    ],
  },
];
