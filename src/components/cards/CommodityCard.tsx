import {
  Carrot,
  CookingPot,
  Drumstick,
  Fish,
  Leaf,
  ListPlus,
  Wheat,
} from "lucide-react";
import type { Commodity } from "../../app/types";

const categoryDetails: Record<
  string,
  { label: string; icon: typeof Leaf; color: string }
> = {
  Vegetables: {
    label: "Gulay",
    icon: Carrot,
    color: "bg-emerald-50 text-emerald-700",
  },
  Spices: {
    label: "Pampalasa",
    icon: CookingPot,
    color: "bg-amber-50 text-amber-700",
  },
  Rice: { label: "Bigas", icon: Wheat, color: "bg-yellow-50 text-yellow-700" },
  Fish: { label: "Isda", icon: Fish, color: "bg-sky-50 text-sky-700" },
  Meat: { label: "Karne", icon: Drumstick, color: "bg-rose-50 text-rose-700" },
};

export function CommodityCard({
  item,
  onAdd,
}: {
  item: Commodity;
  onAdd: (item: Commodity) => void;
}) {
  const detail = categoryDetails[item.category] ?? {
    label: item.category,
    icon: Leaf,
    color: "bg-emerald-50 text-emerald-700",
  };
  const Icon = detail.icon;
  const name = item.nameTl ?? item.name;
  const low = (item.low ?? item.price).toFixed(0);
  const high = (item.high ?? item.price).toFixed(0);

  return (
    <article className="grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-x-2.5 rounded-2xl bg-white border shadow-lg border-white px-3 py-2.5 transition-all hover:border-emerald-300 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:gap-x-3 sm:px-4 hover:-translate-y-0.5 hover:shadow-xl duration-300">
      <span
        className={`${item.nameTl ? "row-span-3" : "row-span-2"} grid size-11 place-items-center rounded-xl sm:size-12 ${detail.color}`}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.7} />
      </span>
      <div className="flex min-w-0 items-center gap-2">
        <h3 className="min-w-0 truncate font-heading text-sm font-semibold text-stone-900 sm:text-base">
          {name}
        </h3>
        <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-500 sm:text-xs">
          {detail.label}
        </span>
      </div>
      {item.nameTl && (
        <p className="col-start-2 min-w-0 truncate text-[11px] leading-4 text-stone-500">
          {item.name}
        </p>
      )}
      <div
        className={`${item.nameTl ? "row-start-3" : "row-start-2"} col-start-2 flex min-w-0 flex-wrap items-baseline gap-x-1.5`}
      >
        <strong className="font-heading text-lg font-semibold tabular-nums text-emerald-800 sm:text-xl">
          ₱{item.price.toFixed(2)}
        </strong>
        <span className="whitespace-nowrap text-[11px] text-stone-500">
          /{item.unit ?? "kg"}
        </span>
        <span
          className="basis-full truncate text-[11px] text-stone-500 min-[390px]:basis-auto"
          title="Karaniwang saklaw ng presyo"
        >
          ₱{low}–₱{high}
        </span>
      </div>
      <button
        className={`${item.nameTl ? "row-span-3" : "row-span-2"} col-start-3 inline-flex size-11 items-center justify-center gap-2 self-center rounded-full bg-emerald-700 text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:h-11 sm:w-auto sm:rounded-2xl sm:px-3`}
        aria-label={`Idagdag ang ${name} sa listahan`}
        title={`Idagdag ang ${name} sa listahan`}
        onClick={() => onAdd(item)}
      >
        <ListPlus aria-hidden="true" className="size-5 shrink-0" />
        <span className="hidden whitespace-nowrap text-sm font-semibold sm:inline">
          Idagdag
        </span>
      </button>
    </article>
  );
}
