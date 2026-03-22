---
title: "Phase 1 Docker Compose Implementation - Container Orchestration"
version: "1.0"
author: "Phase 1 DevOps Team"
date: "2024-09-26"
audience: ["developers", "devops_engineers", "system_administrators"]
complexity: "intermediate"
topics: ["phase_1", "docker_compose", "containers", "deployment"]
priority: "high"
implementation_phase: "crawl"
---

# Phase 1 Docker Compose Implementation
## Container Orchestration - CRAWL Phase

---

## 🎯 Implementation Overview

This document provides the **complete Docker Compose implementation** for Phase 1 deployment. The containerized architecture enables consistent development and production environments while maintaining simplicity through single-server deployment.

### **Container Architecture Benefits**
- **Environment Consistency**: Identical containers across dev/staging/production
- **Simplified Deployment**: Single `docker-compose up` command deployment
- **Resource Isolation**: Individual container resource management
- **Easy Scaling**: Horizontal scaling preparation for Phase 2
- **Technology Independence**: Container-based service isolation

---

## 🐳 Complete Docker Compose Configuration

### **Main docker-compose.yml**
```yaml
version: '3.8'

services:
  # ===================
  # Load Balancer
  # ===================
  nginx:
    image: nginx:alpine
    container_name: video_analytics_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
    depends_on:
      - api_gateway
      - dashboard
    networks:
      - frontend
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ===================
  # Core Application Services
  # ===================
  api_gateway:
    build:
      context: ./services/api-gateway
      dockerfile: Dockerfile
    image: video_analytics/api:${VERSION:-latest}
    container_name: video_analytics_api
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=postgresql
      - DB_PORT=5432
      - DB_NAME=${POSTGRES_DB}
      - DB_USER=${POSTGRES_USER}
      - DB_PASSWORD=${POSTGRES_PASSWORD}
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - JWT_SECRET=${JWT_SECRET}
      - MINIO_ENDPOINT=minio:9000
      - MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
      - MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
    volumes:
      - ./logs/api:/app/logs
    depends_on:
      - postgresql
      - redis
      - minio
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  video_processor:
    build:
      context: ./services/video-processor
      dockerfile: Dockerfile
    image: video_analytics/processor:${VERSION:-latest}
    container_name: video_analytics_processor
    ports:
      - "8081:8081"
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - MINIO_ENDPOINT=minio:9000
      - MINIO_ACCESS_KEY=${MINIO_ACCESS_KEY}
      - MINIO_SECRET_KEY=${MINIO_SECRET_KEY}
      - AI_ENGINE_URL=http://ai_engine:8082
    volumes:
      - ./logs/processor:/app/logs
      - ./data/video_temp:/tmp/video
    depends_on:
      - redis
      - minio
      - ai_engine
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  ai_engine:
    build:
      context: ./services/ai-engine
      dockerfile: Dockerfile
    image: video_analytics/ai:${VERSION:-latest}
    container_name: video_analytics_ai
    ports:
      - "8082:8082"
    environment:
      - DB_HOST=postgresql
      - DB_PORT=5432
      - DB_NAME=${POSTGRES_DB}
      - DB_USER=${POSTGRES_USER}
      - DB_PASSWORD=${POSTGRES_PASSWORD}
      - MODEL_PATH=/app/models
      - GPU_ENABLED=${GPU_ENABLED:-false}
    volumes:
      - ./logs/ai:/app/logs
      - ./models:/app/models:ro
      - ./data/ai_temp:/tmp/ai
    depends_on:
      - postgresql
    networks:
      - backend
    restart: unless-stopped
    # GPU support (uncomment if GPU available)
    # deploy:
    #   resources:
    #     reservations:
    #       devices:
    #         - driver: nvidia
    #           count: 1
    #           capabilities: [gpu]
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8082/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  stream_manager:
    build:
      context: ./services/stream-manager
      dockerfile: Dockerfile
    image: video_analytics/streams:${VERSION:-latest}
    container_name: video_analytics_streams
    ports:
      - "8083:8083"
      - "1935:1935"  # RTMP port
    environment:
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - VIDEO_PROCESSOR_URL=http://video_processor:8081
    volumes:
      - ./logs/streams:/app/logs
    depends_on:
      - redis
      - video_processor
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8083/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  dashboard:
    build:
      context: ./services/dashboard
      dockerfile: Dockerfile
    image: video_analytics/dashboard:${VERSION:-latest}
    container_name: video_analytics_dashboard
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://api_gateway:8080
      - REACT_APP_WS_URL=ws://api_gateway:8080/ws
    volumes:
      - ./logs/dashboard:/app/logs
    depends_on:
      - api_gateway
    networks:
      - frontend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ===================
  # Data Services
  # ===================
  postgresql:
    image: postgres:15-alpine
    container_name: video_analytics_postgres
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_INITDB_ARGS=--auth-host=scram-sha-256
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d:ro
      - ./logs/postgres:/var/log/postgresql
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}"]
      interval: 30s
      timeout: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: video_analytics_redis
    ports:
      - "6379:6379"
    command: redis-server --requirepass ${REDIS_PASSWORD} --maxmemory 2gb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
      - ./logs/redis:/var/log/redis
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 30s
      timeout: 10s
      retries: 3

  minio:
    image: minio/minio:latest
    container_name: video_analytics_minio
    ports:
      - "9000:9000"
      - "9001:9001"  # Console port
    environment:
      - MINIO_ROOT_USER=${MINIO_ACCESS_KEY}
      - MINIO_ROOT_PASSWORD=${MINIO_SECRET_KEY}
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
      - ./logs/minio:/var/log/minio
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 10s
      retries: 3

  # ===================
  # Infrastructure Services
  # ===================
  prometheus:
    image: prom/prometheus:latest
    container_name: video_analytics_prometheus
    ports:
      - "9090:9090"
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
    volumes:
      - ./monitoring/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:9090/-/healthy"]
      interval: 30s
      timeout: 10s
      retries: 3

  grafana:
    image: grafana/grafana:latest
    container_name: video_analytics_grafana
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards:ro
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources:ro
    depends_on:
      - prometheus
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  loki:
    image: grafana/loki:latest
    container_name: video_analytics_loki
    ports:
      - "3100:3100"
    command: -config.file=/etc/loki/local-config.yaml
    volumes:
      - ./monitoring/loki/loki-config.yaml:/etc/loki/local-config.yaml:ro
      - loki_data:/loki
    networks:
      - backend
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3100/ready"]
      interval: 30s
      timeout: 10s
      retries: 3

  promtail:
    image: grafana/promtail:latest
    container_name: video_analytics_promtail
    volumes:
      - ./monitoring/promtail/promtail-config.yaml:/etc/promtail/config.yml:ro
      - ./logs:/var/log/app:ro
      - /var/log:/var/log/host:ro
    command: -config.file=/etc/promtail/config.yml
    depends_on:
      - loki
    networks:
      - backend
    restart: unless-stopped

# ===================
# Networks
# ===================
networks:
  frontend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
  backend:
    driver: bridge
    ipam:
      config:
        - subnet: 172.21.0.0/24

# ===================
# Volumes
# ===================
volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  minio_data:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local
  loki_data:
    driver: local
```

