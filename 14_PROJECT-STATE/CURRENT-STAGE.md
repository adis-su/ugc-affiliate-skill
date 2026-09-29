# AFFILIX — Current Stage

## 1. Purpose

This document defines how AFFILIX determines, stores, displays, and changes the project's current execution stage.

Current Stage is the single primary execution boundary of the project.

Core rule:

> One project has one primary current stage at a time.

The current stage determines what AFFILIX is authorized to execute next.

## 2. Current Stage vs Project State

Project State is the complete operational snapshot.

Current Stage is one component of Project State.

Project State answers:
- what exists
- what is approved
- what is locked
- what is stale
- what is blocked
- what inputs are open

Current Stage answers:

> What production stage is active now?

## 3. Canonical Stage Order

The default AFFILIX stage order is:

1. PRODUCT
2. CONTENT-STRATEGY
3. SCRIPT
4. DIALOGUE
5. CHARACTER
6. ENVIRONMENT
7. STORYBOARD
8. GLOBAL-TIMELINE
9. CLIP
10. STATE
11. PRODUCTION-SPEC
12. PROMPT-OUTPUT
13. NATURALIZATION
14. AUDIO

This is the default dependency-aware order.

A project may omit a stage only when the workflow explicitly determines that the stage is unnecessary and all downstream dependency requirements remain satisfied.

## 4. Current Stage Record

Recommended structure:

~~~text
CURRENT STAGE:
[stage ID]

STAGE NAME:
[human-readable name]

STAGE INDEX:
[number]

LIFECYCLE:
[NOT_STARTED / IN_PROGRESS / READY_FOR_DECISION / APPROVED / LOCKED / STALE / REVISED]

EXECUTION CONDITION:
[READY / NEEDS INPUT / BLOCKED / UNKNOWN / UNVERIFIED / SOURCE UNAVAILABLE / DEPENDENCY INVALID / STALE]

CURRENT ARTIFACT:
[artifact ID or NONE]

ARTIFACT REVISION:
[revision]

REQUIRED DECISION:
[decision]

BLOCKERS:
[list]

OPEN INPUTS:
[list]

NEXT ALLOWED ACTION:
[action]
~~~

## 5. Stage Identity

Stage Identity is not artifact identity.

Example:

CURRENT STAGE:
STORYBOARD

CURRENT ARTIFACT:
STORYBOARD v3

The stage remains STORYBOARD even when the artifact revision changes.

## 6. Current Stage Selection

AFFILIX determines Current Stage using:

1. explicit current user instruction
2. current Project State
3. lifecycle state
4. dependency readiness
5. workflow order
6. active revision or regeneration context

The system must not choose a downstream stage merely because downstream output is technically possible.

## 7. Initial State

A new project begins with:

~~~text
CURRENT STAGE:
PRODUCT

LIFECYCLE:
NOT_STARTED

EXECUTION CONDITION:
READY

CURRENT ARTIFACT:
NONE

NEXT ACTION:
/Affilix next
~~~

If Product information is missing, execution condition becomes NEEDS INPUT.

## 8. Stage Activation

When a stage becomes current:

NOT_STARTED → IN_PROGRESS

The system records:
- stage activation
- timestamp
- relevant dependency revisions
- current artifact if one exists
- open inputs
- execution condition

Activation does not mean approval.

## 9. Stage Readiness

A stage may execute only when:

- required hard dependencies are current
- required inputs are available
- no blocking dependency exists
- no required provider is stale
- stage-specific requirements are satisfiable

If these conditions are not met, the stage remains current but its execution condition explains why it cannot proceed.

## 10. READY_FOR_DECISION

After successful execution:

IN_PROGRESS → READY_FOR_DECISION

The stage has produced its primary output.

AFFILIX must stop.

The next action is normally:

/Affilix approve

or:

/Affilix revise

## 11. Approval Transition

When the current artifact is READY_FOR_DECISION and approval conditions are satisfied:

