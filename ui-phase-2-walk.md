# UI Design — Phase 2 (Walk)

**Objective:** Scale the interface from single-operator monitoring to multi-stream operations with alerting, historical playback, search, and basic analytics. Target user: a SOC analyst or facility operator managing 10–100 cameras across one or more sites.

Companion to [`roadmap.md`](./roadmap.md) Phase 2 and to `../project-overview/03-implementation-approach.md` §Phase 2 Walk.

---

## 1. Design Goals

1. **Multi-stream fluency.** An operator should be able to monitor 16+ cameras at once without visual overload.
2. **Alerts over scanning.** The UI surfaces what needs attention — operators should never have to stare at video waiting for something to happen.
3. **Time is a first-class axis.** Every camera, every event, every chart is navigable backward in time through a consistent scrubber pattern.
4. **Search before clicking.** Anything findable should be findable through search — events, cameras, alerts, settings.
5. **Role-aware.** Admins see configuration; operators see the wall; analysts see events and reports.

---

## 2. Information Architecture

```
┌──────────────────────────────────────────────────────────┐
│ ├─ LiveWall          (multi-camera grid, default)        │
│ ├─ Cameras           (list + detail + add/edit)          │
│ ├─ Events            (timeline + search + playback)      │
│ ├─ Alerts            (rules + history + ack)             │
│ ├─ Analytics         (dashboards + charts)               │
│ └─ Settings          (org, users, integrations)          │
└──────────────────────────────────────────────────────────┘
```

Introduced in Phase 2: a persistent left sidebar navigation, replacing Phase 1's top-bar simplicity. Authentication gates everything.

---

