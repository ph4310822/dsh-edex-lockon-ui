/**
 * ScanningWidget: the SCANNING telemetry panel from the LOCKON reference —
 * a dense hex data display with a vertical striped meter, a progress bar,
 * and several lines of encoded addresses, one highlighted in red.
 * Replaces the PROCESSES widget. Uses live process data for the telemetry.
 */
import type { LeftWidgetHooks } from '../../widgets/types.ts'
import css from './ScanningWidget.module.css'

/** Hex address-like string from a number. */
function hexAddr(n: number): string {
  return `0x${n.toString(16).toUpperCase().padStart(8, '0')}`
}

/** Telemetry row: hex address + status. */
function TelemetryRow({ addr, status, highlight }: { addr: string; status: string; highlight?: boolean }) {
  return (
    <div className={`${css.row} ${highlight ? css.highlight : ''}`}>
      <span className={css.addr}>{addr}</span>
      <span className={css.status}>{status}</span>
    </div>
  )
}

/** SCANNING telemetry panel. Always dense — process data fills the rows when
    available, otherwise a seeded idle sweep keeps the panel from collapsing. */
export function ScanningWidget({ usePanel }: LeftWidgetHooks) {
  const panel = usePanel(s => s)
  // Use process data to generate telemetry rows.
  const rows = panel.processes.slice(0, 8).map((proc, i) => ({
    addr: hexAddr(proc.pid),
    status: proc.name.slice(0, 16).padEnd(16, ' ') + ' ' + proc.cpuPct.toFixed(1) + '%',
    highlight: proc.cpuPct > 5,
  }))
  const fallback = [
    { addr: '0x4E12B0A1', status: 'TGT_LOCK ............ 44.2%', highlight: true },
    { addr: '0x3F07C2E4', status: 'SIG_SWEEP ........... 12.0%', highlight: false },
    { addr: '0x1A9D00F7', status: 'TRK_GATE ............ 08.7%', highlight: false },
    { addr: '0x0C4B77E2', status: 'BAND_SCAN ........... 03.1%', highlight: false },
    { addr: '0x7E2A59C1', status: 'LOCK_CONFIRM ........ 01.9%', highlight: false },
    { addr: '0x5D1C8B0F', status: 'RNG_UPDATE .......... 00.4%', highlight: false },
  ]
  const telemetry = rows.length > 0 ? rows : fallback

  return (
    <div className={css.scan}>
      <div className={css.meter} />
      <div className={css.content}>
        <div className={css.progress}>
          <div className={css.progressBar} style={{ width: '38%' }} />
        </div>
        {telemetry.map((row, i) => (
          <TelemetryRow key={i} addr={row.addr} status={row.status} highlight={row.highlight} />
        ))}
      </div>
    </div>
  )
}