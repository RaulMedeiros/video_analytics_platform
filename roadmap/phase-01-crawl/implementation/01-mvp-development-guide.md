---
title: "MVP Project Structure - Phase 1 Technical Implementation"
version: "1.0"
author: "Technical Architecture Team"
date: "2024-09-26"
audience: ["developers", "technical_leads", "DevOps", "project_managers"]
complexity: "intermediate"
topics: ["project_structure", "technology_stack", "implementation", "development_setup"]
priority: "critical"
implementation_phase: "immediate"
---

# MVP Project Structure
## Phase 1 Technical Implementation Foundation

---

## 🎯 Project Overview

This document defines the **complete technical project structure** for Phase 1 implementation of the AI Video Analytics Platform. The structure reflects the simplified architecture approach designed to mitigate complexity risks while establishing a solid foundation for future scaling.

### **Technical Philosophy**
- **Simplicity First**: Choose proven, well-documented technologies
- **Monolithic Foundation**: Start simple with clear service boundaries for future extraction
- **Container-Ready**: Docker-based development and deployment
- **API-First Design**: Clean separation between frontend and backend
- **Testing-Driven**: Comprehensive testing framework from day one

### **Phase 1 Technology Stack**
| **Layer** | **Technology** | **Rationale** |
|-----------|----------------|---------------|
| **Frontend** | React 18 + TypeScript | Modern, well-supported, extensive ecosystem |
| **Backend** | Node.js 20 + Express | JavaScript ecosystem, rapid development |
| **Database** | PostgreSQL 15 + Redis 7 | Reliable RDBMS + high-performance caching |
| **AI/ML** | TensorFlow.js + OpenCV | Browser-compatible ML, proven computer vision |
| **Containers** | Docker + Docker Compose | Simple orchestration, production-ready |
| **Monitoring** | Prometheus + Grafana | Industry-standard monitoring stack |

---

## 📁 Project Directory Structure

### **Root Level Organization**
```
video-analytics-platform/
├── README.md                          # Project overview and setup
├── docker-compose.yml                 # Local development orchestration
├── docker-compose.prod.yml            # Production deployment
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore patterns
├── package.json                       # Root package.json for scripts
├── LICENSE                            # Project license
├── CHANGELOG.md                       # Version history
├──
├── docs/                              # Documentation
│   ├── api/                          # API documentation
│   ├── deployment/                   # Deployment guides
│   ├── development/                  # Development setup
│   └── user/                         # User documentation
│
├── scripts/                          # Development and deployment scripts
│   ├── setup.sh                     # Initial project setup
│   ├── dev-start.sh                 # Development environment start
│   ├── build.sh                     # Production build
│   ├── deploy.sh                    # Deployment script
│   └── test.sh                      # Test runner
│
├── config/                           # Configuration files
│   ├── nginx/                       # Nginx configuration
│   ├── prometheus/                  # Monitoring configuration
│   ├── grafana/                     # Dashboard configuration
│   └── ssl/                         # SSL certificates (development)
│
├── backend/                          # Backend API service
├── frontend/                         # React frontend application
├── ai-service/                       # AI/ML processing service
├── shared/                          # Shared libraries and utilities
└── tests/                           # End-to-end and integration tests
```

---

## 🖥️ Backend Service Structure

