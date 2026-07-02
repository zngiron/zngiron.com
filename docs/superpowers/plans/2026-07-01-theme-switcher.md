# Cursor-origin Theme Switcher + Blob-reactive Header — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a light/dark switcher that reveals the new theme with a circle growing from the pointer, expose it as a sun/moon glyph in the header pill, and fix the bug where the ink-trail blob can't invert the header.

**Architecture:** Extract the hero blob into a reusable `<InkTrail>` mounted in two isolated contexts (full-screen hero + a pill-scoped copy so the header inverts under the blob without touching the hero's protected red `_`/portrait). Theme is a `data-theme` attribute on `<html>`, flipped inside `document.startViewTransition()` with a Web Animations API clip-path circle from the click point; a `<head>` inline script applies the persisted/system theme before first paint.

**Tech Stack:** Next.js 16.2 (App Router), React 19.2 (React Compiler on), Tailwind v4 (`@theme` tokens), `motion` v12, `@phosphor-icons/react` v2, Biome, bun. Package manager is **bun**.

## Global Constraints

- Filenames lowercase kebab-case; components export PascalCase. Import alias `@/*` → `src/*`.
- Style with `@theme` tokens only (`bg-bg`, `text-ink`, `text-bg`, `bg-ink`, `border-line`, `text-accent`), never raw hex. Inside inverted (`bg-ink`) chrome use `bg`-alpha (`text-bg/70`, `border-bg/15`), never `white/…`.
- Icons: Phosphor, `weight="thin"`, size via `size={…}`, import directly from `@phosphor-icons/react`.
- Motion default for this feature: `duration 0.5` / `0.3`, ease `cubic-bezier(0.65,0,0.35,1)` (matches the menu morph). Every animation honors `prefers-reduced-motion` (instant/opacity-only).
- Accessibility: real `aria-label`, focus ring `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`.
- No test runner exists; do not add one. Per-task gates are `bun run lint`, `bun run build`, and the manual browser checks written into each task.
- Commit after each task.

---

## File Structure

- Create `src/components/common/ink-trail.tsx` — reusable blob field (`<InkTrail>`), owns pointer tracking + unique goo filter; caller positions/blends via `className`.
- Rewrite `src/components/hero/cursor-trail.tsx` — thin hero wrapper around `<InkTrail>` (keeps `page.tsx` import stable). Visual parity with today.
- Create `src/components/theme/use-theme.ts` — `useTheme()` hook: current theme + cursor-origin `toggle`.
- Create `src/components/theme/theme-toggle.tsx` — `<ThemeToggle>` sun/moon button.
- Modify `src/components/header/header.tsx` — mount `<ThemeToggle>` in the pill; add pill-scoped `<InkTrail active={!open}>`; add `isolate` to the pill.
- Modify `src/app/layout.tsx` — `suppressHydrationWarning` on `<html>` + `<head>` inline theme script.
- Modify `src/app/globals.css` — disable the default view-transition cross-fade.
- Modify `DESIGN.md` — mark toggle built; add Decisions Log rows.

---

### Task 1: Reusable `<InkTrail>` + hero refactor (visual parity)

**Files:**
- Create: `src/components/common/ink-trail.tsx`
- Rewrite: `src/components/hero/cursor-trail.tsx`
- Reference (unchanged): `src/app/page.tsx:40` mounts `<CursorTrail />`

**Interfaces:**
- Produces: `InkTrail({ filterId: string, active?: boolean, className?: string }): JSX.Element | null` — renders a pointer-following goo blob field; `className` positions/sizes the blended container; `filterId` must be unique per mount; `active=false` retracts the blobs and stops tracking; returns `null` under reduced motion.
- Produces: `CursorTrail(): JSX.Element` — unchanged public API, still imported by `page.tsx`.

- [ ] **Step 1: Create `src/components/common/ink-trail.tsx`**

```tsx
"use client";

import {
  animate,
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef } from "react";

// Organic inverted ink trail: a dense chain of blobs follows the pointer at a
// gradient of spring rates so consecutive blobs overlap and the goo filter melts
// them into one continuous fluid stream. The caller owns positioning + z via
// `className`; this owns the blend (mix-blend-difference), a uniquely-id'd goo
// filter, and pointer tracking. Positions are reported in CONTAINER-LOCAL
// coordinates (client coords minus the container's rect), so the same component
// works full-viewport (hero) or offset inside the header pill.

const BLOBS = [
  { size: 300, spring: { stiffness: 600, damping: 44 } },
  { size: 282, spring: { stiffness: 460, damping: 44 } },
  { size: 262, spring: { stiffness: 350, damping: 45 } },
  { size: 240, spring: { stiffness: 270, damping: 45 } },
  { size: 216, spring: { stiffness: 205, damping: 46 } },
  { size: 190, spring: { stiffness: 155, damping: 46 } },
  { size: 164, spring: { stiffness: 115, damping: 47 } },
  { size: 138, spring: { stiffness: 85, damping: 48 } },
  { size: 112, spring: { stiffness: 60, damping: 50 } },
];

function Blob({
  size,
  spring,
  x,
  y,
  presence,
}: {
  size: number;
  spring: { stiffness: number; damping: number };
  x: MotionValue<number>;
  y: MotionValue<number>;
  presence: MotionValue<number>;
}) {
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  return (
    <motion.span
      style={{
        x: sx,
        y: sy,
        scale: presence,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      className="absolute top-0 left-0 rounded-full bg-white"
    />
  );
}

export function InkTrail({
  filterId,
  active = true,
  className,
}: {
  filterId: string;
  active?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  // presence 0..1 drives blob scale: quick reform on movement, slow retract on idle.
  const presence = useMotionValue(0);
  const moving = useRef(false);

  useEffect(() => {
    if (reduce) return;
    // Suppressed (e.g. menu open): retract and stop tracking.
    if (!active) {
      moving.current = false;
      animate(presence, 0, { duration: 0.4, ease: [0.4, 0, 0.2, 1] });
      return;
    }
    let idle: ReturnType<typeof setTimeout>;
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      x.set(e.clientX - (rect?.left ?? 0));
      y.set(e.clientY - (rect?.top ?? 0));
      if (!moving.current) {
        moving.current = true;
        animate(presence, 1, { duration: 0.35, ease: "easeOut" });
      }
      clearTimeout(idle);
      idle = setTimeout(() => {
        moving.current = false;
        animate(presence, 0, { duration: 1.8, ease: [0.4, 0, 0.2, 1] });
      }, 220);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(idle);
    };
  }, [reduce, active, x, y, presence]);

  if (reduce) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{ mixBlendMode: "difference", filter: `url(#${filterId})` }}
    >
      <svg className="absolute h-0 w-0">
        <title>ink trail filter</title>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      {BLOBS.map((b) => (
        <Blob
          key={b.size}
          size={b.size}
          spring={b.spring}
          x={x}
          y={y}
          presence={presence}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `src/components/hero/cursor-trail.tsx` to use `<InkTrail>`**

Replace the entire file with:

```tsx
"use client";

import { InkTrail } from "@/components/common/ink-trail";

// Hero ink trail: full-viewport inverted goo following the pointer. z-20 keeps it
// below the red _ cursor and portrait (z-30) and above the grid/paper/ink layers
// (z-0/z-10) which invert as it passes. Disabled under reduced motion.
export function CursorTrail() {
  return (
    <InkTrail
      filterId="trail-goo-hero"
      className="pointer-events-none fixed inset-0 z-20"
    />
  );
}
```

- [ ] **Step 3: Lint**

Run: `bun run lint`
Expected: no errors for `ink-trail.tsx` / `cursor-trail.tsx`.

- [ ] **Step 4: Build (typecheck)**

Run: `bun run build`
Expected: build succeeds.

- [ ] **Step 5: Manual visual-parity check**

Run: `bun run dev`, open the hero, move the mouse.
Expected: the inverting goo trail behaves exactly as before this task (reform on move, slow retract on idle, inverts grid/ink but never the red `_` or portrait). Toggle OS reduced-motion → no trail.

- [ ] **Step 6: Commit**

```bash
git add src/components/common/ink-trail.tsx src/components/hero/cursor-trail.tsx
git commit -m "refactor(hero): extract reusable InkTrail from cursor-trail"
```

---

### Task 2: No-flash theme bootstrap

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `<html data-theme>` is set before first paint to `localStorage.theme` → else system `prefers-color-scheme` → else `light`. `localStorage` key is `"theme"` with values `"light" | "dark"` (consumed by Task 3).

- [ ] **Step 1: Add `suppressHydrationWarning` + head script in `src/app/layout.tsx`**

In the `<html>` element (currently lines 41-45) add `suppressHydrationWarning`, and insert a `<head>` with the inline script before `<body>`. The element becomes:

```tsx
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${generalSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          // Applies the persisted/system theme before first paint (no flash).
          // stored -> system -> light. See DESIGN.md §Color.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Header />
        {children}
      </body>
    </html>
```

- [ ] **Step 2: Lint + build**

Run: `bun run lint && bun run build`
Expected: both succeed (Biome permits `dangerouslySetInnerHTML` here; if it flags the `<script>`, it is the documented Next.js no-flash pattern — leave as-is).

- [ ] **Step 3: Manual no-flash check**

Run: `bun run dev`. In DevTools console: `localStorage.setItem("theme","dark")`, then hard-reload.
Expected: page renders dark immediately with **no** light flash. `localStorage.removeItem("theme")` + set OS to dark + reload → dark. Set OS to light + reload → light. No hydration error in console.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(theme): apply persisted/system theme before first paint"
```

---

### Task 3: `useTheme` hook (cursor-origin reveal) + view-transition CSS

**Files:**
- Create: `src/components/theme/use-theme.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `data-theme` on `<html>` and `localStorage.theme` (Task 2).
- Produces: `useTheme(): { theme: "light" | "dark"; toggle: (e: { clientX: number; clientY: number }) => void }`. `toggle` flips + persists the theme; under reduced motion or unsupported browsers it swaps instantly, otherwise it runs a `startViewTransition` with a WAAPI clip-path circle growing from `(clientX, clientY)`.

- [ ] **Step 1: Create `src/components/theme/use-theme.ts`**

```ts
"use client";

import { useCallback, useState } from "react";

type Theme = "light" | "dark";

// startViewTransition may be missing from the ambient DOM types depending on the
// TS lib version, so narrow it locally instead of augmenting globals.
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

function currentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function useTheme() {
  // Initialized from the DOM, which the head script set before paint.
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const toggle = useCallback((e: { clientX: number; clientY: number }) => {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {}

    const apply = () => {
      document.documentElement.setAttribute("data-theme", next);
      setTheme(next);
    };

    const doc = document as ViewTransitionDocument;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !doc.startViewTransition) {
      apply();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    // Distance from the click to the furthest viewport corner = final radius.
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = doc.startViewTransition(apply);
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  }, []);

  return { theme, toggle };
}
```

- [ ] **Step 2: Disable the default cross-fade in `src/app/globals.css`**

Append to the end of the file:

```css
/* Theme switch reveal: the cursor-origin clip-path circle (animated in JS via the
   Web Animations API) is the only motion — kill the UA default cross-fade so the
   old theme stays put while the new one circles in over it. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
```

- [ ] **Step 3: Lint + build**

Run: `bun run lint && bun run build`
Expected: both succeed (the local `ViewTransitionDocument` type keeps TS happy).

- [ ] **Step 4: Commit** (no UI wires to it yet — verified end-to-end in Task 4)

```bash
git add src/components/theme/use-theme.ts src/app/globals.css
git commit -m "feat(theme): cursor-origin view-transition toggle hook"
```

---

### Task 4: `<ThemeToggle>` glyph in the pill

**Files:**
- Create: `src/components/theme/theme-toggle.tsx`
- Modify: `src/components/header/header.tsx`

**Interfaces:**
- Consumes: `useTheme()` (Task 3).
- Produces: `ThemeToggle(): JSX.Element` — a sun/moon button that `stopPropagation`s (so it never opens the menu) and calls `toggle(e)` with the click coords. Mounted in the header pill's right group.

- [ ] **Step 1: Create `src/components/theme/theme-toggle.tsx`**

```tsx
"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/components/theme/use-theme";

const EASE = [0.65, 0, 0.35, 1] as const;

// Sun/moon toggle living in the header pill. Sits above the full-row menu button
// (relative z-10) and stops propagation so a click flips the theme instead of
// opening the menu. The reveal originates from this click, i.e. from the cursor.
// suppressHydrationWarning: the head script may have set a theme different from
// the SSR default, so the client's first icon can differ from the server's.
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion() ?? false;
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggle(e);
      }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      suppressHydrationWarning
      className="relative z-10 grid size-4 cursor-pointer place-items-center rounded-sm text-bg/70 transition-colors hover:text-bg focus-visible:text-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
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
    </button>
  );
}
```

- [ ] **Step 2: Wire `<ThemeToggle>` into the pill in `src/components/header/header.tsx`**

Add the import near the other imports (after line 4):

```tsx
import { ThemeToggle } from "@/components/theme/theme-toggle";
```

Then group the toggle with the existing `=`/x glyph. Replace the decorative glyph `<span aria-hidden="true" …>` block (currently lines 220-238) so it is wrapped in a right-aligned flex group with the toggle in front of it:

```tsx
          {/* Right group: theme toggle + the decorative = / x menu glyph. Both
              sit above the full-row menu button (z-10); the toggle stops
              propagation, the glyph is pointer-events-none so its clicks fall
              through to the menu button. */}
          <div className="relative z-10 flex items-center gap-3">
            <ThemeToggle />
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
```

Note: the glyph `<span>` loses its own `relative z-10` (the wrapping group now carries `relative z-10`); it keeps `pointer-events-none`. The wrapper's `gap-3` seats the sun/moon just left of the glyph, still flush-right against the `px-6` inset.

- [ ] **Step 3: Lint + build**

Run: `bun run lint && bun run build`
Expected: both succeed.

- [ ] **Step 4: Manual end-to-end reveal check**

Run: `bun run dev`.
Expected:
- A sun (light theme) / moon (dark theme) sits just left of the `=` glyph in the pill.
- Clicking it flips the theme with a circle growing from the cursor to full coverage; it does **not** open the menu.
- Clicking the rest of the top bar still opens the menu.
- Reload preserves the theme (Task 2).
- OS reduced-motion → instant swap, no circle; icon swaps without rotate.
- Keyboard: Tab reaches the toggle, focus ring shows, Enter toggles.

- [ ] **Step 5: Commit**

```bash
git add src/components/theme/theme-toggle.tsx src/components/header/header.tsx
git commit -m "feat(header): sun/moon theme toggle with cursor-origin reveal"
```

---

### Task 5: Blob-reactive header (pill-scoped `<InkTrail>`)

**Files:**
- Modify: `src/components/header/header.tsx`

**Interfaces:**
- Consumes: `InkTrail` (Task 1), the header's existing `open` state.
- Produces: the pill inverts under the pointer via an isolated, pill-scoped blob layer that retracts while the menu is open.

- [ ] **Step 1: Import `InkTrail` in `src/components/header/header.tsx`**

Add near the other imports:

```tsx
import { InkTrail } from "@/components/common/ink-trail";
```

- [ ] **Step 2: Isolate the pill and add the scoped blob layer**

On the morphing pill `motion.div` (currently line 183) add `isolate` to scope the blend to the pill:

```tsx
        className="pointer-events-auto isolate max-w-[92vw] overflow-hidden rounded-3xl bg-ink text-bg"
```

Then, as the **last child inside** that `motion.div` (immediately before its closing `</motion.div>` at line 307, i.e. after the `<AnimatePresence>…</AnimatePresence>` menu block), add:

```tsx
        {/* Pill-scoped ink blob: a second InkTrail whose blend is confined to the
            pill by `isolate` above, so the blob inverts the pill under the pointer
            without touching the hero's protected red _ / portrait. z-20 puts it
            over the pill content (logo/glyphs are z-10) so BOTH the bg-ink surface
            and the text invert together. Retracts while the menu is open. */}
        <InkTrail
          filterId="trail-goo-header"
          active={!open}
          className="pointer-events-none absolute inset-0 z-20"
        />
```

- [ ] **Step 3: Lint + build**

Run: `bun run lint && bun run build`
Expected: both succeed.

- [ ] **Step 4: Manual header-inversion check**

Run: `bun run dev`.
Expected:
- Moving the cursor across the collapsed pill inverts the pill under the blob (dark surface → light, light text → dark), matching the hero ink aesthetic, clipped to the rounded pill.
- The hero's red `_` and portrait still never invert (unchanged from Task 1).
- Opening the menu retracts the header blob (no goo smearing the menu text); closing it restores the effect.
- OS reduced-motion → no header blob.
- The theme toggle and menu still work (Task 4 unaffected).

- [ ] **Step 5: Commit**

```bash
git add src/components/header/header.tsx
git commit -m "fix(header): pill-scoped ink blob so the header reacts to the cursor"
```

---

### Task 6: Documentation

**Files:**
- Modify: `DESIGN.md`

- [ ] **Step 1: Update the dark-mode note in `DESIGN.md`**

Replace the sentence in the Color section (line 58) that reads:

```
- **Dark mode:** one `data-theme` flip (default `light` on `<html>`). Panel + accent stay constant; only bg/ink/mute/line change. Dark is the "system/terminal" theme — a free peer flex. Toggle UI is not built yet (tokens are wired for it).
```

with:

```
- **Dark mode:** one `data-theme` flip (default `light` on `<html>`). Panel + accent stay constant; only bg/ink/mute/line change. Dark is the "system/terminal" theme — a free peer flex. Toggle is a sun/moon glyph in the pill (`src/components/theme/`); switching runs a cursor-origin circular reveal via the View Transitions API. Initial theme resolves stored → system `prefers-color-scheme` → light, applied pre-paint by a `<head>` inline script (no flash).
```

- [ ] **Step 2: Add Decisions Log rows in `DESIGN.md`**

Append these rows to the Decisions Log table (after the last row, line 128):

```
| 2026-07-01 | Light/dark toggle = sun/moon glyph in the pill; cursor-origin circular reveal (View Transitions API) | Reachable without opening the menu; the reveal grows from the click, reinforcing the tactile/terminal feel. Native API, no new deps, degrades to instant swap under reduced motion. |
| 2026-07-01 | Header reacts to the ink blob via a pill-scoped, isolated second `InkTrail` | A single blob can't be both above the header (to invert it) and below the hero's red `_`/portrait (to spare them); an isolated pill-scoped copy resolves the stacking conflict. |
| 2026-07-01 | Initial theme resolves stored → system → light, applied by a pre-paint `<head>` script | Respects the visitor's OS setting on first load, then their explicit choice; the inline script kills the theme flash. |
```

- [ ] **Step 3: Commit**

```bash
git add DESIGN.md
git commit -m "docs: record theme switcher + blob-reactive header decisions"
```

---

## Self-Review

**Spec coverage:**
- Unit 1 `<InkTrail>` → Task 1. Unit 2 hero usage → Task 1. Unit 3 header-scoped blob (isolated, above content, `active={!open}`) → Task 5. Unit 4 `use-theme` → Task 3. Unit 5 view-transition CSS → Task 3 (implemented via WAAPI per verified MDN docs instead of the spec's CSS-var keyframe; disable-fade CSS retained). Unit 6 toggle glyph → Task 4. Unit 7 no-FOUC + first-visit default → Task 2. Decisions/testing/follow-ups → Tasks 2-6 + Task 6 docs. No gaps.
- Deviation from spec, intentional: the reveal is driven by the Web Animations API (`document.documentElement.animate(..., { pseudoElement: "::view-transition-new(root)" })`) with an exact `Math.hypot` end-radius — the current MDN-documented pattern — rather than the spec's CSS `--vt-x/--vt-y` + `circle(150vmax)` keyframe. Same visual result, exact coverage, no CSS vars. globals.css only disables the default cross-fade.

**Placeholder scan:** No TBD/TODO/"handle edge cases"/"similar to Task N". Every code step shows full code.

**Type consistency:** `InkTrail({ filterId, active, className })` defined in Task 1 and consumed identically in Tasks 1/5. `useTheme(): { theme, toggle }` defined in Task 3, consumed in Task 4. `toggle(e)` takes `{ clientX, clientY }`; `ThemeToggle`'s `onClick(e)` (a `React.MouseEvent`) satisfies it. `localStorage` key `"theme"` and values `"light"|"dark"` match across Tasks 2/3. `filterId` values `"trail-goo-hero"` (Task 1) and `"trail-goo-header"` (Task 5) are distinct. `EASE`/`cubic-bezier(0.65,0,0.35,1)` consistent across Tasks 3/4 and the existing header.
