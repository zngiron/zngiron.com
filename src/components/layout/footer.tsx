import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className="relative w-full">
      <div className={cn('relative z-10', 'grid gap-6 px-6 py-6', 'grid-cols-2', 'sm:grid-cols-4', 'lg:grid-cols-12')}>
        <p className="col-span-full text-xs font-normal text-foreground">&copy; 2025 Zuen Giron</p>
      </div>
    </footer>
  );
}
