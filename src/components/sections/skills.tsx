'use client';

import type { ReactElement } from 'react';
import type { SkillCategoryKey } from '@/data/static/skills';

import { useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { Divider } from '@/components/common/divider';
import { SectionContainer } from '@/components/common/section-container';
import { SectionLabel } from '@/components/common/section-label';
import { TextBlockBlur } from '@/components/common/text-block-blur';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

import { SKILL_CATEGORIES, SKILLS_DATA, SKILLS_SECTION } from '@/data/static/skills';

const contentFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function Skills(): ReactElement {
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>('Front-End Development');
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer(0.05);
  const activeData = SKILLS_DATA[activeCategory];

  return (
    <section
      id="skills"
      className="relative min-h-[900px] w-full"
    >
      <SectionContainer>
        <div className="col-span-full">
          <SectionLabel
            number={SKILLS_SECTION.number}
            title={SKILLS_SECTION.title}
          />
        </div>

        {/* Mobile/tablet: horizontal scrollable tabs */}
        <div className={cn('col-span-full -mx-6 px-6', 'flex gap-2 overflow-x-auto', 'lg:hidden')}>
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                'shrink-0 px-3 py-1.5 text-xs font-medium whitespace-nowrap',
                activeCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-secondary-foreground',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Left: capabilities + technologies */}
        <div className={cn('col-span-2', 'sm:col-span-4', 'lg:col-span-5')}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="flex flex-col gap-4"
              variants={shouldReduceMotion ? undefined : container}
              initial="hidden"
              animate="show"
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={shouldReduceMotion ? { duration: 0.15 } : undefined}
            >
              <motion.p
                variants={shouldReduceMotion ? undefined : fadeUpVariants}
                className="text-base font-medium text-foreground"
              >
                {activeCategory}
              </motion.p>
              <Divider />

              <div className="flex gap-4">
                <motion.div
                  className="flex flex-1 flex-col gap-2"
                  variants={shouldReduceMotion ? undefined : container}
                >
                  <div className="bg-secondary flex items-center justify-center h-[22px] px-2.5 py-0.5 self-start">
                    <p className="text-xs font-medium text-secondary-foreground text-center">Capabilities</p>
                  </div>
                  <div className="flex flex-col gap-2 pl-2">
                    {activeData.capabilities.map((item) => (
                      <motion.p
                        key={item}
                        variants={shouldReduceMotion ? undefined : fadeUpVariants}
                        className="text-base font-normal text-foreground leading-6"
                        whileHover={shouldReduceMotion ? {} : { x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        {item}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-1 flex-col gap-2"
                  variants={shouldReduceMotion ? undefined : container}
                >
                  <div className="bg-secondary flex items-center justify-center h-[22px] px-2.5 py-0.5 self-start">
                    <p className="text-xs font-medium text-secondary-foreground text-center">Technologies</p>
                  </div>
                  <div className="flex flex-col gap-2 pl-2">
                    {activeData.technologies.map((item) => (
                      <motion.p
                        key={item}
                        variants={shouldReduceMotion ? undefined : fadeUpVariants}
                        className="text-base font-normal text-foreground leading-6"
                        whileHover={shouldReduceMotion ? {} : { x: 4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      >
                        {item}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: vertical category navigation */}
        <motion.div
          className={cn('hidden', 'lg:flex lg:col-start-7 lg:col-span-5 lg:flex-col lg:items-end')}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category}
              variants={fadeUpVariants}
            >
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn('cursor-pointer text-left', activeCategory !== category && 'opacity-40')}
              >
                <TextBlockBlur>
                  <p className="text-4xl font-semibold leading-10 text-primary-foreground whitespace-nowrap">
                    {category}
                  </p>
                </TextBlockBlur>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Large title */}
        <motion.div
          className="col-span-full flex flex-col items-start pt-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="flex flex-col items-start"
              {...(shouldReduceMotion
                ? {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    exit: { opacity: 0 },
                    transition: { duration: 0.15 },
                  }
                : { ...contentFade, transition: { type: 'spring', stiffness: 300, damping: 30 } })}
            >
              {activeData.titleLines.map((line, i) => (
                <div
                  key={line}
                  className={i < activeData.titleLines.length - 1 ? '-mb-4' : ''}
                >
                  <TextBlockBlur className={i === activeData.titleLines.length - 1 ? 'w-full' : undefined}>
                    <p className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-none text-primary-foreground">
                      {line}
                    </p>
                  </TextBlockBlur>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </SectionContainer>
    </section>
  );
}
