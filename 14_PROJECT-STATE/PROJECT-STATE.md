# AFFILIX — Project State

## 1. Purpose

This document defines the canonical live state of an AFFILIX project.

Project State answers:

- What project is active?
- What stage is currently active?
- Which artifacts are current?
- Which decisions are approved?
- Which artifacts are locked?
- Which artifacts are stale?
- Which dependencies are blocking progress?
- What is the next allowed action?

Project State is the operational snapshot of the project.

It is not a replacement for the actual production artifacts.

## 2. Source of Project State

Project State is derived from:

1. explicit current user instructions
2. authoritative project artifacts
3. lifecycle state records
4. dependency records
5. decision records
6. change history

Generated outputs do not automatically modify Project State.

A generated image, video, audio file, or prompt becomes part of Project State only through the defined production workflow.

## 3. Project State Model

The canonical project state contains:

~~~text
PROJECT
IDENTITY
CURRENT STAGE
STAGE STATUS
CURRENT ARTIFACT
ARTIFACT REVISION
APPROVED ARTIFACTS
LOCKED ARTIFACTS
STALE ARTIFACTS
BLOCKED DEPENDENCIES
OPEN INPUTS
ACTIVE REFERENCES
ACTIVE CLIPS
GLOBAL TIMELINE
AUDIO STATUS
LAST DECISION
NEXT ALLOWED ACTION
LAST CHANGE
~~~

The implementation may store additional metadata.

## 4. Project Identity

Project identity identifies the production project itself.

Recommended fields:

~~~text
Project ID:
Project Name:
Created At:
Last Updated:
Project Version:
Workflow Version:
Platform:
Primary Format:
Category:
Status:
~~~

Project identity is not the same as Product Identity or Character Identity.

## 5. Current Stage

AFFILIX maintains exactly one primary current execution stage.

Examples:

- PRODUCT
- CONTENT-STRATEGY
- SCRIPT
- DIALOGUE
- CHARACTER
- ENVIRONMENT
- STORYBOARD
- GLOBAL-TIMELINE
- CLIP
- STATE
- PRODUCTION-SPEC
- PROMPT-OUTPUT
- NATURALIZATION
- AUDIO

Current Stage is the stage authorized for active execution.

Downstream stages must not be treated as current merely because their artifacts exist.

## 6. Current Stage Status

Current Stage should reference the lifecycle state defined in STATE-MACHINE.md:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Execution conditions such as BLOCKED or NEEDS INPUT are tracked alongside lifecycle state.

Example:

~~~text
CURRENT STAGE:
STORYBOARD

LIFECYCLE:
IN_PROGRESS

EXECUTION CONDITION:
NEEDS INPUT
~~~

This distinction prevents execution conditions from being confused with artifact lifecycle.

## 7. Current Artifact

The current stage should identify its primary artifact.

Recommended fields:

~~~text
Artifact ID:
Artifact Type:
Revision:
Lifecycle State:
Execution Condition:
Created At:
Updated At:
Provider Revisions:
~~~

The artifact reference must be traceable to its source and dependency revisions.

## 8. Artifact Registry

Project State should maintain an artifact registry containing the latest known revision of each project artifact.

Example:

~~~text
PRODUCT-TRUTH:
v2
LOCKED

CONTENT-STRATEGY:
v1
LOCKED

SCRIPT:
v1
APPROVED

STORYBOARD:
v2
READY_FOR_DECISION

IMAGE-PROMPT-R03:
v1
STALE
~~~

The registry should distinguish:
- current revision
- previous revisions
- lifecycle state
- execution condition
- dependency revision

## 9. Approved Artifacts

Approved artifacts are decisions explicitly accepted by the user.

Approval must record:

~~~text
Artifact:
Revision:
Approved At:
Decision:
Dependency Revisions:
Approved By:
~~~

For normal AFFILIX operation, Approved By should identify the user decision event rather than implying automatic system approval.

## 10. Locked Artifacts

Locked artifacts are approved revisions that are active as downstream inputs.

A lock records:

~~~text
Artifact:
Revision:
Locked At:
Lock Reason:
Provider Revisions:
~~~

Locking does not make the artifact immutable forever.

A relevant upstream change may make it STALE.

## 11. Stale Artifacts

Project State must explicitly track stale artifacts.

A stale artifact is historically valid for an earlier dependency revision but not current for the affected downstream use.

Recommended record:

~~~text
Artifact:
Current Revision:
Stale Since:
Changed Provider:
Provider Revision:
Impact Scope:
Required Action:
~~~

Stale artifacts remain available for traceability.

They must not be silently consumed as current truth.

## 12. Blocked Dependencies

Project State should expose active blockers.

Example:

~~~text
BLOCKED DEPENDENCY

Consumer:
VIDEO-PROMPT-CLIP-03

Provider:
REFERENCE-STATE-R07

Problem:
Required Start State is not defined.

Effect:
Video Prompt generation blocked.

Next Action:
Complete Reference State R07.
~~~

A blocker should identify the smallest affected scope.

## 13. Open Inputs

