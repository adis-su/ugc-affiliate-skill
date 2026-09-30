# UGC Skill Orchestrator

## Purpose

The UGC Skill Orchestrator is the runtime layer that coordinates all Fashion UGC engines into one deterministic generation workflow.

The individual engines define what good decisions look like.

The Orchestrator defines:

- when each engine runs
- what data it receives
- what data it returns
- when inference is allowed
- when validation must happen
- when a downstream engine may proceed
- when an upstream engine must be revised
- how continuity is preserved
- what the user ultimately receives

Without an orchestrator, eleven engines are just eleven very confident documents sitting in a folder.

---

# 1. Core Principle

**The Orchestrator controls flow, not creative direction.**

It coordinates the system without inventing creative decisions that belong to specialist engines.

Canonical flow:

~~~text
USER INPUT
    ↓
NORMALIZE
    ↓
VALIDATE
    ↓
INFER MISSING DERIVED DATA
    ↓
PRODUCT INTELLIGENCE
    ↓
CONTENT STRATEGY
    ↓
UGC FORMAT
    ↓
CREATIVE CONCEPT
    ↓
SCRIPT / BEHAVIOR
    ↓
STORYBOARD
    ↓
IMAGE REFERENCE PROMPTS
    ↓
FRAME-TO-FRAME VIDEO PROMPTS
    ↓
HUMAN REALISM
    ↓
PRODUCT CONSISTENCY
    ↓
QUALITY CONTROL
    ↓
CORRECTION LOOP
    ↓
FINAL UGC PACKAGE
~~~

---

# 2. System Architecture

The complete runtime is:

~~~text
                     ┌─────────────────────┐
                     │     USER INPUT      │
                     └──────────┬──────────┘
                                ↓
                     ┌─────────────────────┐
                     │ INPUT NORMALIZATION │
                     └──────────┬──────────┘
                                ↓
                     ┌─────────────────────┐
                     │     VALIDATION      │
                     └──────────┬──────────┘
                                ↓
                     ┌─────────────────────┐
                     │      INFERENCE      │
                     └──────────┬──────────┘
                                ↓
              ┌─────────────────────────────────┐
              │       PRODUCT INTELLIGENCE      │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │       CONTENT STRATEGY          │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │          UGC FORMAT             │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │       CREATIVE CONCEPT          │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │       SCRIPT / BEHAVIOR         │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │          STORYBOARD             │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │     IMAGE REFERENCE PROMPT     │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │ FRAME-TO-FRAME VIDEO PROMPT    │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │        HUMAN REALISM            │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │      PRODUCT CONSISTENCY       │
              └────────────────┬────────────────┘
                               ↓
              ┌─────────────────────────────────┐
              │        QUALITY CONTROL          │
              └────────────────┬────────────────┘
                               ↓
                       PASS / REVISE
~~~

---

# 3. Engine Registry

The Orchestrator treats engines as explicit modules.

~~~yaml
engines:
  product_intelligence:
    order: 1
    required: true

  content_strategy:
    order: 2
    required: true

  ugc_format:
    order: 3
    required: true

  creative_concept:
    order: 4
    required: true

  script_behavior:
    order: 5
    required: true

  storyboard:
    order: 6
    required: true

  image_reference_prompt:
    order: 7
    required: true

  frame_to_frame_video_prompt:
    order: 8
    required: true

  human_realism:
    order: 9
    required: true

  product_consistency:
    order: 10
    required: true

  quality_control:
    order: 11
    required: true
~~~

The registry is the source of execution order.

---

# 4. User Input Contract

The Orchestrator accepts the canonical user schema.

~~~yaml
request:
  product:
    name: ""
    url: ""

  campaign:
    objective: ""
    stage: ""
    cta: ""

  creator:
    gender: ""
    age_range: ""
    appearance: ""
    body_type: ""
    style: ""
    reference: null

  content:
    format: ""
    angle: ""
    duration:
      value: 10
      unit: "seconds"
    scene_count: "auto"

  platform: []
~~~

The user-facing schema remains simple.

The Orchestrator converts it into the richer internal representation required by downstream engines.

---

# 5. Input Normalization

Normalization converts user input into canonical internal values.

Examples:

~~~text
"10 sec"
→
duration.value = 10
duration.unit = seconds
~~~

~~~text
"mirror selfie"
→
format = silent_mirror_selfie
~~~

~~~text
"IG Reels"
→
platform = instagram_reels
~~~

