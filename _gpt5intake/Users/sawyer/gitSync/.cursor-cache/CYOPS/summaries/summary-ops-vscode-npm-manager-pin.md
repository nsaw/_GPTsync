patch-id: ops-vscode-npm-manager-pin
patchName: ops-vscode-npm-manager-pin
phase: Ops/Tooling
timestamp: 2025-08-02T00:00:00Z

What changed
- Added workspace settings to `gpt-cursor-runner/.vscode/settings.json` to pin VS Code's npm extension to use npm instead of auto-detecting.

Files modified
- `/Users/sawyer/gitSync/gpt-cursor-runner/.vscode/settings.json`

Details
- Set `"npm.packageManager": "npm"` and `"npm.scriptRunner": "npm"`.
- Rationale: The npm extension warned about multiple lockfiles. A scan found exactly one lockfile in `gpt-cursor-runner` (`package-lock.json`). Pinning the package manager removes the warning without destructive lockfile deletions.

Validation
- Repository scan: only `package-lock.json` present under `/Users/sawyer/gitSync/gpt-cursor-runner`.
- No code changes; build/tests not applicable.
- User action: reload VS Code window to apply workspace settings.

Agent status
- Agent validation: PENDING (awaiting confirmation the notification no longer appears after reload)

Final location
- This summary should remain in `CYOPS/summaries/` until user confirms; then may be moved to `.completed/` by automation.

