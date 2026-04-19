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

| Phase | Timeline | Scale | Latency | Uptime | Key Milestone |
|---|---|---|---|---|---|
| **Crawl** | Months 1–6 | 50–100 streams | <500ms | 95% | Live public demo; published benchmarks |
| **Walk** | Months 7–18 | 500–1,000 streams | <300ms | 99% | Triton serving; custom model training; first external client |
| **Run** | Months 19–36 | 5,000+ streams | <200ms | 99.99% | Multi-region; Jetson Orin edge; continuous learning loop |

Every phase ships a public artifact — live demo, architecture write-up, benchmark report, or blog post. No invisible development.

---

## Why This Engineer, Why This Project

This platform is built in the open as a flagship portfolio piece by a computer vision engineer working across the full stack: CV/ML research, model optimization, real-time video engineering, backend systems, and cloud-native operations.

Every non-obvious decision is documented in an Architecture Decision Record and linked from the repository. The code, the benchmarks, and the architecture are public and hold up under scrutiny from staff-level engineers.

The platform is not demoware. It runs against real targets, with real observability, and real reliability drills. Consulting clients get the same codebase they can read on GitHub.

---

**Contact / Engagement:** via the project repository · [github.com/RaulMedeiros/video_analytics_platform](https://github.com/RaulMedeiros/video_analytics_platform)

**License:** GPL-3.0 (platform) · AGPL-3.0 (YOLOv8 default model) · permissive alternative available
