# Executive Summary — Aperture Analytics
## AI Video Analytics Platform

---

## What It Is

**Aperture Analytics** is an open-source, enterprise-grade AI video analytics platform that ingests thousands of concurrent camera streams, runs real-time computer vision inference, and delivers operational intelligence through a cloud-native architecture.

It processes video from any source — IP cameras, RTSP, WebRTC, ONVIF devices, uploaded files — routes each frame through a configurable AI pipeline (object detection, multi-object tracking, pose estimation, zone logic, behavioral analytics), and surfaces everything through a live dashboard and REST/GraphQL/WebSocket APIs.

---

## The Problem It Solves

Organizations with physical spaces — warehouses, logistics hubs, retail floors, public venues — generate hours of video that goes unwatched. Incumbent enterprise video analytics vendors charge high licensing fees, lock customers into proprietary hardware, and ship black-box models that can't be fine-tuned for specific environments.

Aperture Analytics is the open alternative: fully auditable, self-hostable, and built for teams that need to understand and control their own AI pipeline.

---

## The Service Offering

The platform is **GPL-3.0 open source**. Revenue comes from **consulting and sponsored deployments** — not SaaS subscriptions or closed-source upsells.

Engagements typically cover:

- **Deployment and integration** — standing up the platform on the client's infrastructure, wiring it into existing camera networks and SIEM/ERP systems.
- **Custom model development** — fine-tuning detection and tracking models on client-specific environments (indoor scenes, specific object classes, unusual lighting conditions).
- **Sponsored features** — clients fund capabilities they need that also benefit the open-source project (e.g., a new protocol adapter, a custom alert integration, an edge deployment target).

Clients who cannot accept AGPL-licensed models (YOLOv8) are served with a documented permissive-license alternative (e.g., RT-DETR) — both options are maintained and supported.

---

## Technical Differentiators

| Capability | Detail |
|---|---|
| **Real-time inference** | GPU-accelerated pipeline; TensorRT-optimized models; sub-200ms end-to-end latency at full scale |
| **Configurable pipelines** | Per-camera pipeline graphs — detector → tracker → zone logic → event emitter — expressed as config, not code |
| **Model flexibility** | Triton Inference Server for multi-framework serving; A/B testing between model versions in production |
| **Edge-ready** | Trimmed inference pipeline deployable to NVIDIA Jetson Orin for on-premise, low-bandwidth environments |
| **Full observability** | OpenTelemetry, Prometheus, Grafana, Loki, Tempo — GPU utilization, FPS, and latency publicly tracked |
| **Transparent benchmarks** | MOT17 tracking benchmarks and detection accuracy published; all numbers reproducible |
| **Zero-trust security** | mTLS between services, OPA policy engine, HSM-backed key management, audit logging |

---

## Delivery Roadmap at a Glance

The platform follows a **Crawl → Walk → Run** strategy across 36 months, with each phase broken into subphases that each ship a public-facing artifact. No six-month stretches of invisible work.

### Phase 1 — Crawl (Months 1–6) · 50–100 streams · <500ms · 95% uptime

| Subphase | Focus | Public Artifact |
|---|---|---|
| **1A** — First Frame End-to-End | Ingest → YOLOv8 inference → live dashboard | Embedded live demo on landing page |
| **1B** — Platform | Multi-camera, ByteTrack, zone logic, MinIO clip archival, full observability | Architecture tour page; live GPU/FPS dashboards |
| **1C** — Hardening | Load test to 100 streams; MOT17 evaluation harness; reliability drills | Benchmarks page v1; first technical blog post |

### Phase 2 — Walk (Months 7–18) · 500–1,000 streams · <300ms · 99% uptime

| Subphase | Focus | Public Artifact |
|---|---|---|
| **2A** — Migration | Kafka replaces Redis Streams; Istio mesh; Triton Inference Server; Vault + Keycloak | Migration write-up; revised architecture page |
| **2B** — Advanced AI | Custom model training (MLflow); pose estimation; TensorRT engines; A/B testing | CV-specific blog post; pose overlay in live demo |
| **2C** — Scaling | Load test to 1,000 streams; SLO dashboard; first external client deployment | Public SLO dashboard; external client case study |

### Phase 3 — Run (Months 19–36) · 5,000+ streams · <200ms · 99.99% uptime

| Subphase | Focus | Public Artifact |
|---|---|---|
| **3A** — Multi-region & Edge | Multi-cluster Kubernetes; Jetson Orin edge runtime; hot/warm/cold data tiering | Multi-region architecture page; cross-region latency benchmarks |
| **3B** — Security & Compliance | Full zero-trust; HSM key management; SOC 2 Type I readiness; pen test | Security posture page; public findings triage |
| **3C** — Continuous Learning | Production feedback → labeling → retraining → canary; self-healing; anomaly detection on telemetry | Demo video; comprehensive benchmark report; case studies |

Every phase ships a public artifact — live demo, architecture write-up, benchmark report, or blog post. No invisible development.

---

## Why This Engineer, Why This Project

This platform is built in the open as a flagship portfolio piece by a computer vision engineer working across the full stack: CV/ML research, model optimization, real-time video engineering, backend systems, and cloud-native operations.

Every non-obvious decision is documented in an Architecture Decision Record and linked from the repository. The code, the benchmarks, and the architecture are public and hold up under scrutiny from staff-level engineers.

The platform is not demoware. It runs against real targets, with real observability, and real reliability drills. Consulting clients get the same codebase they can read on GitHub.

---

**Contact / Engagement:** via the project repository · [github.com/RaulMedeiros/video_analytics_platform](https://github.com/RaulMedeiros/video_analytics_platform)

**License:** GPL-3.0 (platform) · AGPL-3.0 (YOLOv8 default model) · permissive alternative available
