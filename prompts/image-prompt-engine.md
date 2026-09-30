# Image Prompt Engine Specification

The Image Prompt Engine converts a resolved Scene State and Behavior Plan into one generation-ready Image Prompt.

It is the first final-output generation engine.

## Runtime Position

`Scene State + Content Behavior + Identity Locks + Product Intelligence + Human Realism → Image Prompt`

The engine must not invent new creative direction.

It translates an already-resolved visual state into a coherent still-image instruction.

## Core Principle

An Image Prompt describes:

> **One believable visual moment that could exist as a single frame.**

It must not describe a sequence of actions.

Use:

`Character Identity + Product State + Visible Behavior + Environment + Camera + Lighting + UGC Realism + Continuity`

Do not use:

`Character + action A + action B + action C + future result`

Time-based behavior belongs in Video Prompts.

## Inputs

The engine consumes:

### Scene State

- Scene ID
- Purpose
- Creator State
- Product State
- Environment State
- Camera State
- Required Evidence
- Continuity Locks

### Content Behavior

- Intent
- Attention Target
- Primary Action
- Supporting Action
- Micro-Behavior
- Product Interaction
- Reaction
- Camera Behavior

### Identity Sources

- Character Identity Lock
- Character Reference
- Product Identity Lock
- Product Reference

### Creative Constraints

- Creative Concept
- Niche
- Format
- Angle
- Campaign evidence
- CTA state when relevant

### Realism Constraints

- Human anatomy
- Natural pose
- Material physics
- Smartphone behavior
- Natural lighting
- UGC authenticity

## Image Prompt Contract

Every Image Prompt must resolve:

1. Who is visible?
2. What product is visible?
3. What is the creator doing?
4. What is the creator looking at?
5. What is the current physical state?
6. Where is the scene?
7. What does the camera see?
8. What lighting exists?
9. What must remain consistent?
10. What should not be introduced?

If any required answer is unknown, use only supported information.

Do not fill missing identity or product details with imagination.

## Prompt Assembly Hierarchy

Assemble in this order:

1. Character Identity
2. Current Creator State
3. Product Identity
4. Product State
5. Visible Behavior
6. Environment
7. Camera / Composition
8. Lighting
9. UGC Visual Language
10. Continuity Constraints
11. Minimal Negative Constraints when necessary

The final result should read as one natural visual description rather than a checklist.

## 1. Character Identity

Use the Character Identity Lock as the source of truth.

Include only identity attributes relevant to visual continuity:

- recognizable facial identity,
- defined hair,
- defined skin appearance,
- defined body/proportion attributes,
- stable creator style,
- Character Reference when supported.

Do not regenerate the creator conceptually for each scene.

### Canonical Character Identity Rule

When the selected creator is Rositasari, `creators/rositasari.md` and the resolved Creator Library entry are the canonical Character Identity source of truth. Every generated Image Prompt must explicitly carry the resolved Character Identity Lock as an identity anchor. The prompt must preserve Rositasari's defined age, height, Southeast Asian visual appearance, hijab identity, facial features, skin characteristics, and all other defined identity attributes. A supplied character reference may condition generation, but it must not silently override the canonical identity.

The same canonical identity lock applies to every scene. Scene State may change pose, gaze, expression, wardrobe, or temporary physical state when the creative brief requires it, but it must not redefine the creator.

### Character Reference

When a Character Reference exists:

- explicitly anchor the creator to the same reference,
- preserve recognizable facial identity,
- preserve stable appearance attributes,
- allow pose and expression to change naturally.

When no reference exists:

- use only defined Character Identity fields,
- do not invent missing facial, body, hair, skin, or age details.

## 2. Current Creator State

Describe what the creator is visibly doing now.

Include:

- body position,
- orientation,
- pose,
- hand position,
- gaze,
- facial expression,
- temporary hair position,
- campaign wardrobe,
- temporary appearance state.

Do not describe future actions.

Bad:

> She reaches for the product and then applies it.

Good:

> She is holding the opened product near the application area, focused on the mirror.

The latter describes a state that can exist as a still image.

## 3. Product Identity

Use the Product Identity Lock.

