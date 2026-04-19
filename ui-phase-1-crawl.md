# UI Design — Phase 1 (Crawl)

**Objective:** A minimal, focused interface that proves real-time video ingestion and basic computer-vision inference end-to-end. Target user: a security operator or developer monitoring 1–10 cameras with live object detection overlay.

This document is the companion to [`roadmap.md`](./roadmap.md) Phase 1 and to the Phase 1 deployment architecture described in `../project-overview/03-implementation-approach.md`.

---

## 1. Design Goals

1. **Demonstrate the platform in under 60 seconds.** A visitor to the live demo should see detections running on a sample stream without signing up or configuring anything.
2. **Operator usability over feature surface.** Only the controls a live-monitoring operator actually uses in the first week. Anything else goes in settings or waits for Phase 2.
3. **Performance is the aesthetic.** The UI must feel responsive at 25 FPS on a mid-range laptop. No jank, no layout shifts, no heavy animations.
4. **Portfolio-visible.** Every screen should look production-grade from day one — this is the surface recruiters will see.

---

## 2. Information Architecture

```
┌───────────────────────────────────────────────┐
│  Top Nav: Logo · Cameras · Events · Settings  │
├───────────────────────────────────────────────┤
│                                                │
│                Main Content                    │
│         (Live Monitor · List · Detail)         │
│                                                │
├───────────────────────────────────────────────┤
│  Status Bar: FPS · Latency · Uptime · Alerts  │
└───────────────────────────────────────────────┘
```

**Three top-level routes:**

- `/cameras` — grid of all cameras (default landing)
- `/cameras/:id` — single-camera live monitor
- `/events` — chronological event list
- `/settings` — configuration modal

A persistent left sidebar is deferred to Phase 2. In Phase 1 the navigation stays in the top bar to keep the layout simple and the video area maximal.

---

## 3. Screen: Camera Grid (Landing)

The first screen a user sees. Shows all configured cameras as live tiles.

```
┌────────────────────────────────────────────────────────────┐
│ ● video_analytics_platform      [+ Add Camera] [Settings]  │
├────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│   │  [live feed] │  │  [live feed] │  │  [live feed] │     │
│   │ 🟢  Cam 1    │  │ 🟢  Cam 2    │  │ 🟠  Cam 3    │     │
│   │ 25 FPS · 3 🚶│  │ 24 FPS · 1 🚗│  │ buffering    │     │
│   └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│   ┌──────────────┐  ┌──────────────┐                        │
│   │  [live feed] │  │  [+ Add]     │                        │
│   │ 🔴  Cam 4    │  │              │                        │
│   │ offline      │  │              │                        │
│   └──────────────┘  └──────────────┘                        │
│                                                              │
├────────────────────────────────────────────────────────────┤
│ 5 cameras · 4 live · 1 offline · Avg latency 52ms · SLA 99% │
└────────────────────────────────────────────────────────────┘
```

### Tile Components
- **Live video thumbnail** (downsampled stream, ~360p, updated every 500ms)
- **Status indicator** (top-left): 🟢 live · 🟠 buffering · 🔴 offline · ⚫ disabled
- **Camera name** (top-right)
- **Real-time metrics footer:** FPS · current detection count (icon per class)
- **Hover state:** reveals small action icons (fullscreen, pause, remove)
- **Click:** opens single-camera monitor view

### Grid Behavior
- Auto-fit between 1 and 4 columns based on viewport width
- Minimum tile size 320×180; maintains 16:9 aspect ratio
- Tiles reflow smoothly when adding/removing cameras
- Empty state (no cameras): large centered "Add your first camera" CTA

---

## 4. Screen: Single-Camera Live Monitor

Primary work view. Full-width video with detection overlay and a collapsible right sidebar.

```
┌────────────────────────────────────────────────────────────────┐
│ ← Back  ·  Cam 1 — Loading Dock           [Settings] [⤢]       │
├────────────────────────────────────────────────────────────────┤
│                                                     ┌──────────┤
│                                                     │ STATS    │
│                                                     │ ─────    │
│                                                     │ Model:   │
│              [ live video feed                      │  YOLOv8  │
│                with bounding boxes ]                │ FPS: 25  │
│                                                     │ Lat: 45ms│
│                                                     │ Up: 2h14 │
│                                                     │          │
│                                                     │ DETECTED │
│                                                     │ 🚶 ×3    │
│                                                     │ 🚗 ×1    │
│                                                     │ 🐕 ×2    │
│                                                     │          │
│                                                     │ [Change  │
│                                                     │  Model]  │
├────────────────────────────────────────────────────────────────┤
│ ▶ Live · 🟢  ──●────────────── (scrub, Phase 2) · 🔊 · ⤢       │
└────────────────────────────────────────────────────────────────┘
```

