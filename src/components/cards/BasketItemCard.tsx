import type { BasketLine } from '../../app/types'
import { Trash2 } from 'lucide-react'

type Props = { line: BasketLine; onUpdate: (id: string, patch: Partial<BasketLine>) => void; onRemove: (id: string) => void }
export function BasketItemCard({ line, onUpdate, onRemove }: Props) {
  const name = line.commodity.nameTl ?? line.commodity.name
  return <div className={`grid min-h-16 grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-x-2 border-b border-stone-100 py-2.5 last:border-0 sm:flex sm:gap-3 sm:py-3 ${line.checked ? 'opacity-50 line-through' : ''}`}>
    <label className="row-span-2 grid size-11 place-items-center justify-self-center sm:size-8">
      <input className="size-5 accent-brand-primary" aria-label={`Markahan na nabili ang ${name}`} type="checkbox" checked={line.checked} onChange={(event) => onUpdate(line.commodity.id, { checked: event.target.checked })}/>
    </label>
    <div className="min-w-0 sm:flex-1"><b className="block truncate text-xs text-stone-800 sm:text-sm">{name}</b><small className="text-[11px] text-stone-500 sm:text-xs">₱{line.commodity.price.toFixed(2)} / {line.commodity.unit ?? 'kg'}</small></div>
    <div className="col-start-2 row-start-2 flex min-w-0 items-center justify-between gap-2 pt-1 sm:ml-auto sm:gap-3 sm:pt-0">
      <select className="min-h-10 w-[4.5rem] rounded-lg border border-stone-200 bg-white px-2 text-[11px] text-stone-600 sm:min-h-9 sm:w-auto sm:text-xs" aria-label={`Dami ng ${name}`} value={line.quantity} onChange={(event) => onUpdate(line.commodity.id, { quantity: Number(event.target.value) })}>
        <option value="0.1">100 g</option><option value="0.25">¼ kg</option><option value="0.5">½ kg</option><option value="1">1 kg</option><option value="2">2 kg</option>
      </select>
      <b className="shrink-0 text-right text-xs text-emerald-800 sm:min-w-16 sm:text-sm">₱{(line.commodity.price * line.quantity).toFixed(2)}</b>
    </div>
    <button className="col-start-3 row-span-2 grid size-11 shrink-0 place-items-center justify-self-end rounded-full text-stone-500 hover:bg-rose-50 hover:text-rose-700 focus-visible:outline-2 focus-visible:outline-emerald-700 sm:ml-auto sm:size-10" aria-label={`Alisin ang ${name}`} onClick={() => onRemove(line.commodity.id)}><Trash2 aria-hidden="true" className="size-4"/></button>
  </div>
}
