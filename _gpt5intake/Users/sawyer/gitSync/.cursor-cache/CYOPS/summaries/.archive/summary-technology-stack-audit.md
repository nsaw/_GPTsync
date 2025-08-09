# Technology Stack Audit Report
## GPT Cursor Runner - Comprehensive Technology Analysis

**Generated**: 2025-01-02  
**Audit Scope**: @dashboard/, @public/, @server/, @src/, @src-nextgen/, @scripts/  
**Status**: COMPLETE

---

## 🏗️ **ARCHITECTURE OVERVIEW**

### **Multi-Stack Hybrid Architecture**
The system uses a **hybrid approach** combining:
- **Flask (Python)** - Primary dashboard and API server
- **Express.js (Node.js)** - Secondary services and Slack integration  
- **React/React Native** - Frontend components and UI
- **Static HTML/CSS/JS** - Fallback and public pages
- **Cloudflare Tunnels** - External access and routing

---

## 🔧 **TECHNOLOGY STACK BREAKDOWN**

### **1. FLASK (Python) - Primary Server**
**Location**: `/dashboard/`  
**Port**: `8787` (main), `5555` (webhook), `5051` (Python runner)  
**Purpose**: Main dashboard, API endpoints, monitoring  
**Key Files**:
- `dashboard/app.py` - Main Flask application (port 8787)
- `dashboard/api/status.py` - Status API endpoints
- `dashboard/api/orchestrator.py` - Orchestration monitoring
- `gpt_cursor_runner/main.py` - Python runner (port 5051)
- `simple_flask_server.py` - Simple server (port 5051)

**Dependencies**:
```python
Flask==2.3.3
Werkzeug==2.3.7
psutil==5.9.5
requests
```

### **2. EXPRESS.JS (Node.js) - Secondary Services**
**Location**: `/server/`  
**Ports**: `5052` (main), `5555` (Slack app), `3222` (status server)  
**Purpose**: Slack integration, webhooks, status endpoints  
**Key Files**:
- `server/index.js` - Main Express server (port 5052)
- `server/slack-app.js` - Slack Bolt app (port 5555)
- `server/status-server.js` - Status JSON endpoint (port 3222)

**Dependencies**:
```json
"express": "^4.21.2",
"@slack/bolt": "^4.4.0",
"axios": "^1.10.0",
"cors": "^2.8.5"
```

### **3. REACT/REACT NATIVE - Frontend Components**
**Location**: `/dashboard/components/`, `/src-nextgen/`  
**Purpose**: Modern UI components, dashboard panels  
**Key Components**:
- `dashboard/components/ui/` - React UI components
- `src-nextgen/components/` - React Native components
- `src-nextgen/ghost/dashboard/ghostDashboardUI.tsx` - Main dashboard UI

**Dependencies**:
```json
"react-dom": "^19.1.1",
"@types/react-dom": "^19.1.7"
```

### **4. STATIC HTML/CSS/JS - Public Pages**
**Location**: `/public/`, `/dashboard/templates/`  
**Purpose**: Fallback pages, public dashboard  
**Key Files**:
- `public/index.html` - Main public dashboard
- `dashboard/templates/index.html` - Flask-served dashboard
- `public/runner_fallback.html` - Fallback page

---

## 🌐 **DEPLOYMENT & ROUTING**

### **Cloudflare Tunnel Configuration**
**Config File**: `config/tunnel-config.yml`  
**Tunnel Name**: `gpt-cursor-runner`  
**Domains**:
- `gpt-cursor-runner.thoughtmarks.app` → `http://localhost:5555`
- `webhook-thoughtmarks.thoughtmarks.app` → `http://localhost:5555`

### **Fly.io Deployment**
**Domain**: `gpt-cursor-runner.fly.dev`  
**Purpose**: Webhook endpoint, health checks  
**Configuration**: Referenced in unified-boot.sh

---

## 📊 **PORT CONFIGURATION SUMMARY**

| Port | Service | Technology | Purpose | Status |
|------|---------|------------|---------|---------|
| **8787** | Main Dashboard | Flask | Primary dashboard | ✅ Active |
| **5555** | Webhook/Flask | Flask | Webhook endpoint | ✅ Active |
| **5051** | Python Runner | Flask | Main runner | ✅ Active |
| **5052** | Express Server | Node.js | Secondary API | ✅ Active |
| **3222** | Status Server | Node.js | Status JSON | ✅ Active |
| **3000** | Ghost Bridge | Node.js | Bridge service | ✅ Active |
| **3001** | Ghost Relay | Node.js | Relay service | ✅ Active |
| **7474** | Ghost Viewer | Node.js | Viewer service | ✅ Active |
| **3002** | Dashboard Daemon | Python | Comprehensive dashboard | ⚠️ Referenced |
| **8081** | Expo Dev Server | React Native | Development | ❌ Reserved |
| **4000** | Backend API | - | Reserved | ❌ Reserved |

