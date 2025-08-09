# Dashboard Audit & Diagnosis - Status Display Issues

**Date**: Sun Aug 3 16:30:00 PDT 2025  
**Patch ID**: dashboard-audit-diagnosis  
**Status**: 🔍 DIAGNOSIS COMPLETE  
**Roadmap Phase**: System Maintenance & Debugging  

## 🔍 **AUDIT FINDINGS**

### **Dashboard Architecture Overview**
The dashboard at https://gpt-cursor-runner.thoughtmarks.app/monitor uses a multi-layered data aggregation system:

1. **Frontend**: HTML/JavaScript dashboard with real-time polling
2. **Backend API**: Flask app serving `/api/status` and `/api/telemetry/alerts`
3. **Data Sources**: Multiple local files and process checks
4. **Process Validation**: `pgrep` commands for service status

### **Data Flow Analysis**

#### **Primary Data Sources**
- **`/api/status`**: Main endpoint aggregating all dashboard data
- **`/api/telemetry/alerts`**: Alert engine status and history
- **Process Health**: Real-time `pgrep` checks for service status
- **File-based Data**: Heartbeat files, log files, patch directories

#### **Key Data Structures**
```json
{
  "daemon_status": {
    "summary-monitor": "stopped",
    "patch-executor": "running",
    "ghost-bridge": "stopped",
    "flask": "running",
    // ... other services
  },
  "process_health": {
    "summary-monitor": {"status": "STOPPED", "running": false},
    "patch-executor": {"status": "HEALTHY", "running": true},
    // ... detailed process info
  },
  "agent_status": {
    "MAIN": {"processes": {"summary-monitor": "STOPPED"}},
    "CYOPS": {"processes": {"summary-monitor": "STOPPED"}}
  }
}
```

## 🚨 **IDENTIFIED ISSUES**

### **1. Process Name Mismatches**

**Problem**: The dashboard is looking for processes with names that don't match actual running processes.

**Evidence**:
- API shows `"summary-monitor": "stopped"` but we confirmed `summary_watcher_daemon.py` is running
- API shows `"ghost-bridge": "stopped"` but `ghost-bridge-simple.js` is running
- API shows `"comprehensive-dashboard": "stopped"` but `dashboard_daemon.py` is running

**Root Cause**: The `check_process_health()` method in `dashboard/app.py` uses hardcoded process patterns that don't match actual running processes.

### **2. Inconsistent Process Detection Logic**

**Problem**: Different endpoints use different methods to check the same services.

**Evidence**:
- `/api/daemon-status` uses `pgrep -f "process_name"`
- `check_process_health()` uses different process patterns
- Frontend JavaScript has its own mapping logic

**Specific Mismatches**:
```python
# In check_process_health() - WRONG PATTERNS
("summary-monitor", "summary-monitor"),  # Should be "summary_watcher_daemon.py"
("ghost-bridge", "ghost-bridge-watchdog"),  # Should be "ghost-bridge-simple.js"
("comprehensive-dashboard", "comprehensive-dashboard"),  # Should be "dashboard_daemon.py"
```

### **3. Frontend Status Mapping Issues**

**Problem**: The frontend JavaScript has incorrect mappings between component IDs and backend process names.

**Evidence**:
```javascript
// In dashboard HTML - INCORRECT MAPPINGS
['watcher', 'Summary Watcher', 'summary-monitor'],  // Should be 'summary-watcher'
['comprehensive', 'Comprehensive Dashboard', 'comprehensive-dashboard'],  // Should be 'dashboard-daemon'
['ghost', 'Ghost Runner', 'ghost-runner'],  // Should be 'ghost-runner' (this one is correct)
```

### **4. Multiple Data Sources with Conflicting Information**

**Problem**: The dashboard aggregates data from multiple sources that can have conflicting status information.

**Evidence**:
- `daemon_status` shows services as "stopped"
- `process_health` shows same services as "STOPPED"
- `agent_status.processes` shows "STOPPED"
- But actual `ps aux` confirms services are running

## 🔧 **DIAGNOSIS SUMMARY**

### **Primary Issue**: Process Name Mismatches
The dashboard is failing to detect running services because it's looking for the wrong process names. This is the root cause of the incorrect status display.

