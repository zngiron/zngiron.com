'use client';

import type { ReactElement } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/common/container';
import { Label } from '@/components/common/label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { ABOUT, ABOUT_APPROACH } from '@/data/static/about';

const container = createStaggerContainer();

const INDUSTRIES = ['Fintech', 'Blockchain', 'Gaming', 'E-commerce', 'Marketing'];

export function About(): ReactElement {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative w-full [content-visibility:auto] [contain-intrinsic-size:0_56.25rem]"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <Container>
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full"
          >
            <Label
              number={ABOUT.number}
              title={ABOUT.title}
            />
          </motion.div>

          {/* Top metadata strip */}
          <motion.div
            variants={fadeUpVariants}
            className={cn('col-span-full flex items-center justify-between gap-4 border-b border-border pb-3')}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
              [ {ABOUT.number} ] Abstract
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ※ Cat. ZRG / 002
            </span>
          </motion.div>

          {/* The thesis — Fraunces italic statement */}
          <motion.div
            variants={fadeUpVariants}
            className={cn('col-span-2 flex flex-col gap-4', 'sm:col-span-4', 'lg:col-span-12')}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/thesis</span>
            <p className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-light italic leading-[0.95] tracking-[-0.03em] text-foreground">
              {ABOUT.highlight}.
            </p>
          </motion.div>

          {/* Two-column body */}
          <motion.div
            className={cn(
              'flex flex-col gap-5 border-t border-border pt-6',
              'col-span-2',
              'sm:col-span-4',
              'lg:col-span-6',
            )}
            variants={container}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/body</span>
            {ABOUT.paragraphs.map((paragraph, i) => (
              <motion.div
                key={paragraph}
                variants={fadeUpVariants}
                className="flex gap-3"
              >
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 tabular-nums">
                  ¶ {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-base leading-7 text-foreground first-letter:font-display first-letter:text-2xl first-letter:font-medium first-letter:italic">
                  {paragraph}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Focus areas as numbered manuscript notes */}
          <motion.div
            className={cn(
              'flex flex-col gap-5 border-t border-border pt-6',
              'col-span-2',
              'sm:col-span-4',
              'lg:col-start-8 lg:col-span-5',
            )}
            variants={container}
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/focus</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {ABOUT_APPROACH.length} areas
              </span>
            </div>

            <ol className="flex flex-col">
              {ABOUT_APPROACH.map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUpVariants}
                  className={cn(
                    'group grid grid-cols-[40px_1fr] items-baseline gap-x-4 py-4',
                    i < ABOUT_APPROACH.length - 1 && 'border-b border-dashed border-border',
                  )}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground tabular-nums">
                    .{String(i + 1).padStart(2, '0')}
                  </span>
                  <motion.span
                    className="font-display text-xl font-light leading-snug tracking-tight text-foreground sm:text-2xl"
                    whileHover={shouldReduceMotion ? {} : { x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    {item}
                  </motion.span>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Industry roster */}
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/industries</span>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {INDUSTRIES.map((industry, i) => (
                <span
                  key={industry}
                  className="font-mono text-xs uppercase tracking-wide text-foreground"
                >
                  {industry}
                  {i < INDUSTRIES.length - 1 && <span className="ml-3 text-muted-foreground/40">·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
