# Dashboard Frontend-Backend Wiring Fix

## Problem Analysis

The dashboard frontend is not displaying data despite working API endpoints because of **JavaScript data structure mapping mismatches**.

### API Data Available
✅ `/api/status` - Returns comprehensive data including:
- `agent_status.CYOPS.processes.*` - All CYOPS processes
- `agent_status.MAIN.processes.*` - All MAIN processes  
- `process_health.*` - PM2 process health data
- `telemetry.components.components.*` - Component health data
- `patch_status.CYOPS/MAIN` - Patch statistics
- `tunnel_status` - Tunnel configurations

✅ `/api/manager-status` - Returns manager data with structure:
```json
{
  "manager_status": {
    "CYOPS": { "managers": {...}, "status": "..." },
    "MAIN": { "managers": {...}, "status": "..." }
  },
  "total_services": 14,
  "healthy_services": 12,
  "unhealthy_services": 2
}
```

### Frontend Issues Identified

#### 1. Unified Manager Data Mapping
**Current Code (Lines 844-891):**
```javascript
// WRONG: Expects flat structure
document.getElementById('manager-status').textContent = managerData.status || 'Unknown';
document.getElementById('total-services').textContent = managerData.total_services || 0;
```

**API Returns Nested Structure:**
```json
{
  "manager_status": { "CYOPS": {...}, "MAIN": {...} },
  "total_services": 14
}
```

#### 2. Component Health Mapping Issues
**Current Code (Lines 476-550):**
- Checks `telemetryComponents[telemetryKey]` for status
- But API returns `data.telemetry.components.components.*`
- Proper mapping exists but logging shows data structure mismatch

#### 3. Alert Engine Data Structure  
**Current Code (Lines 1000-1004):**
```javascript
if (data.telemetry?.alerts?.alerts) {
  data.alert_engine_status = data.telemetry.alerts.alerts;
}
```

**API Returns:**
```json
{
  "telemetry": {
    "components": { "components": {...} }
  }
}
```

## Fix Required

### Critical Data Mapping Corrections Needed:

1. **Unified Manager Section**: Fix DOM element IDs and data structure mapping
2. **Component Health**: Verify telemetry component data extraction  
3. **Alert Engine**: Correct alert data path from telemetry response
4. **Service Logs**: Fix service log endpoint calls

### Implementation Strategy

The JavaScript needs to be updated to properly map the working API response structure to the UI elements. All the data is available - it's just not being mapped correctly to the DOM.

## Status: PENDING IMPLEMENTATION
**Next**: Apply JavaScript fixes to correct data structure mapping

## Files Affected
- `/Users/sawyer/gitSync/gpt-cursor-runner/dashboard/templates/dashboard.html` (Lines 844-891, 476-550, 1000-1004)

## Resolution Timeline
- **Discovery**: Complete ✅
- **Implementation**: Pending 🔄
- **Testing**: Pending ⏳
- **Deployment**: Pending ⏳