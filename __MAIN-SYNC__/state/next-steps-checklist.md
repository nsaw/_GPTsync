# Next Steps Checklist

## Immediate Actions (High Priority)

### 1. Complete Bridge Pack Structure
- [x] Create symbolic links for live synchronization
- [x] Link core SoT files (foundations, semantics, recipes, ui-map)
- [x] Link runtime validation files
- [x] Link guard files
- [ ] Create missing fixloop.invoke.cjs.freeze
- [ ] Create legacy-map/compareWith-index.yml
- [ ] Push to Git repository

### 2. Augment UI Map with Legacy Specs
- [ ] Add legacySpec.compareWith entries to ui-map.yml
- [ ] Map each NextGen screen to Legacy counterpart
- [ ] Enable automated behavior parity checks
- [ ] Create legacy-map/compareWith-index.yml for quick reference

### 3. Implement SoT Runtime (Minimal Layer)
- [ ] Create SoTProvider with design system context
- [ ] Implement useSemantics hook for contextual token resolution
- [ ] Build renderNode function for UI Map hydration
- [ ] Wire Compose screen first for validation

### 4. Pin Icon Choices
- [ ] Finalize Lucide vs Ionicon decisions in icon-map.yml
- [ ] Focus on nav/FAB and top surfaces
- [ ] Document icon policy decisions

## Medium Priority

### 5. Behavior Parity Validation
- [ ] Implement behavior parity checks
- [ ] Compare NextGen outputs/events to Legacy
- [ ] Ensure exact functional equivalence
- [ ] Create headless validation tests

### 6. Runtime Validation Loop
- [ ] Use validate-runtime.cjs as single source of truth
- [ ] Implement refresh-fix-loop.thoughtful.v3.2.cjs
- [ ] Run once, emit error manifests, pause for fixes
- [ ] Avoid "run until pass" blind loops

### 7. Guardrails & Safety
- [ ] Deploy anti-mock guard (no-mock-regression.cjs)
- [ ] Enforce HeadersInit type alias location
- [ ] Implement auth component registration fixes
- [ ] Ensure Expo NB2.0 compliance

## Long-term Goals

### 8. Production Readiness
- [ ] Performance optimization
- [ ] Accessibility compliance
- [ ] Cross-platform testing
- [ ] Production deployment

### 9. Documentation & Knowledge Transfer
- [ ] Update SoT documentation
- [ ] Create developer onboarding guides
- [ ] Document architecture decisions
- [ ] Share knowledge with team

## Success Criteria

### Runtime Implementation
- [ ] All screens hydrate from UI Map successfully
- [ ] SoTProvider provides design system context
- [ ] useSemantics resolves contextual tokens
- [ ] renderNode hydrates UI Map into components

### Validation & Quality
- [ ] Behavior parity with Legacy confirmed
- [ ] Performance meets or exceeds Legacy
- [ ] Design system consistency maintained
- [ ] Runtime validation passes consistently

### Architecture Integrity
- [ ] SoT controls appearance/structure
- [ ] Components remain thin wrappers
- [ ] YAML/tokens/semantics drive UI changes
- [ ] Clean separation of concerns maintained
