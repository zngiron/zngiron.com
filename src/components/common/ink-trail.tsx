"use client";

import {
  animate,
  type MotionValue,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// Organic inverted ink trail: a dense chain of blobs follows the pointer at a
// gradient of spring rates so consecutive blobs overlap and the goo filter melts
// them into one continuous fluid stream. The caller owns positioning + z via
// `className`; this owns the blend (mix-blend-difference), a uniquely-id'd goo
// filter, and pointer tracking. Positions are reported in CONTAINER-LOCAL
// coordinates (client coords minus the container's rect), so the same component
// works full-viewport (hero) or offset inside the header pill.
//
// Residue: the stream sheds small droplets from its tail while moving, and the
// idle retract breaks off a few larger blots around the resting point. Droplets
// rise lava-lamp style with a sinusoidal sway and dissolve by scaling to 0 —
// never by fading opacity, which snaps out through the goo filter's alpha
// threshold instead of melting.

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

const MAX_DROPS = 12;

type Drop = {
  id: number;
  x: number;
  y: number;
  size: number;
  rise: number;
  sway: number;
  life: number;
};

function Droplet({
  drop,
  onDone,
}: {
  drop: Drop;
  onDone: (id: number) => void;
}) {
  const { id, x, y, size, rise, sway, life } = drop;
  return (
    <motion.span
      initial={{ x, y, scale: 1 }}
      animate={{
        x: [x, x + sway, x - sway * 0.6, x],
        y: y - rise,
        // Hold near-full size for most of the life, then collapse: the goo
        // threshold stops resolving disks under ~41px (see filter note below),
        // so a long slow shrink would spend seconds as sub-threshold blur.
        scale: [1, 0.95, 0],
      }}
      transition={{
        duration: life,
        ease: "easeOut",
        x: { duration: life, times: [0, 0.35, 0.7, 1], ease: "easeInOut" },
        scale: { duration: life, times: [0, 0.75, 1], ease: "easeIn" },
      }}
      onAnimationComplete={() => onDone(id)}
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
      }}
      className="absolute top-0 left-0 rounded-full bg-white"
    />
  );
}

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

  // Residue droplets. Tail springs mirror the laggiest blob so shed droplets
  // detach where the stream actually is, letting the goo filter pinch them off.
  const tailSpring = BLOBS[BLOBS.length - 1].spring;
  const tailX = useSpring(x, tailSpring);
  const tailY = useSpring(y, tailSpring);
  const [drops, setDrops] = useState<Drop[]>([]);
  const nextDropId = useRef(0);
  const lastShed = useRef(0);
  const shedInterval = useRef(200);

  const removeDrop = useCallback((id: number) => {
    setDrops((prev) => prev.filter((d) => d.id !== id));
  }, []);

  useEffect(() => {
    if (reduce) return;
    // Suppressed (e.g. menu open): retract and stop tracking (droplets already
    // in flight finish out under the container-level CSS hide).
    if (!active) {
      moving.current = false;
      animate(presence, 0, { duration: 0.4, ease: [0.4, 0, 0.2, 1] });
      return;
    }
    const spawn = (
      px: number,
      py: number,
      minSize: number,
      maxSize: number,
    ) => {
      setDrops((prev) => {
        if (prev.length >= MAX_DROPS) return prev;
        return [
          ...prev,
          {
            id: nextDropId.current++,
            x: px,
            y: py,
            size: minSize + Math.random() * (maxSize - minSize),
            rise: 80 + Math.random() * 80,
            sway: (6 + Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1),
            life: 4 + Math.random() * 2,
          },
        ];
      });
    };
    let idle: ReturnType<typeof setTimeout>;
    const onMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      x.set(e.clientX - (rect?.left ?? 0));
      y.set(e.clientY - (rect?.top ?? 0));
      if (!moving.current) {
        moving.current = true;
        // Slower grow-in so the blot swells up rather than popping into place.
        animate(presence, 1, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
      } else if (presence.get() > 0.5) {
        // Shed a droplet from the tail — only once the blot has mass, so
        // residue never pops in from nothing. Droplet sizes must clear the goo
        // filter's hardening limit: the 18px blur + alpha threshold can't
        // resolve disks under ~41px, they render as pure blur haze.
        const now = performance.now();
        if (now - lastShed.current > shedInterval.current) {
          lastShed.current = now;
          shedInterval.current = 150 + Math.random() * 100;
          spawn(tailX.get(), tailY.get(), 44, 68);
        }
      }
      clearTimeout(idle);
      idle = setTimeout(() => {
        moving.current = false;
        // Longer, gentle retract so the shape lingers before it melts away.
        animate(presence, 0, { duration: 2.6, ease: [0.4, 0, 0.2, 1] });
        // The drying blot breaks into a few larger residue blots.
        const count = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) {
          spawn(
            x.get() + (Math.random() * 80 - 40),
            y.get() + (Math.random() * 80 - 40),
            56,
            88,
          );
        }
      }, 300);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearTimeout(idle);
    };
  }, [reduce, active, x, y, presence, tailX, tailY]);

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
      {drops.map((d) => (
        <Droplet key={d.id} drop={d} onDone={removeDrop} />
      ))}
    </div>
  );
}
