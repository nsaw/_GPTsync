Patch ID: watchdogs-hardened-nonblocking-timeout-disown
patchName: watchdogs-hardened-nonblocking-timeout-disown
Roadmap: Phase - Tunnel/Service Resilience

Status: VALIDATION_IN_PROGRESS
Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)

Changes:
- Hardened watchdogs to use mandatory non-blocking patterns with timeout + disown, subshells for every terminal command.
- Added timeout resolver (timeout/gtimeout) and nb() helper where missing.
- Converted curl health checks to mandated subshell + PID capture with disown while preserving synchronous result via temp files.
- Unified PM2 calls to dispatch via nb() and removed blocking waits.
- Updated unified-manager.sh sed/pkill operations to nb() to avoid blocking.

Files Edited:
- scripts/watchdogs/unified-manager-watchdog.sh
- scripts/watchdogs/flask-watchdog.sh
- scripts/watchdogs/ghost-bridge-watchdog.sh
- scripts/watchdogs/system-health-watchdog.sh
- scripts/watchdogs/fly-watchdog.sh
- scripts/watchdogs/fly-status-watchdog.sh
- scripts/watchdogs/metrics-aggregator-daemon-watchdog.sh
- scripts/watchdogs/telemetry-orchestrator-daemon-watchdog.sh
- scripts/watchdogs/enhanced-doc-daemon-watchdog.sh
- scripts/watchdogs/consolidated-watchdog.sh
- scripts/watchdogs/ghost-runner-watchdog.sh
- scripts/watchdogs/patch-executor-watchdog.sh
- scripts/core/unified-manager.sh (sed/pkill now non-blocking)

Validation:
- Shell syntax: bash -n passed on all edited watchdog scripts.
- Lint: No linter errors reported on targeted files.
- Pending: Live dry-runs and service health checks (curl endpoints) to be executed manually per rules.

Validation Gates:
- enforceValidationGate: true
- strictRuntimeAudit: true
- runDryCheck: true
- forceRuntimeTrace: true
- requireMutationProof: true
- requireServiceUptime: true

Next Steps:
- Manual health verification of 5051, 8787, 8788 and tunnels.
- Run unified validation script and capture logs.

Agent validation: PENDING | Awaiting live state confirmation from dashboard/user.

Final write location: /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/

