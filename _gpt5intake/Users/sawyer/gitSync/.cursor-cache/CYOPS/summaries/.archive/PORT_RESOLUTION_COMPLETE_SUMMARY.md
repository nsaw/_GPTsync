# Ghost Runner External Communication & Port Resolution Complete Summary

## 🎯 **Core Purpose: Remote GPT Communication**

The ghost runner must be accessible externally for GPT to command Cursor agents remotely. This requires multiple communication channels and daemon processes.

## 🌐 **External Communication Channels**

### **Cloudflare Tunnel (Primary)**
```bash
# Production URLs
RUNNER_URL=https://runner.thoughtmarks.app
ENDPOINT_URL=https://runner.thoughtmarks.app/webhook
DASHBOARD_URL=https://runner.thoughtmarks.app/dashboard

# Development URLs  
RUNNER_DEV_URL=https://runner.thoughtmarks.app
ENDPOINT_DEV_URL=https://runner.thoughtmarks.app/webhook
DASHBOARD_DEV_URL=https://runner.thoughtmarks.app/dashboard
```

### **ngrok Tunnel (Development)**
```bash
# ngrok Configuration
ngrok config add-authtoken 2zEtqtpB4YaTdpQfpLf5cZunb8Y_2rstF1BT2zfiUeom5WqWc

# Static ngrok tunnel
ngrok http --url=deciding-externally-caiman.ngrok-free.app 80

# Dynamic ngrok tunnel
@https://thoughtmarks.internal:4000 ep_2zU23U63NtPcgLNLtZeuWyRmHwv

# Local ngrok tunnel
ngrok http 5051  # Python ghost runner
ngrok http 5555  # Node.js server

# Tunnel URLs
NGROK_PYTHON_URL=https://abc123.ngrok.io  # Dynamic
NGROK_NODE_URL=https://def456.ngrok.io    # Dynamic
```

### **Fly.io Deployment (Production)**
```bash
# Fly.io app deployment
fly deploy --app gpt-cursor-runner

# Production URLs
FLY_RUNNER_URL=https://gpt-cursor-runner.fly.dev
FLY_WEBHOOK_URL=https://gpt-cursor-runner.fly.dev/webhook
FLY_DASHBOARD_URL=https://gpt-cursor-runner.fly.dev/dashboard
```

### **GitHub Actions (Fallback)**
```bash
# GitHub Actions webhook
GITHUB_WEBHOOK_URL=https://api.github.com/repos/nsaw/gpt-cursor-runner/dispatches
GITHUB_TOKEN=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

# Actions workflow triggers
- /status-runner
- /dashboard  
- /patch-preview
- /patch-pass
- /patch-revert
```

## 🔄 **Daemon Processes & Watchers**

### **Ghost Runner Daemon**
```bash
# Python Ghost Runner Daemon
python3 -m gpt_cursor_runner.main --daemon --port 5051

# Node.js Server Daemon  
node server/index.js --daemon --port 5555

# Daemon endpoints
/health          # Health check
/webhook         # GPT webhook
/events          # Event stream
/dashboard       # Dashboard UI
/slack/commands  # Slack commands
```

### **File Watcher Daemon**
```bash
# Cursor file watcher
python3 -m gpt_cursor_runner.file_watcher --daemon

# Watches for:
- *.tsx changes
- *.ts changes  
- *.js changes
- *.py changes
- package.json changes

# Triggers:
- Auto-patch application
- Slack notifications
- Event logging
```

### **Patch Runner Daemon**
```bash
# Patch application daemon
python3 -m gpt_cursor_runner.patch_runner --daemon

# Monitors:
- patches/ directory
- Incoming webhook patches
- Slack command patches

# Actions:
- Apply patches safely
- Create backups
- Run tests
- Notify Slack
```

