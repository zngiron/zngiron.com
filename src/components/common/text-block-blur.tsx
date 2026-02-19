import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface TextBlockBlurProps {
  children: ReactNode;
  className?: string;
}

export function TextBlockBlur({ children, className }: TextBlockBlurProps) {
  return (
    <div className={cn('backdrop-blur-xl bg-black/80 flex items-center justify-center p-2', className)}>{children}</div>
  );
}