---

## 🔧 Environment Configuration

### **Environment Variables (.env)**
```bash
# Application Configuration
VERSION=v1.0.0
ENVIRONMENT=production

# Database Configuration
POSTGRES_DB=video_analytics
POSTGRES_USER=analytics_user
POSTGRES_PASSWORD=secure_postgres_password_here

# Redis Configuration
REDIS_PASSWORD=secure_redis_password_here

# MinIO Configuration
MINIO_ACCESS_KEY=analytics_access_key
MINIO_SECRET_KEY=secure_minio_secret_here

# JWT Configuration
JWT_SECRET=secure_jwt_secret_key_here

# Monitoring Configuration
GRAFANA_PASSWORD=secure_grafana_password_here

# GPU Configuration
GPU_ENABLED=false

# Resource Limits
POSTGRES_MAX_CONNECTIONS=100
REDIS_MAX_MEMORY=2gb
```

---

## 🌐 NGINX Configuration

### **nginx.conf**
```nginx
events {
    worker_connections 1024;
}

http {
    upstream api_backend {
        server api_gateway:8080;
    }

    upstream dashboard_backend {
        server dashboard:3000;
    }

    upstream grafana_backend {
        server grafana:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=dashboard:10m rate=30r/s;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Main application server
    server {
        listen 80;
        server_name _;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # API endpoints
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://api_backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            # WebSocket support
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }

        # Dashboard
        location / {
            limit_req zone=dashboard burst=50 nodelay;
            proxy_pass http://dashboard_backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Monitoring (Grafana)
        location /monitoring/ {
            proxy_pass http://grafana_backend/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # File uploads (larger body size)
        location /api/upload {
            client_max_body_size 1G;
            proxy_pass http://api_backend/upload;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

---

## 📊 Monitoring Configuration

### **Prometheus Configuration (prometheus.yml)**
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "first_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'api-gateway'
    static_configs:
      - targets: ['api_gateway:8080']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'video-processor'
    static_configs:
      - targets: ['video_processor:8081']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'ai-engine'
    static_configs:
      - targets: ['ai_engine:8082']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'stream-manager'
    static_configs:
      - targets: ['stream_manager:8083']
    metrics_path: '/metrics'
    scrape_interval: 30s

  - job_name: 'postgresql'
    static_configs:
      - targets: ['postgres_exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis_exporter:9121']

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']

  - job_name: 'node'
    static_configs:
      - targets: ['node_exporter:9100']
```

