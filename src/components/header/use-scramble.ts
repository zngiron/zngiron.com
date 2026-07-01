"use client";

import { useEffect, useState } from "react";

// Digits + the underscore motif — the pool the number scrambles through.
const POOL = "0123456789_";
// Symbol/glyph pool for text labels — the terminal noise the words decode
// through (keeps the `_` identity motif). A mix of ASCII punctuation and
// dingbats (geometric shapes, dagger, reference mark, braille texture) for the
// same churn as Motion's scramble demo. Use in place of latin letters.
export const GLYPHS = "!?<>/[]{}()=+*^#%&@~|;:.,_-$†‡※○●□■◆◇▪⣿⡿";
const TICK_MS = 40;
// Ticks every char scrambles before the wave reaches it (even the center).
const BASE_TICKS = 2;
// Extra ticks of delay per character-step away from the center.
const TICKS_PER_STEP = 2;

// Terminal-style decode with a center-out ripple: while `active`, every char
// cycles random glyphs and locks in the target, resolving from the middle
// outward (both edges land last, symmetrically) — like Motion's
// scramble-text-stagger-center. `enabled=false` (e.g. reduced motion) shows
// the target immediately.
export function useScramble(
  target: string,
  active: boolean,
  enabled = true,
  pool = POOL,
): string {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!active || !enabled) {
      setDisplay(target);
      return;
    }

    // Tick at which each char stops scrambling, keyed by distance to center.
    const center = (target.length - 1) / 2;
    const revealAt = Array.from(target, (_, i) =>
      Math.round(BASE_TICKS + Math.abs(i - center) * TICKS_PER_STEP),
    );
    const lastTick = revealAt.length ? Math.max(...revealAt) : 0;

    let counter = 0;
    const id = setInterval(() => {
      let out = "";
      for (let i = 0; i < target.length; i++) {
        const char = target[i];
        // Whitespace never scrambles — keeps words from smearing together.
        out +=
          counter >= revealAt[i] || char === " "
            ? char
            : pool[Math.floor(Math.random() * pool.length)];
      }
      setDisplay(out);
      if (counter >= lastTick) {
        setDisplay(target);
        clearInterval(id);
      }
      counter += 1;
    }, TICK_MS);

    return () => clearInterval(id);
  }, [target, active, enabled, pool]);

  return display;
}
