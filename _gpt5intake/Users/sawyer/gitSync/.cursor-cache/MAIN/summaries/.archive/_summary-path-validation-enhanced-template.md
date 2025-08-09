# 🛡️ **ENHANCED PATH VALIDATION TEMPLATE - MANDATORY**

**CRITICAL**: This template must be followed for ALL file operations to prevent path mistakes.

---

## 🚨 **LOCK FILE REQUIREMENT**

### **MANDATORY PRE-OPERATION CHECK**
```bash
# 1. READ LOCK FILE FIRST
cat /Users/sawyer/gitSync/tm-mobile-cursor/.FORBIDDEN_SRC_LOCK

# 2. VERIFY NO FORBIDDEN DIRECTORIES EXIST
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/ | grep -E "(src|src-nextgen|src-reference)"

# 3. VERIFY WORKING DIRECTORY
pwd
# MUST BE: /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh
```

---

## 📍 **ABSOLUTE PATH REQUIREMENTS**

### **✅ CORRECT TARGET LOCATIONS**
- **Source (Legacy)**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/`
- **Target (NextGen)**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/`
- **Project Root**: `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`
- **Unified Summaries**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/` (MANDATORY)

### **❌ FORBIDDEN LOCATIONS (LOCK FILE PROTECTED)**
- `/Users/sawyer/gitSync/tm-mobile-cursor/src/` (WRONG - project root)
- `/Users/sawyer/gitSync/tm-mobile-cursor/src-nextgen/` (WRONG - project root)
- `/Users/sawyer/gitSync/tm-mobile-cursor/src-reference/` (WRONG - project root)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/summaries/` (WRONG - project-specific)
- `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/tasks/summaries/` (WRONG - project-specific)
- Any relative paths without absolute verification

---

## 🔍 **MANDATORY PRE-OPERATION VALIDATION CHECKLIST**

### **Before ANY file operation:**
1. **Read lock file**: `cat /Users/sawyer/gitSync/tm-mobile-cursor/.FORBIDDEN_SRC_LOCK`
2. **Verify no forbidden directories**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/ | grep -E "(src|src-nextgen|src-reference)"`
3. **Verify source exists**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[path]`
4. **Verify target directory**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/`
5. **Confirm working directory**: `pwd` (must be `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`)
6. **Validate absolute paths**: All paths must start with `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`

### **Before creating ANY file:**
1. **Check if directory exists**: `mkdir -p /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]`
2. **Verify creation**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]`
3. **Confirm file location**: `ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]`

### **Before creating ANY summary:**
1. **Verify unified location**: `ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`
2. **Use absolute path**: `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[name].md`
3. **Follow naming convention**: `summary-[description].md`
4. **Verify creation**: `ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[name].md`

---

## 📋 **MANDATORY OPERATION TEMPLATE**

### **For File Migration:**
```bash
# 1. READ LOCK FILE
cat /Users/sawyer/gitSync/tm-mobile-cursor/.FORBIDDEN_SRC_LOCK

# 2. VERIFY NO FORBIDDEN DIRECTORIES
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/ | grep -E "(src|src-nextgen|src-reference)"

# 3. VERIFY SOURCE EXISTS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-path]"

# 4. VERIFY TARGET DIRECTORY
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"

# 5. COPY FILE WITH ABSOLUTE PATHS
cp "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/[source-file]" \
   "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"

# 6. VERIFY COPY SUCCESS
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"
```

### **For File Creation:**
```bash
# 1. READ LOCK FILE
cat /Users/sawyer/gitSync/tm-mobile-cursor/.FORBIDDEN_SRC_LOCK

# 2. VERIFY NO FORBIDDEN DIRECTORIES
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/ | grep -E "(src|src-nextgen|src-reference)"

# 3. VERIFY TARGET DIRECTORY EXISTS
mkdir -p "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-dir]"

# 4. CREATE FILE WITH ABSOLUTE PATH
touch "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"

# 5. VERIFY CREATION
ls -la "/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/[target-file]"
```

