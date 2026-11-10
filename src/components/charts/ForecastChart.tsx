type ForecastChartProps = { averageChange: number }

const chartWidth = 720
const chartHeight = 260
const chartLeft = 58
const chartRight = 690
const chartTop = 24
const chartBottom = 206

export function ForecastChart({ averageChange }: ForecastChartProps) {
  const values = [
    100,
    100 + averageChange * 0.12,
    100 + averageChange * 0.34,
    100 + averageChange * 0.63,
    100 + averageChange,
  ]
  const minValue = Math.min(99, ...values) - 0.4
  const maxValue = Math.max(101, ...values) + 0.4
  const points = values.map((value, index) => ({
    x: chartLeft + (chartRight - chartLeft) * index / (values.length - 1),
    y: chartBottom - (value - minValue) / (maxValue - minValue) * (chartBottom - chartTop),
  }))
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" ")
  const area = `${line} L${chartRight},${chartBottom} L${chartLeft},${chartBottom} Z`
  const gridYs = [chartTop, chartTop + 60, chartTop + 120, chartBottom]
  const monthEnd = `${averageChange > 0 ? "+" : ""}${averageChange.toFixed(1)}`

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-200 sm:p-6" aria-labelledby="forecast-chart-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="forecast-chart-heading" className="font-heading text-lg font-semibold text-stone-900 sm:text-xl">
            Posibleng galaw ng presyo
          </h2>
          <p className="mt-1 text-xs text-stone-500 sm:text-sm">Demo index ng mga presyong nasa listahan mo</p>
        </div>
        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">30 araw</span>
      </div>

      <div className="mt-4 overflow-hidden">
        <svg className="block h-auto w-full" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-labelledby="forecast-chart-title forecast-chart-description">
          <title id="forecast-chart-title">Halimbawang galaw ng presyo sa susunod na 30 araw</title>
          <desc id="forecast-chart-description">Demo projection mula sa kasalukuyang index na 100 hanggang sa tinatayang paggalaw na {monthEnd} porsiyento. Hindi ito resulta ng machine-learning model.</desc>
          <defs>
            <linearGradient id="forecast-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2f7d0d" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#2f7d0d" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          {gridYs.map((y) => <line key={y} x1={chartLeft} x2={chartRight} y1={y} y2={y} stroke="#e7e5e4" strokeDasharray="3 6" />)}
          <path d={area} fill="url(#forecast-fill)" />
          <path d={line} fill="none" stroke="#2f7d0d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {points.map((point, index) => (
            <g key={point.x}>
              <circle cx={point.x} cy={point.y} r={index === points.length - 1 ? 6 : 4} fill="white" stroke="#2f7d0d" strokeWidth="3" />
              <text x={point.x} y="238" textAnchor="middle" className="fill-stone-500 text-[12px]">{["Ngayon", "7 araw", "14 araw", "21 araw", "30 araw"][index]}</text>
            </g>
          ))}
          <text x="4" y={chartTop + 5} className="fill-stone-400 text-[11px]">Index</text>
        </svg>
      </div>

      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
        <span className="inline-flex items-center gap-2"><span className="size-2.5 rounded-full bg-emerald-700" aria-hidden="true" />Tinatayang direksiyon</span>
        <span>Batayan ngayon: 100</span>
      </div>
    </section>
  )
}
