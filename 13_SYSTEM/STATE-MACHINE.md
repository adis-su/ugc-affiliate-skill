# AFFILIX — State Machine

## 1. Purpose

This document defines the lifecycle states used by AFFILIX for stages, artifacts, dependencies, and project decisions.

The state machine controls when an artifact may be created, reviewed, approved, locked, revised, or treated as stale.

It is a control model, not a separate validation stage.

## 2. Core Lifecycle

The canonical lifecycle is:

NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED

When an approved or locked artifact is affected by an upstream change:

LOCKED → STALE

A stale artifact may be revised:

STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED

A direct revision of an active artifact may follow:

IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED

The system must never silently treat a stale artifact as current.

## 3. State Definitions

### NOT_STARTED

The stage or artifact has not begun execution.

Characteristics:
- no current output exists
- dependencies may be unresolved
- no decision is available

Allowed actions:
- inspect dependencies
- start execution
- provide missing input

### IN_PROGRESS

The stage is actively being constructed or revised.

Characteristics:
- working output may be incomplete
- decisions are not final
- downstream execution must not consume unfinished output as approved truth

Allowed actions:
- continue work
- revise
- resolve dependencies
- stop when ready for decision

### READY_FOR_DECISION

The primary output is complete enough for the user to make the required stage decision.

Characteristics:
- primary output exists
- required dependencies are usable
- unresolved blockers must not remain hidden
- no downstream stage is automatically executed

Allowed actions:
- approve
- revise
- request missing input where applicable

### APPROVED

The current stage output has been explicitly accepted.

Characteristics:
- output is the current approved decision
- downstream stages may use it when their other dependencies are usable
- approval applies only to this stage and revision

Approval does not automatically approve downstream stages.

### LOCKED

The approved artifact is frozen as the current production input.

Characteristics:
- downstream stages may depend on it
- its provider revision is recorded
- it remains authoritative until an explicit revision or upstream dependency change makes it stale

LOCKED does not mean immutable forever.

### STALE

The artifact was previously approved or locked but one or more relevant dependencies changed.

Characteristics:
- previous output remains historical
- it must not be silently consumed as current
- affected downstream artifacts may also become stale

Typical causes:
- upstream revision
- changed user instruction
- changed Product Truth
- changed Character Identity
- changed Script or Dialogue
- changed State
- changed Timeline
- changed platform configuration
- changed reference assignment

### REVISED

The stale artifact has been updated to reflect its current dependencies but has not yet completed the final approval and locking cycle.

Typical transition:

STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED

REVISED is a working post-stale state, not an implicit approval.

## 4. State Transition Rules

### NOT_STARTED → IN_PROGRESS

Allowed when:
- the stage is selected for execution
- required hard dependencies are usable

### IN_PROGRESS → READY_FOR_DECISION

Allowed when:
- primary output is complete
- required hard dependencies are current
- required decisions are represented
- blockers are surfaced

### READY_FOR_DECISION → APPROVED

Allowed only through explicit approval.

No silent approval.

### APPROVED → LOCKED

Allowed when:
- approval is explicit
- dependency revisions are recorded
- the artifact is ready to act as current upstream input

### LOCKED → STALE

Triggered by:
- relevant upstream change
- relevant provider revision
- dependency invalidation
- changed user instruction affecting the artifact

This transition does not require user approval because it represents loss of currency, not a creative decision.

### STALE → REVISED

Allowed when:
- affected information has been incorporated
- dependencies are usable
- the artifact is being reconstructed against current truth

### REVISED → READY_FOR_DECISION

Allowed when the revised artifact is complete enough for a new decision.

## 5. State Machine Invariants

1. A stale artifact is never treated as current.
2. Approval must be explicit.
3. Locking does not remove upstream dependencies.
4. Downstream approval does not approve upstream changes.
5. A revision does not automatically mean approval.
6. State transitions must be traceable.
7. Generated outputs do not change project state automatically.
8. Missing required data cannot be hidden by advancing state.
9. Hard dependency failures block execution.
10. Unaffected artifacts retain their existing state.
11. State changes propagate only where dependency scope requires them.
12. There is no separate VALIDATION state or validation stage.

## 6. Stage State vs Artifact State

AFFILIX distinguishes the state of a stage from the state of an individual artifact.

### Stage State

Describes where the user is in the production workflow.

Example:

GLOBAL-TIMELINE = READY_FOR_DECISION

### Artifact State

Describes the lifecycle of a specific object produced by that stage.

