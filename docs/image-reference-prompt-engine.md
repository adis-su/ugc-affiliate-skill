# Image Reference Prompt Engine

## Purpose

The Image Reference Prompt Engine converts a validated Storyboard scene into a single coherent image-generation prompt that establishes the visual state required for that scene.

It answers:

> “What exact visual reference should exist at this moment?”

The engine does not invent creative direction. It translates decisions already made by Product Intelligence, Content Strategy, UGC Format Engine, Creative Concept Engine, Script / Behavior Engine, and Storyboard Engine.

---

## Core Principle

**The image prompt is the rendering instruction, not the creative brain.**

The upstream pipeline decides:

~~~text
why → what → behavior → scene → visual state
~~~

The Image Reference Prompt Engine decides how to describe that visual state clearly to an image model.

The engine should maximize visual specificity, identity consistency, product consistency, human realism, physical plausibility, and scene clarity while minimizing unnecessary adjectives, cinematic embellishment, conflicting instructions, generic beauty language, and invented product details.

---

# 1. Inputs

Required:

- Product Intelligence
- Creator profile
- Content Format
- Content Angle
- Creative Concept
- Script / Behavior beat
- Storyboard scene
- Platform
- Human Realism constraints
- Product Consistency constraints

Important storyboard inputs:

- scene purpose
- creator state
- product state
- environment
- lighting
- camera relationship
- framing
- composition
- transition context
- continuity anchors
- must-avoid

---

# 2. Output Contract

Canonical structure:

~~~yaml
image_prompt:
  scene_id: 1
  purpose: ""
  prompt: ""
  continuity_anchors:
    - ""
  product_lock:
    - ""
  creator_lock:
    - ""
  realism_constraints:
    - ""
  negative_constraints:
    - ""
~~~

The primary output is the final prompt string.

The supporting fields exist so downstream QC and regeneration logic can verify that important constraints were preserved.

---

# 3. Prompt Construction Order

Use a stable hierarchy:

~~~text
1. Scene identity
2. Creator identity
3. Product identity
4. Creator behavior/state
5. Environment
6. Camera relationship
7. Framing/composition
8. Lighting
9. Human realism
10. Product consistency
11. Continuity anchors
12. Negative constraints
~~~

Do not randomly reorder information merely to make prompts sound poetic. Clear, non-contradictory instructions matter more than decorative prose.

---

# 4. Scene Identity

Start by stating what the image represents.

Example:

> A natural smartphone mirror-selfie moment of a young adult checking the fit of a casual shirt before leaving home.

This establishes format, situation, human motivation, and visual context.

Avoid default language such as:

> cinematic fashion editorial, luxury campaign, award-winning photography

unless the user's concept explicitly requires a different visual language.

The default target is **believable human-created UGC**.

---

# 5. Creator Identity Lock

The prompt must preserve creator identity across scenes.

Include only relevant attributes:

- gender presentation when provided
- age range
- body type
- hair
- skin/appearance characteristics
- facial structure when known
- creator reference characteristics
- styling
- accessories

### Identity priority

If a creator reference exists:

**reference identity > generated description**

The prompt should not overwrite reference-specific traits with generic beauty language.

Avoid:

- perfect face
- flawless skin
- model proportions
- ideal body
- perfect symmetry

unless explicitly required by the source concept.

These phrases tend to push output away from ordinary UGC and toward synthetic fashion imagery.

---

# 6. Product Identity Lock

Product identity is mandatory.

Use Product Intelligence as the source of truth.

Include relevant attributes:

- product type
- exact color
- pattern
- logo
- material appearance
- cut
- fit
- collar
- sleeves
- hem
- seams
- buttons/zippers
- graphic placement
- distinctive construction details

### Product priority

When product reference imagery exists:

**reference product > generic textual approximation**

Do not invent:

- new logos
- extra graphics
- different colors
- new pockets
- different collar shapes
- different sleeve lengths
- decorative details not supported by Product Intelligence

---

# 7. Behavior Translation

The prompt should represent the scripted behavior visually.

Example script:

> Creator smooths the shirt hem once while checking the mirror.

The image prompt should describe:

> one hand lightly smoothing the shirt hem while the creator looks at their reflection

Not:

> creator dramatically poses with both hands around the shirt

Behavior must remain consistent with the storyboard.

---

# 8. Environment

Describe the environment at the level needed to preserve scene identity.

Typical UGC environments:

