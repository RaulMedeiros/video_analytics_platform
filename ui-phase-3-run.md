# UI Design — Phase 3 (Run)

**Objective:** Scale the interface from single-facility operations to global enterprise management with custom analytics, ML model governance, multi-site federation, and autonomous operations. Target user: a security director, enterprise analyst, or platform administrator overseeing hundreds of cameras across multiple facilities and regions.

Companion to [`roadmap.md`](./roadmap.md) Phase 3 and to `../project-overview/03-implementation-approach.md` §Phase 3 Run.

---

## 1. Design Goals

1. **Federation first.** An enterprise user switches between sites and sees a unified view — the UI never requires navigating to a separate app per location.
2. **Insight over data.** Executive dashboards surface trends and anomalies; raw event streams are available but not the primary entry point.
3. **Model governance in the open.** ML engineers can deploy, test, and roll back models from the UI without touching the CLI.
4. **Language as an interface.** Natural-language search lets non-technical users query the entire event history without filter expertise.
5. **Customisable surfaces.** Dashboards, reports, and alert templates are created and shared by the organisation, not shipped as fixed views.

---

## 2. Information Architecture

```
┌────────────────────────────────────────────────────────────┐
│ ├─ LiveWall          (multi-site grid, Phase 2 extended)   │
│ ├─ Cameras           (fleet management, all sites)         │
│ ├─ Events            (federated search + NL query)         │
│ ├─ Alerts            (rules + escalation + playbooks)      │
│ ├─ Analytics         (custom dashboards + reports)         │
│ ├─ Models            (ML registry + deployment + A/B)      │
│ ├─ Integrations      (ERP, SCADA, SIEM, webhooks)          │
│ └─ Settings          (org, SSO, billing, audit, branding)  │
└────────────────────────────────────────────────────────────┘
```

New in Phase 3: **Models** and **Integrations** sections; Settings expands to cover SSO, branding, and compliance. The facility selector from Phase 2 becomes a multi-site federation selector.

---

## 3. Shell Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Aperture ·  🌐 All Sites ▼        🔍 Ask anything…   🔔 7  👤 RM ▼│
├──────────┬─────────────────────────────────────────────────────┤
│          │                                                       │
│  ● Wall  │                                                       │
│  ▸ Cameras│                                                      │
│  ▸ Events │              Main Content                            │
│  ▸ Alerts │                                                       │
│  ▸ Anly. │                                                       │
│  ▸ Models │                                                       │
│  ▸ Integr.│                                                       │
│          │                                                       │
│  ⚙ Setgs │                                                       │
├──────────┴─────────────────────────────────────────────────────┤
│ 🟢 312 live · ⚠ 4 degraded · ⛔ 2 offline · p95 198ms · SLA 99.7%│
└────────────────────────────────────────────────────────────────┘
```

- **Federation selector** ("All Sites" / specific region / specific facility) collapses or expands the data scope for every screen.
- **Natural-language search bar** replaces the Phase 2 ⌘K launcher; understands queries like "loitering events at HQ last week" or "cameras offline in EMEA".
- **Status bar** aggregates fleet health across all selected sites.

---

## 4. Screen: Live Wall (Extended)

Extends Phase 2's Live Wall with cross-site awareness.

- **Site grouping** — tiles can be grouped by site; headings separate sites visually.
- **Regional presets** — saved layouts scoped to a region ("EMEA Night Shift", "North America Entrances").
- **Autonomous alert response indicator** — tiles flash when an automated playbook is executing (e.g., auto-locking a door), with a status badge showing the action taken.
- All Phase 2 behaviour (layouts, tile context menu, alert strip) carries forward unchanged.

---

## 5. Screen: Cameras (Fleet Management)

Extends Phase 2 with cross-site fleet operations.

- **Global search and filter** across all sites — filter by region, facility, zone, model version, firmware version.
- **Bulk model assignment** — select 50 cameras, assign a new detection model version; progress shown in a job panel.
- **Health dashboard inline** — per-camera uptime percentage, latency trend sparkline, last firmware update date.
- **Firmware management** — list available firmware versions, stage rollouts by group, view rollout progress.

---

## 6. Screen: Events (Federated Search + Natural Language)

```
┌────────────────────────────────────────────────────────────────┐
│ Events                                                           │
│ 🔍 "loitering events at loading docks across all sites"         │
├──────────────────────────────────────────────────────────────┤
│  12 results · 3 sites · last 30 days   [Refine ▼]  [Export]    │
│                                                                  │
│  ┌──────────────────────────────────┬───────────────────────┐  │
│  │  Video playback                  │ Event detail          │  │
│  │  with detection overlay          │ ──────────            │  │
│  │                                  │ 2026-04-10 · 09:14    │  │
│  │                                  │ Berlin HQ · Cam 11    │  │
│  │                                  │ Loitering · 0.91      │  │
│  └──────────────────────────────────┴───────────────────────┘  │
│                                                                  │
│  2026-04-10 09:14  Berlin HQ / Cam 11  Loitering  0.91  [▶]    │
│  2026-04-08 22:33  London DC / Cam 7   Loitering  0.87  [▶]    │
│  …                                                               │
└────────────────────────────────────────────────────────────────┘
```

- **Natural-language query** — the search bar accepts plain-English questions and translates them to structured filters, showing the inferred filter chips so the user can correct them.
- **Cross-site results** — site and facility shown per row; group-by site or by class via toggle.
- **Export** — CSV, JSON, or video clip archive scoped to the filtered result set.
- Manual filter sidebar still accessible via "Refine" for power users.

---

## 7. Screen: Alerts (Escalation + Playbooks)

Extends Phase 2 alerting with multi-tier escalation and automated playbooks.

### Playbooks
A playbook is an ordered action sequence triggered by an alert rule:

```
Playbook: Unauthorised after-hours entry
─────────────────────────────────────────
Step 1 (immediate)
  ● Lock door relay via integration: Building Access API
  ● Notify on-call security via PagerDuty

