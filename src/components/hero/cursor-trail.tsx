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

// Organic inverted ink trail. A dense chain of blobs follows the pointer at a
// smooth gradient of spring rates, so consecutive blobs overlap and the goo
// filter melts them into one continuous, fluid ink stream (metaball necks
// rather than separate circles). mix-blend-difference inverts what's beneath.
// Idle behavior is an ink retract: reform quick on movement, shrink back to
// nothing (slow) when the pointer holds still — no opacity fade, the inversion
// stays full strength until the ink pulls in. z-20 keeps it below the name's
// red cursor and the portrait (z-30). Native cursor stays visible; reduced
// motion disables it.

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

export function CursorTrail() {
  const reduce = useReducedMotion() ?? false;
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  // presence 0..1 drives blob scale only. Quick ease-in on the first move
  // (ink reforms), slow ease-out after the pointer holds still (ink retracts).
  const presence = useMotionValue(0);
  const moving = useRef(false);

  useEffect(() => {
    if (reduce) return;
    let idle: ReturnType<typeof setTimeout>;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
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
  }, [reduce, x, y, presence]);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20"
      style={{ mixBlendMode: "difference", filter: "url(#trail-goo)" }}
    >
      <svg className="absolute h-0 w-0">
        <title>cursor trail filter</title>
        <defs>
          <filter id="trail-goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="18"
              result="blur"
            />
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
