export const CONTACT_SECTION = {
  number: '005',
  title: 'Contact',
} as const;

export type ContactIconName = 'mail' | 'github' | 'linkedin' | 'globe';

export interface ContactItem {
  icon: ContactIconName;
  label: string;
  value: string;
  href: string;
}

export const CONTACT_ITEMS: ContactItem[] = [
  { icon: 'mail', label: 'Email', value: 'zngiron@gmail.com', href: 'mailto:zngiron@gmail.com' },
  { icon: 'github', label: 'Github', value: 'github.com/zngiron', href: 'https://github.com/zngiron' },
  { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/zngiron', href: 'https://linkedin.com/in/zngiron' },
  { icon: 'globe', label: 'Website', value: 'zngiron.com', href: 'https://zngiron.com' },
];