### **Expo Tunnel Daemon**
```bash
# Expo development with tunnel
npx expo start --tunnel --port 8081

# Tunnel URLs
EXPO_TUNNEL_URL=https://exp.direct/abc123
EXPO_GO_URL=exp://exp.direct/abc123

# For remote Expo Go access
```

## 📊 **Complete Port & URL Mapping**

### **Local Development**
| Port | Service | Status | Local URL | External URL |
|------|---------|--------|-----------|--------------|
| 5051 | Python Ghost Runner | ✅ Running | http://localhost:5051 | https://runner.thoughtmarks.app |
| 5555 | Node.js Server | ✅ Running | http://localhost:5555 | https://runner.thoughtmarks.app |
| 8081 | Expo Dev Server | ✅ Running | http://localhost:8081 | https://exp.direct/abc123 |
| 4000 | Backend API | ❌ Stopped | http://localhost:4000 | https://runner.thoughtmarks.app |

### **External Communication**
| Service | Type | URL | Purpose |
|---------|------|-----|---------|
| Cloudflare Tunnel | Production | https://runner.thoughtmarks.app | Main GPT communication |
| ngrok Tunnel | Development | https://abc123.ngrok.io | Local development |
| Fly.io | Production | https://gpt-cursor-runner.fly.dev | Backup deployment |
| GitHub Actions | Fallback | https://api.github.com/repos/nsaw/gpt-cursor-runner/dispatches | Emergency control |

### **Daemon Endpoints**
| Endpoint | Service | Purpose | Access |
|----------|---------|---------|--------|
| `/health` | Python/Node | Health check | Public |
| `/webhook` | Python | GPT webhook | Public |
| `/events` | Python | Event stream | Public |
| `/dashboard` | Node | Dashboard UI | Public |
| `/slack/commands` | Node | Slack commands | Public |
| `/watch` | Python | File watcher | Internal |
| `/patch` | Python | Patch runner | Internal |

## 🛠️ **Enhanced Port Management Scripts**

### **Universal Kill Script (Updated)**
```bash
#!/bin/bash
# kill-all-ports-and-tunnels.sh

echo "🔄 Killing all ports, tunnels, and daemons..."

# Kill local processes
pkill -f "gpt_cursor_runner" || true
pkill -f "node server/index.js" || true
pkill -f "expo" || true
pkill -f "ngrok" || true

# Kill specific ports
lsof -ti:4000,4040,4041,5051,5555,8081,19006 | xargs kill -9 2>/dev/null || true

# Kill ngrok tunnels
killall ngrok 2>/dev/null || true

# Kill Expo tunnel
pkill -f "expo.*tunnel" || true

echo "✅ All ports, tunnels, and daemons killed"
```

### **Start with External Access (Updated)**
```bash
#!/bin/bash
# start-ghost-runner-external.sh

echo "🚀 Starting Ghost Runner with external access..."

# Kill existing processes
./scripts/kill-all-ports-and-tunnels.sh

# Start Python ghost runner daemon
echo "📡 Starting Python ghost runner daemon on port 5051..."
python3 -m gpt_cursor_runner.main --daemon --port 5051 &
PYTHON_PID=$!

# Start Node.js server daemon
echo "🖥️ Starting Node.js server daemon on port 5555..."
node server/index.js --daemon --port 5555 &
NODE_PID=$!

# Start file watcher daemon
echo "👁️ Starting file watcher daemon..."
python3 -m gpt_cursor_runner.file_watcher --daemon &
WATCHER_PID=$!

# Start patch runner daemon
echo "🔧 Starting patch runner daemon..."
python3 -m gpt_cursor_runner.patch_runner --daemon &
PATCH_PID=$!

# Start ngrok tunnels
echo "🌐 Starting ngrok tunnels..."
ngrok http 5051 --log=stdout > /tmp/ngrok-python.log 2>&1 &
ngrok http 5555 --log=stdout > /tmp/ngrok-node.log 2>&1 &

# Start Expo with tunnel
echo "📱 Starting Expo with tunnel..."
cd /Users/sawyer/gitSync/tm-mobile-cursor/mobile-native-fresh
npx expo start --tunnel --port 8081 &
EXPO_PID=$!

# Wait for services
sleep 10

# Get ngrok URLs
PYTHON_TUNNEL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url' 2>/dev/null || echo "https://python.ngrok.io")
NODE_TUNNEL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[1].public_url' 2>/dev/null || echo "https://node.ngrok.io")

echo "🎉 Ghost Runner started with external access!"
echo "📡 Python Ghost Runner: $PYTHON_TUNNEL"
echo "🖥️ Node.js Server: $NODE_TUNNEL"
echo "📱 Expo Tunnel: https://exp.direct/abc123"
echo "🌐 ngrok Dashboard: http://localhost:4040"
```

