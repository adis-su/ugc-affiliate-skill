# AFFILIX — Failure Handling

## 1. Purpose

This document defines how AFFILIX behaves when production cannot safely continue.

Failure handling is part of stage execution. It is not a separate validation stage.

The system must prefer an explicit blocked or incomplete state over silently inventing information.

Core rule:

> If required truth, dependency, or input is unavailable, preserve the uncertainty and stop the affected execution.

## 2. Failure Handling Principles

AFFILIX follows these principles:

1. Never invent missing project truth.
2. Never present unverified information as fact.
3. Never hide a dependency failure.
4. Never silently skip a required stage.
5. Never overwrite authoritative source material with inference.
6. Never continue through a hard dependency failure.
7. Preserve unaffected work.
8. Keep the failure local to the smallest affected scope.
9. Explain exactly what is missing or blocked.
10. Provide the next valid action without executing it automatically.
11. Record failure state and relevant dependency information.
12. Do not create a separate validation stage.

## 3. Failure vs Revision

A failure means execution cannot safely proceed with the current information or dependency state.

A revision means the current artifact is intentionally changed.

Examples:

- Missing product material → failure condition.
- User changes product color → revision.
- Upstream Product Truth changes → downstream artifact may become STALE.
- User asks to change an approved script → revision.
- Required source cannot be accessed → SOURCE UNAVAILABLE.

Failure handling and revision handling must not be conflated.

## 4. Canonical Failure States

AFFILIX recognizes these execution states:

- BLOCKED
- NEEDS INPUT
- UNKNOWN
- UNVERIFIED
- SOURCE UNAVAILABLE
- DEPENDENCY INVALID
- STALE

These states describe why an artifact or stage cannot safely proceed.

They do not replace the canonical lifecycle:

NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED

When a relevant upstream change occurs:

LOCKED → STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED

## 5. BLOCKED

### Definition

BLOCKED means a required hard dependency prevents execution.

### Examples

- Product Truth is not available for a product-specific script.
- Character Identity is required but unresolved for a reference image.
- Start Reference is missing for a frame-to-frame video clip.
- A required upstream artifact is stale.
- A required platform configuration is unavailable.

### Required behavior

AFFILIX must:

1. stop the affected stage
2. identify the blocking dependency
3. identify why it blocks execution
4. preserve current project state
5. identify the next valid action
6. avoid generating dependent output

Example:

~~~text
STATUS: BLOCKED

CURRENT STAGE:
VIDEO PROMPT

BLOCKING DEPENDENCY:
START REFERENCE

REASON:
The clip requires a defined starting visual state.

NEXT ACTION:
Create or approve the required Start Reference.
~~~

## 6. NEEDS INPUT

### Definition

NEEDS INPUT means the system has reached a decision or information boundary that requires explicit user input.

### Examples

- Target audience is unspecified.
- User has not selected a content angle where selection is required.
- Product variant is unclear.
- The user has not approved a current stage.
- Multiple valid options require a user decision.

### Required behavior

AFFILIX must:

1. stop execution
2. state the exact missing input
3. explain why it is required
4. avoid inventing an answer
5. wait for explicit input

The request should be minimal and decision-oriented.

Example:

~~~text
STATUS: NEEDS INPUT

MISSING:
Target platform

WHY:
Platform affects format, duration, framing, and CTA requirements.

INPUT REQUIRED:
TikTok / Instagram / YouTube Shorts / Marketplace / Other
~~~

## 7. UNKNOWN

### Definition

UNKNOWN means the relevant fact is genuinely not known from available sources.

Unknown is different from false.

### Examples

- Exact product material is not stated.
- Exact package dimensions are unavailable.
- A seller has not specified a product attribute.

### Required behavior

AFFILIX must:

- preserve the field as UNKNOWN
- avoid converting inference into fact
- avoid unsupported claims
- allow execution only if the unknown is not a hard requirement

Example:

~~~text
PRODUCT MATERIAL:
UNKNOWN

USAGE:
Allowed for internal planning if material is not required.

CLAIM:
Do not describe the material in final content.
~~~

## 8. UNVERIFIED

### Definition

UNVERIFIED means information exists but its reliability or authority is insufficient for the required use.

### Examples

- A product specification appears in a third-party post but is absent from authoritative product information.
- A user-provided claim conflicts with a source of truth.
- An external source contains an attribute that cannot be confirmed.

### Required behavior

AFFILIX must:

1. label the information UNVERIFIED
2. avoid treating it as authoritative
3. determine whether the stage requires verification
4. block only if the information is a hard requirement
5. preserve the source and uncertainty for traceability

## 9. SOURCE UNAVAILABLE

### Definition

SOURCE UNAVAILABLE means a required source cannot currently be accessed or retrieved.

This is different from UNKNOWN.

UNKNOWN:
The fact is not known.

SOURCE UNAVAILABLE:
The relevant source may contain the fact, but the source cannot currently be accessed.

### Required behavior

AFFILIX must:

- identify the unavailable source
- preserve the existing known state
- avoid reconstructing the source content from guesswork
- block affected work if the source is required

## 10. DEPENDENCY INVALID

