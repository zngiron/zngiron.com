"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { GLYPHS, useScramble } from "@/components/header/use-scramble";

// One-shot terminal decode on mount, replayed on hover. Reuses the header's
// useScramble hook. Reduced motion shows the final text immediately (no
// scramble, no replay). Hover-only by design — the replay is decorative, so it
// stays off the keyboard tab order.
export function ScrambleText({
  text,
  pool = GLYPHS,
  className,
}: {
  text: string;
  pool?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(false);

  // Trigger the decode once, after mount.
  useEffect(() => {
    setActive(true);
  }, []);

  // Re-glitch on hover: drop to the resolved text for a frame, then scramble
  // again (flipping `active` off→on restarts the hook).
  const replay = () => {
    if (reduceMotion) return;
    setActive(false);
    requestAnimationFrame(() => setActive(true));
  };

  const display = useScramble(text, active, !reduceMotion, pool);
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover-only replay, no semantics needed
    <span className={className} onMouseEnter={replay}>
      {display}
    </span>
  );
}
