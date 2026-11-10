import { useMemo, useState } from "react"
import { ArrowLeft, Info, Search, TrendingUp } from "lucide-react"
import { useMarket } from "../app/contexts/MarketContext"
import { ForecastChart } from "../components/charts/ForecastChart"
import { ForecastItemCard } from "../components/cards/ForecastItemCard"
import { FilterChips } from "../components/filters/FilterChips"
import { Footer } from "../components/layout/Footer"
import { Header } from "../components/layout/Header"
import { NavLink } from "react-router"

// Temporary demonstration rates. Replace these with outputs from a trained model and historical price data.
const demoChangeRates: Record<string, number> = {
  "red-onion": 7.8,
  tomato: 3.2,
  garlic: 6.5,
  rice: 1.4,
  galunggong: 8.1,
  pork: -1.7,
}

const categoryLabels: Record<string, string> = {
  Vegetables: "Gulay",
  Spices: "Pampalasa",
  Rice: "Bigas",
  Fish: "Isda",
  Meat: "Karne",
}

const movementOptions = [
  { value: "all", label: "Lahat" },
  { value: "increase", label: "Tataas" },
  { value: "decrease", label: "Bababa" },
  { value: "stable", label: "Mananatili" },
]

export function ForecastPage() {
  const { prices } = useMarket()
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMovement, setSelectedMovement] = useState("all")
  const forecastItems = useMemo(() => prices.map((item) => {
    const changePercent = demoChangeRates[item.id] ?? 3.5
    return {
      item,
      changePercent,
      predictedPrice: Math.round(item.price * (1 + changePercent / 100) * 100) / 100,
    }
  }).sort((a, b) => b.changePercent - a.changePercent), [prices])
  const categories = useMemo(() => Array.from(new Set(prices.map((item) => item.category))), [prices])
  const filteredItems = useMemo(() => {
    const term = searchText.trim().toLocaleLowerCase()

    return forecastItems.filter(({ item, changePercent }) => {
      const matchesSearch = !term || `${item.name} ${item.nameTl ?? ""} ${item.category} ${categoryLabels[item.category] ?? ""}`.toLocaleLowerCase().includes(term)
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesMovement = selectedMovement === "all"
        || (selectedMovement === "increase" && changePercent > 0)
        || (selectedMovement === "decrease" && changePercent < 0)
        || (selectedMovement === "stable" && changePercent === 0)

      return matchesSearch && matchesCategory && matchesMovement
    })
  }, [forecastItems, searchText, selectedCategory, selectedMovement])

  const averageChange = forecastItems.length
    ? forecastItems.reduce((sum, forecast) => sum + forecast.changePercent, 0) / forecastItems.length
    : 0
  const risingItems = forecastItems.filter((forecast) => forecast.changePercent > 0).length

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-3 pt-24 sm:px-6 sm:pt-28 lg:px-12">
        <main className="pb-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
            <div>
              <NavLink to="/prices" className="mb-3 inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-xs font-medium text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700">
                <ArrowLeft aria-hidden="true" className="size-4" /> Bumalik sa mga presyo
              </NavLink>
              <h1 className="font-heading text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Pagtataya ng presyo</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Tingnan ang kasalukuyang presyo at ang demo estimate para sa susunod na 30 araw.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900 ring-1 ring-amber-200">
              <TrendingUp aria-hidden="true" className="size-4" /> Demo forecast
            </span>
          </div>

          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 sm:p-5">
              <p className="text-xs text-stone-500">Karaniwang galaw sa demo</p>
              <p className={`mt-1 font-heading text-2xl font-semibold tabular-nums ${averageChange >= 0 ? "text-rose-700" : "text-emerald-700"}`}>{averageChange > 0 ? "+" : ""}{averageChange.toFixed(1)}%</p>
              <p className="mt-1 text-xs text-stone-500">sa loob ng 30 araw</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 sm:p-5">
              <p className="text-xs text-stone-500">Mga item na may posibleng pagtaas</p>
              <p className="mt-1 font-heading text-2xl font-semibold tabular-nums text-stone-900">{risingItems} <span className="text-sm font-medium text-stone-500">sa {forecastItems.length} bilihin</span></p>
              <p className="mt-1 text-xs text-stone-500">Batay sa demo rate bawat item</p>
            </div>
          </div>

          <ForecastChart averageChange={averageChange} />

          <aside className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-950" aria-label="Paalala tungkol sa demo forecast">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <p className="text-xs leading-5 sm:text-sm">Demo lamang ang mga pagtataya at graph na ito. Hindi pa ito galing sa AI o machine-learning model at hindi dapat ituring na tunay na presyo sa hinaharap.</p>
          </aside>

          <section className="mt-8" aria-labelledby="forecast-items-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 id="forecast-items-heading" className="font-heading text-xl font-semibold text-stone-900 sm:text-2xl">Tantiya bawat bilihin</h2>
                <p className="mt-1 text-xs text-stone-500">Nakaayos mula sa pinakamalaking posibleng pagtaas</p>
              </div>
              <span className="text-xs text-stone-500">{filteredItems.length} sa {forecastItems.length} bilihin</span>
            </div>
            <div className="my-4 flex flex-col gap-2.5 sm:my-5">
              <label className="flex h-11 w-full min-w-0 items-center gap-2 rounded-3xl border border-stone-200 bg-white px-3 shadow-lg focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 sm:w-80">
                <Search aria-hidden="true" className="size-4 shrink-0 text-stone-500" />
                <input
                  aria-label="Hanapin sa mga pagtataya"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-stone-500"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Hanapin ang bilihin"
                />
              </label>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                <FilterChips
                  ariaLabel="Salain ayon sa kategorya"
                  options={[{ value: "all", label: "Lahat" }, ...categories.map((category) => ({ value: category, label: categoryLabels[category] ?? category }))]}
                  value={selectedCategory === "all" ? "all" : selectedCategory}
                  onChange={setSelectedCategory}
                />
                <FilterChips
                  ariaLabel="Salain ayon sa galaw ng presyo"
                  options={movementOptions}
                  value={selectedMovement}
                  onChange={setSelectedMovement}
                />
              </div>
            </div>
            {filteredItems.length > 0 ? (
              <div className="flex flex-col gap-2">
                {filteredItems.map((forecast) => (
                  <ForecastItemCard
                    key={forecast.item.id}
                    item={forecast.item}
                    predictedPrice={forecast.predictedPrice}
                    changePercent={forecast.changePercent}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white px-4 py-8 text-center shadow-sm ring-1 ring-stone-200">
                <p className="font-heading text-base font-semibold text-stone-900">Walang tumugmang bilihin</p>
                <p className="mt-1 text-sm text-stone-500">Palitan ang hinahanap o filter para makita ang iba pang pagtataya.</p>
                <button
                  className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  onClick={() => { setSearchText(""); setSelectedCategory("all"); setSelectedMovement("all") }}
                >
                  I-reset ang paghahanap at filter
                </button>
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </div>
  )
}
