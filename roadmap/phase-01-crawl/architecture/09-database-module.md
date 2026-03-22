---
title: "Phase 1 Database Module - Data Management and Storage Architecture"
version: "1.0"
author: "Phase 1 Database Team"
date: "2024-09-28"
audience: ["database_administrators", "backend_developers", "data_engineers", "devops_engineers"]
complexity: "intermediate"
topics: ["phase_1", "database", "postgresql", "schema_design", "performance_optimization", "data_management"]
priority: "critical"
implementation_phase: "crawl"
---

# Phase 1 Database Module
## Data Management and Storage Architecture - CRAWL Phase

---

## 🎯 Database Module Overview

The **Database Module** serves as the central data storage and management foundation for the Phase 1 Video Analytics Platform, providing **high-performance data persistence**, **transactional integrity**, **optimized query performance**, and **reliable backup and recovery** capabilities for all platform components.

### **Database Module Mission**
- **Reliable Data Storage**: ACID-compliant transactional data storage for all platform data
- **High Performance**: Optimized query performance with sub-100ms response times
- **Scalable Architecture**: Efficient data management supporting 100+ concurrent streams
- **Data Integrity**: Consistent data relationships and validation across all entities
- **Operational Excellence**: Automated backup, recovery, and maintenance procedures

### **Key Capabilities Delivered**
- **Comprehensive Schema**: Complete relational schema for all platform entities
- **Performance Optimization**: Advanced indexing and query optimization strategies
- **Data Lifecycle Management**: Automated retention policies and archival procedures
- **Backup and Recovery**: Continuous backup with point-in-time recovery capabilities
- **Connection Management**: Efficient connection pooling and resource optimization
- **Security Framework**: Data encryption, access control, and comprehensive audit logging
- **Monitoring Integration**: Real-time performance monitoring and health tracking

---

## 🏗️ Database Architecture

### **High-Level Database Architecture**
```mermaid
graph TB
    subgraph "🏛️ Application Layer Integration"
        API_GATEWAY[API Gateway<br/>• User authentication<br/>• Stream configurations<br/>• System settings<br/>• Request logging]

        STREAM_MGR[Stream Manager<br/>• Stream metadata<br/>• Connection states<br/>• Performance metrics<br/>• Health tracking]

        VIDEO_PROC[Video Processor<br/>• Processing jobs<br/>• Frame metadata<br/>• Quality metrics<br/>• Error logging]

        AI_ENGINE[AI Engine<br/>• Detection results<br/>• Model performance<br/>• Analytics data<br/>• Alert triggers]
    end

    subgraph "🔗 Database Access Layer"
        CONN_POOL[Connection Pool<br/>• pgBouncer pooling<br/>• Load balancing<br/>• Connection reuse<br/>• Resource optimization]

        ORM_LAYER[ORM Layer<br/>• GORM for Go services<br/>• Query optimization<br/>• Relationship mapping<br/>• Migration support]

        CACHE_LAYER[Cache Layer<br/>• Redis integration<br/>• Query result caching<br/>• Session storage<br/>• Temporary data]

        ACCESS_CTRL[Access Control<br/>• Role-based access<br/>• Query validation<br/>• Security enforcement<br/>• Audit logging]
    end

    subgraph "💾 PostgreSQL Core"
        subgraph "📊 Schema Organization"
            CORE_SCHEMA[Core Schema<br/>• Users and authentication<br/>• System configuration<br/>• Audit and logging<br/>• Reference data]

            STREAM_SCHEMA[Stream Schema<br/>• Stream definitions<br/>• Connection metadata<br/>• Performance metrics<br/>• Health status]

            ANALYTICS_SCHEMA[Analytics Schema<br/>• AI detection results<br/>• Performance analytics<br/>• Alert data<br/>• Reporting metrics]

            OPERATIONAL_SCHEMA[Operational Schema<br/>• System logs<br/>• Error tracking<br/>• Performance data<br/>• Maintenance records]
        end

        subgraph "⚡ Performance Optimization"
            INDEXING[Strategic Indexing<br/>• B-tree indexes<br/>• Partial indexes<br/>• Composite indexes<br/>• Covering indexes]

            PARTITIONING[Table Partitioning<br/>• Time-based partitions<br/>• Range partitioning<br/>• Hash partitioning<br/>• Automated maintenance]

            QUERY_OPT[Query Optimization<br/>• Query planner tuning<br/>• Statistics updates<br/>• Plan analysis<br/>• Performance monitoring]

            MAINTENANCE[Automated Maintenance<br/>• VACUUM operations<br/>• ANALYZE updates<br/>• Index rebuilding<br/>• Statistics refresh]
        end
    end

    subgraph "🔄 Data Management"
        BACKUP_SYS[Backup System<br/>• Continuous WAL archiving<br/>• Point-in-time recovery<br/>• Automated backups<br/>• Cross-region replication]

        RETENTION_MGR[Retention Manager<br/>• Data lifecycle policies<br/>• Automated archival<br/>• Cleanup procedures<br/>• Storage optimization]

        MIGRATION_MGR[Migration Manager<br/>• Schema versioning<br/>• Data migrations<br/>• Rollback capabilities<br/>• Environment consistency]

        MONITOR_SYS[Monitoring System<br/>• Performance metrics<br/>• Health monitoring<br/>• Alert generation<br/>• Trend analysis]
    end

    API_GATEWAY --> CONN_POOL
    STREAM_MGR --> ORM_LAYER
    VIDEO_PROC --> CACHE_LAYER
    AI_ENGINE --> ACCESS_CTRL

    CONN_POOL --> CORE_SCHEMA
    ORM_LAYER --> STREAM_SCHEMA
    CACHE_LAYER --> ANALYTICS_SCHEMA
    ACCESS_CTRL --> OPERATIONAL_SCHEMA

    CORE_SCHEMA --> INDEXING
    STREAM_SCHEMA --> PARTITIONING
    ANALYTICS_SCHEMA --> QUERY_OPT
    OPERATIONAL_SCHEMA --> MAINTENANCE

    INDEXING --> BACKUP_SYS
    PARTITIONING --> RETENTION_MGR
    QUERY_OPT --> MIGRATION_MGR
    MAINTENANCE --> MONITOR_SYS

    classDef app fill:#2196f3,stroke:#1976d2,stroke-width:2px,color:#fff
    classDef access fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    classDef schema fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    classDef performance fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff
    classDef management fill:#f44336,stroke:#d32f2f,stroke-width:2px,color:#fff

    class API_GATEWAY,STREAM_MGR,VIDEO_PROC,AI_ENGINE app
    class CONN_POOL,ORM_LAYER,CACHE_LAYER,ACCESS_CTRL access
    class CORE_SCHEMA,STREAM_SCHEMA,ANALYTICS_SCHEMA,OPERATIONAL_SCHEMA schema
    class INDEXING,PARTITIONING,QUERY_OPT,MAINTENANCE performance
    class BACKUP_SYS,RETENTION_MGR,MIGRATION_MGR,MONITOR_SYS management
```

### **Database Technology Stack**
```yaml
DATABASE_TECHNOLOGY_STACK:
  Database_Engine: "PostgreSQL 15+ for ACID compliance and performance"
  Connection_Pooling: "pgBouncer for connection management and optimization"
  ORM_Framework: "GORM for Go services with relationship mapping"
  Caching_Layer: "Redis for query result caching and session storage"
  Backup_Solution: "pg_basebackup with WAL-E for continuous archival"

  Performance_Tools:
    Query_Analysis: "pg_stat_statements for query performance tracking"
    Index_Monitoring: "pg_stat_user_indexes for index usage analysis"
    Lock_Monitoring: "pg_locks for deadlock detection and analysis"
    Performance_Insights: "Custom monitoring with Prometheus integration"

  Administration_Tools:
    Migration_Management: "golang-migrate for schema version control"
    Monitoring: "pg_stat_monitor and custom Prometheus exporters"
    Backup_Management: "Automated backup scripts with retention policies"
    Performance_Tuning: "pg_tune and custom optimization procedures"

  Security_Features:
    Authentication: "SCRAM-SHA-256 with connection encryption"
    Authorization: "Role-based access control with row-level security"
    Encryption: "Transparent data encryption (TDE) for data at rest"
    Audit_Logging: "pgAudit for comprehensive audit trail"

  High_Availability:
    Replication: "Streaming replication with automatic failover"
    Load_Balancing: "Read replica load balancing"
    Backup_Strategy: "Multi-tier backup with geographic distribution"
    Disaster_Recovery: "Point-in-time recovery with 15-minute RPO"
```

---

## 📊 Comprehensive Schema Design

### **Entity Relationship Architecture**
```mermaid
erDiagram
    USERS {
        uuid user_id PK
        varchar username UK
        varchar email UK
        varchar password_hash
        varchar first_name
        varchar last_name
        varchar role
        boolean active
        jsonb preferences
        timestamp created_at
        timestamp updated_at
        timestamp last_login
    }

    USER_SESSIONS {
        uuid session_id PK
        uuid user_id FK
        varchar token_hash
        timestamp expires_at
        inet ip_address
        varchar user_agent
        timestamp created_at
        boolean revoked
    }

    STREAMS {
        uuid stream_id PK
        varchar name UK
        text description
        varchar stream_type
        text source_url
        jsonb configuration
        varchar status
        integer priority
        boolean enabled
        uuid created_by FK
        timestamp created_at
        timestamp updated_at
    }

    STREAM_SESSIONS {
        uuid session_id PK
        uuid stream_id FK
        timestamp start_time
        timestamp end_time
        bigint frames_processed
        integer errors_count
        decimal average_fps
        jsonb performance_metrics
        varchar termination_reason
    }

    STREAM_HEALTH {
        uuid health_id PK
        uuid stream_id FK
        timestamp timestamp
        decimal health_score
        varchar connection_status
        integer error_count
        jsonb performance_data
        jsonb quality_metrics
        integer alerts_generated
    }

    AI_DETECTIONS {
        uuid detection_id PK
        uuid stream_id FK
        uuid session_id FK
        timestamp detection_time
        varchar object_type
        decimal confidence_score
        jsonb bounding_box
        jsonb metadata
        varchar model_version
        decimal processing_time
    }

    ALERTS {
        uuid alert_id PK
        uuid stream_id FK
        uuid detection_id FK
        varchar alert_type
        varchar severity
        varchar status
        text message
        jsonb alert_data
        uuid assigned_to FK
        timestamp triggered_at
        timestamp acknowledged_at
        timestamp resolved_at
    }

    SYSTEM_CONFIG {
        varchar config_key PK
        jsonb config_value
        varchar description
        varchar category
        boolean is_public
        uuid updated_by FK
        timestamp updated_at
        varchar version
    }

    AUDIT_LOGS {
        uuid log_id PK
        uuid user_id FK
        varchar action_type
        varchar resource_type
        uuid resource_id
        jsonb old_values
        jsonb new_values
        inet ip_address
        varchar user_agent
        timestamp timestamp
        varchar result
    }

    PERFORMANCE_METRICS {
        uuid metric_id PK
        uuid stream_id FK
        varchar metric_type
        decimal metric_value
        varchar unit
        jsonb additional_data
        timestamp timestamp
        varchar source_component
    }

    BACKUP_JOBS {
        uuid job_id PK
        varchar backup_type
        varchar status
        timestamp started_at
        timestamp completed_at
        bigint backup_size
        varchar backup_location
        text error_message
        jsonb job_metadata
    }

    USERS ||--o{ USER_SESSIONS : "has"
    USERS ||--o{ STREAMS : "creates"
    USERS ||--o{ ALERTS : "assigned_to"
    USERS ||--o{ SYSTEM_CONFIG : "updates"
    USERS ||--o{ AUDIT_LOGS : "performs"

    STREAMS ||--o{ STREAM_SESSIONS : "has"
    STREAMS ||--o{ STREAM_HEALTH : "monitors"
    STREAMS ||--o{ AI_DETECTIONS : "generates"
    STREAMS ||--o{ ALERTS : "triggers"
    STREAMS ||--o{ PERFORMANCE_METRICS : "measures"

    STREAM_SESSIONS ||--o{ AI_DETECTIONS : "contains"
    AI_DETECTIONS ||--o{ ALERTS : "triggers"
```

