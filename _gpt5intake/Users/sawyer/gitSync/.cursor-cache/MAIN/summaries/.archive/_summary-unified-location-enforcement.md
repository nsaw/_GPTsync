# 🚨 **UNIFIED SUMMARY LOCATION ENFORCEMENT**

**Generated**: 2025-01-29T23:15:00.000Z  
**Status**: ✅ **MANDATORY ENFORCEMENT**  
**Issue**: Summaries created in wrong locations instead of unified location

---

## 🚨 **CRITICAL LOCATION RULE VIOLATION**

### **❌ WRONG LOCATIONS (VIOLATIONS)**
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/summaries/` (WRONG)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/tasks/summaries/` (WRONG)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/summaries/` (WRONG)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/patches/.completed/` (WRONG)
- Any project-specific summary locations (WRONG)

### **✅ CORRECT UNIFIED LOCATION**
- **ONLY VALID LOCATION**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`
- **ENFORCEMENT**: MANDATORY for all summary files
- **PATTERN**: All summaries must be in unified location

---

## 📋 **MANDATORY SUMMARY CREATION RULES**

### **BEFORE CREATING ANY SUMMARY:**
1. **Verify unified location exists**: `ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`
2. **Use absolute path**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[name].md`
3. **Follow naming convention**: `summary-[description].md`
4. **Verify creation**: `ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[name].md`

### **MANDATORY SUMMARY CREATION PATTERN:**
```bash
# 1. VERIFY UNIFIED LOCATION
ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/

# 2. CREATE SUMMARY IN UNIFIED LOCATION
touch "/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"

# 3. VERIFY CREATION
ls -la "/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"
```

---

## 🚨 **FORBIDDEN SUMMARY LOCATIONS**

### **NEVER CREATE SUMMARIES IN:**
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/summaries/`
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/tasks/summaries/`
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/summaries/`
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/patches/.completed/`
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/patches/.completed/phase-1.completed/.completed/`
- Any project-specific directory
- Any relative path without absolute verification

### **ALWAYS CREATE SUMMARIES IN:**
- **ONLY**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`
- **PATTERN**: `summary-[description].md`
- **VERIFICATION**: Must verify file creation after writing

---

## 📊 **CURRENT VIOLATIONS FOUND**

### **Project-Specific Summary Locations (WRONG):**
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/summaries/` (multiple files)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/tasks/summaries/` (multiple files)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/summaries/` (archived files)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/patches/.completed/` (multiple files)

### **Correct Unified Location (RIGHT):**
- `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/` (100+ files correctly placed)

---

## 🎯 **ENFORCEMENT REQUIREMENTS**

### **For ALL Future Summary Creation:**
1. **MANDATORY**: Use unified location only
2. **MANDATORY**: Use absolute path
3. **MANDATORY**: Verify file creation
4. **MANDATORY**: Follow naming convention
5. **MANDATORY**: Document in this summary

### **Template for Summary Creation:**
```bash
# CORRECT PATTERN
edit_file(
  target_file="/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md",
  instructions="Creating summary in unified location",
  code_edit="..."
)
```

### **Verification After Creation:**
```bash
# VERIFY CREATION
ls -la "/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"
```

---

## 🚨 **CRITICAL LESSONS LEARNED**

### **1. Unified Location is MANDATORY**
- **Issue**: Creating summaries in project-specific locations
- **Root Cause**: Not following unified location rules
- **Solution**: Mandatory unified location enforcement

### **2. Absolute Paths Are Critical**
- **Issue**: Using relative paths for summary creation
- **Root Cause**: Path ambiguity and confusion
- **Solution**: Absolute path requirement for all summaries

### **3. Verification Must Be Mandatory**
- **Issue**: Not verifying summary creation
- **Root Cause**: Assuming correct placement
- **Solution**: Mandatory verification after creation

### **4. Naming Convention Must Be Consistent**
- **Issue**: Inconsistent summary naming
- **Root Cause**: No standardized naming pattern
- **Solution**: `summary-[description].md` pattern

---

## 📋 **CORRECTION PLAN**

### **Immediate Actions:**
1. **Stop creating summaries in wrong locations**
2. **Use unified location for all new summaries**
3. **Follow absolute path requirement**
4. **Verify all summary creations**

### **Future Enforcement:**
1. **Read this summary before creating any summary**
2. **Use unified location only**
3. **Follow absolute path pattern**
4. **Verify file creation**
5. **Document in unified location**

---

## 🛡️ **ENFORCEMENT STATUS**

### **Unified Location Active**
- **Location**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`
- **Status**: ✅ ACTIVE
- **Enforcement**: MANDATORY

### **Violation Prevention Active**
- **Project-specific locations**: FORBIDDEN
- **Relative paths**: FORBIDDEN
- **Unified location**: MANDATORY
- **Verification**: MANDATORY

---

**Status**: ✅ **UNIFIED LOCATION ENFORCEMENT ACTIVE**  
**Enforcement**: ZERO TOLERANCE for wrong summary locations  
**Unified Location**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`  
**Pattern**: `summary-[description].md`  
**Next Summary**: Must be created in unified location only

**This enforcement prevents summary location violations.** 