"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

// Vector line-art portrait. lineart.svg is currentColor paths on a transparent
// background, used here as a mask over the `mute` token so it reads at the same
// spec-chrome tone as the ruler/labels — crisp at any size and theme-aware.
// Rendered below the trail (z-10) so the ink trail inverts it like the rest of
// the UI. Parallax drift on scroll.
const MASK = {
  WebkitMaskImage: "url(/lineart.svg)",
  maskImage: "url(/lineart.svg)",
  WebkitMaskSize: "cover",
  maskSize: "cover",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
} as const;

export function PortraitLineArt() {
  const reduce = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -90]);

  return (
    <motion.div
      style={{ y }}
      className="relative h-full w-full overflow-hidden"
    >
      <div
        role="img"
        aria-label="Ziedrick Ruen Giron"
        className="h-full w-full bg-mute"
        style={MASK}
      />
      <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] text-mute">
        fig.01 / portrait
      </span>
    </motion.div>
  );
}
