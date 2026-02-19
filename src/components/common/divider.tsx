import type { ReactElement } from 'react';

import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps): ReactElement {
  return <div className={cn('bg-border h-px w-full', className)} />;
}
