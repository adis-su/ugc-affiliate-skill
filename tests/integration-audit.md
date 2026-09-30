# Integration Audit & Contract Test Matrix

This document audits the UGC Affiliate Skill as an integrated system.

The purpose is not to judge creative taste. It is to verify that information flows correctly between modules and that final outputs obey the runtime contract.

## Audit Scope

Audited layers:

1. Input
2. Product Intelligence
3. Creator Intelligence
4. Campaign Intelligence
5. Creative Logic
6. Scene Planning
7. Content Behavior
8. Image Prompt Engine
9. Video Prompt Engine
10. Embedded Validation
11. Final Output

Cross-cutting concerns:

- Human Realism
- Character Consistency
- Voice Consistency
- Product Consistency
- Environment Continuity
- Camera Continuity
- Unsupported Detail Prevention

## Contract Test Categories

### A. Structural Tests

Verify:

- required inputs are recognized,
- allowed enums are respected,
- niche-specific formats are respected,
- niche-specific angles are respected,
- output sections appear in the required order,
- image prompt count equals scene count,
- video prompt count equals scene count minus one.

### B. Source-of-Truth Tests

Verify:

- creator identity comes only from Creator Intelligence,
- product identity comes only from Product Intelligence,
- campaign intent comes only from Campaign Intelligence,
- scene state comes only from Scene Planning,
- behavior comes only from Content Behavior,
- Image Prompts do not redefine identity,
- Video Prompts do not redefine destination state.

### C. State Continuity Tests

Verify:

- unchanged attributes remain unchanged,
- changed attributes have causes,
- Scene N Image Prompt is the starting anchor for N→N+1,
- Scene N+1 Image Prompt is the ending anchor for N→N+1,
- product state transitions are physically explained,
- creator state transitions are physically explained,
- environment geometry remains stable unless intentionally changed.

### D. Realism Tests

Verify:

- anatomy is plausible,
- hands are plausible,
- posture follows action,
- gaze follows attention,
- materials respond to movement,
- objects maintain scale,
- reflections remain physically plausible,
- camera movement is phone-plausible,
- lighting remains plausible,
- UGC does not become commercial/cinematic by default.

### E. Speech Mode Tests

Verify:

- silent formats contain no dialogue,
- silent formats contain no voice-over,
- silent formats do not require Voice Identity,
- spoken formats preserve Voice Identity,
- spoken copy remains separate from visual prompts,
- spoken product claims remain supported.

### F. Unsupported Detail Tests

Verify that the system does not invent:

- product materials,
- exact measurements,
- shade names,
- ingredients,
- performance claims,
- logos/text,
- creator appearance,
- creator voice,
- unsupported props that materially change the concept.

## Test Fixture 01 — Fashion / Silent Mirror Selfie

### Input

- Niche: Fashion
- Product: Example everyday knit top
- Product URL: Not provided
- Objective: Product Discovery
- Stage: Consideration
- CTA: View Product
- Creator: Rositasari
- Format: Silent Mirror Selfie
- Angle: Fit Check
- Duration: 6 sec
- Scene Count: 3
- Platform: TikTok

### Expected Contract

- 3 Image Prompts
- 2 Video Prompts
- Silent behavior only
- Character Identity not invented
- Product attributes remain generic
- Same bedroom geometry
- Same garment identity
- Every transition has a physical cause
- Final scene supports product visibility without becoming an ad card

### Known Fixture Evidence

The existing fixture at `examples/fashion-silent-mirror-selfie.md` satisfies the expected structural contract.

It intentionally uses a generic product because no Product URL is provided.

## Test Fixture 02 — Beauty / Product Application

### Input

- Niche: Beauty
- Product: Example cream blush
- Product URL: Not provided
- Objective: Product Consideration
- Stage: Consideration
- CTA: Check the Product
- Creator: Rositasari
- Format: Product Application
- Angle: Texture
- Duration: 8 sec
- Scene Count: 3
- Platform: Instagram Reels

### Expected Contract

- 3 Image Prompts
- 2 Video Prompts
- product remains the same across scenes,
- application state changes only through physical contact,
- hand and applicator anatomy remain plausible,
- face identity remains stable,
- skin texture remains believable,
- texture evidence remains visible,
- no unsupported shade/material claim,
- no speech unless the selected format explicitly enables it.

