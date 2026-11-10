export type FilterOption = { value: string; label: string }

export function FilterChips({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: FilterOption[]
  value: string
  onChange: (value: string) => void
  ariaLabel: string
}) {
  return (
    <div
      className="flex flex-wrap snap-x gap-1 rounded-3xl bg-stone-100 p-2 shadow-lg"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <button
          key={option.value}
          className={`min-h-10 shrink-0 snap-start whitespace-nowrap rounded-full px-3 text-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${value === option.value ? "bg-emerald-700 font-semibold text-white" : "text-stone-600 hover:bg-stone-200"}`}
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
