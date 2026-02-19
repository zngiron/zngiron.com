import type { Variants } from 'motion/react';

export function createStaggerContainer(stagger = 0.06) {
  return {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: stagger } },
  } satisfies Variants;
}

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 25 } },
} satisfies Variants;