### **Backend Directory Layout**
```
backend/
├── package.json                      # Backend dependencies
├── tsconfig.json                     # TypeScript configuration
├── jest.config.js                   # Jest testing configuration
├── Dockerfile                       # Backend container definition
├── .env.example                     # Backend environment template
├──
├── src/
│   ├── app.ts                       # Express application setup
│   ├── server.ts                   # Server entry point
│   ├── config/                     # Configuration management
│   │   ├── database.ts             # Database connection config
│   │   ├── redis.ts                # Redis connection config
│   │   ├── auth.ts                 # Authentication config
│   │   └── monitoring.ts           # Monitoring and logging config
│   │
│   ├── controllers/                # Request handlers
│   │   ├── auth.controller.ts      # Authentication endpoints
│   │   ├── users.controller.ts     # User management
│   │   ├── streams.controller.ts   # Video stream management
│   │   ├── alerts.controller.ts    # Alert system
│   │   ├── reports.controller.ts   # Reporting endpoints
│   │   └── health.controller.ts    # Health check endpoints
│   │
│   ├── services/                   # Business logic
│   │   ├── auth.service.ts         # Authentication logic
│   │   ├── user.service.ts         # User management logic
│   │   ├── stream.service.ts       # Video stream processing
│   │   ├── alert.service.ts        # Alert management
│   │   ├── report.service.ts       # Report generation
│   │   └── notification.service.ts # Notification system
│   │
│   ├── models/                     # Data models and database schemas
│   │   ├── index.ts                # Model exports
│   │   ├── User.ts                 # User model
│   │   ├── Stream.ts               # Video stream model
│   │   ├── Alert.ts                # Alert model
│   │   ├── Report.ts               # Report model
│   │   └── AuditLog.ts             # Audit logging model
│   │
│   ├── routes/                     # API route definitions
│   │   ├── index.ts                # Route aggregation
│   │   ├── auth.routes.ts          # Authentication routes
│   │   ├── users.routes.ts         # User management routes
│   │   ├── streams.routes.ts       # Stream management routes
│   │   ├── alerts.routes.ts        # Alert system routes
│   │   ├── reports.routes.ts       # Reporting routes
│   │   └── api.routes.ts           # API versioning
│   │
│   ├── middleware/                 # Express middleware
│   │   ├── auth.middleware.ts      # Authentication middleware
│   │   ├── validation.middleware.ts # Request validation
│   │   ├── error.middleware.ts     # Error handling
│   │   ├── logging.middleware.ts   # Request logging
│   │   └── rate-limit.middleware.ts # Rate limiting
│   │
│   ├── utils/                      # Utility functions
│   │   ├── logger.ts               # Logging utility
│   │   ├── encryption.ts           # Encryption utilities
│   │   ├── validation.ts           # Validation helpers
│   │   ├── date.ts                 # Date utilities
│   │   └── response.ts             # API response helpers
│   │
│   └── database/                   # Database management
│       ├── migrations/             # Database migrations
│       ├── seeds/                  # Database seed data
│       ├── connection.ts           # Database connection
│       └── init.ts                 # Database initialization
│
├── tests/                          # Backend tests
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   ├── fixtures/                   # Test data
│   └── helpers/                    # Test utilities
│
└── dist/                           # Compiled JavaScript (gitignored)
```

### **Backend Technology Configuration**
```yaml
BACKEND_DEPENDENCIES:
  Core_Framework:
    express: "^4.18.2"
    typescript: "^5.2.2"
    ts-node: "^10.9.1"
    nodemon: "^3.0.1"

  Database_ORM:
    pg: "^8.11.3"           # PostgreSQL client
    redis: "^4.6.8"         # Redis client
    typeorm: "^0.3.17"      # ORM for TypeScript

  Authentication_Security:
    jsonwebtoken: "^9.0.2"  # JWT tokens
    bcryptjs: "^2.4.3"      # Password hashing
    helmet: "^7.0.0"        # Security headers
    cors: "^2.8.5"          # Cross-origin requests

  Validation_Utils:
    joi: "^17.9.2"          # Request validation
    express-rate-limit: "^6.10.0"  # Rate limiting
    express-validator: "^7.0.1"    # Input validation

  Monitoring_Logging:
    winston: "^3.10.0"      # Logging framework
    prom-client: "^14.2.0"  # Prometheus metrics
    morgan: "^1.10.0"       # HTTP request logging

  Testing:
    jest: "^29.6.4"         # Testing framework
    supertest: "^6.3.3"     # HTTP testing
    @types/jest: "^29.5.5"  # Jest TypeScript types
```

