import { Apple, ArrowDownRight, ArrowUpRight, Carrot, CookingPot, Drumstick, Fish, Leaf, Minus, Wheat } from "lucide-react"
import type { Commodity } from "../../app/types"

type ForecastItemCardProps = {
  item: Commodity
  predictedPrice: number
  changePercent: number
}

const categoryLabels: Record<string, string> = {
  Vegetables: "Gulay",
  Spices: "Pampalasa",
  Rice: "Bigas",
  Fish: "Isda",
  Meat: "Karne",
}

const categoryDetails: Record<string, { icon: typeof Leaf; color: string }> = {
  Vegetables: { icon: Carrot, color: "bg-emerald-50 text-emerald-700" },
  Spices: { icon: CookingPot, color: "bg-amber-50 text-amber-700" },
  Rice: { icon: Wheat, color: "bg-yellow-50 text-yellow-700" },
  Fish: { icon: Fish, color: "bg-sky-50 text-sky-700" },
  Meat: { icon: Drumstick, color: "bg-rose-50 text-rose-700" },
}

export function ForecastItemCard({ item, predictedPrice, changePercent }: ForecastItemCardProps) {
  const changeAmount = predictedPrice - item.price
  const isIncrease = changePercent > 0
  const isDecrease = changePercent < 0
  const movementColor = isIncrease ? "text-rose-700" : isDecrease ? "text-emerald-700" : "text-stone-500"
  const movementBackground = isIncrease ? "bg-rose-50" : isDecrease ? "bg-emerald-50" : "bg-stone-100"
  const MovementIcon = isIncrease ? ArrowUpRight : isDecrease ? ArrowDownRight : Minus
  const detail = categoryDetails[item.category] ?? { icon: Apple, color: "bg-emerald-50 text-emerald-700" }
  const Icon = detail.icon
  const name = item.nameTl ?? item.name

  return (
    <article className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-center gap-x-2.5 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xl sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-3 sm:px-4">
      <span className={`${item.nameTl ? "row-span-4" : "row-span-3"} grid size-11 place-items-center rounded-xl sm:size-12 ${detail.color}`}>
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
      </span>
      <div className="col-start-2 flex min-w-0 items-center gap-2">
        <h3 className="min-w-0 truncate font-heading text-sm font-semibold text-stone-900 sm:text-base">{name}</h3>
        <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500 sm:text-xs">{categoryLabels[item.category] ?? item.category}</span>
        <span className={`ml-auto inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold tabular-nums sm:px-2.5 sm:text-xs ${movementBackground} ${movementColor}`}>
          <MovementIcon aria-hidden="true" className="size-3.5" />
          {changePercent > 0 ? "+" : ""}{changePercent.toFixed(1)}%
        </span>
      </div>
      {item.nameTl && <p className="col-start-2 min-w-0 truncate text-[11px] leading-4 text-stone-500">{item.name}</p>}
      <div className={`col-start-2 grid min-w-0 grid-cols-2 gap-x-2 ${item.nameTl ? "row-start-3" : "row-start-2"}`}>
        <div className="min-w-0">
          <span className="block text-[10px] leading-4 text-stone-500 sm:inline sm:text-[11px]">Kasalukuyan </span>
          <strong className="font-heading text-sm font-semibold tabular-nums text-stone-700 sm:ml-1 sm:text-base">₱{item.price.toFixed(2)}</strong>
          <span className="ml-1 text-[10px] text-stone-500">/{item.unit ?? "kg"}</span>
        </div>
        <div className="min-w-0">
          <span className="block text-[10px] leading-4 text-stone-500 sm:inline sm:text-[11px]">Tantiya sa 30 araw </span>
          <strong className={`font-heading text-sm font-semibold tabular-nums sm:ml-1 sm:text-base ${movementColor}`}>₱{predictedPrice.toFixed(2)}</strong>
          <span className="ml-1 text-[10px] text-stone-500">/{item.unit ?? "kg"}</span>
        </div>
      </div>
      <p className={`col-start-2 mt-1 text-[11px] ${item.nameTl ? "row-start-4" : "row-start-3"} ${movementColor}`}>
        {isIncrease ? "Posibleng tumaas" : isDecrease ? "Posibleng bumaba" : "Posibleng manatili"} ng ₱{Math.abs(changeAmount).toFixed(2)} kada {item.unit ?? "kg"}
      </p>
    </article>
  )
}
