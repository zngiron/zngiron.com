'use client';

import type { ReactNode } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

interface TextBlockBlurProps {
  children: ReactNode;
  className?: string;
}

export function TextBlockBlur({ children, className }: TextBlockBlurProps): ReactNode {
  return (
    <div className={cn('flex items-center justify-center p-2', 'bg-foreground/80 backdrop-blur-xl', className)}>
      {children}
    </div>
  );
}

interface BlockInvertProps {
  children: ReactNode;
  className?: string;
}

export function BlockInvert({ children, className }: BlockInvertProps): ReactNode {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden',
        'cursor-default select-none',
        'bg-foreground/80 backdrop-blur-xl',
        className,
      )}
      whileHover="hovered"
      initial="idle"
    >
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        variants={
          shouldReduceMotion
            ? { idle: { opacity: 0 }, hovered: { opacity: 1 } }
            : { idle: { x: '-100%' }, hovered: { x: '0%' } }
        }
        transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 30 }}
      />
      <span className={cn('relative block p-2', 'font-semibold leading-none text-white mix-blend-difference')}>
        {children}
      </span>
    </motion.div>
  );
}