READY_FOR_DECISION → APPROVED

Approval is an explicit user decision.

Approval must not silently execute the next stage.

## 12. Lock Transition

When the workflow requires the approved artifact to become the active downstream input:

APPROVED → LOCKED

Locking follows the workflow's approval/locking rules.

A lock does not prevent future staleness.

## 13. Advancing the Current Stage

The command:

/Affilix next

advances exactly one stage.

It does not:
- execute multiple stages
- auto-approve the current stage
- skip unresolved dependencies
- regenerate unrelated artifacts
- rewrite upstream decisions
- execute the whole pipeline

Example:

CURRENT:
SCRIPT

After /Affilix next:

CURRENT:
DIALOGUE

Only if Script is in the required approved/locked condition and Dialogue dependencies are ready.

## 14. Next Stage Eligibility

The next stage is eligible when:

1. current stage has reached its required completion state
2. required dependencies are approved/current
3. next stage is not blocked
4. no required upstream artifact is stale
5. workflow allows transition

If not eligible, /Affilix next must stop and explain the blocker.

## 15. No Silent Stage Skip

AFFILIX must not skip a stage merely because its output can be inferred.

Example:

Script is missing but a user asks for Video Prompt.

AFFILIX must not silently invent the Script.

If the workflow permits an explicitly documented shortcut, it must be represented as a deliberate workflow decision and its dependency implications recorded.

## 16. Revision of Current Stage

The command:

/Affilix revise

acts on the current stage.

Rules:

1. keep the current stage active
2. identify changed intent
3. preserve unaffected fields
4. revise the artifact
5. re-evaluate dependencies
6. return to READY_FOR_DECISION
7. wait for approval

Revision does not advance the current stage.

## 17. Regeneration of Current Stage

The command:

/Affilix regenerate

targets the current or explicitly identified artifact according to REGENERATION.md.

Regeneration does not automatically advance the current stage.

A regenerated decision artifact returns to READY_FOR_DECISION.

## 18. Status Command

The command:

/Affilix status

shows:

- Current Stage
- Lifecycle
- Execution Condition
- Current Artifact
- Revision
- Dependencies
- Blockers
- Open Inputs
- Last Decision
- Next Allowed Action

It performs no production execution.

## 19. Inspect Command

The command:

/Affilix

inspects current Project State.

It may summarize:
- current stage
- recent decisions
- blockers
- stale artifacts
- next action

It does not execute production.

## 20. Input Command

The command:

/Affilix input

records or requests required project information.

After input is supplied:

- update relevant artifact/source
- re-evaluate dependencies
- re-evaluate execution condition
- keep the same current stage unless workflow explicitly permits transition

Input does not mean approval.

## 21. Blocked Current Stage

If the current stage is BLOCKED:

- remain on the same Current Stage
- identify the blocking dependency
- do not advance
- do not generate dependent output
- preserve existing artifacts

Example:

~~~text
CURRENT STAGE:
VIDEO-PROMPT

CONDITION:
BLOCKED

BLOCKER:
START REFERENCE R08

NEXT:
Repair R08 before continuing.
~~~

## 22. NEEDS INPUT Current Stage

If the current stage is NEEDS INPUT:

- remain on the same Current Stage
- identify exact missing information
- request only what is needed
- do not guess
- do not advance

## 23. UNKNOWN Current Stage

If required information is UNKNOWN:

- keep Current Stage
- determine whether the unknown is blocking
- if blocking, stop
- if non-blocking, preserve UNKNOWN explicitly

Unknown must never silently become an inferred fact.

## 24. UNVERIFIED Current Stage

If required information is UNVERIFIED:

- identify the source and uncertainty
- determine whether verification is required
- block only if it is a hard requirement
- do not present the information as authoritative

## 25. SOURCE UNAVAILABLE Current Stage

If a required source is unavailable:

- remain on Current Stage
- identify the unavailable source
- preserve known information
- avoid reconstructing unavailable source content
- block only where the source is required

