import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge class names with Tailwind conflict resolution.
// Use for conditional / multi-category classes; plain className otherwise.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
