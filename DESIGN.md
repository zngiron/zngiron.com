# Design System — zngiron.com

> Source of truth for every visual and UI decision in this repo. Read this before
> writing UI. Values here must match `src/app/globals.css` (`@theme`) and the
> component conventions below. Deeper rationale lives in the design consultation
> archive: `~/.gstack/projects/zngiron.com/2026-07-01-design-zngiron-com.md`.

## Product Context

- **What this is:** Ziedrick "Zuen" Giron's personal portfolio — a forwardable `zngiron.com` link pasted to recruiters, clients, and collaborators. It must land in ~8 seconds and survive being skimmed.
- **Who it's for:** three readers, one page. Recruiters (skim to slot: 17 yrs, senior design + senior front-end, React/Next). Clients / Cuida (trust the craft). Peers (respect + remember the taste).
- **Space/industry:** senior product designer + front-end engineer portfolio.
- **Project type:** single-page marketing/editorial site (App Router, mostly static).
- **The memorable thing:** *the site itself is the proof he designs AND engineers.* A template would contradict the pitch. Every decision serves this.

## Aesthetic Direction

- **Direction:** Industrial / spec-chrome minimal. Terminal + technical-drawing cues (section numbers, coordinates, hairline frames, the `_` cursor).
- **Decoration level:** minimal — typography and whitespace do the work; one subtle hero dot-field is the only ambient texture.
- **Mood:** restrained, precise, confident. Instantly legible up top, more alive as you scroll.
- **Signature interaction:** **grayscale → color.** The entire UI is grayscale; color enters *only* through the work imagery, which blooms to full color on hover/`:focus`. The frame never changes; the work is the only thing that "turns on." This visually separates the designer's restraint from the range of the work.

## Identity

- **The mark is the underscore `_`** — terminal cursor (code) + the blank waiting to be designed (design).
- **Logo:** `zg_` — lowercase, JetBrains Mono, tight tracking, **red underscore**. Lowercase so the `g` can never misread as `C`.
- **Name:** title case "Ziedrick Ruen Giron" (nickname Zuen). The underscore recurs: `Ziedrick Ruen Giron_`, the blinking hero cursor, section labels (`001_identity`, `002_work`).
- **Location motif:** Manila, Philippines · `14°35′N 120°59′E` as recurring spec chrome.

## Typography

- **Display + UI:** **General Sans** (Fontshare) — clean neutral grotesk, sharp terminals + rounded bowls. Self-hosted variable woff2 via `next/font/local` (`src/app/fonts/general-sans-variable.woff2`, weight range `200 700`). CSS var `--font-general-sans` → Tailwind `--font-sans` → utility `font-sans`.
- **Annotations / coordinates / logo / section labels:** **JetBrains Mono** — via `next/font/google` (auto self-hosted). CSS var `--font-jetbrains-mono` → `--font-mono` → utility `font-mono`.
- **No system-ui / Inter / Arial as display or body.** (Arial only survives as the last-resort fallback in the body `font-family` stack.)
- **Both self-hosted** to kill the network-font flash.
- **Scale (Tailwind defaults, applied intentionally):** hero `text-5xl`→`text-7xl` `font-semibold tracking-tight`; section headings `text-3xl`→`text-4xl` `font-medium`; nav items `text-2xl font-medium`; body `text-base`/`text-lg`; spec labels + indices `font-mono text-xs`, letter-tracked.

## Color

Monochrome chrome, color from the work. Tokens live in `@theme` in `src/app/globals.css`; dark values override under `[data-theme="dark"]`. Utilities: `bg-bg`, `text-ink`, `text-mute`, `border-line`, `text-accent`, `bg-panel`, `text-panel-ink`.

| Token (`--color-*`) | Utility stem | Light | Dark | Meaning |
|---|---|---|---|---|
| `bg` | `bg-bg` | `#f4f3ef` | `#0c0c0d` | paper / page background |
| `ink` | `text-ink` | `#0f0f0f` | `#e9e7e1` | primary text |
| `mute` | `text-mute` | `#8a8a83` | `#6f6d68` | secondary text, labels |
| `line` | `border-line` | `#dcdbd3` | `#26262a` | hairlines, dividers |
| `accent` | `text-accent` | `#e4322b` | `#e4322b` | red — the `_` + status only |
| `panel` | `bg-panel` | `#111113` | `#111113` | reserved dark surface (currently unused — the CTA moved to inverted chrome, see below) |