Open Inputs are unresolved user decisions or required project information.

Example:

~~~text
OPEN INPUTS

1. Target platform
2. Product variant
3. Preferred CTA
~~~

Open Inputs should distinguish:

- required before current stage
- required later
- optional
- unknown
- unverified

Only blocking inputs should stop the current stage.

## 14. Active References

Project State should track references currently used by production.

Recommended fields:

~~~text
Reference ID:
Reference Type:
Reference State:
Revision:
Status:
Used By:
Source Artifact:
~~~

Reference state must remain separate from the generated image itself.

## 15. Active Clips

Project State should track active clip units.

Recommended fields:

~~~text
Clip ID:
Scene ID:
Duration:
Start Reference:
End Reference:
Start State:
End State:
Status:
Dependencies:
~~~

Clip duration must follow active platform configuration.

For Google Flow, supported durations are currently configured as:

- 4s
- 6s
- 8s
- 10s

Platform configuration remains external to this Project State schema.

## 16. Global Timeline

Project State should reference the current Global Timeline revision.

Recommended fields:

~~~text
Timeline Revision:
Narrative Duration:
Scene Count:
Clip Count:
Current Timing Revision:
Status:
~~~

Global Timeline is narrative timing.

It is not required to use only generation-supported clip durations.

## 17. Audio Status

Audio is a parallel production layer.

Project State may track:

~~~text
Audio Design Revision:
Voice Identity Revision:
Dialogue Revision:
Timing Dependency:
Audio Status:
~~~

Audio state must not silently alter visual state.

## 18. Last Decision

The latest meaningful decision should be recorded.

Example:

~~~text
LAST DECISION

Stage:
CONTENT-STRATEGY

Artifact:
Content Strategy v2

Decision:
APPROVED

Timestamp:
2026-09-29T09:00:00+07:00

Next Stage:
SCRIPT
~~~

The record is historical. It does not itself execute the next stage.

## 19. Next Allowed Action

Project State should explicitly expose what the user can do next.

Examples:

~~~text
NEXT ALLOWED ACTION:
 /Affilix approve
 /Affilix revise
~~~

or:

~~~text
NEXT ALLOWED ACTION:
 /Affilix next
~~~

or:

~~~text
NEXT ALLOWED ACTION:
Provide missing Product Truth input.
~~~

The system must not execute the next action automatically.

## 20. Current Stage Invariant

At any time:

> There is one primary current stage.

This prevents ambiguous execution.

Sub-stages may exist inside a stage, but only one execution boundary is active.

## 21. Current Artifact Invariant

The current stage must identify a current artifact or explicitly indicate that the stage has not yet produced one.

Example:

~~~text
CURRENT STAGE:
SCRIPT

CURRENT ARTIFACT:
NONE

STATUS:
IN_PROGRESS
~~~

Do not invent an artifact revision simply because the stage is active.

## 22. State Consistency

Project State must distinguish:

### Identity

What the entity is.

### State

What condition the entity is currently in.

### Lifecycle

Where the artifact is in the approval process.

### Execution Condition

Whether the stage can currently proceed.

Example:

Product Identity:
White 250 ml bottle

Product State:
Held in right hand, cap open

Lifecycle:
LOCKED

Execution Condition:
READY

These are separate dimensions.

## 23. Dependency Snapshot

Project State should retain the dependency snapshot used by the current stage.

Example:

~~~text
DEPENDENCY SNAPSHOT

PRODUCT-TRUTH:
v2 LOCKED

CHARACTER-IDENTITY:
v1 LOCKED

ENVIRONMENT:
v2 APPROVED

STORYBOARD:
v3 APPROVED

REFERENCE-STATE-R04:
v2 LOCKED
~~~

This makes stale detection deterministic.

## 24. State and Dependency Reconciliation

When Project State is loaded, AFFILIX should reconcile:

1. current artifact revisions
2. lifecycle states
3. dependency revisions
4. stale records
5. current stage
6. open blockers
7. next allowed action

If a mismatch is detected, AFFILIX must preserve the mismatch explicitly rather than silently rewriting state.

## 25. Project State Update Rules

Project State changes only through defined events:

- stage execution
- explicit user input
- approval
- locking
- revision
- dependency change
- stale propagation
- targeted regeneration
- reset
- project initialization

Generated output alone is not sufficient to change authoritative Project State.

## 26. Stage Completion

A stage is not considered complete merely because output exists.

Normal progression is:

NOT_STARTED
→ IN_PROGRESS
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

A stage may remain at READY_FOR_DECISION until the user explicitly approves it.

## 27. Stale State

When an upstream change affects a locked artifact:

LOCKED
→ STALE

The artifact remains historically traceable.

The next active artifact must use a current approved revision rather than the stale one.

## 28. Revision State

When a stale or approved artifact is intentionally changed:

STALE or APPROVED
→ REVISED
→ READY_FOR_DECISION

Revision does not automatically approve or lock the artifact.

## 29. Failure State Overlay

Project State should allow execution conditions to coexist with lifecycle state.

Examples:

~~~text
Lifecycle:
IN_PROGRESS

