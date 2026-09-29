# AFFILIX — Dependency System

## Purpose

Defines how AFFILIX modules depend on one another, how changes propagate, and how stale downstream work is regenerated. Dependency management is an execution control system, not a separate validation stage.

## Core Principle

> **Upstream truth determines downstream availability.**

Dependencies flow downstream. A consumer may transform upstream information for its own purpose but cannot silently redefine its provider.

## Dependency Types

### Hard
Required for safe execution. Missing, blocked, invalid, or materially stale hard dependencies block the consumer.

### Soft
Useful guidance that does not necessarily block execution. Soft dependencies never override Source of Truth or hard dependencies.

### Source
Authoritative input such as Product Truth, Character Identity, Voice Identity, explicit user instruction, approved Script, or approved State.

### Derived
An approved artifact produced from upstream information and consumed downstream.

### Configuration
Reusable category, format, platform, or tool knowledge. Configuration is not project truth.

## Direction

Typical production dependency flow:

PRODUCT-TRUTH → CONTENT-STRATEGY → SCRIPT → DIALOGUE → STORYBOARD → GLOBAL-TIMELINE → CLIP → STATE → REFERENCE-STATE → PRODUCTION-SPEC → IMAGE-SPEC / VIDEO-SPEC → IMAGE-PROMPT / VIDEO-PROMPT

Character Identity, Voice Identity, Performance, Environment, Visual Language, and Audio Design connect to the relevant stages. Audio is a parallel production layer.

Dependencies form a graph, not merely a file-order list.

## Direct and Indirect Dependencies

A direct dependency exists when a consumer explicitly requires a provider.

Example:

VIDEO-PROMPT → VIDEO-SPEC

An indirect dependency exists through another module.

Example:

VIDEO-PROMPT → VIDEO-SPEC → PRODUCT-STATE → PRODUCT-TRUTH

AFFILIX must account for transitive effects.

## Dependency Record

A dependency should conceptually contain:

| Field | Meaning |
|---|---|
| Dependency ID | Stable identifier |
| Consumer | Module/artifact receiving information |
| Provider | Module/artifact providing information |
| Type | Hard, soft, source, derived, configuration |
| Scope | Fields/aspects consumed |
| Provider Revision | Revision used by consumer |
| Required State | Provider state required for execution |
| Impact | Downstream artifacts affected by change |
| Status | Current dependency condition |
| Notes | Additional constraints |

Example:

~~~text
Dependency ID: DEP-VIDEO-001
Consumer: VIDEO-PROMPT
Provider: VIDEO-SPEC
Type: Hard / Derived
Scope: Start State, Transition, End State, Duration
Required State: APPROVED
Status: CURRENT
~~~

## Ownership

Authority belongs to the provider:

- Product Truth owns product facts.
- Character Identity owns permanent character identity.
- Voice Identity owns voice identity.
- Script owns message/content.
- Dialogue owns spoken wording.
- Storyboard owns scene-level visual intent.
- Global Timeline owns timing.
- Clip owns generation-unit allocation.
- State modules own current conditions.
- Production Spec owns production requirements.
- Image/Video Spec owns production specifications.
- Prompt modules translate specifications into generation instructions.
- Naturalization controls permitted micro-motion.
- Audio Design owns audio-layer design.

Downstream output never silently becomes upstream truth.

## Core Dependency Graph

### Product
PRODUCT → PRODUCT-TRUTH
PRODUCT-TRUTH → CONTENT-STRATEGY
PRODUCT-TRUTH → SCRIPT
PRODUCT-TRUTH → STORYBOARD
PRODUCT-TRUTH → PRODUCT-STATE
PRODUCT-TRUTH → PRODUCTION-SPEC

### Content
CONTENT-STRATEGY → SCRIPT
CONTENT-STRATEGY → STORYBOARD
SCRIPT → DIALOGUE
SCRIPT → STORYBOARD
DIALOGUE → GLOBAL-TIMELINE

### Character
CHARACTER-IDENTITY → CHARACTER-STATE
CHARACTER-IDENTITY → STORYBOARD
CHARACTER-IDENTITY → REFERENCE-STATE
CHARACTER-IDENTITY → IMAGE-SPEC
CHARACTER-IDENTITY → VIDEO-SPEC
VOICE-IDENTITY → DIALOGUE
VOICE-IDENTITY → AUDIO-DESIGN
PERFORMANCE → STORYBOARD
PERFORMANCE → VIDEO-SPEC
PERFORMANCE → NATURALIZATION

### Environment
ENVIRONMENT → STORYBOARD
ENVIRONMENT → ENVIRONMENT-STATE
VISUAL-LANGUAGE → STORYBOARD
VISUAL-LANGUAGE → IMAGE-SPEC
VISUAL-LANGUAGE → VIDEO-SPEC