Include only supported visible attributes:

- product type,
- brand when supported,
- shape,
- color,
- pattern,
- material when supported,
- packaging,
- visible branding,
- relevant functional parts.

Do not invent:

- exact shade names,
- exact dimensions,
- ingredients,
- performance,
- material composition,
- packaging text,
- hidden mechanisms.

## 4. Product State

Describe the product's current state:

- closed / open,
- worn / unworn,
- held / placed,
- applied / unapplied,
- in use / inactive,
- adjusted / unadjusted.

Product state must match the Scene State Model.

If the product changed state from the previous scene, the change must already be explained by the transition.

## 5. Visible Behavior

Translate Content Behavior into one clear visual action.

Primary Action should dominate.

Examples:

### Fashion

> lightly adjusting the sleeve while checking the fit in the mirror

### Beauty

> holding the applicator against the cheek while inspecting the application in the mirror

### Home

> placing the organizer into the designated shelf space

Supporting actions should remain subtle.

Micro-behavior should only be included when visible and useful.

## 6. Environment

Describe only environment elements relevant to:

- spatial context,
- product use,
- continuity,
- lighting,
- scale,
- interaction.

Prefer ordinary environments appropriate to the format.

Examples:

- bedroom mirror,
- bathroom counter,
- everyday vanity,
- home desk,
- living room shelf.

Do not add random decorative props.

## 7. Camera and Composition

The Image Prompt must describe the capture relationship.

Typical UGC camera properties:

- smartphone capture,
- vertical framing when appropriate,
- handheld or naturally supported phone,
- ordinary perspective,
- realistic camera distance,
- slightly imperfect framing,
- natural headroom,
- plausible mirror relationship.

Composition should support the evidence.

Examples:

### Fashion

Keep enough of the body and garment visible to judge fit and styling.

### Beauty

Keep face, hand, and product visible when application is the evidence.

### Home

Keep product and relevant spatial context visible.

Do not use cinematic composition by default.

Avoid:

- dramatic Dutch angles,
- elaborate tracking-style perspective,
- commercial product hero framing,
- impossible depth of field,
- artificial camera movement implied in a still frame.

## Mirror Selfie Rules

For mirror-based formats:

- distinguish creator, reflection, phone, and mirror,
- maintain correct reflection geometry,
- preserve phone placement,
- avoid impossible duplicated limbs,
- avoid reversed branding unless physically appropriate,
- keep reflection consistent with the creator's pose.

The mirror is part of the physical environment, not a second camera universe.

## 8. Lighting

Lighting should be plausible for the environment.

Prefer:

- window light,
- ordinary ceiling light,
- bathroom lighting,
- room lighting,
- mixed natural/ambient light when plausible.

Describe:

- source,
- direction,
- softness,
- approximate exposure,
- realistic response on skin, product, clothing, and surfaces.

Avoid:

- studio beauty lighting by default,
- dramatic rim light,
- glossy commercial highlights,
- artificial cinematic color grading.

## 9. UGC Visual Language

The final prompt should preserve:

- ordinary smartphone capture,
- natural framing,
- believable imperfections,
- realistic skin and materials,
- casual composition,
- plausible exposure,
- human-scale environment,
- non-commercial visual behavior.

UGC does not mean intentionally bad photography.

The target is:

> **ordinary but believable.**

## 10. Continuity Constraints

Carry forward only high-risk constraints.

Typical constraints:

### Character

- same Character Identity,
- same face,
- same hair identity,
- same campaign wardrobe.

### Product

- same product,
- same color/pattern,
- same packaging,
- same visible branding,
- same material behavior.

### Environment

- same room,
- same mirror,
- same furniture placement,
- same relevant object position.

### Camera

- same phone orientation,
- same mirror relationship,
- compatible framing.

Do not repeat every attribute if it is already structurally guaranteed.

## Evidence-First Framing

When campaign evidence is required, composition must make the evidence visible.

Examples:

- fit angle → garment silhouette remains visible,
- texture angle → product texture and application area remain visible,
- functionality angle → relevant moving/functional part is visible,
- organization angle → before/after spatial relationship is readable.