Normalization should:

- standardize casing
- map aliases
- validate enum values
- normalize duration
- normalize platform names
- preserve custom values
- distinguish missing from explicit values

Normalization must not invent creative content.

---

# 6. Validation Before Inference

Validation occurs before creative generation.

Required checks:

- product exists
- product name exists
- product URL exists unless a valid fallback reference is supplied
- campaign objective is valid
- campaign stage is valid
- CTA is valid
- creator fields are valid
- content format is valid when explicitly supplied
- angle is valid when explicitly supplied
- duration is valid
- scene count is valid when explicit
- platform contains at least one valid value

If required information is missing and cannot be safely inferred, stop before generation.

---

# 7. Product Retrieval

When a product URL is provided:

~~~text
URL
 ↓
retrieve accessible product information
 ↓
extract product attributes
 ↓
build Product Intelligence
 ↓
flag uncertainty
~~~

Product Intelligence distinguishes:

- verified facts
- observed visual attributes
- inferred attributes
- unknown attributes

Unknown attributes remain unknown.

The Orchestrator must not convert uncertainty into fake certainty.

---

# 8. Fallback Product Input

If the URL is inaccessible or incomplete, the system may use:

- product reference image
- user-provided product description
- other available product evidence

Fallback priority:

~~~text
reference image
>
verified URL information
>
user description
>
generic assumption
~~~

If product identity remains insufficiently defined, generation should stop or request the missing information rather than hallucinating a product.

---

# 9. Inference Layer

Inference derives values that the user did not explicitly provide.

Examples:

- scene count from duration
- platform-specific presentation constraints
- compatible behavior density
- default CTA behavior
- creator appearance when Auto Generate is selected
- default environment when no environment is specified

Inference should be:

- minimal
- reversible
- explainable
- compatible with explicit user choices

Explicit user input always has higher priority than inferred values.

---

# 10. Inference Priority

Use:

~~~text
EXPLICIT USER INPUT
        ↓
EXPLICIT REFERENCE
        ↓
VERIFIED PRODUCT INFORMATION
        ↓
ENGINE RULES
        ↓
SAFE DEFAULT
~~~

Never reverse this order.

The system should not “correct” an explicit user choice merely because another style seems more fashionable.

---

# 11. Content Strategy Resolution

The Orchestrator passes normalized inputs to Content Strategy.

Content Strategy resolves:

- objective
- campaign stage
- angle implications
- CTA implications
- duration constraints
- scene complexity
- platform considerations

Output becomes the strategic contract for downstream engines.

---

# 12. Format Resolution

Format selection priority:

1. explicit user format
2. compatibility with objective and angle
3. duration feasibility
4. scene-count feasibility
5. minimum unnecessary assumptions

If the user explicitly chooses a format, the system should preserve it unless it is technically impossible.

If incompatibility is found, QC should identify it rather than silently replacing the user's format.

---

# 13. Creative Concept Resolution

The Creative Concept Engine receives:

- Product Intelligence
- campaign strategy
- creator profile
- format
- angle
- duration
- platform

It produces one coherent concept.

The Orchestrator must not generate a competing concept after this point.

---

# 14. Script / Behavior Resolution

The Orchestrator selects the correct execution mode:

~~~text
Talking Head
→ dialogue script

Silent Mirror Selfie
→ behavioral script

GRWM
→ sequential action script

Voice-over + B-roll
→ narration + visual behavior

Hybrid
→ dialogue + behavior
~~~

The selected behavior contract becomes the source for the storyboard.

---

# 15. Storyboard Resolution

Storyboard receives the validated behavior plan.

It defines:

- scene boundaries
- visual state
- camera relationship
- composition
- product visibility
- transitions
- Frame A
- Frame B
- continuity anchors

The Orchestrator should not independently alter scene structure after storyboard generation.

---

# 16. Prompt Generation

Each storyboard scene produces:

~~~text
one image reference prompt
+
one frame-to-frame video prompt
~~~

Unless the scene explicitly requires otherwise.

Prompt generation is scene-bound.

It should not create new narrative beats.

---

# 17. Image Prompt Handoff

For each scene:

~~~yaml
image_prompt_input:
  scene_id: 1
  storyboard_state: {}
  creator_identity: {}
  product_identity: {}
  continuity_anchors: []
~~~

The Image Reference Prompt Engine returns:

~~~yaml
image_prompt_output:
  scene_id: 1
  prompt: ""
  continuity_anchors: []
  negative_constraints: []