### Timing and State
STORYBOARD → GLOBAL-TIMELINE
STORYBOARD → STATE
GLOBAL-TIMELINE → CLIP
GLOBAL-TIMELINE → AUDIO-DESIGN
CLIP → REFERENCE-STATE
CLIP → PRODUCTION-SPEC
CHARACTER-STATE → VISUAL-STATE
PRODUCT-STATE → VISUAL-STATE
CAMERA-STATE → VISUAL-STATE
ENVIRONMENT-STATE → VISUAL-STATE
VISUAL-STATE → REFERENCE-STATE
REFERENCE-STATE → IMAGE-SPEC
REFERENCE-STATE → VIDEO-SPEC

### Production
PRODUCTION-SPEC → IMAGE-SPEC
PRODUCTION-SPEC → VIDEO-SPEC
IMAGE-SPEC → IMAGE-PROMPT
VIDEO-SPEC → VIDEO-PROMPT
IMAGE-SPEC → NATURALIZATION
VIDEO-SPEC → NATURALIZATION

### Audio
DIALOGUE → AUDIO-DESIGN
GLOBAL-TIMELINE → AUDIO-DESIGN
CHARACTER-STATE → AUDIO-DESIGN
PRODUCT-STATE → AUDIO-DESIGN
ENVIRONMENT-STATE → AUDIO-DESIGN
AUDIO-DESIGN → VIDEO-SPEC

Audio may provide synchronization requirements but cannot redefine visual identity or state.

## Scope-Specific Impact

A file change does not automatically stale every downstream artifact.

Staleness depends on the changed fields and the dependency scope.

Example: changing product packaging color can affect Product State, Reference State, Image/Video Specs, and prompts, while an unrelated commercial field may affect none of those.

> **Propagate impact by changed scope, not file existence alone.**

## Stale Propagation

When an approved upstream source changes:

1. Record the change.
2. Identify direct consumers.
3. Compare changed fields to dependency scope.
4. Mark affected consumers STALE.
5. Propagate through affected downstream dependencies.
6. Preserve unaffected artifacts.
7. Re-execute from the earliest affected stage.
8. Re-approve and re-lock affected stages.
9. Continue only when required dependencies are current.

Example:

PRODUCT-TRUTH change
→ PRODUCT-STATE STALE
→ REFERENCE-STATE STALE
→ IMAGE/VIDEO-SPEC STALE
→ IMAGE/VIDEO-PROMPT STALE

Unrelated approved work remains intact.

## State and Reference Dependencies

Required chain:

IDENTITY → STATE → REFERENCE STATE → SPEC → PROMPT

Identity defines what must remain stable. State defines what is true now. Reference State captures a production snapshot. Specs define what must be produced. Prompts translate those specs.

A prompt cannot repair an invalid upstream state by inventing a new one.

For consecutive clips:

END STATE CLIP N = START STATE CLIP N+1

If Clip N changes its end state, the next clip's start state and relevant Bridge Reference become stale. Propagation continues only as far as the changed state affects later dependencies.

## Configuration Dependencies

Examples:

GOOGLE-FLOW.md → CLIP
TIKTOK.md → CONTENT-STRATEGY
REVIEW.md → CONTENT-STRATEGY
BEAUTY.md → CONTENT-STRATEGY

Configuration changes propagate only where the consumed rule is relevant. Tool/platform configuration never silently rewrites Product Truth or other project truth.

## Authority Priority

When information conflicts:

1. Explicit current user instruction
2. Product Truth / Character Identity / Voice Identity
3. Approved upstream project stage
4. Structured State
5. Production Spec
6. Reusable knowledge/configuration
7. Generated outputs
8. Model inference

Lower-priority information cannot override higher-priority authority.

## Missing or Invalid Dependencies

Use explicit states:

- BLOCKED: required hard dependency is missing or unusable.
- NEEDS INPUT: required information needs user clarification.
- UNKNOWN: source exists but truth is unknown.
- UNVERIFIED: source exists but cannot be confirmed.
- SOURCE UNAVAILABLE: required source cannot be accessed.
- STALE: provider changed after consumer was produced.
- INVALID: dependency relationship is no longer valid.

Never replace these states with invented information.

## Cycle Prevention

AFFILIX dependencies must remain acyclic.

Invalid:

VIDEO-PROMPT → VIDEO-SPEC → VIDEO-PROMPT

Correct:

VIDEO-SPEC → VIDEO-PROMPT

Likewise:

PRODUCT-TRUTH → PRODUCT-STATE

not:

PRODUCT-STATE → PRODUCT-TRUTH

A state can describe a product condition but cannot redefine product identity.

## Generated Outputs

Generated images and videos are downstream artifacts. They do not automatically become Source of Truth.

