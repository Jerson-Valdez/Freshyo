import { useState } from "react";
import { useBasket } from "../app/contexts/BasketContext";
import { BasketItemCard } from "../components/cards/BasketItemCard";
import { BudgetCard } from "../components/cards/BudgetCard";
import { Chinny } from "../components/mascot/Chinny";

export function BasketSection() {
  const { basket, updateLine, removeItem } = useBasket();
  const [budget, setBudget] = useState("1000");
  const estimated = basket.reduce(
    (sum, line) => sum + line.commodity.price * line.quantity,
    0,
  );
  const worstCase = basket.reduce(
    (sum, line) =>
      sum + (line.commodity.high ?? line.commodity.price) * line.quantity,
    0,
  );
  return (
    <section
      className="scroll-mt-20 px-0 pt-10 pb-10 sm:scroll-mt-24 sm:px-1 sm:pt-14 sm:pb-14"
      id="basket"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          Listahan ng bibilhin
        </h2>
        <span className="shrink-0 whitespace-nowrap text-[11px] text-stone-500 sm:text-xs">
          {basket.length} bilihin
        </span>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 md:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 rounded-2xl bg-white shadow-lg px-3 py-1 sm:px-4">
          {basket.length === 0 ? (
            <div className="flex min-h-32 items-center justify-center gap-2 rounded-xl bg-emerald-50/70 px-2 text-stone-500 sm:min-h-48 sm:gap-3 sm:px-4">
              <Chinny
                pose="sitting"
                className="h-24 w-20 shrink-0 object-contain sm:h-36 sm:w-32"
              />
              <div className="min-w-0">
                <b className="font-heading text-sm text-stone-800 sm:text-base">
                  Wala pang laman ang listahan.
                </b>
                <p className="mt-1 max-w-56 text-xs leading-5 sm:text-sm">
                  Pumili ng bilihin at idagdag dito.
                </p>
              </div>
            </div>
          ) : (
            basket.map((line) => (
              <BasketItemCard
                key={line.commodity.id}
                line={line}
                onUpdate={updateLine}
                onRemove={removeItem}
              />
            ))
          )}
        </div>
        <BudgetCard
          budget={budget}
          onBudgetChange={setBudget}
          estimated={estimated}
          worstCase={worstCase}
        />
      </div>
      <p className="mt-3 text-left text-[11px] leading-4 text-stone-500 sm:text-right sm:text-xs">
        Awtomatikong naka-save sa device mo. Magagamit kahit walang internet.
      </p>
    </section>
  );
}
