# AFFILIX — Regeneration

## 1. Purpose

This document defines how AFFILIX regenerates project artifacts without unnecessarily rebuilding the entire production pipeline.

Regeneration is dependency-aware and targeted.

Core rule:

> Regenerate the smallest affected scope that restores a valid downstream chain.

Regeneration is not the same as revision, approval, or full project reset.

## 2. Core Principles

AFFILIX regeneration follows these principles:

1. Regenerate only what is affected.
2. Preserve unaffected approved work.
3. Never regenerate upstream truth from downstream output.
4. Never use generated output as a new Source of Truth automatically.
5. Respect dependency direction.
6. Preserve identity.
7. Preserve required state.
8. Rebuild stale derived artifacts from current upstream revisions.
9. Record regeneration history.
10. Require explicit approval for regenerated decision artifacts.
11. Do not silently continue downstream after regeneration.
12. Do not insert a separate validation stage.

## 3. Regeneration vs Revision

### Revision

A revision changes the intended content or decision.

Example:

User changes the product angle from “problem-solution” to “routine.”

This changes Content Strategy intentionally.

### Regeneration

Regeneration recreates an artifact from the same or updated approved inputs.

Example:

The Image Prompt needs to be recreated because its previous output was lost or because an upstream approved spec changed.

A regeneration may contain the same intent with a new generated artifact.

## 4. Regeneration vs Retry

### Retry

Retry repeats an execution after a temporary execution failure has been resolved.

### Regeneration

Regeneration intentionally recreates an artifact from current dependencies.

Example:

- Source unavailable temporarily → retry after source access returns.
- Approved Product Truth changes → regenerate affected downstream artifacts.

## 5. Regeneration vs Reset

### Regeneration

Targeted rebuild of affected artifacts.

### Reset

Explicit project-level lifecycle reset.

Reset is exceptional and must not be used as a shortcut for ordinary regeneration.

## 6. Dependency-Driven Scope

The dependency graph determines regeneration scope.

Example:

PRODUCT TRUTH v2
→ STORYBOARD v1 becomes STALE
→ STATE v1 becomes STALE
→ IMAGE SPEC v1 becomes STALE
→ IMAGE PROMPT v1 becomes STALE

If Script is unaffected by the Product Truth change, Script remains current.

Do not regenerate the entire project simply because one upstream artifact changed.

## 7. Direct and Transitive Regeneration

### Direct

The provider directly changed.

Example:

Video Spec changes
→ Video Prompt is directly affected.

### Transitive

A downstream artifact depends on a changed artifact through one or more intermediate providers.

Example:

Product Truth changes
→ Storyboard changes
→ State changes
→ Production Spec changes
→ Video Prompt changes.

AFFILIX must follow the dependency graph rather than assuming every downstream artifact is affected.

## 8. Regeneration Triggers

Regeneration may be triggered by:

- upstream revision
- stale dependency
- explicit user regeneration request
- lost generated artifact
- corrupted or incomplete generated artifact
- changed approved production specification
- changed platform configuration where the artifact depends on it
- changed reference state
- changed clip boundary
- targeted prompt refinement

A trigger does not automatically authorize regeneration of unrelated artifacts.

## 9. Regeneration Command

The canonical command is:

/Affilix regenerate

It acts on the current or explicitly targeted artifact.

The system must identify:
- target artifact
- reason
- required dependencies
- affected downstream artifacts
- expected result

If the target is ambiguous, execution stops with NEEDS INPUT.

## 10. Targeted Regeneration

When only one artifact is affected:

TARGET → REGENERATE

Example:

Video Prompt v1
→ regenerate
→ Video Prompt v2

Unrelated artifacts remain unchanged.

## 11. Dependency-Aware Regeneration

When an upstream artifact changes:

1. identify changed revision
2. identify direct consumers
3. determine affected scope
4. mark affected artifacts STALE
5. determine earliest artifact requiring regeneration
6. regenerate that artifact
7. re-evaluate downstream dependencies
8. regenerate only newly affected artifacts
9. stop at the current execution boundary

This prevents unnecessary cascade generation.

## 12. Earliest-Affected Principle

When multiple downstream artifacts become stale, regeneration should begin at the earliest affected artifact.

Example:

Product Truth v2
→ Storyboard v1 stale
→ State v1 stale
→ Production Spec v1 stale
→ Video Prompt v1 stale

Regenerate from Storyboard first.

Do not regenerate Video Prompt directly from obsolete inputs.

## 13. Preserve Approved Decisions

A regeneration must not silently alter an approved upstream decision.

If regeneration reveals that an upstream decision must change, that change is a revision.

Example:

Regenerating a storyboard exposes that the approved Content Strategy cannot support the requested scene.

Do not silently rewrite Content Strategy.

Instead:

1. report the conflict
2. mark affected work as blocked or stale as appropriate
3. revise upstream through the normal workflow
4. regenerate downstream afterward

## 14. Identity Preservation