### **For Summary Creation:**
```bash
# 1. VERIFY UNIFIED LOCATION
ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/

# 2. CREATE SUMMARY IN UNIFIED LOCATION
touch "/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"

# 3. VERIFY CREATION
ls -la "/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"
```

---

## 🚨 **CRITICAL ERROR PREVENTION RULES**

### **NEVER DO:**
- Skip reading the lock file
- Use relative paths without absolute verification
- Create files in `/Users/sawyer/gitSync/tm-mobile-cursor/src/` (WRONG - project root)
- Create files in `/Users/sawyer/gitSync/tm-mobile-cursor/src-nextgen/` (WRONG - project root)
- Create files in `/Users/sawyer/gitSync/tm-mobile-cursor/src-reference/` (WRONG - project root)
- Create summaries in project-specific locations (WRONG)
- Assume directory structure exists
- Skip path validation steps

### **ALWAYS DO:**
- Read the lock file first
- Use absolute paths starting with `/Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/`
- Create summaries in `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/` only
- Verify source files exist before copying
- Create target directories before file operations
- Verify file creation/placement after operations
- Use `ls -la` to confirm file locations
- Follow the validation checklist before every operation

---

## 📊 **VALIDATION COMMANDS**

### **Quick Path Validation:**
```bash
# Read lock file
cat /Users/sawyer/gitSync/tm-mobile-cursor/.FORBIDDEN_SRC_LOCK

# Verify no forbidden directories
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/ | grep -E "(src|src-nextgen|src-reference)"

# Verify project structure
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/

# Verify source directory
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-reference/

# Verify target directory
ls -la /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/

# Verify unified summaries location
ls -la /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/

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

### **Summary Creation Validation:**
```bash
# Before summary creation
echo "Summary: /Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"

# After summary creation
ls -la "/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/summary-[description].md"
```

---

## 🎯 **TEMPLATE USAGE**

### **Before ANY patch execution:**
1. **Read lock file completely**
2. **Read this template completely**
3. **Follow validation checklist**
4. **Use absolute paths only**
5. **Verify each operation**
6. **Confirm file placement**

### **Before ANY summary creation:**
1. **Verify unified location exists**
2. **Use absolute path for summary**
3. **Follow naming convention**
4. **Verify summary creation**

### **After ANY file operation:**
1. **Verify file exists in correct location**
2. **Check file permissions and size**
3. **Confirm no files created in wrong locations**
4. **Document operation in unified summary location**

---

## 🚨 **LOCK FILE ENFORCEMENT**

### **Lock File Location:**
- `/Users/sawyer/gitSync/tm-mobile-cursor/.FORBIDDEN_SRC_LOCK`

### **Lock File Purpose:**
- Prevents creation of forbidden src/ directories
- Documents correct vs incorrect paths
- Enforces absolute path usage
- Provides clear error prevention rules

### **Lock File Requirements:**
- **MANDATORY**: Read before any file operation
- **MANDATORY**: Follow all rules listed in lock file
- **MANDATORY**: Verify no forbidden directories exist
- **MANDATORY**: Use absolute paths only

---

## 🚨 **UNIFIED SUMMARY LOCATION ENFORCEMENT**

### **Unified Location:**
- `/Users/sawyer/gitSync/.cursor-cache/MAIN/summaries/`

### **Unified Location Purpose:**
- Centralizes all summaries in one location
- Prevents summary scattering across projects
- Enables consistent summary management
- Provides clear summary organization

### **Unified Location Requirements:**
- **MANDATORY**: All summaries must be in unified location
- **MANDATORY**: Use absolute path for summary creation
- **MANDATORY**: Follow naming convention: `summary-[description].md`
- **MANDATORY**: Verify summary creation after writing

---

**Status**: ✅ **MANDATORY FOR ALL OPERATIONS**  
**Enforcement**: ZERO TOLERANCE for path mistakes  
**Lock File**: Required reading before any operation  
**Unified Summaries**: Required location for all summaries  
**Validation**: Required before and after every file operation  
**Maintainer**: AI Assistant (Cursor/GPT coordination)

**This template and lock file must be followed for ALL future operations.** 