### **Detailed Table Specifications**
```sql
-- Core User Management Tables
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'viewer',
    active BOOLEAN NOT NULL DEFAULT true,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE,

    CONSTRAINT users_role_check CHECK (role IN ('super_admin', 'admin', 'operator', 'analyst', 'viewer')),
    CONSTRAINT users_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(active) WHERE active = true;
CREATE INDEX idx_users_last_login ON users(last_login);

-- User Session Management
CREATE TABLE user_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revoked BOOLEAN DEFAULT false,

    CONSTRAINT sessions_expires_future CHECK (expires_at > created_at)
);

CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token_hash ON user_sessions(token_hash);
CREATE INDEX idx_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_sessions_active ON user_sessions(user_id, expires_at) WHERE revoked = false;

-- Stream Management Tables
CREATE TABLE streams (
    stream_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    stream_type VARCHAR(20) NOT NULL,
    source_url TEXT NOT NULL,
    configuration JSONB DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'inactive',
    priority INTEGER NOT NULL DEFAULT 5,
    enabled BOOLEAN NOT NULL DEFAULT true,
    created_by UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT streams_type_check CHECK (stream_type IN ('rtsp', 'http', 'webrtc', 'file')),
    CONSTRAINT streams_status_check CHECK (status IN ('inactive', 'starting', 'active', 'stopping', 'error', 'maintenance')),
    CONSTRAINT streams_priority_check CHECK (priority BETWEEN 1 AND 10)
);

CREATE INDEX idx_streams_name ON streams(name);
CREATE INDEX idx_streams_type ON streams(stream_type);
CREATE INDEX idx_streams_status ON streams(status);
CREATE INDEX idx_streams_enabled ON streams(enabled) WHERE enabled = true;
CREATE INDEX idx_streams_created_by ON streams(created_by);
CREATE INDEX idx_streams_priority ON streams(priority);

-- Stream Session Tracking
CREATE TABLE stream_sessions (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID NOT NULL REFERENCES streams(stream_id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    frames_processed BIGINT DEFAULT 0,
    errors_count INTEGER DEFAULT 0,
    average_fps DECIMAL(5,2),
    performance_metrics JSONB DEFAULT '{}',
    termination_reason VARCHAR(100),

    CONSTRAINT sessions_end_after_start CHECK (end_time IS NULL OR end_time > start_time),
    CONSTRAINT sessions_frames_positive CHECK (frames_processed >= 0),
    CONSTRAINT sessions_errors_positive CHECK (errors_count >= 0)
);

CREATE INDEX idx_stream_sessions_stream_id ON stream_sessions(stream_id);
CREATE INDEX idx_stream_sessions_start_time ON stream_sessions(start_time);
CREATE INDEX idx_stream_sessions_active ON stream_sessions(stream_id) WHERE end_time IS NULL;

-- Stream Health Monitoring
CREATE TABLE stream_health (
    health_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID NOT NULL REFERENCES streams(stream_id) ON DELETE CASCADE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    health_score DECIMAL(3,2) NOT NULL,
    connection_status VARCHAR(20) NOT NULL,
    error_count INTEGER DEFAULT 0,
    performance_data JSONB DEFAULT '{}',
    quality_metrics JSONB DEFAULT '{}',
    alerts_generated INTEGER DEFAULT 0,

    CONSTRAINT health_score_range CHECK (health_score BETWEEN 0.0 AND 5.0),
    CONSTRAINT health_status_check CHECK (connection_status IN ('connected', 'disconnected', 'reconnecting', 'error')),
    CONSTRAINT health_errors_positive CHECK (error_count >= 0)
);

CREATE INDEX idx_stream_health_stream_id ON stream_health(stream_id);
CREATE INDEX idx_stream_health_timestamp ON stream_health(timestamp);
CREATE INDEX idx_stream_health_score ON stream_health(health_score);
CREATE INDEX idx_stream_health_status ON stream_health(connection_status);

-- Partition stream_health by month for performance
CREATE TABLE stream_health_y2024m01 PARTITION OF stream_health
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
CREATE TABLE stream_health_y2024m02 PARTITION OF stream_health
    FOR VALUES FROM ('2024-02-01') TO ('2024-03-01');
-- Additional monthly partitions...

-- AI Detection Results
CREATE TABLE ai_detections (
    detection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID NOT NULL REFERENCES streams(stream_id) ON DELETE CASCADE,
    session_id UUID REFERENCES stream_sessions(session_id) ON DELETE SET NULL,
    detection_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    object_type VARCHAR(50) NOT NULL,
    confidence_score DECIMAL(4,3) NOT NULL,
    bounding_box JSONB NOT NULL,
    metadata JSONB DEFAULT '{}',
    model_version VARCHAR(20) NOT NULL,
    processing_time DECIMAL(8,3),

    CONSTRAINT detection_confidence_range CHECK (confidence_score BETWEEN 0.0 AND 1.0),
    CONSTRAINT detection_processing_time_positive CHECK (processing_time IS NULL OR processing_time >= 0)
);

CREATE INDEX idx_ai_detections_stream_id ON ai_detections(stream_id);
CREATE INDEX idx_ai_detections_session_id ON ai_detections(session_id);
CREATE INDEX idx_ai_detections_time ON ai_detections(detection_time);
CREATE INDEX idx_ai_detections_type ON ai_detections(object_type);
CREATE INDEX idx_ai_detections_confidence ON ai_detections(confidence_score);
CREATE INDEX idx_ai_detections_model ON ai_detections(model_version);

-- Partition ai_detections by day for high-volume data
CREATE TABLE ai_detections_y2024m01d01 PARTITION OF ai_detections
    FOR VALUES FROM ('2024-01-01') TO ('2024-01-02');
-- Additional daily partitions...

-- Alert Management
CREATE TABLE alerts (
    alert_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID REFERENCES streams(stream_id) ON DELETE SET NULL,
    detection_id UUID REFERENCES ai_detections(detection_id) ON DELETE SET NULL,
    alert_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    message TEXT NOT NULL,
    alert_data JSONB DEFAULT '{}',
    assigned_to UUID REFERENCES users(user_id) ON DELETE SET NULL,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,

    CONSTRAINT alert_severity_check CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    CONSTRAINT alert_status_check CHECK (status IN ('active', 'acknowledged', 'resolved', 'false_positive')),
    CONSTRAINT alert_ack_after_trigger CHECK (acknowledged_at IS NULL OR acknowledged_at >= triggered_at),
    CONSTRAINT alert_resolved_after_ack CHECK (resolved_at IS NULL OR acknowledged_at IS NULL OR resolved_at >= acknowledged_at)
);

CREATE INDEX idx_alerts_stream_id ON alerts(stream_id);
CREATE INDEX idx_alerts_detection_id ON alerts(detection_id);
CREATE INDEX idx_alerts_type ON alerts(alert_type);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_status ON alerts(status);
CREATE INDEX idx_alerts_assigned_to ON alerts(assigned_to);
CREATE INDEX idx_alerts_triggered_at ON alerts(triggered_at);
CREATE INDEX idx_alerts_active ON alerts(status, triggered_at) WHERE status = 'active';

-- System Configuration
CREATE TABLE system_config (
    config_key VARCHAR(100) PRIMARY KEY,
    config_value JSONB NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    is_public BOOLEAN NOT NULL DEFAULT false,
    updated_by UUID NOT NULL REFERENCES users(user_id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version VARCHAR(20) NOT NULL DEFAULT '1.0'
);

CREATE INDEX idx_system_config_category ON system_config(category);
CREATE INDEX idx_system_config_public ON system_config(is_public) WHERE is_public = true;
CREATE INDEX idx_system_config_updated_by ON system_config(updated_by);

-- Comprehensive Audit Logging
CREATE TABLE audit_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    action_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    result VARCHAR(20) NOT NULL DEFAULT 'success',

    CONSTRAINT audit_result_check CHECK (result IN ('success', 'failure', 'error'))
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action_type ON audit_logs(action_type);
CREATE INDEX idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX idx_audit_logs_resource_id ON audit_logs(resource_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_result ON audit_logs(result);

-- Partition audit_logs by month
CREATE TABLE audit_logs_y2024m01 PARTITION OF audit_logs
    FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');
-- Additional monthly partitions...

-- Performance Metrics
CREATE TABLE performance_metrics (
    metric_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stream_id UUID REFERENCES streams(stream_id) ON DELETE CASCADE,
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(15,6) NOT NULL,
    unit VARCHAR(20),
    additional_data JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source_component VARCHAR(50) NOT NULL
);

CREATE INDEX idx_performance_metrics_stream_id ON performance_metrics(stream_id);
CREATE INDEX idx_performance_metrics_type ON performance_metrics(metric_type);
CREATE INDEX idx_performance_metrics_timestamp ON performance_metrics(timestamp);
CREATE INDEX idx_performance_metrics_source ON performance_metrics(source_component);

-- Partition performance_metrics by week for high-frequency data
CREATE TABLE performance_metrics_y2024w01 PARTITION OF performance_metrics
    FOR VALUES FROM ('2024-01-01') TO ('2024-01-08');
-- Additional weekly partitions...

-- Backup Job Tracking
CREATE TABLE backup_jobs (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    backup_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    backup_size BIGINT,
    backup_location TEXT,
    error_message TEXT,
    job_metadata JSONB DEFAULT '{}',

    CONSTRAINT backup_type_check CHECK (backup_type IN ('full', 'incremental', 'wal', 'logical')),
    CONSTRAINT backup_status_check CHECK (status IN ('running', 'completed', 'failed', 'cancelled')),
    CONSTRAINT backup_completed_after_start CHECK (completed_at IS NULL OR completed_at >= started_at),
    CONSTRAINT backup_size_positive CHECK (backup_size IS NULL OR backup_size >= 0)
);

CREATE INDEX idx_backup_jobs_type ON backup_jobs(backup_type);
CREATE INDEX idx_backup_jobs_status ON backup_jobs(status);
CREATE INDEX idx_backup_jobs_started_at ON backup_jobs(started_at);
```

---

## ⚡ Performance Optimization Strategies

### **Indexing Strategy Architecture**
```mermaid
graph TB
    subgraph "📊 Strategic Indexing Framework"
        subgraph "🎯 Primary Index Types"
            BTREE_IDX[B-Tree Indexes<br/>• Primary key indexes<br/>• Unique constraints<br/>• Range queries<br/>• Sorting operations]

            PARTIAL_IDX[Partial Indexes<br/>• Filtered indexes<br/>• Active records only<br/>• Conditional indexing<br/>• Storage optimization]

            COMPOSITE_IDX[Composite Indexes<br/>• Multi-column indexes<br/>• Query optimization<br/>• Covering indexes<br/>• Join optimization]

            EXPRESSION_IDX[Expression Indexes<br/>• Computed values<br/>• Function-based queries<br/>• JSON field indexing<br/>• Complex expressions]
        end

        subgraph "📈 Performance Patterns"
            RANGE_QUERIES[Range Query Optimization<br/>• Time-based queries<br/>• Numeric ranges<br/>• Date range filtering<br/>• Pagination support]

            JOIN_OPT[Join Optimization<br/>• Foreign key indexes<br/>• Junction table indexes<br/>• Nested loop joins<br/>• Hash join support]

            SEARCH_OPT[Search Optimization<br/>• Text search indexes<br/>• Pattern matching<br/>• Full-text search<br/>• Fuzzy matching]

            AGGREGATION_OPT[Aggregation Optimization<br/>• GROUP BY optimization<br/>• Statistical queries<br/>• Window functions<br/>• Materialized views]
        end

        subgraph "🔄 Maintenance Strategy"
            AUTO_VACUUM[Automated VACUUM<br/>• Dead tuple cleanup<br/>• Table bloat prevention<br/>• Index maintenance<br/>• Statistics updates]

            REINDEX_MGMT[Reindexing Management<br/>• Index rebuilding<br/>• Concurrent reindexing<br/>• Fragmentation cleanup<br/>• Performance restoration]

            STATS_UPDATE[Statistics Updates<br/>• Query planner stats<br/>• Table statistics<br/>• Index usage stats<br/>• Performance metrics]

            MONITOR_INDEX[Index Monitoring<br/>• Index usage tracking<br/>• Unused index detection<br/>• Performance impact<br/>• Optimization recommendations]
        end

        subgraph "📊 Advanced Techniques"
            PARTITION_IDX[Partition Indexing<br/>• Per-partition indexes<br/>• Constraint exclusion<br/>• Parallel queries<br/>• Maintenance optimization]

            COVERING_IDX[Covering Indexes<br/>• Include columns<br/>• Index-only scans<br/>• Reduced I/O<br/>• Query acceleration]

            CONCURRENT_IDX[Concurrent Indexing<br/>• Online index creation<br/>• Minimal locking<br/>• Production safety<br/>• Zero downtime]

            SPECIALIZED_IDX[Specialized Indexes<br/>• GIN for JSON/arrays<br/>• GiST for geometric data<br/>• SP-GiST for partitioned data<br/>• BRIN for large tables]
        end
    end

    BTREE_IDX --> RANGE_QUERIES
    PARTIAL_IDX --> JOIN_OPT
    COMPOSITE_IDX --> SEARCH_OPT
    EXPRESSION_IDX --> AGGREGATION_OPT

    RANGE_QUERIES --> AUTO_VACUUM
    JOIN_OPT --> REINDEX_MGMT
    SEARCH_OPT --> STATS_UPDATE
    AGGREGATION_OPT --> MONITOR_INDEX

    AUTO_VACUUM --> PARTITION_IDX
    REINDEX_MGMT --> COVERING_IDX
    STATS_UPDATE --> CONCURRENT_IDX
    MONITOR_INDEX --> SPECIALIZED_IDX

    classDef primary fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    classDef patterns fill:#2196f3,stroke:#1976d2,stroke-width:2px,color:#fff
    classDef maintenance fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    classDef advanced fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff

    class BTREE_IDX,PARTIAL_IDX,COMPOSITE_IDX,EXPRESSION_IDX primary
    class RANGE_QUERIES,JOIN_OPT,SEARCH_OPT,AGGREGATION_OPT patterns
    class AUTO_VACUUM,REINDEX_MGMT,STATS_UPDATE,MONITOR_INDEX maintenance
    class PARTITION_IDX,COVERING_IDX,CONCURRENT_IDX,SPECIALIZED_IDX advanced
```