~~~

---

# 18. Video Prompt Handoff

Video prompt generation uses the image state as the visual starting point.

~~~yaml
video_prompt_input:
  scene_id: 1
  reference_prompt: ""
  frame_state:
    creator: ""
    product: ""
    environment: ""
    camera: ""
    composition: ""
  continuity_anchors: []
  negative_constraints: []
~~~

The video engine must preserve Frame A as the image-reference state.

---

# 19. Human Realism Application

Human Realism is applied after visual and motion states are defined.

It should refine:

- movement
- camera behavior
- facial micro-behavior
- body mechanics
- clothing physics
- environment interaction
- smartphone-native imperfections

It must not rewrite:

- product identity
- scene purpose
- creative concept
- campaign objective

---

# 20. Product Consistency Application

Product Consistency then validates and reinforces:

- identity lock
- product state
- creator-product fit
- color
- logo
- pattern
- construction
- material
- scene continuity
- Frame A/B continuity

Product Consistency can send corrections back to prompt generation when the product state is not adequately protected.

---

# 21. Quality Control Gate

QC receives the complete package.

Possible outcomes:

~~~text
PASS
   ↓
FINAL PACKAGE

PASS WITH WARNINGS
   ↓
FINAL PACKAGE + WARNINGS

REVISE
   ↓
ROUTE TO RESPONSIBLE ENGINE
   ↓
REGENERATE
   ↓
RECHECK

BLOCK
   ↓
STOP
~~~

---

# 22. Correction Routing

The Orchestrator routes issues to the earliest responsible engine.

Canonical mapping:

~~~yaml
correction_routes:
  strategy:
    engine: content_strategy

  format:
    engine: ugc_format

  concept:
    engine: creative_concept

  behavior:
    engine: script_behavior

  scene_structure:
    engine: storyboard

  visual_state:
    engine: image_reference_prompt

  motion:
    engine: frame_to_frame_video_prompt

  realism:
    engine: human_realism

  product:
    engine: product_consistency

  final_validation:
    engine: quality_control
~~~

Do not patch a downstream prompt to hide an upstream conceptual error.

---

# 23. Revision Loop

Revision should be bounded.

Canonical:

~~~text
GENERATE
   ↓
QC
   ↓
ISSUE?
 ┌─┴─┐
NO  YES
 ↓    ↓
PASS  ROUTE
      ↓
   REGENERATE
      ↓
      QC
~~~

Recommended internal default:

~~~yaml
revision_policy:
  max_global_revisions: 2
  max_scene_revisions: 2
~~~

If the package still fails after the limit, return the blocking issue rather than endlessly regenerating.

Humanity already has enough infinite loops.

---

# 24. Revision Scope

When a single scene fails, revise only the affected scene when possible.

Example:

~~~text
Scene 3 product drift
→ revise Scene 3 image/video prompts
→ preserve Scenes 1, 2, 4, 5
~~~

When the issue originates upstream:

~~~text
Concept incompatible with format
→ revise concept
→ regenerate behavior
→ regenerate storyboard
→ regenerate affected prompts
→ QC
~~~

Do not regenerate the entire package unnecessarily.

---

# 25. Dependency Graph

Each engine has dependencies.

~~~yaml
dependencies:
  product_intelligence: []

  content_strategy:
    - product_intelligence

  ugc_format:
    - content_strategy

  creative_concept:
    - product_intelligence
    - content_strategy
    - ugc_format

  script_behavior:
    - creative_concept
    - ugc_format

  storyboard:
    - creative_concept
    - script_behavior
    - ugc_format

  image_reference_prompt:
    - storyboard
    - product_intelligence

  frame_to_frame_video_prompt:
    - storyboard
    - image_reference_prompt

  human_realism:
    - storyboard
    - image_reference_prompt
    - frame_to_frame_video_prompt

  product_consistency:
    - product_intelligence
    - storyboard
    - image_reference_prompt
    - frame_to_frame_video_prompt

  quality_control:
    - product_intelligence
    - content_strategy
    - ugc_format
    - creative_concept
    - script_behavior
    - storyboard
    - image_reference_prompt
    - frame_to_frame_video_prompt
    - human_realism
    - product_consistency
~~~

This dependency graph is more important than simple execution order because it defines what each engine is allowed to know.

---

# 26. State Management

The Orchestrator maintains one canonical runtime state.

