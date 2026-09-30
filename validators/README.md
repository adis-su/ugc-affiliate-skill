# Validator Layer

The validator layer checks structural schema compliance and cross-engine semantic consistency.

## Validation order

1. Input
2. Strategy
3. Format
4. Concept
5. Script/behavior
6. Storyboard
7. Prompt
8. Human realism
9. Product consistency
10. Runtime

## Severity

- blocking: output must stop
- major: output requires revision
- minor: warning only

Validators detect and route problems. They do not rewrite creative decisions.

Each issue contains code, severity, message, stage, and optional scene_id and route.