# Dispatch Wrappers

## Purpose
Non-blocking command execution patterns

## Pattern
```bash
{ timeout 30s command & } >/dev/null 2>&1 & disown
```

## Usage
- All potentially blocking commands
- PM2 operations
- Service management
- Health checks

## Benefits
- Prevents terminal blocking
- Safe process management
- Consistent execution patterns
