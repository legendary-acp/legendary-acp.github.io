import SectionHeader from "../shared/SectionHeader";
import skills from "../../data/skills.json";
import { Chips } from "../shared/Chip";

export default function SkillsSection() {
  const { bars, groups, dual } = skills;

  return (
    <section className="mt-12">
      <SectionHeader
        label="Craft & tools"
        title="Technical Skills"
        subtitle="Languages, frameworks and technologies I enjoy working with"
      />
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Languages (bars) */}
        <Card title={bars.title}>
          <ul className="space-y-4">
            {bars.items.map((b) => (
              <li key={b.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{b.name}</span>
                  <span className="text-slate-500">
                    {b.label}
                    {b.note && "*"}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 mt-2">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${b.level}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {bars.items.some((i) => i.note) && (
            <p className="text-xs text-slate-500 mt-4">
              * Actively learning and deepening expertise.
            </p>
          )}
        </Card>

        {/* Domain Expertise */}
        <Card title={groups.title}>
          <div className="grid sm:grid-cols-2 gap-6">
            {groups.items.map((g) => (
              <div key={g.title}>
                <p className="text-sm font-semibold mb-2">{g.title}</p>
                <Chips items={g.skills} />
              </div>
            ))}
          </div>
        </Card>

        {/* Bottom dual card */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{dual.left.title}</h3>
              <Chips items={dual.left.skills} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{dual.right.title}</h3>
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
    <div className="rounded-2xl bg-white border border-slate-200 p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