- bedroom
- apartment hallway
- living room
- dressing area
- bathroom mirror
- bedroom mirror
- small home studio
- street
- cafe
- office
- gym
- outdoor everyday setting

Include relevant physical anchors:

- mirror
- wall
- floor
- furniture
- doorway
- bed
- chair
- counter
- phone
- shopping bag
- packaging

Avoid filling the prompt with irrelevant decoration.

The environment exists to support believable context and continuity.

---

# 9. Camera Relationship

Camera language should reflect the actual capture mechanism.

Examples:

### Smartphone mirror selfie

> handheld smartphone held naturally in one hand, visible in the mirror reflection

### Talking head

> front-facing smartphone camera at natural arm's length, casual handheld framing

### Static phone

> smartphone placed on a stable surface at human eye level

### POV

> plausible first-person smartphone perspective from the creator's position

### Product close-up

> handheld smartphone close-up at natural human distance

Avoid anamorphic cinematic lenses, crane shots, dolly tracking, studio camera rigs, or impossible overhead cameras unless explicitly required.

---

# 10. Framing and Composition

Translate storyboard decisions directly.

Examples:

- vertical 9:16 composition
- full-body mirror framing
- medium upper-body framing
- close-up of collar and fabric
- creator slightly off-center
- product clearly readable
- natural negative space

Do not introduce composition that conflicts with the storyboard.

### Composition priority

1. required behavior
2. product readability
3. creator readability
4. environment continuity
5. aesthetic balance

The image should still work as UGC even if it is not visually perfect.

---

# 11. Lighting

Describe lighting based on the storyboard and environment.

Useful language:

- natural window light
- ordinary indoor overhead light
- soft daylight
- slightly uneven household lighting
- practical room lighting
- mixed natural and indoor light

Avoid defaulting to dramatic studio lighting, beauty lighting, rim light, cinematic volumetric lighting, or perfect commercial lighting unless explicitly required.

Small imperfections can help preserve authenticity:

- mild exposure variation
- subtle shadow asymmetry
- realistic skin highlights
- ordinary household lighting falloff

Do not turn imperfection into an obvious visual effect.

---

# 12. Human Realism Translation

Human Realism should be expressed as physical and behavioral constraints.

Include relevant cues such as:

- natural posture
- relaxed shoulders
- slight weight shift
- subtle hand movement
- realistic finger positioning
- ordinary facial expression
- natural gaze direction
- imperfect but plausible framing
- slight handheld variation
- realistic fabric folds
- natural garment tension

Avoid excessive lists of micro-imperfections.

The goal is **believable human behavior**, not a checklist of AI defects disguised as realism.

---

# 13. Product Consistency Translation

Product Consistency should be explicit enough to prevent visual drift.

Important constraints may include:

- exact product color remains unchanged
- pattern placement remains unchanged
- logo remains in the same location
- collar shape remains consistent
- sleeve length remains consistent
- hem length remains consistent
- material appearance remains consistent
- seams remain structurally consistent
- fit remains consistent with creator body

For repeated scenes, continuity anchors should be reused rather than rewritten inconsistently.

---

# 14. Mirror Selfie Prompt Rules

Silent Mirror Selfie is a first-class format.

The prompt must preserve:

### Reflection geometry

- mirror plane is coherent
- creator and phone appear correctly reflected
- phone remains in the creator's hand
- reflection angle matches camera relationship

### Phone

- one believable phone
- realistic hand grip
- no floating device
- no impossible duplicated phone

### Body

- reflected body proportions remain stable
- feet/body placement follows mirror geometry
- no impossible limb positioning

### Environment

- mirror edges remain stable
- background objects remain consistent
- room geometry does not shift

### Product

- garment remains identical across reference scenes
- fabric and seams remain plausible
- product is not warped by reflection

---

# 15. Reference Image vs Prompt

If the system has a creator reference or product reference image:

The prompt should reinforce the reference, not recreate the reference from scratch with conflicting textual details.

Use language such as:

> preserve the same creator identity, hairstyle, body proportions, and overall appearance as the reference

and:

> preserve the exact product design, color, pattern placement, logo, and construction shown in the reference

Do not add unsupported specifics.

---

# 16. Prompt Density

A good prompt is not necessarily a long prompt.

Use detail when it controls:

- identity
- product
- behavior
- camera
- environment
- continuity
- realism

Avoid adjectives that only create mood without changing the visual outcome.

### Weak