> **Inverted chrome:** the header (pill + menu), the hero CTA, and any element that should read as the opposite of the page uses the `ink`/`bg` pair (`bg-ink` + `text-bg`). Because `ink` and `bg` swap values across themes, this auto-inverts: dark chrome on light pages, light chrome on dark. Inside inverted surfaces, use `bg`-alpha for hairlines/hovers (`border-bg/15`, `hover:bg-bg/5`), never hardcoded `white/…`. Do NOT use the constant `panel` for surfaces that must stay visible in both themes — it disappears against the dark page bg (that bug is why the CTA moved to `ink`/`bg`).

> **No shadows.** Separate surfaces with color contrast and hairline borders (`border-line`), not drop shadows. The *only* permitted shadow is a light surface sitting on a light background (white-on-white) where contrast alone can't separate them. Never shadow a dark element on a light page.
| `panel-ink` | `text-panel-ink` | `#e9e7e1` | `#e9e7e1` | text on panel |

- **Approach:** restrained. Grayscale + a single red.
- **Red usage rule:** the accent appears in ~2 places only — the `_` cursor and the `[ available ]` status (+ subtle link/hover/focus states). It must **never** compete with the work's color.
- **Dark mode:** one `data-theme` flip (default `light` on `<html>`). Panel + accent stay constant; only bg/ink/mute/line change. Dark is the "system/terminal" theme — a free peer flex. Toggle is a standalone spec-chip button fixed to the **upper-right corner** (`src/components/theme/theme-toggle.tsx`): sun/moon icon + hairline divider + a visible mono **`T`** kbd hint, bound to the bare **`T` key** (no modifiers; ignored while typing in fields/contenteditable). Switching runs a circular reveal via the View Transitions API — from the click point, or from the button when keyboard-triggered. Initial theme resolves stored → system `prefers-color-scheme` → light, applied pre-paint by a `<head>` inline script (no flash).

## Spacing

- **Base unit:** 4px (Tailwind default scale).
- **Density:** comfortable-to-spacious. Sections are full-height (`min-h-screen`), generous gutters (`px-6 sm:px-12`).
- **Scale:** Tailwind `1`(4) `2`(8) `3`(12) `4`(16) `6`(24) `8`(32) `12`(48) `16`(64). Prefer these steps; don't invent arbitrary values.
- **Padding ratio — horizontal = 2–3× vertical.** Buttons use 1:2 (`py-2 px-4`); panel/menu **chrome inset** uses 1:3 (`py-2 px-6`) for more horizontal breathing. Trim height by lowering `py`; `px` follows the ratio.
- **Align inner items to the chrome inset.** Nav rows and the CONNECT block share the top-bar's horizontal padding (`px-6`) so labels line up with the logo (left) and indices/close line up on the right. Don't add extra per-item horizontal insets.
- **Standard menu widths:** collapsed pill `224px` (w-56), expanded panel `384px` (w-96).
- **Panel vertical rhythm:** expanded panel keeps an **equal ~24px inset** on all sides (matches `px-6`); dividers are **full-bleed** (edge to edge) with `12px` (space-3) on both sides. Collapsed pill stays compact — the top inset is the **top bar's `pt` animating** from `8px` (collapsed) to `24px` (expanded, above the logo). Don't put a top gap above the first nav item; it grows in during the height animation and shoves the content.
- **Panel spacing is padding-only, never margins.** Margins (`mt-*`) collapse/jump inside a `height: auto` animation and shove the content. Use `pt-*`/`pb-*` on the sections instead.

## Layout

- **Approach:** editorial single-page. Numbered sections `001`–`006` (site order, not data order): `001_identity` (hero) · `002 Work` · `003 About` · `004 Experience` · `005 Projects` · `006 Contact`. Biggest move: **Work at #2** — lead with color, not bio.
- **Navigation:** fixed centered **pill** (`zg_` left, `=` toggle right) that **grows in place** into the menu — one element morphs (border-radius pill→rounded-rect + height grows down), yeqq.com.tr-style, not a separate dropdown. Built with `motion` (no Radix). **Inverted chrome:** the pill/panel always render as the *opposite* of the page — `bg-ink` / `text-bg`, which flip across themes (dark chrome on light pages, light chrome on dark). See `src/components/header/`.
- **Chrome:** hairline inset frames (`border-line`), `00N_label` section captions in mono, Manila coordinates as recurring motif. Persistent `let's work together` CTA + `available for select work` status are global chrome (later spec).
- **Anchors under the fixed pill:** `html { scroll-behavior: smooth; scroll-padding-top: 5.5rem }` so targets clear the pill (`scroll-behavior: auto` under reduced-motion).
- **Max content width:** hero/sections run wide with gutters; content blocks cap around `max-w-3xl` where reading matters (tune per section).

