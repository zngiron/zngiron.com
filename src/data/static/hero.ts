export const HERO = {
  number: '001',
  title: 'Identity',
  role: 'Front-End Developer / UX Designer',
  image: {
    src: '/static/zngiron-portrait.png',
    alt: 'Ziedrick Ruen Giron',
    badge: 'Fig. 1.1 — Portrait',
    blurDataURL:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAL0lEQVR4nGNgYGBg+P//PwMDAwMDA8P///8ZGBj+//8PZID4DAwM////Z2BgAAAA//8DABvCCHEhCw3rAAAAAElFTkSuQmCC',
  },
  sidebar: ['UX Designer', 'Front-End Developer'],
} as const;

export const HERO_NAMES = ['Ziedrick', 'Ruen', 'Giron'] as const;

export const HERO_STATS = [
  { label: 'Professional Experience', value: '15+ Years', animatedNumber: 15, suffix: '+ Years' },
  { label: 'Location', value: 'Philippines' },
] as const;
