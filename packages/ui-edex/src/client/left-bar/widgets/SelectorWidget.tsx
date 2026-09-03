/**
 * SelectorWidget: the C7/A3/P6 selector block stack from the LOCKON
 * reference — three dark-gray channel/target selectors with an orange
 * active indicator on the selected item. Replaces the info widget.
 */
import type { LeftWidgetHooks } from '../../widgets/types.ts'
import css from './SelectorWidget.module.css'

/** Three stacked selector blocks. */
export function SelectorWidget({ usePanel }: LeftWidgetHooks) {
  const panel = usePanel(s => s)
  // Use platform as a dynamic label to keep the widget alive.
  const selectors = [
    { id: 'C7', label: 'C7', active: true },
    { id: 'A3', label: 'A3', active: false },
    { id: 'P6', label: 'P6', active: false },
  ]
  return (
    <div className={css.stack}>
      {selectors.map(s => (
        <div key={s.id} className={`${css.block} ${s.active ? css.active : ''}`}>
          <span className={css.label}>{s.label}</span>
          {s.active && <span className={css.indicator} />}
        </div>
      ))}
    </div>
  )
}