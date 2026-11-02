import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useBasket } from "../app/contexts/BasketContext";
import { useMarket } from "../app/contexts/MarketContext";
import { CommodityCard } from "../components/cards/CommodityCard";
import { Chinny } from "../components/mascot/Chinny";

const categoryLabels: Record<string, string> = {
  "All items": "Lahat",
  Vegetables: "Gulay",
  Spices: "Pampalasa",
  Rice: "Bigas",
  Fish: "Isda",
  Meat: "Karne",
};
export function PriceDirectorySection() {
  const { prices, connected } = useMarket();
  const { addItem } = useBasket();
  const [queryText, setQueryText] = useState("");
  const [category, setCategory] = useState("All items");
  const categories = [
    "All items",
    ...Array.from(new Set(prices.map((item) => item.category))),
  ];
  const filtered = useMemo(
    () =>
      prices.filter((item) => {
        const inCategory =
          category === "All items" || item.category === category;
        const term = queryText.trim().toLowerCase();
        return (
          inCategory &&
          (!term ||
            `${item.name} ${item.nameTl ?? ""} ${item.category}`
              .toLowerCase()
              .includes(term))
        );
      }),
    [prices, category, queryText],
  );
  return (
    <section
      className="scroll-mt-20 px-0 pt-10 pb-4 sm:scroll-mt-24 sm:px-1 sm:pt-14 sm:pb-4"
      id="prices"
    >
      <div className="flex items-center justify-between gap-4 max-sm:items-start">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Mga presyo
        </h2>
        <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2 py-1.5 text-[10px] text-stone-600 ring-1 ring-stone-200 sm:gap-2 sm:px-3 sm:py-2 sm:text-xs">
          <span
            className={`status-dot ${connected ? "status-dot--live" : "status-dot--demo"}`}
          />
          {connected ? "Nakakonekta" : "Halimbawang datos"}
        </div>
      </div>
      <div className="my-4 flex flex-col gap-2.5 sm:my-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <label className="flex h-11 w-full min-w-0 items-center gap-2 rounded-3xl border border-stone-200 bg-white px-3 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 sm:w-80 shadow-lg">
          <Search
            aria-hidden="true"
            className="size-4 shrink-0 text-stone-500"
          />
          <input
            aria-label="Maghanap ng bilihin"
            className="w-full bg-transparent text-sm outline-none placeholder:text-stone-500"
            value={queryText}
            onChange={(event) => setQueryText(event.target.value)}
            placeholder="Hal. sibuyas, kamatis"
          />
        </label>
        <div
          className="flex flex-wrap snap-x gap-1 bg-stone-100 p-2 rounded-3xl shadow-lg"
          role="group"
          aria-label="Salain ayon sa kategorya"
        >
          {categories.map((item) => (
            <button
              key={item}
              className={`min-h-10 shrink-0 snap-start whitespace-nowrap rounded-full px-3 text-xs transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${category === item ? "bg-emerald-700 font-semibold text-white" : "text-stone-600 hover:bg-stone-200"}`}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {categoryLabels[item] ?? item}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {filtered.map((item) => (
          <CommodityCard key={item.id} item={item} onAdd={addItem} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3 text-stone-600">
          <Chinny
            pose="thinking"
            className="h-20 w-20 shrink-0 object-contain"
          />
          <div>
            <p className="font-heading text-sm font-semibold text-stone-800">
              Walang nahanap na bilihin.
            </p>
            <p className="mt-1 text-xs">
              Subukan ang ibang salita o kategorya.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
