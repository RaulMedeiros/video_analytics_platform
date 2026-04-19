# Mission

## One-liner

**video_analytics_platform** is an enterprise-grade AI video analytics platform — built in the open as the flagship portfolio piece of a computer vision engineer — that ingests thousands of concurrent camera streams, runs real-time AI inference, and delivers operational intelligence through a cloud-native, progressively-scaled architecture.

## Dual Purpose

This project is intentionally scoped to serve two audiences at once, and the constitution treats both as first-class:

**1. A professional showcase.** The public-facing web presence is a portfolio site. It tells visitors — recruiters, hiring managers, technical peers, prospective clients — who the engineer is, what they can build, and why that matters. Every architectural choice is documented publicly so the project communicates technical depth as clearly as it runs.

**2. A real platform.** The system behind the portfolio is designed against the existing architectural vision: cloud-native, Kubernetes-orchestrated, microservices-based, progressively scaling from 50 concurrent streams (Crawl) to 500–1,000 (Walk) to 5,000+ (Run). It is not demoware. It is production-shaped engineering, deployed and observable, with the portfolio layered on top of it.

## Vision Alignment

The existing planning documents (`project-overview/01-vision-and-strategy.md`, `02-system-overview.md`, `03-implementation-approach.md`) define an enterprise platform with:

- Sub-200ms processing latency at full scale
- 99.99% availability
- Multi-protocol video ingestion (RTSP, HTTP, WebRTC, ONVIF)
- AI/ML pipeline with continuous learning and A/B testing
- Zero-trust security model
- Multi-region, multi-cloud deployment capability

The constitution in this `space/` directory does not replace that vision — it operationalizes it. Where the planning docs state the *what*, the constitution encodes the *how we decide and in what order*. Where the planning docs describe an enterprise end-state, the constitution explicitly ties each phase to portfolio-visible outcomes so the project is demonstrably valuable at every stage, not only at completion.

## Primary Audiences

- **Technical recruiters and hiring managers** evaluating CV / ML engineering roles. They land on the web page, understand what the platform does in 60 seconds, try a live demo, and leave with a clear sense of the engineer's range.
- **Engineering peers** reading the code, architecture docs, and decision records. The repo should read like a staff-engineer-grade codebase — not a bootcamp project.
- **Prospective clients and design partners** looking for a CV-heavy solution they could adopt, sponsor, or commission variations of.
- **The engineer's future self.** A six-month-old decision should still be legible and re-evaluable. ADRs and this constitution exist to make that possible.

## What the Platform Does

Ingests video from any source (IP cameras, RTSP, WebRTC, ONVIF-compliant devices, uploaded files, HLS), routes frames through a configurable AI pipeline (detection, tracking, pose, behavioral analytics, anomaly detection, zone/line logic), stores structured events in a multi-tier data architecture, and surfaces everything through REST, GraphQL, WebSocket, and webhook interfaces — with a live dashboard as the primary user-facing view.

## Skills the Project Demonstrates

Deliberately broad because the role it is showcasing is broad:

- Computer vision: detection, tracking, pose, behavioral analytics, multi-object systems
- Deep learning: PyTorch model development, fine-tuning, evaluation, deployment via TorchServe
- Model optimization: ONNX, TensorRT, quantization, GPU utilization tuning
- Real-time video engineering: GStreamer pipelines, hardware decoding, backpressure, batching
- Streaming data infrastructure: Kafka, NATS, event-driven architecture
- Backend systems: Go microservices, Python AI pipelines, API design (REST / GraphQL / WebSocket)
- Cloud-native operations: Kubernetes, Istio, Helm, GitOps, multi-cloud readiness
- Data architecture: PostgreSQL, InfluxDB, Redis, Elasticsearch
- Security engineering: zero-trust, mTLS, OPA, HSM-backed key management
- MLOps: model versioning, A/B testing, continuous learning loops, evaluation harnesses
- Observability: OpenTelemetry, Prometheus, Grafana, distributed tracing

## Success Criteria

**Portfolio outcomes** (the job this project does for the engineer):

- Landing page loads in under 3 seconds with a live demo accessible without signup
- Architecture documents, ADRs, and benchmark reports all publicly linked from the site
- Project generates inbound interview conversations, contract inquiries, or partnership offers
- Code, commits, and issue history hold up under scrutiny from a staff-level engineer

**Platform outcomes** (per the existing phase targets):

- Phase 1 (Crawl, 6 months): 50–100 concurrent streams, <500ms latency, 95% uptime
- Phase 2 (Walk, 12 months): 500–1,000 streams, <300ms latency, 99% uptime
- Phase 3 (Run, 18 months): 5,000+ streams, <200ms latency, 99.99% uptime

## Non-Goals

- Competing commercially with incumbent enterprise video analytics vendors — the project may serve paying users, but SaaS is not the primary motivation.
- Training foundation models from scratch. Fine-tuning, integration, and optimization are in scope; multi-billion-parameter research is not.
- Closed-source components. The project is GPL-3.0 and will remain so. Third-party model licenses (YOLO AGPL, etc.) are compatible and called out transparently.
- Shipping features that are not demonstrably valuable in the portfolio narrative. If it does not make the project more hire-worthy or more useful, it does not ship.

## Guiding Principles

1. **Every phase is portfolio-visible.** No six-month stealth development. Each milestone updates the public site with a working demo or published write-up.
2. **Show the work.** Every non-obvious decision has an ADR. The README links to them. Explanations are part of the deliverable.
3. **Progressive complexity, proven foundations.** Ambition is encoded in the phase targets; the Phase 1 stack deliberately uses boring, reliable tools because an unstable Phase 1 has no Phase 2.
4. **Models are swappable, pipelines are configurable, the platform is the product.** The architecture must not overfit to today's favorite model family.
5. **Performance is a feature.** Latency, throughput, GPU utilization, and cost-per-stream are measured, tracked, and published.
6. **Honest scope.** The public narrative matches reality. Aspirational capabilities are labeled as such. Benchmarks are reproducible.

---

**Related documents:** [tech-stack.md](./tech-stack.md) · [roadmap.md](./roadmap.md) · [../project-overview/01-vision-and-strategy.md](../project-overview/01-vision-and-strategy.md) · [../project-overview/02-system-overview.md](../project-overview/02-system-overview.md) · [../project-overview/03-implementation-approach.md](../project-overview/03-implementation-approach.md)