### **Secondary Issues**:
1. **Inconsistent Process Patterns**: Different parts of the system use different patterns to detect the same services
2. **Frontend Mapping Errors**: JavaScript mappings don't match actual backend process names
3. **Data Aggregation Conflicts**: Multiple data sources provide conflicting information

### **Services Affected**:
- ✅ **Summary Watcher**: Running as `summary_watcher_daemon.py` but dashboard looks for `summary-monitor`
- ✅ **Ghost Bridge**: Running as `ghost-bridge-simple.js` but dashboard looks for `ghost-bridge`
- ✅ **Comprehensive Dashboard**: Running as `dashboard_daemon.py` but dashboard looks for `comprehensive-dashboard`
- ✅ **Flask App**: Running but dashboard shows as "stopped" due to process name mismatch

## 🛠️ **REQUIRED FIXES**

### **1. Fix Process Detection Patterns**
Update `dashboard/app.py` `check_process_health()` method to use correct process patterns:

```python
# CORRECT PATTERNS
("summary-watcher", "summary_watcher_daemon.py"),
("ghost-bridge", "ghost-bridge-simple.js"),
("dashboard-daemon", "dashboard_daemon.py"),
("flask", "gpt_cursor_runner.main"),
```

### **2. Fix Frontend JavaScript Mappings**
Update the component mapping in the dashboard HTML:

```javascript
// CORRECT MAPPINGS
['watcher', 'Summary Watcher', 'summary-watcher'],
['comprehensive', 'Comprehensive Dashboard', 'dashboard-daemon'],
['ghost-bridge', 'Ghost Bridge', 'ghost-bridge'],
```

### **3. Standardize Process Detection**
Ensure all endpoints use consistent process detection logic.

### **4. Add Process Name Validation**
Add validation to ensure process names match actual running processes.

## 📊 **CURRENT STATUS**

### **Services Actually Running** (Confirmed via `ps aux`):
- ✅ Flask App (port 5555): `gpt_cursor_runner.main`
- ✅ Ghost Runner (port 5053): `scripts/core/ghost-runner.js`
- ✅ BRAUN Daemon: `braun_daemon.py`
- ✅ Patch Executor: `patch_executor_daemon.py`
- ✅ Summary Watcher: `summary_watcher_daemon.py`
- ✅ Dashboard Uplink: `scripts/watchdogs/dashboard-uplink.js`
- ✅ Comprehensive Dashboard (port 3002): `dashboard_daemon.py`
- ✅ Command Queue Daemon: `scripts/core/command-queue-daemon.sh`
- ✅ Ghost Relay (port 3001): `scripts/ghost/ghost-relay.js`
- ✅ Ghost Viewer (port 7474): `scripts/ghost/ghost-viewer.js`
- ✅ Ghost Bridge (port 3000): `scripts/ghost/ghost-bridge-simple.js`
- ✅ Dual Monitor (port 8787): `scripts/monitor/dual-monitor-server.js`
- ✅ Autonomous Decision Engine: `scripts/daemons/autonomous-decision-daemon.js`
- ✅ Telemetry Orchestrator: `scripts/daemons/telemetry-orchestrator-daemon.js`
- ✅ Metrics Aggregator: `scripts/daemons/metrics-aggregator-daemon.js`
- ✅ Alert Engine: `scripts/daemons/alert-engine-daemon.js`

### **Dashboard Display Status** (Incorrect):
- ❌ Summary Watcher: Shows as "stopped"
- ❌ Ghost Bridge: Shows as "stopped"
- ❌ Comprehensive Dashboard: Shows as "stopped"
- ❌ Flask App: Shows as "stopped"

## 🎯 **NEXT STEPS**

1. **Fix Process Detection Patterns** in `dashboard/app.py`
2. **Update Frontend Mappings** in dashboard HTML
3. **Test Dashboard Display** after fixes
4. **Validate All Services** show correct status
5. **Update Documentation** to reflect correct process names

---

**Agent Validation**: PENDING  
**Live State**: Dashboard showing incorrect status due to process name mismatches  
**User/GPT Validation**: REQUIRED - Process detection patterns need updating  

Awaiting confirmation to proceed with fixes. 