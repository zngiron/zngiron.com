"use client";

import { useReducedMotion } from "motion/react";
import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const TOTAL_COLUMNS = 12;
const GLOW_RADIUS = 200;

// Shared responsive column grid — 2 cols mobile, 4 at sm, 12 at lg.
export const gridColumns = cn(
  "grid grid-cols-2 gap-6 px-6",
  "sm:grid-cols-4",
  "lg:grid-cols-12",
);

function getColumnVisibility(index: number): string {
  if (index < 2) return "";
  if (index < 4) return "hidden sm:block";
  return "hidden lg:block";
}

function GridColumns(): ReactNode {
  const columns = Array.from(
    { length: TOTAL_COLUMNS },
    (_, index) => `column-${index + 1}`,
  );

  return (
    <>
      {columns.map((key, index) => (
        <div
          key={key}
          className={cn("border-line border-x", getColumnVisibility(index))}
        />
      ))}
    </>
  );
}

const gridClasses = cn("absolute inset-0", gridColumns);

// Fixed hairline column backdrop. The columns sit faint; a radial mask reveals
// them near the cursor so the grid "breathes." Disabled under reduced motion.
export function GridBackground(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let rafId = 0;

    const handleMouseMove = (e: MouseEvent): void => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        container.style.setProperty("--mouse-x", `${e.clientX}px`);
        container.style.setProperty("--mouse-y", `${e.clientY}px`);
      });
    };

    const handleMouseLeave = (): void => {
      cancelAnimationFrame(rafId);
      container.style.setProperty("--mouse-x", "-1000px");
      container.style.setProperty("--mouse-y", "-1000px");
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
      style={
        { "--mouse-x": "-1000px", "--mouse-y": "-1000px" } as CSSProperties
      }
    >
      <div className={cn(gridClasses, "opacity-30")}>
        <GridColumns />
      </div>

      {!shouldReduceMotion && (
        <div
          className={gridClasses}
          style={{
            maskImage: `radial-gradient(circle ${GLOW_RADIUS}px at var(--mouse-x) var(--mouse-y), black, transparent)`,
            WebkitMaskImage: `radial-gradient(circle ${GLOW_RADIUS}px at var(--mouse-x) var(--mouse-y), black, transparent)`,
          }}
        >
          <GridColumns />
        </div>
      )}
    </div>
  );
}