Do not hide required evidence behind aesthetic framing.

## Niche-Specific Image Prompt Rules

### Fashion

Prioritize:

- natural anatomy,
- garment fit,
- fabric folds,
- silhouette,
- mirror geometry,
- smartphone framing,
- styling visibility.

Avoid:

- editorial poses,
- impossible garment seams,
- fused limbs,
- floating clothing,
- exaggerated body proportions.

### Beauty

Prioritize:

- skin texture,
- hand anatomy,
- facial identity,
- application state,
- product texture,
- realistic reflection,
- lighting on skin.

Avoid:

- plastic skin,
- airbrushed texture,
- floating applicators,
- impossible product amounts,
- exaggerated makeup perfection.

### Home

Prioritize:

- object scale,
- room geometry,
- placement,
- shadows,
- material properties,
- interaction state.

Avoid:

- floating objects,
- impossible scale,
- inconsistent furniture,
- changing room geometry,
- unrealistic shadows.

## Silent Format Handling

For silent formats:

- show intent through visible behavior,
- no dialogue,
- no voice-over,
- no lip-sync instructions,
- preserve natural expression.

The image should communicate enough context that the behavior is understandable without speech.

## Spoken Format Handling

For spoken formats:

- visual prompt describes what the creator is doing while speaking,
- do not include the full dialogue,
- preserve Voice Identity only as a continuity constraint when relevant,
- do not turn speech into a visual action.

## CTA Image State

If CTA is required, the final image may support it through:

- unobstructed product visibility,
- natural product hold,
- product-focused framing,
- relevant pointing gesture when format-compatible.

Do not create a commercial end card unless explicitly requested.

## Negative Constraints

Use negative constraints selectively.

Include them only when a failure is likely.

Useful examples:

- no extra fingers,
- no duplicated product,
- no altered garment pattern,
- no impossible mirror reflection,
- no floating objects,
- no extra limbs,
- no product identity change.

Avoid giant generic negative prompts.

A negative constraint should protect a specific continuity or realism risk.

## Prompt Compression

Before finalizing, remove:

- repeated identity descriptions,
- duplicate realism adjectives,
- internal field names,
- generic “ultra realistic” language,
- unnecessary background details,
- redundant negative constraints.

Preserve:

- identity anchors,
- product-defining attributes,
- current state,
- evidence,
- camera relationship,
- physical interaction,
- critical continuity.

## Image Prompt Anti-Patterns

Do not:

- describe multiple moments in one image prompt,
- include future actions,
- invent product details,
- invent creator identity details,
- create cinematic advertising imagery by default,
- overuse “ultra realistic” or “8K” as a substitute for realism,
- overload the background,
- hide the product,
- hide required evidence,
- change character appearance,
- change product identity,
- use random props,
- use giant negative prompts,
- describe video movement inside an image prompt.

## Image Prompt Validation

Validate:

| Area | Check | Severity |
|---|---|---|
| State | Prompt describes one still state | Blocker |
| Character | Identity matches Character Identity Lock | Blocker |
| Product | Identity matches Product Identity Lock | Blocker |
| Product | State matches Scene State | Blocker |
| Behavior | Primary action is visible | Blocker |
| Evidence | Required evidence is visible | Blocker |
| Environment | Spatial context is plausible | Blocker |
| Camera | Capture relationship is plausible | Blocker |
| Lighting | Lighting is physically plausible | Warning |
| Anatomy | Hands/body/face are plausible | Blocker |
| Continuity | High-risk attributes remain stable | Blocker |
| Unsupported | No unsupported facts introduced | Blocker |
| UGC | Visual language feels ordinary and human-made | Warning |
| Negative | Constraints are minimal and relevant | Warning |

### Local Repair Rules

Repair the smallest failed component.

Examples:

- future action → convert to current state,
- identity drift → restore Character Identity Lock,
- product drift → restore Product Identity Lock,
- missing evidence → adjust framing,
- cinematic framing → simplify camera language,
- anatomy issue → simplify pose/hand interaction,
- overdescribed prompt → compress repeated details,
- unsupported attribute → remove it.

## Image Prompt Output

For every scene produce exactly:

