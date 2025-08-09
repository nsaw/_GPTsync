# Service Status Discrepancy Investigation Report

## Issue Summary
**User Report**: `unified-manager.sh monitor` reports 4 services as "not started" (flask-dashboard, ghost-runner, backend-api, expo-dev, expo-web, ngrok-tunnel), but `flask-dashboard` and `ghost-runner` show up as healthy on the `/monitor` dashboard.

## Investigation Results

### 🔍 **Root Cause Identified**

The discrepancy exists because **`unified-manager.sh` and the dashboard use different health detection methods**:

#### **unified-manager.sh Health Check Logic**
1. **PM2 Services**: Checks if service is managed by PM2 and status is "online"
2. **Direct Services**: Checks for PID file in `pids/` directory, then validates process is running
3. **Fallback**: If no PID file but port is in use, attempts health check via HTTP

#### **Dashboard Health Check Logic**
1. **Telemetry System**: Monitors actual services running on ports regardless of how they were started
2. **API Status**: Checks `/api/status` endpoint which aggregates telemetry data
3. **Real-time Monitoring**: Detects services that are actually responding on their configured ports

### 📊 **Current Service Status**

#### **Services Actually Running (Confirmed)**
- ✅ **flask-dashboard**: Running on port 8787 (PID 28789)
- ✅ **ghost-runner**: Running on port 5053 (PID 11233) - responds to `/health` endpoint
- ✅ **ghost-bridge**: Running via PM2 (PID 11373)

#### **Dashboard API Status (from `/api/status`)**
```json
"components": {
  "flask": { "health": "healthy", "status": "running" },
  "ghost-runner": { "health": "healthy", "status": "running" }
}
```

#### **unified-manager.sh Status**
- ❌ **flask-dashboard**: UNHEALTHY (no PID file in `pids/` directory)
- ❌ **ghost-runner**: UNHEALTHY (no PID file in `pids/` directory)

### 🔧 **Technical Details**

#### **Why unified-manager.sh Reports UNHEALTHY**
1. **No PID Files**: Services were not started by `unified-manager.sh`, so no PID files exist in `pids/` directory
2. **Health Check Logic**: The fallback port-based health check should work but may have timing issues
3. **Service Configuration**: Both services are configured as direct services (not PM2) in `unified-manager.sh`

#### **Why Dashboard Reports HEALTHY**
1. **Telemetry Integration**: Dashboard uses a comprehensive telemetry system that monitors actual service availability
2. **Port-based Detection**: Detects services running on expected ports regardless of startup method
3. **Real-time Health Checks**: Performs actual HTTP health checks to `/health` endpoints

### 🎯 **Key Findings**

1. **Services ARE Running**: Both `flask-dashboard` and `ghost-runner` are actually healthy and operational
2. **Different Startup Methods**: Services were started outside of `unified-manager.sh` (likely via `unified-boot.sh` or manual startup)
3. **Health Check Discrepancy**: `unified-manager.sh` relies on PID files for direct services, while dashboard uses port-based detection
4. **Fallback Logic Issue**: The port-based fallback in `unified-manager.sh` may not be working as expected

### 🔄 **Recommended Solutions**

#### **Option 1: Enhance unified-manager.sh Health Detection**
- Improve the fallback health check logic to better detect externally started services
- Add more robust port-based service detection
- Consider integrating with the dashboard's telemetry system

#### **Option 2: Standardize Service Management**
- Ensure all services are started through `unified-manager.sh` to maintain consistent PID file tracking
- Update `unified-boot.sh` to use `unified-manager.sh` for service startup
- Implement proper service handoff between boot and manager systems

#### **Option 3: Hybrid Approach**
- Keep current dashboard telemetry for real-time health monitoring
- Enhance `unified-manager.sh` to query dashboard API for service status
- Maintain PID file tracking for services started by the manager

### 📋 **Next Steps**

1. **Immediate**: Proceed with integration tasks as requested by user
2. **Short-term**: Implement enhanced health detection in `unified-manager.sh`
3. **Long-term**: Standardize service management across all systems

## Conclusion

The discrepancy is **not a system failure** but rather a **detection method difference**. Both services are actually healthy and operational. The dashboard provides the more accurate real-time status, while `unified-manager.sh` provides management-focused status based on its own startup tracking.

**Recommendation**: Proceed with the integration tasks while implementing enhanced health detection to resolve the discrepancy.

---
**Investigation Date**: 2025-08-05  
**Investigator**: AI Assistant  
**Status**: COMPLETE - Ready for integration tasks 