### **Query Performance Optimization**
```sql
-- Performance Optimization Examples

-- 1. Efficient Stream Health Queries with Time-based Indexing
CREATE INDEX CONCURRENTLY idx_stream_health_time_stream
ON stream_health (timestamp DESC, stream_id)
WHERE health_score < 4.0;

-- Optimized query for recent health issues
EXPLAIN (ANALYZE, BUFFERS)
SELECT s.name, h.health_score, h.timestamp
FROM streams s
JOIN stream_health h ON s.stream_id = h.stream_id
WHERE h.timestamp >= NOW() - INTERVAL '1 hour'
  AND h.health_score < 4.0
ORDER BY h.timestamp DESC
LIMIT 100;

-- 2. AI Detection Performance with Composite Indexing
CREATE INDEX CONCURRENTLY idx_ai_detections_composite
ON ai_detections (stream_id, detection_time DESC, confidence_score DESC)
WHERE confidence_score >= 0.8;

-- High-confidence detection query
EXPLAIN (ANALYZE, BUFFERS)
SELECT object_type, confidence_score, detection_time, metadata
FROM ai_detections
WHERE stream_id = $1
  AND detection_time >= $2
  AND confidence_score >= 0.8
ORDER BY detection_time DESC;

-- 3. Alert Aggregation with Covering Index
CREATE INDEX CONCURRENTLY idx_alerts_covering
ON alerts (status, triggered_at, severity, alert_type, stream_id)
WHERE status IN ('active', 'acknowledged');

-- Alert summary query
EXPLAIN (ANALYZE, BUFFERS)
SELECT alert_type, severity, COUNT(*) as count
FROM alerts
WHERE status = 'active'
  AND triggered_at >= NOW() - INTERVAL '24 hours'
GROUP BY alert_type, severity
ORDER BY count DESC;

-- 4. Stream Performance Analytics with Partial Index
CREATE INDEX CONCURRENTLY idx_performance_metrics_recent
ON performance_metrics (stream_id, metric_type, timestamp DESC, metric_value)
WHERE timestamp >= NOW() - INTERVAL '7 days';

-- Performance trend analysis
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    stream_id,
    metric_type,
    AVG(metric_value) as avg_value,
    MAX(metric_value) as max_value,
    MIN(metric_value) as min_value,
    COUNT(*) as sample_count
FROM performance_metrics
WHERE timestamp >= NOW() - INTERVAL '24 hours'
  AND metric_type IN ('fps', 'latency', 'error_rate')
GROUP BY stream_id, metric_type;

-- 5. User Activity Analysis with Expression Index
CREATE INDEX CONCURRENTLY idx_audit_logs_date_action
ON audit_logs (DATE(timestamp), action_type, user_id)
WHERE result = 'success';

-- Daily activity summary
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    DATE(timestamp) as activity_date,
    action_type,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(*) as total_actions
FROM audit_logs
WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
  AND result = 'success'
GROUP BY DATE(timestamp), action_type
ORDER BY activity_date DESC, total_actions DESC;

-- 6. Stream Session Analysis with Window Functions
CREATE INDEX CONCURRENTLY idx_stream_sessions_duration
ON stream_sessions (stream_id, start_time, end_time)
WHERE end_time IS NOT NULL;

-- Session duration analysis
EXPLAIN (ANALYZE, BUFFERS)
SELECT
    s.name,
    ss.start_time,
    ss.end_time,
    EXTRACT(EPOCH FROM (ss.end_time - ss.start_time)) as duration_seconds,
    ss.frames_processed,
    ss.average_fps,
    LAG(ss.end_time) OVER (PARTITION BY ss.stream_id ORDER BY ss.start_time) as prev_end_time
FROM streams s
JOIN stream_sessions ss ON s.stream_id = ss.stream_id
WHERE ss.end_time IS NOT NULL
  AND ss.start_time >= NOW() - INTERVAL '7 days'
ORDER BY s.name, ss.start_time;
```

### **Partitioning Strategy Implementation**
```yaml
PARTITIONING_STRATEGY:
  Time_Based_Partitioning:
    stream_health:
      Partition_Type: "Range partitioning by timestamp"
      Partition_Interval: "Monthly partitions"
      Retention_Policy: "12 months of data"
      Auto_Creation: "pg_partman for automated partition management"

    ai_detections:
      Partition_Type: "Range partitioning by detection_time"
      Partition_Interval: "Daily partitions for high volume"
      Retention_Policy: "90 days of detailed data, then archival"
      Compression: "Older partitions compressed automatically"

    performance_metrics:
      Partition_Type: "Range partitioning by timestamp"
      Partition_Interval: "Weekly partitions"
      Retention_Policy: "6 months of detailed metrics"
      Aggregation: "Monthly summary tables for long-term analysis"

    audit_logs:
      Partition_Type: "Range partitioning by timestamp"
      Partition_Interval: "Monthly partitions"
      Retention_Policy: "7 years for compliance"
      Archive_Strategy: "Compress and move to cold storage after 1 year"

  Partition_Management:
    Automated_Creation: "pg_partman extension for partition lifecycle"
    Constraint_Exclusion: "Enabled for query optimization"
    Parallel_Queries: "Partition-wise joins enabled"
    Maintenance_Windows: "Weekly maintenance for partition operations"

  Performance_Benefits:
    Query_Performance: "10-100x improvement for time-range queries"
    Maintenance_Speed: "VACUUM and ANALYZE operations parallelized"
    Index_Size: "Smaller indexes per partition improve cache efficiency"
    Backup_Efficiency: "Incremental backups per partition"
```

---

## 🔄 Data Lifecycle Management

### **Comprehensive Data Retention Architecture**
```mermaid
graph TB
    subgraph "📅 Data Lifecycle Management"
        subgraph "🔄 Data Stages"
            HOT_DATA[Hot Data (0-30 days)<br/>• Real-time access required<br/>• Full indexing<br/>• High performance storage<br/>• Immediate availability]

            WARM_DATA[Warm Data (30-365 days)<br/>• Regular access<br/>• Reduced indexing<br/>• Standard storage<br/>• Query optimization]

            COLD_DATA[Cold Data (1-7 years)<br/>• Infrequent access<br/>• Minimal indexing<br/>• Compressed storage<br/>• Archival queries]

            FROZEN_DATA[Frozen Data (7+ years)<br/>• Compliance storage<br/>• No active indexes<br/>• Deep archive<br/>• Restore on demand]
        end

        subgraph "⚙️ Lifecycle Operations"
            DATA_CLASSIFIER[Data Classifier<br/>• Age-based classification<br/>• Access pattern analysis<br/>• Storage tier assignment<br/>• Automated categorization]

            MIGRATION_ENGINE[Migration Engine<br/>• Automated data movement<br/>• Storage tier transitions<br/>• Integrity verification<br/>• Rollback capability]

            COMPRESSION_MGR[Compression Manager<br/>• Lossless compression<br/>• Algorithm selection<br/>• Performance optimization<br/>• Storage savings]

            RETENTION_ENFORCER[Retention Enforcer<br/>• Policy compliance<br/>• Automated deletion<br/>• Legal hold management<br/>• Audit trail]
        end

        subgraph "📊 Policy Management"
            RETENTION_POLICIES[Retention Policies<br/>• Data type specific<br/>• Regulatory compliance<br/>• Business requirements<br/>• Configurable rules]

            COMPLIANCE_RULES[Compliance Rules<br/>• GDPR requirements<br/>• Industry regulations<br/>• Legal obligations<br/>• Data sovereignty]

            BUSINESS_RULES[Business Rules<br/>• Operational needs<br/>• Analytics requirements<br/>• Performance targets<br/>• Cost optimization]

            POLICY_AUDIT[Policy Auditing<br/>• Compliance tracking<br/>• Exception monitoring<br/>• Performance metrics<br/>• Regular reviews]
        end

        subgraph "🔧 Implementation Tools"
            SCHEDULER[Job Scheduler<br/>• Automated execution<br/>• Timing optimization<br/>• Resource management<br/>• Error handling]

            MONITOR_SYS[Monitoring System<br/>• Progress tracking<br/>• Performance metrics<br/>• Error detection<br/>• Alert generation]

            BACKUP_COORD[Backup Coordinator<br/>• Pre-migration backups<br/>• Point-in-time recovery<br/>• Data verification<br/>• Disaster recovery]

            REPORTING[Reporting Engine<br/>• Compliance reports<br/>• Storage analytics<br/>• Cost tracking<br/>• Performance metrics]
        end
    end

    HOT_DATA --> DATA_CLASSIFIER
    WARM_DATA --> MIGRATION_ENGINE
    COLD_DATA --> COMPRESSION_MGR
    FROZEN_DATA --> RETENTION_ENFORCER

    DATA_CLASSIFIER --> RETENTION_POLICIES
    MIGRATION_ENGINE --> COMPLIANCE_RULES
    COMPRESSION_MGR --> BUSINESS_RULES
    RETENTION_ENFORCER --> POLICY_AUDIT

    RETENTION_POLICIES --> SCHEDULER
    COMPLIANCE_RULES --> MONITOR_SYS
    BUSINESS_RULES --> BACKUP_COORD
    POLICY_AUDIT --> REPORTING

    classDef stages fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    classDef operations fill:#2196f3,stroke:#1976d2,stroke-width:2px,color:#fff
    classDef policies fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    classDef tools fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff

    class HOT_DATA,WARM_DATA,COLD_DATA,FROZEN_DATA stages
    class DATA_CLASSIFIER,MIGRATION_ENGINE,COMPRESSION_MGR,RETENTION_ENFORCER operations
    class RETENTION_POLICIES,COMPLIANCE_RULES,BUSINESS_RULES,POLICY_AUDIT policies
    class SCHEDULER,MONITOR_SYS,BACKUP_COORD,REPORTING tools
```

### **Data Retention Policies**
```sql
-- Data Retention Policy Implementation

-- 1. Hot Data Management (0-30 days)
CREATE OR REPLACE FUNCTION manage_hot_data() RETURNS void AS $$
BEGIN
    -- Ensure all recent data has full indexing
    PERFORM create_missing_indexes_for_recent_data();

    -- Update statistics for optimal query planning
    ANALYZE stream_health, ai_detections, performance_metrics;

    -- Log hot data management
    INSERT INTO system_logs (operation, details, timestamp)
    VALUES ('hot_data_management', 'Completed hot data optimization', NOW());
END;
$$ LANGUAGE plpgsql;

-- 2. Warm Data Transition (30-365 days)
CREATE OR REPLACE FUNCTION transition_to_warm_data() RETURNS void AS $$
DECLARE
    partition_name text;
    cutoff_date timestamp := NOW() - INTERVAL '30 days';
BEGIN
    -- Identify partitions to transition to warm storage
    FOR partition_name IN
        SELECT schemaname||'.'||tablename
        FROM pg_tables
        WHERE tablename LIKE 'stream_health_y%'
          AND tablename < 'stream_health_' || to_char(cutoff_date, 'YYYY"m"MM')
    LOOP
        -- Remove some indexes to save space
        EXECUTE format('DROP INDEX IF EXISTS %s_idx_detailed_search', partition_name);

        -- Compress the partition
        EXECUTE format('ALTER TABLE %s SET (toast_tuple_target = 128)', partition_name);

        -- Update table statistics
        EXECUTE format('ANALYZE %s', partition_name);
    END LOOP;

    -- Log warm data transition
    INSERT INTO system_logs (operation, details, timestamp)
    VALUES ('warm_data_transition', 'Transitioned eligible partitions to warm storage', NOW());
END;
$$ LANGUAGE plpgsql;

-- 3. Cold Data Archival (1-7 years)
CREATE OR REPLACE FUNCTION archive_cold_data() RETURNS void AS $$
DECLARE
    partition_name text;
    archive_date timestamp := NOW() - INTERVAL '1 year';
    backup_location text;
BEGIN
    -- Archive old partitions
    FOR partition_name IN
        SELECT schemaname||'.'||tablename
        FROM pg_tables
        WHERE tablename LIKE 'ai_detections_y%'
          AND tablename < 'ai_detections_' || to_char(archive_date, 'YYYY"m"MM"d"DD')
    LOOP
        -- Create backup before archival
        backup_location := format('/backups/cold_archive/%s_%s.sql',
                                partition_name, to_char(NOW(), 'YYYY_MM_DD'));

        EXECUTE format('COPY %s TO %L WITH (FORMAT CSV, HEADER)',
                      partition_name, backup_location);

        -- Compress the archived data
        EXECUTE format('gzip %s', backup_location);

        -- Drop the partition after successful backup
        EXECUTE format('DROP TABLE %s', partition_name);

        -- Log archival operation
        INSERT INTO system_logs (operation, details, timestamp)
        VALUES ('cold_data_archival',
                format('Archived partition %s to %s.gz', partition_name, backup_location),
                NOW());
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- 4. Automated Retention Policy Enforcement
CREATE OR REPLACE FUNCTION enforce_retention_policies() RETURNS void AS $$
BEGIN
    -- Performance metrics: Keep detailed data for 6 months
    DELETE FROM performance_metrics
    WHERE timestamp < NOW() - INTERVAL '6 months';

    -- Stream health: Keep detailed data for 12 months
    DELETE FROM stream_health
    WHERE timestamp < NOW() - INTERVAL '12 months';

    -- AI detections: Archive after 90 days, delete after 2 years
    DELETE FROM ai_detections
    WHERE detection_time < NOW() - INTERVAL '2 years';

    -- Audit logs: Keep for 7 years (compliance requirement)
    DELETE FROM audit_logs
    WHERE timestamp < NOW() - INTERVAL '7 years';

    -- User sessions: Clean up expired sessions
    DELETE FROM user_sessions
    WHERE expires_at < NOW() - INTERVAL '30 days';

    -- System cleanup
    VACUUM ANALYZE;

    -- Log retention enforcement
    INSERT INTO system_logs (operation, details, timestamp)
    VALUES ('retention_enforcement', 'Completed automated retention policy enforcement', NOW());
END;
$$ LANGUAGE plpgsql;

-- 5. Schedule automated retention jobs
SELECT cron.schedule('hot-data-management', '0 2 * * *', 'SELECT manage_hot_data()');
SELECT cron.schedule('warm-data-transition', '0 3 * * 0', 'SELECT transition_to_warm_data()');
SELECT cron.schedule('cold-data-archival', '0 1 1 * *', 'SELECT archive_cold_data()');
SELECT cron.schedule('retention-enforcement', '0 4 * * 0', 'SELECT enforce_retention_policies()');
```

