import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, firebaseReady } from '../../config/firebase'
import { samplePrices } from '../samplePrices'
import type { Commodity } from '../types'

type MarketContextValue = { prices: Commodity[]; connected: boolean }
const MarketContext = createContext<MarketContextValue | null>(null)

export function MarketProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState(samplePrices)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!firebaseReady || !db) return
    getDocs(query(collection(db, 'commodities'), orderBy('name')))
      .then((snapshot) => {
        const records = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }) as Commodity)
        if (records.length) { setPrices(records); setConnected(true) }
      })
      .catch(() => setConnected(false))
  }, [])

  const value = useMemo(() => ({ prices, connected }), [prices, connected])
  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}

export function useMarket() {
  const value = useContext(MarketContext)
  if (!value) throw new Error('useMarket must be used inside MarketProvider')
  return value
}
