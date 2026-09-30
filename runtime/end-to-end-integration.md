# End-to-End Runtime Integration

This specification defines how every UGC Affiliate Skill layer connects into one deterministic generation pipeline.

The runtime is an orchestration contract, not a new creative layer.

Its job is to move validated information from input to final prompts without losing identity, product truth, campaign intent, scene state, or physical continuity.

## Core Runtime Principle

`Understand → Resolve → Model State → Model Behavior → Generate → Validate → Repair → Revalidate → Output`

The runtime must never skip upstream understanding merely because a downstream prompt appears easy to write.

## Canonical Pipeline

```
User Input
  ↓
1. Normalize Input
  ↓
2. Validate Required Input
  ↓
3. Product Intelligence
  ↓
4. Creator Intelligence
  ↓
5. Campaign Intelligence
  ↓
6. Resolve Format × Angle
  ↓
7. Resolve Duration × Scene Count
  ↓
8. Resolve Generator Clip Duration Plan
  ↓
9. Creative Concept
  ↓
9. Scene State Model
  ↓
10. Content Behavior
  ↓
11. Image Prompt Engine
  ↓
12. Video Prompt Engine
  ↓
13. Embedded Validation
  ↓
14. Local Repair
  ↓
15. Revalidation
  ↓
16. Final Output
```

Human Realism and Consistency are cross-cutting constraints applied throughout the pipeline. They are not a late-stage cosmetic pass.

## Stage 1 — Normalize Input

Normalize representation only.

Examples:

- `fashion` → `Fashion`
- `instagram reels` → `Instagram Reels`
- `6 sec` → `duration_sec: 6`
- `auto` → `scene_count: Auto`

Do not normalize meaning.

Do not:

- invent missing values,
- silently change explicit user choices,
- convert an ambiguous value into a specific value without evidence.

Output:

- normalized request.

## Stage 2 — Validate Required Input

Validate:

- niche,
- product,
- campaign,
- creator,
- content,
- platform,
- niche-specific format,
- niche-specific angle,
- duration,
- scene count.

Cross-field validation must include:

- niche → format,
- niche → angle,
- format → speech mode,
- creator → identity requirements,
- duration → scene density,
- campaign → CTA behavior.

### Blocker Rule

If a required field is invalid or materially missing, stop before creative generation.

Ask only for the minimum correction needed.

Never fabricate a blocker away.

## Stage 3 — Product Intelligence

Build:

1. Product Intelligence Record
2. Product Identity Lock
3. Product State Model
4. Supported Claims
5. Unknown Attributes
6. Source / Conflict Notes

Source priority:

1. explicit user facts,
2. retrieved product facts,
3. directly observable visual facts,
4. safe creative inference,
5. unknown.

The product source of truth is established here and inherited downstream.

## Stage 4 — Creator Intelligence

Resolve:

1. Character Identity Record
2. Character Reference status
3. Character Identity Lock
4. Voice Identity Record when speech is used
5. Voice Reference status when speech is used
6. Voice Identity Lock when speech is used
7. Unknown Attributes
8. Source / Conflict Notes

The creator name is not evidence for appearance or voice.

Character and Voice Identity are stable sources of truth. Scene state may change; identity does not.

## Stage 5 — Campaign Intelligence

Translate campaign intent:

`Objective + Stage + CTA → Viewer Takeaway → Required Evidence → Behavior Direction → Scene State`

Resolve:

- Product Role
- Viewer Takeaway
- Required Evidence
- Behavior Direction
- CTA Behavior
- Speech Requirement
- Campaign Constraints

The runtime must ensure that campaign intent produces observable behavior rather than hidden copy logic.

## Stage 6 — Resolve Format × Angle

Resolve in this order:

1. exact valid pair,
2. unambiguous normalized pair,
3. compatible interpretation only when the user's intent is preserved.

Validate:

- natural demonstration,
- product visibility,
- duration fit,
- scene-count fit,
- campaign compatibility.

Do not silently replace a requested format or angle.

If no safe interpretation exists, block.

## Stage 7 — Resolve Duration × Scene Count

Scene count is a narrative constraint, not a generator clip count.

For N scenes, the default transition count is N−1. The target duration must be exactly partitionable into supported Google Flow clip durations.

Current documented generation durations are 4s / 6s / 8s for Veo 3.1 Lite, Fast, and Quality, and 4s / 6s / 8s / 10s for Gemini Omni Flash 1.1.

Example: 18s + 5 scenes → 4 transitions → 4s + 4s + 4s + 6s.

If no exact partition exists, preserve creative intent, merge/reduce scene boundaries when safe, or block. Never invent an unsupported clip duration.

## Stage 8 — Resolve Generator Clip Duration Plan

Output:

Flow Timeline
├── generator: Google Flow
├── target_duration_sec
├── scene_count
├── transition_count
└── clip_durations[]

Invariant: SUM(clip_durations) = target_duration_sec.

Every clip duration must be supported by the active model.

