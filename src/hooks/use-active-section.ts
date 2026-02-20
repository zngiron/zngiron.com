'use client';

import { useEffect, useState } from 'react';

const SECTION_IDS = ['hero', 'about', 'skills', 'work', 'contact'] as const;

export function useActiveSection(): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const visibleSections = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        const sorted = SECTION_IDS.filter((id) => visibleSections.has(id));
        if (sorted.length > 0) {
          setActiveSection(sorted[0]);
        }
      },
      { rootMargin: '-20% 0px -60% 0px' },
    );

    const handleScroll = (): void => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (atBottom) {
        setActiveSection('contact');
      }
    };

    for (const el of elements) {
      observer.observe(el);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return activeSection;
}