Step 2 (if unacknowledged after 2 min)
  ● Escalate to Site Security Manager (SMS)

Step 3 (if unacknowledged after 10 min)
  ● Open incident in ServiceNow
  ● Archive 60-second clip to evidence store
```

Playbook builder uses the same declarative pattern as the Phase 2 rule editor. Steps can be reordered by drag.

### Global alert console
- Aggregated view across all sites, filterable by site, severity, state.
- Heat map showing alert density by site over the past 7 days.
- SLA tracking: time-to-acknowledge p50/p95 per rule and per site.

---

## 8. Screen: Analytics (Custom Dashboards + Reports)

Phase 3 replaces Phase 2's single stock dashboard with a fully custom dashboard engine.

### Dashboard builder
```
┌────────────────────────────────────────────────────────────────┐
│ Dashboard: Executive Summary       [Edit] [Share] [Schedule ▼] │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│ │ Total Events │ │ Fleet Uptime │ │ Mean Resp.   │            │
│ │  2.1M / mo   │ │   99.7%      │ │   187ms p95  │            │
│ └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                  │
│ [Area chart: detections by region, 30d]                        │
│ [Map: camera density by facility]                              │
│ [Table: top-10 alert rules by volume this month]               │
└────────────────────────────────────────────────────────────────┘
```

- **Widget library:** KPI card, area/bar/pie chart, data table, map, heatmap, funnel, text block.
- **Data sources per widget:** event counts, latency metrics, uptime SLA, detection accuracy, alert volumes, custom SQL-compatible queries via API.
- **Scoping:** each widget can be scoped independently (e.g., one KPI shows all sites, another shows only EMEA).
- **Sharing:** dashboards are shared by link or embedded via `<iframe>`; live or snapshot mode.

### Scheduled reports
- PDF or CSV exports on a cron-like schedule (daily, weekly, monthly).
- Delivery via email, Slack, or webhook.
- Separate permission role: **Reporter** — can view and export dashboards but not configure cameras or alerts.

---

## 9. Screen: Models (ML Registry + Deployment)

New in Phase 3. This screen is the primary interface for ML engineers and data scientists.

```
┌────────────────────────────────────────────────────────────────┐
│ Models                                          [+ Upload Model] │
├────────────────────────────────────────────────────────────────┤
│ Name            Version  mAP    Cameras  Status    Actions      │
│ ─────────────────────────────────────────────────────────────── │
│ yolo-v8-nano    3.2.1    91.4%  287      Production  [Manage]   │
│ yolo-v8-small   3.2.1    93.1%   15      Canary 5%   [Manage]   │
│ custom-gate-v2  1.0.0    88.7%    8      Staging     [Manage]   │
└────────────────────────────────────────────────────────────────┘
```

### Model detail
- **Metadata:** framework, input shape, classes, training dataset, performance benchmarks.
- **Deployment status:** number of cameras on each version; region breakdown.
- **A/B rollout controls:** set canary percentage, promote to production, or roll back — all with confirmation dialogs. Rollback completes in <5 minutes.
- **Accuracy monitor:** live accuracy feed vs. labelled ground-truth samples; drift detection alert threshold configurable.
- **Experiment comparison:** side-by-side metric comparison between two versions on the same camera group.

---

## 10. Screen: Integrations

New in Phase 3. Centralises all outbound and inbound connections.

### Integration categories
| Category | Examples |
|---|---|
| Identity | SAML 2.0, OIDC, Azure AD, Okta |
| Notification | Slack, PagerDuty, SMTP, SMS |
| Ticketing | ServiceNow, Jira, Zendesk |
| Access control | Lenel, Genetec, generic door relay API |
| SIEM / logging | Splunk HEC, Elasticsearch, Datadog |
| Custom | Generic webhook, REST outbound, Kafka topic |

Each integration is configured with a guided wizard: authenticate, map fields, test connection, set scope (all sites or specific). Connection health is shown per integration with last-success timestamp.

---

## 11. Screen: Settings (Enterprise Tier)

Extends Phase 2 settings with SSO, branding, compliance, and billing.

- **Authentication** — full SAML 2.0 and OIDC configuration; SCIM provisioning for user sync.
- **Branding** — logo, primary colour, custom domain (`analytics.customer.com`); affects login page and PDF report headers.
- **Compliance** — data retention policy per region; GDPR/CCPA data export and deletion requests; audit log export.
- **API & Webhooks** — scoped API keys, webhook secret rotation, rate limit overrides.
- **Billing** — usage metering per camera-month, invoice history, overage alerts.
- **Audit log** — full audit trail: who changed what, when, from which IP; exportable to SIEM.

---

## 12. Design System — Additions

Extends Phase 2 tokens and components. No tokens are removed.

### New tokens
| Token | Value | Use |
|---|---|---|
| `--federation-indicator` | `#8B5CF6` | Cross-site action markers |
| `--playbook-running` | `#10B981` | Active automated playbook status |
| `--model-canary` | `#F59E0B` | Canary deployment badge |
| `--model-stable` | `#3B82F6` | Production model badge |

