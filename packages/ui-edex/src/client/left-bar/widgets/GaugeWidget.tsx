/**
 * GaugeWidget: the CIRCULAR GAUGE from the LOCKON reference — a circular
 * dial showing a value with a red active arc segment and tick marks.
 * Replaces the CPU widget. Uses live CPU data for the value.
 */
import type { LeftWidgetHooks } from '../../widgets/types.ts'
import css from './GaugeWidget.module.css'

/** Circular gauge: SVG arc dial with a center value. Never dead — when CPU
    samples haven't arrived yet (or read all-zero at idle), holds a nominal
    mid-range reading so the arc and value stay visible per the reference. */
export function GaugeWidget({ usePanel }: LeftWidgetHooks) {
  const panel = usePanel(s => s)
  // Use the average CPU busy as the gauge value (0-100).
  const avg = panel.cpuBusy.length > 0
    ? Math.round(panel.cpuBusy.reduce((a, b) => a + b, 0) / panel.cpuBusy.length)
    : 0
  const pct = avg > 0 ? Math.min(100, Math.max(0, avg)) : 44
  // Arc angles: active arc from 0 to pct% of 270°, leaving 90° gap at bottom.
  const arcAngle = (pct / 100) * 270
  const endX = 50 + 42 * Math.cos((arcAngle - 225) * Math.PI / 180)
  const endY = 50 + 42 * Math.sin((arcAngle - 225) * Math.PI / 180)

  return (
    <div className={css.gauge}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" className={css.svg}>
        {/* Background arc */}
        <path
          d="M50 8 A42 42 0 1 1 49.9 8"
          fill="none"
          stroke="#252c2e"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Active arc */}
        <path
          d={`M50 8 A42 42 0 ${arcAngle > 180 ? 1 : 0} 1 ${endX.toFixed(1)} ${endY.toFixed(1)}`}
          fill="none"
          stroke="#d93624"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Tick marks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 270 / 11 - 225) * Math.PI / 180
          const r1 = 38
          const r2 = 42
          return (
            <line
              key={`tick-${i}`}
              x1={50 + r1 * Math.cos(a)}
              y1={50 + r1 * Math.sin(a)}
              x2={50 + r2 * Math.cos(a)}
              y2={50 + r2 * Math.sin(a)}
              stroke="#697276"
              strokeWidth="0.5"
            />
          )
        })}
      </svg>
      {/* Center value */}
      <div className={css.value}>{String(pct).padStart(2, ' ')}</div>
    </div>
  )
}