### Failure Cases

- blush shade invented from product name,
- product suddenly changes packaging,
- applicator jumps between positions,
- product appears on skin without application cause,
- skin becomes unnaturally smooth,
- hand anatomy changes between frames.

## Test Fixture 03 — Home / Problem → Solution

### Input

- Niche: Home
- Product: Example desk organizer
- Product URL: Not provided
- Objective: Product Consideration
- Stage: Consideration
- CTA: View Product
- Creator: Rositasari
- Format: Problem → Solution
- Angle: Organization
- Duration: 8 sec
- Scene Count: 3
- Platform: Facebook Reels

### Expected Contract

- 3 Image Prompts
- 2 Video Prompts
- desk geometry remains stable,
- organizer scale remains stable,
- objects move only through believable interaction,
- before state is visibly distinguishable,
- after state provides organization evidence,
- shadows and contact points remain plausible,
- no unsupported material or dimension claims.

### Failure Cases

- organizer changes size,
- desk geometry changes,
- objects float into the organizer,
- object positions change without interaction,
- room lighting changes without cause,
- final scene hides the organization result.

## Test Fixture 04 — Fashion / Spoken Talking Head

### Input

- Niche: Fashion
- Product: Example cardigan
- Product URL: Not provided
- Objective: Product Awareness
- Stage: Awareness
- CTA: None
- Creator: Rositasari
- Format: Talking Head
- Angle: Wardrobe Essential
- Duration: 10 sec
- Scene Count: 3
- Platform: TikTok

### Expected Contract

- 3 Image Prompts
- 2 Video Prompts
- Spoken Script exists,
- Voice Identity is required,
- visual prompts do not contain full dialogue,
- product facts remain generic,
- creator identity remains stable,
- conversational gestures remain subordinate to speech.

### Blocker Cases

- Voice Identity unavailable when the system requires speech,
- spoken claim exceeds product evidence,
- voice changes between scenes,
- visual prompt contains the complete spoken script.

## Negative Test 01 — Missing Creator

Input:

- Creator: unknown creator name not present in Creator Library.

Expected:

- Block before creative generation.
- Do not invent creator identity.
- Do not produce image or video prompts.

## Negative Test 02 — Invalid Format

Input:

- Niche: Beauty
- Format: Silent Mirror Selfie

Expected:

- Block or request correction because the format is not defined as a Beauty format.
- Do not silently reinterpret it as a different format.

## Negative Test 03 — Product Conflict

Input:

- User says product is black.
- Retrieved source shows a materially different selected variant.

Expected:

- Preserve conflict.
- Prefer explicit user facts for intended generation context.
- Flag material conflict.
- Do not silently replace the user's selected product context.

## Negative Test 04 — Impossible Duration Density

Input:

- Duration: 4 sec
- Scene Count: 5
- Five major actions required.

Expected:

- Preserve explicit scene count when possible.
- Simplify each scene.
- Reduce action density.
- If coherence remains impossible, block or request correction.
- Never compress five major actions into physically implausible movement.

## Negative Test 05 — Silent Speech Injection

Input:

- Format: Silent Mirror Selfie.

Expected:

- No spoken script.
- No voice-over.
- No lip-sync behavior.
- Behavior is visual.

## Negative Test 06 — Character Drift

Input:

- Scene 01 and Scene 02 use different facial identity descriptions without a supported identity change.

Expected:

- Blocker.
- Restore Character Identity Lock.
- Do not treat the second description as a new creator.

## Negative Test 07 — Product Teleportation

Input:

- Scene 01 product is on table.
- Scene 02 product is in creator's hand.
- No hand movement or interaction exists.

Expected:

- Blocker.
- Add a causal pick-up transition or restore Scene 02 state.

## Negative Test 08 — Cinematic Drift

Input:

- Ordinary UGC scene contains drone orbit, dramatic dolly, and studio rim lighting.

Expected:

- Warning or blocker depending on whether the requested format explicitly calls for cinematic treatment.
- Default UGC generation should remove unsupported cinematic behavior.