### New components
- **Natural-language search bar** — query input with inferred filter chip preview
- **Federation selector** — hierarchical region → facility → zone picker
- **Dashboard canvas** — drag/resize widget grid (built on react-grid-layout)
- **Model rollout slider** — percentage input with live camera count preview
- **Playbook step builder** — ordered, draggable action list
- **Map widget** — facility pin map with status overlays

---

## 13. Responsive and Multi-screen

Phase 3 introduces dedicated mobile and kiosk surfaces.

- **Executive mobile view:** dashboard KPI cards and alert feed only; no camera management. Optimised for phones at <768px.
- **Control room kiosk mode:** full-screen Live Wall with minimal chrome; locked orientation; auto-cycling layouts.
- **Tablet:** full Phase 2 parity on tablets ≥1024px; touch-friendly drag handles for dashboard builder.
- **Embedded widget:** single dashboard widget embeds in third-party portals via `<iframe>` + API key scoping.

---

## 14. Real-time Fidelity

Inherits all Phase 2 WebSocket commitments, with additions:

- **Playbook status events** — pushed to the Live Wall tile and Alerts console as steps execute.
- **Model rollout progress** — streaming job updates as canary deployment propagates across camera fleet.
- **Federation heartbeat** — per-site connectivity status, updated every 5s; disconnected sites shown with a degraded badge in the federation selector.

---

## 15. Phase 3 Success Criteria

- An admin can switch between three sites and see a unified Live Wall within 2 seconds of selecting "All Sites".
- A natural-language query returns the first page of results in < 3 seconds for queries spanning 90 days of history.
- An ML engineer deploys a new model to a canary group of 10 cameras and receives accuracy metrics within 5 minutes.
- A custom dashboard created by one user is accessible to a shared role group within 1 minute of publishing.
- SSO login (SAML) completes within 3 seconds of IdP redirect.
- Playbook step 1 executes within 2 seconds of the triggering alert.

---

## 16. What Phase 3 Does Not Include

- Mobile-native apps (iOS/Android) — out of scope
- On-device edge inference UI (managed separately via edge agent CLI)
- Video content search by object appearance (visual similarity search — post-Phase 3)
- Real-time transcription or audio analytics
- Offline-first / air-gapped installation wizard

---

**Related:** [mission.md](./mission.md) · [tech-stack.md](./tech-stack.md) · [roadmap.md](./roadmap.md) · [ui-phase-1-crawl.md](./ui-phase-1-crawl.md) · [ui-phase-2-walk.md](./ui-phase-2-walk.md)