Execution Condition:
BLOCKED
~~~

or:

~~~text
Lifecycle:
READY_FOR_DECISION

Execution Condition:
READY
~~~

or:

~~~text
Lifecycle:
LOCKED

Execution Condition:
STALE
~~~

This prevents the system from forcing every operational problem into the lifecycle model.

## 30. Project Reset

Reset is an explicit project operation.

A reset may:
- clear current stage
- clear derived artifacts
- preserve source materials
- preserve history
- reset selected modules

Reset scope must be explicit.

A reset must not silently delete historical truth or source records.

## 31. Minimal Project State Example

~~~text
PROJECT:
AFFILIX-DEMO-001

CURRENT STAGE:
STORYBOARD

LIFECYCLE:
READY_FOR_DECISION

EXECUTION CONDITION:
READY

CURRENT ARTIFACT:
STORYBOARD v2

LOCKED:
PRODUCT-TRUTH v1
CONTENT-STRATEGY v1
SCRIPT v1
DIALOGUE v1
CHARACTER-IDENTITY v1
ENVIRONMENT v1

STALE:
NONE

BLOCKERS:
NONE

OPEN INPUTS:
NONE

NEXT ACTION:
/Affilix approve
~~~

## 32. Blocked Project State Example

~~~text
PROJECT:
AFFILIX-DEMO-001

CURRENT STAGE:
VIDEO-PROMPT

LIFECYCLE:
IN_PROGRESS

EXECUTION CONDITION:
BLOCKED

BLOCKER:
START-REFERENCE R05

REASON:
Reference State does not establish required product orientation.

AFFECTED:
Video Prompt Clip 03

NEXT ACTION:
Repair Reference State R05.
~~~

## 33. Stale Project State Example

~~~text
PROJECT:
AFFILIX-DEMO-001

CURRENT STAGE:
PRODUCTION-SPEC

LIFECYCLE:
STALE

EXECUTION CONDITION:
STALE

CHANGED PROVIDER:
PRODUCT-TRUTH v2

AFFECTED ARTIFACT:
PRODUCTION-SPEC v1

NEXT ACTION:
Re-evaluate Production Spec against Product Truth v2.
~~~

## 34. Project State and User Commands

### /Affilix

Read and summarize current Project State.

No execution.

### /Affilix status

Show current stage, lifecycle, execution condition, blockers, stale artifacts, and next allowed action.

No execution.

### /Affilix next

Advance exactly one stage according to current Project State and dependencies.

### /Affilix approve

Approve the current READY_FOR_DECISION artifact when approval conditions are satisfied.

### /Affilix revise

Revise the current artifact without silently advancing.

### /Affilix regenerate

Regenerate the targeted artifact according to REGENERATION.md.

### /Affilix input

Record or request required project input.

### /Affilix reset

Perform an explicitly scoped reset.

## 35. Traceability

Every important Project State transition should be traceable to:

- user instruction
- stage execution
- dependency change
- approval
- revision
- regeneration
- reset

This enables reconstruction of how the current project state was reached.

## 36. Project State Is a Snapshot, Not the History

Project State represents the current operational snapshot.

Historical information belongs in:

- DECISION-LOG.md
- CHANGE-LOG.md
- artifact revision history
- dependency records

Do not overload Project State with the entire project history.

## 37. Project State and Source of Truth

Project State references Source of Truth but does not replace it.

Examples:

Product Truth remains authoritative for product facts.

Character Identity remains authoritative for character identity.

Voice Identity remains authoritative for voice identity.

Project State records which revisions are active, approved, locked, or stale.

## 38. Project State and Generated Outputs

Generated outputs are downstream artifacts.

They may be referenced by Project State as production results, but they do not automatically change:

- Product Truth
- Character Identity
- Voice Identity
- approved Script
- approved State
- dependency authority

## 39. Project State and Continuity

For frame-to-frame video, Project State must preserve:

END STATE CLIP N = START STATE CLIP N+1

The active reference chain should make this relationship traceable.

A broken bridge should appear as a blocker, stale dependency, or invalid dependency as appropriate.

## 40. Non-Negotiable Rules

1. Project State is the operational snapshot of the project.
2. One primary current stage exists at a time.
3. Current stage is not the same as artifact identity.
4. Lifecycle state is separate from execution condition.
5. Identity is separate from state.
6. Approved and locked artifacts are explicitly recorded.
7. Stale artifacts remain traceable but are not current downstream truth.
8. Hard blockers are exposed explicitly.
9. Open user inputs are explicit.
10. Generated outputs do not automatically become Source of Truth.
11. Project State does not replace source artifacts.
12. Stage completion requires the defined lifecycle transition.
13. Approval is explicit.
14. Locking is explicit.
15. Reset scope must be explicit.
16. State reconciliation must not silently rewrite mismatches.
17. Clip continuity must remain traceable.
18. Global Timeline is distinct from Clip duration.
19. Audio remains a parallel production layer.
20. Project history belongs in dedicated history records.
21. No silent downstream execution.
22. No separate validation stage.