Regeneration must preserve identity unless an explicit revision changes it.

### Product Identity

Preserve:
- brand
- product name
- variant
- shape
- color
- packaging
- logo
- material where authoritative
- physical details

### Character Identity

Preserve:
- face
- facial structure
- eyes
- eyebrows
- nose
- lips
- proportions
- skin
- visual age
- body identity

### Voice Identity

Preserve:
- gender presentation
- perceived age
- pitch
- timbre
- pace
- rhythm
- energy
- characteristic delivery

Identity must not drift merely because an artifact is regenerated.

## 15. State Preservation

Regeneration must preserve required state.

State may change only when:
- the current stage intentionally changes it
- an upstream approved revision requires it
- an explicit user instruction changes it

Regeneration cannot use visual variation as justification for changing required state.

## 16. Reference Regeneration

A reference may be regenerated when:

- its required state changes
- its source specification changes
- identity continuity is compromised
- the reference is incomplete
- the reference is lost or unusable

The regenerated reference must still represent the intended Reference State.

Reference regeneration may invalidate downstream prompts or clips that depend on that reference.

## 17. Prompt Regeneration

Prompt regeneration is allowed when:

- Image Spec changes
- Video Spec changes
- Reference State changes
- relevant platform configuration changes
- approved upstream state changes
- explicit prompt regeneration is requested

The prompt must be regenerated from current specifications, not from an obsolete prompt.

## 18. Image Prompt Regeneration

Image Prompt regeneration follows:

CURRENT IMAGE SPEC
+ CURRENT REFERENCE STATE
+ CURRENT IDENTITY
+ CURRENT ENVIRONMENT
→ NEW IMAGE PROMPT

Do not regenerate by blindly editing the previous prompt if its assumptions are stale.

The current structured sources remain authoritative.

## 19. Video Prompt Regeneration

Video Prompt regeneration follows:

CURRENT VIDEO SPEC
+ START STATE
+ END STATE
+ CURRENT IDENTITY
+ CURRENT ENVIRONMENT
+ CURRENT CAMERA STATE
→ NEW VIDEO PROMPT

The prompt must describe the required transition without inventing unsupported actions.

## 20. Naturalization Regeneration

Naturalization may be regenerated when:

- Video Spec changes
- Video Prompt changes materially
- Performance changes
- Camera requirements change
- required state changes

Naturalization must remain subordinate to the required state.

Example:

If the hand must remain on the product, naturalization may add subtle finger repositioning but cannot move the hand away.

## 21. Audio Regeneration

Audio may be regenerated when:

- Script changes
- Dialogue changes
- Voice Identity changes
- Global Timeline changes
- performance requirements change
- audio timing changes

Visual artifacts are regenerated only when their dependencies are affected.

Audio changes do not automatically invalidate visual artifacts unless the dependency graph says the timing or visual behavior is affected.

## 22. Platform Configuration Changes

Platform configuration is a dependency.

Example:

If supported clip duration rules change, affected Clip Plans and downstream production artifacts may become stale.

Do not rewrite creative strategy merely because a platform configuration changed.

Regenerate the smallest affected scope.

## 23. Clip Regeneration

A Clip Plan may need regeneration when:

- Global Timeline changes
- supported duration configuration changes
- logical transition boundaries change
- Start/End State requirements change

Example:

12-second scene:

Before:
6s + 6s

After a timing revision:
8s + 4s

The Clip Plan is regenerated from the current Global Timeline and platform configuration.

## 24. Bridge Reference Regeneration

Frame-to-frame continuity follows:

END STATE CLIP N = START STATE CLIP N+1

If Clip N changes its End State:

1. identify Clip N+1 dependency
2. mark its Start Reference stale
3. regenerate or revise the Start Reference
4. re-evaluate Clip N+1
5. continue propagation only where required

Do not leave incompatible bridge states in the project.

## 25. Regeneration Boundaries

A regeneration stops at the current execution boundary.

Example:

Regenerating an Image Prompt does not automatically regenerate a Video Prompt.

Regenerating a Storyboard may make State stale, but State is not automatically executed unless the workflow permits the next explicit stage.

This preserves one-command/one-stage execution.

## 26. Regeneration and Approval

A regenerated decision artifact returns to:

READY_FOR_DECISION

It is not automatically approved.

Example:

Image Prompt v1
→ regenerate
→ Image Prompt v2
→ READY_FOR_DECISION

The user must explicitly approve according to the workflow.

## 27. Regeneration and Locking

A regenerated artifact replaces the active revision only after the required approval/locking transition.

The old revision remains historically traceable.

Example:

Image Prompt v1
→ LOCKED
→ upstream change
→ STALE
→ regenerate
→ Image Prompt v2
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

## 28. Regeneration Failure

If regeneration cannot complete, use:

- BLOCKED
- NEEDS INPUT
- UNKNOWN
- UNVERIFIED
- SOURCE UNAVAILABLE
- DEPENDENCY INVALID
- STALE