---

## 🎨 Frontend Application Structure

### **Frontend Directory Layout**
```
frontend/
├── package.json                      # Frontend dependencies
├── tsconfig.json                     # TypeScript configuration
├── vite.config.ts                   # Vite build configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── Dockerfile                       # Frontend container definition
├── .env.example                     # Frontend environment template
├──
├── public/                          # Static assets
│   ├── index.html                  # HTML template
│   ├── favicon.ico                 # App icon
│   ├── manifest.json               # PWA manifest
│   └── icons/                      # App icons
│
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Main app component
│   ├── vite-env.d.ts              # Vite type definitions
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/                # Common UI elements
│   │   │   ├── Button/            # Button component
│   │   │   ├── Input/             # Input component
│   │   │   ├── Modal/             # Modal component
│   │   │   ├── Table/             # Table component
│   │   │   └── Loading/           # Loading spinner
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Header/            # Application header
│   │   │   ├── Sidebar/           # Navigation sidebar
│   │   │   ├── Footer/            # Application footer
│   │   │   └── Layout/            # Main layout wrapper
│   │   │
│   │   └── features/              # Feature-specific components
│   │       ├── auth/              # Authentication components
│   │       ├── dashboard/         # Dashboard components
│   │       ├── streams/           # Video stream components
│   │       ├── alerts/            # Alert components
│   │       └── reports/           # Reporting components
│   │
│   ├── pages/                     # Page components
│   │   ├── Dashboard/             # Main dashboard page
│   │   ├── Login/                 # Login page
│   │   ├── Streams/               # Stream management page
│   │   ├── Alerts/                # Alert management page
│   │   ├── Reports/               # Reporting page
│   │   ├── Settings/              # Settings page
│   │   └── NotFound/              # 404 error page
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAuth.ts             # Authentication hook
│   │   ├── useApi.ts              # API interaction hook
│   │   ├── useWebSocket.ts        # WebSocket connection hook
│   │   ├── useLocalStorage.ts     # Local storage hook
│   │   └── usePermissions.ts      # Permission checking hook
│   │
│   ├── services/                  # API and external services
│   │   ├── api.ts                 # API client configuration
│   │   ├── auth.service.ts        # Authentication service
│   │   ├── stream.service.ts      # Stream management service
│   │   ├── alert.service.ts       # Alert service
│   │   ├── report.service.ts      # Report service
│   │   └── websocket.service.ts   # WebSocket service
│   │
│   ├── store/                     # State management
│   │   ├── index.ts               # Store configuration
│   │   ├── authSlice.ts           # Authentication state
│   │   ├── streamSlice.ts         # Stream state
│   │   ├── alertSlice.ts          # Alert state
│   │   └── uiSlice.ts             # UI state
│   │
│   ├── types/                     # TypeScript type definitions
│   │   ├── api.types.ts           # API response types
│   │   ├── auth.types.ts          # Authentication types
│   │   ├── stream.types.ts        # Stream-related types
│   │   ├── alert.types.ts         # Alert types
│   │   └── common.types.ts        # Common types
│   │
│   ├── utils/                     # Utility functions
│   │   ├── constants.ts           # Application constants
│   │   ├── helpers.ts             # Helper functions
│   │   ├── validation.ts          # Client-side validation
│   │   ├── formatting.ts          # Data formatting
│   │   └── storage.ts             # Local storage utilities
│   │
│   └── styles/                    # Styling files
│       ├── globals.css            # Global styles
│       ├── components.css         # Component styles
│       └── utilities.css          # Utility classes
│
├── tests/                         # Frontend tests
│   ├── components/                # Component tests
│   ├── pages/                     # Page tests
│   ├── hooks/                     # Hook tests
│   ├── utils/                     # Utility tests
│   └── __mocks__/                 # Test mocks
│
└── dist/                          # Built application (gitignored)
```

