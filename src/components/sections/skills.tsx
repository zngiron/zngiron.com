'use client';

import type { Variants } from 'motion/react';
import type { ReactElement } from 'react';
import type { SkillCategoryKey } from '@/data/static/skills';

import { useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { BlockInvert, TextBlockBlur } from '@/components/common/blur';
import { Container } from '@/components/common/container';
import { Divider } from '@/components/common/divider';
import { Label } from '@/components/common/label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { SKILL_CATEGORIES, SKILLS, SKILLS_DATA } from '@/data/static/skills';

const contentFade: Variants = {
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
      <Container>
        <div className="col-span-full">
          <Label
            number={SKILLS.number}
            title={SKILLS.title}
          />
        </div>

        <div className={cn('overflow-x-auto scrollbar-none', 'col-span-full -mx-6 flex gap-2 px-6', 'lg:hidden')}>
          {SKILL_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                'shrink-0 px-3 py-1.5',
                'text-xs font-medium whitespace-nowrap',
                activeCategory === category
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-secondary-foreground',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          className={cn('col-span-2', 'sm:col-span-4', 'lg:col-span-5')}
          layout={!shouldReduceMotion}
          transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="flex flex-col gap-4"
              layout={!shouldReduceMotion}
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
                  <div className="flex h-[22px] items-center justify-center self-start px-2.5 py-0.5 bg-secondary">
                    <p className="text-center text-xs font-medium text-secondary-foreground">Capabilities</p>
                  </div>
                  <div className="flex flex-col gap-2 pl-2">
                    {activeData.capabilities.map((item) => (
                      <motion.div
                        key={item}
                        variants={shouldReduceMotion ? undefined : fadeUpVariants}
                        className="group relative w-fit"
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                      >
                        <p className="text-base font-normal leading-6 text-foreground">{item}</p>
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-px origin-left bg-foreground"
                          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="flex flex-1 flex-col gap-2"
                  variants={shouldReduceMotion ? undefined : container}
                >
                  <div className="flex h-[22px] items-center justify-center self-start px-2.5 py-0.5 bg-secondary">
                    <p className="text-center text-xs font-medium text-secondary-foreground">Technologies</p>
                  </div>
                  <div className="flex flex-col gap-2 pl-2">
                    {activeData.technologies.map((item) => (
                      <motion.div
                        key={item}
                        variants={shouldReduceMotion ? undefined : fadeUpVariants}
                        className="group relative w-fit"
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                      >
                        <p className="text-base font-normal leading-6 text-foreground">{item}</p>
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-px origin-left bg-foreground"
                          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className={cn('hidden', 'lg:col-start-7 lg:col-span-5 lg:flex lg:flex-col lg:items-end')}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <motion.div
              key={category}
              variants={fadeUpVariants}
              className="-my-px"
            >
              <button
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn('cursor-pointer text-left', activeCategory !== category && 'opacity-90')}
              >
                <BlockInvert>
                  <span className="text-4xl whitespace-nowrap">{category}</span>
                </BlockInvert>
              </button>
            </motion.div>
          ))}
        </motion.div>

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
      </Container>
    </section>
  );
}
