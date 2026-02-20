'use client';

import type { ReactElement } from 'react';

import { useEffect, useRef, useState } from 'react';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';

import { gridColumns } from '@/components/common/grid';

import { cn } from '@/lib/utils';

import { useActiveSection } from '@/hooks/use-active-section';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { NAV } from '@/data/static/navigation';
import { useLayoutStore } from '@/data/stores/layout.store';

const MOBILE_NAV_ID = 'mobile-nav';

interface HeaderNavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  className?: string;
}

function HeaderNavLink({ href, label, isActive = false, onClick, className }: HeaderNavLinkProps): ReactElement {
  return (
    <motion.div
      initial="rest"
      animate={isActive ? 'hover' : 'rest'}
      whileHover="hover"
      className={className}
    >
      <a
        href={href}
        onClick={onClick}
        aria-current={isActive ? 'true' : undefined}
        className={cn(
          'relative inline-flex h-11 items-center',
          'cursor-pointer text-background',
          'focus-visible:underline focus-visible:underline-offset-4',
        )}
      >
        <span className="font-medium">{label}</span>
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-2 h-px origin-left bg-background"
          variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
      </a>
    </motion.div>
  );
}

export function Header(): ReactElement {
  const headerRef = useRef<HTMLElement>(null);
  const isMenuOpen = useLayoutStore((state) => state.isMenuOpen);
  const toggleMenu = useLayoutStore((state) => state.toggleMenu);
  const closeMenu = useLayoutStore((state) => state.closeMenu);
  const activeSection = useActiveSection();
  useFocusTrap(headerRef, isMenuOpen);
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  const handleNavClick = (): void => {
    closeMenu();
  };

  const handleThemeToggle = (): void => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
    >
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none',
          'absolute left-0 top-0 h-full w-6',
          'bg-foreground/80 backdrop-blur-xl',
          'lg:hidden',
        )}
      />
      <div
        aria-hidden="true"
        className={cn('pointer-events-none', 'absolute right-0 top-0 h-full w-6', 'bg-foreground/80 backdrop-blur-xl')}
      />

      <div className={gridColumns}>
        <div
          className={cn(
            'col-span-full',
            'bg-foreground/80 text-background backdrop-blur-xl',
            'lg:col-start-7 lg:col-span-6',
          )}
        >
          <div className="flex h-14 items-center lg:px-6">
            {/* biome-ignore lint/a11y/useValidAnchor: hash anchor for native smooth scroll */}
            <a
              href="#hero"
              onClick={handleNavClick}
              className="shrink-0 cursor-pointer text-2xl font-semibold text-background"
            >
              ZG
            </a>

            <div className="flex flex-1 items-center justify-end gap-6">
              <nav className={cn('hidden items-center gap-6', 'lg:flex')}>
                {NAV.map(({ label, href }) => (
                  <HeaderNavLink
                    key={href}
                    href={href}
                    label={label}
                    isActive={activeSection === href.slice(1)}
                    onClick={handleNavClick}
                  />
                ))}
              </nav>

              <div className="flex items-center gap-0">
                <button
                  type="button"
                  onClick={handleThemeToggle}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                  className={cn(
                    'flex size-11 items-center justify-center border-0 p-0',
                    'cursor-pointer appearance-none bg-transparent',
                    'text-background hover:text-background active:text-background focus-visible:text-background',
                  )}
                >
                  {mounted && (
                    <AnimatePresence
                      mode="wait"
                      initial={false}
                    >
                      {isDark ? (
                        <motion.div
                          key="moon"
                          initial={{ opacity: 0, rotate: -360 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0 }}
                          transition={
                            shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 200, damping: 25 }
                          }
                        >
                          <Moon
                            className="size-4 text-background"
                            aria-hidden="true"
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="sun"
                          initial={{ opacity: 0, rotate: -360 }}
                          animate={{ opacity: 1, rotate: 0 }}
                          exit={{ opacity: 0 }}
                          transition={
                            shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 200, damping: 25 }
                          }
                        >
                          <Sun
                            className="size-4 text-background"
                            aria-hidden="true"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </button>

                <button
                  type="button"
                  className={cn(
                    'flex size-11 items-center justify-center border-0 p-0',
                    'cursor-pointer appearance-none bg-transparent',
                    'text-background hover:text-background active:text-background focus-visible:text-background',
                    'lg:hidden',
                  )}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMenuOpen}
                  aria-controls={MOBILE_NAV_ID}
                  onClick={toggleMenu}
                >
                  <AnimatePresence
                    mode="wait"
                    initial={false}
                  >
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, rotate: -90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 90 }}
                        transition={
                          shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 30 }
                        }
                      >
                        <X
                          className="size-5 text-background"
                          aria-hidden="true"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, rotate: 90 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -90 }}
                        transition={
                          shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 400, damping: 30 }
                        }
                      >
                        <Menu
                          className="size-5 text-background"
                          aria-hidden="true"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                id={MOBILE_NAV_ID}
                className={cn('overflow-x-visible overflow-y-hidden', 'relative', 'lg:hidden')}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className="flex flex-col gap-1 py-4 lg:px-6">
                  {NAV.map(({ label, href }) => (
                    <HeaderNavLink
                      key={href}
                      href={href}
                      label={label}
                      isActive={activeSection === href.slice(1)}
                      onClick={handleNavClick}
                      className="w-full"
                    />
                  ))}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
