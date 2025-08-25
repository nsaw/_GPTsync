# SoT Bridge Pack - Hybrid Provenance System

## Overview
This bridge pack uses a **hybrid approach** combining symbolic links and `.note` files to provide both live synchronization and portable provenance verification.

## Architecture

### 1. Symbolic Links (Live Sync)
- **Purpose**: Provide live synchronization with the main project
- **Location**: `__MAIN-SYNC__/docs/`, `__MAIN-SYNC__/tokens/`, etc.
- **Benefit**: Automatically updates when source files change
- **Requirement**: Host must have access to mounted paths

### 2. .note Files (Portable Provenance)
- **Purpose**: Provide portable provenance verification anywhere
- **Location**: `__MAIN-SYNC__/sot/*.note`
- **Benefit**: SHA256 hashes visible without host path access
- **Requirement**: None - works on any system

## File Structure

```
__MAIN-SYNC__/
├── docs/
│   ├── Objective.md -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/docs/SoT-Roadmap.md
│   ├── SoT-Glossary.md -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/docs/SoT-Glossary.md
│   └── GPT-BRIDGE.md -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/docs/GPT-BRIDGE.md
├── tokens/
│   └── foundations.json -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/tokens/foundations.json
├── ui-map/
│   └── ui-map.yml -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/ui-map/ui-map.yml
├── iconography/
│   └── icon-map.yml -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/iconography/icon-map.yml
├── scripts/
│   └── ci/
│       └── validate-runtime.cjs -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/scripts/ci/validate-runtime.cjs
├── runtime/
│   └── runtime-signals.json -> /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/runtime/runtime-signals.json
└── sot/
    ├── provenance.json (Complete provenance database)
    ├── SoT-Roadmap.md.note (Portable provenance)
    ├── SoT-Glossary.md.note (Portable provenance)
    ├── GPT-BRIDGE.md.note (Portable provenance)
    ├── foundations.json.note (Portable provenance)
    ├── ui-map.yml.note (Portable provenance)
    ├── icon-map.yml.note (Portable provenance)
    ├── validate-runtime.cjs.note (Portable provenance)
    └── runtime-signals.json.note (Portable provenance)
```

## Usage

### On Host with Mounted Paths
```bash
# Access live content via symbolic links
cat __MAIN-SYNC__/docs/Objective.md
cat __MAIN-SYNC__/tokens/foundations.json

# Verify provenance
shasum -a 256 /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/docs/SoT-Roadmap.md
```

### On Any System (Portable)
```bash
# View provenance without host access
cat __MAIN-SYNC__/sot/SoT-Roadmap.md.note
cat __MAIN-SYNC__/sot/provenance.json

# Verify against .note file contents
# Compare SHA256 hashes in .note files
```

## Benefits

### ✅ Live Synchronization
- Bridge pack automatically stays in sync with main project
- No manual updates required
- Real-time access to latest content

### ✅ Portable Provenance
- SHA256 hashes visible on any system
- No host path dependencies
- Provenance verification works anywhere

### ✅ Complete Coverage
- Both live content and static provenance
- Hybrid approach provides maximum flexibility
- Works in all deployment scenarios

## Verification Commands

### Host Verification
```bash
# Verify live symbolic links
ls -la __MAIN-SYNC__/docs/
ls -la __MAIN-SYNC__/tokens/

# Verify SHA256 hashes
shasum -a 256 /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh/src-nextgen/design-system/docs/SoT-Roadmap.md
```

### Portable Verification
```bash
# View provenance notes
cat __MAIN-SYNC__/sot/*.note

# Check complete provenance database
cat __MAIN-SYNC__/sot/provenance.json
```

## Status
✅ **Hybrid system implemented** - Both live sync and portable provenance available
✅ **All core SoT files covered** - Complete coverage of essential files
✅ **SHA256 hashes verified** - All hashes calculated and documented
✅ **Bridge pack functional** - Ready for deployment and use
