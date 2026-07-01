"use client";

import { useEffect, useState } from "react";

// Digits + the underscore motif — the pool the number scrambles through.
const POOL = "0123456789_";
const TICK_MS = 45;
const TICKS_PER_CHAR = 3;

// Terminal-style decode: while `active`, the text cycles random glyphs and
// locks in the target one char at a time, left to right. `enabled=false`
// (e.g. reduced motion) shows the target immediately.
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

    let counter = 0;
    const id = setInterval(() => {
      const revealed = Math.floor(counter / TICKS_PER_CHAR);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        out +=
          i < revealed
            ? target[i]
            : pool[Math.floor(Math.random() * pool.length)];
      }
      setDisplay(out);
      counter += 1;
      if (revealed >= target.length) {
        setDisplay(target);
        clearInterval(id);
      }
    }, TICK_MS);

    return () => clearInterval(id);
  }, [target, active, enabled, pool]);

  return display;
}
