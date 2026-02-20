'use client';

import type { ReactElement } from 'react';
import type { ContactIconName } from '@/data/static/contact';

import { ArrowUpRight, Github, Globe, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';

import { Container } from '@/components/common/container';
import { Label } from '@/components/common/label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { CONTACT, CONTACT_ITEMS } from '@/data/static/contact';

const CONTACT_ICONS: Record<ContactIconName, typeof Mail> = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
};

export function Contact(): ReactElement {
  const container = createStaggerContainer();

  return (
    <footer
      id="contact"
      className="relative min-h-[600px] w-full"
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-100px' }}
      >
        <Container minHeightClassName="min-h-[600px]">
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full"
          >
            <Label
              number={CONTACT.number}
              title={CONTACT.title}
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
                    'group',
                    'grid grid-cols-subgrid items-center h-16 border-b border-border',
                    'col-span-2',
                    'sm:col-span-4',
                    'lg:col-span-5',
                  )}
                  variants={fadeUpVariants}
                  whileHover="hover"
                  whileTap={{ opacity: 0.7 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-4 text-foreground"
                      aria-hidden="true"
                    />
                    <p className="text-xs font-normal leading-4 text-foreground">{label}</p>
                  </div>
                  <div
                    className={cn('flex min-w-0 items-center gap-2', 'col-span-1', 'sm:col-span-3', 'lg:col-span-4')}
                  >
                    <p className="min-w-0 truncate text-xs font-normal leading-4 text-foreground">
                      <span className="relative inline-flex max-w-full items-center pb-px">
                        <span className="truncate">{value}</span>
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-px origin-left bg-foreground"
                          style={{ scaleX: 0 }}
                          variants={{ hover: { scaleX: 1 } }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        />
                      </span>
                    </p>
                    <motion.span
                      initial={{ opacity: 0, x: -4 }}
                      variants={{ hover: { opacity: 1, x: 0 } }}
                      transition={{ duration: 0.15 }}
                      aria-hidden="true"
                    >
                      <ArrowUpRight className="size-3.5 text-foreground" />
                    </motion.span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          <motion.p
            variants={fadeUpVariants}
            className="col-span-full text-xs font-normal text-foreground"
          >
            &copy; {new Date().getFullYear()} Zuen Giron
          </motion.p>
        </Container>
      </motion.div>
    </footer>
  );
}
