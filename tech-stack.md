# Tech Stack

This document is the authoritative record of technology choices for **video_analytics_platform**. It operationalizes the stack defined in `project-overview/02-system-overview.md` and the phase-gated implementation strategy in `03-implementation-approach.md`. Where the overview documents describe intent, this file records commitment — what is chosen, why, and what it looks like across the Crawl → Walk → Run phases.

## Guiding Principles

1. **Progressive technology complexity.** Phase 1 deliberately uses a simplified subset of the end-state stack. Phase 2 introduces orchestration and advanced data tiers. Phase 3 is the complete enterprise platform. The stack is forward-compatible at every step.
2. **Proven foundations first, novelty where it earns its place.** Novelty budget spends on the AI/ML pipeline and the real-time video path — the product differentiators. Everywhere else: battle-tested tools.
3. **Polyglot by design.** Go for high-throughput backend services, Python for AI/ML, TypeScript for the frontend. Each language is used where it earns the choice.
4. **Cloud-native and portable.** Kubernetes is the single deploy target. Multi-cloud readiness is a property of the architecture, not of any single tool.
5. **Security, observability, and MLOps are built in, not bolted on.**

---

## 1. Video Ingestion Layer

Handles inbound video from any source and delivers decoded frames to the processing pipeline.

- **Protocols (Phase 1):** RTSP, HTTP (MJPEG, HLS), file upload.
- **Protocols (Phase 2+):** WebRTC, ONVIF-compliant devices, proprietary vendor protocols via pluggable adapters.
- **GStreamer** as the canonical media framework — hardware-accelerated decoding via NVDEC where available, CPU fallback everywhere else.
- **go-gst bindings** for the ingestion service so the GStreamer pipeline is managed from Go, keeping ingestion in the same runtime as other high-throughput services.
- **Connection pooling and stream lifecycle management** implemented as a first-class service with health-check, auto-reconnect, and backpressure semantics.
- **Edge integration (Phase 3):** device management plane for ONVIF cameras and edge runtimes (AWS Greengrass, Azure IoT Edge).

## 2. AI Processing Engine

The differentiator. Computer vision and ML live here.

### Frameworks and Models

- **PyTorch** for all deep learning development, fine-tuning, and custom model work.
- **OpenCV** for classical CV operations, preprocessing, augmentation, and non-learning pipeline stages.
- **Ultralytics YOLO** (v8 / v11) as the default detector — integrated via ONNX export; the architecture is model-agnostic and supports RT-DETR, Grounding DINO, or custom-trained detectors.
- **ByteTrack** as the default multi-object tracker; **DeepSORT** as an alternative.
- **YOLOv8-pose** / **MediaPipe** for pose estimation pipelines (Phase 2+).
- **Supervision** (Roboflow) for annotation, zone, and line-crossing primitives.
- **Behavioral analytics** (Phase 2+) implemented as a pipeline stage consuming track histories; anomaly detection starts statistical and progresses to learned models.

### Model Serving

- **Phase 1:** in-process ONNX Runtime inside the Python worker. Simple, fast to iterate, GPU-aware.
- **Phase 2+:** **TorchServe** for model deployment with version control and A/B testing, per the system-overview doc. **Triton Inference Server** reserved as an alternative path if multi-framework serving becomes necessary; decision deferred to a Phase 2 spike.
- **Model optimization:** ONNX export for everything; **TensorRT** engines built for primary models on NVIDIA GPU targets; quantization (INT8 / FP16) measured and applied where accuracy trade-offs are acceptable.
- **GPU scheduling** on Kubernetes via the NVIDIA device plugin and GPU Operator.

### MLOps

- **Model registry** backed by object storage (MinIO in Phase 1, S3-compatible cloud storage later), versioned by content hash and semver tag.
- **Experiment tracking** via **MLflow** (added in Phase 2 alongside the custom training pipeline).
- **Evaluation harness** with a held-out dataset producing mAP / tracking metrics published to the project website per release.
- **Continuous learning loop** (Phase 3): production feedback pipeline → labeling queue → retraining → canary rollout.

## 3. Data Management

Multi-tier storage per the system-overview doc.

