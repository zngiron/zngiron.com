'use client';

import type { ReactElement } from 'react';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

import { AnimatedCounter } from '@/components/common/animated-counter';
import { gridColumns } from '@/components/common/grid';
import { Button } from '@/components/ui/button';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { HERO, HERO_NAMES, HERO_STATS } from '@/data/static/hero';

const container = createStaggerContainer(0.08);

const SPECIMEN_META = [
  { label: 'Cat. No.', value: 'ZRG / 001' },
  { label: 'Discipline', value: 'Front-End & UX' },
  { label: 'Origin', value: 'Manila, PH' },
  { label: 'Languages', value: 'EN · FIL' },
  { label: 'Year', value: '2009 → ∞' },
];

export function Hero(): ReactElement {
  const imageRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);

  return (
    <section
      id="hero"
      className="relative min-h-dvh w-full"
    >
      <div
        className={cn(
          'relative z-10',
          gridColumns,
          'min-h-dvh content-center pt-20 pb-6',
          'sm:grid-cols-4',
          'lg:content-stretch lg:py-6',
        )}
      >
        {/* Vertical specimen axis — left edge */}
        <div
          className={cn(
            'hidden self-stretch',
            'lg:col-span-1 lg:flex lg:flex-col lg:items-start lg:justify-between lg:pt-2 lg:pb-2',
          )}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Specimen 001</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl] rotate-180">
            Identity / Fig. 1.1 — Portrait
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">ZRG · MNL</span>
        </div>

        {/* Portrait specimen card */}
        <div
          className={cn(
            'flex flex-col gap-3',
            'col-span-2',
            'sm:col-span-4',
            'lg:order-0 lg:col-span-4 lg:min-h-0 lg:self-stretch',
          )}
        >
          <div
            ref={imageRef}
            className={cn(
              'relative overflow-hidden aspect-square bg-foreground',
              'lg:aspect-auto lg:min-h-0 lg:flex-1',
              "before:absolute before:inset-0 before:z-10 before:pointer-events-none before:border before:border-foreground/10 before:content-['']",
            )}
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: shouldReduceMotion ? 0 : imageY }}
            >
              <Image
                src={HERO.image.src}
                alt={HERO.image.alt}
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 100vw, 33vw"
                priority
                fetchPriority="high"
                placeholder="blur"
                blurDataURL={HERO.image.blurDataURL}
              />
            </motion.div>
            <span className="absolute top-3 left-3 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-background mix-blend-difference">
              ◯ Fig. 1.1
            </span>
            <span className="absolute top-3 right-3 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-background mix-blend-difference">
              001 / 007
            </span>
          </div>

          {/* Caliper-style caption */}
          <div className="flex items-center justify-between gap-3 px-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ├──── Portrait ───┤
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">Captured 2025</span>
          </div>
        </div>

        {/* Wordmark + specimen metadata */}
        <motion.div
          className={cn(
            'order-2 flex flex-col gap-8',
            'col-span-2',
            'sm:col-span-4',
            'lg:order-0 lg:col-start-6 lg:col-span-7 lg:justify-between lg:self-stretch',
          )}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Top metadata strip */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center justify-between border-b border-border pb-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
              [ {HERO.number} ] {HERO.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ※ Catalog entry
            </span>
          </motion.div>

          {/* Wordmark */}
          <div className="flex flex-col gap-2">
            <motion.h1
              className="flex flex-col items-start font-display font-light leading-[0.9] tracking-[-0.04em] text-foreground"
              style={{ fontFeatureSettings: '"ss01", "ss02"' }}
            >
              <motion.span
                variants={fadeUpVariants}
                className="text-[clamp(3.5rem,11vw,8rem)]"
              >
                {HERO_NAMES[0]}
              </motion.span>
              <motion.span
                variants={fadeUpVariants}
                className="-mt-2 italic text-[clamp(3.5rem,11vw,8rem)]"
              >
                {HERO_NAMES[1]}
              </motion.span>
              <motion.span
                variants={fadeUpVariants}
                className="-mt-2 text-[clamp(3.5rem,11vw,8rem)]"
              >
                {HERO_NAMES[2]}
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeUpVariants}
              className="pt-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
            >
              {HERO.role}
            </motion.p>
          </div>

          {/* Specimen metadata table */}
          <motion.dl
            variants={fadeUpVariants}
            className="grid grid-cols-2 gap-x-6 gap-y-2 border-t border-border pt-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {SPECIMEN_META.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1"
              >
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{row.label}</dt>
                <dd className="font-mono text-xs uppercase tracking-wide text-foreground">{row.value}</dd>
              </div>
            ))}
          </motion.dl>

          {/* Stats + CTA */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-col gap-6 border-t border-border pt-6"
          >
            <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start gap-1"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="font-display text-3xl font-medium tabular-nums tracking-tight text-foreground sm:text-4xl">
                    {'animatedNumber' in stat ? (
                      <AnimatedCounter
                        target={stat.animatedNumber}
                        suffix={stat.suffix}
                      />
                    ) : (
                      stat.value
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="lg"
                asChild
              >
                <Link href="#work">View Catalog →</Link>
              </Button>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                /scroll · catalog 001–007
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