---

## 🚀 **UNIFIED BOOT SCRIPT ANALYSIS**

### **Services Started by `unified-boot.sh`**:

1. **Flask Services**:
   - Main dashboard (port 8787)
   - Python runner (port 5555)
   - Dashboard daemon (port 3002)

2. **Node.js Services**:
   - Dual monitor server (port 8787)
   - Ghost bridge (port 3000)
   - Ghost relay (port 3001)
   - Ghost viewer (port 7474)

3. **Infrastructure**:
   - Cloudflare tunnels
   - Watchdog services
   - BRAUN daemon (MAIN processing)
   - Patch executor daemon

### **Port Conflict Resolution**:
The script includes automatic port conflict resolution for:
- 5555 (Flask App)
- 5053 (Ghost Runner)
- 3002 (Comprehensive Dashboard)
- 8787 (Dual Monitor Server)

---

## 🔍 **MONITORING & HEALTH CHECKS**

### **Dashboard URLs**:
- **Primary**: `https://gpt-cursor-runner.thoughtmarks.app/monitor`
- **API Status**: `https://gpt-cursor-runner.thoughtmarks.app/api/status`
- **Health Check**: `https://gpt-cursor-runner.thoughtmarks.app/api/health`

### **Health Endpoints**:
- Flask: `/api/health`, `/api/status`
- Express: `/health`, `/status`
- Telemetry: `/api/telemetry/health`

---

## ⚠️ **CONFIGURATION ISSUES & RECOMMENDATIONS**

### **Critical Issues**:

1. **Port Conflicts**:
   - Port 8787 used by both Flask dashboard and dual monitor server
   - Port 5555 used by both Flask webhook and Slack app
   - **Recommendation**: Consolidate or separate these services

2. **Technology Fragmentation**:
   - Multiple server technologies (Flask + Express) increase complexity
   - **Recommendation**: Consider consolidating to single technology stack

3. **Deployment Complexity**:
   - Multiple deployment targets (Fly.io + Cloudflare)
   - **Recommendation**: Standardize on single deployment platform

### **Security Concerns**:

1. **No Authentication**:
   - Dashboard has no authentication requirement
   - **Recommendation**: Implement basic auth or API key validation

2. **CORS Configuration**:
   - Wide CORS policy allowing all thoughtmarks.app subdomains
   - **Recommendation**: Restrict to specific domains

### **Performance Issues**:

1. **Multiple Polling Intervals**:
   - Different services poll at different intervals (2s-30s)
   - **Recommendation**: Standardize polling intervals

2. **Resource Usage**:
   - Multiple Node.js processes with 100M memory limits
   - **Recommendation**: Implement resource monitoring and limits

---

## 📋 **RECOMMENDED CONFIGURATION**

### **Ideal Port Allocation**:
```
8787 - Main Flask Dashboard
5555 - Flask Webhook API
5051 - Python Runner
5052 - Express Secondary API
3222 - Status Server
3000-3003 - Ghost Services
7474 - Ghost Viewer
```

### **Technology Consolidation**:
1. **Primary**: Flask for all Python-based services
2. **Secondary**: Express.js for Slack integration only
3. **Frontend**: React components for dashboard
4. **Deployment**: Cloudflare Tunnels for external access

### **Monitoring Improvements**:
1. **Unified Health Check**: Single endpoint for all services
2. **Resource Monitoring**: CPU, memory, disk usage tracking
3. **Error Logging**: Centralized error collection and reporting
4. **Performance Metrics**: Response time and throughput monitoring

---

## 🎯 **CONCLUSION**

The system is **functional but complex** with multiple technology stacks serving different purposes. The main dashboard at `https://gpt-cursor-runner.thoughtmarks.app/monitor` is served by **Flask on port 8787** through Cloudflare tunnels.

**Key Strengths**:
- Comprehensive monitoring and health checks
- Multiple deployment options (Fly.io + Cloudflare)
- Robust error handling and recovery

**Key Weaknesses**:
- Technology fragmentation
- Port conflicts and configuration complexity
- No authentication on public endpoints

**Immediate Actions Needed**:
1. Resolve port conflicts in unified-boot.sh
2. Implement authentication for dashboard
3. Consolidate monitoring endpoints
4. Standardize deployment configuration

**Status**: ✅ **AUDIT COMPLETE** - System is operational but requires configuration optimization 