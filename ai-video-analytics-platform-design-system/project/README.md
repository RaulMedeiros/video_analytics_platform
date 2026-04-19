# AI Video Analytics Platform — Design System

A design system for the **AI Video Analytics Platform**, an enterprise-scale system that ingests thousands of concurrent video streams, runs AI inference (object detection, tracking, behavior analysis) on them, and presents results through a real-time operator dashboard.

This design system is derived from the platform's frontend specification (see Sources below). No production UI code exists yet — this system exists to anchor mocks, prototypes, and the first production implementation to a single, consistent visual and interaction language.

---

## Product Context

**What it is.** An enterprise video analytics platform. Operators point RTSP / WebRTC / ONVIF streams at it; the platform runs computer-vision models in real time, aggregates detections, fires alerts, and exposes everything through dashboards and APIs.

**Who uses it.**
- **Operations / NOC staff** — monitor live stream health, triage alerts, acknowledge incidents.
- **Analysts** — build reports, trend over time, drill into events.
- **Administrators** — configure streams, manage users/permissions, tune AI models.
- **Executives** — read aggregate KPIs and ROI dashboards.

**Scale targets.** 50–100 streams (Phase 1 / "Crawl") → 500–1,000 (Phase 2 / "Walk") → 5,000+ (Phase 3 / "Run"). Latency target goes from <500ms to <200ms. Uptime goes from 95% to 99.99%.

**Surfaces.**
- **Web Dashboard** (primary) — React + TypeScript + MUI, real-time via WebSocket.
- **REST / GraphQL / WebSocket APIs** (not visual).
- **Mobile** mentioned as Phase 2+, not scoped here.

The single visual surface we design for right now is the **Web Dashboard**. Everything else is backend.

---

## Sources

All design decisions trace back to the platform specification repository:

