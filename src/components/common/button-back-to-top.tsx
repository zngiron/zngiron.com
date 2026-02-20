'use client';

import type { ReactElement } from 'react';

import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react';

import { cn } from '@/lib/utils';

export function ButtonBackToTop(): ReactElement {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (): void => {
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? 'instant' : 'smooth' });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-6 bottom-6 z-40"
        style={{ opacity: scrollYProgress }}
      >
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleClick}
          className={cn(
            'flex size-10 items-center justify-center',
            'bg-foreground text-background',
            'cursor-pointer',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 30 }}
        >
          <ArrowUp
            className="size-4"
            aria-hidden="true"
          />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