## Contract Table

| Contract | Producer | Consumer | Required Check |
|---|---|---|---|
| Product Identity | Product Intelligence | Creative / Scene / Prompt Engines | No identity drift |
| Product State | Scene Planning | Image / Video | Every state change has cause |
| Character Identity | Creator Intelligence | Scene / Prompt Engines | No identity drift |
| Voice Identity | Creator Intelligence | Spoken Script / Video | Stable spoken identity |
| Campaign Evidence | Campaign Intelligence | Scene / Behavior / Prompt | Evidence visible |
| Creative Concept | Creative Logic | Scene Planning | One coherent concept |
| Scene State | Scene Planning | Behavior / Image / Video | Exact traceability |
| Behavior | Content Behavior | Image / Video | Visible and causal |
| Image State | Image Engine | Video Engine | Start/end anchor |
| Video Transition | Video Engine | Final Output | Physical continuity |
| Validation | Embedded validators | Runtime | No blocker at final output |

## Expected Severity

### Blocker

Generation cannot safely proceed or output violates a core continuity or truth contract.

### Warning

Output remains usable but needs simplification or realism correction.

### Pass

Contract is satisfied.

## Audit Procedure

For every fixture:

1. Normalize input.
2. Validate input.
3. Resolve Product Intelligence.
4. Resolve Creator Intelligence.
5. Resolve Campaign Intelligence.
6. Resolve Format × Angle.
7. Resolve duration and scene count.
8. Build Creative Concept.
9. Build Scene States.
10. Build Content Behavior.
11. Generate Image Prompts.
12. Generate Video Prompts.
13. Run contract checks.
14. Repair blockers.
15. Re-run affected checks.
16. Confirm deterministic counts.
17. Confirm final continuity.
18. Mark fixture Pass / Warning / Blocker.

## Regression Rule

Any future module change must be checked against:

- all positive fixtures,
- all negative fixtures,
- output count rules,
- source-of-truth rules,
- continuity rules,
- silent/spoken rules,
- unsupported-detail rules.

A new feature must not weaken an existing invariant without an explicit architecture change.

## Current Audit Status

### Architecture

Pass.

The repo has explicit specifications for:

- Product Intelligence
- Creator Intelligence
- Campaign Intelligence
- Creative Logic
- Scene Planning
- Content Behavior
- Image Prompt Engine
- Video Prompt Engine
- End-to-End Runtime Integration

### Fixture Coverage

Pass for structural coverage.

Positive fixtures cover:

- Fashion silent,
- Beauty product interaction,
- Home problem/solution,
- Fashion spoken.

Negative fixtures cover:

- missing creator,
- invalid format,
- product conflict,
- impossible duration density,
- silent speech injection,
- character drift,
- product teleportation,
- cinematic drift.

### Current Implementation Risk

The contract matrix is now backed by executable Node tests in `tests/contract-tests.mjs`.

Remaining release risks are runtime-environment concerns rather than missing contract coverage:

- the test suite still needs to be executed in a Node environment before declaring a green release;
- live Product URL retrieval remains network-dependent;
- creator references remain intentionally external/request-scoped placeholders until approved Rositasari references are supplied;
- creative wording quality still requires model-level generation evaluation beyond structural contract tests.

These are release-readiness checks, not reasons to weaken the core invariants.


## Test Fixture — Google Flow / 18 Seconds / 5 Scenes

### Input

- Target Duration: 18 sec
- Scene Count: 5
- Generator: Google Flow

### Expected Contract

- 5 Image Prompts
- 4 Scene Transition Prompts
- 4 Google Flow generation clips
- Clip durations: 4s + 4s + 4s + 6s
- Total generated duration: 18 sec
- Scene count remains 5 while generated clip count remains 4
- The final 6s clip carries the Scene 04 → Scene 05 transition
- Scene 05 Image Prompt is the exact ending-state anchor
- No 2s clip is generated

### Negative Fixture

A request for 18 sec with 6 scenes must block under the default transition-per-scene contract because 5 transitions cannot be partitioned exactly into supported 4s / 6s / 8s / 10s clips.

Expected error:

- `INVALID_FLOW_TIMELINE`