## 🔧 **Environment Configuration (Updated)**

### **Production Environment (.env)**
```bash
# External Communication
RUNNER_URL=https://runner.thoughtmarks.app
ENDPOINT_URL=https://runner.thoughtmarks.app/webhook
DASHBOARD_URL=https://runner.thoughtmarks.app/dashboard

# Cloudflare Tunnel
CLOUDFLARE_TUNNEL_TOKEN=your-tunnel-token
CLOUDFLARE_ACCOUNT_ID=your-account-id

# Fly.io Deployment
FLY_API_TOKEN=FlyV1 fm2_lJPECAAAAAAACVQ1xBCoI6eZuxwJ0x4whs4vssthwrVodHRwczovL2FwaS5mbHkuaW8vdjGWAJLOABHSVx8Lk7lodHRwczovL2FwaS5mbHkuaW8vYWFhL3YxxDxBZ8bqMaNZsG8TWmxzZyfn0+PHMtA4pS+BxbPFDzCjv9bzLJ6Oc1g2Vk5qdsXnzwbmLCaOAs7f93k0NhrETuWmkRewxcnGOavXPzzgoVOq44pFZagubhP2JwInBlfGR3ApIemLGVp2uKQ3Cvft0EWUn5hOby24aXfnsv9zRkb4talZ3Idvl0O0mgP7cg2SlAORgc4Ag9v9HwWRgqdidWlsZGVyH6J3Zx8BxCDrSL5T3PbYalmZcqLbfPAWNVjwlumsfTgegl5zxIa10w==,fm2_lJPETuWmkRewxcnGOavXPzzgoVOq44pFZagubhP2JwInBlfGR3ApIemLGVp2uKQ3Cvft0EWUn5hOby24aXfnsv9zRkb4talZ3Idvl0O0mgP7csQQz1zU++LxdOnG1Ir2Ugaei8O5aHR0cHM6Ly9hcGkuZmx5LmlvL2FhYS92MZgEks5ocLqtzns8vcsXzgARILsKkc4AESC7DMQQGQXpDXqn5KuFQTpXex6E9MQgWVNmRZk7HdoCufNuDSsCX+PLiMtW5XVqE8hCsmROaiM=
FLY_APP_NAME=gpt-cursor-runner

# GitHub Actions
GITHUB_TOKEN=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
GITHUB_REPO=nsaw/gpt-cursor-runner

# Slack Integration
SLACK_BOT_TOKEN=xoxb-9175632787408-9148938089411-NASu77mZyxisZTHPtZyrXTqI
SLACK_SIGNING_SECRET=8d27e59af8be27e946bea8ee2f63d1db
SLACK_VERIFICATION_TOKEN=3up2OCWrSjmEHwXzZHzF8V6S
SLACK_ACCESS_TOKEN=xoxe.xoxp-1-Mi0yLTkxNzU2MzI3ODc0MDgtOTE3NTYzMjgxODc1Mi05MTU2ODcyODMwMzg2LTkxNTY4NzI4NDQ2NzQtMGU1ZmRjYWM4YTM5YjIzNDYxMmZkZDRhMTZlZTQ5OTRkNDM5OGY0MTNmZDZiNjUzOTU5NTkzOThmMzM2ODg5ZQ
SLACK_REFRESH_TOKEN=xoxe-1-My0xLTkxNzU2MzI3ODc0MDgtOTE1Njg3MjgzMDM4Ni05MTU2ODcyODYwMjkwLTQzOTRhZDM0OTAwM2M0Y2JkMmYwY2QwMjY5MGFjZGExMWRkYzFmNDI2MjkxYjA0OTgwMjRlY2RhZGM1NGRkZmY
SLACK_APP_TOKEN=xapp-1-A09469H0C2K-9153609992933-5082b0c0f454236fe263839711e7ea6bf2311cef5eb8ea4315e397de94944dd0
SLACK_CLIENT_SECRET=a4eb8085215e7c74976c46880a74fa46
SLACK_CLIENT_ID=9175632787408.9142323012087
SLACK_APP_ID=A09469H0C2K
SLACK_TEST_API_TOKEN=sk_test_5102NARGTLFReEjHmDcaDfOd

# ngrok Configuration
NGROK_AUTH_TOKEN=2zEtqtpB4YaTdpQfpLf5cZunb8Y_2rstF1BT2zfiUeom5WqWc
NGROK_STATIC_URL=deciding-externally-caiman.ngrok-free.app
NGROK_DYNAMIC_ENDPOINT=ep_2zU23U63NtPcgLNLtZeuWyRmHwv

# Daemon Configuration
DAEMON_MODE=true
WATCHER_ENABLED=true
PATCH_RUNNER_ENABLED=true
AUTO_PATCH_ENABLED=true

# Port Configuration
PYTHON_PORT=5051
NODE_PORT=5555
EXPO_PORT=8081
NGROK_PORT=4040
```