### Definition

DEPENDENCY INVALID means a referenced provider artifact exists but cannot safely satisfy the dependency.

Examples:

- A reference points to an artifact that no longer exists.
- A dependency expects Product Truth but receives an outdated or incompatible artifact.
- A clip references a Start State that is structurally incomplete.
- A provider revision does not match the required dependency contract.

### Required behavior

AFFILIX must:

1. stop affected execution
2. identify the invalid provider
3. explain the dependency mismatch
4. preserve unaffected artifacts
5. repair or revise the provider before retrying

Do not silently substitute another artifact.

## 11. STALE

### Definition

STALE means an artifact was valid for an earlier upstream revision but is no longer current.

Stale does not mean the artifact is inherently wrong.

It means:

> The artifact must be reconsidered because a relevant dependency changed.

### Example

Product Truth v1
→ Script v1
→ Storyboard v1

Product Truth changes to v2.

If the change affects the storyboard's product representation:

Storyboard v1 → STALE

### Required behavior

AFFILIX must:

1. identify the changed upstream revision
2. identify affected downstream artifacts
3. preserve unaffected artifacts
4. prevent stale artifacts from being treated as current
5. regenerate or revise only affected scope

## 12. Hard vs Soft Failure

### Hard failure

A failure involving a hard dependency.

Result:

> Block affected execution.

### Soft issue

An issue that does not prevent safe execution.

Result:

> Continue while preserving the issue explicitly.

Example:

A category knowledge file is unavailable but the current stage can be completed from approved project truth.

This should not necessarily block execution.

## 13. Failure Scope

Failures should propagate only through affected dependency branches.

Example:

PRODUCT TRUTH
├── Script
├── Storyboard
├── Product State
└── Product Prompt

If only a product background color description changes and it does not affect Script, the Script should not automatically become stale.

The dependency graph determines propagation.

## 14. Failure Propagation

When a provider becomes invalid or stale:

1. identify direct consumers
2. determine whether the changed scope affects each consumer
3. mark affected consumers STALE or BLOCKED
4. recursively inspect downstream consumers
5. stop propagation where dependency scope is unaffected

Do not mark the entire project stale by default.

## 15. Failure Recovery

Recovery follows this pattern:

FAILURE
→ IDENTIFY CAUSE
→ REPAIR INPUT / DEPENDENCY
→ RECHECK AFFECTED STAGE
→ REVISE IF REQUIRED
→ READY_FOR_DECISION
→ APPROVE
→ LOCK

Recovery does not automatically execute unrelated downstream stages.

## 16. Recovery by Failure Type

### BLOCKED

Repair or supply the blocking dependency.

Then retry the affected stage.

### NEEDS INPUT

Receive explicit user input.

Then resume the affected decision.

### UNKNOWN

Either:
- obtain authoritative information, or
- continue without using the unknown field if it is non-essential.

### UNVERIFIED

Either:
- verify the information, or
- exclude it from claims/specifications where verification is required.

### SOURCE UNAVAILABLE

Either:
- restore source access, or
- provide an alternative authoritative source.

Do not fabricate source content.

### DEPENDENCY INVALID

Repair the dependency contract or replace it through an explicit revision.

### STALE

Re-evaluate the artifact against the new upstream revision and revise only where required.

## 17. Failure and Approval

A failed stage cannot be approved as though it were ready.

Rules:

- BLOCKED cannot become APPROVED directly.
- NEEDS INPUT cannot become APPROVED without the required input.
- STALE cannot remain LOCKED as the active downstream artifact.
- UNKNOWN may be approved only when the unknown is explicitly acceptable and does not violate required claims or dependencies.
- UNVERIFIED may be approved only when its use does not require verification.
- SOURCE UNAVAILABLE may be approved only if the unavailable source is not required for the current decision.
- DEPENDENCY INVALID must be repaired before dependent execution.

## 18. Failure and Locking

A LOCKED artifact must not silently continue as the current truth after a relevant hard dependency becomes stale or invalid.

If a locked artifact becomes stale:

LOCKED → STALE

The artifact remains historically traceable but is no longer the current downstream input.

## 19. Failure and Generated Outputs

Generated outputs never become Source of Truth automatically.

If a generated image appears to contain a product feature that was not established upstream:

- do not promote that feature into Product Truth
- do not use the generated image as evidence of the feature
- flag the discrepancy if it affects production

The generated artifact may be regenerated, but the upstream truth remains authoritative.

## 20. Claim-Safety Failures

If a proposed script, dialogue, storyboard, or prompt contains a product claim not supported by Product Truth:

The affected claim is not allowed to pass downstream as established fact.

Possible handling:

- remove the unsupported claim
- replace it with a supported statement
- request product information
- mark the claim unverified when appropriate

Do not invent supporting evidence.

## 21. Identity Failure

Identity conflicts are high-priority failures.

### Product Identity conflict

Examples:
- brand changed
- variant changed
- package shape changed
- logo changed
- physical design changed

### Character Identity conflict

Examples:
- face changes
- facial structure changes
- visual age changes
- body identity changes

### Voice Identity conflict