## 3. Shell Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Logo ·  🏢 HQ ▼             Search…      🔔 3    👤 Ana ▼      │
├──────────┬─────────────────────────────────────────────────────┤
│          │                                                       │
│  ● Wall  │                                                       │
│  ▸ Cameras│                                                      │
│  ▸ Events│              Main Content                             │
│  ▸ Alerts│                                                       │
│  ▸ Anly. │                                                       │
│          │                                                       │
│  ⚙ Setgs │                                                       │
├──────────┴─────────────────────────────────────────────────────┤
│ 🟢 42 live · ⚠ 2 degraded · ⛔ 1 offline · p95 230ms · SLA 99.2% │
└────────────────────────────────────────────────────────────────┘
```

- **Facility selector** in the top-left persists across pages; switches the current working context.
- **Global search** (⌘K / Ctrl+K) searches cameras, events, alerts, settings, docs.
- **Notification bell** shows unacknowledged alerts with a badge count.
- **User menu** for profile, org switching, sign out.
- **Status bar** at the bottom stays persistent, summarizing fleet health.

---

## 4. Screen: Live Wall

Primary operator view. A dense grid of live camera tiles with saved layouts.

```
┌────────────────────────────────────────────────────────────────┐
│ Live Wall                    Layout: [3x3 ▼] [Save] [Edit Grid] │
├────────────────────────────────────────────────────────────────┤
│ ┌──────┐┌──────┐┌──────┐┌──────┐                                │
│ │ Cam1 ││ Cam2 ││ Cam3 ││ Cam4 │  ← each tile: live feed,       │
│ │ 🚶×2 ││ 🚗×1 ││      ││ ⚠  1 │     detection count, status     │
│ └──────┘└──────┘└──────┘└──────┘                                │
│ ┌──────┐┌──────┐┌──────┐┌──────┐                                │
│ │ Cam5 ││ Cam6 ││ Cam7 ││ Cam8 │                                │
│ └──────┘└──────┘└──────┘└──────┘                                │
│ ┌──────┐┌──────┐┌──────┐┌──────┐                                │
│ │ Cam9 ││Cam10 ││Cam11 ││Cam12 │                                │
│ └──────┘└──────┘└──────┘└──────┘                                │
├────────────────────────────────────────────────────────────────┤
│ ⚠ Loitering · Cam 4 · Loading Dock · 3m ago  [View] [Acknowledge]│
└────────────────────────────────────────────────────────────────┘
```

### Layouts
- **Presets:** 1×1, 2×2, 3×3, 4×4, 5×5, picture-in-picture (1 large + 6 small)
- **Custom:** drag-and-drop grid editor with arbitrary row/column spans
- **Saved layouts** per user, shareable across a facility. Layouts have names ("Night Shift", "Loading Dock Focus") and are switched with a hotkey `1-9`.
- **Auto-focus on alert:** when an alert fires, the Live Wall can optionally swap the alerted camera to the large slot of a PiP layout.

### Tile behavior
- Click → expands to single-camera monitor (carries over from Phase 1) with scrubbing enabled.
- Right-click → context menu: pause, mute, replace, open settings, snapshot, start recording clip.
- Drag to rearrange within the current layout.
- Offline/degraded tiles show a frozen last-frame with a semi-transparent overlay.

### Alert strip (bottom)
Persistent, shows the newest unacknowledged alert. Clicking `[View]` navigates to Events filtered to that moment. `[Acknowledge]` clears it; `Esc` dismisses the strip without acknowledging.

---

## 5. Screen: Cameras

Unified management surface for the camera fleet.

### Cameras — List view
- Table with columns: Status · Name · Location · Model · FPS · Latency · Last event · Actions
- Multi-select for bulk operations (enable, disable, change model, delete, move to group)
- Filter chips at top: All · Live · Degraded · Offline · Disabled
- Group-by dropdown: Facility, Zone, Model, Custom tag

### Cameras — Detail view
Three tabs for a single camera:

1. **Overview** — large live feed + current config + recent events inline
2. **Timeline** — full-day scrubbable timeline, event markers on the track
3. **Config** — edit stream URL, credentials, model, zones, schedule, recording policy

### Zone editor (new in Phase 2)
On the Config tab, a visual editor over a paused frame:
- Draw polygons or lines with click-to-add vertices
- Name zones ("Entrance", "Restricted Area") and lines ("North Gate Crossing")
- Assign rules: e.g., "count objects in zone", "alert on line cross"
- Preview with live detections overlaid

---

## 6. Screen: Events

Where operators and analysts live when reviewing. Replaces Phase 1's simple list.

```
┌────────────────────────────────────────────────────────────────┐
│ Events                                                          │
├──────────────┬─────────────────────────────────────────────────┤
│ FILTERS      │  Timeline (last 24h) ─────●─────                │
│ ─────────    │                                                  │
│ Time         │  ┌───────────────────────┬────────────────┐     │
│ ● Last 24h   │  │                        │ Event detail   │     │
│ ○ Custom…    │  │  Video playback at    │ ───            │     │
│              │  │  selected timestamp    │ 14:32:15       │     │
│ Cameras      │  │  with overlay          │ Cam 4          │     │
│ ☑ Cam 1      │  │                        │ Loitering      │     │
│ ☑ Cam 2      │  │                        │ 0.89           │     │
│ ☐ Cam 3      │  └───────────────────────┴────────────────┘     │
│              │                                                   │
│ Classes      │  EVENTS                                          │
│ ☑ Person     │  14:32:15  Cam 4  Loitering      0.89  [play]   │
│ ☑ Vehicle    │  14:30:42  Cam 3  Vehicle        0.88  [play]   │
│ ☐ Other      │  14:28:19  Cam 2  Person         0.94  [play]   │
│              │  …                                                │
│ Confidence   │                                                   │
│ ●─────── 0.70│                                                   │
│              │                                                   │
│ Search…      │                                                   │
│ ┌──────────┐ │                                                   │
└──────────────┴─────────────────────────────────────────────────┘
```

- **Timeline scrubber** at top spans the selected time range; events appear as dots colored by class. Zoom via scroll.
- **Video playback** seeks to the event's timestamp when clicked, with the detection highlighted.
- **Event detail panel** on the right shows metadata, thumbnail, related events, and actions (export clip, ignore similar, create alert rule from this).
- **Filter sidebar** is persistent and URL-encoded — filters are shareable by link.
- **Export** produces CSV of filtered events or a video clip archive (zip of MP4s).

---

## 7. Screen: Alerts

Alerts are *evaluated* rules against events; this screen manages both sides.

### Alerts — Rules tab
```
Rules                                       [+ New Rule]
─────────────────────────────────────────────
☑ Loitering >120s                Cam 1, 4, 7    Active
☑ Line crossing (North Gate)     Cam 3          Active
☑ Crowd size >5 persons          Floor 2 (all)  Active
☐ Abandoned object               —              Disabled
```

### Rule editor
```
Rule: Loitering
────────────────
Trigger when
  ● an object of class [person ▼]
  ● stays inside zone [Entrance ▼]
  ● for longer than [120 ▼] seconds
On
  ● Camera(s): Cam 1, Cam 4, Cam 7
  ● During: Always / Schedule…
Actions
  ☑ Show on Live Wall alert strip
  ☑ Send to #security Slack channel
  ☑ POST webhook https://example.com/hooks/loiter
  ☐ Send SMS to on-call
