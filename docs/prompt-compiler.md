# Prompt Compiler

## Purpose

The Prompt Compiler is the final translation layer of the Fashion UGC Skill.

It converts validated reasoning into the two outputs the user actually needs:
1. image-generation prompt
2. frame-to-frame video-generation prompt

It is prompt-centric. It does not replace the reasoning engines.

## Architecture

USER INPUT
→ PRODUCT INTELLIGENCE
→ CONTENT LOGIC
→ FORMAT
→ CREATIVE CONCEPT
→ SCRIPT / BEHAVIOR
→ STORYBOARD
→ PROMPT COMPILER
   ├── IMAGE PROMPT
   └── FRAME-TO-FRAME VIDEO PROMPT
→ HUMAN REALISM
→ PRODUCT CONSISTENCY
→ QC

The prompt is the final expression of reasoning, not where reasoning is invented.

## Layer Responsibilities

| Layer | Question |
|---|---|
| Product Intelligence | What is the product? |
| Content Logic | Why is the content being made? |
| Format | How is it executed? |
| Concept | What is the creative idea? |
| Script / Behavior | What does the creator do? |
| Storyboard | What is visible at each moment? |
| Human Realism | How should a real person/camera behave? |
| Product Consistency | What must not drift? |
| Prompt Compiler | How is all of this expressed clearly? |

## Compilation Rules

1. Preserve upstream decisions.
2. Prefer visual specificity over decorative adjectives.
3. Keep one instruction to one meaning.
4. Never invent unsupported product facts.
5. Treat realism as behavior and physics, not repeated “photorealistic” adjectives.
6. Every camera description must have a plausible physical relationship.
7. Negative constraints must be targeted.
8. Carry identity-critical continuity anchors forward.
9. Remove redundant wording before final output.
10. Never use the prompt layer to hide an upstream decision error.

## Image Track

Input:
- storyboard visual state
- creator identity
- product identity
- environment
- camera relationship
- composition
- lighting
- realism
- continuity

Assembly:
scene identity → creator lock → product lock → behavior/state → environment → camera → composition → lighting → realism → continuity → targeted negatives

Output: one coherent static visual-state prompt.

## Video Track

Input:
- Frame A
- Frame B
- behavior transition
- creator/product/environment anchors
- camera relationship
- realism
- continuity

Assembly:
Frame A → primary action → body/hands → clothing/product response → camera response → Frame B → continuity → targeted negatives

Output: one coherent state-transition prompt.

## Prompt Compression

Keep high constraint density and low verbal noise.

If several upstream layers say the same thing, express it once. Preserve repetition only where it materially improves model interpretation.

The goal is not the longest prompt. The goal is the least ambiguous prompt.

## Format Adapters

Silent Mirror Selfie prioritizes mirror geometry, phone position, reflection, outfit visibility, and natural self-check behavior.

Talking Head prioritizes face readability, speech-compatible movement, smartphone framing, and product visibility.

Try-On prioritizes garment state, fit, transition, and clothing physics.

GRWM prioritizes sequential state, hands, dressing order, and environment continuity.

Product Showcase prioritizes product identity, material/detail fidelity, stable framing, and the specific attribute being shown.

Other formats follow their format specification.

## Scene-Level Compilation

Compile independently per scene.

validated storyboard scene
→ image compiler
→ image prompt
→ video compiler
→ video prompt
→ scene QC

A failed scene should be regenerable without rebuilding the entire concept.

## Continuity Strategy

Maintain compact anchors for:
- creator identity, body proportions, hairstyle, styling
- product color, pattern, logo, construction, fit
- environment, location, mirror, major props, lighting
- camera-device relationship and orientation

Only include anchors relevant to the current scene.

## QC Interface

Expose enough metadata for QC to verify:
- source scene ID
- creator lock
- product lock
- continuity anchors
- negative constraints

If the underlying scene is wrong, revise upstream. If the scene is correct but wording is weak or bloated, revise only the compiler output.

## Anti-Pattern

Do not implement:

USER INPUT
→ giant prompt

A giant prompt cannot reliably solve product ambiguity, format mismatch, timing, behavior feasibility, continuity, or product drift. Those are reasoning problems.

## Minimal V1

Required:
- Product Intelligence
- Content Logic
- Format Specification
- Creative Concept
- Script / Behavior
- Storyboard
- Image Reference Prompt Engine
- Frame-to-Frame Video Prompt Engine
- Human Realism
- Product Consistency
- QC
- Prompt Compiler

Not required for V1:
- production runtime
- provider abstraction
- deployment system
- orchestration service

## Final User Contract

When the user asks for prompts, return:

yaml:
  prompt_package:
    image_prompts:
      - scene_id: 1
        prompt: ""
    video_prompts:
      - scene_id: 1
        frame_a: ""
        frame_b: ""
        prompt: ""

Optional supporting output:
- concise concept
- continuity anchors
- QC warnings

Do not expose internal architecture unless requested.

## Definition of Done

The compiler succeeds when:
- every image prompt maps to one storyboard visual state
- every video prompt maps to one Frame A → Frame B transition
- creator identity is stable
- product identity is stable
- camera mechanics are plausible
- human movement is plausible
- clothing physics are plausible
- prompts are specific without being bloated
- no unsupported product details are introduced
- the final prompt package is directly usable in an image/video generation workflow

The final measure is not prompt length. It is whether the prompt makes the intended visual or motion state difficult for the generation model to misunderstand.


## Multi-Reference Compilation

Each scene may use multiple image references. Do not treat them as interchangeable or equally authoritative.

Reference roles should be mapped explicitly:

- creator → identity and body proportions
- product → exact product identity and construction
- environment → spatial context and geometry
- pose → body and hand position
- composition → framing and subject placement
- lighting/style → visual treatment when required

The compiler should state the role of important references when needed by the generation model, then fuse them into one coherent visual state.

Reference priority follows the Reference Image System. Critical creator/product references must not be overridden by lower-priority pose, composition, or style references.

For every scene, preserve the distinction between:

- reference images: source constraints
- generated Frame A: actual starting visual state
- generated Frame B: actual ending visual state

More references are not automatically better. Add a reference only when it controls a meaningful visual constraint.