| Purpose | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Transactional / metadata | PostgreSQL 16 | PostgreSQL 16 + read replicas | PostgreSQL 16 sharded / Citus |
| Time-series metrics & events | PostgreSQL (TimescaleDB ext.) | **InfluxDB** (production) | InfluxDB clustered |
| Cache | Redis | Redis | Redis Cluster |
| Search | — | **Elasticsearch** | Elasticsearch clustered |
| Object storage (clips, artifacts) | MinIO (self-hosted S3-compatible) | MinIO or S3 | Multi-cloud S3-compatible |
| Graph (optional) | — | — | Neo4j or Dgraph if relationship analytics require it |

Data tiering — hot / warm / cold — is implemented from Phase 1 in a simplified form (hot: recent events, warm: summarized aggregates, cold: S3 clips) and elaborated as phases progress.

## 4. Message Queuing and Stream Processing

- **Phase 1:** **Redis Streams** as the event bus between ingestion, inference, and API workers. Appropriate at 50–100 concurrent streams, simple to operate, avoids premature Kafka overhead.
- **Phase 2:** **Apache Kafka** (via Strimzi on Kubernetes) replaces Redis Streams for stream processing and as the canonical event backbone, per the system-overview doc. Redis Streams migrates to cache/pub-sub role only.
- **Phase 2+:** **NATS JetStream** as lightweight event bus for control-plane messaging between services.
- **RabbitMQ** for background task queues (report generation, scheduled jobs).
- **Kafka Streams / Flink** evaluated in Phase 3 for stateful stream processing over event history.

## 5. Backend Services

Polyglot microservices.

- **Go** (1.22+) for high-throughput services: video ingestion, stream router, API gateway internals, event aggregator. Chosen for low GC pressure, static binaries, and concurrency story.
- **Python** (3.12+) for AI/ML: inference workers, training pipeline, evaluation, labeling tools.
- **FastAPI** as the Python API framework where needed (ML control plane, model serving wrappers).
- **Pydantic v2** for Python-side schemas. **Protobuf** for cross-service contracts (Go ↔ Python).
- **gRPC** for internal service-to-service; **REST + GraphQL + WebSocket** for external APIs.

## 6. API Gateway and External Surface

- **API Gateway:** **Kong** or **Envoy** fronting all public traffic; handles rate limiting, quota, API-key auth, request shaping.
- **REST:** comprehensive CRUD and action endpoints, OpenAPI-documented.
- **GraphQL:** flexible query interface for the dashboard and integrators (Phase 2+).
- **WebSocket / SSE:** real-time event streams and notifications.
- **Webhooks:** event-driven outbound with retries, exponential backoff, signed payloads.

## 7. Container Orchestration and Service Mesh

- **Docker** for all services, multi-stage builds, CUDA base images for inference workers.
- **Kubernetes** as the single deploy target — self-hosted for Phase 1 on a modest GPU-capable cluster; expanded to multi-zone (Phase 2) and multi-region (Phase 3).
- **Istio** service mesh from Phase 2 onward for mTLS, traffic shaping, and observability.
- **NGINX Ingress Controller** (Phase 1) → **Istio Gateway** (Phase 2+).
- **Helm** charts per service; **ArgoCD** for GitOps continuous delivery.
- **Terraform** for cluster and cloud primitives (VPC, DNS, storage, nodes).
- **NVIDIA Device Plugin + GPU Operator** for GPU scheduling from day one.

## 8. Frontend

- **TypeScript + React + Next.js** for the operational dashboard.
- **Tailwind CSS + shadcn/ui** for the component system.
- **TanStack Query** for server-state, **Zustand** for local UI state.
- **HLS.js** and native WebRTC for live video playback with annotation overlays.
- **Recharts / visx** for analytics visualization.
- **Mobile access (Phase 3):** responsive PWA first, native apps evaluated only on real demand.

## 9. Portfolio Web Presence

Treated as a first-class deliverable, not an afterthought.

- **Astro** or **Next.js static export** at the root domain — fast, minimal JS, SEO-friendly.
- Sections: the pitch, live demo, architecture tour, ADR index, benchmarks, blog, about, contact.
- Embedded live read-only demo pointed at a pinned sample stream flowing through the real production pipeline.
- Explicit linking to the operational dashboard so visitors can see the platform in action.

