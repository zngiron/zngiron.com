'use client';

import type { ReactElement } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion, useReducedMotion } from 'motion/react';

import { BlockInvert } from '@/components/common/blur';
import { Divider } from '@/components/common/divider';
import { gridColumns } from '@/components/common/grid';
import { Label } from '@/components/common/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { HERO, HERO_NAMES, HERO_STATS } from '@/data/static/hero';

export function Hero(): ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer(0.08);

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
        <div
          className={cn(
            'flex flex-col gap-2',
            'col-span-2',
            'sm:col-span-4',
            'lg:order-0 lg:col-span-5 lg:min-h-0 lg:self-stretch',
          )}
        >
          <div className="relative overflow-hidden aspect-square bg-foreground lg:aspect-auto lg:min-h-0 lg:flex-1">
            <Image
              src={HERO.image.src}
              alt={HERO.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
              priority
            />
          </div>
          <Badge
            variant="secondary"
            className="self-start rounded-none"
          >
            {HERO.image.badge}
          </Badge>
        </div>

        <motion.div
          className={cn(
            'order-2 flex flex-col justify-center gap-4',
            'col-span-2',
            'sm:col-span-4',
            'lg:order-0 lg:col-start-7 lg:col-span-4 lg:gap-6',
          )}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeUpVariants}>
            <Label
              number={HERO.number}
              title={HERO.title}
            />
          </motion.div>

          <div className="flex flex-col items-start pb-4">
            {HERO_NAMES.map((name) => (
              <motion.div
                key={name}
                variants={fadeUpVariants}
                className="-mb-4"
              >
                <BlockInvert>
                  <span className="text-[clamp(3rem,8vw,6rem)]">{name}</span>
                </BlockInvert>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="text-sm font-medium text-foreground sm:text-base"
          >
            {HERO.role}
          </motion.p>

          <motion.div variants={fadeUpVariants}>
            <Divider />
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            className="flex w-full items-start gap-6"
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

        <motion.div
          className={cn('hidden', 'lg:col-start-12 lg:col-span-1 lg:flex lg:items-end lg:justify-end lg:self-stretch')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={shouldReduceMotion ? { duration: 0.15 } : { delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-end gap-0 pb-6">
            <div className="flex items-center justify-center">
              <p className="text-3xl font-medium text-foreground [writing-mode:vertical-rl] whitespace-nowrap xl:text-4xl">
                {HERO.sidebar[0]}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-3xl font-medium text-foreground [writing-mode:vertical-rl] whitespace-nowrap xl:text-4xl">
                {HERO.sidebar[1]}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
