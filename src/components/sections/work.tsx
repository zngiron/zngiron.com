'use client';

import type { Variants } from 'motion/react';
import type { ReactElement } from 'react';

import { useState } from 'react';

import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { SectionLabel } from '@/components/common/section-label';
import { Badge } from '@/components/ui/badge';

import { createStaggerContainer, fadeUpVariants } from '@/lib/motion-variants';
import { cn } from '@/lib/utils';

import { PORTFOLIO_DATA, PORTFOLIO_SECTION } from '@/data/static/portfolio';

const ROW_GRID = cn('grid items-center gap-x-6 px-6', 'grid-cols-[60px_2fr_1.5fr_2.5fr_1.5fr_48px]');

export function Work(): ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>('freelance');
  const shouldReduceMotion = useReducedMotion();
  const container = createStaggerContainer(0.04);

  const handleToggle = (id: string): void => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const subItemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <section
      id="work"
      className="relative min-h-[900px] w-full"
    >
      <div className={cn('relative z-10', 'flex flex-col items-start justify-center min-h-[900px] w-full')}>
        {/* Section header */}
        <motion.div
          className="flex items-start justify-between p-6 w-full"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionLabel
              number={PORTFOLIO_SECTION.number}
              title={PORTFOLIO_SECTION.title}
            />
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <Badge
              variant="secondary"
              className="rounded-none"
            >
              {PORTFOLIO_SECTION.badge}
            </Badge>
          </motion.div>
        </motion.div>

        {/* Table */}
        <div className="w-full border-t border-border">
          {/* Desktop header */}
          <div className={cn(ROW_GRID, 'hidden md:grid py-3 border-b border-border bg-background text-foreground')}>
            <p className="text-xs font-medium">No.</p>
            <p className="text-xs font-medium">Client</p>
            <p className="text-xs font-medium">Industry</p>
            <p className="text-xs font-medium">Role</p>
            <p className="text-xs font-medium">Year</p>
          </div>

          {/* Mobile header */}
          <div
            className={cn(
              'md:hidden',
              'flex items-center justify-between px-4 py-3 border-b border-border bg-background text-foreground',
            )}
          >
            <div className="flex items-center gap-4">
              <p className="text-xs font-medium">No.</p>
              <p className="text-xs font-medium">Client</p>
            </div>
            <p className="text-xs font-medium">Year</p>
          </div>

          {/* Rows */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            {PORTFOLIO_DATA.map((entry) => {
              const isExpanded = expandedId === entry.id;
              const panelId = `work-panel-${entry.id}`;
              const triggerId = `work-trigger-${entry.id}`;

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
                    {/* Desktop trigger */}
                    <button
                      id={triggerId}
                      type="button"
                      className={cn(
                        ROW_GRID,
                        'hidden md:grid w-full py-5 cursor-pointer text-left',
                        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(entry.id)}
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

                    {/* Mobile trigger */}
                    <button
                      type="button"
                      className={cn(
                        'md:hidden',
                        'flex items-center justify-between w-full px-4 py-4 min-h-[56px] cursor-pointer text-left',
                        'focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring',
                      )}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => handleToggle(entry.id)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-xs leading-4 shrink-0">{entry.number}</span>
                        <span className="text-xs leading-4 truncate">{entry.client}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
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

                    {/* Expanded panel */}
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
                          {/* Desktop expanded content */}
                          <div className="hidden md:block pb-4">
                            {/* Sub-header */}
                            <div className={cn(ROW_GRID, 'py-2')}>
                              <div />
                              <p className="text-xs leading-4 opacity-50">Project</p>
                              <p className="text-xs leading-4 opacity-50">Details</p>
                              <p className="text-xs leading-4 opacity-50">Category</p>
                              <p className="text-xs leading-4 opacity-50">Link</p>
                              <div />
                            </div>

                            {/* Sub-rows */}
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
                                  className={cn(ROW_GRID, 'py-2.5')}
                                >
                                  <div />
                                  <p className="text-xs leading-4 font-medium">{project.name}</p>
                                  <p className="text-xs leading-4">{project.details}</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                      <Badge
                                        key={tag}
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
                                          'inline-flex items-center gap-1.5 text-xs leading-4',
                                          'opacity-70 hover:opacity-100',
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

                          {/* Mobile expanded content */}
                          <div className="md:hidden px-4 pb-4">
                            <div className="flex flex-wrap gap-x-4 gap-y-1 pb-3 opacity-50">
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
                                    <p className="text-xs leading-4 font-medium">{project.name}</p>
                                    {project.link && (
                                      <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 inline-flex items-center gap-1 text-[11px] opacity-70 hover:opacity-100"
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
                                  <p className="text-[11px] leading-relaxed opacity-60 mb-2">{project.details}</p>
                                  <div className="flex flex-wrap gap-1">
                                    {project.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        className="rounded-lg text-[10px] px-1.5 py-0"
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
