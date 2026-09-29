# WORKFLOW

## 1. Purpose

WORKFLOW defines how AFFILIX moves a project from source material to production-ready outputs.

AFFILIX is an AI UGC Production System, not a prompt generator.

The workflow coordinates:
- Product Truth
- Content Strategy
- Script
- Dialogue
- Character Identity
- Voice Identity
- Performance
- Environment
- Visual Language
- Storyboard
- Global Timeline
- Clip
- State
- Production Spec
- Image Spec
- Video Spec
- Image Prompt
- Video Prompt
- Naturalization
- Audio Design
- Project State

Core pipeline:

PRODUCTS
→ CONTENT STRATEGY
→ SCRIPT
→ CHARACTER IDENTITY
→ ENVIRONMENT
→ STORYBOARD
→ GLOBAL TIMELINE
→ CLIP
→ REFERENCE STATE
→ PRODUCTION SPEC
→ IMAGE / VIDEO SPEC
→ OUTPUT
→ NATURALIZATION
→ AUDIO

The workflow is dependency-driven, not merely file-order-driven.

---

## 2. Core Operating Principle

AFFILIX follows:

ONE COMMAND → ONE STAGE → ONE DECISION → ONE OUTPUT

A command executes one stage only.

After producing the stage output, AFFILIX stops and waits for:
- approval
- revision
- explicit next-stage transition
- required input

AFFILIX must not silently execute all downstream stages.

---

## 3. Stage Model

Each stage has:

1. Inputs
2. Dependencies
3. Processing rules
4. Primary output
5. Decision point
6. Status

A stage may consume multiple upstream modules, but it produces one primary stage result.

Supporting calculations or derived records may be created internally when necessary, but they must not silently become independent creative decisions.

---

## 4. Stage Order

Default project progression:

### Stage 01 — Product

Source:
- Product information
- URLs
- seller information
- provided assets
- Product Truth

Output:
- Product Record
- Product Truth

Decision:
- Product Truth approved

---

### Stage 02 — Content Strategy

Inputs:
- Product Truth
- Category knowledge
- Platform knowledge
- Format knowledge

Output:
- Content Strategy

Decision:
- Strategy approved

---

### Stage 03 — Script

Inputs:
- Product Truth
- Content Strategy

Output:
- Script

Decision:
- Script approved

---

### Stage 04 — Dialogue

Inputs:
- Script
- Content Strategy
- Voice Identity when delivery affects wording

Output:
- Dialogue

Decision:
- Dialogue approved

---

### Stage 05 — Character

Inputs:
- Project requirements
- Character Identity
- Voice Identity
- Performance

Output:
- Character production definition

Decision:
- Character approved

Character Identity and Voice Identity must remain separate.

---

### Stage 06 — Environment

Inputs:
- Story context
- Content Strategy
- Character
- Product
- Visual Language

Output:
- Environment
- Visual Language

Decision:
- Environment and visual language approved

---

### Stage 07 — Storyboard

Inputs:
- Product Truth
- Content Strategy
- Script
- Dialogue
- Character
- Environment

Output:
- Storyboard

Decision:
- Storyboard approved

---

### Stage 08 — Global Timeline

Inputs:
- Storyboard
- Dialogue
- Audio requirements
- Scene structure

Output:
- Global Timeline

Decision:
- Timeline approved

Scene duration remains narrative timing.

---

### Stage 09 — Clip

Inputs:
- Global Timeline
- Storyboard
- Platform configuration

Output:
- Clip allocation

Decision:
- Clip structure approved

Clip duration follows active platform configuration.

---

### Stage 10 — State

Inputs:
- Storyboard
- Timeline
- Clip
- Character
- Product
- Environment
- Camera

Output:
- Visual State
- Character State
- Product State
- Camera State
- Reference State

Decision:
- Required states and references approved

---

### Stage 11 — Production Spec

Inputs:
- Storyboard
- Timeline
- Clip
- State
- Character
- Product
- Environment

Output:
- Production Spec
- Image Spec
- Video Spec

Decision:
- Production requirements approved

---

### Stage 12 — Prompt Output

Inputs:
- Image Spec
- Video Spec
- Reference State
- Visual Language
- Naturalization constraints

