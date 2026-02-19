interface SectionLabelProps {
  number: string;
  title: string;
}

export function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <p className="text-xs font-medium text-foreground">
      {number} — {title}
    </p>
  );
}
