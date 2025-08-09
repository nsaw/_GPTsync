# G2o: Ghost Bridge → Operational (Roadmap, Guardrails, and Handoff)

This is a **complete, implementation-ready plan** for hardening, stabilizing, and operating the ghost-bridge pipeline. It tells DEV what to build, why it matters, how to validate it, and exactly how to roll it out safely.

---

## 1) Executive Summary

**Goal:** A resilient, auditable bridge that ingests signed commands, executes constrained mutations, and publishes results and diffs—without flapping, secret drift, or repo churn.

**Primary outcomes**

* **Deterministic flow**: `commands/ → execute → {results/, diffs/, archive/, dead_letter/} → publish`.
* **State isolation**: Transient control state in **`meta/`** only (no dotfile churn in `commands/`).
* **Strong integrity**: HMAC-validated commands, strict schema, deterministic replays.
* **Safe publishing**: Git add restricted to safe directories, exponential backoff with single-process lock.
* **First-class observability**: Path banner logs, integrity JSON, audit trails, smoke tests.

---

## 2) Current Architecture (Scope & Directories)

**Cloud root**: `/Users/sawyer/gitSync/_GPTsync` (aka **CLOUD**)

**Directories**

* `commands/` : inbound, HMAC-signed request docs (`*.json`)
* `results/` : per-command execution result JSON
* `diffs/` : human-readable patches for each result
* `archive/` : immutable copy of processed commands
* `dead_letter/` : failed/expired/invalid commands + reason
* `meta/` : **persistent control state** (e.g., `retries.json`)
* `logs/`, `summaries/`, `context/` (optional, output only)

**Core processes**

* **gpt-executor** (Python): watches `commands/`, validates, executes, emits `{results,diffs,archive,dead_letter}`, publishes via Git.
* **gpt-reporter** (Python/Node): summarizes runs, posts dashboards/alerts.
* **patch-executor** (Node): separate agent for patch orchestration (non-blocking to the executor).

**PM2** runs each with explicit `cwd`, `env`, and an interpreter.

---

## 3) Problems Found (Root Causes)

1. **Dotfile churn & flapping:**

   * `.retries.json` in `commands/` was created/modified by the executor and then staged by `git add -A`.
   * This caused repeated commits, constant push loops, and HMAC errors (executor rejects hidden control files but Git kept surfacing them).

2. **Broad staging:**

   * `git add -A` indiscriminately picked up transient files; any temp file could trigger spurious commits.

3. **Publishing fragility:**

   * No robust lock/backoff + rebase loop meant push could wedge under contention; noisy retries.

4. **Hotpatch breakage:**

   * Manual edits created indentation errors; executor couldn’t import `publish_github.py`, stalling the pipeline.

---

## 4) Guiding Principles

* **Least privilege:** Only the minimal set of dirs is staged and published.
* **Deterministic state flow:** Each command moves through the same lifecycle; all artifacts are tamper-evident.
* **Separation of concerns:** Control state in `meta/`, inbound in `commands/`, outputs elsewhere.
* **Defensive defaults:** Reject on ambiguity; fail closed with clear diagnostics.
* **Observability as a feature:** Everything important is measured or logged.

---

## 5) Command Contract (Schema & Semantics)

**Minimal schema (example):**

```json
{
  "schemaVersion": "1.0",
  "id": "noop-20250809T062451Z",
  "issued_at": "2025-08-09T06:24:51Z",
  "expires_at": "2025-08-09T06:29:51Z",
  "nonce": "0",
  "target": "MAIN",
  "action": "applyPatch",
  "patchType": "hybrid",
  "payload": {
    "inline": { "version": "noop", "ops": [ { "op": "noop" } ] }
  },
  "validationPlan": [],
  "allowedActions": ["writeFile","moveFile"],
  "constraints": { "maxRuntimeMs": 60000, "maxFilesChanged": 1 },
  "hmac": "<base64-sha256>"
}
```

**Rules**

* `id` unique across archive; used for filenames.
* `expires_at` enforced; expired → `dead_letter/` with reason.
* `allowedActions` and `constraints` strictly enforced; violations → `dead_letter/`.
* **HMAC** over the canonical JSON (sorted keys, no whitespace variance) **excluding** the `hmac` field.

**Why:** Precise, replayable, and tamper-evident mutations; clear limits prevent blast radius.

