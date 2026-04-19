# Roadmap

This roadmap operationalizes the three-phase **Crawl → Walk → Run** strategy defined in `project-overview/03-implementation-approach.md` and binds every phase to a **portfolio-visible outcome**. The rule: no six-month stretch of invisible work. Every phase updates the public web presence with something a visitor can see, click, or read.

Durations below mirror the implementation-approach document (6 / 12 / 18 months). Timelines assume single-engineer bandwidth with occasional contractor help; they flex on calendar time but not on the *order* of work or the *exit criteria* of each phase.

---

## Starting Position

- Repository contains `README.md` (project name only), `LICENSE` (GPL-3.0), and the `project-overview/` planning docs.
- No services, no infrastructure, no deployment target, no public web presence.
- Architectural vision and end-state are well-defined; execution is entirely ahead.

The first visible artifact is the portfolio landing page, scaffolded in Phase 0 and progressively filled in through every subsequent phase.

---

## Phase 0 — Foundations (Weeks 1–3, pre-Phase-1)

Close every architectural coin-flip before product code is written.

- **Repo skeleton.** Monorepo layout matching `tech-stack.md` §12. `uv`, Go modules, pnpm. Pre-commit hooks, linters, type-checkers wired. `justfile` for common tasks.
- **Event schema v0.** Canonical Protobuf + Pydantic definitions for `CameraSource`, `Frame`, `Detection`, `Track`, `Event`, `Alert`. This is the contract every downstream service inherits.
- **ADR process live.** `docs/adr/` folder with a template and the first three ADRs written: choice of Go + Python polyglot, choice of Redis Streams for Phase 1 over Kafka, choice of GStreamer over pure-OpenCV ingestion.
- **Kubernetes dev cluster.** Terraform + Helm + ArgoCD pointed at a small GPU-capable cluster (one node with an NVIDIA GPU is enough). GitOps loop working: merge to main → ArgoCD syncs → cluster updates.
- **CI/CD baseline.** GitHub Actions: lint, type-check, test, build, push images.
- **Pinned sample stream.** Self-recorded or public-domain video loop accessible at a known URL, usable as deterministic fixture for tests, demos, and benchmarks.
- **Portfolio landing page v0.** Astro site at the root domain: who, what, why, link to repo. No demo yet — but the page exists, and every subsequent phase fills it in.

**Exit criterion:** an empty Go service and an empty Python service both deploy to the dev cluster from a git push. Landing page is live.

---

## Phase 1: Crawl (Months 1–6)

Per the implementation-approach doc: single-cluster deployment, simplified stack, 50–100 concurrent streams, <500ms latency, 95% uptime.

### Subphase 1A — First Frame End-to-End (Weeks 4–8)

The smallest possible path from a camera to a visible event.

- **Ingest service** (Go + go-gst): pulls RTSP, publishes frames to Redis Streams.
- **Inference worker** (Python): consumes frames, runs YOLOv8 via ONNX Runtime on GPU, publishes `Detection` events.
- **API gateway** (Go): `GET /cameras`, `GET /events`, WebSocket `/stream/events`.
- **PostgreSQL with TimescaleDB extension** for event storage.
- **Minimal dashboard** (Next.js): one route, live annotated frame, rolling event list.
- **Portfolio update:** landing page embeds the dashboard in read-only demo mode.

**Exit criterion:** anyone with the public URL sees live detections on the sample stream with <2s end-to-end latency (perceived end-to-end UI latency; AI pipeline target is <500ms processing latency).

### Subphase 1B — Make It a Platform (Weeks 9–16)

Turn the one-pipeline demo into a platform that can run many pipelines.

- **Pluggable pipeline graph:** detector → tracker → zone logic → event emitter, expressed as config per camera, not hard-coded.
- **ByteTrack** integration for multi-object tracking.
- **Zone and line primitives** via Supervision: occupancy, line crossings, dwell time.
- **Multi-camera support:** dynamic add/remove via API, ingest pool feeding inference pool.
- **MinIO** for clip and keyframe archival; clips auto-captured on events of interest.
- **Observability stack online:** Prometheus, Grafana, Loki, Tempo, OpenTelemetry instrumentation.
- **Portfolio update:** architecture tour page published; dashboards showing live GPU utilization, FPS, latency are publicly linked.

**Exit criterion:** three simulated cameras run simultaneously with configurable per-camera pipelines; clips are archived on events; internal observability is working and partially public.

### Subphase 1C — Phase 1 Hardening (Weeks 17–24)

Make it real. Prove the targets.

