import { useEffect, useState } from "react";
import SectionHeader from "../shared/SectionHeader";
import skills from "../../data/skills.json";
import Chips from "../shared/Chips";

export default function SkillsSection() {
  const { bars, groups, dual } = skills;
  const accentDots = ["bg-brand", "bg-fluent-blue", "bg-fluent-green", "bg-fluent-yellow"];
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mt-12">
      <SectionHeader
        label="Craft & tools"
        title="Technical Skills"
        subtitle="Languages, frameworks and technologies I enjoy working with"
      />
      <div className="grid lg:grid-cols-2 gap-8">
        <Card title={bars.title}>
          <ul className="space-y-5">
            {bars.items.map((b, i) => (
              <li key={b.name}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-secondary">
                    {b.name}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-mono text-tertiary">
                    {b.label}
                    {b.note && <span className="text-brand">*</span>}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full bg-surface-2 mt-2 overflow-hidden"
                  role="progressbar"
                  aria-label={`${b.name} proficiency: ${b.label}`}
                  aria-valuenow={b.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400 transition-[width] duration-1000 ease-out"
                    style={{
                      width: animated ? `${b.level}%` : "0%",
                      transitionDelay: `${i * 90}ms`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {bars.items.some((i) => i.note) && (
            <p className="text-xs text-tertiary mt-4">
              * Actively learning and deepening expertise.
            </p>
          )}
        </Card>

        <Card title={groups.title}>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
            {groups.items.map((g, i) => (
              <div key={g.title}>
                <div className="flex items-center gap-2 mb-2.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${accentDots[i % accentDots.length]}`}
                  />
                  <p className="text-[11px] uppercase tracking-wider font-mono text-tertiary">
                    {g.title}
                  </p>
                </div>
                <Chips items={g.skills} />
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 rounded-2xl bg-surface border border-default p-6 shadow-xs hover:shadow-md transition-shadow duration-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-fluent-red" />
                <h3 className="text-base font-semibold text-primary">
                  {dual.left.title}
                </h3>
              </div>
              <Chips items={dual.left.skills} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                <h3 className="text-base font-semibold text-primary">
                  {dual.right.title}
                </h3>
              </div>
              <Chips items={dual.right.skills} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-surface border border-default p-6 shadow-xs hover:shadow-md transition-shadow duration-200">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      {children}
    </div>
  );
}