## 10. Security

Zero-trust model per the system-overview doc.

- **Identity:** OAuth 2.0 / OpenID Connect via an IdP (Keycloak self-hosted through Phase 2, enterprise IdP integration in Phase 3).
- **Service auth:** mTLS everywhere via Istio from Phase 2.
- **Authorization:** **Open Policy Agent (OPA)** for policy-as-code, RBAC + ABAC.
- **Secrets:** Kubernetes secrets (Phase 1) → **HashiCorp Vault** (Phase 2+) → **HSM-backed** key management (Phase 3).
- **Network:** Kubernetes network policies; WAF in front of the API gateway (Phase 2+); WireGuard VPN for admin access.
- **Data:** TLS 1.3 in transit; AES-256 at rest; automated certificate management via cert-manager.
- **API:** scoped API keys, rate limiting, quota management, request signing for webhooks.

## 11. Observability

The project is a monitoring platform — it cannot be un-monitored itself.

- **OpenTelemetry** instrumentation across every service (traces + metrics).
- **Prometheus + Grafana** for metrics and dashboards.
- **Loki** for logs, **Tempo** for traces.
- **Sentry** for application errors.
- **Published dashboards:** GPU utilization, per-stream FPS, inference p50/p95/p99, queue depth, frames dropped, end-to-end latency, per-model throughput.
- **Intelligent alerting** (Phase 3) with ML-driven anomaly detection on the platform's own telemetry.

## 12. Development Workflow

- **Monorepo** organized by service:
  ```
  services/
    ingest/          (Go)
    router/          (Go)
    inference/       (Python)
    api-gateway/     (Go)
    ml-control/      (Python / FastAPI)
    alerting/        (Go)
  web/               (Next.js)
  portfolio/         (Astro)
  infra/
    terraform/
    helm/
    argocd/
  docs/
    adr/
    architecture/
  ```
- **Tooling:** `uv` for Python, Go modules for Go, pnpm for frontend. **ruff + mypy strict**, **golangci-lint**, **eslint + prettier**. Pre-commit hooks enforce everything.
- **CI:** GitHub Actions — lint, type-check, test, build, push images, trigger ArgoCD sync. Required checks on main.
- **Testing pyramid:** unit → integration → end-to-end against the pinned sample stream. Load tests scripted and reproducible.
- **Environments:** dev (auto-deploy from main), staging (promoted on tag), production (manual promotion).

## 13. Phase Matrix (Quick Reference)

| Concern | Phase 1 (Crawl) | Phase 2 (Walk) | Phase 3 (Run) |
|---|---|---|---|
| Orchestration | Docker Compose → K8s single cluster | K8s + Istio | Multi-region K8s + Istio + edge |
| Event bus | Redis Streams | Kafka (Strimzi) | Kafka + NATS JetStream |
| Time-series | Timescale (PG ext.) | InfluxDB | InfluxDB clustered |
| Inference | ONNX Runtime in-process | TorchServe | TorchServe + edge runtimes |
| Service mesh | — | Istio | Istio multi-cluster |
| Secrets | K8s Secrets | Vault | Vault + HSM |
| Auth | API keys + basic OAuth | Keycloak + OPA | Enterprise IdP + full zero-trust |
| Targets | 50–100 streams, <500ms, 95% | 500–1,000 streams, <300ms, 99% | 5,000+ streams, <200ms, 99.99% |

## 14. Explicitly Out of Scope

- Blockchain, generalized crypto primitives beyond TLS / signing.
- Bespoke time-series database development — PostgreSQL + InfluxDB suffice.
- A custom container runtime or custom Kubernetes distribution.
- Browser extensions, desktop apps, mobile-native apps before Phase 3 and only on demand.
- Quantum-ready abstractions. The vision doc mentions quantum readiness aspirationally; the constitution does not encode any Phase 1–3 commitment to it.

---

**Related documents:** [mission.md](./mission.md) · [roadmap.md](./roadmap.md) · [../project-overview/02-system-overview.md](../project-overview/02-system-overview.md) · [../project-overview/03-implementation-approach.md](../project-overview/03-implementation-approach.md)