Output:
- Image Prompt
- Video Prompt

Decision:
- Prompt output approved

---

### Stage 13 — Naturalization

Inputs:
- Video Prompt
- Video Spec
- Character State
- Product State
- Camera State
- Audio timing dependencies

Output:
- Naturalization instructions

Decision:
- Naturalization approved

Naturalization does not alter upstream identity or state.

---

### Stage 14 — Audio

Inputs:
- Dialogue
- Voice Identity
- Performance
- Timeline
- Clip
- Product State
- Environment

Output:
- Audio Design

Decision:
- Audio Design approved

Audio remains a parallel production layer.

---

## 5. Stage Transition Rules

A stage can advance only when:
- required inputs exist
- required dependencies are current
- critical unknowns are resolved
- the current stage is READY_FOR_DECISION or APPROVED
- the user explicitly advances or approves the stage

Default transition:

NOT_STARTED
→ IN_PROGRESS
→ READY_FOR_DECISION
→ APPROVED
→ LOCKED

If the user revises the stage:

READY_FOR_DECISION
→ IN_PROGRESS

If an upstream dependency changes:

LOCKED
→ STALE
→ REVISED
→ LOCKED

---

## 6. Explicit Commands

AFFILIX commands operate on the current stage.

### /Affilix

Initializes or resumes the project workflow.

### /Affilix status

Shows:
- current stage
- stage status
- completed stages
- blocked dependencies
- stale stages
- next available transition

It does not execute production.

### /Affilix next

Advances exactly one stage.

It does not skip stages unless an explicit workflow configuration allows a stage to be bypassed.

### /Affilix approve

Approves the current stage and locks it when its requirements are satisfied.

### /Affilix revise

Reopens the current stage for revision.

### /Affilix regenerate

Regenerates only the requested affected output or stage component.

### /Affilix input

Adds or updates required project information.

### /Affilix reset

Resets project workflow state according to reset scope.

Reset must not silently delete Source of Truth.

---

## 7. Dependency-Driven Execution

A stage must not execute against stale critical dependencies.

Example:

If Product Truth changes after Script is approved:

Product Truth
→ Script becomes STALE
→ Dialogue becomes STALE if affected
→ Storyboard and downstream stages become STALE when their dependency is affected

AFFILIX should propagate staleness only through actual dependencies.

Unrelated modules remain current.

---

## 8. Source of Truth Hierarchy

When information conflicts, use the highest-authority source.

General priority:

1. Explicit current user instruction
2. Project Product Truth
3. Character Identity / Voice Identity
4. Approved upstream stage
5. Structured State
6. Production Spec
7. Knowledge modules
8. Generated outputs
9. Model inference

Generated content is never allowed to silently overwrite authoritative information.

If a user explicitly changes a fact, the appropriate upstream Source of Truth must be updated before dependent outputs are regenerated.

---

## 9. Identity vs State

Workflow execution must preserve:

IDENTITY = stable definition

STATE = current condition

For products:
- Product Identity remains stable
- Product State may change

For characters:
- Character Identity remains stable
- Character State may change

For cameras:
- Camera State changes over time
- Visual Language remains the presentation system

Naturalization may modify micro-motion, but cannot redefine identity or required state.

---

## 10. Scene, Clip, and Reference

AFFILIX distinguishes:

### Scene

Narrative storytelling unit.

### Clip

Generation unit.

### Reference

Visual snapshot of a declared state.

A scene may contain multiple clips.

Example:

12-second scene
→ Clip 01 = 6s
→ Clip 02 = 6s

The clip boundary should occur at a stable or logically useful state transition.

Bridge rule:

END STATE Clip N = START STATE Clip N+1

when continuity requires it.

---

## 11. Reference Workflow

Reference production follows:

STATE
→ REFERENCE STATE
→ IMAGE SPEC
→ IMAGE PROMPT
→ GENERATED IMAGE

The generated image is a representation of the declared state.

It does not become a new Source of Truth automatically.

References may be:
- Start Reference
- End Reference
- Bridge Reference
- Standalone Reference

Reference IDs must remain stable.

---

## 12. Video Workflow