~~~yaml
runtime_state:
  request: {}
  normalized_input: {}
  product_intelligence: {}
  strategy: {}
  format: {}
  concept: {}
  script_behavior: {}
  storyboard: {}
  image_prompts: []
  video_prompts: []
  human_realism: {}
  product_consistency: {}
  quality_control: {}
  revisions: []
~~~

Each engine should write to its own state namespace.

Avoid uncontrolled mutation of upstream outputs.

---

# 27. Immutable Anchors

Some values should become immutable after resolution unless a revision explicitly targets them.

Examples:

- product identity
- creator identity
- campaign objective
- selected format
- selected angle
- total duration
- platform list

A downstream engine must not silently modify these values.

---

# 28. Continuity State

The Orchestrator maintains cross-scene anchors.

~~~yaml
continuity_state:
  creator:
    identity: ""
    appearance: ""
    body_type: ""
    style: ""

  product:
    identity_lock: {}
    state_by_scene: {}

  environment:
    location: ""
    mirror: ""
    lighting: ""

  camera:
    relationship: ""

  props:
    - ""
~~~

This state is passed into every scene that depends on continuity.

---

# 29. Scene Runtime Model

Each scene has a runtime record.

~~~yaml
scene_runtime:
  scene_id: 1
  storyboard: {}
  image_prompt: {}
  video_prompt: {}
  realism: {}
  product_consistency: {}
  qc: {}
  revision_count: 0
~~~

This allows scene-level regeneration without destroying valid scenes.

---

# 30. Deterministic Defaults

When the user leaves fields on Auto Generate, the same input should produce logically consistent defaults.

Examples:

- same creator profile
- same product identity
- same environment within a concept
- compatible scene count
- stable format behavior

The system may vary creative details where intentional, but must not vary structural decisions arbitrarily.

---

# 31. Conflict Resolution

When outputs conflict:

### Explicit user input vs engine inference

User input wins.

### Product reference vs generic prompt assumption

Product reference wins.

### Product identity vs stylistic embellishment

Product identity wins.

### Storyboard vs prompt improvisation

Storyboard wins.

### Continuity vs isolated visual novelty

Continuity wins.

### Physical realism vs exaggerated motion

Physical realism wins.

### QC vs downstream prompt

QC identifies the conflict and routes correction upstream.

---

# 32. Failure Handling

The Orchestrator distinguishes:

## Input failure

Missing or invalid user data.

Action:

- stop
- request required information

## Retrieval failure

Product source inaccessible.

Action:

- use valid fallback evidence
- otherwise stop

## Inference failure

Required derived value cannot be safely inferred.

Action:

- stop or apply documented safe default

## Engine failure

An engine cannot produce a valid output.

Action:

- retry within bounded limits
- preserve upstream state

## QC failure

Generated output violates a requirement.

Action:

- route correction
- regenerate affected scope
- revalidate

---

# 33. No Silent Repair

The Orchestrator must not silently alter user inputs.

Example:

User:

~~~text
Duration = 4 seconds
Scene count = 5
~~~

The system should not quietly turn this into:

~~~text
Duration = 10 seconds
Scene count = 5
~~~

Instead:

- validate the combination
- explain the constraint
- use the documented resolution behavior if safely defined

Explicit choices must remain visible.

---

# 34. Auto Scene Count

When the scene count is auto:

derive it from:

- duration
- format
- angle
- concept complexity
- behavior density

Baseline guidance:

~~~text
4 sec → 1–2 scenes
6 sec → 2–3 scenes
8 sec → 3–4 scenes
10 sec → 4–5 scenes
~~~

Then adjust downward when:

- actions are complex
- product handling is complex
- format requires longer beats
- physical transitions are demanding

The result should optimize feasibility, not maximize scene count.

---

# 35. User Output Contract

The Orchestrator returns a final package that is usable without exposing unnecessary internal machinery.

Recommended structure:

~~~yaml
final_response:
  summary: ""
  creative_concept: {}
  script_or_behavior: {}
  storyboard: {}
  image_reference_prompts: []
  video_prompts: []
  continuity_notes: []
  qc:
    status: ""
    warnings: []
~~~

The user should receive the useful artifacts first.

Internal engine diagnostics should remain concise unless explicitly requested.

---

# 36. Output Ordering

Recommended user-facing order:

1. Concept
2. Script / Behavior
3. Storyboard
4. Image Reference Prompts
5. Frame-to-Frame Video Prompts
6. Continuity Notes
7. QC Notes

