"use client";

import { ArrowDownIcon, ArrowUpRightIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import {
  type ConnectItem,
  connectItems,
  type NavItem,
  navItems,
  sectionIds,
} from "./nav-items";
import { useActiveSection } from "./use-active-section";
import { GLYPHS, useScramble } from "./use-scramble";

// Smooth ease-in-out. Width grows less than height, so the morph reads as a
// mostly-vertical unfold with a slight sideways spread.
const EASE = [0.65, 0, 0.35, 1] as const;
const WIDTH_COLLAPSED = 224; // w-56
const WIDTH_EXPANDED = 384; // w-96
const MORPH_DURATION = 0.5;

function NavRow({
  item,
  isActive,
  reduceMotion,
  onSelect,
}: {
  item: NavItem;
  isActive: boolean;
  reduceMotion: boolean;
  onSelect: () => void;
}) {
  const [active, setActive] = useState(false);
  // Both label and index decode on hover/focus; letters for the word, digits
  // for the number.
  const label = useScramble(item.label, active, !reduceMotion, GLYPHS);
  const index = useScramble(item.index, active, !reduceMotion);

  return (
    <li>
      <a
        href={item.href}
        onClick={onSelect}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        aria-current={isActive ? "location" : undefined}
        className={`group flex items-center justify-between rounded-md py-2 text-2xl font-medium lowercase transition-colors hover:text-bg focus-visible:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          isActive ? "text-bg" : "text-bg/55"
        }`}
      >
        <span>
          {label}
          {/* Blinking terminal cursor _ marks the active section only. */}
          {isActive && (
            <span
              aria-hidden="true"
              className="text-accent animate-blink motion-reduce:animate-none"
            >
              _
            </span>
          )}
        </span>
        <span className="font-mono text-xs text-bg/40 tabular-nums transition-colors group-hover:text-bg group-focus-visible:text-bg">
          {index}
        </span>
      </a>
    </li>
  );
}

function ConnectRow({
  item,
  reduceMotion,
}: {
  item: ConnectItem;
  reduceMotion: boolean;
}) {
  const [active, setActive] = useState(false);
  const label = useScramble(item.label, active, !reduceMotion, GLYPHS);

  return (
    <li>
      <a
        href={item.href}
        {...(item.kind === "external"
          ? { target: "_blank", rel: "noopener noreferrer" }
          : { download: true })}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        className="group flex items-center justify-between gap-2 rounded-md py-1.5 font-mono text-sm lowercase text-bg/55 transition-colors hover:text-bg focus-visible:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="truncate">{label}</span>
        {item.kind === "external" ? (
          <ArrowUpRightIcon
            size={13}
            weight="thin"
            className="shrink-0 text-bg/40 transition-colors group-hover:text-bg group-focus-visible:text-bg"
          />
        ) : (
          <ArrowDownIcon
            size={13}
            weight="thin"
            className="shrink-0 text-bg/40 transition-colors group-hover:text-bg group-focus-visible:text-bg"
          />
        )}
      </a>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const reduceMotion = useReducedMotion();
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Esc closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Retract the master ink trail while the menu is open: flag it on <html> so the
  // globals.css rule hides [data-ink-trail] (same mechanism as the theme switch).
  // Otherwise the page-wide blob roams over the open panel and obscures the nav.
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.setAttribute("data-menu-open", "");
    else root.removeAttribute("data-menu-open");
    return () => root.removeAttribute("data-menu-open");
  }, [open]);

  // Move focus into the menu on open; return it to the trigger on close.
  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => {
        menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
      });
      wasOpen.current = true;
      return () => cancelAnimationFrame(id);
    }
    if (wasOpen.current) triggerRef.current?.focus();
    wasOpen.current = false;
  }, [open]);

  const scrollToTop = () => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // External links stay as text rows; the CV download gets its own button.
  const connectLinks = connectItems.filter((i) => i.kind === "external");
  const cv = connectItems.find((i) => i.kind === "download");

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        {/* Backdrop: subtle dim + outside-click to close. */}
        <AnimatePresence>
          {open && (
            <motion.button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className="pointer-events-auto fixed inset-0 -z-10 cursor-default bg-ink/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* The island: one element that grows in place (pill -> panel). Radius is
          constant rounded-3xl — reads as a pill when short (radius > half-height)
          and a rounded panel when tall. Width grows a little, height a lot. */}
        <motion.div
          initial={{ width: WIDTH_COLLAPSED }}
          animate={{ width: open ? WIDTH_EXPANDED : WIDTH_COLLAPSED }}
          transition={{
            duration: reduceMotion ? 0 : MORPH_DURATION,
            ease: EASE,
          }}
          className="pointer-events-auto max-w-[92vw] overflow-hidden rounded-3xl bg-ink text-bg"
        >
          {/* Top padding grows on expand so the logo sits at the same ~24px
            inset as the panel's sides/bottom; collapsed stays compact. */}
          <div
            className={`relative flex items-center justify-between gap-4 px-6 pb-2 transition-[padding] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
              open ? "pt-6" : "pt-2"
            }`}
          >
            {/* Logo sits above the toggle and links home instead of toggling.
                The _ is red branding, but painting it red HERE would invert to
                cyan under the master trail (this whole subtree sits below z-60).
                So while the menu is closed it inherits the neutral pill color and
                the z-70 ghost outside the header paints the red on top; while the
                menu is open (ghost + trail both hidden) it flips to accent. */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                scrollToTop();
              }}
              aria-label="zngiron — back to top"
              className="relative z-10 cursor-pointer rounded-sm font-mono text-base font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              zg<span className={open ? "text-accent" : undefined}>_</span>
            </button>

            {/* Full-row toggle: clicking anywhere on the top bar (except the logo)
              opens/closes the menu. */}
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="absolute inset-0 cursor-pointer rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />

            {/* Right group: the decorative = / x menu glyph. Sits above the
              full-row menu button (z-10) but is pointer-events-none so its
              clicks fall through to the menu button. (The theme switcher moved
              to a standalone upper-left control — see theme-toggle.tsx.) */}
            <div className="relative z-10 flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`pointer-events-none grid size-4 place-items-center transition-colors duration-300 ${
                  open ? "text-bg" : "text-bg/70"
                }`}
              >
                <motion.span
                  className="absolute h-[1.5px] w-[15px] rounded-full bg-current"
                  initial={false}
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -2.5 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute h-[1.5px] w-[15px] rounded-full bg-current"
                  initial={false}
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 2.5 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
                />
              </span>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={menuId}
                ref={menuRef}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : MORPH_DURATION,
                  ease: EASE,
                }}
                className="overflow-hidden"
              >
                {/* px-6 matches the top-bar padding so labels line up with the
                  logo (left) and indices with the toggle (right). Equal ~24px
                  inset on all sides of the expanded panel; dividers are
                  full-bleed; spacing is padding-only (no margins) so the
                  height animation can't jump. */}
                <nav aria-label="Primary" className="px-6 pb-3">
                  <ul>
                    {navItems.map((item) => (
                      <NavRow
                        key={item.id}
                        item={item}
                        isActive={activeId === item.id}
                        reduceMotion={reduceMotion ?? false}
                        onSelect={() => setOpen(false)}
                      />
                    ))}
                  </ul>
                </nav>

                <div aria-hidden="true" className="border-t border-bg/15" />

                <div className="px-6 pt-3 pb-3">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-bg/40">
                    CONNECT_
                  </p>
                  <ul className="pt-2">
                    {connectLinks.map((item) => (
                      <ConnectRow
                        key={item.id}
                        item={item}
                        reduceMotion={reduceMotion ?? false}
                      />
                    ))}
                  </ul>
                </div>

                {cv && (
                  <>
                    <div aria-hidden="true" className="border-t border-bg/15" />
                    <div className="px-6 pt-3 pb-6">
                      <ul>
                        <ConnectRow
                          item={cv}
                          reduceMotion={reduceMotion ?? false}
                        />
                      </ul>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      {/* Logo-underscore ghost: the red _ is branding and must never invert, but
          the pill lives in the header's z-50 stacking context — nothing inside it
          can climb above the master ink trail (z-60). So a pixel-identical ghost
          sits OUTSIDE the header at z-70, mirroring the collapsed pill's centered
          wrapper + inset ("zg" transparent, only the _ painted red over the real
          one). Hidden while the menu is open/morphing via [data-logo-ghost] in
          globals.css — the trail is hidden then too, so the real _ stays red. */}
      <div
        aria-hidden="true"
        data-logo-ghost=""
        className="pointer-events-none fixed inset-x-0 top-0 z-70 flex justify-center px-4 pt-4"
      >
        <div className="w-56 max-w-[92vw] px-6 pt-2 pb-2">
          <span className="font-mono text-base font-semibold tracking-tight text-transparent">
            zg<span className="text-accent">_</span>
          </span>
        </div>
      </div>
    </>
  );
}
