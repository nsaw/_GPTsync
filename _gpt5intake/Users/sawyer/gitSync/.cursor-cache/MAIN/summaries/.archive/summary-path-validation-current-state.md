# 🛡️ **PATH VALIDATION - CURRENT STATE & MANDATORY TEMPLATE**

**Generated**: 2025-01-29T23:00:00.000Z  
**Status**: ✅ **CORRECT STATE VERIFIED**  
**Template**: ✅ **MANDATORY FOR ALL FUTURE OPERATIONS**

---

## 📍 **CURRENT CORRECT STATE VERIFIED**

### **✅ CORRECT LOCATIONS CONFIRMED**
- **Working Directory**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/` ✅
- **Source (Legacy)**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/` ✅
- **Target (NextGen)**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/` ✅

### **✅ SHELL COMPONENTS CORRECTLY PLACED**
- **SignUp.tsx**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/auth/SignUp.tsx` (5,392 bytes) ✅
- **PasswordReset.tsx**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/auth/PasswordReset.tsx` (5,076 bytes) ✅
- **SettingsScreen.tsx**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/settings/SettingsScreen.tsx` (22,530 bytes) ✅

### **✅ DIRECTORY STRUCTURE CORRECT**
```
/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/
├── shell/
│   ├── auth/
│   │   ├── SignUp.tsx ✅
│   │   └── PasswordReset.tsx ✅
│   └── settings/
│       └── SettingsScreen.tsx ✅
├── components/ ✅
├── features/ ✅
├── hooks/ ✅
├── navigation/ ✅
├── theme/ ✅
└── [other directories] ✅
```

---

## 🚨 **MANDATORY TEMPLATE FOR ALL FUTURE OPERATIONS**

### **BEFORE ANY FILE OPERATION - VALIDATION CHECKLIST**

#### **1. Verify Working Directory**
```bash
pwd
# MUST BE: /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh
```

#### **2. Verify Source Exists (for migrations)**
```bash
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-path]"
```

#### **3. Verify Target Directory Structure**
```bash
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/"
```

#### **4. Create Target Directory (if needed)**
```bash
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"
```

### **MANDATORY OPERATION PATTERNS**

#### **For File Migration:**
```bash
# 1. VERIFY SOURCE EXISTS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-file]"

# 2. VERIFY TARGET DIRECTORY
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"

# 3. COPY WITH ABSOLUTE PATHS
cp "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-file]" \
   "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"

# 4. VERIFY COPY SUCCESS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"
```

#### **For File Creation:**
```bash
# 1. VERIFY TARGET DIRECTORY
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"

# 2. CREATE FILE WITH ABSOLUTE PATH
touch "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"

# 3. VERIFY CREATION
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"
```

---

## 🚨 **CRITICAL ERROR PREVENTION RULES**

### **❌ NEVER DO:**
- Use relative paths without absolute verification
- Create files in `/Users/sawyer/gitSync/tm-mobile-cursor/src-nextgen/` (WRONG - project root)
- Assume directory structure exists
- Skip path validation steps
- Use `src-nextgen/` without full absolute path

### **✅ ALWAYS DO:**
- Use absolute paths starting with `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`
- Verify source files exist before copying
- Create target directories before file operations
- Verify file creation/placement after operations
- Use `ls -la` to confirm file locations
- Follow the validation checklist before every operation

---

## 📋 **EXAMPLE: CORRECT PATCH EXECUTION**

### **Before Executing ANY Patch:**
1. **Read this template completely**
2. **Follow validation checklist**
3. **Use absolute paths only**
4. **Verify each operation**
5. **Confirm file placement**

### **Example: Migrating a Component**
```bash
# 1. VERIFY WORKING DIRECTORY
pwd
# Expected: /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh

# 2. VERIFY SOURCE EXISTS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/features/auth/screens/SignIn.tsx"

# 3. VERIFY TARGET DIRECTORY
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/auth/"

# 4. COPY FILE
cp "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/features/auth/screens/SignIn.tsx" \
   "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/auth/SignIn.tsx"

# 5. VERIFY COPY SUCCESS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/auth/SignIn.tsx"
```

---

## 🎯 **TEMPLATE ENFORCEMENT**

### **For ALL Future Operations:**
1. **MANDATORY**: Read this template before any file operation
2. **MANDATORY**: Follow validation checklist
3. **MANDATORY**: Use absolute paths only
4. **MANDATORY**: Verify file placement after operations
5. **MANDATORY**: Document operations in summary

### **Zero Tolerance Policy:**
- **NO EXCEPTIONS** for path validation
- **NO EXCEPTIONS** for absolute path usage
- **NO EXCEPTIONS** for verification steps
- **IMMEDIATE ROLLBACK** if path mistakes occur

---

## 📊 **CURRENT STATE SUMMARY**

### **✅ CORRECTLY PLACED FILES:**
- **SignUp.tsx**: 5,392 bytes in correct location ✅
- **PasswordReset.tsx**: 5,076 bytes in correct location ✅
- **SettingsScreen.tsx**: 22,530 bytes in correct location ✅

### **✅ CORRECT DIRECTORY STRUCTURE:**
- **Source**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/` ✅
- **Target**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/` ✅
- **Shell**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/shell/` ✅

### **✅ READY FOR NEXT OPERATIONS:**
- **Template**: Created and mandatory
- **Validation**: Checklist established
- **State**: Verified and correct
- **Enforcement**: Zero tolerance policy

---

**Status**: ✅ **CURRENT STATE CORRECT - TEMPLATE MANDATORY**  
**Enforcement**: ZERO TOLERANCE for path mistakes  
**Validation**: Required before and after every file operation  
**Next Operation**: Must follow this template exactly

**This template is MANDATORY for ALL future operations.** 