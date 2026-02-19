'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { NAV_ITEMS } from '@/data/static/navigation';
import { useLayoutStore } from '@/data/stores/layout.store';

const MOBILE_NAV_ID = 'mobile-nav';

export function Header() {
  const isMenuOpen = useLayoutStore((state) => state.isMenuOpen);
  const toggleMenu = useLayoutStore((state) => state.toggleMenu);
  const closeMenu = useLayoutStore((state) => state.closeMenu);
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
    <header className={cn('fixed top-0 z-50', 'inset-x-0 lg:left-auto lg:w-1/2', 'bg-foreground/80 backdrop-blur-xl')}>
      <div className="flex items-center px-6 h-14">
        <Link
          href="#hero"
          onClick={handleNavClick}
          className="shrink-0 text-2xl font-semibold text-background"
        >
          ZG
        </Link>

        <div className="flex flex-1 items-center justify-end gap-6">
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map(({ label, href }) => (
              <Button
                key={href}
                variant="ghost"
                asChild
              >
                <Link
                  href={href}
                  onClick={handleNavClick}
                  className="text-background"
                >
                  {label}
                </Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="text-background"
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
                        className="size-4"
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
                        className="size-4"
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </Button>

            <button
              type="button"
              className="lg:hidden flex items-center justify-center size-11"
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
                      className="size-6 text-background"
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
                      className="size-6 text-background"
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
            className="lg:hidden overflow-hidden border-t border-background/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={shouldReduceMotion ? { duration: 0.15 } : { type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map(({ label, href }) => (
                <Button
                  key={href}
                  variant="ghost"
                  asChild
                  className="h-11 w-full justify-start text-background"
                >
                  <Link
                    href={href}
                    onClick={handleNavClick}
                  >
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