## Motion

- **Approach:** intentional. Motion aids comprehension and adds restraint-with-personality; never decorative.
- **Library:** `motion` (Framer Motion successor). Menu expand, grayscale→color, scroll reveals.
- **Menu expand default:** `duration 0.22s`, ease `[0.22, 1, 0.36, 1]` (ease-out), origin-top scale+fade.
- **Terminal cursor motif:** interactive text (nav items on hover/focus) reveals a blinking red `_` cursor after the label (`animate-blink`, defined in globals.css) — the identity glyph awaiting input. Reduced motion shows it static (no blink). Reuse this for any "awaiting input" affordance.
- **Master ink trail:** ONE global `InkTrail` (`src/components/common/ink-trail.tsx`, mounted in `layout.tsx` at `z-60`) — a goo-filtered `mix-blend-difference` blob chain following the pointer ABOVE all chrome including the header (`z-50`), so the whole page inverts uniformly under it (dark blot on light, light blot on dark). Never add a second scoped trail — the split-trail approach was tried and reverted (inconsistent inversion). Timings: grow-in `0.6s`, retract `2.6s` after `300ms` idle. It hides (via `<html>` attrs + globals.css) during theme switches (`data-theme-switching`) and while the menu is open (`data-menu-open`).
- **Red never inverts:** every red `_` is branding and must stay red under the trail. Difference-blend turns accent red cyan, so protected glyphs use pixel-identical **ghost overlays at `z-70`** (above the trail): the hero identity ghost (`page.tsx`) and the header logo-underscore ghost (`header.tsx`, real `_` inherits the pill color while closed). Any new red glyph must either sit above `z-60` or get a ghost.
- **Reduced motion is non-negotiable:** every animated component honors `prefers-reduced-motion` (`useReducedMotion` or `motion-reduce:`) — opacity-only or instant, and `scroll-behavior: auto`.

## Iconography

