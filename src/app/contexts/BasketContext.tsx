import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { BasketLine, Commodity } from '../types'

type BasketContextValue = {
  basket: BasketLine[]
  setBasket: React.Dispatch<React.SetStateAction<BasketLine[]>>
  addItem: (commodity: Commodity) => void
  updateLine: (id: string, patch: Partial<BasketLine>) => void
  removeItem: (id: string) => void
}
const BasketContext = createContext<BasketContextValue | null>(null)

function loadBasket(): BasketLine[] {
  try { return JSON.parse(localStorage.getItem('freshyo-basket') ?? '[]') as BasketLine[] } catch { return [] }
}

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketLine[]>(loadBasket)
  useEffect(() => { localStorage.setItem('freshyo-basket', JSON.stringify(basket)) }, [basket])

  function addItem(commodity: Commodity) {
    setBasket((current) => {
      const existing = current.find((line) => line.commodity.id === commodity.id)
      return existing
        ? current.map((line) => line.commodity.id === commodity.id ? { ...line, quantity: line.quantity + 0.25 } : line)
        : [...current, { commodity, quantity: 0.25, checked: false }]
    })
  }
  function updateLine(id: string, patch: Partial<BasketLine>) {
    setBasket((current) => current.map((line) => line.commodity.id === id ? { ...line, ...patch } : line))
  }
  function removeItem(id: string) { setBasket((current) => current.filter((line) => line.commodity.id !== id)) }

  const value = useMemo(() => ({ basket, setBasket, addItem, updateLine, removeItem }), [basket])
  return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
}

export function useBasket() {
  const value = useContext(BasketContext)
  if (!value) throw new Error('useBasket must be used inside BasketProvider')
  return value
}