---

## 💾 Backup and Recovery Framework

### **Comprehensive Backup Architecture**
```mermaid
graph TB
    subgraph "🔄 Multi-Tier Backup Strategy"
        subgraph "⚡ Real-Time Backup"
            WAL_STREAMING[WAL Streaming<br/>• Continuous archival<br/>• Real-time replication<br/>• Zero data loss<br/>• Instant recovery points]

            SYNC_REPLICA[Synchronous Replica<br/>• Real-time standby<br/>• Automatic failover<br/>• Read scaling<br/>• High availability]

            ASYNC_REPLICA[Asynchronous Replica<br/>• Geographic distribution<br/>• Disaster recovery<br/>• Load balancing<br/>• Cross-region backup]

            LOGICAL_REPLICATION[Logical Replication<br/>• Selective replication<br/>• Schema flexibility<br/>• Version compatibility<br/>• Upgrade support]
        end

        subgraph "📅 Scheduled Backups"
            FULL_BACKUP[Full Backups<br/>• Complete database<br/>• Weekly schedule<br/>• Base recovery point<br/>• Long-term retention]

            INCREMENTAL_BACKUP[Incremental Backups<br/>• Changed data only<br/>• Daily schedule<br/>• Storage efficiency<br/>• Faster recovery]

            DIFFERENTIAL_BACKUP[Differential Backups<br/>• Changes since full<br/>• Multiple daily<br/>• Recovery optimization<br/>• Point-in-time restore]

            SCHEMA_BACKUP[Schema Backups<br/>• Structure only<br/>• Version control<br/>• Migration support<br/>• Development sync]
        end

        subgraph "🏗️ Backup Infrastructure"
            BACKUP_MANAGER[Backup Manager<br/>• Job scheduling<br/>• Resource coordination<br/>• Error handling<br/>• Progress monitoring]

            STORAGE_TIER[Storage Tiering<br/>• Local SSD storage<br/>• Network attached storage<br/>• Cloud object storage<br/>• Tape archival]

            COMPRESSION_ENGINE[Compression Engine<br/>• Lossless compression<br/>• Algorithm optimization<br/>• Space efficiency<br/>• Transfer optimization]

            ENCRYPTION_SYS[Encryption System<br/>• AES-256 encryption<br/>• Key management<br/>• Secure transfer<br/>• Compliance requirements]
        end

        subgraph "🔧 Recovery Operations"
            PITR_ENGINE[Point-in-Time Recovery<br/>• Precise timestamp recovery<br/>• Transaction consistency<br/>• Minimal data loss<br/>• Automated procedures]

            PARALLEL_RESTORE[Parallel Restore<br/>• Multi-threaded recovery<br/>• Performance optimization<br/>• Resource utilization<br/>• Time minimization]

            VALIDATION_SYS[Recovery Validation<br/>• Data integrity checks<br/>• Consistency verification<br/>• Performance testing<br/>• Automated validation]

            FAILOVER_AUTOMATION[Failover Automation<br/>• Automatic detection<br/>• Service promotion<br/>• Client redirection<br/>• Minimal downtime]
        end
    end

    WAL_STREAMING --> BACKUP_MANAGER
    SYNC_REPLICA --> STORAGE_TIER
    ASYNC_REPLICA --> COMPRESSION_ENGINE
    LOGICAL_REPLICATION --> ENCRYPTION_SYS

    FULL_BACKUP --> PITR_ENGINE
    INCREMENTAL_BACKUP --> PARALLEL_RESTORE
    DIFFERENTIAL_BACKUP --> VALIDATION_SYS
    SCHEMA_BACKUP --> FAILOVER_AUTOMATION

    classDef realtime fill:#4caf50,stroke:#388e3c,stroke-width:2px,color:#fff
    classDef scheduled fill:#2196f3,stroke:#1976d2,stroke-width:2px,color:#fff
    classDef infrastructure fill:#ff9800,stroke:#f57c00,stroke-width:2px,color:#fff
    classDef recovery fill:#9c27b0,stroke:#7b1fa2,stroke-width:2px,color:#fff

    class WAL_STREAMING,SYNC_REPLICA,ASYNC_REPLICA,LOGICAL_REPLICATION realtime
    class FULL_BACKUP,INCREMENTAL_BACKUP,DIFFERENTIAL_BACKUP,SCHEMA_BACKUP scheduled
    class BACKUP_MANAGER,STORAGE_TIER,COMPRESSION_ENGINE,ENCRYPTION_SYS infrastructure
    class PITR_ENGINE,PARALLEL_RESTORE,VALIDATION_SYS,FAILOVER_AUTOMATION recovery
```

### **Backup Implementation Scripts**
```bash
#!/bin/bash
# Comprehensive Backup Management Scripts

# 1. Full Database Backup
create_full_backup() {
    local backup_date=$(date +%Y%m%d_%H%M%S)
    local backup_dir="/backups/full"
    local backup_file="video_analytics_full_${backup_date}.sql"
    local backup_path="${backup_dir}/${backup_file}"

    echo "Starting full backup at $(date)"

    # Create backup directory if it doesn't exist
    mkdir -p "$backup_dir"

    # Perform full backup with compression
    pg_dump \
        --host="$POSTGRES_HOST" \
        --port="$POSTGRES_PORT" \
        --username="$POSTGRES_USER" \
        --dbname="$POSTGRES_DB" \
        --format=custom \
        --compress=9 \
        --verbose \
        --file="$backup_path"

    local exit_code=$?

    if [ $exit_code -eq 0 ]; then
        echo "Full backup completed successfully: $backup_path"

        # Calculate backup size
        local backup_size=$(stat -f%z "$backup_path" 2>/dev/null || stat -c%s "$backup_path")

        # Record backup in database
        psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "
            INSERT INTO backup_jobs (backup_type, status, completed_at, backup_size, backup_location)
            VALUES ('full', 'completed', NOW(), $backup_size, '$backup_path');
        "

        # Encrypt backup file
        gpg --cipher-algo AES256 --compress-algo 1 --symmetric --output "${backup_path}.gpg" "$backup_path"
        rm "$backup_path"  # Remove unencrypted version

        # Upload to cloud storage (if configured)
        if [ -n "$CLOUD_BACKUP_BUCKET" ]; then
            aws s3 cp "${backup_path}.gpg" "s3://$CLOUD_BACKUP_BUCKET/full/" --storage-class GLACIER
        fi

        # Clean up old backups (keep last 7 full backups)
        ls -t "${backup_dir}"/video_analytics_full_*.sql.gpg | tail -n +8 | xargs rm -f

    else
        echo "Full backup failed with exit code: $exit_code"
        psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "
            INSERT INTO backup_jobs (backup_type, status, error_message)
            VALUES ('full', 'failed', 'Backup process failed with exit code $exit_code');
        "
    fi

    return $exit_code
}

# 2. Incremental WAL Backup
archive_wal_files() {
    local wal_file="$1"
    local wal_archive_dir="/backups/wal"
    local wal_path="${wal_archive_dir}/${wal_file}"

    # Create WAL archive directory
    mkdir -p "$wal_archive_dir"

    # Copy WAL file with verification
    cp "$PGDATA/pg_wal/$wal_file" "$wal_path"

    if [ $? -eq 0 ]; then
        # Verify file integrity
        if [ $(md5sum "$PGDATA/pg_wal/$wal_file" | cut -d' ' -f1) = $(md5sum "$wal_path" | cut -d' ' -f1) ]; then
            echo "WAL file $wal_file archived successfully"

            # Compress and encrypt WAL file
            gzip "$wal_path"
            gpg --cipher-algo AES256 --symmetric --output "${wal_path}.gz.gpg" "${wal_path}.gz"
            rm "${wal_path}.gz"

            # Upload to cloud storage
            if [ -n "$CLOUD_BACKUP_BUCKET" ]; then
                aws s3 cp "${wal_path}.gz.gpg" "s3://$CLOUD_BACKUP_BUCKET/wal/" --storage-class STANDARD_IA
            fi

            return 0
        else
            echo "WAL file $wal_file integrity check failed"
            rm -f "$wal_path"
            return 1
        fi
    else
        echo "Failed to archive WAL file: $wal_file"
        return 1
    fi
}

# 3. Point-in-Time Recovery
perform_pitr() {
    local recovery_target_time="$1"
    local recovery_dir="/recovery/pitr_$(date +%Y%m%d_%H%M%S)"
    local base_backup="$2"

    echo "Starting Point-in-Time Recovery to: $recovery_target_time"

    # Create recovery directory
    mkdir -p "$recovery_dir"

    # Restore base backup
    echo "Restoring base backup: $base_backup"
    pg_restore \
        --host="localhost" \
        --port="5433" \
        --username="postgres" \
        --dbname="template1" \
        --create \
        --verbose \
        "$base_backup"

    # Create recovery configuration
    cat > "$recovery_dir/postgresql.conf" << EOF
# Recovery Configuration
restore_command = 'gunzip -c /backups/wal/%f.gz > %p'
recovery_target_time = '$recovery_target_time'
recovery_target_action = 'promote'
EOF

    # Start PostgreSQL in recovery mode
    pg_ctl start -D "$recovery_dir" -o "-p 5433"

    # Wait for recovery to complete
    while ! pg_isready -h localhost -p 5433; do
        echo "Waiting for recovery to complete..."
        sleep 5
    done

    echo "Point-in-Time Recovery completed successfully"
    echo "Recovered database available on port 5433"
}

# 4. Backup Validation
validate_backup() {
    local backup_file="$1"
    local test_db="backup_validation_$(date +%Y%m%d_%H%M%S)"

    echo "Validating backup: $backup_file"

    # Create test database
    createdb -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" "$test_db"

    # Restore backup to test database
    pg_restore \
        --host="$POSTGRES_HOST" \
        --port="$POSTGRES_PORT" \
        --username="$POSTGRES_USER" \
        --dbname="$test_db" \
        --verbose \
        --exit-on-error \
        "$backup_file"

    local restore_result=$?

    if [ $restore_result -eq 0 ]; then
        # Run validation queries
        psql -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" -d "$test_db" -c "
            SELECT
                'users' as table_name,
                COUNT(*) as record_count
            FROM users
            UNION ALL
            SELECT
                'streams' as table_name,
                COUNT(*) as record_count
            FROM streams
            UNION ALL
            SELECT
                'ai_detections' as table_name,
                COUNT(*) as record_count
            FROM ai_detections;
        "

        echo "Backup validation successful"
        validation_result=0
    else
        echo "Backup validation failed during restore"
        validation_result=1
    fi

    # Clean up test database
    dropdb -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" "$test_db"

    return $validation_result
}

# 5. Automated Backup Scheduling
setup_backup_schedule() {
    # Add cron jobs for automated backups
    (crontab -l 2>/dev/null; echo "0 2 * * 0 /scripts/backup.sh create_full_backup") | crontab -
    (crontab -l 2>/dev/null; echo "0 3 * * 1-6 /scripts/backup.sh create_incremental_backup") | crontab -
    (crontab -l 2>/dev/null; echo "0 4 * * * /scripts/backup.sh validate_latest_backup") | crontab -
    (crontab -l 2>/dev/null; echo "0 5 * * * /scripts/backup.sh cleanup_old_backups") | crontab -

    echo "Backup schedule configured:"
    echo "- Full backup: Weekly on Sunday at 2 AM"
    echo "- Incremental backup: Daily (Monday-Saturday) at 3 AM"
    echo "- Backup validation: Daily at 4 AM"
    echo "- Cleanup: Daily at 5 AM"
}

# Main backup script execution
case "$1" in
    "full")
        create_full_backup
        ;;
    "wal")
        archive_wal_files "$2"
        ;;
    "pitr")
        perform_pitr "$2" "$3"
        ;;
    "validate")
        validate_backup "$2"
        ;;
    "schedule")
        setup_backup_schedule
        ;;
    *)
        echo "Usage: $0 {full|wal|pitr|validate|schedule} [parameters]"
        exit 1
        ;;
esac
```