### **Frontend Technology Configuration**
```yaml
FRONTEND_DEPENDENCIES:
  Core_Framework:
    react: "^18.2.0"
    react-dom: "^18.2.0"
    typescript: "^5.2.2"
    vite: "^4.4.9"

  Routing_Navigation:
    react-router-dom: "^6.15.0"    # Client-side routing

  State_Management:
    @reduxjs/toolkit: "^1.9.5"     # Redux state management
    react-redux: "^8.1.2"          # React Redux bindings

  UI_Components:
    @headlessui/react: "^1.7.17"   # Unstyled accessible components
    @heroicons/react: "^2.0.18"    # Icon library
    tailwindcss: "^3.3.3"          # Utility-first CSS

  Form_Handling:
    react-hook-form: "^7.45.4"     # Form management
    @hookform/resolvers: "^3.3.1"  # Form validation
    zod: "^3.22.2"                 # Schema validation

  HTTP_WebSocket:
    axios: "^1.5.0"                # HTTP client
    socket.io-client: "^4.7.2"     # WebSocket client

  Video_Processing:
    hls.js: "^1.4.10"              # HLS video streaming
    video.js: "^8.3.0"             # Video player

  Testing:
    vitest: "^0.34.6"              # Testing framework
    @testing-library/react: "^13.4.0"  # React testing utilities
    @testing-library/jest-dom: "^6.1.3" # Jest DOM matchers
    jsdom: "^22.1.0"               # DOM simulation
```

---

## 🤖 AI Service Structure

### **AI Processing Service Layout**
```
ai-service/
├── package.json                      # AI service dependencies
├── tsconfig.json                     # TypeScript configuration
├── Dockerfile                       # AI service container
├── requirements.txt                 # Python dependencies (if needed)
├──
├── src/
│   ├── index.ts                     # Service entry point
│   ├── config/                     # Service configuration
│   │   ├── models.ts               # AI model configuration
│   │   ├── processing.ts           # Processing settings
│   │   └── storage.ts              # Storage configuration
│   │
│   ├── processors/                 # Video processing engines
│   │   ├── ObjectDetector.ts       # Object detection processor
│   │   ├── StreamProcessor.ts      # Video stream processor
│   │   ├── AlertGenerator.ts       # Alert generation logic
│   │   └── FrameExtractor.ts       # Frame extraction utility
│   │
│   ├── models/                     # AI model management
│   │   ├── ModelLoader.ts          # Model loading and caching
│   │   ├── ModelUpdater.ts         # Model update management
│   │   └── ModelValidator.ts       # Model validation
│   │
│   ├── api/                        # API interface
│   │   ├── routes.ts               # API route definitions
│   │   ├── middleware.ts           # Processing middleware
│   │   └── validation.ts           # Input validation
│   │
│   ├── utils/                      # Processing utilities
│   │   ├── videoUtils.ts           # Video processing utilities
│   │   ├── imageUtils.ts           # Image processing utilities
│   │   ├── mathUtils.ts            # Mathematical utilities
│   │   └── performanceUtils.ts     # Performance monitoring
│   │
│   └── workers/                    # Background processing
│       ├── StreamWorker.ts         # Stream processing worker
│       ├── BatchWorker.ts          # Batch processing worker
│       └── CleanupWorker.ts        # Cleanup and maintenance
│
├── models/                         # Pre-trained AI models
│   ├── object-detection/           # Object detection models
│   ├── classification/             # Classification models
│   └── custom/                     # Custom trained models
│
├── tests/                          # AI service tests
│   ├── unit/                       # Unit tests
│   ├── integration/                # Integration tests
│   └── performance/                # Performance tests
│
└── data/                           # Test and sample data
    ├── images/                     # Sample images
    ├── videos/                     # Sample videos
    └── annotations/                # Test annotations
```

