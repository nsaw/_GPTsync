# ✅ **CURSOR RULE CREATED: FREEZER BACKUP STANDARDS**

**Generated**: 2025-01-27T16:05:00.000Z  
**Agent**: BRAUN (Cursor Rule Generation)  
**Status**: SUCCESS - Rule Created and Applied  
**Scope**: Freezer backup operations standardization

---

## 🎯 **RULE CREATED**

### **File**: `.cursor/rules/freezer-backup-standards.mdc`
- **Always Apply**: ✅ `true`
- **Description**: Freezer backup operations must use standardized tar exclusion patterns and backup location

---

## 📋 **RULE CONTENT SUMMARY**

### **Backup Location Standardization**
- **Required Path**: `/Users/sawyer/gitSync/_backups/tm-safety_backups/`
- **Naming Convention**: `YYMMDD_UTC_vX.X.X_description.tar.gz`

### **Tar Exclusion Patterns**
The rule enforces exclusion of:

#### **System Files**
- `.DS_Store`, `.AppleDouble`, `.LSOverride`
- `Thumbs.db`, `Desktop.ini`

#### **Development Dependencies**
- `node_modules/`, `.expo/`, `.expo-shared/`
- `web-build/`, `.venv/`

#### **Environment & Secrets**
- `.env`, `.env.local`
- `cursor-uploads/client_secret_*.json`

#### **Logs & Debug Files**
- `npm-debug.log*`, `yarn-debug.log*`, `yarn-error.log*`
- `*.log`

#### **Version Control & Archives**
- `.git/`, `.backup/`, `archive/`
- `ios-bak/`, `ios/`

---

## 🔧 **COMMAND TEMPLATES PROVIDED**

### **Standard Backup Command**
```bash
tar -cvzf /Users/sawyer/gitSync/_backups/tm-safety_backups/YYMMDD_UTC_vX.X.X_description.tar.gz \
  --exclude=.DS_Store \
  --exclude=.AppleDouble \
  --exclude=.LSOverride \
  --exclude=Thumbs.db \
  --exclude=Desktop.ini \
  --exclude=node_modules/ \
  --exclude=.expo/ \
  --exclude=.expo-shared/ \
  --exclude=web-build/ \
  --exclude=.env \
  --exclude=.env.local \
  --exclude=npm-debug.log* \
  --exclude=yarn-debug.log* \
  --exclude=yarn-error.log* \
  --exclude=cursor-uploads/client_secret_*.json \
  --exclude=.backup/ \
  --exclude=archive/ \
  --exclude=ios-bak/ \
  --exclude=*.log \
  --exclude=.git/ \
  --exclude=.venv/ \
  --exclude=ios/ \
  /Users/sawyer/gitSync/tm-mobile-cursor
```

### **Dynamic .tarignore Support**
```bash
tar -cvzf /Users/sawyer/gitSync/_backups/tm-safety_backups/YYMMDD_UTC_vX.X.X_description.tar.gz \
  $(grep -vE '^\s*(#|$)' /Users/sawyer/gitSync/tm-mobile-cursor/.tarignore | sed 's/^/--exclude=/') \
  /Users/sawyer/gitSync/tm-mobile-cursor
```

---

## ✅ **VALIDATION REQUIREMENTS**

The rule enforces:
- ✅ All backups must exclude the specified patterns
- ✅ Backup location must be `/Users/sawyer/gitSync/_backups/tm-safety_backups/`
- ✅ Filename must follow the naming convention
- ✅ Backup must be compressed with gzip
- ✅ Backup must include verbose output for verification

---

## 🎯 **IMPACT**

### **Benefits**
1. **Consistent Backups**: All freezer backups will follow the same pattern
2. **Security**: Sensitive files and secrets are automatically excluded
3. **Efficiency**: Large dependency directories are excluded to reduce backup size
4. **Compliance**: Enforces proper backup location and naming conventions

### **Examples**
- `240728_UTC_v1.4.417_phase2-clean.tar.gz`
- `240728_UTC_v1.4.418_emergency-backup.tar.gz`
- `240728_UTC_v1.4.419_pre-merge-backup.tar.gz`

---

**Status**: ✅ **RULE CREATED AND APPLIED** - Freezer backup standards now enforced  
**Location**: `/Users/sawyer/gitSync/tm-mobile-cursor/.cursor/rules/freezer-backup-standards.mdc`  
**Effect**: All future backup operations will follow these standards automatically 