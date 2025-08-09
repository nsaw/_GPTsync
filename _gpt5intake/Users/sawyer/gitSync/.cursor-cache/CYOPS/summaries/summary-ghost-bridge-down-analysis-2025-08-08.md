# Ghost Bridge Downtime Analysis (CYOPS)

- id: ghost-bridge-down-analysis-2025-08-08
- phase: ops/investigation
- patchName: n/a
- when: 2025-08-08T00:00:00Z (approx)
- location: /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/summary-ghost-bridge-down-analysis-2025-08-08.md
- Agent validation: PENDING

## What happened
- Ghost Bridge health checks at `http://localhost:5051/health` intermittently failed during unified boot and afterwards.

## Evidence (selected)
- Unified boot log shows repeated Ghost Bridge health failures:
  - /Users/sawyer/gitSync/.cursor-cache/ROOT/.logs/unified-boot.log → lines around events at 18:23 and 20:53 UTC show `❌ Ghost Bridge health check failed`.
- PM2 status shows `ghost-bridge` (Node) online, but no service bound on 5051 without the Python runner:
  - Root PM2 config used by boot lacks `ghost-python`; `config/ecosystem.config.js` defines `ghost-python` (PORT 5051).
- `ghost-bridge-status.json` reports "running" because it’s written by the Node bridge process, not by the 5051 HTTP service.

## Root causes
1) Config drift: unified boot starts PM2 with root `ecosystem.config.js` (no `ghost-python`), while health checks expect a 5051 HTTP service (provided by `gpt_cursor_runner/main.py` when run as pm2 `ghost-python`).
2) Health gating is non-blocking and always returns success, so boot proceeds even when 5051 is down.
3) Watchdogs are not persistently supervising 5051. `ghost-bridge-watchdog.sh` monitors the Node bridge process (which stayed up) rather than the port/HTTP health. `unified-manager-watchdog` instances in logs appear one-shot and exit.

## Answers to the user’s questions
- Why down? 5051 wasn’t started because the Python runner wasn’t launched by the booted PM2 config.
- Why not started during boot? Boot calls `pm2 start ecosystem.config.js` at repo root; that file doesn’t include `ghost-python`.
- Why allowed to stay down? Health checks don’t gate boot (non-blocking), and watchdogs weren’t actively supervising the 5051 service.

## Immediate remediation (low-risk)
- Start the 5051 service via PM2: add `ghost-python` to the root `ecosystem.config.js` or switch boot to use `config/ecosystem.config.js`.
- Ensure a persistent watchdog checks `http://localhost:5051/health` and restarts the correct process (python) when failing.

## Hardening follow-ups
- Remove duplicated PM2 configs or unify them; standardize logs to ROOT/.logs.
- Make boot health checks fail-fast (or retry + gate) for mandatory services.
- Ensure watchdog loops are long-running and supervised.

## Status
- Validation: PENDING. Needs confirmation after starting `ghost-python` under PM2 and verifying `GET /health` on 5051.

## Edits applied
- Root PM2 config now:
  - switches `ghost-bridge` to `/Users/sawyer/gitSync/gpt-cursor-runner/scripts/core/ghost-bridge.js`
  - adds `ghost-python` (Flask on 5051)
  - adds `unified-manager-watchdog` as a PM2-managed process
- Next step to reload:
  - Run (non-blocking): `{ pm2 reload /Users/sawyer/gitSync/gpt-cursor-runner/ecosystem.config.js & } >/dev/null 2>&1 & disown`
  - Then validate: `/Users/sawyer/gitSync/gpt-cursor-runner/scripts/core/validate-all.sh start`
