import SectionHeader from "../shared/SectionHeader";
import roles from "../../data/career.json";
import Chips from "../shared/Chips";

export default function CareerTimelineSection() {
  return (
    <section className="mt-12">
      <SectionHeader
        label="Grow in public"
        title="Career timeline"
        subtitle="Roles that shaped my journey in systems, observability, and performance engineering."
      />

      <div className="relative mt-8">
        <div className="space-y-10 relative">
          {roles.map((r, i) => (
            <div key={i} className="relative flex gap-6 items-start">
              {i !== roles.length - 1 && (
                <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-blue-600/50 h-[calc(100%+2.5rem)]"></div>
              )}
              <div className="relative z-10 left-4 top-0 bottom-0">
                <div className="w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-950 shadow-md"></div>
              </div>
              <div className="flex-1 bg-surface border border-default rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-semibold text-primary">
                    {r.title}{" "}
                    <span className="text-blue-700">@ {r.company}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-tertiary mt-1 sm:mt-0">
                    {r.period}
                  </p>
                </div>
                <p className="mt-2 text-sm text-secondary">{r.desc}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Chips items={r.skills} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
