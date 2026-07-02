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
  // presence 0..1 drives blob scale: an eased grow on movement, then a slow
  // lingering retract on idle so the blot holds its shape a beat before melting.
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
        // Slower grow-in so the blot swells up rather than popping into place.
        animate(presence, 1, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
      }
      clearTimeout(idle);
      idle = setTimeout(() => {
        moving.current = false;
        // Longer, gentle retract so the shape lingers before it melts away.
        animate(presence, 0, { duration: 2.6, ease: [0.4, 0, 0.2, 1] });
      }, 300);
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
      data-ink-trail=""
      className={className}
      style={{ mixBlendMode: "difference", filter: `url(#${filterId})` }}
    >
      <svg className="absolute h-0 w-0">
        <title>ink trail filter</title>
        <defs>
          <filter id={filterId}>
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
