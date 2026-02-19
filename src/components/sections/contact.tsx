'use client';

import type { ReactElement } from 'react';
import type { ContactIconName } from '@/data/static/contact';

import { Github, Globe, Linkedin, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

import { SectionContainer } from '@/components/common/section-container';
import { SectionLabel } from '@/components/common/section-label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

import { CONTACT_ITEMS, CONTACT_SECTION } from '@/data/static/contact';

const CONTACT_ICONS: Record<ContactIconName, typeof Mail> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
};

export function Contact(): ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer();

  return (
    <section
      id="contact"
      className="relative min-h-[600px] w-full"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <SectionContainer minHeightClassName="min-h-[600px]">
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full"
          >
            <SectionLabel
              number={CONTACT_SECTION.number}
              title={CONTACT_SECTION.title}
            />
          </motion.div>

          <div className={cn('grid grid-cols-subgrid', 'col-span-2', 'sm:col-span-4', 'lg:col-span-5')}>
            {CONTACT_ITEMS.map(({ icon, label, value, href }) => {
              const Icon = CONTACT_ICONS[icon];
              return (
                <motion.a
                  key={label}
                  href={href}
                  target={label === 'Email' ? undefined : '_blank'}
                  rel={label === 'Email' ? undefined : 'noopener noreferrer'}
                  className={cn(
                    'grid grid-cols-subgrid items-center h-16 border-b border-border group',
                    'col-span-2',
                    'sm:col-span-4',
                    'lg:col-span-5',
                  )}
                  variants={fadeUpVariants}
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <div className="flex gap-2 items-center">
                    <Icon
                      className="size-4 text-foreground"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-normal text-foreground leading-4">{label}</p>
                  </div>
                  <p
                    className={cn(
                      'text-xs font-normal text-foreground leading-4 min-w-0 truncate',
                      'col-span-1',
                      'sm:col-span-3',
                      'lg:col-span-4',
                    )}
                  >
                    <span className="relative inline-flex max-w-full items-center pb-px">
                      <span className="truncate">{value}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-0 bottom-0 h-px origin-left bg-foreground scale-x-0',
                          'transition-transform duration-200 ease-out',
                          'group-hover:scale-x-100',
                        )}
                      />
                    </span>
                  </p>
                </motion.a>
              );
            })}
          </div>
        </SectionContainer>
      </motion.div>
    </section>
  );
}
