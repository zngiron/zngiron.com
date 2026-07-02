"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Restrained scroll reveal: fade + 8px rise, once, as the block enters the
// viewport. Motion aids comprehension only — no choreography. Reduced motion
// drops the rise (opacity-only) per DESIGN.md.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.2 : 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
