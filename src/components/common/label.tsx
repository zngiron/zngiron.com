import type { ReactElement } from 'react';

interface LabelProps {
  number: string;
  title: string;
}

export function Label({ number, title }: LabelProps): ReactElement {
  return (
    <h2 className="text-xs font-medium text-foreground">
      {number} — {title}
    </h2>
  );
}