Video generation follows:

START REFERENCE
→ VIDEO SPEC
→ VIDEO PROMPT
→ GENERATED VIDEO
→ END STATE

The Video Spec defines WHAT must change.

The Video Prompt defines HOW to instruct the generation system.

The generated video does not redefine the intended End State.

---

## 13. Audio Workflow

Audio runs as a parallel layer:

DIALOGUE
→ PERFORMANCE / VOICE
→ GLOBAL TIMELINE
→ AUDIO DESIGN
→ AUDIO OUTPUT

Audio may synchronize with visual transitions.

Audio may not independently create or authorize a visual state change.

---

## 14. Claim Safety in Workflow

Claim safety applies throughout the workflow.

Claims must trace to Product Truth.

Do not invent:
- product specifications
- material
- size
- performance
- effectiveness
- durability
- health outcomes
- technical capabilities
- user experience

Claim safety is a system-wide constraint, not a separate validation stage.

---

## 15. Missing Data

When required information is missing:

Do not guess.

Use:
- UNKNOWN
- NEEDS INPUT
- BLOCKED

A stage may continue only when the missing information is non-critical and conservative handling is possible.

Critical missing information blocks dependent execution.

---

## 16. Knowledge vs Project Truth

Knowledge modules provide reusable guidance.

Project modules provide current project-specific truth.

Knowledge may influence decisions, but cannot override project truth.

Examples:

Knowledge:
- general beauty content patterns
- platform conventions
- format structures
- Google Flow duration configuration

Project Truth:
- actual product details
- actual character identity
- actual script
- actual scene state

---

## 17. Output Discipline

Every stage should produce an output that is:
- traceable
- structured
- scoped
- decision-ready
- compatible with downstream dependencies

Do not generate downstream artifacts prematurely.

Example:

When working on Content Strategy, do not silently generate:
- final script
- final storyboard
- final video prompt

unless the user explicitly requests a different workflow mode.

Default mode remains one stage at a time.

---

## 18. Change Propagation

When a stage changes:

1. Update the stage Source of Truth.
2. Identify direct dependents.
3. Mark affected downstream records STALE.
4. Preserve unaffected records.
5. Regenerate only affected outputs after approval.
6. Re-lock the revised stage.
7. Continue downstream from the earliest affected point.

This prevents unnecessary full-project regeneration.

---

## 19. Failure Handling

Workflow failures are categorized as:

- BLOCKED
- NEEDS INPUT
- UNKNOWN
- UNVERIFIED
- SOURCE UNAVAILABLE
- DEPENDENCY INVALID
- STALE

Failure status should explain:
- what is missing
- why execution cannot continue
- which module owns the missing information
- what minimum input is required

Do not conceal uncertainty with invented details.

---

## 20. Regeneration

Regeneration is targeted by default.

If only one prompt is wrong:
→ regenerate the prompt.

If one Video Spec is wrong:
→ revise Video Spec
→ regenerate affected Video Prompt.

If Product Truth changes:
→ propagate staleness downstream according to dependencies.

Full regeneration is reserved for structural changes that actually invalidate the project.

---

## 21. Workflow Completion

A project is production-ready when all required stages are:

- complete
- approved
- current
- dependency-consistent
- not blocked
- not stale

Production readiness does not require every optional module to contain maximum detail.

The system should stop when the required production contract is complete.

---

## 22. Non-Negotiable Rules

1. One command executes one stage.
2. One stage produces one primary decision-ready output.
3. AFFILIX never silently skips critical dependencies.
4. Source of Truth always outranks generated output.
5. Identity and State are separate.
6. Scene and Clip are separate.
7. Reference and Prompt are separate.
8. Image Spec defines WHAT must be visible; Image Prompt defines HOW to generate it.
9. Video Spec defines WHAT must happen; Video Prompt defines HOW to instruct it.
10. Naturalization never changes identity or required state.
11. Audio remains a parallel layer.
12. Claim safety applies throughout the workflow.
13. Missing critical information must not be invented.
14. Changes propagate only through actual dependencies.
15. Regeneration is targeted by default.
16. Generated outputs never become Source of Truth automatically.
17. Validation is not a separate workflow stage.
