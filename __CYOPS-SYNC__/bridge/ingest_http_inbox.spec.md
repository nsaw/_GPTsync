# HTTP Inbox Specification

## Purpose
Fallback ingestion path when Slack is unavailable

## Endpoint
- POST /ingest/patch
- Content-Type: application/json

## Payload
```json
{
  "patch": "patch content",
  "metadata": {}
}
```

## Response
- 200: Patch accepted
- 400: Invalid patch
- 500: Processing error
