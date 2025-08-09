# 🛡️ **MANDATORY PATH VALIDATION TEMPLATE**

**CRITICAL**: This template must be followed for ALL file operations to prevent path mistakes.

---

## 📍 **ABSOLUTE PATH REQUIREMENTS**

### **CORRECT TARGET LOCATIONS**
- **Source (Legacy)**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/`
- **Target (NextGen)**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/`
- **Project Root**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`

### **❌ FORBIDDEN LOCATIONS**
- `/Users/sawyer/gitSync/tm-mobile-cursor/src-nextgen/` (WRONG - project root)
- `/Users/sawyer/gitSync/tm-mobile-cursor/src-reference/` (WRONG - project root)
- Any relative paths without absolute verification

---

## 🔍 **PRE-OPERATION VALIDATION CHECKLIST**

### **Before ANY file operation:**
1. **Verify source exists**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[path]`
2. **Verify target directory**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/`
3. **Confirm working directory**: `pwd` (must be `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`)
4. **Validate absolute paths**: All paths must start with `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`

### **Before creating ANY file:**
1. **Check if directory exists**: `mkdir -p /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]`
2. **Verify creation**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]`
3. **Confirm file location**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]`

---

## 📋 **MANDATORY OPERATION TEMPLATE**

### **For File Migration:**
```bash
# 1. VERIFY SOURCE EXISTS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-path]"

# 2. VERIFY TARGET DIRECTORY
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"

# 3. COPY FILE WITH ABSOLUTE PATHS
cp "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-file]" \
   "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"

# 4. VERIFY COPY SUCCESS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"
```

### **For File Creation:**
```bash
# 1. VERIFY TARGET DIRECTORY EXISTS
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"

# 2. CREATE FILE WITH ABSOLUTE PATH
touch "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"

# 3. VERIFY CREATION
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"
```

---

## 🚨 **ERROR PREVENTION RULES**

### **NEVER DO:**
- Use relative paths without absolute verification
- Create files in `/Users/sawyer/gitSync/tm-mobile-cursor/src-nextgen/` (wrong location)
- Assume directory structure exists
- Skip path validation steps

### **ALWAYS DO:**
- Use absolute paths starting with `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`
- Verify source files exist before copying
- Create target directories before file operations
- Verify file creation/placement after operations
- Use `ls -la` to confirm file locations

---

## 📊 **VALIDATION COMMANDS**

### **Quick Path Validation:**
```bash
# Verify project structure
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/

# Verify source directory
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/

# Verify target directory
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/

# Verify working directory
pwd
```

### **File Operation Validation:**
```bash
# Before operation
echo "Source: /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[file]"
echo "Target: /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[file]"

# After operation
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[file]"
```

---

## 🎯 **TEMPLATE USAGE**

### **Before ANY patch execution:**
1. **Read this template completely**
2. **Follow validation checklist**
3. **Use absolute paths only**
4. **Verify each operation**
5. **Confirm file placement**

### **After ANY file operation:**
1. **Verify file exists in correct location**
2. **Check file permissions and size**
3. **Confirm no files created in wrong locations**
4. **Document operation in summary**

---

**Status**: ✅ **MANDATORY FOR ALL OPERATIONS**  
**Enforcement**: ZERO TOLERANCE for path mistakes  
**Validation**: Required before and after every file operation  
**Maintainer**: AI Assistant (Cursor/GPT coordination)

**This template must be followed for ALL future operations.** 