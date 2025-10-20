export function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s) => (
        <Chip key={s} text={s} />
      ))}
    </div>
  );
}

export default function Chip({ text }: { text: string }) {
  return (
    <span
      className="
        inline-block select-none
        rounded-full border border-slate-200
        bg-slate-50 px-2 py-1
        text-xs font-medium leading-[1.2] text-slate-700
        align-middle whitespace-nowrap
      "
    >
      {text}
    </span>
  );
}