### **AI Service Technology Stack**
```yaml
AI_ML_DEPENDENCIES:
  Core_Processing:
    tensorflow: "^4.10.0"           # TensorFlow.js for ML
    opencv4nodejs: "^5.6.0"        # OpenCV for computer vision
    sharp: "^0.32.5"               # High-performance image processing
    fluent-ffmpeg: "^2.1.2"        # Video processing

  Model_Management:
    @tensorflow/tfjs-node: "^4.10.0"  # TensorFlow Node.js backend
    @tensorflow/tfjs-converter: "^4.10.0" # Model conversion

  Performance_Optimization:
    worker_threads: "Built-in"      # Multi-threading support
    cluster: "Built-in"             # Process clustering
    bull: "^4.11.3"                # Job queue management

  API_Communication:
    express: "^4.18.2"             # REST API framework
    socket.io: "^4.7.2"            # WebSocket communication
    axios: "^1.5.0"                # HTTP client for backend communication
```

---

## 🐳 Docker Configuration

### **Development Docker Compose**
```yaml
# docker-compose.yml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: va-postgres-dev
    environment:
      POSTGRES_DB: video_analytics
      POSTGRES_USER: va_user
      POSTGRES_PASSWORD: va_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./config/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U va_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: va-redis-dev
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 3

  # Backend API Service
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: va-backend-dev
    ports:
      - "3001:3001"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://va_user:va_password@postgres:5432/video_analytics
      REDIS_URL: redis://redis:6379
      JWT_SECRET: dev_jwt_secret
    volumes:
      - ./backend:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  # AI Processing Service
  ai-service:
    build:
      context: ./ai-service
      dockerfile: Dockerfile
    container_name: va-ai-service-dev
    ports:
      - "3002:3002"
    environment:
      NODE_ENV: development
      BACKEND_URL: http://backend:3001
    volumes:
      - ./ai-service:/app
      - /app/node_modules
      - ./ai-service/models:/app/models
    depends_on:
      backend:
        condition: service_healthy

  # Frontend Application
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: development
    container_name: va-frontend-dev
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: http://localhost:3001
      VITE_WS_URL: ws://localhost:3001
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: va-nginx-dev
    ports:
      - "80:80"
    volumes:
      - ./config/nginx/dev.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - frontend
      - backend

  # Prometheus Monitoring
  prometheus:
    image: prom/prometheus:latest
    container_name: va-prometheus-dev
    ports:
      - "9090:9090"
    volumes:
      - ./config/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  # Grafana Dashboard
  grafana:
    image: grafana/grafana:latest
    container_name: va-grafana-dev
    ports:
      - "3003:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana
      - ./config/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./config/grafana/datasources:/etc/grafana/provisioning/datasources

volumes:
  postgres_data:
  redis_data:
  prometheus_data:
  grafana_data:

networks:
  default:
    driver: bridge
```

### **Individual Service Dockerfiles**

#### **Backend Dockerfile**
```dockerfile
# backend/Dockerfile
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Development stage
FROM base AS development
RUN npm ci
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS build
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./
EXPOSE 3001
USER node
CMD ["npm", "start"]
```

#### **Frontend Dockerfile**
```dockerfile
# frontend/Dockerfile
FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Development stage
FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production build stage
FROM base AS build
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY config/nginx/prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📋 Development Scripts & Automation

### **Package.json Scripts**
```json
{
  "name": "video-analytics-platform",
  "version": "1.0.0",
  "scripts": {
    "setup": "./scripts/setup.sh",
    "dev": "docker-compose up -d",
    "dev:logs": "docker-compose logs -f",
    "dev:stop": "docker-compose down",
    "dev:clean": "docker-compose down -v --remove-orphans",

    "build": "./scripts/build.sh",
    "build:backend": "cd backend && npm run build",
    "build:frontend": "cd frontend && npm run build",
    "build:ai": "cd ai-service && npm run build",

    "test": "./scripts/test.sh",
    "test:backend": "cd backend && npm test",
    "test:frontend": "cd frontend && npm test",
    "test:ai": "cd ai-service && npm test",
    "test:e2e": "cd tests && npm run e2e",

    "lint": "npm run lint:backend && npm run lint:frontend",
    "lint:backend": "cd backend && npm run lint",
    "lint:frontend": "cd frontend && npm run lint",
    "lint:fix": "npm run lint:backend -- --fix && npm run lint:frontend -- --fix",

    "deploy:staging": "./scripts/deploy.sh staging",
    "deploy:production": "./scripts/deploy.sh production",

    "db:migrate": "cd backend && npm run migrate",
    "db:seed": "cd backend && npm run seed",
    "db:reset": "cd backend && npm run db:reset"
  }
}
```

### **Development Setup Script**
```bash
#!/bin/bash
# scripts/setup.sh

