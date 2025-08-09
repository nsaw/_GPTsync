# Slack Integration Audit — CYOPS

Timestamp (UTC): 2025-08-08T05:12:00Z
Agent: DEV (CYOPS)
Agent validation: PENDING

## Scope
- Audit Slack manifest, handlers, endpoints, Cloudflare tunnel, Fly deployment, and health.

## Findings
- Manifest: `/Users/sawyer/gitSync/gpt-cursor-runner/config/slack-app-manifest-v2.yaml` points all slash commands, events, and interactions to `https://slack.thoughtmarks.app` paths.
- Cloudflare: `~/.cloudflared/config.yml` currently routes `slack.thoughtmarks.app` to `http://localhost:5051` (local only). No Fly primary or failover chain is configured here. This blocks Slack from reaching the handlers when local is down → likely cause of `dispatch_failed`.
- Flask app: Added first-class routes in `gpt_cursor_runner/main.py` for `/slack/commands`, `/slack/events`, `/slack/interactions` with correct HMAC verification against raw body and form-encoded parsing. Lint clean.
- Node duplicates: `server/index.js` also mounts `slack/webhook-thoughtmarks-commands.js` on the Node process (5052). CF is not routing to 5052, so this is currently unused for Slack ingress.
- Fly: Logs show repeated crashes previously due to missing import. Fixed by ensuring `handle_slack_event` exists and is imported. Redeploy attempted; machines presently `stopped` with health warning. Logs show prior boot waiting on port 5555 which conflicts with root `fly.toml` (5051). A second `deployment/fly.toml` exists with 5555; risk of config drift.
- Secrets: Fly has Slack secrets including `SLACK_SIGNING_SECRET`, `SLACK_BOT_TOKEN`, etc. A `PORT` secret exists (value unknown) which can override Flask port.

## Evidence (snippets)
- Fly logs (import error pre-fix):
  - ImportError: cannot import name 'handle_slack_event' (now resolved locally; redeploy pending)
- Health probes (external):
  - slack CF /health not reachable
  - dashboard api status unreachable
  - fly health fail
  - CF /slack/commands no response

## Root Causes
1) Cloudflare routes Slack host to localhost:5051 only → Slack cannot reach when local is not running / not exposed. No primary → Fly mapping or failover chain implemented in CF config.
2) Fly deployment instability and config drift (5555 vs 5051) + potential `PORT` secret mismatch.
3) Prior absence of Flask `/slack/commands` route for form-encoded slash commands. Implemented now.

## Changes Made
- Implemented `/slack/commands`, `/slack/events`, `/slack/interactions` in `gpt_cursor_runner/main.py` with raw-body HMAC verification and form parsing.
- Ensured `handle_slack_event` present in `gpt_cursor_runner/slack_handler.py`.
- Lint clean for modified files.

## Required Remediations
1) Cloudflare tunnel config:
   - Update `~/.cloudflared/config.yml` ingress for `slack.thoughtmarks.app` to point to Fly primary: `service: https://gpt-cursor-runner.fly.dev` and (optionally) add a second ingress hostname for DEV tunnel and keep localhost as tertiary. CF tunnels don’t natively failover by multiple services on the same hostname; consider CF Load Balancer if true failover is required.
2) Fly config consistency:
   - Use root `fly.toml` with `internal_port = 5051` only; remove `deployment/fly.toml` or ensure deploy uses the root.
   - Unset or set `PORT` secret to `5051` to avoid 5555 drift.
   - Keep `min_machines_running = 1` to reduce cold-start dispatch failures.
3) Health & tests:
   - After CF and Fly fixes, re-run external probes for:
     - `https://slack.thoughtmarks.app/slack/commands` (POST form `/dashboard`)
     - `https://gpt-cursor-runner.fly.dev/health`
     - Playwright dashboard test (`yarn test:dashboard`).

## Next Actions (needs approval for environment changes)
- Update CF config and restart tunnel.
- Normalize Fly to 5051 and redeploy; verify `/health` green.
- Confirm Slack slash commands return 200 within 3s end-to-end.

## Validation Status
- Current status: FAIL (endpoints unreachable externally; Fly machines stopped)
- Will re-validate after CF + Fly changes.

## Logs
- /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/.logs/health-checks.log
- /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/.logs/fly-status*.log
- /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/.logs/fly-logs.log

Final file location: /Users/sawyer/gitSync/.cursor-cache/CYOPS/summaries/summary-slack-audit-2025-08-08.md