- **Library: Phosphor** (`@phosphor-icons/react`), always `weight="thin"` to match the hairline/underscore aesthetic. Import icons directly (`import { EqualsIcon } from "@phosphor-icons/react"`); `next.config.ts` `optimizePackageImports` tree-shakes to only what's used. Icons inherit `currentColor`, so color them with `text-*` token utilities on the parent. In Server Components import from `@phosphor-icons/react/ssr`.
- **Current glyphs:** `SunIcon`/`MoonIcon` (theme switcher), `ArrowUpRightIcon` (external link), `ArrowDownIcon` (download). The menu `=`/`x` is two hand-drawn animated bars (motion spans), not an icon. Prefer thin-weight Phosphor for any new glyph before hand-rolling SVG.
- **Lucide is rejected** (too common). Brand marks (GitHub/LinkedIn/X): simple-icons only if/when needed (Phosphor's brand set is fine too).

## Accessibility (non-negotiable — it's a UX designer's site)

- Grayscale→color also fires on keyboard `:focus`, not just hover.
- Visible focus rings everywhere: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`.
- The menu disclosure handles Esc-to-close, outside-click-to-close, focus-into-menu on open, and return-focus-to-trigger on close, with ARIA (`aria-expanded`/`aria-controls`). (Hard focus-trap is a known follow-up; Radix Dialog/FocusScope can add it if needed.)
- Real `alt` text on imagery; `aria-current` on the active nav item.
- Respect `prefers-reduced-motion` in every animation and scroll.
- Protect LCP: `next/image` lazy-load for color shots; he cares about Core Web Vitals.

## Tech Stack

- **Next.js 16 (App Router) + TypeScript** — RSC for static spec content; `'use client'` only where needed (menu, future canvas/carousel).
- **Tailwind CSS v4** — CSS-first, tokens in `@theme` (`src/app/globals.css`). No `tailwind.config`.
- **Biome** — lint + format (`npm run lint` / `npm run format`).
- **Radix primitives, à la carte** — reserved for future needs (contact form, any true modal dialog). The header menu is custom `motion`, not Radix. The site is ~90% custom.
- **motion** — animation. **next/font** — self-hosted General Sans + JetBrains Mono. **next/image** — lazy color shots.

## Code Conventions

- **Filenames: lowercase kebab-case.** `header.tsx`, `arrow-external.tsx`, `use-active-section.ts`. Components still export PascalCase (`Header`, `ArrowExternal`).
- **Structure:** feature components in `src/components/<feature>/` (component + colocated data + hooks); shared icons in `src/components/icons/`.
- **Style with tokens, not raw hex.** Reach for `bg-bg`/`text-ink`/`border-line`/`bg-panel`/`text-accent`, not `#…`. New colors go through `@theme`.
- **`cn()` from `@/lib/utils`** (clsx + tailwind-merge) for conditional or multi-category class lists; plain `className` for simple static ones. When using `cn()`, one string per category in order: position/z → box (flex/grid/size/gap/p/m/border/rounded) → bg/type → animation → interactivity → responsive → dark.
- **`size-*` when width = height** (`size-8`, not `w-8 h-8`); standard utilities over arbitrary values.
- **Import alias:** `@/*` → `src/*`.
- **A11y and reduced-motion are part of "done," not a follow-up.**

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-01 | Design system formalized into repo `DESIGN.md` | Standardize the locked direction + shipped tokens so code and doc agree; created by /design-consultation from the 2026-07-01 design doc + built header/scaffold. |
| 2026-07-01 | Monochrome chrome, color only from the work; single red accent | Separates the designer's restraint from the range of the work; makes "designs + engineers" thesis literal. |
| 2026-07-01 | General Sans (display/UI) + JetBrains Mono (labels), both self-hosted | Clean neutral grotesk over techy/default options; mono carries the terminal/spec motif; self-host kills font flash. |
| 2026-07-01 | Nav = centered pill → dark Radix Popover panel; single-page `001–006` anchors, Work at #2 | "Pill + expanded menu" brief; lead with color/proof, not bio; Radix for a11y. |
| 2026-07-01 | Lowercase kebab-case filenames as project convention | Consistency across every component going forward. |
| 2026-07-01 | Light/dark toggle = sun/moon glyph in the pill; cursor-origin circular reveal (View Transitions API) | Reachable without opening the menu; the reveal grows from the click, reinforcing the tactile/terminal feel. Native API, no new deps, degrades to instant swap under reduced motion. |
| 2026-07-01 | ~~Header reacts to the ink blob via a pill-scoped, isolated second `InkTrail`~~ (superseded 2026-07-02) | A single blob can't be both above the header (to invert it) and below the hero's red `_`/portrait (to spare them); an isolated pill-scoped copy resolves the stacking conflict. |
| 2026-07-01 | Initial theme resolves stored → system → light, applied by a pre-paint `<head>` script | Respects the visitor's OS setting on first load, then their explicit choice; the inline script kills the theme flash. |
| 2026-07-02 | ONE master `InkTrail` in `layout.tsx` at `z-60`, above the header — supersedes the pill-scoped second trail | Split trails inverted inconsistently (isolated pill vs raw multi-layer composite); a single blob above everything inverts the whole page uniformly. Protected glyphs solve the stacking conflict with `z-70` ghosts instead. |
| 2026-07-02 | All red underscores protected from inversion via `z-70` ghost overlays | The red `_` is branding; difference-blend turns it cyan. Hero identity ghost + header logo ghost keep it red under the blob in every state. |
| 2026-07-02 | Hero CTA switched from constant `bg-panel` to inverted chrome (`bg-ink`/`text-bg`) | Panel (`#111113`) was near-invisible against the dark page bg (`#0c0c0d`) — the CTA didn't react to theme. Ink/bg flips with the theme; the type-cursor `▋` stays. Panel token reserved, currently unused. |
| 2026-07-02 | Theme switcher = standalone upper-right spec-chip (icon + visible `T` hint) + bare `T` shortcut; removed from the pill | Reachable without the menu and without the mouse; the visible kbd hint teaches the shortcut; keyboard toggles originate the circular reveal from the button. Bare key guarded against modifiers and form fields. |
| 2026-07-02 | Ink-trail timing: grow `0.6s`, retract `2.6s` after `300ms` idle; trail hides while the menu is open | Slower swell reads as ink, not a pop; longer retract retains the blot. Instant hide on menu open is masked by the 0.5s panel morph and guarantees the nav is never obscured. |