echo "🚀 Setting up Video Analytics Platform development environment..."

# Check prerequisites
echo "📋 Checking prerequisites..."
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required but not installed. Aborting." >&2; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo "❌ Docker Compose is required but not installed. Aborting." >&2; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
cd ai-service && npm install && cd ..
cd tests && npm install && cd ..

# Copy environment files
echo "⚙️ Setting up environment files..."
cp .env.example .env
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp ai-service/.env.example ai-service/.env

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p data/uploads
mkdir -p data/models
mkdir -p logs
mkdir -p config/ssl

# Download pre-trained models
echo "🤖 Downloading AI models..."
cd ai-service
npm run download-models
cd ..

# Initialize database
echo "🗄️ Setting up database..."
docker-compose up -d postgres redis
sleep 10
npm run db:migrate
npm run db:seed

# Build services
echo "🔨 Building services..."
docker-compose build

# Start development environment
echo "🎉 Starting development environment..."
docker-compose up -d

echo "✅ Setup complete!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:3001"
echo "🤖 AI Service: http://localhost:3002"
echo "📊 Grafana: http://localhost:3003"
echo "📈 Prometheus: http://localhost:9090"
```

---

## 🧪 Testing Framework Structure

### **Testing Directory Organization**
```
tests/
├── package.json                      # Test dependencies
├── jest.config.js                   # Jest configuration
├── playwright.config.ts             # Playwright E2E config
├──
├── e2e/                             # End-to-end tests
│   ├── auth.spec.ts                # Authentication flow tests
│   ├── dashboard.spec.ts           # Dashboard functionality tests
│   ├── streams.spec.ts             # Video stream tests
│   └── alerts.spec.ts              # Alert system tests
│
├── integration/                     # Integration tests
│   ├── api.test.ts                 # API integration tests
│   ├── database.test.ts            # Database integration tests
│   └── services.test.ts            # Service integration tests
│
├── performance/                     # Performance tests
│   ├── load.test.ts                # Load testing
│   ├── stress.test.ts              # Stress testing
│   └── benchmark.test.ts           # Performance benchmarks
│
├── fixtures/                       # Test data
│   ├── users.json                 # User test data
│   ├── streams.json               # Stream test data
│   └── alerts.json                # Alert test data
│
└── utils/                          # Test utilities
    ├── setup.ts                   # Test environment setup
    ├── helpers.ts                 # Test helper functions
    └── mocks.ts                   # Mock implementations
```

### **Testing Configuration**
```yaml
TESTING_DEPENDENCIES:
  Unit_Testing:
    jest: "^29.6.4"                # JavaScript testing framework
    @types/jest: "^29.5.5"         # Jest TypeScript types
    ts-jest: "^29.1.1"             # TypeScript Jest processor

  Integration_Testing:
    supertest: "^6.3.3"            # HTTP testing
    testcontainers: "^10.2.1"      # Database testing containers

  E2E_Testing:
    playwright: "^1.37.1"          # Browser automation
    @playwright/test: "^1.37.1"    # Playwright test runner

  Performance_Testing:
    artillery: "^2.0.1"            # Load testing
    clinic: "^12.0.0"              # Performance profiling

  Mocking_Utilities:
    jest-mock: "^29.6.3"           # Advanced mocking
    msw: "^1.3.0"                  # API mocking
    nock: "^13.3.3"                # HTTP mocking