---

## 🔗 Connection Management and Pooling

### **Advanced Connection Architecture**
```yaml
CONNECTION_MANAGEMENT:
  pgBouncer_Configuration:
    Pool_Mode: "transaction"  # Optimal for web applications
    Max_Client_Connections: "1000"
    Default_Pool_Size: "50"
    Reserve_Pool_Size: "10"
    Max_DB_Connections: "100"
    Pool_Mode_Per_Database:
      video_analytics: "transaction"
      video_analytics_readonly: "session"

  Connection_Pools:
    API_Gateway_Pool:
      Pool_Size: "20"
      Max_Connections: "50"
      Idle_Timeout: "300s"
      Connection_Lifetime: "3600s"
      Health_Check_Interval: "30s"

    Stream_Manager_Pool:
      Pool_Size: "15"
      Max_Connections: "30"
      Idle_Timeout: "600s"
      Connection_Lifetime: "7200s"
      Health_Check_Interval: "60s"

    AI_Engine_Pool:
      Pool_Size: "25"
      Max_Connections: "40"
      Idle_Timeout: "180s"
      Connection_Lifetime: "1800s"
      Health_Check_Interval: "30s"

    Video_Processor_Pool:
      Pool_Size: "10"
      Max_Connections: "20"
      Idle_Timeout: "300s"
      Connection_Lifetime: "3600s"
      Health_Check_Interval: "45s"

  Performance_Optimization:
    Prepared_Statements: "enabled"
    Statement_Cache_Size: "1000"
    Connection_Validation: "isValid(5)"
    Leak_Detection: "enabled"
    Metrics_Collection: "enabled"

  Load_Balancing:
    Read_Write_Splitting: "enabled"
    Read_Replica_Weight: "0.7"  # 70% read traffic to replicas
    Failover_Threshold: "3 consecutive failures"
    Health_Check_Query: "SELECT 1"
    Circuit_Breaker: "enabled"

  Security_Configuration:
    SSL_Mode: "require"
    SSL_Cert_Verification: "full"
    Connection_Encryption: "AES256"
    Authentication_Method: "SCRAM-SHA-256"
    Password_Encryption: "enabled"
```

### **Connection Pool Implementation**
```go
// Database Connection Pool Implementation in Go

package database

import (
    "context"
    "database/sql"
    "fmt"
    "time"

    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
    "github.com/prometheus/client_golang/prometheus"
    "github.com/prometheus/client_golang/prometheus/promauto"
)

// Connection pool metrics
var (
    dbConnectionsActive = promauto.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "db_connections_active",
            Help: "Number of active database connections",
        },
        []string{"pool_name"},
    )

    dbConnectionsIdle = promauto.NewGaugeVec(
        prometheus.GaugeOpts{
            Name: "db_connections_idle",
            Help: "Number of idle database connections",
        },
        []string{"pool_name"},
    )

    dbQueryDuration = promauto.NewHistogramVec(
        prometheus.HistogramOpts{
            Name: "db_query_duration_seconds",
            Help: "Database query duration in seconds",
            Buckets: prometheus.DefBuckets,
        },
        []string{"pool_name", "query_type"},
    )
)

// DatabaseConfig holds database connection configuration
type DatabaseConfig struct {
    Host                 string        `yaml:"host"`
    Port                 int           `yaml:"port"`
    Database             string        `yaml:"database"`
    Username             string        `yaml:"username"`
    Password             string        `yaml:"password"`
    SSLMode              string        `yaml:"ssl_mode"`
    MaxOpenConnections   int           `yaml:"max_open_connections"`
    MaxIdleConnections   int           `yaml:"max_idle_connections"`
    ConnectionMaxLifetime time.Duration `yaml:"connection_max_lifetime"`
    ConnectionTimeout    time.Duration `yaml:"connection_timeout"`
    IdleTimeout          time.Duration `yaml:"idle_timeout"`
}

// ConnectionPool manages database connections with monitoring
type ConnectionPool struct {
    db       *sqlx.DB
    config   DatabaseConfig
    poolName string
    metrics  *PoolMetrics
}

type PoolMetrics struct {
    QueryCount      int64
    ErrorCount      int64
    TotalQueryTime  time.Duration
    LastError       error
    LastErrorTime   time.Time
}

// NewConnectionPool creates a new database connection pool
func NewConnectionPool(config DatabaseConfig, poolName string) (*ConnectionPool, error) {
    dsn := fmt.Sprintf(
        "host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
        config.Host, config.Port, config.Username,
        config.Password, config.Database, config.SSLMode,
    )

    db, err := sqlx.Connect("postgres", dsn)
    if err != nil {
        return nil, fmt.Errorf("failed to connect to database: %w", err)
    }

    // Configure connection pool
    db.SetMaxOpenConns(config.MaxOpenConnections)
    db.SetMaxIdleConns(config.MaxIdleConnections)
    db.SetConnMaxLifetime(config.ConnectionMaxLifetime)
    db.SetConnMaxIdleTime(config.IdleTimeout)

    pool := &ConnectionPool{
        db:       db,
        config:   config,
        poolName: poolName,
        metrics:  &PoolMetrics{},
    }

    // Start metrics collection
    go pool.collectMetrics()

    return pool, nil
}

// Query executes a query with metrics collection
func (p *ConnectionPool) Query(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error) {
    start := time.Now()
    defer func() {
        duration := time.Since(start)
        p.metrics.TotalQueryTime += duration
        p.metrics.QueryCount++

        dbQueryDuration.WithLabelValues(p.poolName, "select").Observe(duration.Seconds())
    }()

    ctx, cancel := context.WithTimeout(ctx, p.config.ConnectionTimeout)
    defer cancel()

    rows, err := p.db.QueryContext(ctx, query, args...)
    if err != nil {
        p.metrics.ErrorCount++
        p.metrics.LastError = err
        p.metrics.LastErrorTime = time.Now()
        return nil, fmt.Errorf("query failed: %w", err)
    }

    return rows, nil
}

// Exec executes a non-query statement with metrics collection
func (p *ConnectionPool) Exec(ctx context.Context, query string, args ...interface{}) (sql.Result, error) {
    start := time.Now()
    defer func() {
        duration := time.Since(start)
        p.metrics.TotalQueryTime += duration
        p.metrics.QueryCount++

        dbQueryDuration.WithLabelValues(p.poolName, "exec").Observe(duration.Seconds())
    }()

    ctx, cancel := context.WithTimeout(ctx, p.config.ConnectionTimeout)
    defer cancel()

    result, err := p.db.ExecContext(ctx, query, args...)
    if err != nil {
        p.metrics.ErrorCount++
        p.metrics.LastError = err
        p.metrics.LastErrorTime = time.Now()
        return nil, fmt.Errorf("exec failed: %w", err)
    }

    return result, nil
}

// HealthCheck performs a database health check
func (p *ConnectionPool) HealthCheck(ctx context.Context) error {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    var result int
    err := p.db.GetContext(ctx, &result, "SELECT 1")
    if err != nil {
        return fmt.Errorf("health check failed: %w", err)
    }

    return nil
}

// GetStats returns current pool statistics
func (p *ConnectionPool) GetStats() sql.DBStats {
    return p.db.Stats()
}

// collectMetrics runs in a goroutine to collect and export metrics
func (p *ConnectionPool) collectMetrics() {
    ticker := time.NewTicker(10 * time.Second)
    defer ticker.Stop()

    for range ticker.C {
        stats := p.db.Stats()

        dbConnectionsActive.WithLabelValues(p.poolName).Set(float64(stats.OpenConnections))
        dbConnectionsIdle.WithLabelValues(p.poolName).Set(float64(stats.Idle))
    }
}

// Close closes the database connection pool
func (p *ConnectionPool) Close() error {
    return p.db.Close()
}

// ConnectionManager manages multiple connection pools
type ConnectionManager struct {
    pools map[string]*ConnectionPool
}

// NewConnectionManager creates a new connection manager
func NewConnectionManager() *ConnectionManager {
    return &ConnectionManager{
        pools: make(map[string]*ConnectionPool),
    }
}

// AddPool adds a new connection pool
func (cm *ConnectionManager) AddPool(name string, config DatabaseConfig) error {
    pool, err := NewConnectionPool(config, name)
    if err != nil {
        return fmt.Errorf("failed to create pool %s: %w", name, err)
    }

    cm.pools[name] = pool
    return nil
}

// GetPool returns a connection pool by name
func (cm *ConnectionManager) GetPool(name string) (*ConnectionPool, error) {
    pool, exists := cm.pools[name]
    if !exists {
        return nil, fmt.Errorf("pool %s not found", name)
    }
    return pool, nil
}

// HealthCheck checks all pools
func (cm *ConnectionManager) HealthCheck(ctx context.Context) map[string]error {
    results := make(map[string]error)

    for name, pool := range cm.pools {
        results[name] = pool.HealthCheck(ctx)
    }

    return results
}

// Close closes all connection pools
func (cm *ConnectionManager) Close() error {
    var lastErr error

    for name, pool := range cm.pools {
        if err := pool.Close(); err != nil {
            lastErr = fmt.Errorf("failed to close pool %s: %w", name, err)
        }
    }

    return lastErr
}
```

---

## 🔐 Security Implementation

### **Database Security Architecture**
```yaml
DATABASE_SECURITY:
  Authentication:
    Method: "SCRAM-SHA-256"
    Password_Policy:
      Min_Length: "12 characters"
      Complexity: "Upper, lower, numbers, special characters"
      Expiration: "90 days"
      History: "Last 12 passwords remembered"
      Lockout: "5 failed attempts, 30-minute lockout"

    Multi_Factor: "Optional for admin users"
    Certificate_Auth: "Enabled for service accounts"

  Authorization:
    Role_Based_Access:
      Database_Roles:
        - "db_admin: Full database administration"
        - "db_developer: Schema changes, no user management"
        - "db_application: Read/write application data"
        - "db_readonly: Read-only access to application data"
        - "db_backup: Backup and recovery operations"
        - "db_monitor: Performance monitoring access"

    Row_Level_Security:
      Users_Table: "Users can only see their own data"
      Streams_Table: "Access based on user permissions"
      Audit_Logs: "Admins see all, users see their actions"

    Column_Level_Security:
      Sensitive_Data: "Password hashes, tokens, PII"
      Financial_Data: "Cost and billing information"
      System_Config: "Internal configuration parameters"

  Encryption:
    Data_at_Rest:
      Method: "Transparent Data Encryption (TDE)"
      Algorithm: "AES-256"
      Key_Management: "External key management system"
      Tablespace_Encryption: "Enabled for sensitive data"

    Data_in_Transit:
      SSL_TLS: "TLS 1.3 minimum"
      Certificate_Validation: "Full certificate chain validation"
      Cipher_Suites: "Strong ciphers only"
      Perfect_Forward_Secrecy: "Enabled"

    Key_Management:
      Rotation_Policy: "Automatic 90-day rotation"
      Key_Escrow: "Secure key backup and recovery"
      Hardware_Security: "HSM for key storage"
      Access_Control: "Multi-person authorization"

  Audit_and_Monitoring:
    Audit_Logging:
      Events_Logged: "All DDL, DML, and security events"
      Log_Retention: "7 years for compliance"
      Log_Encryption: "Encrypted audit logs"
      Tamper_Protection: "Immutable audit trail"

    Security_Monitoring:
      Failed_Logins: "Real-time alerting"
      Privilege_Escalation: "Immediate notification"
      Unusual_Access: "Anomaly detection"
      Data_Exfiltration: "Large query monitoring"

    Compliance:
      Frameworks: "SOC 2, GDPR, HIPAA-ready"
      Regular_Audits: "Quarterly security assessments"
      Penetration_Testing: "Annual third-party testing"
      Vulnerability_Scanning: "Weekly automated scans"
```