---

## 6) Validation & Hardening (Step-by-Step)

### 6.1 Pre-ingest filters

* Only process files in `commands/*.json`.
* Reject if filename starts with `.` or equals `.retries.json`.
* Ignore non-JSON or zero-byte files.
* Enforce size limits (e.g., 512KB per command).

### 6.2 HMAC verification

* Load `GPT_BRIDGE_HMAC_SECRET` from PM2 env.
* Canonicalize JSON (sorted keys, minimal separators), compute `sha256(secret, payload)`, base64-encode.
* If mismatch → `dead_letter/`, annotate cause.

### 6.3 Schema checks

* Required fields present, well-formed timestamps, `expires_at > issued_at`.
* `action` ∈ allowed set, `patchType` recognized.
* `allowedActions` non-empty subset of executor capabilities.
* `constraints.maxFilesChanged` >= actual staging delta; else reject.

### 6.4 Safety checks for mutations

* Only allow path mutations **inside repo root**, no `..`, no symlinks escape.
* Deny writes to `commands/`, `meta/`, `.git/` or any dot-prefixed directory except `meta/`.
* Deny file deletions unless explicitly allowed by policy.
* Dry-run the patch → compute diff and count changes vs constraints.

### 6.5 Execution

* Apply allowed ops; capture stdout/stderr; timebox by `maxRuntimeMs`.
* Emit:

  * `results/<id>.json` (status, timings, counters, constraint compliance)
  * `diffs/<id>.patch`
  * `archive/<id>.json` (original command) on success
  * `dead_letter/<id>.json` on failure

### 6.6 Publish (Git)

* Stage **only**: `context/ results/ diffs/ summaries/ logs/ archive/ dead_letter/ meta/`
* Never stage `commands/` (and never write `.retries.json` there).
* Commit message convention:

  * `bridge: results <id> (exit=<code>)`
  * `bridge: DLQ <reason>`
  * `bridge: retries index update`
* Pull `--rebase`, exponential backoff (cap), push. Use **file lock** to serialize concurrent publishers.

**Why:** Prevents control files from driving commits; safe, bounded publish retries; conflict-safe.

---

## 7) State & Retries

* **Retries index**: `meta/retries.json` (map: `command_id → {attempts, last_error, last_ts}`).
* **Backoff**: exponential (base 2), jitter, capped attempts (e.g., 6).
* **Never** create `.retries.json` in `commands/`.
* On process crash, index is safe in `meta/`; executor resumes with consistent state.

---

## 8) Observability & Audit

**Startup banner**

* Log resolved paths: `CLOUD`, `CMDS`, `RES`, `DIFF`, `ARCH`, `DLQ`, `META`.
* Log `retries index -> <path>` once.

**Per command**

* Integrity file: `results/<id>.integrity.json` with input hash, output hashes, timing, limits used.
* Append audit line to `logs/bridge.log` (`ts, id, action, result, exit, files_changed, hmac_ok`).

**Reporting**

* Summaries per batch in `summaries/` (optional).
* PM2 logs include commit status pre/post (non-fatal if missing).

---

## 9) Security & Secrets

* **HMAC secret**: `GPT_BRIDGE_HMAC_SECRET` provided via PM2 env only.
* Rotate by:

  1. Add `accepted_secrets: [current, next]` window for N hours.
  2. Switch writer to `next`.
  3. Remove `current`.
* Never write secrets to disk; never echo in logs.

---

## 10) PM2 & Runtime

**Ecosystem entry (example)**

```js
module.exports = {
  apps: [{
    name: "gpt-executor",
    script: "executor.py",
    interpreter: "python3",
    cwd: "/Users/sawyer/gitSync/ghost-bridge",
    env: {
      CLOUD: "/Users/sawyer/gitSync/_GPTsync",
      GPT_BRIDGE_HMAC_SECRET: "<BASE64>",
      PYTHONUNBUFFERED: "1"
    }
  }]
}
```

**Lifecycle**

* (Re)start with `--update-env` after changing secret.
* `pm2 describe gpt-executor` must show correct `cwd` and `script path`.
* Only **one** executor instance for this repo/agent.

---

## 11) Developer Hotpatches (Minimal, Safe Diffs)

### 11.1 `publish_github.py`

**Do**