```

---

## 🔧 Configuration Management

### **Environment Configuration Structure**
```
config/
├── environments/                    # Environment-specific configs
│   ├── development.yml             # Development configuration
│   ├── staging.yml                # Staging configuration
│   ├── production.yml              # Production configuration
│   └── test.yml                    # Test configuration
│
├── nginx/                          # Nginx configurations
│   ├── dev.conf                   # Development proxy config
│   ├── staging.conf               # Staging proxy config
│   └── prod.conf                  # Production proxy config
│
├── prometheus/                     # Monitoring configuration
│   ├── prometheus.yml             # Prometheus configuration
│   ├── alerts.yml                 # Alert rules
│   └── recording.yml              # Recording rules
│
├── grafana/                        # Dashboard configuration
│   ├── dashboards/                # Dashboard definitions
│   │   ├── system-overview.json   # System metrics dashboard
│   │   ├── application-metrics.json # Application dashboard
│   │   └── business-metrics.json  # Business metrics dashboard
│   └── datasources/               # Data source definitions
│       └── prometheus.yml         # Prometheus datasource
│
└── ssl/                           # SSL certificates
    ├── cert.pem                   # SSL certificate
    ├── key.pem                    # SSL private key
    └── ca.pem                     # Certificate authority
```

### **Environment Variables Template**
```bash
# .env.example

# Application Settings
NODE_ENV=development
PORT=3001
API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://va_user:va_password@localhost:5432/video_analytics
DATABASE_MAX_CONNECTIONS=20
DATABASE_IDLE_TIMEOUT=30000

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_MAX_RETRIES=3
REDIS_TTL=3600

# Authentication
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=24h
REFRESH_TOKEN_EXPIRES_IN=7d

# AI Service Configuration
AI_SERVICE_URL=http://localhost:3002
AI_MODEL_PATH=/app/models
AI_CONFIDENCE_THRESHOLD=0.8

# File Storage
UPLOAD_PATH=/app/data/uploads
MAX_FILE_SIZE=100MB
ALLOWED_FILE_TYPES=mp4,avi,mov

# External Services
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=9464
LOG_LEVEL=info
```

---

## 📈 Monitoring & Observability Setup

### **Prometheus Configuration**
```yaml
# config/prometheus/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alerts.yml"
  - "recording.yml"

scrape_configs:
  - job_name: 'video-analytics-backend'
    static_configs:
      - targets: ['backend:3001']
    metrics_path: '/metrics'

  - job_name: 'video-analytics-ai'
    static_configs:
      - targets: ['ai-service:3002']
    metrics_path: '/metrics'

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']

  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']

  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx-exporter:9113']

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

### **Application Metrics Implementation**
```typescript
// backend/src/utils/metrics.ts
import { register, Counter, Histogram, Gauge } from 'prom-client';

// HTTP Request Metrics
export const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route']
});

// Video Processing Metrics
export const videoStreamActiveCount = new Gauge({
  name: 'video_streams_active_total',
  help: 'Number of active video streams'
});

export const videoProcessingDuration = new Histogram({
  name: 'video_processing_duration_seconds',
  help: 'Video processing duration in seconds',
  labelNames: ['stream_id', 'processing_type']
});

// Alert Metrics
export const alertsGenerated = new Counter({
  name: 'alerts_generated_total',
  help: 'Total number of alerts generated',
  labelNames: ['alert_type', 'severity']
});

// Database Metrics
export const databaseConnections = new Gauge({
  name: 'database_connections_active',
  help: 'Number of active database connections'
});

// Export metrics endpoint
export const metricsHandler = (req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
};
```

---

## 🚀 Deployment Configuration