Example:

Timeline v3 = LOCKED

A stage may contain multiple artifacts with different histories, but the current stage must expose one clear decision point.

## 7. Dependency-Aware State

State cannot be interpreted without dependency context.

Example:

VIDEO-PROMPT = LOCKED

If VIDEO-SPEC changes:

VIDEO-PROMPT = STALE

The old prompt still exists historically, but it is no longer the current production instruction.

Likewise:

PRODUCT-TRUTH changes
→ affected PRODUCT-STATE becomes STALE
→ affected REFERENCE-STATE becomes STALE
→ affected specs become STALE
→ affected prompts become STALE

## 8. Identity and State

Identity and lifecycle state are separate concepts.

A state transition may change:
- pose
- gaze
- expression
- product open/closed condition
- product position
- camera position
- lighting condition
- interaction state

A state transition must not silently redefine:
- Character Identity
- Voice Identity
- Product Identity
- authoritative Environment Identity

Identity changes are upstream decisions and trigger dependency propagation.

## 9. Project State Machine

The project itself may use the same lifecycle logic at a higher level.

Example:

NOT_STARTED
→ IN_PROGRESS
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

If an upstream project decision changes after locking:

LOCKED
→ STALE
→ REVISED
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

Project State should summarize the relevant current workflow condition without hiding artifact-level staleness.

## 10. Current Stage Rule

Only one primary stage is considered the current execution stage at a time.

The command /Affilix next advances exactly one stage.

It does not:
- execute multiple stages
- silently approve a stage
- skip unresolved dependencies
- regenerate unrelated artifacts
- rewrite upstream truth

If the current stage is READY_FOR_DECISION, /Affilix next must not silently convert it to APPROVED. The required decision remains explicit.

## 11. Approval Rule

Approval is a decision, not a formatting operation.

When a stage reaches READY_FOR_DECISION, AFFILIX presents the primary output and the decision required.

Approval records:
- stage
- artifact/version
- relevant dependency revisions
- decision timestamp
- decision status

The exact storage mechanism belongs to Project State.

## 12. Lock Rule

LOCKED means:

> This revision is the approved current input for downstream production.

A locked artifact may become stale later.

Locking freezes a revision's role in the current dependency graph. It does not prevent future change.

## 13. Revision Rule

Revision should preserve unaffected decisions.

When revising:

1. Identify the reason for revision.
2. Identify changed fields.
3. Preserve unaffected fields.
4. Rebuild only the affected portion where possible.
5. Re-evaluate dependency impact.
6. Produce a revised artifact.
7. Return to READY_FOR_DECISION.
8. Require explicit approval again.
9. Lock the new revision.

This supports targeted regeneration and avoids unnecessary drift.

## 14. Stale Propagation

When an upstream artifact changes:

1. create or record the new revision
2. compare its changed scope to dependency records
3. mark affected consumers STALE
4. propagate through indirect dependencies
5. preserve unaffected artifacts
6. identify the earliest affected stage
7. resume execution from that stage
8. re-approve affected stages
9. re-lock current revisions

Example:

SCRIPT v2 changes the core message.

Potential chain:

SCRIPT
→ DIALOGUE
→ STORYBOARD
→ GLOBAL-TIMELINE
→ CLIP
→ STATE
→ PRODUCTION-SPEC
→ PROMPTS
→ AUDIO-DESIGN

Only affected branches become stale.

## 15. State and Clip Continuity

Clip state is particularly sensitive.

For consecutive clips:

END STATE CLIP N = START STATE CLIP N+1

If the end state changes:

CLIP N END STATE
→ CLIP N+1 START STATE STALE

If the next clip's transition depends on that start state, its Video Spec and Video Prompt may also become stale.

Propagation continues only as far as the dependency graph requires.

## 16. Reference State Lifecycle

Reference States follow the same lifecycle.

Example:

R04:
NOT_STARTED
→ IN_PROGRESS
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

If its source state changes:

R04 → STALE

A revised reference becomes:

R04 → REVISED → READY_FOR_DECISION → APPROVED → LOCKED

The generated reference image does not independently change the Reference State.

## 17. Prompt Lifecycle

Prompts are downstream artifacts.

Example:

IMAGE-PROMPT IP-04:
READY_FOR_DECISION → APPROVED → LOCKED

If Image Spec changes:

IP-04 → STALE

The old prompt may remain in history but must not be presented as the current prompt.

## 18. Audio Lifecycle