- **Load testing** to 50–100 concurrent streams. Results published as the first entry on a public benchmarks page.
- **Reliability drills:** kill pods, disconnect cameras, simulate GPU OOM — document behavior, fix the bad ones, publish post-mortems.
- **Evaluation harness** running against a held-out dataset (candidates: MOT17 for tracking, a small COCO subset for detection). First accuracy numbers published.
- **ADRs written for every non-obvious Phase 1 choice.** Linked from the README and landing page.
- **First blog post** on the project website — likely "Why Redis Streams (for now) beat Kafka" or "GStreamer vs OpenCV for RTSP ingestion."

**Exit criterion (Phase 1 complete):** 50–100 concurrent streams sustained, <500ms latency, 95% uptime over a rolling 7-day window, public benchmarks page, at least 5 ADRs, one published blog post.

---

## Phase 2: Walk (Months 7–18)

Per the implementation-approach doc: Kubernetes microservices, service mesh, advanced AI, 500–1,000 concurrent streams, <300ms latency, 99% uptime.

### Subphase 2A — Platform Migration (Months 7–9)

Move from Phase 1 simplified stack to the Phase 2 architecture without losing the demo.

- **Kafka (Strimzi) replaces Redis Streams** as the primary event bus. Redis Streams demoted to cache/pub-sub.
- **Istio service mesh** deployed; mTLS between services; traffic shaping for canary deploys.
- **TorchServe** replaces in-process ONNX Runtime for model serving. Dynamic batching, model versioning, A/B hooks wired.
- **Multi-database split:** InfluxDB for time-series, PostgreSQL for transactional, Redis for cache, Elasticsearch added for event search.
- **GraphQL endpoint** alongside REST and WebSocket.
- **Vault** for secrets; Keycloak + OPA for auth.
- **Migration strategy:** blue-green, zero downtime, rollback available at each step.
- **Portfolio update:** architecture page revised to show Phase 2 diagram; a dedicated "migration write-up" page published narrating how it was done.

### Subphase 2B — Advanced AI Capabilities (Months 10–13)

Custom models, custom training, pose, behavioral analytics.

- **Custom model training pipeline** with MLflow for experiment tracking.
- **Pose estimation pipeline** (YOLOv8-pose or MediaPipe) as a first-class pipeline stage.
- **Behavioral analytics:** track histories analyzed for loitering, crowd density, path anomalies.
- **A/B testing infrastructure** on models via TorchServe model versions + routing.
- **TensorRT engines** for primary models; speedup measured and published on the benchmarks page.
- **Alerting engine:** rules over events, webhooks with signed payloads, Slack / Discord / PagerDuty integrations.
- **Portfolio update:** second blog post on a CV-specific topic (fine-tuning methodology, tracker comparison, model optimization results). Live demo now shows pose overlay option.

### Subphase 2C — Scaling Validation (Months 14–18)

Prove the Phase 2 targets.

- **Load testing to 500–1,000 concurrent streams.** Multi-zone Kubernetes cluster. Results published.
- **Latency tuning:** every hop measured; hot paths optimized to hit <300ms.
- **Uptime tracking** at 99% over rolling 30-day windows — public SLO dashboard embedded on the portfolio site.
- **First external user(s):** at least one engineer outside the project self-deploying the platform for their own camera. Feedback captured, addressed, and publicly credited.
- **Published evaluation report** comparing the custom-trained model vs. off-the-shelf YOLO baselines on the chosen eval dataset.

**Exit criterion (Phase 2 complete):** 500–1,000 streams sustained, <300ms latency, 99% uptime over a rolling 30-day window, A/B testing demonstrated end-to-end, at least one external deployment documented.

---

## Phase 3: Run (Months 19–36)

Per the implementation-approach doc: multi-region, enterprise security, edge computing, continuous learning, 5,000+ concurrent streams, <200ms latency, 99.99% uptime.

Phase 3 is the most ambitious and the most uncertain. It may compress or expand based on cluster budget and opportunities to partner. Milestones are ordered; durations are directional.

### Subphase 3A — Multi-Region and Edge (Months 19–24)

- **Multi-region Kubernetes** with Istio multi-cluster, global ingress, cross-region event replication.
- **Edge runtimes:** support for at least one edge deployment target (Jetson, AWS Greengrass, or Azure IoT Edge) running a trimmed inference pipeline.
- **Data fabric:** hot/warm/cold tiering implemented in full across S3-compatible storage with automated lifecycle.
- **Portfolio update:** architecture page updated with multi-region diagram; benchmark page gains a cross-region latency section.

