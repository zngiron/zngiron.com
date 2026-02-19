'use client';

import type { ReactElement } from 'react';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

import { Divider } from '@/components/common/divider';
import { SectionLabel } from '@/components/common/section-label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

import { HERO_NAME_PARTS, HERO_SECTION, HERO_STATS } from '@/data/static/hero';

interface NameBlockInvertProps {
  children: string;
  shouldReduceMotion: boolean | null;
}

function NameBlockInvert({ children, shouldReduceMotion }: NameBlockInvertProps) {
  return (
    <motion.div
      className="relative overflow-hidden cursor-default select-none bg-foreground/80 backdrop-blur-xl"
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

      <span className="relative block mix-blend-difference font-semibold leading-none text-white p-2 text-[clamp(3rem,8vw,6rem)]">
        {children}
      </span>
    </motion.div>
  );
}

export function Hero(): ReactElement {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer(0.08);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 120]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-dvh w-full overflow-hidden"
    >
      <div
        className={cn(
          'relative z-10',
          'grid min-h-dvh gap-6 px-6 pt-20 pb-6',
          'grid-cols-2 content-center',
          'sm:grid-cols-4',
          'lg:grid-cols-12 lg:content-stretch lg:py-6',
        )}
      >
        {/* Portrait */}
        <div
          className={cn(
            'col-span-2 flex flex-col gap-2',
            'sm:col-span-4',
            'lg:order-none lg:col-span-5 lg:self-stretch lg:min-h-0',
          )}
        >
          <motion.div
            className="relative aspect-square overflow-hidden bg-foreground lg:aspect-auto lg:flex-1 lg:min-h-0"
            style={{ y: imageY }}
          >
            <Image
              src={HERO_SECTION.image.src}
              alt={HERO_SECTION.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </motion.div>
          <Badge
            variant="secondary"
            className="rounded-none self-start"
          >
            {HERO_SECTION.image.badge}
          </Badge>
        </div>

        {/* Content */}
        <motion.div
          className={cn(
            'order-2 col-span-2 flex flex-col gap-4 justify-center',
            'sm:col-span-4',
            'lg:order-none lg:col-start-7 lg:col-span-4 lg:gap-6',
          )}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel
              number={HERO_SECTION.number}
              title={HERO_SECTION.title}
            />
          </motion.div>

          <div className="flex flex-col items-start pb-4">
            {HERO_NAME_PARTS.map((name) => (
              <motion.div
                key={name}
                variants={fadeUpVariants}
                className="-mb-4"
              >
                <NameBlockInvert shouldReduceMotion={shouldReduceMotion}>{name}</NameBlockInvert>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="text-sm font-medium text-foreground sm:text-base"
          >
            {HERO_SECTION.role}
          </motion.p>

          <motion.div variants={fadeUpVariants}>
            <Divider />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="flex gap-6 items-start w-full"
          >
            {HERO_STATS.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-1 flex-col items-start"
              >
                <p className="text-xs font-normal text-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground sm:text-base">{value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <Button
              size="lg"
              asChild
            >
              <Link href="#work">View Work</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Rotated sidebar text — bottom-right */}
        <motion.div
          className={cn('hidden', 'lg:flex lg:col-start-12 lg:col-span-1 lg:items-end lg:justify-end lg:self-stretch')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-end gap-0 pb-6">
            <div className="flex items-center justify-center">
              <p className="[writing-mode:vertical-rl] text-3xl font-medium text-foreground whitespace-nowrap xl:text-4xl">
                {HERO_SECTION.sidebar[0]}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="[writing-mode:vertical-rl] text-3xl font-medium text-foreground whitespace-nowrap xl:text-4xl">
                {HERO_SECTION.sidebar[1]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
