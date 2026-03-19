type Props = {
  label: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ label, title, subtitle }: Props) {
  return (
    <div className="mb-4">
      <div className="inline-block text-[11px] uppercase tracking-wider font-mono text-muted border border-default-2 rounded-md px-2 py-0.5 mb-1.5">
        {label}
      </div>
      <h2 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted text-sm md:text-base">{subtitle}</p>
      )}
    </div>
  );
}
