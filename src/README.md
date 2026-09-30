# Reference Implementation

The `src/` layer is the executable reference implementation for the Fashion UGC Skill architecture.

It intentionally remains provider-agnostic. Creative model calls can be attached later; the runtime contract, state management, validation, continuity, revision, and packaging logic must remain stable.

## Modules

- normalize: canonicalize user input
- validation: evaluate schema and semantic rules
- orchestration: execute stages in dependency order
- continuity: preserve creator/product/scene state
- revision: route QC issues and control revision cycles
- packaging: assemble the final UGC package