### **Loki Configuration (loki-config.yaml)**
```yaml
auth_enabled: false

server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 127.0.0.1
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
    final_sleep: 0s
  chunk_idle_period: 5m
  chunk_retain_period: 30s

schema_config:
  configs:
    - from: 2020-10-24
      store: boltdb
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 168h

storage_config:
  boltdb:
    directory: /loki/index

  filesystem:
    directory: /loki/chunks

limits_config:
  enforce_metric_name: false
  reject_old_samples: true
  reject_old_samples_max_age: 168h

chunk_store_config:
  max_look_back_period: 0s

table_manager:
  retention_deletes_enabled: false
  retention_period: 0s
```

---

## 🚀 Deployment Scripts

### **deploy.sh**
```bash
#!/bin/bash

set -e

echo "Starting Video Analytics Platform Deployment..."

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "Docker is required but not installed. Aborting." >&2; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "Docker Compose is required but not installed. Aborting." >&2; exit 1; }

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '#' | xargs)
else
    echo "Warning: .env file not found. Using default values."
fi

# Create necessary directories
echo "Creating directory structure..."
mkdir -p logs/{api,processor,ai,streams,dashboard,postgres,redis,minio}
mkdir -p data/{video_temp,ai_temp}
mkdir -p models
mkdir -p database/init

# Set permissions
chmod -R 755 logs/
chmod -R 755 data/

# Pull latest images
echo "Pulling latest base images..."
docker-compose pull postgresql redis minio prometheus grafana loki promtail

# Build application images
echo "Building application images..."
docker-compose build --no-cache

# Start infrastructure services first
echo "Starting infrastructure services..."
docker-compose up -d postgresql redis minio

# Wait for database to be ready
echo "Waiting for database to be ready..."
until docker-compose exec -T postgresql pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

# Run database migrations
echo "Running database migrations..."
docker-compose exec -T postgresql psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f /docker-entrypoint-initdb.d/init.sql

# Start application services
echo "Starting application services..."
docker-compose up -d api_gateway video_processor ai_engine stream_manager dashboard

# Start monitoring services
echo "Starting monitoring services..."
docker-compose up -d prometheus grafana loki promtail

# Start load balancer
echo "Starting load balancer..."
docker-compose up -d nginx

# Health check
echo "Performing health checks..."
sleep 30

# Check service health
services=("nginx" "api_gateway" "video_processor" "ai_engine" "stream_manager" "dashboard" "postgresql" "redis" "minio")
for service in "${services[@]}"; do
    if docker-compose ps $service | grep -q "Up"; then
        echo "✅ $service is running"
    else
        echo "❌ $service failed to start"
        docker-compose logs $service
        exit 1
    fi
done

echo "🎉 Deployment completed successfully!"
echo ""
echo "Access points:"
echo "- Dashboard: http://localhost"
echo "- API: http://localhost/api"
echo "- Monitoring: http://localhost/monitoring"
echo "- MinIO Console: http://localhost:9001"
echo ""
echo "View logs: docker-compose logs -f [service_name]"
echo "Stop services: docker-compose down"
```