For prompt-only requests, the Orchestrator may expose only the relevant prompt layers while still running required internal validation.

---

# 37. Minimal Execution Mode

The user may ask for a narrower output.

Example:

~~~text
"Just give me the image prompts."
~~~

The Orchestrator should still run enough upstream reasoning and validation to make the image prompts coherent.

Do not skip:

- product identity
- format interpretation
- storyboard logic
- continuity
- product consistency

Simply hide unnecessary internal outputs.

---

# 38. Full Execution Mode

When the user asks for the complete UGC package, run the full pipeline:

~~~text
Input
→ Intelligence
→ Strategy
→ Format
→ Concept
→ Behavior
→ Storyboard
→ Image
→ Video
→ Realism
→ Product Consistency
→ QC
→ Final
~~~

---

# 39. Runtime Invariants

These must remain true throughout execution:

### Invariant 1

Product identity never changes without explicit product input change.

### Invariant 2

Creator identity never changes without explicit creator input change.

### Invariant 3

Explicit user choices are not silently overridden.

### Invariant 4

Storyboard is the source of visual scene structure.

### Invariant 5

Image prompt defines visual state.

### Invariant 6

Video prompt defines state transition.

### Invariant 7

Human Realism improves plausibility without rewriting intent.

### Invariant 8

Product Consistency protects product identity.

### Invariant 9

QC can block final output.

### Invariant 10

Revision is bounded.

---

# 40. Observability

For debugging and future implementation, the runtime should record:

~~~yaml
execution_log:
  - engine: ""
    status: "completed"
    input_version: 1
    output_version: 1
    revision: 0
    issues: []
~~~

Useful events:

- engine started
- engine completed
- validation failed
- correction routed
- scene regenerated
- package regenerated
- QC passed
- QC blocked

This allows failures to be traced to the engine that introduced them.

---

# 41. Versioning

Every generated package should have a runtime version.

~~~yaml
runtime:
  schema_version: "1.0"
  generation_id: ""
  revision: 0
~~~

Engine changes should not silently invalidate existing package structures.

When schemas evolve:

- preserve backward compatibility where practical
- version breaking changes
- migrate state explicitly

---

# 42. Final Orchestration Algorithm

~~~text
1. Receive user request
2. Normalize input
3. Validate required fields
4. Retrieve/analyze product information
5. Build Product Intelligence
6. Infer only safe missing derived values
7. Resolve Content Strategy
8. Resolve UGC Format
9. Generate Creative Concept
10. Generate Script / Behavior
11. Generate Storyboard
12. Generate Image Reference Prompt per scene
13. Generate Frame-to-Frame Video Prompt per scene
14. Apply Human Realism constraints
15. Apply Product Consistency constraints
16. Run scene-level QC
17. Run package-level QC
18. If PASS: assemble final package
19. If PASS WITH WARNINGS: assemble package + warnings
20. If REVISE: route issue to responsible engine, regenerate affected scope, return to QC
21. If BLOCK: stop and surface blocking issue
22. Return user-facing package
~~~

---

# 43. Final Design Principle

The Orchestrator should make the system behave like one intelligent pipeline rather than a pile of independent prompt generators.

The core relationship is:

~~~text
USER INTENT
    ↓
STRUCTURED DECISION
    ↓
BEHAVIOR
    ↓
VISUAL STATE
    ↓
MOTION
    ↓
REALISM
    ↓
CONSISTENCY
    ↓
VALIDATION
    ↓
OUTPUT
~~~

The prompt is the final expression of those decisions.

It is not the place where the system suddenly tries to invent the decisions it forgot to make upstream.

---

# 44. End State

A successful runtime should produce:

~~~yaml
ugc_generation:
  status: "ready"

  product: {}
  strategy: {}
  format: {}
  concept: {}
  script_behavior: {}
  storyboard: {}

  scenes:
    - scene_id: 1
      image_reference_prompt: ""
      video_prompt: ""
      continuity_anchors: []

  realism_constraints: {}
  product_consistency: {}

  quality_control:
    status: "pass"
    warnings: []

  runtime:
    schema_version: "1.0"
    revision: 0
~~~

The resulting package should be:

- coherent
- traceable
- revisable
- consistent
- physically plausible
- product-faithful
- platform-aware
- ready for generation

That is the purpose of the Orchestrator: **turn eleven specialized engines into one reliable UGC production system.**