## Stage 9 — Creative Concept

Approximate density:

| Duration | Typical Scene Count |
|---|---:|
| 4 sec | 1–2 |
| 6 sec | 2–3 |
| 8 sec | 3–4 |
| 10 sec | 4–5 |

These are planning defaults, not permission to override explicit input.

If the combination is physically implausible:

- preserve the user's explicit count when possible,
- simplify behavior,
- reduce action density,
- flag a warning,
- only block when the requested sequence cannot be made coherent.

## Stage 8 — Creative Concept

Resolve one coherent concept from:

1. campaign job,
2. product truth/evidence,
3. format behavior,
4. angle emphasis,
5. creator behavior,
6. platform/context,
7. duration/scene constraints.

Concept fields:

- Core Idea
- Viewer Takeaway
- Product Role
- Creator Role
- Hook
- Evidence
- Emotional / Behavioral Beat
- CTA Role
- Ending State
- UGC Guardrail

The concept is a planning artifact. It must not leak internal reasoning into final prompts.

## Stage 10 — Scene State Model

Create one state for each scene.

Each state contains:

### Creator State

- pose,
- orientation,
- gaze,
- facial expression,
- hand position,
- temporary appearance state.

### Product State

- location,
- interaction,
- open/closed,
- worn/unworn,
- applied/unapplied,
- active/inactive.

### Environment State

- location,
- relevant objects,
- spatial relationships,
- lighting context.

### Camera State

- orientation,
- framing,
- perspective,
- phone relationship,
- stability.

### Transition Metadata

For non-final scenes:

- Purpose
- Behavior Cue
- Transition Intent
- Transition Cause
- Continuity Lock
- Required Evidence
- CTA relevance
- Speech state

One scene has one dominant purpose.

Every changed state attribute must have a cause.

## Stage 11 — Content Behavior

Translate scene state into:

- Intent
- Attention Target
- Primary Action
- Supporting Action
- Micro-Behavior
- Product Interaction
- Reaction
- Camera Behavior
- Transition Behavior

Behavior hierarchy:

1. required state change,
2. product interaction,
3. evidence,
4. creator intent,
5. gaze,
6. body movement,
7. facial reaction,
8. micro-behavior,
9. camera behavior.

The runtime must prefer causal behavior over decorative movement.

## Stage 12 — Image Prompt Engine

Generate exactly one Image Prompt per scene.

Contract:

`Scene State → One Visual State`

Required properties:

- Character Identity
- Product Identity
- Current State
- Visible Behavior
- Environment
- Camera / Composition
- Lighting
- UGC Realism
- Critical Continuity

No future action.

No unsupported detail.

The Image Prompt becomes the visual anchor for that scene.

## Stage 13 — Video Prompt Engine

Generate exactly one Video Prompt per consecutive scene pair.

For N scenes:

`N Image Prompts`

`N - 1 Video Prompts`

Contract:

`Starting Frame → Physical Cause → Movement → Response → Ending Frame`

Required:

- starting frame anchor,
- physical cause,
- human movement,
- facial movement when relevant,
- product/material physics,
- camera movement when relevant,
- environment movement when relevant,
- exact ending frame anchor,
- continuity constraints.

The video prompt must not invent a new scene.

## Stage 14 — Embedded Validation

Validation occurs inside the engines.

Run validation in this order:

1. Input
2. Format × Angle
3. Duration × Scene Count
4. Scene Contract
5. Image Prompt
6. Video Prompt
7. Human Realism
8. Character / Voice / Product / Environment Consistency
9. CTA
10. Unsupported Detail
11. Output Count
12. Final Contract

Severity:

- Blocker
- Warning
- Pass

Do not polish a generation that still contains a blocker.

## Stage 15 — Local Repair

Repair the smallest failed component.

Examples:

- missing product evidence → adjust framing,
- identity drift → restore identity lock,
- product drift → restore product lock,
- future action in image prompt → convert to current state,
- missing physical cause → add causal transition,
- excessive movement → remove supporting actions,
- cinematic camera behavior → simplify camera movement,
- unsupported claim → remove or qualify according to source,
- silent format contains speech → remove speech behavior.

Do not regenerate the entire concept for a local failure.

## Stage 16 — Revalidation

After repair:

- rerun the affected validation checks,
- rerun dependent checks when the repair affects continuity,
- confirm output counts,
- confirm scene-to-scene state mapping.

A repaired output is not final until it passes again.

## Stage 17 — Final Output

Return only user-facing generation assets and the minimum planning context needed to use them.

Default order:

1. Creative Summary
2. Scene Plan
3. Image Prompts
4. Frame-to-Frame Video Prompts
5. Spoken Script when speech is used
6. Silent Behavior Script when the format is silent

Do not expose:

- hidden reasoning,
- internal scores,
- implementation details,
- source conflicts that do not affect the user-facing output,
- validation machinery unless requested.

## Cross-Engine Contracts

### Contract A — Product

