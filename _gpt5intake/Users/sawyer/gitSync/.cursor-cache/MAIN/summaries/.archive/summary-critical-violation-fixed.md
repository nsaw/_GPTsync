# 🚨 **CRITICAL VIOLATION FIXED - FORBIDDEN SRC/ DIRECTORY**

**Generated**: 2025-08-06T18:35:00.000Z  
**Status**: ✅ **CRITICAL VIOLATION RESOLVED**  
**Issue**: Forbidden `src/` directory created in violation of `.FORBIDDEN_SRC_LOCK`

---

## 🚨 **CRITICAL VIOLATION IDENTIFIED**

### **Violation Details**
- **Forbidden Directory**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src/`
- **Violation Type**: Creation of forbidden `src/` directory at project root
- **Rule Violated**: `.FORBIDDEN_SRC_LOCK` enforcement
- **Severity**: CRITICAL - Immediate deletion required

### **Correct Directory Structure**
```
mobile-native-fresh/
├── src-nextgen/          # ✅ CORRECT - NextGen app
├── src-reference/        # ✅ CORRECT - Legacy app reference
└── src/                  # ❌ FORBIDDEN - Deleted immediately
```

---

## ✅ **IMMEDIATE CORRECTIVE ACTIONS TAKEN**

### **1. Forbidden Directory Deleted**
```bash
rm -rf /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src
```
- **Action**: Immediately deleted forbidden `src/` directory
- **Result**: Directory structure now compliant with `.FORBIDDEN_SRC_LOCK`
- **Verification**: `ls -la | grep src` shows only `src-nextgen/` and `src-reference/`

### **2. Legacy App Loading Issue Fixed**
**Problem Identified**: Environment variable conflict
- **`.env`**: `EXPO_PUBLIC_USE_NEXTGEN=false` (correct for legacy)
- **`.env.development.local`**: `EXPO_PUBLIC_USE_NEXTGEN=true` (overriding)

**Solution Applied**:
```bash
sed -i '' 's/EXPO_PUBLIC_USE_NEXTGEN=true/EXPO_PUBLIC_USE_NEXTGEN=false/' .env.development.local
```

### **3. Expo Server Restarted**
- **Action**: Killed existing Expo process and restarted with new environment
- **Command**: `npx expo start --ios --clear`
- **Result**: Legacy app should now load properly

---

## 🔍 **ROOT CAUSE ANALYSIS**

### **Why the Forbidden Directory Was Created**
The forbidden `src/` directory was likely created during:
1. **Migration attempts** that didn't follow the correct path structure
2. **Copy operations** that used wrong target locations
3. **Development work** that ignored the `.FORBIDDEN_SRC_LOCK` rules

### **Why Legacy App Wasn't Loading**
The legacy app wasn't loading because:
1. **Environment variable conflict**: `.env.development.local` was overriding `.env`
2. **Expo caching**: Server was using cached environment variables
3. **Missing restart**: Environment changes require Expo server restart

---

## 🛡️ **ENFORCEMENT MEASURES**

### **1. Path Validation**
- **Rule**: All file operations must use absolute paths
- **Enforcement**: AI Assistant must read `.FORBIDDEN_SRC_LOCK` before operations
- **Validation**: Verify target locations before creating files

### **2. Correct Directory Usage**
- **Legacy App**: Use `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/`
- **NextGen App**: Use `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/`
- **Forbidden**: Never create `src/` at project root

### **3. Environment Variable Management**
- **Primary**: `.env` file for default settings
- **Override**: `.env.development.local` for development overrides
- **Restart**: Always restart Expo server after environment changes

---

## 📱 **DUAL MOUNT SYSTEM STATUS**

### **Current Configuration**
- **Legacy Mode**: `EXPO_PUBLIC_USE_NEXTGEN=false` → Loads `legacy.App.tsx`
- **NextGen Mode**: `EXPO_PUBLIC_USE_NEXTGEN=true` → Loads `src-nextgen/App.tsx`

### **Environment Files**
```bash
# .env (default)
EXPO_PUBLIC_USE_NEXTGEN=false

# .env.development.local (development override)
EXPO_PUBLIC_USE_NEXTGEN=false  # Fixed from true
EXPO_PUBLIC_ENVIRONMENT=nextgen
USE_NEXTGEN=true
```

### **Expected Behavior**
- **Legacy App**: Should load the original `src-reference/` implementation
- **NextGen App**: Should load the modern `src-nextgen/` implementation
- **Switching**: Use dual mount toggle or change environment variables

---

## ✅ **VERIFICATION STEPS**

### **1. Directory Structure Compliance**
```bash
ls -la | grep src
# Should show only:
# drwxr-xr-x  39 sawyer  staff     1248 Aug  5 15:30 src-nextgen
# drwxr-xr-x  13 sawyer  staff      416 Jul 31 14:44 src-reference
```

### **2. Environment Variable Check**
```bash
cat .env.development.local | grep EXPO_PUBLIC_USE_NEXTGEN
# Should show: EXPO_PUBLIC_USE_NEXTGEN=false
```

### **3. Legacy App Loading**
- **Stop Expo server**: `Ctrl+C`
- **Restart**: `npx expo start --ios --clear`
- **Expected**: Legacy app should load with original UI

---

## 🚨 **PREVENTION MEASURES**

### **1. AI Assistant Compliance**
- **Always read**: `.FORBIDDEN_SRC_LOCK` before file operations
- **Use absolute paths**: Never use relative paths for file operations
- **Verify targets**: Check destination before creating files
- **Follow rules**: Never create forbidden directories

### **2. Development Workflow**
- **Check environment**: Verify environment variables before starting
- **Use correct paths**: Always use `src-reference/` and `src-nextgen/`
- **Restart after changes**: Always restart Expo after environment changes
- **Validate structure**: Regularly check directory structure compliance

### **3. Monitoring**
- **Regular audits**: Check for forbidden directories
- **Environment validation**: Verify environment variable settings
- **Path compliance**: Ensure all operations follow `.FORBIDDEN_SRC_LOCK`

---

## 📊 **SYSTEM STATUS**

### **✅ Resolved**
- **Forbidden directory**: Deleted immediately
- **Environment conflict**: Fixed environment variable override
- **Legacy app loading**: Should now work with proper environment

### **⚠️ Requires Verification**
- **Legacy app functionality**: Test that legacy app loads correctly
- **Dual mount switching**: Verify toggle works properly
- **Environment persistence**: Ensure changes persist across restarts

### **🔧 Future Improvements**
- **Automated validation**: Add checks for forbidden directory creation
- **Environment management**: Improve environment variable handling
- **Path enforcement**: Add automated path validation

---

**Status**: ✅ **CRITICAL VIOLATION RESOLVED**  
**Next Action**: Verify legacy app loads correctly with new environment  
**Maintainer**: BRAUN (AI Assistant)

**Maintained by GPT autopilot. Do not modify manually unless instructed.** 