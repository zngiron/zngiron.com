import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared section head: `00N_id` spec kicker, display headline, optional
// right-aligned mono meta readout — hairline-ruled like a drawing title block.
export function SectionHeading({
  index,
  id,
  title,
  meta,
  className,
}: {
  index: string;
  id: string;
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-line border-b pb-4",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <p className="font-mono text-xs tracking-wide text-mute">
          {index}_{id}
        </p>
        <h2 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
      </div>
      {meta && (
        <div className="font-mono text-xs tracking-wide text-mute">{meta}</div>
      )}
    </div>
  );
}