* Restrict staging:

  ```python
  subprocess.check_call(["git","-C",repo_path,"add",
    "context","results","diffs","summaries","logs","archive","dead_letter","meta"], env=env)
  ```
* Short-circuit if `--cached` diff is empty.
* Wrap `pull --rebase` + `push` in backoff loop with lock (`.bridge.lock`).

**Don’t**

* Re-enable `add -A`.
* Print secrets; print only status lines.

### 11.2 `executor.py`

**Do**

* `META = CLOUD / "meta"`; `retries_index = META / "retries.json"`.
* **Never** write any `.retries.json` in `commands/`.
* When listing candidates: `CMDS.glob("*.json")` and also filter `p.name != ".retries.json"`.
* Path banner `print()`s on start.
* Defensive checks around file operations and schema.

---

## 12) Git Hygiene

* In `_GPTsync/.gitignore`:

  ```
  commands/.retries.json
  ```
* Optional local hook to block accidental staging:
  `.git/hooks/pre-commit`

  ```sh
  #!/bin/sh
  if git diff --cached --name-only | grep -q '^commands/.retries\.json$'; then
    echo "pre-commit: blocking commands/.retries.json" >&2
    git reset -q HEAD -- commands/.retries.json || true
    rm -f commands/.retries.json || true
    exit 1
  fi
  ```

---

## 13) Validation Recipes (DEV Checklist)

**A. Unit checks**

* HMAC canonicalization (sort keys); reject wrong HMAC.
* Time window: accept within `issued_at..expires_at`.
* `constraints.maxFilesChanged` ≥ actual; else reject.

**B. Integration**

1. Start PM2 app, confirm env and paths in logs.
2. Drop **valid** signed no-op → expect:

   * `archive/<id>.json`, `results/<id>.json`, `diffs/<id>.patch` (empty/no-op diff OK), commit pushed.
3. Drop **invalid** (bad HMAC) → expect:

   * `dead_letter/<id>.json` with reason; no publish of `results/` for that id.
4. Confirm **no creation** of `commands/.retries.json`.

**C. Negative**

* Expired command → `dead_letter/expired`.
* Hidden filename (`.foo.json`) → ignored or `dead_letter/hidden`.
* Attempt to write outside repo → `dead_letter/path_escape`.

---

## 14) Smoke Test Script (Operator)

```bash
python3 - <<'PY'
import os, json, base64, hmac, hashlib
from datetime import datetime, timedelta, timezone
CLOUD=os.environ.get("CLOUD","/Users/sawyer/gitSync/_GPTsync")
sec=os.environ["GPT_BRIDGE_HMAC_SECRET"]
now=datetime.now(timezone.utc)
ID="noop-"+now.strftime("%Y%m%dT%H%M%SZ")
doc={
  "schemaVersion":"1.0","id":ID,
  "issued_at":now.strftime("%Y-%m-%dT%H:%M:%SZ"),
  "expires_at":(now+timedelta(minutes=5)).strftime("%Y-%m-%dT%H:%M:%SZ"),
  "nonce":"0","target":"MAIN","action":"applyPatch","patchType":"hybrid",
  "payload":{"inline":{"version":"noop","ops":[{"op":"noop"}]}},
  "validationPlan":[],
  "allowedActions":["writeFile","moveFile"],
  "constraints":{"maxRuntimeMs":60000,"maxFilesChanged":1}
}
payload=json.dumps({k:v for k,v in doc.items() if k!="hmac"},separators=(",",":"),sort_keys=True).encode()
doc["hmac"]=base64.b64encode(hmac.new(sec.encode(), payload, hashlib.sha256).digest()).decode()
out=f"{CLOUD}/commands/{ID}.json"
open(out,"w").write(json.dumps(doc, indent=2))
print(out)
PY
```

**Expect within seconds**

* `archive/<id>.json`, `results/<id>.json`, `diffs/<id>.patch` and a commit:
  `bridge: results <id> (exit=0)`

---

## 15) Rollout Plan (Phased)

**Phase 0 – Prep (1–2h)**

* Verify PM2 `cwd`, env (`CLOUD`, `GPT_BRIDGE_HMAC_SECRET`), single instance.
* Ensure `_GPTsync/.gitignore` has `commands/.retries.json`.
* Create `meta/retries.json` if missing (`{}`).

