---
name: Aperture Analytics — Design System
description: Use this design system when designing any surface of the AI Video Analytics Platform (Aperture Analytics). Covers the web dashboard, operator console screens, alert and stream management UIs, and any supporting marketing or admin pages for this platform.
---

# Aperture Analytics Design System — Skill

You are designing for the **AI Video Analytics Platform** (codename *Aperture Analytics*), an enterprise system that ingests thousands of concurrent RTSP / WebRTC video streams, runs computer-vision inference, and surfaces results through an operator dashboard. The audience is NOC operators, analysts, and administrators — not consumers.

## Before designing

1. **Read `README.md` first.** It defines the product context, content voice, visual foundations, iconography, and flagged caveats. Do not design without loading it.
2. **Read `colors_and_type.css`** to know the exact token names. Consume **semantic tokens** (`var(--fg-1)`, `var(--surface-1)`, `var(--primary)`, `var(--live)`), never base palette tokens (`var(--blue-400)`).
3. **Browse `preview/`** for visual examples of every atom: type ramp, color swatches, spacing, radii, shadows, buttons, inputs, chips, stream card, metric widget, alert rows, table rows.
4. **Open `ui_kits/dashboard/index.html`** to see a fully composed screen — copy its patterns for new screens.

## Non-negotiables

- **Load tokens first.** Every HTML file starts with `<link rel="stylesheet" href="<relative>/colors_and_type.css">`. From a sibling of this README that's just `colors_and_type.css`; deeper, use `../`. Then layer page-specific styles.
- **Dark is default.** `<html data-theme="dark">`. Light is supported — the same tokens drive both; do not write theme-specific colors into components.
- **Fonts are Inter + Roboto Mono.** Both are self-hosted in `fonts/` via `@font-face` in `colors_and_type.css`. Don't load from Google Fonts at runtime — the tokens file already handles it. All numbers use `font-variant-numeric: tabular-nums` (global default).
- **Icons are Lucide, stroke 1.5, 20 px canvas.** Load `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>` and call `lucide.createIcons()` after render. Do not mix filled icons with stroked icons. Icons inherit `currentColor` — never hardcode color inside SVGs.
- **No emoji in the product UI.** Doc Markdown is fine.
- **No stock photography.** Use the `assets/placeholder-frame.svg` sensor-grid motif for empty video tiles and login backdrops.
- **Numbers get units with a non-breaking space** (`32 ms`, `24 fps`, `12.4 GB`). Lowercase units except acronyms.

## Color language

Color is **state**, not decoration. Use it only to mean something.

- **Primary (blue)** = interactive affordance — buttons, active nav, focus ring, selected row.
- **Success (green)** = healthy / resolved.
- **Warning (amber)** = degraded / at-risk.
- **Danger (red)** = disconnected / critical / destructive.
- **Info (blue)** = neutral system message. Same hue as primary; differentiate by context.
- **Live (teal)** = actively streaming *right now*. Distinct from success — "OK" ≠ "currently broadcasting".

Pair solid semantic tokens with their `-subtle` variants (12–16% alpha) for chip / badge backgrounds. Never invent a new hue. If you need to express a new state, compose from existing semantic tokens.

## Typography rules

- Body default is **14 px / 20 px, Inter 400**. Table row text drops to 13 px.
- `.ds-eyebrow` (11 px, uppercase, +0.08em tracking, semibold) is the caps-only style — use it for chip labels, card eyebrows, and status tags.
- Use `.ds-metric` (32 px, semibold, tabular numerals) for large KPI numbers. Units are 55% of metric size, weight 400, in `--fg-3`.
- Technical strings — stream IDs, URLs, IPs, timestamps in logs — always in Roboto Mono (`var(--font-mono)`), usually at 12–13 px, colored `--fg-2` or `--fg-3`.
- Sentence case for everything except UPPERCASE metadata eyebrows and status chips.

## Density & layout

