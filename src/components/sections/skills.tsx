'use client';

import type { ReactElement } from 'react';
import type { SkillCategoryKey } from '@/data/static/skills';

import { useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/common/container';
import { Label } from '@/components/common/label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { SKILL_TIERS, SKILLS, SKILLS_DATA } from '@/data/static/skills';

const container = createStaggerContainer(0.04);

function CoreShelf({
  tierIndex,
  categories,
  activeCategory,
  setActiveCategory,
}: {
  tierIndex: string;
  categories: readonly SkillCategoryKey[];
  activeCategory: SkillCategoryKey;
  setActiveCategory: (key: SkillCategoryKey) => void;
}): ReactElement {
  const data = SKILLS_DATA[activeCategory];
  const showActiveData = categories.includes(activeCategory);

  return (
    <div className="flex flex-col gap-6 border-t border-border pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{tierIndex}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">Core Strengths</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {categories.length} disciplines
        </span>
      </div>

      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={cn(
                'cursor-pointer text-left transition-opacity',
                'font-display font-light leading-[0.95] tracking-[-0.03em]',
                'text-[clamp(2.5rem,6vw,5rem)]',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                isActive ? 'text-foreground' : 'text-muted-foreground/40 hover:text-muted-foreground',
              )}
            >
              <span className={cn(isActive && 'italic')}>{category}</span>
            </button>
          );
        })}
      </div>

      {showActiveData && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 gap-8 border-t border-dashed border-border pt-6 sm:grid-cols-[1fr_1.4fr]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                /capabilities
              </span>
              <ul className="flex flex-col gap-1.5">
                {data.capabilities.map((item) => (
                  <li
                    key={item}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground/60">◆</span>
                    <span className="text-sm leading-snug text-foreground transition-all group-hover:translate-x-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/toolset</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {data.technologies.map((item, i) => (
                  <span
                    key={item}
                    className="font-mono text-xs text-foreground"
                  >
                    {item}
                    {i < data.technologies.length - 1 && <span className="ml-3 text-muted-foreground/40">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

function AIShelf({
  tierIndex,
  categories,
  activeCategory,
  setActiveCategory,
}: {
  tierIndex: string;
  categories: readonly SkillCategoryKey[];
  activeCategory: SkillCategoryKey;
  setActiveCategory: (key: SkillCategoryKey) => void;
}): ReactElement {
  const category = categories[0];
  const data = SKILLS_DATA[category];
  const isActive = activeCategory === category;

  return (
    <button
      type="button"
      onClick={() => setActiveCategory(category)}
      aria-pressed={isActive}
      className={cn(
        'group flex w-full flex-col gap-5 border-t border-foreground bg-foreground px-6 py-8 text-left text-background',
        'transition-colors hover:bg-foreground/95',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      )}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">{tierIndex}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">AI Tools</span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">↗ daily</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <span className="font-display text-[clamp(2rem,5vw,4rem)] font-light italic leading-[0.95] tracking-[-0.03em]">
          {category}
        </span>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 sm:max-w-[55%] sm:justify-end">
          {data.technologies.map((item, i) => (
            <span
              key={item}
              className="font-mono text-xs"
            >
              {item}
              {i < data.technologies.length - 1 && <span className="ml-3 opacity-40">·</span>}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

function AdditionalShelf({
  tierIndex,
  categories,
  activeCategory,
  setActiveCategory,
}: {
  tierIndex: string;
  categories: readonly SkillCategoryKey[];
  activeCategory: SkillCategoryKey;
  setActiveCategory: (key: SkillCategoryKey) => void;
}): ReactElement {
  return (
    <div className="flex flex-col gap-5 border-t border-border pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{tierIndex}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
            Additional Capabilities
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {categories.length} domains · familiar with
        </span>
      </div>

      <dl className="grid grid-cols-1 gap-0 divide-y divide-dashed divide-border">
        {categories.map((category) => {
          const data = SKILLS_DATA[category];
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={isActive}
              className={cn(
                'group grid grid-cols-[140px_1fr] items-baseline gap-x-6 gap-y-1 py-3 text-left transition-colors',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                'sm:grid-cols-[200px_1fr]',
              )}
            >
              <dt
                className={cn(
                  'font-display text-2xl font-light leading-tight tracking-tight transition-colors sm:text-3xl',
                  isActive ? 'italic text-foreground' : 'text-foreground/80 group-hover:text-foreground',
                )}
              >
                {category}
              </dt>
              <dd className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                {data.technologies.join(' · ')}
              </dd>
            </button>
          );
        })}
      </dl>
    </div>
  );
}

export function Skills(): ReactElement {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>('Front-End Engineering');
  const shouldReduceMotion = useReducedMotion();

  const coreTier = SKILL_TIERS[0];
  const aiTier = SKILL_TIERS[1];
  const additionalTier = SKILL_TIERS[2];

  return (
    <section
      id="skills"
      className="relative w-full [content-visibility:auto] [contain-intrinsic-size:0_56.25rem]"
    >
      <Container>
        <motion.div
          className="col-span-full flex flex-col gap-10"
          variants={shouldReduceMotion ? undefined : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={shouldReduceMotion ? undefined : fadeUpVariants}>
            <Label
              number={SKILLS.number}
              title={SKILLS.title}
            />
          </motion.div>

          <motion.div
            variants={shouldReduceMotion ? undefined : fadeUpVariants}
            className="flex flex-col gap-1"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              003 — Classification Index
            </span>
            <p className="max-w-2xl font-display text-2xl font-light italic leading-tight tracking-tight text-foreground sm:text-3xl">
              Three tiers of practice — core strengths, AI-era toolkit, and adjacent capabilities.
            </p>
          </motion.div>

          <motion.div variants={shouldReduceMotion ? undefined : fadeUpVariants}>
            <CoreShelf
              tierIndex="T-01"
              categories={coreTier.categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </motion.div>

          <motion.div variants={shouldReduceMotion ? undefined : fadeUpVariants}>
            <AIShelf
              tierIndex="T-02"
              categories={aiTier.categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </motion.div>

          <motion.div variants={shouldReduceMotion ? undefined : fadeUpVariants}>
            <AdditionalShelf
              tierIndex="T-03"
              categories={additionalTier.categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