GENERATED IMAGE ≠ PRODUCT TRUTH

GENERATED IMAGE ≠ CHARACTER IDENTITY

GENERATED VIDEO ≠ STATE AUTHORITY

If generation differs from intended state, revise the appropriate upstream specification or prompt rather than silently adopting the generated error.

## Targeted Regeneration

Dependency propagation must use the smallest affected downstream scope.

A camera-framing change may affect Camera State, Visual State, Reference State, Image/Video Specs, and prompts. It does not automatically require rewriting Product Truth, Content Strategy, Script, or Dialogue.

Targeted regeneration preserves approved work and reduces drift.

## Dependency-Aware Execution

Before a stage executes, AFFILIX determines:

1. required providers
2. dependency type
3. provider status
4. provider revision
5. relevant dependency scope
6. blocked/stale conditions

A stage may execute only when required hard dependencies are usable.

No dependency may be silently skipped.

## Dependency Change Examples

### Product Identity
PRODUCT-TRUTH: product color
→ PRODUCT-STATE → REFERENCE-STATE → IMAGE/VIDEO-SPEC → PROMPTS

### Script
SCRIPT: core message
→ DIALOGUE → STORYBOARD → GLOBAL-TIMELINE → CLIP → AUDIO-DESIGN

### Character Identity
CHARACTER-IDENTITY: wardrobe
→ CHARACTER-STATE → REFERENCE-STATE → PRODUCTION-SPEC → IMAGE/VIDEO-SPEC → PROMPTS

### Timeline
GLOBAL-TIMELINE: scene duration
→ CLIP → VIDEO-SPEC → VIDEO-PROMPT
and potentially AUDIO-DESIGN

### Clip End State
CLIP-02 END STATE
→ CLIP-03 START STATE
→ CLIP-03 REFERENCE → VIDEO-SPEC → VIDEO-PROMPT

## Dependency Status

Allowed dependency states:

~~~text
NOT_EVALUATED
ACTIVE
CURRENT
STALE
BLOCKED
NEEDS_INPUT
UNKNOWN
UNVERIFIED
SOURCE_UNAVAILABLE
INVALID
RESOLVED
~~~

A dependency returns to CURRENT only after the consumer is re-established against the current provider revision.

## Approval and Locking

Approval is local to a stage.

Approving a downstream artifact does not approve upstream dependencies.

If an upstream source changes:
- upstream receives a new revision
- affected downstream artifacts become STALE
- previous downstream approval does not prevent staleness
- unaffected artifacts retain their approval

LOCKED means approved against the dependency versions that existed at locking time. It does not mean permanently immutable.

## Dependency Log

Project State should record dependency-impact events.

~~~text
CHANGE:
PRODUCT-TRUTH revised

IMPACT:
PRODUCT-STATE STALE
REFERENCE-STATE R04 STALE
IMAGE-SPEC IS-04 STALE
VIDEO-SPEC VS-04 STALE
IMAGE-PROMPT IP-04 STALE
VIDEO-PROMPT VP-04 STALE

PRESERVED:
CONTENT-STRATEGY
SCRIPT
DIALOGUE

ACTION:
Regenerate from PRODUCT-STATE
~~~

## Command Behavior

### /Affilix
Inspect the current stage and its dependencies.

### /Affilix next
Advance exactly one stage only when required dependencies are usable.

### /Affilix approve
Approve the current stage without implicitly approving downstream stages.

### /Affilix revise
Revise the current stage and propagate required staleness.

### /Affilix regenerate
Regenerate only the requested artifact or smallest affected dependency scope.

### /Affilix status
Report dependency conditions without executing a stage.

### /Affilix input
Accept missing dependency information and re-evaluate affected dependencies.

### /Affilix reset
Reset according to defined scope without silently erasing Source of Truth.

## No Validation Stage

Dependency checks happen inside stage readiness, source resolution, state propagation, stale propagation, execution control, and regeneration control.

AFFILIX does not create a separate VALIDATION stage.

## Non-Negotiable Rules

1. Dependencies flow downstream.
2. Source of Truth is never replaced by downstream output.
3. Hard dependencies must be usable before execution.
4. Soft dependencies cannot override authoritative sources.
5. Direct and indirect dependencies must be considered.
6. Staleness propagates by affected scope.
7. Unaffected work is preserved.
8. Generated outputs do not become Source of Truth automatically.
9. Identity dependencies protect identity from downstream drift.
10. State dependencies preserve continuity.
11. Bridge references inherit clip continuity.
12. Configuration does not become project truth.
13. Dependency cycles are prohibited.
14. Missing dependencies are reported, not invented.
15. Downstream approval does not freeze upstream truth.
16. Regeneration is targeted.
17. Dependency state is recorded in Project State.
18. Dependency management is not a separate validation stage.
