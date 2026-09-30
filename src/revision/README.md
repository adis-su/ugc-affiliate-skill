# Revision

Revision consumes QC issues and routes them to the earliest responsible stage.

Rules:

- blocking issues always stop packaging
- major issues require revision
- minor issues may remain as warnings
- prefer scene-level regeneration when safe
- rerun dependent downstream stages after correction
- maximum revision cycles are controlled by runtime/revision-policy.yaml
