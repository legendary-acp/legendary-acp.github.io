export default function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <span
          key={i}
          className="
        inline-block select-none
        rounded-full border border-slate-200
        bg-slate-50 px-2 py-1
        text-xs font-medium leading-[1.2] text-slate-700
        align-middle whitespace-nowrap
      "
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </span>
      ))}
    </div>
  );
}