### **Production Docker Compose**
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: ${DATABASE_NAME}
      POSTGRES_USER: ${DATABASE_USER}
      POSTGRES_PASSWORD: ${DATABASE_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DATABASE_USER}"]
      interval: 30s
      timeout: 10s
      retries: 3

  redis:
    image: redis:7-alpine
    command: redis-server --maxmemory 1gb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      target: production
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
      JWT_SECRET: ${JWT_SECRET}
    deploy:
      replicas: 2
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  ai-service:
    build:
      context: ./ai-service
      dockerfile: Dockerfile
      target: production
    environment:
      NODE_ENV: production
      BACKEND_URL: http://backend:3001
    volumes:
      - ai_models:/app/models
    deploy:
      replicas: 1
      resources:
        limits:
          memory: 4G
          cpus: '2.0'
        reservations:
          memory: 2G
          cpus: '1.0'

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      target: production
    deploy:
      replicas: 1
      resources:
        limits:
          memory: 256M
          cpus: '0.5'

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./config/nginx/prod.conf:/etc/nginx/conf.d/default.conf
      - ./config/ssl:/etc/nginx/ssl
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.5'

volumes:
  postgres_data:
  redis_data:
  ai_models:

networks:
  default:
    driver: overlay
    attachable: true
```

---

## 📋 Implementation Roadmap

### **Phase 1 Development Timeline (6 Months)**
```yaml
MONTH_1_FOUNDATION:
  Week_1: "Project setup and environment configuration"
  Week_2: "Backend API structure and database schema"
  Week_3: "Frontend application structure and routing"
  Week_4: "Basic authentication and user management"

MONTH_2_CORE_FEATURES:
  Week_1: "Video stream integration and basic processing"
  Week_2: "Real-time dashboard and live feed display"
  Week_3: "Basic object detection integration"
  Week_4: "Alert system and notification framework"

MONTH_3_INTEGRATION:
  Week_1: "Frontend-backend integration and API completion"
  Week_2: "AI service integration and testing"
  Week_3: "User interface completion and user experience"
  Week_4: "Basic reporting and data export"

MONTH_4_TESTING:
  Week_1: "Unit testing implementation"
  Week_2: "Integration testing and API testing"
  Week_3: "End-to-end testing and user acceptance testing"
  Week_4: "Performance testing and optimization"

MONTH_5_DEPLOYMENT_PREP:
  Week_1: "Production environment setup"
  Week_2: "Security hardening and compliance"
  Week_3: "Monitoring and alerting implementation"
  Week_4: "Documentation and user guides"

MONTH_6_LAUNCH:
  Week_1: "Production deployment and configuration"
  Week_2: "User training and support setup"
  Week_3: "Go-live and initial support"
  Week_4: "Post-launch optimization and bug fixes"
```

---

## 🎯 Quality Assurance & Best Practices

### **Code Quality Standards**
```yaml
CODE_QUALITY_REQUIREMENTS:
  Test_Coverage: ">80% for all services"
  Code_Linting: "ESLint + Prettier for consistency"
  Type_Safety: "Strict TypeScript configuration"
  Documentation: "JSDoc for all public APIs"
  Security: "Regular security scanning and updates"

DEVELOPMENT_PRACTICES:
  Git_Workflow: "Feature branches with pull request reviews"
  Code_Reviews: "Required reviews for all changes"
  Automated_Testing: "CI/CD pipeline with automated testing"
  Performance_Monitoring: "Continuous performance monitoring"
  Security_Scanning: "Automated security vulnerability scanning"
```

---

**The MVP Project Structure provides a comprehensive, production-ready foundation for Phase 1 implementation of the AI Video Analytics Platform. Through careful technology selection, clear project organization, and comprehensive development practices, this structure ensures successful delivery while maintaining scalability for future phases.**

---

**Document Status**: Ready for Implementation
**Technical Owner**: Technical Lead and Development Team
**Implementation Timeline**: 6 months with monthly milestones
**Success Criteria**: Working system with 80% test coverage, <500ms response time, 95% uptime