### **Row-Level Security Implementation**
```sql
-- Row-Level Security Implementation

-- 1. Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- 2. Create security context function
CREATE OR REPLACE FUNCTION get_current_user_id() RETURNS UUID AS $$
BEGIN
    -- Get user ID from application context
    RETURN current_setting('app.current_user_id', true)::UUID;
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. User access policies
CREATE POLICY user_self_access ON users
    FOR ALL
    TO application_role
    USING (user_id = get_current_user_id())
    WITH CHECK (user_id = get_current_user_id());

CREATE POLICY user_admin_access ON users
    FOR ALL
    TO admin_role
    USING (true)
    WITH CHECK (true);

-- 4. Stream access policies based on user permissions
CREATE OR REPLACE FUNCTION user_can_access_stream(stream_id UUID) RETURNS BOOLEAN AS $$
DECLARE
    user_role VARCHAR(20);
    stream_owner UUID;
BEGIN
    -- Get current user's role
    SELECT role INTO user_role
    FROM users
    WHERE user_id = get_current_user_id();

    -- Admins can access all streams
    IF user_role IN ('super_admin', 'admin') THEN
        RETURN TRUE;
    END IF;

    -- Get stream owner
    SELECT created_by INTO stream_owner
    FROM streams
    WHERE streams.stream_id = user_can_access_stream.stream_id;

    -- Users can access streams they created
    IF stream_owner = get_current_user_id() THEN
        RETURN TRUE;
    END IF;

    -- Check if user has been granted access to this stream
    -- (This would require a separate permissions table)
    RETURN EXISTS (
        SELECT 1 FROM stream_permissions sp
        WHERE sp.stream_id = user_can_access_stream.stream_id
          AND sp.user_id = get_current_user_id()
          AND sp.granted = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY stream_user_access ON streams
    FOR ALL
    TO application_role
    USING (user_can_access_stream(stream_id))
    WITH CHECK (user_can_access_stream(stream_id));

CREATE POLICY stream_admin_access ON streams
    FOR ALL
    TO admin_role
    USING (true)
    WITH CHECK (true);

-- 5. Audit log access policies
CREATE POLICY audit_self_access ON audit_logs
    FOR SELECT
    TO application_role
    USING (user_id = get_current_user_id());

CREATE POLICY audit_admin_access ON audit_logs
    FOR ALL
    TO admin_role
    USING (true)
    WITH CHECK (true);

-- 6. Alert access based on assignment and stream access
CREATE POLICY alert_assigned_access ON alerts
    FOR ALL
    TO application_role
    USING (
        assigned_to = get_current_user_id()
        OR user_can_access_stream(stream_id)
    )
    WITH CHECK (
        assigned_to = get_current_user_id()
        OR user_can_access_stream(stream_id)
    );

-- 7. Security definer functions for privileged operations
CREATE OR REPLACE FUNCTION secure_user_create(
    p_username VARCHAR(50),
    p_email VARCHAR(255),
    p_password_hash VARCHAR(255),
    p_first_name VARCHAR(100),
    p_last_name VARCHAR(100),
    p_role VARCHAR(20)
) RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
    current_user_role VARCHAR(20);
BEGIN
    -- Check if current user can create users
    SELECT role INTO current_user_role
    FROM users
    WHERE user_id = get_current_user_id();

    IF current_user_role NOT IN ('super_admin', 'admin') THEN
        RAISE EXCEPTION 'Insufficient privileges to create users';
    END IF;

    -- Validate password hash (should be bcrypt)
    IF NOT p_password_hash ~ '^\$2[ayb]\$.{56}$' THEN
        RAISE EXCEPTION 'Invalid password hash format';
    END IF;

    -- Insert new user
    INSERT INTO users (username, email, password_hash, first_name, last_name, role)
    VALUES (p_username, p_email, p_password_hash, p_first_name, p_last_name, p_role)
    RETURNING user_id INTO new_user_id;

    -- Log the action
    INSERT INTO audit_logs (user_id, action_type, resource_type, resource_id, new_values)
    VALUES (
        get_current_user_id(),
        'CREATE',
        'user',
        new_user_id,
        json_build_object(
            'username', p_username,
            'email', p_email,
            'role', p_role
        )
    );

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Secure password update function
CREATE OR REPLACE FUNCTION secure_password_update(
    p_user_id UUID,
    p_old_password_hash VARCHAR(255),
    p_new_password_hash VARCHAR(255)
) RETURNS BOOLEAN AS $$
DECLARE
    stored_hash VARCHAR(255);
    current_user_role VARCHAR(20);
BEGIN
    -- Get current user role
    SELECT role INTO current_user_role
    FROM users
    WHERE user_id = get_current_user_id();

    -- Users can only update their own password, admins can update any
    IF get_current_user_id() != p_user_id AND current_user_role NOT IN ('super_admin', 'admin') THEN
        RAISE EXCEPTION 'Insufficient privileges to update password';
    END IF;

    -- Verify old password for non-admin users
    IF current_user_role NOT IN ('super_admin', 'admin') THEN
        SELECT password_hash INTO stored_hash
        FROM users
        WHERE user_id = p_user_id;

        IF stored_hash != p_old_password_hash THEN
            RAISE EXCEPTION 'Current password verification failed';
        END IF;
    END IF;

    -- Validate new password hash
    IF NOT p_new_password_hash ~ '^\$2[ayb]\$.{56}$' THEN
        RAISE EXCEPTION 'Invalid password hash format';
    END IF;

    -- Update password
    UPDATE users
    SET password_hash = p_new_password_hash,
        updated_at = NOW()
    WHERE user_id = p_user_id;

    -- Log the action
    INSERT INTO audit_logs (user_id, action_type, resource_type, resource_id)
    VALUES (get_current_user_id(), 'UPDATE_PASSWORD', 'user', p_user_id);

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 📊 Monitoring and Health Checks

### **Database Health Monitoring**
```yaml
DATABASE_MONITORING:
  Health_Check_Endpoints:
    Basic_Health: "SELECT 1"
    Connection_Test: "SELECT pg_is_in_recovery()"
    Performance_Check: "SELECT COUNT(*) FROM pg_stat_activity"
    Replication_Status: "SELECT * FROM pg_stat_replication"

  Performance_Metrics:
    Query_Performance:
      - "Average query execution time"
      - "Slowest queries (top 10)"
      - "Query frequency and patterns"
      - "Index usage statistics"

    Connection_Metrics:
      - "Active connections by database"
      - "Idle connections duration"
      - "Connection pool utilization"
      - "Failed connection attempts"

    Resource_Utilization:
      - "CPU usage by PostgreSQL"
      - "Memory usage (shared_buffers, work_mem)"
      - "Disk I/O statistics"
      - "WAL generation rate"

    Database_Statistics:
      - "Table and index sizes"
      - "Row counts and growth rates"
      - "Vacuum and analyze statistics"
      - "Bloat estimation"

  Alert_Thresholds:
    Critical_Alerts:
      - "Database connectivity failure"
      - "Replication lag > 1 minute"
      - "Disk space < 10% free"
      - "Connection pool exhaustion"

    Warning_Alerts:
      - "Query execution time > 5 seconds"
      - "Connection count > 80% of max"
      - "Replication lag > 30 seconds"
      - "Index usage < 50%"

    Information_Alerts:
      - "Long-running transactions > 1 hour"
      - "Table bloat > 30%"
      - "Backup completion status"
      - "Schema changes detected"

  Monitoring_Tools:
    Prometheus_Exporters:
      - "postgres_exporter for metrics collection"
      - "Custom exporters for business metrics"
      - "pgBouncer metrics"
      - "Backup job metrics"

    Log_Analysis:
      - "PostgreSQL log parsing"
      - "Slow query log analysis"
      - "Error pattern detection"
      - "Security event monitoring"

    Performance_Analysis:
      - "pg_stat_statements analysis"
      - "Query plan analysis"
      - "Lock contention monitoring"
      - "Wait event analysis"
```

### **Monitoring Implementation**
```sql
-- Database Monitoring Queries and Functions

-- 1. Current Database Health Status
CREATE OR REPLACE VIEW database_health_summary AS
SELECT
    'Database Status' as category,
    CASE
        WHEN pg_is_in_recovery() THEN 'Standby'
        ELSE 'Primary'
    END as status,
    pg_database_size(current_database()) as database_size,
    (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active') as active_connections,
    (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'idle') as idle_connections,
    pg_postmaster_start_time() as server_start_time,
    NOW() - pg_postmaster_start_time() as uptime;

-- 2. Query Performance Summary
CREATE OR REPLACE VIEW query_performance_summary AS
SELECT
    query,
    calls,
    total_time,
    mean_time,
    stddev_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 20;

-- 3. Connection Statistics
CREATE OR REPLACE VIEW connection_statistics AS
SELECT
    datname as database,
    state,
    COUNT(*) as connection_count,
    MAX(NOW() - state_change) as max_duration
FROM pg_stat_activity
WHERE datname IS NOT NULL
GROUP BY datname, state
ORDER BY datname, state;

-- 4. Table and Index Size Analysis
CREATE OR REPLACE VIEW table_size_analysis AS
SELECT
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename) - pg_relation_size(schemaname||'.'||tablename)) as index_size,
    pg_stat_get_live_tuples(c.oid) as live_tuples,
    pg_stat_get_dead_tuples(c.oid) as dead_tuples
FROM pg_tables pt
JOIN pg_class c ON c.relname = pt.tablename
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- 5. Index Usage Statistics
CREATE OR REPLACE VIEW index_usage_stats AS
SELECT
    schemaname,
    tablename,
    indexname,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan,
    CASE
        WHEN idx_scan = 0 THEN 'Never Used'
        WHEN idx_scan < 10 THEN 'Rarely Used'
        WHEN idx_scan < 100 THEN 'Moderately Used'
        ELSE 'Frequently Used'
    END as usage_category
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;