- **App shell** is fixed: 240 px left nav, 48 px top bar, 100% content. Use the pattern in `ui_kits/dashboard/`.
- **Default row height is 40 px** (Comfortable). Offer Compact (32 px) via a top-bar toggle for dense list views.
- **Input / button height is 36 px.** Icon-only button is 32 × 32 px.
- **8 px base grid.** Use spacing tokens (`--space-3` = 8, `--space-5` = 16, `--space-7` = 24). Do not type pixel values inline when a token exists.
- **Cards are flat** with a 1 px hairline border (`--border-1`), 8 px radius, no shadow at rest. Shadows only appear on floating elements (dropdowns, popovers, modals — see `--shadow-1/2/3`).
- Tables and dashboards **fill width**; forms cap at 840 px (`--form-max`); general content caps at 1600 px (`--content-max`).

## Motion

- Durations: 120 ms (hover/press), 200 ms (dropdowns/tooltips/value-swap), 320 ms (panel slide/modal), 500 ms (rare).
- Ease: `cubic-bezier(0.2, 0, 0, 1)` for entrance; linear for loading.
- **Only ambient animation allowed is the 2 s `LIVE` pulse** on active stream indicators (`livePulse` keyframes — see `colors_and_type.css`). No scale transforms on hover, no bouncing, no celebrating.
- Real-time value updates cross-fade in 200 ms.

## Writing

Voice is calm, operator-first, precise. Assume the reader is scanning under pressure. Rules in `README.md` → *Content Fundamentals*. Quick reminders:

- Second-person imperatives for actions: *"Acknowledge alert"*, not *"Alert can be acknowledged"*.
- Always use numerals with units: *"42 streams offline"*, not *"some streams are down"*.
- 24-hour clock for dense UI (`14:32:08`). Relative time for feeds (`2 min ago`).
- Sentence case everywhere except uppercase eyebrows.

## Common components — where to find them

| Need | Source |
|---|---|
| Button variants | `preview/components-buttons.html` |
| Form inputs, focus, error | `preview/components-inputs.html` |
| Status chip + dot | `preview/components-status-chips.html` |
| Live stream tile | `preview/components-stream-card.html` |
| KPI + sparkline + progress | `preview/components-metric-widget.html` |
| Alert row | `preview/components-alert-rows.html` |
| Data table row | `preview/components-table-row.html` |
| Full composed dashboard | `ui_kits/dashboard/index.html` — lift the `TopBar`, `Nav`, `Kpi`, `AreaChart`, `AlertRow`, `StreamCard` components directly |

When you need something not listed, **compose from these primitives first**. Don't invent new card shapes, new status languages, or new icon styles.

## Starting a new screen — checklist

1. `<html data-theme="dark">`, `<meta charset="utf-8">`, viewport meta.
2. `<link>` to `colors_and_type.css` (relative).
3. Load Lucide if you need icons.
4. Drop in `TopBar` + `Nav` for any dashboard-shell screen. Login, error, and public pages use a minimal chrome-less layout.
5. Pick your content pattern:
   - **Operational overview** → KPI row + chart + alert panel + grid (see Dashboard).
   - **List / manage** → toolbar (search + filters + primary action) + dense table. Rows link to detail panels.
   - **Detail** → breadcrumb → header with status chip and primary actions → tabbed sub-sections.
   - **Settings / forms** → single column, 840 px max, grouped sections with 16–24 px gaps.
6. Use tokens everywhere. No hex codes in component styles.

## Flagged substitutions (from README)

- Brand mark is a **placeholder** ("Aperture" wordmark + aperture glyph). Replace when real identity exists.
- Lucide icons were chosen — spec was silent. If Material Symbols is adopted later, the swap is cosmetic.
- Fonts are Inter + Roboto Mono via Google Fonts. Swap woff2s in `fonts/` if a licensed brand face arrives.

## What *not* to do

- Don't use gradients in chrome. Gradients only appear in chart fills and video-tile protection scrims.
- Don't use drop shadows on cards at rest.
- Don't use emoji, stock illustrations, or decorative SVG scenery.
- Don't introduce a new color, a new font weight, a new corner radius, or a new shadow level.
- Don't use scale transforms on hover. This is a console, not a consumer app.
- Don't write `Title Case Headings`. Sentence case. Always.
- Don't hardcode timestamps, stream names, or counts in a way that can't be data-driven — every value in the UI originates from a feed.
