# Analysis — `thumb_bn.jpg` (LOCKON tactical targeting HUD)

**Method**: vision toolkit (gpt-5.4 @ xcode.best) + pixel-exact BMP measurement (`analyze-ui.py`).
**Source**: `vision` (mandatory). Programmatic pipeline used only for pixel measurements.

## Reference Summary

A dark tactical targeting/surveillance HUD with a dominant circular radar/target display on
the right, a signal-density particle map + pixelated data matrix + SCANNING module + circular
gauge on the left, selector blocks (C7/A3/P6) and a command console at the top-left, and a
bottom nav strip ending in a "LOCK ON 85297672" status.

## Theme

| Token | Value | Notes |
|---|---|---|
| `theme.background` | `#0c0e0d` | near-black charcoal, subtle grain |
| `theme.panelTone` | `#181c1d` | dark panel surface, slightly lighter than canvas |
| `theme.primaryAccent` | `#FF4B2F` | hot orange-red — active/alert states, crosshair, gauge arc |
| `theme.secondaryAccent` | `#B9C0C1` | cool white-gray — structural lines, radar rings |
| `theme.textPrimary` | `#C8CECE` | primary labels |
| `theme.textSecondary` | `#8A9293` | secondary/caption text |
| `theme.semanticColors` | success `#FF6338`, warn `#FF6338`, error `#D93624`, info `#657074` | restrained warm semantics |
| `theme.glowColor` | `#FF4B2F` | localized glow, `rgba(255,70,40,0.25)` |

## Border Language

- **Cards**: `corner-brackets` — per-module panels defined by thin horizontal rules, partial
  top/bottom lines, and detached L-shaped corner bracket segments (1px `#697276`, 0px radius).
  NOT full rectangles, NOT card fills.
- **Frame**: `partial` — 1px thin technical lines with L-shaped corner brackets, `#465054`,
  subtle gray-white glow `rgba(190,200,200,0.10)`.
- **Dividers**: thin horizontal rules / broken guide lines, 1px `#252C2E`; no full-height divider.
- **Inputs**: 1px rectangular outline with open/segmented lower edge, `#465054`.
- **Active indicators**: 2px orange-red `#FF4B2F` with subtle glow (`rgba(255,70,40,0.25)`).

## Layout Regions

1. **topLeftSelector** — three stacked selector blocks (C7, A3, P6)
2. **commandConsole** — telemetry log + ATDT input line
3. **leftParticleMap** — signal-density particle map
4. **leftDataMatrix** — pixelated waveform/data matrix
5. **scanningModule** — SCANNING panel with hex telemetry
6. **circularGauge** — dial gauge showing 44 with red arc
7. **mainRadar** — dominant circular radar display (rings, crosshair, scan mass, target brackets, orange marker)
8. **bottomNav** — control strip + LOCK ON status

## Widget Reconciliation

| Reference widget | eDEX slot | Match | Action |
|---|---|---|---|
| SELECTOR C7/A3/P6 | `info` | partial | replace info with selector-stack widget |
| COMMAND CONSOLE | `terminal` | partial | terminal stays (command input + log) |
| CIRCULAR GAUGE | `cpu` | partial | replace cpu with circular gauge |
| SCANNING | `processes` | partial | replace processes with SCANNING telemetry |
| LINE CHART | `traffic` | partial | replace traffic with line chart |
| **RADAR DISPLAY** | `globe` | **featured** | **replaces WORLD VIEW globe** |

**Featured widget**: `TARGETING RADAR` — the reference's signature circular radar display
(concentric rings, rotating sweep, crosshair, target markers) replaces the `WORLD VIEW` globe.
