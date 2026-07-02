# Design — Cursor-origin theme switcher + blob-reactive header

**Date:** 2026-07-01
**Status:** Approved, pending implementation plan
**Scope:** One implementation plan.

## Summary

Add a light/dark switcher to `zngiron.com`. Toggling flips `data-theme` on `<html>`
via an expanding circular reveal that grows from the pointer outward until the new
theme covers the viewport. The toggle is a sun/moon glyph added to the header pill.
In the same effort, fix the existing bug where the inverted ink-trail "blob" cannot
react to (invert) the header, by giving the header its own scoped blob layer.

## Context (as-built)

- Theme is driven by `data-theme` on `<html>` (default `light`, hardcoded in
  `src/app/layout.tsx`). Tokens live in `@theme` in `src/app/globals.css`; dark
  values override under `[data-theme="dark"]`. Toggle UI does not exist yet.
- The "blob" is `CursorTrail` (`src/components/hero/cursor-trail.tsx`): a chain of
  white blobs + `mix-blend-difference` + an SVG goo filter (`#trail-goo`), rendered
  `fixed inset-0 z-20`. It inverts whatever is painted *behind* it. Mounted inside
  the hero `<section>` in `src/app/page.tsx` (viewport-wide via `fixed`).
- The hero deliberately layers around the blob's z-20: grid / paper / ink-identity
  sit **below** (z-0/z-10) and invert; the red `_` ghost and the line-art portrait
  sit **above** (z-30) and must **never** invert (brand rule: red is reserved for
  the `_` and status; the portrait stays theme-gray).
- The header (`src/components/header/header.tsx`) is `fixed … z-50`, `bg-ink text-bg`
  (inverted chrome). Top bar: logo (left, `relative z-10`, `stopPropagation`), a
  full-row `absolute inset-0` toggle button that opens/closes the menu, and a
  decorative `=`/x glyph (right, `pointer-events-none z-10`). Menu morph:
  `duration 0.5s`, ease `cubic-bezier(0.65,0,0.35,1)`.

## Root cause of the blob/header bug

`mix-blend-difference` only inverts content painted *behind* the element in the same
stacking context. The blob is z-20; the header is z-50 (painted on top) — so the blob
physically cannot touch it.

Raising the blob above the header is not viable: the required z-order is
self-contradictory. The blob must be **above** the header (to invert it) but **below**
the red `_`/portrait (z-30, to leave them uninverted), while the header must be
**above** the red `_`/portrait (menu renders on top). No single stacking order
satisfies all three. The resolution is a **separate, isolated** blob instance scoped
to the header.

## Design

### Unit 1 — `<InkTrail>` reusable component

Extract the blob field from `cursor-trail.tsx` into a reusable presentational
component so it can be mounted in two independent, isolated contexts.

- **What it does:** renders the blob chain + goo filter and tracks the global pointer,
  reforming on movement and retracting when idle (current behavior, unchanged).
- **Interface / props:**
  - `filterId: string` — unique SVG filter id (SVG filter ids are global; two
    `#trail-goo` would collide). Each mount passes its own.
  - `active?: boolean` (default `true`) — when `false`, the trail retracts/does not
    render blobs (used to suppress the header trail while the menu is open).
  - Positioning is controlled by the caller's wrapper, not the component.
- **Depends on:** `motion` (springs/motion values), `useReducedMotion`. Returns `null`
  under reduced motion (as today).
- **Behavior preserved:** spring gradient, `presence` reform/retract timing, goo
  filter matrix, `bg-white` blobs. `mix-blend-difference` is applied by the wrapper,
  not baked into the component, so each context can isolate its own blend.

### Unit 2 — Hero usage (unchanged look)

`page.tsx` mounts `<InkTrail>` full-screen exactly as today: a `fixed inset-0 z-20`
wrapper carrying `mixBlendMode: difference`. Visual result identical to current
`CursorTrail`. The old `cursor-trail.tsx` is replaced by this thinner wrapper +
`InkTrail`.

### Unit 3 — Header-scoped blob (the bug fix)

