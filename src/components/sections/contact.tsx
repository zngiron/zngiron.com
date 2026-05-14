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

const container = createStaggerContainer();

export function Contact(): ReactElement {
  const year = new Date().getFullYear();
  const primaryItem = CONTACT_ITEMS.find((item) => item.icon === 'mail') ?? CONTACT_ITEMS[0];
  const secondaryItems = CONTACT_ITEMS.filter((item) => item !== primaryItem);

  return (
    <footer
      id="contact"
      className="relative w-full [content-visibility:auto] [contain-intrinsic-size:0_37.5rem]"
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
              number={CONTACT.number}
              title={CONTACT.title}
            />
          </motion.div>

          {/* Top metadata strip */}
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full flex items-center justify-between gap-4 border-b border-border pb-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
              [ {CONTACT.number} ] Colophon
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              End of catalog ※
            </span>
          </motion.div>

          {/* Primary channel — featured email */}
          <motion.a
            variants={fadeUpVariants}
            href={primaryItem.href}
            className={cn(
              'group col-span-full flex flex-col gap-3 border-b border-border pb-6',
              'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
            )}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              /primary channel
            </span>
            <span className="flex items-baseline gap-3">
              <span className="font-display text-[clamp(2rem,6vw,5rem)] font-light italic leading-[0.9] tracking-[-0.03em] text-foreground transition-transform group-hover:-translate-y-1">
                {primaryItem.value}
              </span>
              <motion.span
                aria-hidden="true"
                className="text-foreground"
                whileHover={{ x: 4, y: -4 }}
              >
                <ArrowUpRight className="size-6 sm:size-8" />
              </motion.span>
            </span>
          </motion.a>

          {/* Secondary channels grid */}
          <motion.div
            variants={container}
            className="col-span-full grid grid-cols-1 sm:grid-cols-3"
          >
            {secondaryItems.map(({ icon, label, value, href }) => {
              const Icon = CONTACT_ICONS[icon];
              return (
                <motion.a
                  key={label}
                  variants={fadeUpVariants}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group flex flex-col gap-2 border-b border-border py-5 sm:border-r sm:px-6 sm:py-6 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0',
                    'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className="size-3.5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </span>
                  </div>
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm text-foreground transition-opacity group-hover:opacity-80">
                      {value}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      className="text-muted-foreground"
                      initial={{ x: -4, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                    >
                      <ArrowUpRight className="size-3.5" />
                    </motion.span>
                  </span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Signature stamp */}
          <motion.div
            variants={fadeUpVariants}
            className="col-span-full flex flex-col gap-6 pt-8 sm:flex-row sm:items-end sm:justify-between"
          >
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/signed</span>
              <span className="font-display text-3xl font-light italic leading-[0.9] tracking-[-0.02em] text-foreground sm:text-5xl">
                Ziedrick Ruen Giron
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                MNL ↗ World — {year}
              </span>
            </div>

            <div className="flex flex-col items-start gap-1 sm:items-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Cat. ZRG · {year}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                © {year} · All work reserved
              </span>
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </footer>
  );
}
