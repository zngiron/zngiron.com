'use client';

import type { ReactElement } from 'react';

import { useEffect, useRef, useState } from 'react';

import { animate, useInView, useReducedMotion } from 'motion/react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ target, suffix = '', className }: AnimatedCounterProps): ReactElement {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion ? target : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    const controls = animate(0, target, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, target, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className={className}
    >
      {display}
      {suffix}
    </span>
  );
}