> beautiful, stunning, luxurious, cinematic, fashionable, premium, gorgeous fashion photo

### Better

> casual smartphone mirror selfie in a real bedroom, natural daylight, relaxed posture, one hand adjusting the shirt hem, product clearly visible, slightly imperfect handheld framing

Specificity beats adjective inflation.

---

# 17. Negative Constraints

Negative constraints should target known failure modes.

Examples:

- no extra fingers
- no duplicated hands
- no floating phone
- no duplicate person
- no warped mirror reflection
- no changing product color
- no changing logo
- no altered garment pattern
- no impossible body proportions
- no teleporting objects
- no studio fashion editorial styling
- no excessive retouching
- no dramatic cinematic composition

Do not create huge generic negative-prompt lists. Only include constraints relevant to the scene.

---

# 18. Prompt Template

Canonical assembly:

~~~text
[SCENE]
Natural [format/situation] showing [creator] [behavior] while [product role].

[CREATOR]
Preserve [identity/appearance/body/style/reference traits].

[PRODUCT]
Preserve [product identity, color, pattern, construction, fit, logo].

[ENVIRONMENT]
Set in [location] with [relevant environmental anchors].

[CAMERA]
Captured as [camera relationship], [framing], [angle], [stability].

[COMPOSITION]
[subject position], [product emphasis], [relevant negative space].

[LIGHTING]
[lighting conditions consistent with environment].

[REALISM]
Natural posture, believable hand placement, realistic fabric behavior, ordinary smartphone capture, subtle handheld imperfection.

[CONTINUITY]
Preserve [anchors from previous/next scene].

[NEGATIVE CONSTRAINTS]
Avoid [scene-specific failure modes].
~~~

The final prompt should read naturally as one coherent instruction, not as a pile of disconnected tags.

---

# 19. Format-Specific Prompt Adaptation

## Talking Head

Prioritize:

- face readability
- natural speaking posture
- product visibility
- smartphone framing
- believable facial expression

Do not make the creator look like a television presenter.

## Silent Mirror Selfie

Prioritize:

- mirror geometry
- phone placement
- outfit visibility
- natural self-check behavior
- reflection consistency

## Outfit Showcase

Prioritize:

- full outfit silhouette
- product prominence
- readable posture
- natural stance

## Try-On

Prioritize:

- correct clothing state
- transformation continuity
- fit
- garment physics

## GRWM

Prioritize:

- current dressing state
- hands
- clothing sequence
- environment continuity

## Voice-over + B-roll

Prioritize:

- visually relevant action
- product evidence
- contextual environment

## POV

Prioritize:

- plausible first-person viewpoint
- hand/body interaction
- physical scale

## Lifestyle

Prioritize:

- everyday context
- natural product integration
- non-performative behavior

## Product Showcase

Prioritize:

- product identity
- specific attribute
- material/detail fidelity
- clean but believable capture

## Before / After

Prioritize:

- state comparability
- creator continuity
- product state difference

## Unboxing

Prioritize:

- package identity
- hand interaction
- opening state
- reveal state
- product continuity

---

# 20. Prompt Assembly Example

Storyboard input:

~~~yaml
scene_id: 3
purpose: "adjust garment"
creator:
  state: "satisfied, checking fit"
product:
  state: "being_adjusted"
  visibility: "high"
environment:
  location: "bedroom mirror"
camera:
  relationship: "handheld mirror selfie"
  framing: "medium-full body"
composition:
  product_emphasis: "shirt fit"
~~~

Possible prompt:

> Natural smartphone mirror selfie in a real bedroom, showing the same young adult creator checking the fit of the same casual shirt while lightly smoothing the shirt hem once with the free hand. Preserve the creator's identity, hairstyle, body proportions, styling, and appearance from the reference. Preserve the exact shirt color, pattern, logo placement, collar shape, sleeve length, hem, seams, material appearance, and fit from the product reference. The creator holds one smartphone naturally in one hand, visible correctly in the mirror reflection, with the other hand touching the hem. Medium-full-body vertical 9:16 framing, realistic mirror geometry, ordinary bedroom background, soft natural indoor daylight, relaxed shoulders, subtle weight shift, realistic fingers and fabric folds, slight handheld imperfection, believable everyday UGC capture. Keep the room, mirror, phone, creator, and garment consistent with adjacent scenes. No floating phone, duplicate hands, warped reflection, altered garment design, changed product color, distorted body proportions, editorial fashion pose, studio lighting, or excessive retouching.