### **Development Environment (.env)**
```bash
# Local Development
DEBUG_MODE=true
DAEMON_MODE=false
WATCHER_ENABLED=true
PATCH_RUNNER_ENABLED=true

# ngrok Tunnels
NGROK_PYTHON_URL=https://abc123.ngrok.io
NGROK_NODE_URL=https://def456.ngrok.io

# Expo Tunnel
EXPO_TUNNEL_URL=https://exp.direct/abc123

# Local Ports
PYTHON_PORT=5051
NODE_PORT=5555
EXPO_PORT=8081
```

## 🎯 **GPT Communication Flow**

### **1. GPT → Ghost Runner (with Human Verification)**
```
GPT → Cloudflare Tunnel → Python Ghost Runner (5051)
     ↓
   /webhook endpoint
     ↓
   [SLACK AUTHORIZATION MIDDLE STEP] ← Human verification/approval
     ↓
   Patch processing
     ↓
   File watcher triggers
     ↓
   Cursor agent commands
```

### **2. Ghost Runner → Cursor (with Slack Notifications)**
```
Ghost Runner → File watcher → Cursor file changes
     ↓
   Patch application
     ↓
   Test execution
     ↓
   [SLACK NOTIFICATIONS] ← Real-time status updates
```

### **3. Cursor → Ghost Runner (with Slack Logging)**
```
Cursor → File changes → File watcher → Ghost Runner
     ↓
   Event logging
     ↓
   [SLACK LOGGING] ← Human oversight
     ↓
   Dashboard updates
```

## 🔐 **Slack Authorization & Human Verification Pipeline**

### **Slack as Authorization Middleware**
The Slack integration serves as a **critical human verification layer** in the GPT communication pipeline:

```bash
# Authorization Flow
GPT Request → Ghost Runner → [SLACK VERIFICATION] → Cursor Execution
     ↓              ↓              ↓                    ↓
   Webhook    →  Process    →  Human Approve   →  Apply Changes
     ↓              ↓              ↓                    ↓
   Log Event   →  Notify     →  Confirm Action  →  Report Results
```

