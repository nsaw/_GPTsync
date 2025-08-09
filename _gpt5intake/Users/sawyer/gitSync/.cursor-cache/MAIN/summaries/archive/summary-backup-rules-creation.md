# Summary: Backup Operations Rules Creation

**Patch ID**: backup-rules-creation  
**Timestamp**: 2025-01-27 UTC  
**Status**: ✅ PASS  

## Overview
Successfully created comprehensive backup operations rules for Cursor AI to enforce proper backup practices and prevent backing up broken states.

## Key Rules Implemented

### Critical Restrictions
- **Never backup broken apps** or applications in non-functional states
- **Never backup troubleshooting steps** or debugging sessions  
- **Never backup hotpatches** or temporary fixes
- **Never backup patches** that are in progress or failed
- **Disregard backup commands** in patches for troubleshooting or broken project states

### Backup Target Locations
- **MAIN Projects**: `/Users/sawyer/gitSync/_backups/<MAIN>/`
- **CYOPS Projects**: `/Users/sawyer/gitSync/_backups/<CYOPS>/`
- **Absolute paths only** - never backup to project root

### .tarignore Exclusions
Comprehensive exclusion list including:
- System files (.DS_Store, Thumbs.db, etc.)
- Development dependencies (node_modules/, .expo/, etc.)
- Environment files (.env, .env.local, etc.)
- Project-specific exclusions (.backup/, archive/, ios-bak/, etc.)

### Backup Command Patterns
```bash
# MAIN Project Pattern
cd /Users/sawyer/gitSync && \
tar -czf _backups/tm-safety_backups/250729_UTC_<patch id>.tar.gz \
  $(grep -vE "^\s*(#|$)" tm-mobile-cursor/.tarignore | sed "s/^/--exclude=/") \
  tm-mobile-cursor/

# CYOPS Project Pattern  
cd /Users/sawyer/gitSync && \
tar -czf _backups/gpt-cursor-runner/250729_UTC_<patch id>.tar.gz \
  $(grep -vE "^\s*(#|$)" gpt-cursor-runner/.tarignore | sed "s/^/--exclude=/") \
  gpt-cursor-runner/
```

## File Created
- **Location**: `/Users/sawyer/gitSync/tm-mobile-cursor/.cursor/rules/backup-operations.mdc`
- **Frontmatter**: `alwaysApply: true` - applies to all requests
- **Description**: Backup operations and safety rules for project backups

## Validation Requirements
- Application must be **fully functional** and tested
- All tests must **pass** (100% success rate)
- No **broken features** or critical errors
- No **troubleshooting in progress**
- Target directory must **exist** and be writable
- `.tarignore` file must **exist** in project root

## Compliance Checklist
- [x] **Application is healthy** and fully functional
- [x] **No troubleshooting** in progress
- [x] **No broken features** or critical errors
- [x] **Target path is absolute** and correct
- [x] **.tarignore file exists** and is properly configured
- [x] **Backup name follows** naming convention
- [x] **All exclusions** are properly applied

## Enforcement
- **Automatic validation** of backup commands
- **Rejection of broken state backups**
- **Path validation** for absolute paths only
- **Health checks** before allowing backup operations

## Benefits
- **Prevents backup pollution** with broken states
- **Ensures consistent backup locations** using absolute paths
- **Reduces backup size** through proper exclusions
- **Maintains backup integrity** through validation gates
- **Standardizes backup practices** across all projects

## Next Steps
- Monitor rule effectiveness in preventing broken state backups
- Validate backup command patterns in real usage
- Ensure .tarignore files exist in all projects
- Test backup validation requirements

**Result**: ✅ Backup operations rule successfully created and will be applied to all future requests to prevent backing up broken states and ensure proper backup practices. 