-- 6. Database Bloat Estimation
CREATE OR REPLACE FUNCTION estimate_table_bloat(table_name TEXT)
RETURNS TABLE(
    table_name TEXT,
    bloat_pct NUMERIC,
    bloat_size TEXT,
    recommendation TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH constants AS (
        SELECT current_setting('block_size')::numeric AS bs,
               23 AS hdr,
               4 AS ma
    ),
    bloat_info AS (
        SELECT
            schemaname,
            tablename,
            (datawidth+(hdr+ma-(case when hdr%ma=0 THEN ma ELSE hdr%ma END)))::numeric AS datahdr,
            (maxfracsum*(nullhdr+ma-(case when nullhdr%ma=0 THEN ma ELSE nullhdr%ma END))) AS nullhdr2
        FROM (
            SELECT
                schemaname,
                tablename,
                hdr,
                ma,
                bs,
                SUM((1-null_frac)*avg_width) AS datawidth,
                MAX(null_frac) AS maxfracsum,
                hdr+(
                    SELECT 1+COUNT(*)/8
                    FROM pg_stats s2
                    WHERE null_frac<>0 AND s2.schemaname = s.schemaname AND s2.tablename = s.tablename
                ) AS nullhdr
            FROM pg_stats s, constants
            WHERE s.schemaname='public' AND s.tablename = estimate_table_bloat.table_name
            GROUP BY 1,2,3,4,5
        ) AS foo
    )
    SELECT
        estimate_table_bloat.table_name,
        CASE WHEN relpages < otta THEN 0
             ELSE ROUND((1.0 * relpages / otta - 1.0) * 100.0, 1)
        END AS bloat_pct,
        CASE WHEN relpages < otta THEN '0 MB'
             ELSE pg_size_pretty((bs*(relpages-otta))::bigint)
        END AS bloat_size,
        CASE
            WHEN relpages < otta THEN 'No bloat detected'
            WHEN (1.0 * relpages / otta - 1.0) * 100.0 < 20 THEN 'Low bloat, monitor'
            WHEN (1.0 * relpages / otta - 1.0) * 100.0 < 40 THEN 'Moderate bloat, consider VACUUM'
            ELSE 'High bloat, VACUUM FULL recommended'
        END AS recommendation
    FROM (
        SELECT
            bs,
            otta,
            relpages,
            CASE WHEN relpages < otta THEN 0
                 ELSE relpages::bigint - otta
            END AS wastedbytes
        FROM (
            SELECT
                schemaname,
                tablename,
                cc.relpages,
                bs,
                CEIL((cc.reltuples*((datahdr+ma-
                    (CASE WHEN datahdr%ma=0 THEN ma ELSE datahdr%ma END))+nullhdr2+4))/(bs-20::float)) AS otta
            FROM bloat_info
            JOIN pg_class cc ON cc.relname = bloat_info.tablename
            JOIN pg_namespace nn ON cc.relnamespace = nn.oid AND nn.nspname = bloat_info.schemaname AND nn.nspname='public'
        ) AS rs
    ) AS rs2;
END;
$$ LANGUAGE plpgsql;

-- 7. Real-time Performance Monitoring Function
CREATE OR REPLACE FUNCTION get_performance_snapshot()
RETURNS TABLE(
    metric_name TEXT,
    metric_value NUMERIC,
    metric_unit TEXT,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    -- Active connections
    SELECT
        'active_connections'::TEXT,
        (SELECT COUNT(*)::NUMERIC FROM pg_stat_activity WHERE state = 'active'),
        'connections'::TEXT,
        CASE
            WHEN (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active') > 50 THEN 'warning'
            WHEN (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active') > 80 THEN 'critical'
            ELSE 'ok'
        END::TEXT

    UNION ALL

    -- Database size
    SELECT
        'database_size'::TEXT,
        pg_database_size(current_database())::NUMERIC,
        'bytes'::TEXT,
        'ok'::TEXT

    UNION ALL

    -- Cache hit ratio
    SELECT
        'cache_hit_ratio'::TEXT,
        ROUND(
            100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read) + 1),
            2
        ),
        'percent'::TEXT,
        CASE
            WHEN ROUND(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read) + 1), 2) < 90 THEN 'warning'
            WHEN ROUND(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read) + 1), 2) < 80 THEN 'critical'
            ELSE 'ok'
        END::TEXT
    FROM pg_stat_database

    UNION ALL

    -- Long running queries
    SELECT
        'long_running_queries'::TEXT,
        (SELECT COUNT(*)::NUMERIC
         FROM pg_stat_activity
         WHERE state = 'active'
           AND NOW() - query_start > INTERVAL '5 minutes'),
        'queries'::TEXT,
        CASE
            WHEN (SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active' AND NOW() - query_start > INTERVAL '5 minutes') > 0 THEN 'warning'
            ELSE 'ok'
        END::TEXT;
END;
$$ LANGUAGE plpgsql;

-- 8. Automated Health Check Function
CREATE OR REPLACE FUNCTION database_health_check()
RETURNS TABLE(
    check_name TEXT,
    status TEXT,
    details TEXT,
    recommendation TEXT
) AS $$
BEGIN
    RETURN QUERY
    -- Check database connectivity
    SELECT
        'connectivity'::TEXT,
        'ok'::TEXT,
        'Database is accessible'::TEXT,
        'No action required'::TEXT

    UNION ALL

    -- Check replication status (if applicable)
    SELECT
        'replication'::TEXT,
        CASE
            WHEN pg_is_in_recovery() THEN 'standby'
            WHEN EXISTS(SELECT 1 FROM pg_stat_replication) THEN 'primary_with_standby'
            ELSE 'primary_standalone'
        END::TEXT,
        CASE
            WHEN pg_is_in_recovery() THEN 'This is a standby server'
            WHEN EXISTS(SELECT 1 FROM pg_stat_replication) THEN 'Primary with ' || (SELECT COUNT(*)::TEXT FROM pg_stat_replication) || ' standby(s)'
            ELSE 'Primary server without standby'
        END::TEXT,
        CASE
            WHEN NOT pg_is_in_recovery() AND NOT EXISTS(SELECT 1 FROM pg_stat_replication) THEN 'Consider setting up replication for high availability'
            ELSE 'No action required'
        END::TEXT

    UNION ALL

    -- Check for bloated tables
    SELECT
        'table_bloat'::TEXT,
        CASE
            WHEN EXISTS(
                SELECT 1 FROM pg_stat_user_tables
                WHERE n_dead_tup > n_live_tup * 0.2
            ) THEN 'warning'
            ELSE 'ok'
        END::TEXT,
        'Checked for table bloat in user tables'::TEXT,
        CASE
            WHEN EXISTS(
                SELECT 1 FROM pg_stat_user_tables
                WHERE n_dead_tup > n_live_tup * 0.2
            ) THEN 'Run VACUUM on bloated tables'
            ELSE 'No action required'
        END::TEXT;
END;
$$ LANGUAGE plpgsql;
```

---

## 🛠️ Development and Deployment

### **Database Deployment Configuration**
```yaml
# docker-compose.yml Database Service Configuration
DATABASE_DOCKER_CONFIG:
  postgresql:
    image: "postgres:15-alpine"
    container_name: "video_analytics_postgresql"
    restart: "unless-stopped"
    ports:
      - "5432:5432"
    environment:
      - "POSTGRES_DB=video_analytics"
      - "POSTGRES_USER=postgres"
      - "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}"
      - "POSTGRES_INITDB_ARGS=--auth-host=scram-sha-256"
      - "PGDATA=/var/lib/postgresql/data/pgdata"
    volumes:
      - "postgresql_data:/var/lib/postgresql/data"
      - "./database/init:/docker-entrypoint-initdb.d"
      - "./database/config/postgresql.conf:/etc/postgresql/postgresql.conf"
      - "./database/config/pg_hba.conf:/etc/postgresql/pg_hba.conf"
      - "./backups:/backups"
    command: >
      postgres
      -c config_file=/etc/postgresql/postgresql.conf
      -c hba_file=/etc/postgresql/pg_hba.conf
    networks:
      - backend
      - monitoring
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d video_analytics"]
      interval: "30s"
      timeout: "10s"
      retries: 3
      start_period: "60s"
    deploy:
      resources:
        limits:
          memory: "4G"
          cpus: "2.0"
        reservations:
          memory: "2G"
          cpus: "1.0"
    labels:
      - "prometheus.io/scrape=true"
      - "prometheus.io/port=9187"

  pgbouncer:
    image: "pgbouncer/pgbouncer:latest"
    container_name: "video_analytics_pgbouncer"
    restart: "unless-stopped"
    ports:
      - "6432:6432"
    environment:
      - "DATABASES_HOST=postgresql"
      - "DATABASES_PORT=5432"
      - "DATABASES_USER=postgres"
      - "DATABASES_PASSWORD=${POSTGRES_PASSWORD}"
      - "DATABASES_DBNAME=video_analytics"
      - "POOL_MODE=transaction"
      - "MAX_CLIENT_CONN=1000"
      - "DEFAULT_POOL_SIZE=50"
      - "RESERVE_POOL_SIZE=10"
    volumes:
      - "./database/pgbouncer/pgbouncer.ini:/etc/pgbouncer/pgbouncer.ini"
      - "./database/pgbouncer/userlist.txt:/etc/pgbouncer/userlist.txt"
    depends_on:
      - postgresql
    networks:
      - backend
    healthcheck:
      test: ["CMD-SHELL", "psql -h localhost -p 6432 -U postgres -d pgbouncer -c 'SHOW VERSION;'"]
      interval: "30s"
      timeout: "10s"
      retries: 3

  postgres_exporter:
    image: "prometheuscommunity/postgres-exporter:latest"
    container_name: "video_analytics_postgres_exporter"
    restart: "unless-stopped"
    ports:
      - "9187:9187"
    environment:
      - "DATA_SOURCE_NAME=postgresql://postgres:${POSTGRES_PASSWORD}@postgresql:5432/video_analytics?sslmode=disable"
    depends_on:
      - postgresql
    networks:
      - monitoring
    command:
      - '--extend.query-path=/etc/postgres_exporter/queries.yaml'
    volumes:
      - "./monitoring/postgres_exporter/queries.yaml:/etc/postgres_exporter/queries.yaml"

volumes:
  postgresql_data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: ./data/postgresql
```

### **PostgreSQL Configuration**
```conf
# postgresql.conf - Optimized for Video Analytics Platform

# Connection Settings
listen_addresses = '*'
port = 5432
max_connections = 200
superuser_reserved_connections = 3

# Memory Configuration
shared_buffers = 1GB                    # 25% of system RAM
effective_cache_size = 3GB               # 75% of system RAM
work_mem = 16MB                          # For complex queries
maintenance_work_mem = 256MB             # For maintenance operations
huge_pages = try
temp_buffers = 32MB

# WAL Configuration
wal_level = replica
wal_buffers = 16MB
max_wal_size = 4GB
min_wal_size = 1GB
checkpoint_completion_target = 0.9
checkpoint_timeout = 15min
archive_mode = on
archive_command = '/scripts/archive_wal.sh %f %p'

# Replication Configuration
max_replication_slots = 10
max_wal_senders = 10
hot_standby = on
hot_standby_feedback = on

# Query Planner Configuration
random_page_cost = 1.1                  # For SSD storage
effective_io_concurrency = 200          # For SSD storage
seq_page_cost = 1.0
cpu_tuple_cost = 0.01
cpu_index_tuple_cost = 0.005
cpu_operator_cost = 0.0025

# Performance Monitoring
shared_preload_libraries = 'pg_stat_statements,auto_explain'
pg_stat_statements.max = 10000
pg_stat_statements.track = all
track_activity_query_size = 2048
track_functions = all
track_io_timing = on

# Auto VACUUM Configuration
autovacuum = on
autovacuum_max_workers = 6
autovacuum_naptime = 15s
autovacuum_vacuum_threshold = 25
autovacuum_vacuum_scale_factor = 0.1
autovacuum_analyze_threshold = 10
autovacuum_analyze_scale_factor = 0.05
autovacuum_vacuum_cost_delay = 10ms
autovacuum_vacuum_cost_limit = 1000

# Logging Configuration
logging_collector = on
log_directory = '/var/log/postgresql'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_rotation_age = 1d
log_rotation_size = 100MB
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_min_duration_statement = 1000       # Log queries > 1 second
log_checkpoints = on
log_connections = on
log_disconnections = on
log_lock_waits = on
log_temp_files = 0
log_autovacuum_min_duration = 0

# Security Configuration
ssl = on
ssl_cert_file = '/etc/ssl/certs/server.crt'
ssl_key_file = '/etc/ssl/private/server.key'
ssl_ciphers = 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384'
ssl_prefer_server_ciphers = on
password_encryption = scram-sha-256

# Lock Configuration
deadlock_timeout = 1s
lock_timeout = 30s
statement_timeout = 300s
idle_in_transaction_session_timeout = 600s

# Parallel Query Configuration
max_parallel_workers_per_gather = 4
max_parallel_workers = 8
max_parallel_maintenance_workers = 4
```

---

## 🔧 Troubleshooting Guide

### **Common Database Issues and Solutions**
```yaml
DATABASE_TROUBLESHOOTING:
  Connection_Issues:
    Connection_Refused:
      Symptoms: "psql: could not connect to server: Connection refused"
      Common_Causes:
        - "PostgreSQL service not running"
        - "Firewall blocking port 5432"
        - "Incorrect host/port configuration"
        - "Authentication failure"
      Solutions:
        - "Check PostgreSQL service status"
        - "Verify firewall rules and port availability"
        - "Validate connection parameters"
        - "Check pg_hba.conf authentication rules"
      Debug_Commands:
        - "systemctl status postgresql"
        - "netstat -tlnp | grep 5432"
        - "psql -h localhost -p 5432 -U postgres -d video_analytics"

    Pool_Exhaustion:
      Symptoms: "Too many connections for database"
      Common_Causes:
        - "Connection leaks in application code"
        - "Insufficient pool size configuration"
        - "Long-running transactions"
        - "Deadlocks preventing connection release"
      Solutions:
        - "Review application connection handling"
        - "Increase pgBouncer pool size"
        - "Identify and terminate long-running queries"
        - "Implement connection timeout policies"
      Debug_Commands:
        - "SELECT * FROM pg_stat_activity WHERE state = 'active';"
        - "SELECT * FROM pg_locks WHERE NOT granted;"
        - "SHOW pool_lists; -- in pgBouncer"

  Performance_Issues:
    Slow_Queries:
      Symptoms: "Queries taking longer than expected"
      Common_Causes:
        - "Missing or inefficient indexes"
        - "Table bloat and fragmentation"
        - "Outdated table statistics"
        - "Poor query design"
      Solutions:
        - "Add appropriate indexes"
        - "Run VACUUM and ANALYZE"
        - "Rewrite inefficient queries"
        - "Update table statistics"
      Debug_Commands:
        - "EXPLAIN (ANALYZE, BUFFERS) <query>;"
        - "SELECT * FROM pg_stat_statements ORDER BY total_time DESC;"
        - "SELECT * FROM pg_stat_user_indexes WHERE idx_scan = 0;"

    High_CPU_Usage:
      Symptoms: "PostgreSQL consuming high CPU"
      Common_Causes:
        - "Inefficient queries or missing indexes"
        - "Excessive concurrent connections"
        - "Aggressive autovacuum settings"
        - "Poor configuration parameters"
      Solutions:
        - "Optimize expensive queries"
        - "Implement connection pooling"
        - "Tune autovacuum parameters"
        - "Adjust PostgreSQL configuration"
      Debug_Commands:
        - "SELECT query, calls, total_time FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;"
        - "SELECT * FROM pg_stat_activity WHERE state = 'active';"

  Data_Issues:
    Corruption_Detection:
      Symptoms: "Data inconsistency or corruption errors"
      Common_Causes:
        - "Hardware failures"
        - "Unclean shutdowns"
        - "Storage system issues"
        - "Memory problems"
      Solutions:
        - "Run integrity checks"
        - "Restore from backup if necessary"
        - "Check hardware and storage"
        - "Review system logs"
      Debug_Commands:
        - "SELECT * FROM pg_stat_database WHERE datname = 'video_analytics';"
        - "VACUUM (VERBOSE, ANALYZE) table_name;"
        - "pg_checksums --check /var/lib/postgresql/data"

    Lock_Contention:
      Symptoms: "Queries hanging or timing out"
      Common_Causes:
        - "Long-running transactions"
        - "Deadlocks between transactions"
        - "Exclusive locks on frequently accessed tables"
        - "Concurrent DDL operations"
      Solutions:
        - "Identify and terminate blocking queries"
        - "Implement better transaction management"
        - "Schedule DDL during maintenance windows"
        - "Use advisory locks for coordination"
      Debug_Commands:
        - "SELECT * FROM pg_locks WHERE NOT granted;"
        - "SELECT * FROM pg_stat_activity WHERE state = 'active' ORDER BY query_start;"
        - "SELECT pg_cancel_backend(pid) FROM pg_stat_activity WHERE <condition>;"

  Backup_and_Recovery_Issues:
    Backup_Failures:
      Symptoms: "Backup jobs failing or incomplete"
      Common_Causes:
        - "Insufficient disk space"
        - "Permission issues"
        - "Long-running transactions preventing backup"
        - "Network connectivity issues"
      Solutions:
        - "Ensure adequate storage space"
        - "Check file permissions"
        - "Monitor and manage long transactions"
        - "Verify network connectivity"
      Debug_Commands:
        - "df -h /backups"
        - "ls -la /backups"
        - "SELECT * FROM backup_jobs WHERE status = 'failed';"

    Recovery_Issues:
      Symptoms: "Recovery process failing or incomplete"
      Common_Causes:
        - "Corrupted backup files"
        - "Missing WAL files"
        - "Incorrect recovery parameters"
        - "Insufficient resources during recovery"
      Solutions:
        - "Validate backup integrity"
        - "Ensure WAL file availability"
        - "Review recovery configuration"
        - "Allocate sufficient resources"
      Debug_Commands:
        - "pg_restore --list backup_file"
        - "ls -la /backups/wal/"
        - "tail -f /var/log/postgresql/postgresql.log"
```

### **Database Diagnostic Commands**
```bash
#!/bin/bash
# Database Diagnostic and Maintenance Scripts

# 1. Database Health Check
database_health_check() {
    echo "=== Database Health Check ==="

    # Check PostgreSQL service status
    systemctl status postgresql

    # Check database connectivity
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "SELECT NOW() as current_time, version();"

    # Check active connections
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            datname,
            state,
            COUNT(*) as connection_count
        FROM pg_stat_activity
        WHERE datname IS NOT NULL
        GROUP BY datname, state;"

    # Check database size
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            pg_database.datname,
            pg_size_pretty(pg_database_size(pg_database.datname)) AS size
        FROM pg_database
        ORDER BY pg_database_size(pg_database.datname) DESC;"
}

# 2. Performance Analysis
performance_analysis() {
    echo "=== Performance Analysis ==="

    # Top 10 slowest queries
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            query,
            calls,
            total_time,
            mean_time,
            rows,
            100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
        FROM pg_stat_statements
        ORDER BY total_time DESC
        LIMIT 10;"

    # Index usage statistics
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            schemaname,
            tablename,
            indexname,
            idx_scan,
            idx_tup_read,
            idx_tup_fetch
        FROM pg_stat_user_indexes
        ORDER BY idx_scan DESC;"

    # Table statistics
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            schemaname,
            tablename,
            n_live_tup,
            n_dead_tup,
            last_vacuum,
            last_autovacuum,
            last_analyze,
            last_autoanalyze
        FROM pg_stat_user_tables
        ORDER BY n_live_tup DESC;"
}

# 3. Lock Analysis
lock_analysis() {
    echo "=== Lock Analysis ==="

    # Current locks
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            l.locktype,
            l.database,
            l.relation::regclass,
            l.page,
            l.tuple,
            l.virtualxid,
            l.transactionid,
            l.mode,
            l.granted,
            a.query
        FROM pg_locks l
        LEFT JOIN pg_stat_activity a ON l.pid = a.pid
        WHERE NOT l.granted;"

    # Blocking queries
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            blocked_locks.pid AS blocked_pid,
            blocked_activity.usename AS blocked_user,
            blocking_locks.pid AS blocking_pid,
            blocking_activity.usename AS blocking_user,
            blocked_activity.query AS blocked_statement,
            blocking_activity.query AS current_statement_in_blocking_process
        FROM pg_catalog.pg_locks blocked_locks
        JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
        JOIN pg_catalog.pg_locks blocking_locks ON blocking_locks.locktype = blocked_locks.locktype
            AND blocking_locks.DATABASE IS NOT DISTINCT FROM blocked_locks.DATABASE
            AND blocking_locks.relation IS NOT DISTINCT FROM blocked_locks.relation
            AND blocking_locks.page IS NOT DISTINCT FROM blocked_locks.page
            AND blocking_locks.tuple IS NOT DISTINCT FROM blocked_locks.tuple
            AND blocking_locks.virtualxid IS NOT DISTINCT FROM blocked_locks.virtualxid
            AND blocking_locks.transactionid IS NOT DISTINCT FROM blocked_locks.transactionid
            AND blocking_locks.classid IS NOT DISTINCT FROM blocked_locks.classid
            AND blocking_locks.objid IS NOT DISTINCT FROM blocked_locks.objid
            AND blocking_locks.objsubid IS NOT DISTINCT FROM blocked_locks.objsubid
            AND blocking_locks.pid != blocked_locks.pid
        JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
        WHERE NOT blocked_locks.granted;"
}

# 4. Backup Validation
backup_validation() {
    local backup_file="$1"
    echo "=== Backup Validation ==="

    if [ -z "$backup_file" ]; then
        echo "Usage: backup_validation <backup_file>"
        return 1
    fi

    # Check backup file exists and get size
    if [ -f "$backup_file" ]; then
        echo "Backup file: $backup_file"
        echo "File size: $(du -h "$backup_file" | cut -f1)"
        echo "File date: $(stat -c %y "$backup_file")"
    else
        echo "Error: Backup file not found: $backup_file"
        return 1
    fi

    # List backup contents
    echo "Backup contents:"
    pg_restore --list "$backup_file" | head -20

    # Test backup restore (dry run)
    echo "Testing backup restore..."
    pg_restore --verbose --dry-run "$backup_file" 2>&1 | grep -i error || echo "Backup appears valid"
}

# 5. Database Maintenance
database_maintenance() {
    echo "=== Database Maintenance ==="

    # Update table statistics
    echo "Updating table statistics..."
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "ANALYZE;"

    # Vacuum analyze all tables
    echo "Running VACUUM ANALYZE..."
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "VACUUM ANALYZE;"

    # Reindex if needed
    echo "Checking for bloated indexes..."
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "
        SELECT
            schemaname,
            tablename,
            indexname,
            pg_size_pretty(pg_relation_size(indexrelid)) as size
        FROM pg_stat_user_indexes
        WHERE idx_scan = 0
        ORDER BY pg_relation_size(indexrelid) DESC;"

    # Clean up old data (if retention policies allow)
    echo "Checking data retention compliance..."
    psql -h localhost -p 5432 -U postgres -d video_analytics -c "SELECT enforce_retention_policies();"
}

# 6. Emergency Recovery
emergency_recovery() {
    echo "=== Emergency Recovery Procedures ==="

    # Check if database is in recovery mode
    recovery_status=$(psql -h localhost -p 5432 -U postgres -d video_analytics -t -c "SELECT pg_is_in_recovery();")

    if [ "$recovery_status" = " t" ]; then
        echo "Database is in recovery mode"
        echo "Recovery status:"
        psql -h localhost -p 5432 -U postgres -d video_analytics -c "
            SELECT
                pg_last_wal_receive_lsn(),
                pg_last_wal_replay_lsn(),
                EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp())) AS lag_seconds;"
    else
        echo "Database is running normally (not in recovery)"
    fi

    # Check for recent errors in logs
    echo "Recent errors in PostgreSQL logs:"
    tail -n 100 /var/log/postgresql/postgresql-*.log | grep -i error | tail -10

    # Check system resources
    echo "System resource usage:"
    echo "Memory:"
    free -h
    echo "Disk space:"
    df -h
    echo "CPU load:"
    uptime
}

