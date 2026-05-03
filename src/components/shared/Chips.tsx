export default function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <span
          key={i}
          className="
        inline-block select-none
        rounded border border-default-2
        bg-surface-2 px-2.5 py-0.5
        text-xs font-medium leading-[1.2] text-muted
        align-middle whitespace-nowrap
      "
        >
          {s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      ))}
    </div>
  );
}
