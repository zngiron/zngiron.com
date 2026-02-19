import type { ReactElement, ReactNode } from 'react';

import { gridColumns } from '@/components/common/grid';

import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  minHeightClassName?: string;
}

export function Container({ children, className, minHeightClassName = 'min-h-[900px]' }: ContainerProps): ReactElement {
  return (
    <div className={cn('relative z-10', gridColumns, 'content-center py-20', minHeightClassName, className)}>
      {children}
    </div>
  );
}
