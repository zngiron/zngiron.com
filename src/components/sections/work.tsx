'use client';

import type { Variants } from 'motion/react';
import type { ReactElement, KeyboardEvent as ReactKeyboardEvent } from 'react';

import { useCallback, useState } from 'react';

import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { Label } from '@/components/common/label';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { PORTFOLIO, PORTFOLIO_DATA } from '@/data/static/portfolio';

const subItemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

const subItemStagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const container = createStaggerContainer(0.04);

export function Work(): ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(PORTFOLIO_DATA[0]?.id ?? null);
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = (id: string): void => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLButtonElement>, index: number): void => {
    let targetIndex = -1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      targetIndex = (index + 1) % PORTFOLIO_DATA.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      targetIndex = (index - 1 + PORTFOLIO_DATA.length) % PORTFOLIO_DATA.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      targetIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      targetIndex = PORTFOLIO_DATA.length - 1;
    }

    if (targetIndex >= 0) {
      const target = document.getElementById(`work-trigger-${PORTFOLIO_DATA[targetIndex].id}`);
      target?.focus();
    }
  }, []);

  return (
    <section
      id="work"
      className="relative w-full [content-visibility:auto] [contain-intrinsic-size:0_56.25rem]"
    >
      <div className={cn('relative z-10 flex w-full flex-col items-start')}>
        {/* Section header — catalog spread */}
        <motion.div
          className="flex w-full flex-col gap-4 px-6 pt-10 pb-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            variants={fadeUpVariants}
            className="flex items-start justify-between gap-4"
          >
            <Label
              number={PORTFOLIO.number}
              title={PORTFOLIO.title}
            />
            <div className="flex flex-col items-end gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                {PORTFOLIO.badge}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {PORTFOLIO_DATA.length} entries
              </span>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="max-w-2xl font-display text-[clamp(1.5rem,3vw,2.25rem)] font-light italic leading-tight tracking-tight text-foreground"
          >
            A chronological catalog of every engagement — employers, retainers, and freelance briefs.
          </motion.p>
        </motion.div>

        {/* Catalog rows */}
        <div className="w-full border-t border-border">
          {/* Desktop column header */}
          <div className="hidden w-full grid-cols-[80px_2.5fr_1.5fr_2fr_1.2fr_60px] items-center gap-x-6 border-b border-border bg-background px-6 py-2.5 md:grid">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cat. No.</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Client</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Industry</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Role</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Year</span>
            <span />
          </div>

          {/* Mobile column header */}
          <div className="flex w-full items-center justify-between border-b border-border bg-background px-6 py-2.5 md:hidden">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Cat. · Client
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Year</span>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            {PORTFOLIO_DATA.map((entry, entryIndex) => {
              const isExpanded = expandedId === entry.id;
              const panelId = `work-panel-${entry.id}`;
              const triggerId = `work-trigger-${entry.id}`;
              const catNo = `W-${String(entryIndex + 1).padStart(2, '0')}`;

              return (
                <motion.div
                  key={entry.id}
                  variants={fadeUpVariants}
                >
                  <motion.div
                    className="border-b border-border"
                    initial={false}
                    animate={{
                      backgroundColor: isExpanded ? 'var(--foreground)' : 'var(--background)',
                      color: isExpanded ? 'var(--background)' : 'var(--foreground)',
                    }}
                    whileHover={
                      !isExpanded && !shouldReduceMotion ? { backgroundColor: 'var(--secondary)' } : undefined
                    }
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    {/* Desktop trigger row */}
                    <button
                      id={triggerId}
                      type="button"
                      className={cn(
                        'hidden w-full grid-cols-[80px_2.5fr_1.5fr_2fr_1.2fr_60px] items-center gap-x-6 px-6 py-5',
                        'cursor-pointer text-left',
                        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                        'md:grid',
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(entry.id)}
                      onKeyDown={(e) => handleKeyDown(e, entryIndex)}
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] tabular-nums">{catNo}</span>
                      <span
                        className={cn(
                          'font-display text-2xl font-light leading-tight tracking-tight',
                          isExpanded && 'italic',
                        )}
                      >
                        {entry.client}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wide">{entry.industry}</span>
                      <span className="text-xs leading-tight">{entry.role}</span>
                      <span className="font-mono text-[11px] tabular-nums">{entry.year}</span>
                      <span className="flex justify-end">
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={
                            shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 25 }
                          }
                        >
                          {isExpanded ? (
                            <Minus
                              className="size-4"
                              aria-hidden="true"
                            />
                          ) : (
                            <Plus
                              className="size-4"
                              aria-hidden="true"
                            />
                          )}
                        </motion.span>
                      </span>
                    </button>

                    {/* Mobile trigger row */}
                    <button
                      type="button"
                      className={cn(
                        'flex w-full min-h-16 items-center justify-between gap-3 px-6 py-4',
                        'cursor-pointer text-left',
                        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                        'md:hidden',
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(entry.id)}
                      onKeyDown={(e) => handleKeyDown(e, entryIndex)}
                    >
                      <div className="flex min-w-0 items-baseline gap-3">
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.15em] tabular-nums">
                          {catNo}
                        </span>
                        <span
                          className={cn(
                            'truncate font-display text-xl font-light leading-tight tracking-tight',
                            isExpanded && 'italic',
                          )}
                        >
                          {entry.client}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="font-mono text-[10px] tabular-nums">{entry.year}</span>
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={
                            shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 25 }
                          }
                        >
                          {isExpanded ? (
                            <Minus
                              className="size-4"
                              aria-hidden="true"
                            />
                          ) : (
                            <Plus
                              className="size-4"
                              aria-hidden="true"
                            />
                          )}
                        </motion.span>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={triggerId}
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0.15 }
                              : {
                                  height: { type: 'spring', stiffness: 300, damping: 30 },
                                  opacity: { duration: 0.2, delay: 0.05 },
                                }
                          }
                        >
                          <motion.div
                            initial="hidden"
                            animate="show"
                            variants={subItemStagger}
                            className={cn(
                              'grid grid-cols-1 gap-3 px-6 pb-6',
                              'md:grid-cols-[80px_1fr] md:gap-x-6 md:px-6',
                            )}
                          >
                            <motion.div
                              variants={subItemVariants}
                              className="hidden md:block"
                            >
                              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50">
                                /entries
                              </span>
                              <p className="mt-1 font-mono text-[10px] opacity-50 tabular-nums">
                                {entry.projects.length} items
                              </p>
                            </motion.div>

                            <motion.ul
                              variants={subItemStagger}
                              className="flex flex-col"
                            >
                              {entry.projects.map((project, projectIndex) => (
                                <motion.li
                                  key={`${entry.id}-${projectIndex}-${project.name}`}
                                  variants={subItemVariants}
                                  className={cn(
                                    'group grid grid-cols-[24px_1fr] items-baseline gap-x-3 py-2.5',
                                    'md:grid-cols-[40px_2fr_1.5fr_1fr] md:gap-x-6',
                                    projectIndex < entry.projects.length - 1 &&
                                      'border-b border-dashed border-current/20',
                                  )}
                                >
                                  <span className="font-mono text-[10px] tabular-nums opacity-60">
                                    .{String(projectIndex + 1).padStart(2, '0')}
                                  </span>
                                  <span className="font-display text-lg font-light leading-tight tracking-tight">
                                    {project.name}
                                  </span>
                                  <span className="text-[11px] leading-snug opacity-70 md:text-xs">
                                    {project.details}
                                  </span>
                                  <span className="hidden items-center justify-end gap-3 md:flex">
                                    {project.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="font-mono text-[10px] uppercase tracking-wide opacity-70"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide opacity-80 hover:opacity-100"
                                        aria-label={`View ${project.name}`}
                                      >
                                        <ArrowUpRight
                                          className="size-3"
                                          aria-hidden="true"
                                        />
                                        View
                                      </a>
                                    )}
                                  </span>

                                  {/* Mobile-only tags + link */}
                                  <span className="col-start-2 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 md:hidden">
                                    {project.tags.slice(0, 3).map((tag) => (
                                      <span
                                        key={tag}
                                        className="font-mono text-[10px] uppercase tracking-wide opacity-70"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide opacity-80"
                                        aria-label={`View ${project.name}`}
                                      >
                                        <ArrowUpRight
                                          className="size-3"
                                          aria-hidden="true"
                                        />
                                        View
                                      </a>
                                    )}
                                  </span>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
