'use client';

import type { CSSProperties, ReactNode } from 'react';

import { useEffect, useRef } from 'react';

import { useReducedMotion } from 'motion/react';

import { cn } from '@/lib/utils';

const TOTAL_COLUMNS = 12;
const GLOW_RADIUS = 200;

function getColumnVisibility(index: number): string {
  if (index < 2) return '';
  if (index < 4) return 'hidden sm:block';
  return 'hidden lg:block';
}

function GridColumns(): ReactNode {
  const columns = Array.from({ length: TOTAL_COLUMNS }, (_, index) => `column-${index + 1}`);

  return (
    <>
      {columns.map((columnClass, index) => (
        <div
          key={columnClass}
          className={cn('border-x border-border', getColumnVisibility(index))}
        />
      ))}
    </>
  );
}

const gridClasses = cn('absolute inset-0', 'grid grid-cols-2 gap-6 px-6', 'sm:grid-cols-4', 'lg:grid-cols-12');

export function GridBackground(): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent): void => {
      container.style.setProperty('--mouse-x', `${e.clientX}px`);
      container.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handleMouseLeave = (): void => {
      container.style.setProperty('--mouse-x', '-1000px');
      container.style.setProperty('--mouse-y', '-1000px');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ '--mouse-x': '-1000px', '--mouse-y': '-1000px' } as CSSProperties}
    >
      <div className={cn(gridClasses, 'opacity-[0.3]')}>
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
