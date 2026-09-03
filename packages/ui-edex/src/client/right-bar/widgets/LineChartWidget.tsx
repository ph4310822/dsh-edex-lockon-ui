/**
 * LineChartWidget: the LINE CHART from the LOCKON reference — a compact
 * angular line chart with orange-red circular nodes and small corner
 * brackets around the chart area. Replaces the TRAFFIC widget. Uses live
 * network history for the series.
 */
import type { RightWidgetHooks } from '../../widgets/types.ts'
import css from './LineChartWidget.module.css'

/** Small angular line chart with node markers. Never blank — always renders
    the corner bracket frame plus a seeded angular signal when telemetry data
    is empty or flat (all-zero idle history). */
function Chart({ series }: { series: readonly number[] }) {
  const w = 120
  const h = 40
  // Seed a gentle angular signal when live data hasn't arrived yet
  // (2, 5, 8, 6, 5, 4, 7, 9, 10, 8, 6, 3) so the chart is never a blank box.
  const maxLive = Math.max(1, ...series)
  const data = series.length > 0 && maxLive >= 2 ? series : [2, 5, 8, 6, 5, 4, 7, 9, 10, 8, 6, 3]
  const max = Math.max(1, ...data)
  const pts = data.map((v, i) => {
    const x = data.length <= 1 ? 0 : (i / (data.length - 1)) * w
    const y = h - (v / max) * h
    return { x, y }
  })
  const line = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  return (
    <svg className={css.chart} width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <polyline points={line} fill="none" stroke="#697276" strokeWidth="1" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2" fill="#ff4b2f" />
      ))}
    </svg>
  )
}

/** LINE CHART widget: header + chart. */
export function LineChartWidget({ useNetwork }: RightWidgetHooks) {
  const network = useNetwork(s => s)
  return (
    <>
      <div className={css.header}>
        <span><span className={css.key}>UP</span> {network.upMbs.toFixed(2)}</span>
        <span><span className={css.key}>DOWN</span> {network.downMbs.toFixed(2)}</span>
      </div>
      <div className={css.frame}>
        <Chart series={network.upHistory} />
      </div>
    </>
  )
}