import { useEffect, useMemo, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db, firebaseReady } from './config/firebase'
import './App.css'

type Commodity = { id: string; name: string; nameTl?: string; category: string; price: number; low?: number; high?: number; unit?: string; updatedAt?: string }
type BasketLine = { commodity: Commodity; quantity: number; checked: boolean }

const samplePrices: Commodity[] = [
  { id: 'red-onion', name: 'Red onion', nameTl: 'Sibuyas pula', category: 'Vegetables', price: 142, low: 120, high: 160 },
  { id: 'tomato', name: 'Tomato', nameTl: 'Kamatis', category: 'Vegetables', price: 96, low: 80, high: 120 },
  { id: 'garlic', name: 'Garlic', nameTl: 'Bawang', category: 'Spices', price: 188, low: 160, high: 210 },
  { id: 'rice', name: 'Well-milled rice', nameTl: 'Bigas', category: 'Rice', price: 50, low: 48, high: 54 },
  { id: 'galunggong', name: 'Galunggong', category: 'Fish', price: 240, low: 210, high: 280 },
  { id: 'pork', name: 'Pork kasim', nameTl: 'Baboy', category: 'Meat', price: 360, low: 330, high: 390 },
]

function App() {
  const [prices, setPrices] = useState<Commodity[]>(samplePrices)
  const [queryText, setQueryText] = useState('')
  const [category, setCategory] = useState('All items')
  const [basket, setBasket] = useState<BasketLine[]>(() => {
    try { return JSON.parse(localStorage.getItem('freshyo-basket') ?? '[]') as BasketLine[] } catch { return [] }
  })
  const [budget, setBudget] = useState('1000')
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

  useEffect(() => { localStorage.setItem('freshyo-basket', JSON.stringify(basket)) }, [basket])

  const categories = ['All items', ...Array.from(new Set(prices.map((item) => item.category)))]
  const categoryLabels: Record<string, string> = { 'All items': 'Lahat', Vegetables: 'Gulay', Spices: 'Pampalasa', Rice: 'Bigas', Fish: 'Isda', Meat: 'Karne' }
  const filtered = useMemo(() => prices.filter((item) => {
    const matchesCategory = category === 'All items' || item.category === category
    const term = queryText.trim().toLowerCase()
    return matchesCategory && (!term || `${item.name} ${item.nameTl ?? ''} ${item.category}`.toLowerCase().includes(term))
  }), [prices, category, queryText])

  const estimated = basket.reduce((sum, line) => sum + line.commodity.price * line.quantity, 0)
  const worstCase = basket.reduce((sum, line) => sum + (line.commodity.high ?? line.commodity.price) * line.quantity, 0)
  const budgetValue = Number(budget) || 0
  const budgetPercent = budgetValue ? Math.min(100, estimated / budgetValue * 100) : 0

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

  return <div className="app-shell bg-stone-50 text-stone-900">
    <header className="topbar"><a className="brand" href="#home"><span className="brand-mark">f</span> freshyo<span className="brand-dot">.</span></a><nav><a className="active" href="#prices">Mga presyo</a><a href="#basket">Listahan ko</a></nav><span className="location-pill"><span className="status-dot" /> Pilipinas</span></header>
    <main id="home">
      <section className="hero"><div className="hero-copy"><span className="eyebrow">KASAMA MO SA PALENGKE</span><h1 className="font-heading">Mamili nang wais.<br/><em>Mas makatipid.</em></h1><p>Alamin ang sariwang presyo at planuhin ang mga bibilhin sa iisang lugar.</p><a className="primary-button bg-emerald-600 text-white" href="#prices">Tingnan ang presyo <span>↓</span></a><div className="hero-note"><span className="sun-icon">✳</span> Para sa paraan natin ng pamamalengke</div></div><div className="hero-art"><div className="sun-shape"/><div className="market-card"><span className="market-label">PRESYO SA PALENGKE NGAYON</span><div className="market-produce"><span>🍅</span><span>🧅</span><span>🥬</span></div><div className="market-card-bottom"><span>Sariwang paninda,<br/>presyong sulit.</span><b>₱ <span>tipid!</span></b></div></div><span className="art-spark spark-one">✳</span><span className="art-spark spark-two">✳</span><div className="floating-tag">presyong<br/>sulit <b>♥</b></div></div></section>
      <section className="price-section" id="prices"><div className="section-heading"><div><span className="eyebrow">ALAMIN BAGO MAMALENGKE</span><h2 className="font-heading">Presyo ngayon<span>.</span></h2><p>Mga pangunahing bilihin, presyong madaling tingnan.</p></div><div className="sync-label"><span className={connected ? 'status-dot live' : 'status-dot demo'} />{connected ? 'Mula sa Firestore' : 'Halimbawang presyo'}<small>Ia-update ang mga presyo sa susunod</small></div></div>
        <div className="toolbar"><label className="search-box"><span>⌕</span><input value={queryText} onChange={(event) => setQueryText(event.target.value)} placeholder="Maghanap: sibuyas, kamatis..." /></label><div className="category-tabs">{categories.map((item) => <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{categoryLabels[item] ?? item}</button>)}</div></div>
        <div className="price-grid">{filtered.map((item) => <article className="price-card" key={item.id}><div className="item-top"><span className={`produce-icon ${item.category.toLowerCase()}`}>{item.category === 'Fish' ? '🐟' : item.category === 'Meat' ? '🥩' : item.category === 'Rice' ? '🌾' : item.name.toLowerCase().includes('tomato') ? '🍅' : item.name.toLowerCase().includes('onion') ? '🧅' : '🧄'}</span><span className="category-label">{categoryLabels[item.category] ?? item.category}</span></div><h3>{item.nameTl ?? item.name}</h3><p className="translation">{item.nameTl ? item.name : 'Piling sariwang paninda'}</p><div className="price-row"><strong>₱{item.price.toFixed(2)}</strong><span>/{item.unit ?? 'kg'}</span></div><div className="range">Karaniwang presyo <b>₱{(item.low ?? item.price).toFixed(0)}–₱{(item.high ?? item.price).toFixed(0)}</b></div><button className="add-button" onClick={() => addItem(item)}><span>＋</span> Idagdag sa listahan</button></article>)}</div>
      </section>
      <section className="basket-section" id="basket"><div className="basket-title"><div><span className="eyebrow">PLANUHIN ANG PAMAMALENGKE</span><h2 className="font-heading">Aking bayong<span>.</span></h2></div><span className="basket-count">{basket.length} {basket.length === 1 ? 'bilihin' : 'bilihin'}</span></div><div className="basket-layout"><div className="basket-list">{basket.length === 0 ? <div className="empty-basket"><span>🧺</span><div><b>Handa na ang iyong bayong.</b><p>Magdagdag ng mga bilihin mula sa talaan ng presyo.</p></div></div> : basket.map((line) => <div className={`basket-line ${line.checked ? 'bought' : ''}`} key={line.commodity.id}><input aria-label={`Markahan na nabili ang ${line.commodity.nameTl ?? line.commodity.name}`} type="checkbox" checked={line.checked} onChange={(event) => updateLine(line.commodity.id, { checked: event.target.checked })}/><div className="line-name"><b>{line.commodity.nameTl ?? line.commodity.name}</b><small>₱{line.commodity.price.toFixed(2)} / kg</small></div><select aria-label={`Dami ng ${line.commodity.nameTl ?? line.commodity.name}`} value={line.quantity} onChange={(event) => updateLine(line.commodity.id, { quantity: Number(event.target.value) })}><option value="0.1">100 g</option><option value="0.25">¼ kg</option><option value="0.5">½ kg</option><option value="1">1 kg</option><option value="2">2 kg</option></select><b className="line-total">₱{(line.commodity.price * line.quantity).toFixed(2)}</b><button className="remove-button" aria-label={`Alisin ang ${line.commodity.nameTl ?? line.commodity.name}`} onClick={() => setBasket((current) => current.filter((entry) => entry.commodity.id !== line.commodity.id))}>×</button></div>)}</div><aside className="budget-card"><span className="eyebrow">TAKDANG BUDYET</span><label className="budget-input"><span>₱</span><input aria-label="Halaga ng badyet" type="number" min="0" value={budget} onChange={(event) => setBudget(event.target.value)}/></label><div className="progress-track"><div className={budgetPercent >= 100 ? 'progress-fill over' : budgetPercent >= 85 ? 'progress-fill close' : 'progress-fill'} style={{ width: `${budgetPercent}%` }}/></div><div className="budget-caption"><span>Tinatayang gastos</span><b>₱{estimated.toFixed(2)}</b></div><div className="budget-caption muted"><span>Tantiya sa pinakamataas</span><b>₱{worstCase.toFixed(2)}</b></div><div className="remaining">{budgetValue > estimated ? <>Matitira sa iyo ang <b>₱{(budgetValue - estimated).toFixed(2)}</b></> : estimated ? <><b>Lampas sa badyet</b> ng ₱{(estimated - budgetValue).toFixed(2)}</> : 'Magdagdag ng bilihin para makita ang kabuuan'}</div></aside></div><p className="offline-note">Naka-save sa device ang listahan mo at magagamit kahit walang internet.</p></section>
    </main><footer><a className="brand" href="#home"><span className="brand-mark">f</span> freshyo<span className="brand-dot">.</span></a><span>Presyong sulit, araw-araw.</span><span>Tantiyang presyo lamang.</span></footer>
  </div>
}

export default App
