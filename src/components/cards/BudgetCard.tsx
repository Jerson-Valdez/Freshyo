import { Chinny } from "../mascot/Chinny";

type Props = {
  budget: string;
  onBudgetChange: (value: string) => void;
  estimated: number;
  worstCase: number;
};
export function BudgetCard({
  budget,
  onBudgetChange,
  estimated,
  worstCase,
}: Props) {
  const budgetValue = Number(budget) || 0;
  const percent = budgetValue
    ? Math.min(100, (estimated / budgetValue) * 100)
    : 0;
  return (
    <aside className="min-w-0 rounded-2xl bg-white shadow-xl p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-stone-800">Badyet</div>
        <Chinny
          pose="cooking"
          className="-my-2 h-14 w-20 object-contain sm:h-16 sm:w-24"
        />
      </div>
      <label
        htmlFor="basket-budget"
        className="my-3 flex min-h-12 items-center rounded-lg border border-stone-200 px-3 text-stone-600 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100"
      >
        <span aria-hidden="true" className="font-heading text-xl font-semibold">
          ₱
        </span>
        <input
          id="basket-budget"
          className="w-full border-0 px-2 py-1 font-heading text-xl font-semibold tabular-nums text-stone-900 outline-none"
          aria-label="Halaga ng badyet"
          type="number"
          min="0"
          value={budget}
          onChange={(event) => onBudgetChange(event.target.value)}
        />
      </label>
      <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full ${percent >= 100 ? "bg-rose-600" : "bg-brand-accent"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 text-[11px] text-stone-600 sm:text-xs">
        <span>Tinatayang gastos</span>
        <b className="shrink-0 tabular-nums text-stone-900">
          ₱{estimated.toFixed(2)}
        </b>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-stone-600 sm:text-xs">
        <span>Pinakamataas na tantiya</span>
        <b className="shrink-0 tabular-nums text-stone-700">
          ₱{worstCase.toFixed(2)}
        </b>
      </div>
      <div
        className={`mt-4 rounded-lg p-3 text-xs ${budgetValue >= estimated ? "bg-emerald-50 text-emerald-900" : "bg-rose-50 text-rose-800"}`}
      >
        {budgetValue > estimated ? (
          <>
            Matitira:{" "}
            <b className="tabular-nums">
              ₱{(budgetValue - estimated).toFixed(2)}
            </b>
          </>
        ) : estimated ? (
          <>
            <b>Lampas sa badyet</b> ng ₱{(estimated - budgetValue).toFixed(2)}
          </>
        ) : (
          "Magdagdag ng bilihin para makita ang kabuuan"
        )}
      </div>
    </aside>
  );
}
