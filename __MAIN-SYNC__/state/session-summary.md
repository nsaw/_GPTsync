# Session Summary - Comprehensive Report

## Mission / North Star
- Ship NextGen as a ground-up rebuild, not a migration
- Legacy is never shipped; it exists only as a behavioral baseline inside a dual-shell for side-by-side parity while we build NextGen
- Design goals: dark, compact, clean, modern, glass-morphism; persistent bottom nav + integrated FAB as a single control; reduced saturation with clear visual hierarchy; SVG icon set (Lucide first with Ionicons only where Lucide lacks a match)
- Source-of-Truth (SoT) controls appearance/structure; components are thin; we tweak YAML/tokens/semantics to change UI, not component code

## Why rebuild (not fix Legacy)
- Legacy styling is fundamentally broken and unshippable from a UX standpoint: inconsistent tokens, unclear hierarchy, ambiguous patterns
- "Migration" thinking caused churn; rebuild gives a principled architecture and lexicon

## Architecture: SoT → Runtime
- Foundations (tokens) → Semantics (contextual roles per screen type) → Recipes (how each component consumes semantics) → UI Map (ui-map.yml) → Runtime loader (SoTProvider + renderNode)
- Contexts: dashboard, compose, detail, search, bins
- Components include: tm.nav.tabbar.fab-integrated, tm.card.*, tm.field.*, tm.chip.tag, tm.list.*, tm.section, tm.toolbar.editor, etc.
- Icon policy: Lucide default; use Ionicons only when explicitly specified (kept in icon-map.yml)

## Styling Direction (dark, compact, glass)
- Palette: low-saturation neutrals; restrained accents (primary used for focus rings/links/FAB halo)
- Type scale: compact; line-height tuned for density
- Glass: blur (12–18), subtle strokes, occasional noise to avoid banding
- Bottom nav + FAB: integrated, glass-blurred, elevated, scroll-aware, consistent across screens

## What exists now (in repo)
- Docs: SoT-Roadmap, SoT-Glossary, Foundations/Semantics/Recipes overviews
- Data: foundations.json, semantics per context (semantics/*.ts), component recipes (recipes/*.ts), icon-map.yml, and ui-map.yml with defined screens/sections/components
- Gap: ui-map.yml lacks legacySpec.compareWith entries → add absolute pointers to Legacy files for automated behavior parity checks
- Gap: Minimal runtime (SoTProvider, renderNode) still needed to hydrate UI Map into screens

## Runtime validation & loop
- Keep /scripts/ci/validate-runtime.cjs (the comprehensive version) as the single source of truth for boot correctness (TS → ESLint → Expo start under NB2.0 → parse logs)
- Signals in runtime-signals.json drive bundle detection, fatal error detection, and entry hints
- Loop (refresh-fix-loop.thoughtful.v3.2.cjs) is now fixed to loop once, emit intelligent error manifests, and pause for agent fixes (instead of running "until-pass" blindly)
- Invoke controller guides manual/surgical fixes between iterations

## Guardrails & fixes we rely on
- Anti-mock guard: prevents "fixes" that replace real screens with simplified mock components
- Type alias: HeadersInit lives only at /src-reference/types/global.d.ts (guard script enforces this)
- Auth "component not registered" class of errors: solved with entry/app/auth aliases and thin re-export files (e.g., SignInScreen.tsx re-exporting SignIn when filenames differ)
- Expo NB2.0 expectations: port 8081 hygiene; clear caches when needed; absolute paths for all scripts; do not bulldoze validate-runtime.cjs

## Immediate, high-value next steps
1. Augment ui-map.yml with legacySpec.compareWith (absolute paths into src-reference/...) for each screen/major section
2. Add/confirm palette in tokens; ensure semantics import palette instead of embedding raw hex values
3. Implement SoT runtime (very small layer): SoTProvider, useSemantics, renderNode. Wire Compose first, then Dashboard
4. Pin icon choices (Lucide vs Ionicon) in icon-map.yml for nav/FAB and top surfaces
5. (After screens hydrate) Add behavior-parity checks: compare NextGen outputs/events to Legacy's for the same inputs (headless, not UI)
6. Continue using the once-and-pause loop + validator to surface genuine app errors for surgical fixes (auth registration, AsyncStorage warning handling, etc.)

## Current Status
- Bridge pack creation in progress
- Symbolic links established for live synchronization
- Core SoT files linked and accessible
- Runtime validation framework preserved
- Guardrails and safety mechanisms in place

## Next Actions
- Complete bridge pack structure
- Push to Git repository
- Establish validation workflow
- Begin runtime implementation phase
