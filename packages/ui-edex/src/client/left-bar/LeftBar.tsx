/**
 * Left bar: a vertical stack of swappable system widgets — selector
 * (C7/A3/P6 channel blocks), CPU gauge, and SCANNING telemetry. The
 * composition lives in the LEFT_WIDGETS registry below: add, remove, or
 * reorder a widget by editing one line (its implementation lives in its own
 * folder under widgets/), and every section shares the same chrome via
 * WidgetSection.
 */
import type { LeftWidgetHooks, LeftWidgetSlot } from '../widgets/types.ts'
import { WidgetSection } from '../widgets/WidgetSection.tsx'
import { GaugeWidget } from './widgets/GaugeWidget.tsx'
import { SelectorWidget } from './widgets/SelectorWidget.tsx'
import { ScanningWidget } from './widgets/ScanningWidget.tsx'
import css from './LeftBar.module.css'

/** The left panel's widget composition (top to bottom). */
const LEFT_WIDGETS: LeftWidgetSlot[] = [
  { id: 'info', Component: SelectorWidget },
  { id: 'cpu', title: 'CPU', Component: GaugeWidget },
  // Flex-fills the leftover bar height so the table runs into the loadavg
  // footer the widget itself renders.
  { id: 'processes', title: 'SCANNING', fill: true, Component: ScanningWidget },
]

/** The left column content (rendered inside the eDEX shell's left bar). */
export function LeftBar({ usePanel }: LeftWidgetHooks) {
  return (
    <div className={css.panel} data-testid="edex-left-bar">
      {LEFT_WIDGETS.map(widget => (
        <WidgetSection key={widget.id} slot={widget}>
          <widget.Component usePanel={usePanel} />
        </WidgetSection>
      ))}
    </div>
  )
}