### **backup.sh**
```bash
#!/bin/bash

set -e

BACKUP_DIR="/backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "Creating backup at $BACKUP_DIR..."

# Backup database
echo "Backing up PostgreSQL database..."
docker-compose exec -T postgresql pg_dump -U ${POSTGRES_USER} ${POSTGRES_DB} > $BACKUP_DIR/database.sql

# Backup Redis data
echo "Backing up Redis data..."
docker-compose exec -T redis redis-cli --rdb /data/dump.rdb
docker cp video_analytics_redis:/data/dump.rdb $BACKUP_DIR/redis.rdb

# Backup MinIO data
echo "Backing up MinIO data..."
docker run --rm --volumes-from video_analytics_minio -v $BACKUP_DIR:/backup alpine tar czf /backup/minio.tar.gz /data

# Backup configuration
echo "Backing up configuration..."
cp -r .env nginx/ monitoring/ $BACKUP_DIR/

echo "Backup completed: $BACKUP_DIR"
```

---

## 🔧 Development Workflow

### **Development Docker Compose Override**
Create `docker-compose.override.yml` for development:

```yaml
version: '3.8'

services:
  api_gateway:
    build:
      target: development
    volumes:
      - ./services/api-gateway:/app
    environment:
      - GO_ENV=development
      - HOT_RELOAD=true

  video_processor:
    build:
      target: development
    volumes:
      - ./services/video-processor:/app
    environment:
      - GO_ENV=development

  ai_engine:
    build:
      target: development
    volumes:
      - ./services/ai-engine:/app
    environment:
      - PYTHON_ENV=development

  dashboard:
    build:
      target: development
    volumes:
      - ./services/dashboard:/app
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true
```

### **Development Commands**
```bash
# Start development environment
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d

# View logs
docker-compose logs -f api_gateway

# Execute commands in container
docker-compose exec api_gateway sh

# Rebuild specific service
docker-compose build api_gateway && docker-compose up -d api_gateway

# Run tests
docker-compose exec api_gateway go test ./...
```

---

## 🎯 Production Considerations

### **Resource Requirements**
```yaml
PRODUCTION_SPECS:
  CPU_Cores: "8+ cores recommended"
  Memory: "32GB+ RAM"
  Storage: "1TB+ SSD for data, 100GB for logs"
  Network: "1Gbps connection"
  GPU: "Optional NVIDIA GPU for AI acceleration"
```

### **Security Hardening**
- Enable TLS/SSL certificates
- Implement container security scanning
- Use Docker secrets for sensitive data
- Regular security updates
- Network segmentation
- Access logging and monitoring

### **Backup Strategy**
- Daily automated backups
- Off-site backup storage
- Point-in-time recovery capability
- Backup validation testing
- Disaster recovery procedures

---

**Document Status**: Ready for Implementation
**Next Document**: [Monitoring and Observability](./03-monitoring-observability.md)
**Related**: [System Architecture](./01-simplified-system-architecture.md) | [Business Considerations](../business-considerations/)