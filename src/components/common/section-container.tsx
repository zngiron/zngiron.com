import type { ReactElement, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  minHeightClassName?: string;
}

export function SectionContainer({
  children,
  className,
  minHeightClassName = 'min-h-[900px]',
}: SectionContainerProps): ReactElement {
  return (
    <div
      className={cn(
        'relative z-10',
        'grid content-center gap-6 px-6 py-20',
        'grid-cols-2',
        'sm:grid-cols-4',
        'lg:grid-cols-12',
        minHeightClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