Product Intelligence
→ Product Identity Lock
→ Product State
→ Scene State
→ Image Prompt
→ Video Prompt

No downstream layer may create a conflicting product identity.

### Contract B — Character

Creator Intelligence
→ Character Identity Lock
→ Scene Creator State
→ Image Prompt
→ Video Prompt

Pose and expression may change. Identity does not.

### Contract C — Voice

Creator Voice Identity
→ Spoken Script / Speech Behavior

Voice Identity does not need to appear in silent visual prompts.

### Contract D — Campaign

Campaign Intelligence
→ Required Evidence
→ Scene Purpose
→ Behavior
→ Prompt Visibility

Campaign intent must become observable content behavior.

### Contract E — Scene

Scene State
→ Image Prompt

Scene N + Scene N+1
→ Video Prompt N→N+1

This is the central traceability contract.

### Contract F — Human Realism

Human Realism constraints apply to:

- scene planning,
- behavior,
- image generation,
- video movement,
- camera behavior,
- material interaction,
- validation.

It is not an afterthought.

## State Ownership Rules

Each class of information has one owner.

| Information | Source of Truth |
|---|---|
| Creator Identity | Creator Intelligence |
| Character Reference | Creator Library |
| Voice Identity | Creator Intelligence |
| Product Facts | Product Intelligence |
| Product Identity | Product Identity Lock |
| Product State | Scene State Model |
| Campaign Intent | Campaign Intelligence |
| Creative Concept | Creative Logic |
| Scene State | Scene Planning |
| Human Action | Content Behavior |
| Still Visual State | Image Prompt Engine |
| Physical Transition | Video Prompt Engine |
| Final Contract | Runtime Validation |

Downstream stages may transform information, but may not redefine its source of truth.

## Runtime Invariants

A valid generation must satisfy all of these:

1. One creator identity package per request.
2. One product source of truth per request.
3. One campaign interpretation per request.
4. One shared Scene State Model.
5. One Image Prompt per scene.
6. One Video Prompt per consecutive scene pair.
7. Every visual state is traceable to a Scene State.
8. Every meaningful state change has a cause.
9. Character identity does not drift.
10. Product identity does not drift.
11. Environment continuity is preserved unless intentionally changed.
12. Camera continuity is preserved unless intentionally changed.
13. Silent formats remain silent.
14. Spoken formats preserve Voice Identity.
15. Unsupported details remain unknown.
16. Required campaign evidence is visible.
17. Human movement remains physically plausible.
18. Material and product interaction remain physically plausible.
19. No blocker remains after final validation.
20. Final outputs contain no hidden reasoning.

## Failure Handling

### Input Failure

Stop before generation.

### Product Failure

Use supported facts only or block if product identity is insufficient.

### Creator Failure

Use defined identity only or block when identity cannot be anchored sufficiently.

### Campaign Failure

Resolve the minimum missing campaign requirement before concept generation.

### Scene Failure

Repair scene state before prompt generation.

### Image Prompt Failure

Repair the visual state translation without changing the concept unless necessary.

### Video Prompt Failure

Repair the transition without rewriting the destination state unless the destination itself is invalid.

### Continuity Failure

Restore the canonical source-of-truth lock and repair dependent prompts.

### Validation Failure

Repair locally, then revalidate.

## End-to-End Traceability Example

A simplified Fashion flow:

`Campaign: Product Consideration`

↓

Viewer needs useful evidence about fit.

↓

`Creative Concept: creator checks the garment fit naturally in a mirror`

↓

Scene 01:

- garment worn,
- creator facing mirror,
- phone held naturally,
- fit visible.

↓

Content Behavior:

- inspect fit,
- adjust sleeve,
- gaze follows garment.

↓

Image Prompt 01:

- captures the current fit-check state.

↓

Video Prompt 01→02:

- hand adjusts sleeve,
- fabric moves and settles,
- creator shifts weight,
- phone framing changes slightly.

↓

Scene 02:

- sleeve adjusted,
- fit remains visible,
- creator inspects result.

↓

Image Prompt 02:

- captures the resolved result state.

The runtime never needs to invent a new creative concept between these stages.

## Implementation Rule

Every new engine or module added to the skill must define:

1. Inputs
2. Source of truth
3. Output contract
4. Invariants
5. Validation
6. Failure modes
7. Runtime position
8. Downstream dependencies

If a new module cannot define these interfaces, it is not ready to become part of the runtime.

## Runtime Completion Criteria

The system is considered end-to-end integrated when:

- all upstream intelligence layers have explicit source-of-truth contracts,
- Creative Logic consumes resolved intelligence,
- Scene Planning produces shared scene states,
- Content Behavior consumes scene states,
- Image Prompt Engine consumes scene states and behavior,
- Video Prompt Engine consumes consecutive scene states and behavior,
- validators can trace outputs back to their source state,
- repairs can be performed locally,
- output counts are deterministic,
- continuity is enforced across every scene,
- final output contains only generation-ready assets and required context.