# Main script execution
case "$1" in
    "health")
        database_health_check
        ;;
    "performance")
        performance_analysis
        ;;
    "locks")
        lock_analysis
        ;;
    "validate")
        backup_validation "$2"
        ;;
    "maintenance")
        database_maintenance
        ;;
    "recovery")
        emergency_recovery
        ;;
    "all")
        database_health_check
        performance_analysis
        lock_analysis
        database_maintenance
        ;;
    *)
        echo "Usage: $0 {health|performance|locks|validate|maintenance|recovery|all} [backup_file]"
        echo ""
        echo "Commands:"
        echo "  health      - Check database health and connectivity"
        echo "  performance - Analyze query performance and index usage"
        echo "  locks       - Analyze current locks and blocking queries"
        echo "  validate    - Validate backup file integrity"
        echo "  maintenance - Perform routine database maintenance"
        echo "  recovery    - Check recovery status and recent errors"
        echo "  all         - Run all diagnostic checks"
        exit 1
        ;;
esac
```

---

## 📋 Phase 1 Success Criteria

### **Database Performance Targets**
```yaml
SUCCESS_CRITERIA:
  Performance_Metrics:
    Query_Response_Time: "<100ms for 95% of queries"
    Connection_Establishment: "<50ms for new connections"
    Throughput: "1000+ transactions per second"
    Concurrent_Connections: "200 simultaneous connections"
    Index_Hit_Ratio: ">95% for all major indexes"

  Reliability_Metrics:
    Database_Availability: ">99.9% uptime"
    Data_Consistency: "100% ACID compliance"
    Backup_Success_Rate: "100% successful backups"
    Recovery_Time_Objective: "<15 minutes for point-in-time recovery"
    Recovery_Point_Objective: "<1 minute data loss maximum"

  Scalability_Metrics:
    Data_Volume: "Support for 1TB+ database size"
    Concurrent_Streams: "100+ streams with real-time data ingestion"
    Query_Scaling: "Linear performance scaling up to 80% CPU"
    Storage_Efficiency: ">80% storage utilization"
    Index_Efficiency: "All indexes showing >50% usage"

  Security_Metrics:
    Access_Control: "100% role-based access enforcement"
    Data_Encryption: "All sensitive data encrypted at rest"
    Audit_Compliance: "100% security events logged"
    Authentication_Success: ">99.5% valid authentication rate"
    Vulnerability_Score: "Zero critical security vulnerabilities"

  Operational_Metrics:
    Backup_Frequency: "Daily incremental, weekly full backups"
    Maintenance_Automation: ">90% automated maintenance tasks"
    Monitoring_Coverage: "100% database metrics monitored"
    Alert_Response_Time: "<5 minutes for critical database alerts"
    Documentation_Completeness: "100% schema and procedure documentation"
```

### **Phase 2 Migration Readiness**
```yaml
PHASE_2_READINESS:
  Scalability_Features:
    Horizontal_Scaling: "Read replica support implemented"
    Sharding_Preparation: "Logical replication configured"
    Connection_Pooling: "Advanced pooling with load balancing"
    Performance_Optimization: "Query optimization and indexing strategies"

  High_Availability:
    Replication_Setup: "Master-slave replication operational"
    Failover_Automation: "Automatic failover procedures tested"
    Backup_Distribution: "Geographic backup distribution"
    Disaster_Recovery: "Comprehensive disaster recovery plan"

  Advanced_Features:
    Partitioning_Strategy: "Automated table partitioning implemented"
    Archive_Management: "Automated data lifecycle management"
    Performance_Tuning: "Advanced PostgreSQL configuration optimization"
    Security_Hardening: "Enterprise security features enabled"

  Operational_Maturity:
    Monitoring_Advanced: "Comprehensive database monitoring"
    Automation_Level: ">95% automated database operations"
    Documentation_Complete: "Full operational procedures documented"
    Team_Training: "Database administration team trained"
```

---

## 🎯 Database Module Success Summary

The **Database Module** delivers the essential data management and storage foundation for the Phase 1 Video Analytics Platform:

- ✅ **Robust PostgreSQL Architecture**: PostgreSQL 15+ with optimized configuration for high performance
- ✅ **Comprehensive Schema Design**: Complete relational schema with proper indexing and constraints
- ✅ **Performance Optimization**: Advanced indexing, partitioning, and query optimization strategies
- ✅ **Data Lifecycle Management**: Automated retention policies with archival and cleanup procedures
- ✅ **Backup and Recovery**: Continuous backup with point-in-time recovery capabilities
- ✅ **Security Framework**: Encryption, access control, and comprehensive audit logging
- ✅ **Production Ready**: Complete monitoring, troubleshooting, and operational procedures
- ✅ **Phase 2 Prepared**: Scalable architecture ready for distributed database deployment

**This Database Module provides the reliable, high-performance, and secure data storage foundation required for successful Phase 1 implementation and seamless evolution to enterprise scale.**

---

**Document Status**: Implementation Ready
**Next Document**: [10-security-module.md](./10-security-module.md)
**Related**: [System Architecture](./01-simplified-system-architecture.md) | [API Gateway](./05-api-gateway-module.md) | [Stream Management](./07-stream-management-module.md)