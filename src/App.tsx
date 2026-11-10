import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { AppProviders } from './app/AppProviders'
import { ForecastPage } from './pages/ForecastPage'
import { MarketPage } from './pages/MarketPage'

function AppRoutes() {
  const { pathname } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (pathname === '/' || pathname === '/forecast') {
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }

      const target = pathname.slice(1)
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: 'start' })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<MarketPage />} />
      <Route path="/prices" element={<MarketPage />} />
      <Route path="/basket" element={<MarketPage />} />
      <Route path="/forecast" element={<ForecastPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return <HashRouter><AppProviders><AppRoutes /></AppProviders></HashRouter>
}

export default App
