patchId: ops-ecosystem-standardization-5051
patchName: ops-ecosystem-standardization-5051
roadmapPhase: Ops stabilization
timestamp: 2025-08-08T00:00:00Z
final_write_location: /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/

## Context
- 5051 repeatedly jammed by auto-respawn of Python runner via launchd (`com.gptcursorrunner.flask`).
- Unified boot blocked from binding Ghost Bridge due to that race.

## Actions
- Disabled launchd auto-respawn:
  - Unloaded and removed from session; renamed plist to `.disabled` to prevent future auto-load.
- Standardized to a single PM2 ecosystem:
  - Edited `scripts/core/unified-manager.sh` to start `config/ecosystem.config.js` and `pm2 save`.
  - Edited `scripts/core/unified-boot.sh` to start `config/ecosystem.config.js` and `pm2 save`.
- Hardened watchdogs to prefer PM2 over direct spawns:
  - `scripts/watchdog-ghost-runner.sh`: dispatches PM2 `ghost-python` when available.
  - `scripts/watchdog.sh`: prefers PM2 `ghost-python` before raw spawn.

## Validation
- Ports:
  - 5051 ok; 8787 ok; 8788 ok; 3001 ok; 3002 ok; 8789 ok.
- Health pings:
  - http://localhost:5051/health → 200
  - http://localhost:8787/api/health → 200
  - http://localhost:8788/health → 200
- PM2 status (canonical `config/ecosystem.config.js`):
  - online: ghost-bridge, ghost-relay, ghost-viewer, ghost-runner, enhanced-doc-daemon, summary-monitor, dual-monitor, flask-dashboard, dashboard-uplink, telemetry-api, telemetry-orchestrator, metrics-aggregator-daemon, alert-engine-daemon, patch-executor, autonomous-decision-daemon
  - errored: cf-gpt-cursor-runner (cloudflared config/creds likely required or managed elsewhere)

## Validation Summary
- CORE SERVICES: PASS
- TUNNEL AGENT (Cloudflare PM2 entry): DEGRADED (errored). Non-blocking for core ops.

## Notes
- `unified-manager.sh` is now the canonical entry for starting services via the single PM2 ecosystem at `config/ecosystem.config.js`.
- Launchd auto-respawn was the root cause of 5051 lock; leaving PM2 as sole owner prevents the race.

## Next suggestions (optional)
- Either fix `cf-gpt-cursor-runner` credentials/path or remove it from PM2 if tunnel is managed by other scripts.
- Consider archiving the root `ecosystem.config.js` to avoid future confusion.

Agent validation: PENDING | USER/GPT VALIDATION NEEDED