Severity: ● Low  ○ Medium  ● High
```

Clear, declarative rule construction — no code, no query language, but expressive enough for 90% of common surveillance patterns. Advanced users get a "Show JSON" toggle that reveals the underlying rule DSL.

### Alerts — History tab
Chronological log with acknowledgement state, assignee, resolution notes. Supports bulk acknowledge and filter-by-rule.

---

## 8. Screen: Analytics

Introduces dashboards. Phase 2 ships with one stock dashboard; custom dashboards arrive in Phase 3.

```
┌────────────────────────────────────────────────────────────────┐
│ Analytics · Facility: HQ · Range: Last 7 days                  │
├────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │ Total Events│ │ Avg Latency │ │ Uptime SLA  │                │
│ │    14,523   │ │    231ms    │ │   99.2%     │                │
│ │  ▲ 8% w/w   │ │  ▼ 12ms w/w │ │  ▲ 0.1% w/w │                │
│ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                  │
│ Detections by class (stacked area, 7d)                          │
│ ┌────────────────────────────────────────────────────────────┐ │
│ │  ▂▃▅▇▆▄▃▂▁▁▂▃▅▇▇▆▅▄▃▂▁▁▂▃…                               │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                  │
│ Top cameras by activity                 Zone heatmap            │
│ ┌──────────────────────────┐ ┌──────────────────────────┐      │
│ │ Cam 4 Loading  ████████  │ │  [Floor-plan heatmap     │      │
│ │ Cam 1 Entrance ██████    │ │   with detection density]│      │
│ │ Cam 7 Parking  ████      │ │                          │      │
│ └──────────────────────────┘ └──────────────────────────┘      │
└────────────────────────────────────────────────────────────────┘
```

- **KPI cards** with week-over-week deltas
- **Stacked area chart** for detections by class over the selected range
- **Top-N cameras** bar chart
- **Zone heatmap** (if floor plan uploaded) — detection density overlay
- All charts hover-interactive, click-to-drill into filtered Events view
- **Recharts + Tremor** components; data fetched via GraphQL with skeleton loaders

---

## 9. Screen: Settings

Expanded from Phase 1's modal into a full section with sub-pages:

- **Organization** — name, logo, default timezone
- **Users & Roles** — invite users, assign roles (Admin, Operator, Analyst, Viewer)
- **Authentication** — password policy, SSO (Phase 3 teases SAML/OIDC)
- **API Keys** — scoped keys for integrators
- **Integrations** — Slack, Discord, PagerDuty, generic webhook, SMTP
- **Facilities** — add/edit facilities, upload floor plans
- **Billing** — usage, plan, invoices (stub in Phase 2)
- **Audit Log** — viewer for admin actions

---

## 10. Design System — Additions

Extends the Phase 1 system rather than replacing it. Same tokens, same components, new patterns.

### New tokens
| Token | Value | Use |
|---|---|---|
| `--severity-low` | `#3B82F6` | Low alert severity |
| `--severity-med` | `#F59E0B` | Medium alert severity |
| `--severity-high` | `#EF4444` | High alert severity |
| `--chart-1..6` | palette | Multi-series charts |

### New components
- **Timeline scrubber** — custom, built on D3 scales + Framer Motion
- **Zone editor canvas** — SVG overlay on frozen video frame
- **Rule builder** — composable dropdown chain
- **KPI card** — number + delta + sparkline
- **Grid layout editor** — drag/resize tiles

---

## 11. Responsive and Multi-screen

Phase 2 is the first time a user might run the wall on a large display or video wall.

- **4K / video-wall mode:** 5×5 and 6×6 grids, hide chrome with `W` (toggle wall mode).
- **Dual monitor:** Live Wall on one screen, Events/Alerts on another via `Open in new window`.
- **Tablet:** 2×2 Live Wall, touch-friendly tile actions, swipe to switch saved layouts.
- **Mobile:** focused single-camera view + alerts feed; Live Wall not optimized for <768px.

---

## 12. Real-time Fidelity

Phase 2 commits to WebSocket-driven live data for:
- Live Wall tile metrics (FPS, detection counts) — update every 500ms
- Status bar — aggregate fleet health, update every 1s
- Alerts — push on fire, no polling
- Charts on Analytics — auto-refresh every 30s (configurable)

Back-pressure: if the WebSocket falls behind by >2s, the client auto-downgrades to polling and shows a subtle "reconnecting" indicator.

---

## 13. Phase 2 Success Criteria

- Operator can monitor 16 cameras in a 4×4 grid on a single 1440p display without dropping frames.
- Alert latency (event → toast on Live Wall) < 500ms at p95.
- Event search over 30 days of history returns first results in < 3 seconds.
- New user invited, signed in, granted camera access in < 2 minutes.
- All primary flows accessible via keyboard without mouse.

---

## 14. What Phase 2 Does Not Include

- Multi-site federation (Phase 3)
- Custom dashboards and reports (Phase 3)
- ML model management and A/B UI (Phase 3)
- Natural-language search (Phase 3)
- Mobile-native apps (out of scope)
- White-labeling / theming per customer (Phase 3)

---

**Related:** [mission.md](./mission.md) · [tech-stack.md](./tech-stack.md) · [roadmap.md](./roadmap.md) · [ui-phase-1-crawl.md](./ui-phase-1-crawl.md) · [ui-phase-3-run.md](./ui-phase-3-run.md)