The example demonstrates the structure. The engine should generate from actual scene data rather than copy this wording blindly.

---

# 21. Validation

Before output, validate:

### Scene fidelity

- Prompt represents the storyboard scene.
- No major behavior is added or removed.
- Purpose remains intact.

### Creator fidelity

- Identity constraints preserved.
- No generic beauty transformation.
- Body type remains consistent.

### Product fidelity

- Product identity preserved.
- No invented attributes.
- Color/pattern/logo/construction remain stable.

### Camera fidelity

- Camera relationship matches format.
- Framing matches storyboard.
- No impossible camera mechanics.

### Environment fidelity

- Location and major anchors remain consistent.
- Lighting follows storyboard.

### Human realism

- Posture plausible.
- Hands plausible.
- Clothing physics plausible.
- Expression appropriate.
- Capture feels smartphone-native.

### Prompt coherence

- No contradictory instructions.
- No unnecessary adjective stacking.
- No cinematic language that conflicts with UGC intent.

---

# 22. Failure Modes

### Prompt invention

The prompt adds creative decisions not present in the storyboard.

### Generic beauty drift

Creator becomes unrealistically attractive or model-like.

### Product hallucination

New design details appear.

### Product drift

Color, logo, pattern, fit, or construction changes.

### Camera contradiction

Prompt says mirror selfie while describing an external camera.

### Environment drift

Room or location changes without reason.

### Reflection failure

Mirror geometry or phone reflection becomes impossible.

### Over-polishing

Image looks like a commercial campaign rather than UGC.

### Negative prompt overload

The prompt becomes dominated by failure prevention rather than describing the desired image.

---

# 23. Quality Test

An image prompt passes when:

1. It can produce the storyboard's intended visual state.
2. The creator remains identifiable and consistent.
3. The product remains identifiable and consistent.
4. The behavior is visible and plausible.
5. Camera mechanics make sense.
6. Environment and lighting support continuity.
7. The image feels like plausible human-made UGC.
8. The prompt contains enough specificity without becoming contradictory.
9. The prompt does not invent unsupported product claims or details.
10. The next scene can reuse the resulting visual state as a continuity reference.

Final test:

> **If this image appeared in a creator's camera roll, would it plausibly look like a real moment captured for UGC rather than a fashion campaign generated by a machine?**

That is the target.

---

# 24. Downstream Handoff

The Image Reference Prompt Engine outputs:

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

The Frame-to-Frame Video Prompt Engine then uses this reference state to define motion and state transition.

---

# 25. Engine Boundary

The Image Reference Prompt Engine:

### Does

- translate storyboard into image prompt language
- preserve creator identity
- preserve product identity
- encode environment and camera
- encode human realism
- encode continuity
- generate scene-specific negative constraints
- prepare video reference input

### Does not

- change the creative concept
- rewrite behavior
- redesign the product
- invent product claims
- decide scene structure
- decide campaign strategy
- create motion instructions beyond static-state context
- turn UGC into cinematic advertising without explicit instruction

---

# 26. End-to-End Logic

~~~text
Storyboard Scene
      ↓
Read scene purpose
      ↓
Lock creator identity
      ↓
Lock product identity
      ↓
Translate behavior
      ↓
Describe environment
      ↓
Translate camera + framing
      ↓
Translate composition
      ↓
Add lighting
      ↓
Add human realism
      ↓
Add product consistency
      ↓
Attach continuity anchors
      ↓
Add scene-specific negative constraints
      ↓
Validate prompt coherence
      ↓
Image Reference Prompt
      ↓
Video Prompt Input
~~~

The engine's job is not to make the prompt sound impressive.

Its job is to make the intended visual state difficult to misunderstand.


## Multi-Reference Scene Inputs

A scene may contain several reference images. The engine must classify each reference before compiling the final prompt.

Use the reference role hierarchy:

1. creator identity
2. product identity
3. environment/spatial context
4. pose/interaction
5. composition
6. lighting/style

The prompt should explain the role of critical references rather than merely listing them. Example:

> Use the creator reference for identity and body proportions, the product reference for exact garment design, the bedroom reference for spatial layout and mirror geometry, and the pose reference for body position and phone placement.

When references conflict, protect explicit user choices and critical creator/product identity first. Do not invent a compromise between contradictory product attributes. Route unresolved critical conflicts to QC.

Reference images are constraints. The final image prompt remains responsible for producing one coherent visual state.
