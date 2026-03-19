export default function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <span
          key={i}
          className="
        inline-block select-none
        rounded-full border border-slate-300
        bg-white px-3 py-1
        text-xs font-medium leading-[1.2] text-slate-600
        shadow-sm align-middle whitespace-nowrap
      "
        >
          {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      ))}
    </div>
  );
}
