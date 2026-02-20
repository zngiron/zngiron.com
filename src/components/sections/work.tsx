'use client';

import type { Variants } from 'motion/react';
import type { ReactElement, KeyboardEvent as ReactKeyboardEvent } from 'react';

import { useCallback, useState } from 'react';

import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { Label } from '@/components/common/label';
import { Badge } from '@/components/ui/badge';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion';
import { cn } from '@/lib/utils';

import { PORTFOLIO, PORTFOLIO_DATA } from '@/data/static/portfolio';

const ROW_GRID = cn('grid items-center gap-x-6 px-6', 'grid-cols-[60px_2fr_1.5fr_2.5fr_1.5fr_48px]');

const subItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export function Work(): ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>('freelance');
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer(0.04);

  const handleToggle = (id: string): void => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLButtonElement>, index: number): void => {
    const id = event.currentTarget.id;
    const prefix = id.startsWith('work-trigger-mobile-') ? 'work-trigger-mobile-' : 'work-trigger-';
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
      const target = document.getElementById(`${prefix}${PORTFOLIO_DATA[targetIndex].id}`);
      target?.focus();
    }
  }, []);

  return (
    <section
      id="work"
      className="relative min-h-[900px] w-full"
    >
      <div className={cn('relative z-10', 'flex min-h-[900px] w-full flex-col items-start justify-center')}>
        <motion.div
          className="flex w-full items-start justify-between p-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants}>
            <Label
              number={PORTFOLIO.number}
              title={PORTFOLIO.title}
            />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <Badge
              variant="secondary"
              className="rounded-none"
            >
              {PORTFOLIO.badge}
            </Badge>
          </motion.div>
        </motion.div>

        <div className="w-full border-t border-border">
          <div className={cn(ROW_GRID, 'hidden border-b border-border py-3 bg-background text-foreground md:grid')}>
            <p className="text-xs font-medium">No.</p>
            <p className="text-xs font-medium">Client</p>
            <p className="text-xs font-medium">Industry</p>
            <p className="text-xs font-medium">Role</p>
            <p className="text-xs font-medium">Year</p>
          </div>

          <div
            className={cn(
              'flex items-center justify-between border-b border-border px-6 py-3',
              'bg-background text-foreground',
              'md:hidden',
            )}
          >
            <div className="flex items-center gap-4">
              <p className="text-xs font-medium">No.</p>
              <p className="text-xs font-medium">Client</p>
            </div>
            <p className="text-xs font-medium">Year</p>
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
              const triggerMobileId = `work-trigger-mobile-${entry.id}`;

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
                    <button
                      id={triggerId}
                      type="button"
                      className={cn(
                        ROW_GRID,
                        'hidden w-full py-5',
                        'cursor-pointer text-left',
                        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                        'md:grid',
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(entry.id)}
                      onKeyDown={(e) => handleKeyDown(e, entryIndex)}
                    >
                      <span className="text-xs leading-4">{entry.number}</span>
                      <span className="text-xs leading-4">{entry.client}</span>
                      <span className="text-xs leading-4">{entry.industry}</span>
                      <span className="text-xs leading-4">{entry.role}</span>
                      <span className="text-xs leading-4">{entry.year}</span>
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

                    <button
                      id={triggerMobileId}
                      type="button"
                      className={cn(
                        'flex w-full min-h-[56px] items-center justify-between px-6 py-4',
                        'cursor-pointer text-left',
                        'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                        'md:hidden',
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(entry.id)}
                      onKeyDown={(e) => handleKeyDown(e, entryIndex)}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0 text-xs leading-4">{entry.number}</span>
                        <span className="truncate text-xs leading-4">{entry.client}</span>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <span className="text-xs leading-4">{entry.year}</span>
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
                          <div className="hidden pb-4 md:block">
                            <div className={cn(ROW_GRID, 'py-2')}>
                              <div />
                              <p className="opacity-50 text-xs leading-4">Project</p>
                              <p className="opacity-50 text-xs leading-4">Details</p>
                              <p className="opacity-50 text-xs leading-4">Category</p>
                              <div />
                              <div />
                            </div>

                            <motion.div
                              initial="hidden"
                              animate="show"
                              variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { staggerChildren: 0.05 } },
                              }}
                            >
                              {entry.projects.map((project) => (
                                <motion.div
                                  key={project.name}
                                  variants={subItemVariants}
                                  className={cn(ROW_GRID, 'py-2.5 cursor-default')}
                                  whileHover={{
                                    backgroundColor: 'color-mix(in oklch, var(--background) 10%, transparent)',
                                  }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <div />
                                  <p className="text-xs font-medium leading-4">{project.name}</p>
                                  <p className="text-xs leading-4">{project.details}</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant={isExpanded ? 'secondary' : 'default'}
                                        className="rounded-lg text-[11px]"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div>
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                          'opacity-70',
                                          'inline-flex items-center gap-1.5',
                                          'text-xs leading-4',
                                          'hover:opacity-100',
                                          'focus-visible:outline-2 focus-visible:outline-ring',
                                        )}
                                        aria-label={`View ${project.name} project`}
                                      >
                                        <ArrowUpRight
                                          className="size-3.5"
                                          aria-hidden="true"
                                        />
                                        View Project
                                      </a>
                                    )}
                                  </div>
                                  <div />
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>

                          <div className="px-6 pb-4 md:hidden">
                            <div className="opacity-50 flex flex-wrap gap-x-4 gap-y-1 pb-3">
                              <p className="text-xs leading-4">{entry.role}</p>
                              <p className="text-xs leading-4">{entry.industry}</p>
                            </div>

                            <motion.div
                              initial="hidden"
                              animate="show"
                              variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { staggerChildren: 0.05 } },
                              }}
                              className="flex flex-col gap-3"
                            >
                              {entry.projects.map((project) => (
                                <motion.div
                                  key={project.name}
                                  variants={subItemVariants}
                                  className="border-t border-current/10 pt-3 first:border-0 first:pt-0"
                                >
                                  <div className="flex items-start justify-between gap-3 mb-1.5">
                                    <p className="text-xs font-medium leading-4">{project.name}</p>
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                          'opacity-70',
                                          'shrink-0 inline-flex items-center gap-1',
                                          'text-[11px]',
                                          'hover:opacity-100',
                                        )}
                                        aria-label={`View ${project.name} project`}
                                      >
                                        <ArrowUpRight
                                          className="size-3"
                                          aria-hidden="true"
                                        />
                                        View
                                      </a>
                                    )}
                                  </div>
                                  <p className="opacity-60 mb-2 text-[11px] leading-relaxed">{project.details}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {project.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant={isExpanded ? 'secondary' : 'default'}
                                        className="rounded-lg px-1.5 py-0 text-[10px]"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </div>
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
