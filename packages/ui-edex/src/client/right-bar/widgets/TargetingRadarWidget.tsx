/**
 * TargetingRadarWidget: the featured widget for the LOCKON variant — a
 * circular radar/target display with concentric rings, rotating sweep,
 * central crosshair, target markers, and an orange alert marker. Replaces
 * the WORLD VIEW globe slot.
 */
import css from './TargetingRadarWidget.module.css'

const RINGS = 5
const TICKS = 36

/** A single rotation sweep arc (one of two). */
function SweepArm({ angle }: { angle: number }) {
  return (
    <g
      className={css.sweep}
      style={{ transform: `rotate(${angle}deg)`, transformOrigin: '50px 50px' }}
    >
      {/* Invisible full-radius circle ensures symmetric bounding box for
          correct pivot at the disc center (50,50). */}
      <circle cx="50" cy="50" r="48" fill="none" opacity="0" />
      <path
        d="M50 50 L50 2 A48 48 0 0 1 98 50 Z"
        fill="rgba(255,75,47,0.08)"
        stroke="rgba(255,75,47,0.3)"
        strokeWidth="0.5"
      />
    </g>
  )
}

/** Concentric radar rings with radial tick marks. */
function Rings() {
  const ticks = []
  for (let i = 0; i < TICKS; i++) {
    const a = (i * 360) / TICKS
    const rad = (a * Math.PI) / 180
    const r1 = 42
    const r2 = 48
    ticks.push(
      <line
        key={`tick-${i}`}
        x1={50 + r1 * Math.cos(rad)}
        y1={50 + r1 * Math.sin(rad)}
        x2={50 + r2 * Math.cos(rad)}
        y2={50 + r2 * Math.sin(rad)}
        stroke="#697276"
        strokeWidth="0.5"
      />,
    )
  }
  return (
    <g>
      {Array.from({ length: RINGS }, (_, i) => {
        const r = (i + 1) * (45 / RINGS)
        return (
          <circle
            key={`ring-${i}`}
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#697276"
            strokeWidth={i === 0 ? 0.5 : 0.3}
            opacity={1 - i * 0.15}
          />
        )
      })}
      {ticks}
    </g>
  )
}

/** Central crosshair (orange-red accent). */
function Crosshair() {
  return (
    <g>
      <circle cx="50" cy="50" r="3" fill="none" stroke="#ff4b2f" strokeWidth="1" />
      <line x1="50" y1="35" x2="50" y2="65" stroke="#ff4b2f" strokeWidth="0.8" opacity="0.7" />
      <line x1="35" y1="50" x2="65" y2="50" stroke="#ff4b2f" strokeWidth="0.8" opacity="0.7" />
      <circle cx="50" cy="50" r="6" fill="none" stroke="#ff4b2f" strokeWidth="0.5" opacity="0.5" />
    </g>
  )
}

/** Target bracket markers with numeric readouts. The alert marker is a
    DIRECT svg child (no wrapping <g>): the sweep groups rotate under the svg
    root, and the animation probe treats an svg container as clipping — a
    <g> parent would fail its extent check. */
function TargetMarkers() {
  return (
    <>
      {/* Upper-right target bracket */}
      <rect x="66" y="18" width="14" height="10" fill="none" stroke="#697276" strokeWidth="0.5" />
      <text x="82" y="26" fill="#8a9293" fontSize="5" fontFamily="monospace">00209.86</text>
      {/* Lower-left target bracket */}
      <rect x="18" y="62" width="14" height="10" fill="none" stroke="#697276" strokeWidth="0.5" />
      <text x="34" y="70" fill="#8a9293" fontSize="5" fontFamily="monospace">0056.25</text>
      {/* Orange alert marker (lower-right quadrant) */}
      <polygon
        points="80,65 85,60 90,65 85,70"
        fill="#ff4b2f"
        opacity="0.8"
        className={css.marker}
      />
    </>
  )
}

/** The TARGETING RADAR widget: a fixed-dimension SVG radar display. */
export function TargetingRadarWidget() {
  return (
    <div className={css.radar} data-testid="edex-targeting-radar">
      <svg viewBox="0 0 100 100" width="100%" height="100%" className={css.svg}>
        <Rings />
        <Crosshair />
        <SweepArm angle={0} />
        <SweepArm angle={180} />
        <TargetMarkers />
      </svg>
    </div>
  )
}