- Scene ID
- Image Prompt

Do not include hidden reasoning inside the prompt.

The user-facing prompt should be generation-ready.

## Image Prompt Invariants

Throughout execution:

- one scene → one Image Prompt,
- one Image Prompt → one visual state,
- same scene state → same visual truth,
- Character Identity Lock remains stable,
- Product Identity Lock remains stable,
- current product state is explicit when relevant,
- required evidence is visible,
- behavior is visually readable,
- camera relationship is plausible,
- realism comes from physical detail rather than adjectives,
- unsupported attributes remain unknown,
- no future action appears in the prompt.

## Runtime Integration

`User Input
→ Normalize
→ Validate
→ Product Intelligence
→ Creator Intelligence
→ Campaign Intelligence
→ Format × Angle
→ Duration / Scene Count
→ Creative Logic
→ Scene Planning
→ Content Behavior
→ Image Prompt Engine
→ Video Prompt Engine
→ Validation
→ Repair
→ Revalidate
→ Output`

The Image Prompt Engine is responsible for producing the stable visual anchors that the Video Prompt Engine will later use as starting and ending states.


## Final Prompt Format

The final Image Prompt must use a stable, ordered structure so every scene is readable, comparable, and machine-processable.

### Canonical Structure

```text
[IMAGE PROMPT]

SCENE:
{scene_id}

PURPOSE:
{scene_purpose}

SUBJECT:
{creator_identity}

CREATOR STATE:
- Pose: {pose}
- Body position: {body_position}
- Facial expression: {expression}
- Gaze: {gaze}
- Hands: {hand_position}

PRODUCT:
{product_identity}

PRODUCT STATE:
- Position: {product_position}
- Orientation: {product_orientation}
- Interaction: {product_interaction}
- Visible details: {required_product_details}

ENVIRONMENT:
- Location: {location}
- Background: {background}
- Important objects: {important_objects}

CAMERA:
- Shot: {shot_type}
- Angle: {camera_angle}
- Framing: {framing}
- Camera position: {camera_position}
- Lens perspective: {lens_perspective}

LIGHTING:
- Source: {light_source}
- Direction: {light_direction}
- Quality: {light_quality}
- Exposure: {exposure}

UGC REALISM:
- Capture style: {capture_style}
- Natural imperfections: {imperfections}
- Image quality: {quality}
- Commercial polish: {commercial_polish}

CONTINUITY:
- Creator: {creator_lock}
- Product: {product_lock}
- Environment: {environment_lock}
- Camera: {camera_lock}

REQUIRED EVIDENCE:
{required_evidence}

FORBIDDEN CHANGES:
{forbidden_changes}
```

### Assembly Rule

The canonical fields are an **output format**, not a second source of truth. Populate them only from resolved Scene State, Content Behavior, Identity Sources, Product Intelligence, and Realism Constraints.

The generation prompt may be rendered as a natural-language paragraph after assembly, but the semantic field order must remain stable:

`Character Identity Lock → Subject / Creator State → Product → Product State → Environment → Camera → Lighting → UGC Realism → Continuity → Evidence → Forbidden Changes`

Do not add fields ad hoc per scene.

### Field Rules

- `SCENE` identifies the source scene.
- `PURPOSE` states the single dominant scene purpose.
- `SUBJECT` anchors creator identity.
- `CREATOR STATE` describes only the visible current state.
- `PRODUCT` and `PRODUCT STATE` are separate so identity cannot be confused with temporary state.
- `ENVIRONMENT` describes only relevant spatial context.
- `CAMERA` describes the capture relationship, not hypothetical camera motion.
- `LIGHTING` describes the plausible light state.
- `UGC REALISM` protects ordinary human-made capture language.
- `CONTINUITY` carries high-risk locks only.
- `REQUIRED EVIDENCE` maps campaign requirements to visible composition.
- `FORBIDDEN CHANGES` protects known failure modes.

### Required Output Shape

For each scene, return exactly:

```text
Scene ID: {scene_id}

Image Prompt:
{canonical image prompt}
```

No hidden reasoning, implementation notes, or alternate prompt versions belong in the generation-ready output.