## 26. DEPENDENCY INVALID Current Stage

If a dependency is structurally invalid:

- remain on Current Stage
- identify provider and mismatch
- repair provider or dependency contract
- re-evaluate stage readiness
- do not substitute silently

## 27. STALE Current Stage

If the current stage becomes stale due to upstream revision:

1. remain aware of the current stage
2. mark affected artifact STALE
3. identify changed provider
4. determine earliest affected artifact
5. revise/regenerate as required
6. return to READY_FOR_DECISION when the current artifact is rebuilt

Do not continue using stale input as current truth.

## 28. Upstream Revision While Downstream Stage Is Current

Example:

Current Stage:
VIDEO-PROMPT

Product Truth changes.

If Video Prompt depends on the changed product field:

VIDEO-PROMPT
→ STALE

AFFILIX must trace the dependency impact.

It must not simply continue generating from the old Product Truth.

## 29. Preserving Current Stage During Repair

When repairing a dependency, AFFILIX should preserve the current stage context.

Example:

Current Stage:
STORYBOARD

Storyboard is blocked because Environment is incomplete.

Repair Environment first through the appropriate upstream workflow.

The project may temporarily enter an upstream repair context, but the intended production boundary remains traceable.

No stage jump should become invisible.

## 30. Stage Return

After an upstream repair completes:

1. re-evaluate dependencies
2. re-evaluate current artifact
3. restore the affected stage to its correct lifecycle state
4. continue only through explicit commands

Example:

STORYBOARD
→ blocked by ENVIRONMENT
→ ENVIRONMENT repaired
→ STORYBOARD becomes IN_PROGRESS
→ execute Storyboard
→ READY_FOR_DECISION

## 31. Stage Completion Record

When a stage reaches READY_FOR_DECISION, record:

~~~text
Stage:
Artifact:
Revision:
Completed At:
Input Revisions:
Dependency Revisions:
Primary Output:
Decision Required:
~~~

## 32. Stage Approval Record

When approved:

~~~text
Stage:
Artifact:
Revision:
Decision:
Approved At:
Dependency Snapshot:
Next Eligible Stage:
~~~

Approval does not itself execute the next stage.

## 33. Stage Lock Record

When locked:

~~~text
Stage:
Artifact:
Revision:
Locked At:
Lock Reason:
Active Provider Revisions:
~~~

## 34. Stage History

Current Stage changes should be recorded in Change Log.

Example:

~~~text
CURRENT STAGE:
CONTENT-STRATEGY

PREVIOUS:
PRODUCT

TRANSITION:
PRODUCT → CONTENT-STRATEGY

TRIGGER:
/Affilix next

PRECONDITIONS:
Product Truth approved and current
~~~

## 35. Current Stage and Parallel Audio

Audio is a parallel production layer but still follows controlled execution.

When Audio is the active stage:

- Audio becomes the Current Stage.
- Its dependencies are evaluated.
- Its Audio Design is produced.
- The user decides whether to approve or revise.
- Visual stages are not silently regenerated unless dependencies require it.

Audio does not create permission to bypass visual dependencies.

## 36. Current Stage and Prompt Production

Prompt production remains downstream.

A Prompt Output stage cannot safely execute if required:
- Production Spec
- Reference State
- Identity
- State
- Environment
- camera requirements
- platform configuration

are missing or invalid.

The system should stop at the missing dependency rather than inventing it.

## 37. Current Stage and Clip Continuity

For frame-to-frame clips:

END STATE OF CLIP N = START STATE OF CLIP N+1

If this continuity is broken, the affected stage becomes blocked or stale as appropriate.

Current Stage must not advance through a known continuity failure.

## 38. Current Stage and User Control

The user controls progression through explicit decisions.

AFFILIX may:
- explain
- prepare
- calculate
- produce the current stage output
- identify blockers
- expose the next action

AFFILIX must not:
- silently approve
- silently lock
- silently skip
- silently advance
- silently regenerate unrelated stages