**Phase 1 – Code hardening (half-day)**

* Apply `executor.py` and `publish_github.py` changes (see §11).
* Add startup path banners and extra defensive checks.

**Phase 2 – Publish safety (half-day)**

* Restrict `git add` to safe dirs; lock + backoff in publisher.

**Phase 3 – Validation & tests (half-day)**

* Run unit & integration recipes (§13–14).
* Confirm no `.retries.json` appears in `commands/`.

**Phase 4 – Observability (2–4h)**

* Ensure integrity JSON is emitted.
* Verify logs: path banners, status lines pre/post publish.

**Phase 5 – Documentation & handoff (2h)**

* Store this G2o doc alongside `meta/` (or project docs).
* Record Definition of Done, acceptance test outputs.

---

## 16) Acceptance Criteria (Definition of Done)

* ✅ Valid signed command produces `archive/`, `results/`, `diffs/` and **one** commit with proper message.
* ✅ Invalid/expired/violating commands land in `dead_letter/` with precise reason.
* ✅ No `.retries.json` created under `commands/`; all retry state lives in `meta/retries.json`.
* ✅ `git add` never stages `commands/` or unintended files.
* ✅ PM2 logs show correct `cwd`/paths; no indentation or import errors.
* ✅ Smoke test passes within 10s on a clean run.

---

## 17) Operational Runbook (Day-2)

* **Restart after env change**
  `pm2 restart gpt-executor --update-env`
* **Check env**
  `pm2 env gpt-executor | grep -E 'CLOUD|GPT_BRIDGE_HMAC_SECRET'`
* **Tail logs**
  `pm2 logs gpt-executor --lines 120`
* **Investigate a failed ID**
  Inspect `dead_letter/<id>.json`, cross-check `logs/bridge.log`.
* **Unwedge publish**
  Delete `.bridge.lock` **only if** process is stopped, then restart.

---

## 18) Audit Report Template

`results/<id>.integrity.json` should include:

```json
{
  "id": "<id>",
  "input_sha256": "<hex>",
  "result_sha256": "<hex>",
  "diff_sha256": "<hex>",
  "issued_at": "...",
  "executed_at": "...",
  "duration_ms": 1234,
  "files_changed": 1,
  "constraints": {"maxRuntimeMs":60000,"maxFilesChanged":1},
  "limits_ok": true,
  "hmac_ok": true,
  "exit_code": 0
}
```

---

## 19) Risks & Rollback

* **Risk:** Mis-staged files → **Mitigation:** restricted `git add`, hook guard.
* **Risk:** Secret drift → **Mitigation:** rotation window + `--update-env` restart.
* **Risk:** Concurrent push contention → **Mitigation:** file lock + backoff.
* **Rollback:** Revert to previous commit of `ghost-bridge`, restart PM2; artifacts remain on disk.

---

## 20) Deliverables to Build

* [ ] `executor.py` with: path banners; hard filters; HMAC verify; schema enforcement; constraints; integrity emission; **no writes** to `commands/`; `meta/retries.json` only.
* [ ] `publish_github.py` with: restricted staging; lock; backoff; pull-rebase; robust status logging.
* [ ] PM2 ecosystem entry (as in §10).
* [ ] `.gitignore` entry and optional pre-commit hook.
* [ ] Smoke test script (§14).
* [ ] README ops quickstart (pm2 commands + smoke test).

---

## 21) Why This Works

* **Control/inputs are immutable** (archive) and **outputs are tamper-evident** (integrity hashes + diffs).
* **No hidden control files** leak into version control.
* **Publishing is serialized** and retried with jitter, preventing wedges.
* **Validation is layered** (file → HMAC → schema → constraints → dry-run).
* **Operations are simple** (single PM2 app, clear logs, smoke test in one command).

---

### Quick Handoff Notes for DEV

1. Implement §11 diffs exactly.
2. Confirm env + single instance (“script path” + “exec cwd” in `pm2 describe`).
3. Run §14 smoke test; verify §16 acceptance criteria.
4. If anything flaps, check:

   * Is `git add` still `-A` somewhere?
   * Is `.retries.json` appearing in `commands/`?
   * Did PM2 get the **current** HMAC via `--update-env`?

That’s the whole playbook. If you want, I can also generate a compact **DEV checklist** or a pre-wired **hotpatch script** for these exact changes.