Inside the header pill's morphing `motion.div` (which already has `overflow-hidden
rounded-3xl`), add an isolated blob layer:

- `isolation: isolate` on the pill's morphing `motion.div` scopes any blend to the
  pill only, so the header blob inverts **just the pill**, never the hero's red
  `_`/portrait (and never anything behind the pill).
- The blob layer itself is the pill's **topmost** child: `absolute inset-0`,
  `pointer-events-none`, `mixBlendMode: difference`, z above the pill content
  (logo/glyphs are `z-10`, so the layer sits at e.g. `z-20` within the pill). Being
  above the text is required for a *full* pill inversion: difference then flips both
  the `bg-ink` background (→ light) and the `text-bg` text (→ dark) together. If the
  blob sat below the text, only the background would invert and the light text would
  vanish against it. `pointer-events-none` lets clicks pass through to the controls.
- Coordinates: the blob positions use viewport `clientX/clientY`, but the layer is
  `absolute` inside the pill box. Translate to pill-local coordinates by subtracting
  the pill's `getBoundingClientRect()` origin on pointer move (rAF-throttled; one
  element, negligible cost). This keeps the blob aligned to the real cursor as the
  pill morphs (width 224↔384, height grows) and on scroll.
- `overflow-hidden` on the pill clips the goo to the rounded shape automatically.
- Result: as the cursor crosses the pill, the pill inverts under the blob, matching
  the hero's ink aesthetic.
- **Menu open:** pass `active={!open}` so the header blob retracts while the menu is
  open (avoids smearing menu text). The Header already owns `open`; no cross-component
  wiring needed.

### Unit 4 — Theme controller (`use-theme` hook)

A small client hook in `src/components/theme/`.

- **What it does:** reads current theme from `document.documentElement.dataset.theme`,
  exposes `{ theme, toggle }`.
- `toggle(event)`:
  1. compute next theme (`light`↔`dark`);
  2. persist to `localStorage` (`theme` key);
  3. if `prefers-reduced-motion: reduce` or `document.startViewTransition` is
     unavailable → set `data-theme` immediately and return;
  4. else set `--vt-x`/`--vt-y` on `<html>` from `event.clientX/clientY`, then
     `document.startViewTransition(() => { set data-theme })`.
- **Depends on:** DOM only (no external state lib). Icon state derives from `theme`.

### Unit 5 — View-transition CSS (`globals.css`)

Under `@media (prefers-reduced-motion: no-preference)`:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-new(root) {
  animation: theme-reveal 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 1; /* new grows over old */
}
@keyframes theme-reveal {
  from { clip-path: circle(0 at var(--vt-x, 50%) var(--vt-y, 50%)); }
  to   { clip-path: circle(150vmax at var(--vt-x, 50%) var(--vt-y, 50%)); }
}
```

`150vmax` guarantees full coverage from any origin. Exact API syntax to be verified
against current docs before coding.

### Unit 6 — Toggle glyph in the pill

- Add a Phosphor `SunIcon`/`MoonIcon` button (`weight="thin"`, ~16px) just left of the
  `=` glyph, grouped right-aligned.
- `relative z-10 pointer-events-auto`, `onClick` calls `stopPropagation()` then
  `toggle(e)` — so it switches theme without triggering the full-row menu button
  underneath (same pattern as the logo).
- Icon cross-fades/rotates between sun and moon via `motion`; instant swap under
  reduced motion.
- Color `text-bg/70 hover:text-bg` to match the `=` glyph. `aria-label`
  ("Switch to dark theme" / "Switch to light theme") and
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`.
- The reveal origin is this button's click coordinates — i.e. from the cursor, as
  specified.

### Unit 7 — No-FOUC bootstrap + first-visit default

- Inline script in `<head>` (`layout.tsx`), runs before first paint:
  `stored theme → else prefers-color-scheme → else light`; sets `data-theme` on
  `<html>`. SSR attribute stays `data-theme="light"`.
- This overrides the hardcoded SSR default on the client pre-paint, so the persisted
  or system choice never flashes.

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Toggle placement | New sun/moon glyph in the pill | User choice; reachable without opening the menu. |
| Blob/header bug | Fix in this effort | User choice. |
| Reveal tech | View Transitions API + clip-path circle | Native, no deps, degrades to instant swap. |
| First-visit default | stored → system → light | Respects OS setting on first load, then explicit choice. |
| Header blob while menu open | Suppressed (`active={!open}`) | Avoids smearing menu text; no cross-component wiring. |
| Header reaction approach | Separate isolated blob in the pill | Only stacking-safe way to invert the header without inverting the hero's protected red `_`/portrait. |

## Accessibility / motion

- Reveal and icon morph both honor `prefers-reduced-motion` (instant swap, no
  animation). Blob remains disabled under reduced motion (unchanged).
- Toggle has a real `aria-label` and visible focus ring.

## Testing

- Toggle flips theme; reveal grows from the click point to full coverage.
- Reduced-motion: instant swap, no clip animation.
- Reload preserves the chosen theme with no flash of the wrong theme.
- First visit with no stored pref follows the OS `prefers-color-scheme`.
- Hero look unchanged; red `_` and portrait never invert under the blob.
- Header pill inverts under the blob as the cursor crosses it; header blob retracts
  while the menu is open.

## Out of scope

- Reworking the hero's z-layering or the global blob into a single topmost layer.
- Persisting theme server-side / per-account (localStorage only).

## Follow-ups to docs

- Update `DESIGN.md`: remove "Toggle UI is not built yet"; add a Decisions Log entry
  for the switcher, cursor-origin reveal, and header-scoped blob.
