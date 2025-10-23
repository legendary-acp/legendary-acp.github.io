interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 md:px-6 pt-8">
      <h1 className="text-4xl font-semibold text-slate-900 mb-3 tracking-tight">
        {title}
      </h1>
      <p className="text-[17px] text-slate-600 leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    </section>
  );
}
