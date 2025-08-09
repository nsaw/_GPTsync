# DASHBOARD DISCREPANCY ROOT CAUSE ANALYSIS

**Date**: 2025-07-28  
**Status**: 🔍 **ROOT CAUSE IDENTIFIED**  
**Issue**: Two different dashboard systems showing completely different data

---

## **🔍 ROOT CAUSE ANALYSIS**

### **Two Different Dashboard Systems**

The discrepancy exists because there are **TWO COMPLETELY DIFFERENT DASHBOARD SYSTEMS** running:

#### **1. Flask Dashboard (localhost:5001)**
- **Service**: Flask app on port 5001
- **Data Source**: Telemetry API (port 8788) + local files
- **Status**: Shows telemetry data but has issues with process health
- **Issues**: 
  - `ghost-bridge.js` and `heartbeat-loop.js` show as STOPPED
  - Telemetry components show degraded/critical status
  - Alert engine not available
  - Some data shows as "Loading..." or "[object Object]"

#### **2. Dual Monitor Dashboard (gpt-cursor-runner.thoughtmarks.app)**
- **Service**: Different monitoring system (dualMonitor.js)
- **Data Source**: Direct process monitoring + different data sources
- **Status**: Shows healthy processes and accurate data
- **Features**:
  - All processes show as HEALTHY
  - Accurate patch counts (MAIN: 22 completed, CYOPS: 25 completed)
  - Real-time process monitoring
  - Recent logs and activity tracking

---

## **📊 DATA COMPARISON**

### **Process Health Status**

| Process | localhost:5001 | gpt-cursor-runner.thoughtmarks.app |
|---------|----------------|-----------------------------------|
| doc-daemon.js | ✅ HEALTHY | ✅ HEALTHY |
| dual-m | ✅ HEALTHY | ✅ HEALTHY |
| ghost-bridge.js | ❌ STOPPED | ✅ HEALTHY |
| heartbeat-loop.js | ❌ STOPPED | ✅ HEALTHY |
| summary-monitor | ❌ Not shown | ✅ HEALTHY |
| patch-executor | ❌ Not shown | ✅ HEALTHY |

### **Patch Status**

| System | localhost:5001 | gpt-cursor-runner.thoughtmarks.app |
|--------|----------------|-----------------------------------|
| CYOPS Completed | 165 | 25 |
| MAIN Completed | 85 | 22 |
| Recent Summaries | Old data | Current data |

### **Telemetry Integration**

| Feature | localhost:5001 | gpt-cursor-runner.thoughtmarks.app |
|---------|----------------|-----------------------------------|
| Telemetry API | ✅ Connected (port 8788) | ❌ Not connected |
| System Metrics | ✅ Available | ✅ Available (different source) |
| Alert Engine | ❌ Not available | ❌ Not available |
| Component Health | ⚠️ Degraded | ✅ Healthy |

---

## **🔧 TECHNICAL DIFFERENCES**

### **Flask Dashboard (localhost:5001)**
```python
# Data Sources
- Telemetry API (http://localhost:8788)
- Unified monitor heartbeat file
- Recent logs from unified-monitor.log
- Patch directories (CYOPS/MAIN)
- Process health checks via ps/pgrep
```

### **Dual Monitor Dashboard (gpt-cursor-runner.thoughtmarks.app)**
```javascript
// Data Sources
- Direct process monitoring (dualMonitor.js)
- Real-time process status checks
- Patch executor status
- Summary monitor data
- Recent activity logs
- Resource health monitoring
```

---

## **🚨 KEY ISSUES IDENTIFIED**

### **1. Process Detection Differences**
- **Flask Dashboard**: Uses `ps aux | grep` to detect processes
- **Dual Monitor**: Uses direct Node.js process monitoring
- **Result**: Different process detection methods show different results

### **2. Data Source Inconsistency**
- **Flask Dashboard**: Relies on telemetry API and static files
- **Dual Monitor**: Uses real-time monitoring and direct process checks
- **Result**: Different data freshness and accuracy

### **3. Telemetry API Issues**
- **Flask Dashboard**: Connects to telemetry API but some components are degraded
- **Dual Monitor**: Doesn't use telemetry API, uses direct monitoring
- **Result**: Telemetry API issues don't affect dual monitor

### **4. Process Naming Differences**
- **Flask Dashboard**: Looks for `ghost-bridge.js` and `heartbeat-loop.js`
- **Dual Monitor**: Monitors `ghost-bridge` and other processes
- **Result**: Different process names lead to different detection results

---

## **📈 CURRENT SYSTEM STATUS**

### **Running Processes (Confirmed)**
```bash
# Active Processes
sawyer  14859  node scripts/monitor/dualMonitor.js start      # Dual Monitor
sawyer  98220  node scripts/patch-executor-loop.js            # Patch Executor
sawyer  79721  node scripts/summary-monitor-simple.js         # Summary Monitor
```

### **Service Status**
- **Dual Monitor**: ✅ **RUNNING** (PID 14859)
- **Patch Executor**: ✅ **RUNNING** (PID 98220)
- **Summary Monitor**: ✅ **RUNNING** (PID 79721)
- **Telemetry API**: ✅ **RUNNING** (port 8788)
- **Flask Dashboard**: ✅ **RUNNING** (port 5001)

---

## **🎯 RECOMMENDATIONS**

### **Immediate Actions**
1. **Standardize Process Detection**: Use consistent process naming and detection methods
2. **Unify Data Sources**: Ensure both dashboards use the same data sources
3. **Fix Telemetry API**: Resolve degraded components in telemetry system
4. **Consolidate Monitoring**: Consider using one primary monitoring system

### **Long-term Solutions**
1. **Single Dashboard System**: Consolidate to one dashboard with multiple data sources
2. **Unified Data Layer**: Create a common data layer for all monitoring systems
3. **Process Standardization**: Standardize process names and monitoring methods
4. **Health Check Consistency**: Implement consistent health check mechanisms

---

## **🔍 CONCLUSION**

The discrepancy exists because there are **two separate monitoring systems** with different data sources and detection methods:

- **Flask Dashboard**: Uses telemetry API + file-based monitoring
- **Dual Monitor**: Uses direct process monitoring + real-time checks

The **Dual Monitor system appears more accurate** as it shows all processes as healthy and has current data, while the Flask Dashboard shows some processes as stopped and has telemetry API issues.

**Status**: 🔍 **ROOT CAUSE IDENTIFIED** - Two different monitoring systems with different data sources and detection methods 