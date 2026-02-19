'use client';

import type { ReactElement } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import { Container } from '@/components/common/container';
import { Divider } from '@/components/common/divider';
import { Label } from '@/components/common/label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { ABOUT, ABOUT_APPROACH } from '@/data/static/about';

export function About(): ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer();

  return (
    <section
      id="about"
      className="relative min-h-[900px] w-full"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <Container minHeightClassName="min-h-[900px]">
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full"
          >
            <Label
              number={ABOUT.number}
              title={ABOUT.title}
            />
          </motion.div>

          <motion.div
            className={cn('flex flex-col gap-6', 'text-foreground', 'col-span-2', 'sm:col-span-4', 'lg:col-span-5')}
            variants={container}
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-base font-medium"
            >
              {ABOUT.backgroundHeading}
            </motion.p>
            <motion.p
              variants={fadeUpVariants}
              className="text-4xl font-medium leading-10"
            >
              {ABOUT.highlight}
            </motion.p>
            {ABOUT.paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                variants={fadeUpVariants}
                className="text-base font-normal leading-6"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            className={cn('flex flex-col gap-6', 'col-span-2', 'sm:col-span-4', 'lg:col-start-7 lg:col-span-5')}
            variants={container}
          >
            <motion.p
              variants={fadeUpVariants}
              className="text-base font-medium text-foreground"
            >
              {ABOUT.approachHeading}
            </motion.p>
            {ABOUT_APPROACH.map((item, i) => (
              <motion.div
                key={item}
                variants={fadeUpVariants}
              >
                <motion.p
                  className="text-base font-normal leading-6 text-foreground"
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {item}
                </motion.p>
                {i < ABOUT_APPROACH.length - 1 && <Divider className="mt-6" />}
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
