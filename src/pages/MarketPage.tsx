import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { BasketSection } from '../sections/BasketSection'
import { HeroSection } from '../sections/HeroSection'
import { PriceDirectorySection } from '../sections/PriceDirectorySection'

export function MarketPage() {
  return <div className="min-h-screen bg-stone-50 text-stone-900">
    <Header />
    <div className="mx-auto w-full max-w-6xl px-3 pt-16 sm:px-6 lg:px-12">
      <main id="home" className="scroll-mt-24"><HeroSection/><PriceDirectorySection/><BasketSection/></main>
      <Footer/>
    </div>
  </div>
}