## 39. Stage Selection After Approval

After approval and locking of the current stage:

- the next eligible stage becomes available
- Current Stage may transition to that stage only through the defined workflow command
- /Affilix next advances exactly one stage

The system must not interpret approval alone as a request to continue.

## 40. Stage Selection After Revision

After revision:

REVISED
→ READY_FOR_DECISION

Current Stage remains the same.

Only after approval can the workflow consider advancing.

## 41. Stage Selection After Regeneration

After targeted regeneration:

Current Stage remains the same.

The regenerated artifact returns to the appropriate decision state.

No automatic downstream stage execution occurs.

## 42. Stage Selection After Failure

Failure does not automatically change Current Stage.

Instead:

Current Stage
+ Execution Condition
+ Failure Cause

determine the next repair action.

This keeps the project from jumping to an unrelated stage merely because the current stage cannot proceed.

## 43. Current Stage State Machine

The simplified stage flow is:

NOT_STARTED
→ IN_PROGRESS
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

Revision path:

LOCKED
→ STALE
→ REVISED
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

Execution conditions overlay this lifecycle:

READY
NEEDS INPUT
BLOCKED
UNKNOWN
UNVERIFIED
SOURCE UNAVAILABLE
DEPENDENCY INVALID
STALE

## 44. Current Stage Example

~~~text
PROJECT:
AFFILIX-DEMO-001

CURRENT STAGE:
STORYBOARD

STAGE INDEX:
7

LIFECYCLE:
READY_FOR_DECISION

EXECUTION CONDITION:
READY

CURRENT ARTIFACT:
STORYBOARD v2

REQUIRED DECISION:
Approve storyboard

BLOCKERS:
None

OPEN INPUTS:
None

NEXT ALLOWED ACTION:
/Affilix approve
~~~

## 45. Current Stage Blocked Example

~~~text
PROJECT:
AFFILIX-DEMO-001

CURRENT STAGE:
VIDEO-PROMPT

LIFECYCLE:
IN_PROGRESS

EXECUTION CONDITION:
BLOCKED

CURRENT ARTIFACT:
VIDEO-PROMPT-CLIP-03 v1

BLOCKER:
START REFERENCE R07

REASON:
Required product orientation is not established.

NEXT ALLOWED ACTION:
Repair R07.
~~~

## 46. Current Stage Rules for /Affilix next

Before advancing:

1. confirm current stage
2. confirm lifecycle completion
3. confirm required dependencies
4. confirm no blocking condition
5. identify exactly one next stage
6. activate that stage
7. stop

If any condition fails, do not advance.

## 47. No Automatic Stage Jump

AFFILIX must not jump from Product directly to Prompt Output simply because the user asks for a prompt.

The system should either:
- execute required stages in sequence, one at a time, or
- use an explicitly documented shortcut that preserves all required dependency contracts.

No shortcut may silently remove Source of Truth requirements.

## 48. Non-Negotiable Rules

1. One primary Current Stage exists at a time.
2. Current Stage determines the active execution boundary.
3. /Affilix next advances exactly one stage.
4. Approval does not automatically advance.
5. Revision does not automatically advance.
6. Regeneration does not automatically advance.
7. Failure does not automatically advance.
8. Required hard dependencies must be current.
9. Stale dependencies prevent affected execution.
10. Unknown information is never silently inferred as fact.
11. Unverified information is never silently promoted to authority.
12. Blocked stages remain blocked until their cause is resolved.
13. Current Stage is separate from artifact identity.
14. Lifecycle state is separate from execution condition.
15. Identity is separate from state.
16. Stage history remains traceable.
17. Upstream repairs remain visible.
18. Audio remains a controlled parallel layer.
19. Clip continuity must be preserved.
20. No silent stage skip.
21. No silent approval.
22. No silent lock.
23. No silent regeneration.
24. No silent downstream execution.
25. No separate validation stage.