### Video Overlay
Rendered on a `<canvas>` layered above the `<video>` element, synced per-frame to avoid DOM jank:

- **Bounding boxes:** 2px stroke, class-colored
  - 🔵 Person `#3B82F6`
  - 🔴 Vehicle `#EF4444`
  - 🟡 Other `#F59E0B`
  - 🟢 Safe/cleared `#10B981`
- **Label above box:** `class 0.94` — monospace, white text on semi-transparent class color
- **Confidence threshold slider** in settings hides boxes below the chosen value
- **FPS and latency** displayed top-left in small monospace text (can be toggled off for demo clarity)

### Right Sidebar (collapsible)
Default collapsed on viewports < 1200px. Keyboard shortcut `S` toggles.

- **Stats block:** Model, FPS, inference latency, uptime
- **Live detection counts:** icon per class, count updated every 500ms
- **Quick actions:** Change model · Download current frame · View recent events

### Bottom Bar
- Play/pause (live = always playing; pause buffers locally)
- Status dot
- Timeline (disabled in Phase 1, reserved real estate for Phase 2 scrubbing)
- Volume (most streams are silent but control is present)
- Fullscreen

---

## 5. Screen: Events List

Chronological log of detections and state changes. Intentionally minimal in Phase 1 — this is where Phase 2 will add filtering, search, and historical playback.

```
┌────────────────────────────────────────────────────────────────┐
│ Events                                   [Last 1h ▼] [Export]  │
├────────────────────────────────────────────────────────────────┤
│ 14:32:15   Cam 1   Person detected (0.94)              [view]  │
│ 14:30:42   Cam 3   Vehicle detected (0.88)             [view]  │
│ 14:28:19   Cam 2   Person detected (0.91)              [view]  │
│ 14:25:03   Cam 1   Stream reconnected                          │
│ 14:24:51   Cam 1   Stream lost                                 │
│ 14:22:10   Cam 2   Person detected (0.79)              [view]  │
├────────────────────────────────────────────────────────────────┤
│ Showing 6 of 142 events · Load more                             │
└────────────────────────────────────────────────────────────────┘
```

- Virtualized list (react-window) — scrolls smoothly with thousands of rows
- Time range filter (dropdown): 1h, 24h, 7d, custom
- `[view]` button opens a modal with the frame thumbnail at that timestamp
- `[Export]` produces a CSV of the filtered events

---

## 6. Modal: Add / Edit Camera

Opened from the `[+ Add Camera]` button on the grid.

```
┌──────────────────────────────────────┐
│ Add Camera                      [×]  │
├──────────────────────────────────────┤
│                                       │
│ Name                                  │
│ ┌──────────────────────────────────┐ │
│ │ Loading Dock                      │ │
│ └──────────────────────────────────┘ │
│                                       │
│ Stream URL                            │
│ ┌──────────────────────────────────┐ │
│ │ rtsp://192.168.1.42:554/stream    │ │
│ └──────────────────────────────────┘ │
│ RTSP · HTTP · HLS · file upload      │
│                                       │
│ Inference Model                       │
│ ┌──────────────────────────────────┐ │
│ │ YOLOv8 (general)             [▼] │ │
│ └──────────────────────────────────┘ │
│                                       │
│ [Test Connection]           🟢 OK    │
│                                       │
│          [Cancel]    [Save Camera]   │
└──────────────────────────────────────┘
```

- **Test Connection** runs a 5-second probe before saving — validates connectivity and returns first-frame dimensions.
- Model dropdown lists the available ONNX models on the inference service.
- Errors are inline and specific ("Stream unreachable", "Unsupported codec", "Auth required").

---

## 7. Modal: Settings

```
Settings › Display
  ☐ Show bounding boxes          (default on)
  ☐ Show class labels            (default on)
  ☐ Show confidence score        (default off)
  Confidence threshold: ─────●──── 0.60
  Theme: ● Dark   ○ Light
  ☐ Show performance overlay     (default off)

Settings › Inference
  Default model: YOLOv8 ▼
  Frame skip: 0 ▼  (0 = every frame)
  Max concurrent streams: 10

Settings › About
  Version 0.1.0 · commit abc1234
  [View architecture] [Read docs] [Report issue]
```

