# Bridge Memory Pack

**Purpose**: SoT-backed memory bridge for autonomous patch execution
**SoT Location**: `/Users/sawyer/gitSync/gpt-cursor-runner/__SoT__/` (linked)
**Status**: Read `STATUS_ROLLUP.json` for current system state

## Next Actions (Priority Order):
1. **Executor Deploy**: Live executor service implementation
2. **Health Endpoint**: Dashboard health monitoring
3. **Smokes**: Dual-domain smoke test validation

## Usage:
- Reference SoT by absolute path (no duplication)
- Use templates for patch authoring
- Check guards before execution
- Foundation 95% complete, executor validation needed

## Hybrid Architecture:
- **Symbolic Links**: Keep files synchronized with source project
- **Provenance Notes**: `.note` files contain SHA256 hashes for verification
- **Cross-Environment**: Works on any host, not just mounted paths
- **SoT Compliance**: Maintains authoritative reference while enabling portability

## File Structure:
- SoT files: Symbolic links + `.note` files with SHA256 provenance
- Ops files: Symbolic links + `.note` files with SHA256 provenance  
- Bridge files: Symbolic links + `.note` files with SHA256 provenance
