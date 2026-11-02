import type { ReactNode } from 'react'
import { BasketProvider } from './contexts/BasketContext'
import { MarketProvider } from './contexts/MarketContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return <MarketProvider><BasketProvider>{children}</BasketProvider></MarketProvider>
}