Examples:
- gender presentation changes
- perceived age changes
- timbre changes
- speaking characteristics change

Required behavior:

Do not silently normalize identity conflicts as ordinary state changes.

Identity is not state.

## 22. State Failure

State failures occur when required current conditions cannot be established.

Examples:

- Product must be open but current reference shows closed.
- Character must hold the product but hand/product relationship is undefined.
- Camera must match a required viewpoint but camera state is missing.
- Clip End State does not satisfy the next clip Start State.

Required behavior:

- identify the missing or conflicting state
- block the affected transition when necessary
- repair the state chain
- preserve identity

## 23. Reference Failure

A Reference is invalid for downstream use when its required state is incomplete, contradictory, or unavailable.

Examples:

- Start Reference does not show the required product state.
- End Reference conflicts with the intended next Start State.
- Character identity cannot be reliably preserved.
- Camera state is incompatible with the clip requirement.

Do not use an invalid reference merely because an image exists.

## 24. Clip Continuity Failure

For frame-to-frame production:

END STATE OF CLIP N = START STATE OF CLIP N+1

If this continuity cannot be established:

- mark the affected transition BLOCKED or DEPENDENCY INVALID
- identify the conflicting states
- repair the bridge reference or state specification
- do not hide the discontinuity in the prompt

## 25. Failure Messages

Failure messages should be concise and operational.

Preferred structure:

~~~text
STATUS: [FAILURE TYPE]

CURRENT STAGE:
[stage]

BLOCKER / ISSUE:
[exact issue]

AFFECTED:
[artifact or dependency]

WHY IT MATTERS:
[brief reason]

NEXT REQUIRED ACTION:
[one action]
~~~

Avoid vague messages such as:
- “Something went wrong.”
- “The prompt cannot be generated.”
- “Please provide more details.”

The user should know exactly what is missing or conflicting.

## 26. No Automatic Workaround

AFFILIX must not silently solve a hard failure by changing the requirement.

Examples:

If Product Truth says bottle is white:
- do not make it silver because silver looks better.

If the user has not specified a target platform:
- do not silently assume TikTok.

If Start Reference is missing:
- do not invent a visual state.

If product material is unknown:
- do not describe it as glass, plastic, metal, or any other material.

A workaround is valid only when it is explicitly allowed by the dependency and project rules.

## 27. Preserving Unaffected Work

Failure handling must be surgical.

If Stage A fails:

- preserve completed unrelated stages
- preserve valid artifacts
- preserve approved decisions
- isolate affected branches

Do not reset the entire project unless explicitly requested or the dependency graph proves that a full reset is required.

## 28. Retry Rules

A retry is allowed after the cause of failure is resolved.

Retry must use:
- the corrected input
- the current provider revisions
- the current project state

Retry does not erase the failure record.

The system should preserve failure history for traceability.

## 29. Failure History

Failure records should conceptually contain:

~~~text
Failure ID:
Timestamp:
Stage:
Failure Type:
Artifact:
Dependency:
Provider Revision:
Observed Condition:
Impact:
User Action Required:
Resolution:
Resolved At:
Resulting State:
~~~

## 30. Interaction With State Machine

Failure states do not replace lifecycle state.

Example:

Stage lifecycle:
IN_PROGRESS

Execution condition:
BLOCKED

After dependency repair:
IN_PROGRESS

After output:
READY_FOR_DECISION

After approval:
APPROVED

After lock:
LOCKED

This separation keeps execution condition distinct from artifact lifecycle.

## 31. Interaction With Dependency System

Failure handling relies on the dependency graph.

The dependency system determines:
- what is required
- what is affected
- what becomes stale
- what can continue independently
- where propagation stops

Failure handling must never invent dependency relationships.

## 32. Interaction With Stage Execution

Stage Execution determines whether a stage may run.

Failure Handling determines what happens when it cannot safely run.

The two systems work together:

STAGE EXECUTION
→ checks conditions

FAILURE HANDLING
→ classifies and manages failure

STATE MACHINE
→ records lifecycle state

DEPENDENCY SYSTEM
→ determines propagation

No additional validation stage is inserted.

## 33. No Hidden Failure

AFFILIX must never silently downgrade a failure into a successful-looking output.

If a required condition is unresolved, the output must clearly reflect that condition.

A polished prompt that contains unsupported assumptions is a failure, not a successful execution.

## 34. Non-Negotiable Rules

1. Never invent missing truth.
2. Never hide dependency failures.
3. Never treat unverified information as established fact.
4. Never continue through a required hard dependency failure.
5. Preserve unaffected work.
6. Keep failure scope as small as possible.
7. Propagate only through affected dependency branches.
8. Stale artifacts are not current downstream truth.
9. Generated outputs never become Source of Truth automatically.
10. Identity conflicts are not ordinary state changes.
11. Reference continuity must be explicit.
12. Clip N End State must satisfy Clip N+1 Start State.
13. Claim failures must be resolved or excluded.
14. Failure recovery does not automatically execute downstream work.
15. Failure history remains traceable.
16. Failure states do not replace lifecycle states.
17. No silent workaround.
18. No silent skip.
19. No silent assumption.
20. No separate validation stage.