Do not replace the old artifact with an incomplete or unsupported output.

## 29. Partial Regeneration

If an artifact contains multiple independent components, regenerate only the affected component when the structure allows it.

Example:

A production spec contains independent audio and camera requirements.

If only camera requirements change, do not rewrite unrelated audio requirements.

Preserve unaffected fields and their revision history.

## 30. Regeneration Provenance

Each regenerated artifact should record:

~~~text
Artifact:
Previous Revision:
New Revision:
Regeneration Reason:
Trigger:
Input Revisions:
Dependency Revisions:
Affected Scope:
Preserved Scope:
Generated At:
Decision State:
~~~

This provides traceability.

## 31. Regeneration History

Regeneration history should remain available in Change Log infrastructure.

Example:

~~~text
CHANGE:
Product Truth v1 → v2

IMPACT:
Storyboard v1 → STALE
State v1 → STALE
Production Spec v1 → STALE
Image Prompt v1 → STALE

PRESERVED:
Content Strategy v1
Script v1
Dialogue v1
Character Identity v1
Voice Identity v1
~~~

## 32. Generated Output Is Not Truth

A regenerated image, video, audio output, or prompt never becomes a new Source of Truth automatically.

If generated output conflicts with approved structured state:

Structured state wins.

If generated output reveals a possible product discrepancy:

Product Truth must be reviewed explicitly.

The system must not “learn” new identity from its own generation.

## 33. Regeneration and User Intent

Explicit current user instructions have highest authority.

If the user says:

“Regenerate this image with the same product identity but a different pose.”

Then:
- Product Identity stays unchanged.
- Character/Product State may change where instructed.
- Only the affected artifact is regenerated.

If the user says:

“Change the product packaging.”

That is an upstream Product Identity revision, not merely image regeneration.

The dependency graph must then determine downstream impact.

## 34. Regeneration and Natural Human Motion

When a generated video looks rigid, regeneration may target Naturalization rather than changing the scene.

Possible target:
- blinking
- breathing
- eye movement
- hand micro-adjustment
- weight shift
- speech rhythm
- subtle camera movement

Do not solve a naturalization problem by changing identity or narrative state.

## 35. No Full Regeneration by Default

AFFILIX must not use full-project regeneration as the default recovery mechanism.

Full regeneration is justified only when:
- the user explicitly requests it, or
- dependency analysis proves that the complete downstream chain is affected.

Even then, preserve all unaffected authoritative inputs.

## 36. No Backward Contamination

Downstream regeneration must never rewrite upstream truth.

Examples:

Generated Image Prompt
→ cannot modify Product Truth.

Generated Video
→ cannot modify Character Identity.

Generated Audio
→ cannot modify Dialogue.

Generated Reference
→ cannot automatically become the new Source of Truth.

This protects the authority hierarchy.

## 37. Regeneration Command Behavior

### /Affilix regenerate

Regenerate the current targeted artifact only.

### /Affilix regenerate [target]

Regenerate the explicitly named artifact when the target exists and dependencies are resolvable.

### /Affilix revise

Change the current artifact's intended content. This is revision, not regeneration.

### /Affilix next

Advance one stage only. It does not imply regeneration.

### /Affilix status

Show current regeneration/staleness information without executing.

## 38. Ambiguous Regeneration Request

If the user says:

“Regenerate it.”

AFFILIX should resolve the most recent explicit artifact context.

If more than one plausible target exists, return NEEDS INPUT rather than guessing.

Example:

~~~text
STATUS: NEEDS INPUT

POSSIBLE TARGETS:
1. Image Prompt R03
2. Video Prompt Clip 03

SELECT ONE TARGET.
~~~

## 39. Regeneration Checklist

Before regenerating:

- identify target
- identify reason
- identify trigger
- resolve current dependencies
- confirm authoritative inputs
- identify stale providers
- determine affected scope
- preserve identity
- preserve required state
- preserve unaffected fields
- execute only the targeted regeneration
- return the regenerated artifact to the correct lifecycle state
- record provenance
- stop

## 40. Non-Negotiable Rules

1. Regenerate the smallest affected scope.
2. Preserve unaffected work.
3. Never regenerate Source of Truth from generated output.
4. Never silently change identity.
5. Never silently change required state.
6. Regenerate from current structured inputs.
7. Do not build on stale dependencies.
8. Start from the earliest affected artifact when upstream changes propagate.
9. Regenerated decision artifacts require explicit approval.
10. Old revisions remain traceable.
11. Bridge references must preserve clip continuity.
12. Audio and visual regeneration remain dependency-aware.
13. Platform configuration changes propagate only where relevant.
14. Failure during regeneration uses failure-handling states.
15. Ambiguous targets require explicit resolution.
16. One regeneration command remains within the current execution boundary.
17. No silent downstream execution.
18. No backward contamination.
19. No full-project regeneration by default.
20. No separate validation stage.