All settings persist to `localStorage` in Phase 1. Phase 2 moves them to a server-backed user profile.

---

## 8. Design System

### Colors

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0F1115` | App background |
| `--surface` | `#181B22` | Cards, modals |
| `--surface-raised` | `#22262F` | Hover states |
| `--border` | `#2A2F3A` | Dividers |
| `--text` | `#F5F6F8` | Primary text |
| `--text-muted` | `#9AA0AA` | Secondary text |
| `--accent` | `#3B82F6` | Primary action, links |
| `--success` | `#10B981` | Live, healthy |
| `--warning` | `#F59E0B` | Buffering, degraded |
| `--danger` | `#EF4444` | Offline, error |
| `--class-person` | `#3B82F6` | Detection class |
| `--class-vehicle` | `#EF4444` | Detection class |
| `--class-other` | `#F59E0B` | Detection class |

Dark mode is the default. A light variant exists but is not a Phase 1 priority.

### Typography
- **UI:** Inter variable · 14px base · 13px secondary · 11px captions
- **Monospace:** JetBrains Mono · used for IDs, timestamps, FPS/latency numerics
- **Scale:** 11 / 13 / 14 / 16 / 20 / 28 (display)

### Spacing
4px base grid. Common values: `4, 8, 12, 16, 24, 32, 48`.

### Components
Built on **shadcn/ui + Tailwind**. All components from the shadcn registry; only the camera tile and video-overlay canvas are custom.

---

## 9. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| `≥ 1400px` | Grid: 4 columns · Sidebar expanded · Full controls |
| `1024–1399px` | Grid: 3 columns · Sidebar collapsed by default |
| `768–1023px` | Grid: 2 columns · Sidebar as overlay sheet |
| `< 768px` | Grid: 1 column · Single-camera view uses full screen · Bottom-sheet for sidebar |

Mobile is functional in Phase 1 but not optimized — true mobile experience is Phase 2+.

---

## 10. Interaction Details

- **Animation budget:** 250ms maximum. Only `transform` and `opacity` are animated.
- **Canvas rendering:** Detection overlay redraws on requestAnimationFrame, throttled to match inference tick rate.
- **Keyboard shortcuts:**
  - `G` — go to grid
  - `E` — go to events
  - `S` — toggle sidebar
  - `F` — fullscreen current camera
  - `/` — focus search (Phase 2)
  - `?` — keyboard shortcut cheat sheet
- **Toast notifications** for connect/disconnect, stream added, errors — bottom-right, auto-dismiss 4s.

---

## 11. Accessibility

- WCAG 2.1 AA contrast on all text (verified against the dark palette)
- All interactive elements keyboard reachable; focus rings use `--accent` at 2px
- `prefers-reduced-motion` disables tile thumbnail animation and status-dot pulse
- Alt text for all icons; aria-live region for status bar updates
- No reliance on color alone — status has icon + text

---

## 12. Phase 1 Success Criteria

- A new user with the public URL opens the landing page, sees a live demo with bounding boxes within 3 seconds.
- Adding a new camera from empty state takes under 30 seconds.
- End-to-end perceived latency (camera → bounding box on screen) is under 2 seconds.
- UI sustains 25 FPS on a mid-range laptop with 4 concurrent camera tiles visible.
- Lighthouse performance score ≥ 90 on the public portfolio demo route.

---

## 13. What Phase 1 Does Not Include

Explicitly deferred to later phases, listed here so nothing gets retrofitted sloppily:

- Authentication and multi-user accounts (Phase 2)
- Historical video scrubbing / timeline playback (Phase 2)
- Event search and filtering beyond time range (Phase 2)
- Alert rules and notification routing (Phase 2)
- Multi-site / facility hierarchy (Phase 3)
- Model management UI (Phase 3)
- Heatmaps, analytics dashboards, reports (Phase 2–3)
- Mobile-first layouts (Phase 2+)

---

**Related:** [mission.md](./mission.md) · [tech-stack.md](./tech-stack.md) · [roadmap.md](./roadmap.md) · [ui-phase-2-walk.md](./ui-phase-2-walk.md) · [ui-phase-3-run.md](./ui-phase-3-run.md)