Audio Design follows the same lifecycle but operates as a parallel production layer.

Example:

AUDIO-DESIGN v2 = LOCKED

If Dialogue or Timeline changes in a way that affects audio:

AUDIO-DESIGN v2 → STALE

Unaffected visual artifacts remain unchanged.

## 19. Blocked Execution

BLOCKED is a dependency/execution condition, not a replacement for the core lifecycle.

A stage may be:

IN_PROGRESS + BLOCKED

or prevented from entering IN_PROGRESS when a required hard dependency is unavailable.

When the blocker is resolved, the stage can continue from its previous lifecycle position.

The system must identify the blocker explicitly.

## 20. Needs Input

NEEDS INPUT is an execution condition indicating that the user must supply or decide something required for the current stage.

It is not an implicit approval.

Example:

CONTENT-STRATEGY requires a platform but none has been provided.

AFFILIX pauses and requests the missing decision instead of inventing one.

## 21. Unknown and Unverified

UNKNOWN means the relevant truth is not known.

UNVERIFIED means information exists but its reliability cannot be established from available sources.

Neither state permits AFFILIX to invent certainty.

If the unknown or unverified information is a hard dependency, downstream execution is blocked.

## 22. Generated Output and State

Generated output is downstream from the production system.

A generated image or video may reveal a mismatch, but that mismatch does not automatically rewrite the state machine.

The proper response is:

GENERATED OUTPUT
→ identify affected upstream/specification issue
→ revise appropriate artifact
→ propagate STALE
→ regenerate targeted output

This prevents generation errors from becoming accidental project truth.

## 23. State History

Every meaningful transition should be traceable.

Recommended history fields:

| Field | Meaning |
|---|---|
| Artifact ID | Stable artifact identifier |
| Previous State | Prior lifecycle state |
| New State | New lifecycle state |
| Revision | Artifact revision |
| Trigger | User action, dependency change, or system transition |
| Changed Scope | Fields affected |
| Dependencies | Provider revisions involved |
| Timestamp | Transition time |
| Notes | Context |

Project State stores this history through DECISION-LOG and CHANGE-LOG where appropriate.

## 24. Command Mapping

### /Affilix

Reads current stage and lifecycle state without advancing it.

### /Affilix next

Executes one stage transition at a time.

It may move:
NOT_STARTED → IN_PROGRESS
or
IN_PROGRESS → READY_FOR_DECISION

It does not silently approve or lock.

### /Affilix approve

Moves:
READY_FOR_DECISION → APPROVED

If the workflow defines locking as part of the approval action, it may then record LOCKED as the current approved production revision. The exact command behavior must remain consistent with STAGE-EXECUTION.md.

### /Affilix revise

Moves the current artifact into revision handling and returns it to READY_FOR_DECISION when complete.

### /Affilix regenerate

Regenerates the smallest affected artifact scope and updates lifecycle state accordingly.

### /Affilix status

Reports lifecycle and dependency state without executing.

### /Affilix input

Resolves NEEDS INPUT conditions and re-evaluates readiness.

### /Affilix reset

Resets according to explicit scope while preserving Source of Truth unless the user explicitly changes it.

## 25. No Silent State Transitions

AFFILIX must not silently:
- approve a stage
- lock a stage
- skip a stage
- consume stale output as current
- convert unknown information into certainty
- turn generated output into Source of Truth
- advance past a hard dependency
- revise unrelated artifacts

State transitions must follow the workflow rules.

## 26. No Validation Stage

State management must not introduce a separate validation stage.

Readiness, dependency availability, stale detection, and execution conditions are evaluated inside the existing lifecycle and dependency system.

AFFILIX does not create a separate VALIDATION stage.

## 27. Non-Negotiable State Rules

1. Canonical lifecycle is NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED.
2. Relevant upstream changes can move LOCKED artifacts to STALE.
3. STALE artifacts must be revised before being treated as current.
4. REVISED does not mean approved.
5. Approval is explicit.
6. Locking records a current approved revision.
7. Locked artifacts can become stale.
8. Staleness propagates by dependency scope.
9. Unaffected artifacts remain intact.
10. Identity changes are upstream decisions.
11. State changes must preserve continuity.
12. Generated outputs do not automatically change lifecycle truth.
13. Missing hard dependencies block execution.
14. Unknown and unverified information must not be invented.
15. /Affilix next advances exactly one stage.
16. No silent approval, locking, skipping, or stale consumption.
17. State history must be traceable.
18. State management does not create a separate validation stage.