- **Repo:** [`RaulMedeiros/video_analytics_platform`](https://github.com/RaulMedeiros/video_analytics_platform) (branch `main`)
- **Key files read:**
  - `README.md` — overall vision, phases, investment, KPIs.
  - `project-overview/01-vision-and-strategy.md` — mission, strategic goals.
  - `project-overview/02-system-overview.md` — architecture, tech stack, performance targets.
  - `roadmap/phase-01-crawl/architecture/08-frontend-dashboard-module.md` — the canonical source: React + MUI stack, component hierarchy, state management, theme tokens, chart components, real-time WebSocket integration.

There is **no codebase**, **no Figma**, and **no existing running UI**. All components in `ui_kits/` are recreations from the spec.

---

## Index

Root folder manifest:

| Path | What it is |
|---|---|
| `README.md` | This file. High-level context, content + visual foundations, iconography. |
| `SKILL.md` | Agent Skill entry point; invoke to design with this system. |
| `colors_and_type.css` | All design tokens as CSS variables: colors, type ramp, spacing, radii, shadows. |
| `fonts/` | Webfont files (Inter, Roboto Mono). Substituted from Google Fonts — flagged below. |
| `assets/` | Logos, product marks, hero/placeholder imagery, icon references. |
| `preview/` | Standalone design-system cards (typography, color, spacing, components). |
| `ui_kits/dashboard/` | High-fidelity dashboard kit: `index.html` + JSX components. |

---

## Content Fundamentals

The platform's own writing is dense, technical, executive-facing. It uses:
- **Heavy enumeration** (bulleted lists everywhere).
- **Phase language** — every capability tagged `Crawl / Walk / Run`.
- **Metric-first sentences** — "50–100 concurrent streams, <500ms latency, 95% uptime."
- **Emoji decoration** on headings in Markdown (🐣 🚶 🏃 🎯 🏗️ ⚠️).

For the **product UI** we deliberately diverge from that source tone. The spec's Markdown is decorative; the dashboard needs to be calm, scannable, and unambiguous under pressure. Use this instead:

### Voice

- **Operator-first.** The user is monitoring critical infrastructure. Assume they are scanning, tired, and multitasking. Do not delight; inform.
- **Neutral authority.** State facts. Avoid hype ("blazing", "powerful", "seamless").
- **Precision over brevity.** "42 streams offline" beats "Some streams are down." Numbers always win.
- **Active, second person where action is required.** "Acknowledge alert" — not "Alert can be acknowledged."

### Casing & grammar

- **Sentence case** for everything except proper nouns and product names: page titles, buttons, menu items, column headers, table labels, dialogs. *"Stream configuration"*, not *"Stream Configuration"*.
- **UPPERCASE** is reserved for short metadata chips, status tags, and section eyebrows in the dashboard chrome (`LIVE`, `OFFLINE`, `CRITICAL`, `ANALYTICS`). Letter-spacing +0.08em on these.
- **Numbers:** always numerals (`1`, not `one`). Use thin space as thousands separator (`1 247`) or comma depending on locale — default locale is `en-US`, so use comma (`1,247`).
- **Units:** always include, non-breaking space before (`320 ms`, `42 fps`, `12.4 GB`). Lowercase units (`ms`, `kb/s`) except acronyms (`GB`, `FPS`).
- **Time:** 24-hour clock (`14:32:08`), ISO-ish dates (`2026-04-18`) in dense UI; friendly relative time (`2 min ago`) in feeds and notifications.

### "I" vs "you"

- Never "I". The system is not a person.
- "You" is fine but rare — mostly in empty states and onboarding. ("You haven't configured any streams yet.")
- Most UI copy is impersonal imperatives or labels.

### Emoji

**Do not use emoji in the product UI.** They are tolerated in Markdown docs (matching the spec's style) but they are banned from buttons, table cells, empty states, alerts, and chrome. Icons do that job.

### Examples

| ❌ Avoid | ✅ Use |
|---|---|
| "Oops! Something went wrong." | "Stream connection failed. Retry in 4s." |
| "🎉 Your stream is live!" | "Stream started · 32 ms latency" |
| "Powerful AI-driven insights" | "Object detection · 94% confidence" |
| "Click here to manage your streams" | "Manage streams" |
| "Are you sure you want to delete?" | "Delete stream 'Warehouse-NE-04'? Configuration and 30 days of history will be removed." |

---

## Visual Foundations

The aesthetic is **operator console, not consumer app.** Think: Bloomberg terminal calmed down, Grafana tightened up, Linear's rhythm applied to a NOC. High information density, low chrome, type-led hierarchy, restrained color used only to carry signal.

### Color

- **Neutral-dominant, blue-accented.** The interface reads near-monochrome; color is a language for state — `success`, `warning`, `error`, `info` — not decoration.
- **Dark theme is the primary theme.** Operators run this 24/7 on wall-mounted displays. Light theme is provided but secondary.
- **Primary** is MUI-derived blue `#1976d2` (light) / `#90caf9` (dark). It carries interaction affordance, nothing else.
- **Semantic channel** is explicit: `success` green for healthy streams, `warning` amber for degraded (frame drops, high latency), `error` red for disconnected / alerting, `info` blue for neutral system messages.
- **Live / streaming** uses a saturated teal-green `#10b981` pulsed at low opacity. Distinct from `success` so "currently broadcasting" ≠ "OK".
- **No gradients** in UI chrome. Gradients only appear in (a) data-visualization fills (chart areas, gauges) and (b) the protection scrim at the top of video tiles so overlay text stays readable on any frame.
- **Backgrounds** are solid. Dark: `#0b0f14` canvas, `#12171f` surface, `#1a2028` raised. Light: `#f7f8fa` canvas, `#ffffff` surface, `#eef1f5` raised.

### Typography

- **Inter** for all UI text. Weights 400 / 500 / 600 / 700. Tabular numerals enabled (`font-variant-numeric: tabular-nums`) globally — essential for stream tables and metric readouts.
- **Roboto Mono** for any value that is a raw technical string: stream IDs, URLs, IP addresses, timestamps in logs, code snippets.
- **No serif, no display face.** Single sans + single mono. Intentional.
- **Tight hierarchy:** 32 / 24 / 20 / 16 / 14 / 13 / 12 / 11. 14 is body default — the dashboard is dense. 13 is row text in tables. 11 is reserved for uppercase metadata chips.
- **Line-height** is tight: 1.2 for headings, 1.5 for body, 1.3 for table cells.

### Spacing

- **8 px base grid.** Tokens: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.
- **Dense by default.** Table row height 40 px. Input height 36 px. Icon button 32 px. These are tighter than MUI defaults because operators need more rows visible per screen.

### Borders & radii

- **4 px** for chips, inputs, small buttons.
- **8 px** for cards, dialogs, panels.
- **12 px** for the outer app shell edges only.
- **1 px hairline borders** on cards in both themes — subtle, but present. Dark: `rgba(255,255,255,0.08)`. Light: `rgba(15,23,42,0.08)`. Borders are preferred over drop shadows for separation.

### Shadows

- **Elevation is used sparingly.** Cards sit flat with hairline borders. Shadows appear only on floating elements: dropdowns, popovers, tooltips, modals.
- Three levels:
  - `shadow-1` — dropdowns, tooltips: small, tight.
  - `shadow-2` — popovers, floating toolbars.
  - `shadow-3` — modals, command-k palette: larger, warmer blur.
- In dark theme, shadows are near-black but we also add a top inner highlight on raised surfaces (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.04)`) to suggest elevation without a drop.

### Imagery

- **Video frames** are the imagery. Display them at their native aspect (16:9 default), with a thin 1 px inner stroke and a top protection gradient so labels stay readable on bright frames.
- **No stock photography anywhere.** Marketing / login screens use abstract sensor-grid patterns rendered from CSS or inline SVG (dot matrix, scanning-line motif).
- **Placeholder frames** when video isn't loading show a static noise pattern or a solid surface color with the stream ID in mono.

### Animation

- **Functional only.** Nothing bounces. Nothing celebrates.
- **Durations:** 120 ms (micro — hover, press), 200 ms (small — dropdowns, tooltips), 320 ms (medium — panel slide, modal), 500 ms (large — rare, page transitions).
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` for entrance/settle (standard Material-ish out-curve). Linear for loading indicators and live-data tickers.
- **Real-time updates** use a 200 ms cross-fade on values that change. No slide, no flip — just a value swap with a subtle highlight. High-frequency update series (chart tails) update without animation to stay legible.
- **Live pulse:** the `LIVE` dot on active streams uses a 2 s opacity pulse (0.4 → 1 → 0.4). This is the only ambient animation.

### Interaction states

- **Hover:** surface lightens by a fixed delta in dark, darkens in light. Buttons gain a 1 px inner highlight. Links gain a 1 px underline. Cursor becomes `pointer` only on actionable elements.
- **Focus:** 2 px outer ring in primary blue at 60% alpha, offset 2 px. Always visible on keyboard focus; suppressed on mouse focus using `:focus-visible`.
- **Active / press:** surface darkens by a fixed delta in both themes. No scale transform (this is a console, not an app).
- **Disabled:** 0.4 opacity, `cursor: not-allowed`.
- **Selected:** primary-tinted background (8% alpha), primary-tinted left border (2 px).

### Transparency & blur

- **Used rarely.** The app chrome is opaque. Blur appears in two places only:
  1. **Overlay scrims** behind modals and command palette (`backdrop-filter: blur(8px)`, background `rgba(11,15,20,0.6)` in dark).
  2. **Sticky table headers and toolbars** when content scrolls beneath (`backdrop-filter: blur(12px)`, background 70% alpha surface).

### Cards

- Flat surface color, 1 px hairline border, 8 px radius, no shadow at rest. On hover within a card grid: border color shifts to 14% alpha + surface lightens by 2%. No lift transform.

### Layout rules

- **Fixed app shell.** 240 px left nav (collapsible to 56 px icon rail), 48 px top bar, 100% content area. Footer exists only on login / error pages.
- **Content max-width:** 1600 px, centered. Dashboard grid pages ignore max-width and fill. Settings / forms cap at 840 px.
- **Grid:** 12-col, 16 px gutter at `<1280`, 24 px gutter at `≥1280`.
- **Breakpoints:** `sm` 600, `md` 960, `lg` 1280, `xl` 1600. Below `md` the nav becomes a drawer.

### Density tokens

Every surface supports **Comfortable** (default, 40 px row) and **Compact** (32 px row). Operators on wall displays use Comfortable; analysts working through long lists switch to Compact. Exposed as a top-bar toggle.

---

## Iconography

- **Icon library:** **Lucide** (https://lucide.dev), loaded from CDN. Stroke-based, 1.5 px stroke weight at 20 px canvas, 16 / 20 / 24 / 32 sizes.
- **Why Lucide:** it's the open successor to Feather, it's comprehensive (1500+ icons including specific ones we need: `video`, `camera`, `radio`, `activity`, `alert-triangle`, `bell`, `grid-3x3`, `layout-dashboard`, `server`), and its neutral stroke-only style matches the operator-console aesthetic. The spec doesn't mandate an icon set, so we choose.
- **Stroke weight is fixed at 1.5 px** in the CSS. Do not mix fill icons with stroke icons. No duotone. No color inside icons — they inherit `currentColor`.
- **Default icon color** is `--fg-2` (secondary text). Icons carrying state (alerts, status dots) use the semantic color.
- **No emoji** in the UI. Anywhere.
- **No custom SVG illustrations** inside components. Empty states and login use a single abstract motif (scanning dot-grid) rendered in CSS, not hand-drawn SVG people / devices / floating cards.
- **Status indicators** use an 8 px filled dot — not an icon, not a badge with text — for the common case (live, offline, degraded). Status chips with label + icon are used when label is required.
- **Logos / product marks** for the platform itself are placeholders — a geometric "aperture + scan line" mark is included in `assets/` but should be replaced with the final brand mark when available.

---

## Flagged substitutions & caveats

- **Fonts:** spec names "Inter" — we ship Inter from Google Fonts. No custom webfont was provided. Roboto Mono is our own addition for technical strings. If there is a licensed brand face, drop the `.woff2` files into `fonts/` and update the `@font-face` blocks.
- **Icons:** spec is silent on icon library. We chose Lucide. If the platform later adopts Material Symbols (MUI's native sibling), the swap is cosmetic — Lucide's names align closely.
- **Logo:** the included `assets/logo.svg` is a placeholder mark designed in-house against the platform's name. Replace with the real mark when it exists.
- **Theme:** dark is primary here because operators run 24/7 displays. If the product decides light is primary, swap the default at the `:root` level in `colors_and_type.css` — no component changes needed.
- **No actual screenshots or Figma were provided**, so the UI kit is inferred from the spec's component inventory. Every component name we build (`StreamCard`, `MetricsWidget`, `AlertPanel`, `RealTimeChart`) traces to a named component in the frontend-dashboard spec.
