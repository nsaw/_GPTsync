# MAIN-SYNC Bridge Pack

## Overview
This bridge pack provides persistent memory and Source-of-Truth (SoT) synchronization between the MAIN project and GPT. It contains live-linked references to the design system, runtime validation, and architectural documentation.

## Structure

### Live-Synced Files (Symbolic Links)
These files automatically stay in sync with the main project:

#### Design System Core
- `sot/foundations.json` → Design tokens and foundations
- `sot/icon-map.yml` → Icon mapping (Lucide-first with Ionicons fallback)
- `sot/ui-map.yml` → Screen structure and component composition
- `sot/semantics/` → Contextual design tokens (dashboard, compose, detail, search, bins)
- `sot/recipes/` → Component implementations (button, card, field, chip, nav)

#### Runtime Validation
- `runtime/validate-runtime.cjs.freeze` → Comprehensive runtime validator
- `runtime/runtime-signals.json` → Bundle detection and error signals
- `runtime/loop/refresh-fix-loop.thoughtful.v3.2.cjs.freeze` → Intelligent fix loop
- `runtime/loop/fixloop.invoke.cjs.freeze` → Invoke controller for manual fixes

#### Guards & Safety
- `guards/ts-headersinit-guard.cjs` → Type alias enforcement
- `guards/no-mock-regression.cjs` → Anti-mock component guard

#### Documentation
- `docs/Objective.md` → Mission and rebuild rationale
- `docs/SoT-Roadmap.md` → Implementation roadmap and phases
- `docs/SoT-Glossary.md` → Design system terminology
- `docs/GPT-BRIDGE.md` → Bridge pack specification

### Static Files (Created Here)
These files are created specifically for the bridge pack:

#### State & Status
- `state/session-summary.md` → Comprehensive project status
- `state/error-classes.md` → Known error patterns and resolutions
- `state/next-steps-checklist.md` → Immediate action items

#### Configuration
- `sot/palette.json` → Standardized color palette
- `sot-runtime/README.md` → Runtime architecture blueprint
- `legacy-map/compareWith-index.yml` → Legacy behavior parity mapping

#### Guards
- `guards/entry-auth-alias-notes.md` → Auth component registration guide

## Architecture

### SoT Flow
```
Foundations (tokens) 
    ↓
Semantics (contextual roles)
    ↓
Recipes (component implementations)
    ↓
UI Map (screen structure)
    ↓
Runtime (SoTProvider + renderNode)
    ↓
Rendered Screens
```

### Design Principles
- **Dark, compact, glass-morphism** design
- **Persistent bottom nav + integrated FAB** as single control
- **Reduced saturation** with clear visual hierarchy
- **Lucide-first** icon policy with Ionicons fallback
- **SoT controls appearance/structure**; components are thin wrappers

## Usage

### For GPT
- Reference live-synced files for current design system state
- Use static files for persistent knowledge and decision logs
- Follow error resolution patterns in error-classes.md
- Execute next steps from next-steps-checklist.md

### For Developers
- All changes to design system files automatically sync to bridge
- Runtime validation files preserve canonical versions
- Guard files prevent common regression patterns
- Legacy mapping enables behavior parity validation

## Validation

### Runtime Validation
- Use `validate-runtime.cjs.freeze` as single source of truth
- Run `refresh-fix-loop.thoughtful.v3.2.cjs.freeze` for intelligent error handling
- Follow once-and-pause pattern, not blind loops

### Guardrails
- `no-mock-regression.cjs` prevents simplified mock components
- `ts-headersinit-guard.cjs` enforces type alias locations
- Auth component registration patterns prevent registration errors

## Next Steps

### Immediate (High Priority)
1. Complete bridge pack structure
2. Augment ui-map.yml with legacySpec.compareWith entries
3. Implement SoT runtime (SoTProvider, useSemantics, renderNode)
4. Wire Compose screen first for validation

### Medium Priority
1. Pin icon choices in icon-map.yml
2. Implement behavior parity validation
3. Deploy guardrails and safety mechanisms

### Long-term
1. Production readiness optimization
2. Documentation and knowledge transfer
3. Cross-platform testing and validation

## Maintenance

### Updating Live Links
Symbolic links automatically stay in sync. If files are moved or renamed in the main project, update the links:

```bash
# Example: Update a moved file
rm __MAIN-SYNC__/sot/foundations.json
ln -sf /new/path/to/foundations.json __MAIN-SYNC__/sot/foundations.json
```

### Adding New Files
When adding new files to the bridge pack:
1. Use symbolic links for live-synced files
2. Create static files for bridge-specific content
3. Update this README with new file descriptions
4. Document any new patterns or guardrails

## Provenance

This bridge pack maintains provenance through:
- Symbolic links to source files
- Freeze copies of critical validation files
- Comprehensive state documentation
- Error pattern classification and resolution guides
