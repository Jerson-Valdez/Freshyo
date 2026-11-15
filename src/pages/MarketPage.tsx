import { useEffect, useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { Navigation } from '../components/layout/Navigation'
import { BasketSection } from '../sections/BasketSection'
import { HeroSection } from '../sections/HeroSection'
import { PriceDirectorySection } from '../sections/PriceDirectorySection'

export function MarketPage() {
  const [activeSection, setActiveSection] = useState<'home' | 'prices' | 'basket' | null>(null)

  useEffect(() => {
    let frame = 0

    const updateActiveSection = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (window.scrollY <= 32) {
          setActiveSection('home')
          return
        }

        const marker = window.innerHeight * 0.5
        const visibleSection = (['home', 'prices', 'basket'] as const).find((id) => {
          const section = document.getElementById(id)
          if (!section) return false
          const bounds = section.getBoundingClientRect()
          return bounds.top <= marker && bounds.bottom > marker
        })

        setActiveSection(visibleSection ?? null)
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return <div className="min-h-screen bg-stone-50 text-stone-900">
    <Header activeSection={activeSection} />
    <Navigation activeSection={activeSection} />
    <div className="pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:pt-24 sm:pb-0 lg:pl-64 lg:pt-24">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
        <main><HeroSection/><PriceDirectorySection/><BasketSection/></main>
        <Footer/>
      </div>
    </div>
  </div>
}
