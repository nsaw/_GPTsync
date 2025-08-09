# Summary: Service Naming Clarification

## **Issue Identified**
**Service naming confusion** between MAIN project backend and CYOPS project backend services.

## **Problem**
- **`backend-api`** was ambiguous - could refer to either:
  - MAIN project backend (`tm-mobile-cursor/mobile-native-fresh/backend`)
  - CYOPS project backend (`gpt-cursor-runner` backend services)
- **No clear distinction** between project boundaries
- **Potential operational confusion** for service management

## **Solution Implemented**
**Renamed `backend-api` to `MAIN-backend-api`** to provide clear project context.

### **Service Naming Convention**
- **`MAIN-backend-api`** = Main project backend (tm-mobile-cursor)
- **`flask-dashboard`** = CYOPS project dashboard backend
- **`ghost-runner`** = CYOPS project core service
- **`expo-dev`** = Main project Expo development server
- **`expo-web`** = Main project Expo web server
- **`ngrok-tunnel`** = Main project tunnel service

### **Files Updated**
- **`scripts/core/unified-manager.sh`**: Updated service configuration and references
- **`pids/MAIN-backend-api.pid`**: Renamed PID file (if exists)

### **Configuration Changes**
```bash
# Before (confusing):
"backend-api") echo "node|simple-server.js|4000|http://localhost:4000/health|..."

# After (clear):
"MAIN-backend-api") echo "node|simple-server.js|4000|http://localhost:4000/health|..."
```

## **Benefits**
1. **Clear project boundaries** - immediately obvious which project a service belongs to
2. **Reduced confusion** - no ambiguity about service ownership
3. **Better documentation** - service names are self-documenting
4. **Easier troubleshooting** - clear context for debugging

## **Current Status**
- ✅ **Service renamed** to `MAIN-backend-api`
- ✅ **Configuration updated** in unified manager
- ✅ **PID file renamed** (if exists)
- ❌ **Service still UNHEALTHY** (backend crash issue - being handled by main team)

## **Next Steps**
- Wait for main team to fix backend crash
- Test unified manager with all services running
- Consider adding `CYOPS-backend-api` if this project needs its own backend service

## **Agent Validation: PENDING**
Awaiting backend service restoration and final unified manager validation.

---
**Timestamp**: 2025-08-05 21:15 UTC  
**Agent**: DEV (CYOPS)  
**Status**: Service naming clarification complete 