### Subphase 3B — Enterprise Security and Compliance (Months 25–30)

- **Full zero-trust posture:** mTLS everywhere, OPA policies for all authorization decisions, HSM-backed key management, automated compliance checks.
- **Audit logging** and SIEM-friendly export.
- **SOC 2 Type I readiness** artifacts produced (even without a formal audit, the documentation proves the capability).
- **Penetration testing** — contracted out or via bug bounty on a scoped demo environment — findings triaged and fixed publicly.

### Subphase 3C — Continuous Learning and Autonomous Operations (Months 31–36)

- **Production feedback loop:** misdetections flagged via the dashboard → labeling queue → retraining pipeline → canary rollout.
- **Self-healing systems:** automated pod restart, stream reconnect, model fallback on inference failure.
- **ML-driven anomaly detection on platform telemetry itself** (the platform watches the platform).
- **Intelligent alerting** with anomaly-based thresholds replacing static rules.
- **Final portfolio update:** complete architecture tour, comprehensive benchmark report across hardware tiers, demo video (2–3 minutes) narrated, published case studies from external users.

**Exit criterion (Phase 3 complete):** 5,000+ streams sustained in at least one region, <200ms latency in primary region, 99.99% uptime over a rolling 30-day window, multi-region deployment operational, continuous learning loop closed end-to-end.

---

## Portfolio Milestones (Parallel Track)

These are not engineering phases — they are portfolio deliverables that ship alongside each engineering phase. Every one of them is public.

| Milestone | Ships by end of |
|---|---|
| Landing page v0 (who, what, why, repo link) | Phase 0 |
| Embedded live demo on landing page | Phase 1A |
| Public architecture tour page | Phase 1B |
| Benchmarks page v1 (Phase 1 numbers) | Phase 1C |
| ADR index publicly linked | Phase 1C |
| First technical blog post | Phase 1C |
| Migration write-up (Phase 1 → 2) | Phase 2A |
| CV-specific technical blog post | Phase 2B |
| SLO / uptime dashboard publicly embedded | Phase 2C |
| External user case study | Phase 2C |
| Multi-region architecture page | Phase 3A |
| Security posture page | Phase 3B |
| Demo video + case studies + comprehensive benchmarks | Phase 3C |

---

## Gap Inventory — Known Unknowns

Tracked so they don't hide. Each resolved with a dated ADR when the call is made.

- **Evaluation dataset selection.** MOT17, a COCO subset, a custom indoor-scenes set, or a mix. Decided in Phase 1C.
- **Cluster cost and hardware strategy.** A 24/7 GPU K8s cluster is expensive. Options under evaluation: Hetzner / OVH dedicated GPU server, spot instances with interruption handling, sleep-on-idle demo environment. ADR due by end of Phase 0.
- **TorchServe vs. Triton.** Phase 2A spike required before committing.
- **Model licensing.** YOLOv8 is AGPL, compatible with GPL-3.0 here but flagged in the README; alternate models evaluated for permissive-license-preferring users.
- **Privacy posture for demo streams.** The pinned sample stream solves it for demo mode; self-deployers receive clear guidance in the deployment docs.
- **Edge hardware target.** Jetson Orin, Xavier, AWS Panorama, or Azure Percept. Picked at start of Phase 3A based on access.
- **Commercial model.** Whether any phase pivots to paid hosting, sponsored deployments, or consulting engagements. Reviewed at end of Phase 2.

---

## What This Roadmap Refuses to Do

1. **No invisible development.** Every phase ships a portfolio artifact. If it has no public surface, it is not a phase exit.
2. **No premature scaling.** Phase 1 uses Redis Streams because 50 streams don't need Kafka. Phase 2 migrates *because the load demands it*, not because Kafka is cool.
3. **No model-of-the-month.** Detection and tracking first (Phase 1–2); pose and behavioral analytics second (Phase 2B); additional model families only when justified by a real use case.
4. **No rewrites.** Decisions made in Phase 0 and Phase 1 are lived with until measured numbers justify revisiting them.
5. **No closed-source creep.** GPL-3.0 stays. Proprietary dependencies are permitted only where no viable OSS equivalent exists, and are called out transparently.
6. **No dashboard feature without real data backing it.** If a chart exists, the data is flowing through the real pipeline.

---

**Related documents:** [mission.md](./mission.md) · [tech-stack.md](./tech-stack.md) · [../project-overview/01-vision-and-strategy.md](../project-overview/01-vision-and-strategy.md) · [../project-overview/03-implementation-approach.md](../project-overview/03-implementation-approach.md)
