"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/use-theme";

const EASE = [0.65, 0, 0.35, 1] as const;

// Standalone sun/moon switcher pinned to the upper-right corner (the header pill
// stays centered). A spec-chip pill: icon + hairline divider + a visible mono "T"
// kbd hint. Flip it by click or by pressing T anywhere on the page; the keyboard
// path originates the circular reveal from this button, so the sweep always
// grows out of the corner control. Sits at z-50 — below the master ink trail
// (z-60), so it inverts under the blob like the rest of the chrome.
//
// Hydration: the head script may have set a theme different from the SSR
// default, so the client's first icon can differ from the server's. Until
// mount, both icons render and CSS ([data-theme]) picks one — markup is
// identical on server and client (no mismatch) and the icon is correct
// pre-paint. After mount, the AnimatePresence swap takes over so toggles
// animate. suppressHydrationWarning covers the button's own aria-label/title.
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const isDark = theme === "dark";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global T shortcut. Bare key only (no modifiers, no repeat), and never while
  // typing in an input/textarea/contenteditable — future-proofing for the
  // contact form even though the page has no fields today.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "t" && e.key !== "T") return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
      ) {
        return;
      }
      const rect = buttonRef.current?.getBoundingClientRect();
      toggle({
        clientX: rect ? rect.left + rect.width / 2 : 0,
        clientY: rect ? rect.top + rect.height / 2 : 0,
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={(e) => toggle(e)}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-keyshortcuts="t"
      title={isDark ? "Switch to light theme (T)" : "Switch to dark theme (T)"}
      suppressHydrationWarning
      className="fixed top-4 right-4 z-50 inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-line bg-bg px-3 text-mute transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <span className="relative grid size-4 place-items-center">
        {mounted ? (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "moon" : "sun"}
              initial={reduce ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
              className="absolute grid place-items-center"
            >
              {isDark ? (
                <MoonIcon size={16} weight="thin" />
              ) : (
                <SunIcon size={16} weight="thin" />
              )}
            </motion.span>
          </AnimatePresence>
        ) : (
          <>
            <SunIcon
              size={16}
              weight="thin"
              className="absolute in-data-[theme=dark]:hidden"
            />
            <MoonIcon
              size={16}
              weight="thin"
              className="absolute hidden in-data-[theme=dark]:block"
            />
          </>
        )}
      </span>
      {/* Visible shortcut hint — spec-chip style, mono like the section labels. */}
      <kbd className="border-line border-l pl-2 font-mono text-[10px] tracking-[0.2em]">
        T
      </kbd>
    </button>
  );
}
