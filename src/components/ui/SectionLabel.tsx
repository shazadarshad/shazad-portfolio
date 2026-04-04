interface SectionLabelProps {
  number: string;
  label?: string;
  className?: string;
}

export default function SectionLabel({ number, label, className = "" }: SectionLabelProps) {
  return (
    <p className={`section__label ${className}`}>
      <span aria-hidden="true">◆</span>
      {label ?? number}
    </p>
  );
}
