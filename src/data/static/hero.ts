export const HERO = {
  number: '001',
  title: 'Identity',
  role: 'Front-End Developer / UX Designer',
  image: {
    src: '/static/zngiron-portrait.png',
    alt: 'Ziedrick Ruen Giron',
    badge: 'Fig. 1.1 — Portrait',
  },
  sidebar: ['UX Designer', 'Front-End Developer'],
} as const;

export const HERO_NAMES = ['Ziedrick', 'Ruen', 'Giron'] as const;

export const HERO_STATS = [
  { label: 'Professional Experience', value: '15+ Years' },
  { label: 'Location', value: 'Philippines' },
] as const;