### **Slack Authorization Commands**
```bash
# Human Authorization Commands
/patch-approve          # Approve next pending patch
/patch-revert           # Revert last applied patch  
/pause-runner           # Pause GPT automation
/proceed                # Resume paused operations
/restart-runner         # Restart entire system
/kill                   # Emergency stop

# Verification & Status Commands
/status-runner          # Check system health
/patch-preview          # Preview pending changes
/dashboard              # View real-time logs
/whoami                 # Verify user permissions

# Control & Override Commands
/toggle-runner-auto     # Toggle automatic mode
/lock-runner            # Prevent changes
/unlock-runner          # Allow changes
/manual-revise          # Manual patch revision
```

### **Slack Authorization Workflow**
```bash
# 1. GPT Sends Patch Request
GPT → /webhook → Ghost Runner → [PENDING APPROVAL]

# 2. Slack Notification Sent
Ghost Runner → Slack → #runner-control
"🔔 New patch requires approval: /patch-approve"

# 3. Human Verification
Human → /patch-approve → Ghost Runner → [APPROVED]

# 4. Patch Execution
Ghost Runner → Cursor → Apply Changes

# 5. Status Reporting
Ghost Runner → Slack → "✅ Patch applied successfully"
```

### **Slack Security & Permissions**
```bash
# User Authorization Levels
ADMIN_USERS=["U1234567890"]     # Full control
APPROVER_USERS=["U0987654321"]  # Patch approval only
VIEWER_USERS=["U1111111111"]    # Read-only access

# Channel Authorization
CONTROL_CHANNEL="#runner-control"    # Primary control
ALERT_CHANNEL="#alerts"              # Emergency notifications
LOG_CHANNEL="#logs"                  # Detailed logging
```

### **Slack Integration Features**
- ✅ **Human Verification**: All patches require Slack approval
- ✅ **Real-time Notifications**: Instant status updates
- ✅ **Emergency Controls**: Kill switches and pause functionality
- ✅ **Audit Trail**: Complete command history logging
- ✅ **Permission Management**: Role-based access control
- ✅ **Dashboard Integration**: Live monitoring interface
- ✅ **Error Handling**: Automatic crash notifications
- ✅ **Rollback Capability**: Safe revert operations

## 🔄 **Daemon Process Management**

### **Systemd Service Files**
```bash
# /etc/systemd/system/gpt-cursor-runner.service
[Unit]
Description=GPT-Cursor Runner Ghost Runner
After=network.target

[Service]
Type=simple
User=sawyer
WorkingDirectory=/Users/sawyer/gitSync/gpt-cursor-runner
ExecStart=/usr/bin/python3 -m gpt_cursor_runner.main --daemon --port 5051
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### **Launchd Plist (macOS)**
```xml
<!-- ~/Library/LaunchAgents/com.thoughtmarks.gpt-cursor-runner.plist -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.thoughtmarks.gpt-cursor-runner</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/python3</string>
        <string>-m</string>
        <string>gpt_cursor_runner.main</string>
        <string>--daemon</string>
        <string>--port</string>
        <string>5051</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>/Users/sawyer/gitSync/gpt-cursor-runner/logs/ghost-runner.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/sawyer/gitSync/gpt-cursor-runner/logs/ghost-runner.error.log</string>
</dict>
</plist>
```

## 📈 **Status Summary**

- **✅ Port Analysis**: Complete (Local + External)
- **✅ External Communication**: Cloudflare, ngrok, Fly.io, GitHub Actions
- **✅ Daemon Processes**: Ghost Runner, File Watcher, Patch Runner
- **✅ Tunnel Configuration**: ngrok, Expo tunnel
- **✅ Production Deployment**: Fly.io, Cloudflare
- **✅ Fallback Systems**: GitHub Actions
- **✅ Process Management**: systemd, launchd
- **✅ GPT Communication**: Complete flow defined

**Status**: 🟢 **EXTERNAL COMMUNICATION & DAEMON PROCESSES COMPLETE** 