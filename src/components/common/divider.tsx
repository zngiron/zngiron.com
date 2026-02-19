import type { ReactElement } from 'react';

import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps): ReactElement {
  return <div className={cn('h-px w-full bg-border', className)} />;
}
