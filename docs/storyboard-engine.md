# Storyboard Engine

## Purpose

The Storyboard Engine converts a validated Script / Behavior sequence into a **visual execution plan** that can be translated consistently into image reference prompts and frame-to-frame video prompts.

It answers:

> “What should the viewer see in each scene, and how does one visual state become the next?”

The storyboard is the bridge between **behavioral logic** and **prompt generation**.

It must preserve:

- creative concept
- script/behavior
- product identity
- creator identity
- realistic human behavior
- temporal continuity
- platform-native UGC feel

It should make visual decisions explicit before any final prompt is written.

---

## Core Principle

**Storyboard is the visual contract. Prompt is the rendering instruction.**

The pipeline is:

~~~text
Creative Concept
→ Script / Behavior
→ Storyboard
→ Image Reference Prompt
→ Frame-to-Frame Video Prompt
~~~

The Prompt Engines should not independently invent story, behavior, product states, or scene progression.

---

# 1. Inputs

Required:

- Product Intelligence
- Creator profile
- Content Format
- Content Angle
- Duration
- Scene Count
- Creative Concept
- Script / Behavior Engine output
- Platform

Relevant inputs:

- product attributes
- product identity constraints
- creator appearance
- body type
- style
- environment assumptions
- behavioral beats
- product states
- CTA
- must-show
- must-avoid

---

# 2. Output Contract

Canonical structure:

~~~yaml
storyboard:
  total_duration: 10
  format: "silent_mirror_selfie"
  platform: ["tiktok", "instagram_reels"]
  scenes:
    - scene_id: 1
      start: 0
      end: 2
      purpose: ""
      behavior: ""
      dialogue: null

      visual_state:
        creator: ""
        product: ""
        environment: ""
        background: ""
        lighting: ""

      camera:
        relationship: ""
        framing: ""
        angle: ""
        movement: ""
        stability: ""

      composition:
        subject_position: ""
        product_emphasis: ""
        negative_space: ""

      transition:
        type: ""
        from_state: ""
        to_state: ""

      image_reference:
        required: true
        continuity_anchor: ""

      video:
        frame_a: ""
        frame_b: ""
        motion: ""

  ending:
    cta: ""
    visual_payoff: ""
    final_state: ""
~~~

---

# 3. Storyboard Responsibilities

The Storyboard Engine decides:

### Scene structure

- where a scene starts
- where it ends
- which behavioral beat it represents
- whether a beat stays in one shot or needs a visual transition

### Visual state

- creator appearance at that moment
- product state
- environment
- background
- lighting continuity

### Camera relationship

- front-facing smartphone
- mirror selfie
- POV
- handheld side angle
- static phone placement
- close product view
- medium/full-body relationship

### Composition

- subject placement
- product emphasis
- readable silhouette
- useful negative space
- platform-native vertical composition

### Transition

- natural continuation
- subtle reframing
- cut
- physical action transition
- before/after state
- product reveal

It does **not** write the final image or video prompt.

---

# 4. Scene vs Beat

A behavioral beat and a storyboard scene are related but not identical.

### Beat

Defines:

> What the creator does.

### Scene

Defines:

> What the viewer sees while that behavior happens.

One beat may become:

- one scene
- multiple scenes
- one scene with internal motion

depending on visual clarity.

Example:

~~~text
Behavior beat:
“Creator smooths the hem and checks the mirror.”

Possible storyboard:
Scene 3:
  medium mirror selfie
  hem adjustment visible
  reflection stable

No additional scene is needed if the entire action reads clearly.
~~~

Do not split every micro-movement into a new scene.

---

# 5. Scene Count Logic

User-selected scene count is a planning constraint, not permission to manufacture unnecessary cuts.

Priority:

1. Preserve behavior clarity.
2. Preserve product readability.
3. Preserve temporal continuity.
4. Respect requested scene count.
5. Avoid gratuitous scene changes.

### Default scene distribution

| Duration | Typical scenes |
|---|---|
| 4s | 1–2 |
| 6s | 2–3 |
| 8s | 3–4 |
| 10s | 4–5 |

If user explicitly specifies scene count, use it when feasible.

If the requested scene count conflicts with realistic pacing, the engine should flag the conflict rather than creating impossible action density.

---

# 6. Scene Purpose

Every scene needs one primary purpose.

Examples:

- establish creator/product
- establish context
- inspect fit
- reveal product detail
- demonstrate use
- create contrast
- show transformation
- deliver payoff
- support CTA

Avoid scenes whose only purpose is:

- “make it cinematic”
- “add visual interest”
- “look aesthetic”
- “make it premium”

Visual interest is a consequence of good execution, not a valid reason to make humans wander around for no reason.

---

# 7. Visual State Model

Each scene must define four continuity layers.

## Creator

Track:

- identity
- appearance
- body type
- hair
- clothing
- pose/state
- emotional state

## Product

Track:

- exact garment/item
- color
- pattern
- logo
- material appearance
- fit
- collar
- sleeves
- hem
- seams
- accessories/details
- worn/held/adjusted state

## Environment

Track:

- room/location
- furniture
- mirror
- walls
- floor
- props
- time-of-day cues

## Lighting

Track:

- source direction
- softness
- approximate intensity
- color character
- shadow logic

These states become continuity anchors for downstream prompt generation.

---

# 8. Camera Relationship

Camera decisions should feel appropriate to the selected UGC format.

### Talking Head

Default:

- front-facing smartphone
- handheld or casually supported
- eye-level or slightly above/below natural phone height
- mild handheld variation

Avoid:

- studio camera movement
- commercial dolly shots
- perfect tracking
- dramatic lens behavior

### Silent Mirror Selfie

Default:

- phone held by creator
- phone visible in reflection
- mirror is part of the composition
- handheld micro-movement
- realistic reflection geometry

Avoid:

- impossible phone placement
- floating phone
- camera outside the mirror logic
- unexplained perspective changes

### Product Showcase

Default:

- camera positioned to clarify product attribute
- movement only when it helps reveal the product
- stable enough to preserve product identity

### POV

Default:

- first-person relationship
- human-scale movement
- plausible hand/body interaction

### Lifestyle

Default:

- camera observes or follows naturally
- creator does not behave as if performing for a studio crew

---

# 9. Framing

Framing should be determined by information need.

Examples:

### Full body

Use when:

- outfit silhouette matters
- complete styling is the point
- before/after requires body-level comparison

### Medium

Use when:

- upper-body fit matters
- talking head
- shirt/jacket details
- natural creator behavior

### Close

Use when:

- fabric texture
- logo
- collar
- seam
- construction
- specific product feature

Close framing should not appear merely because close-ups are fashionable.

---

# 10. Composition Rules

Composition should support the behavior.

Examples:

### Mirror selfie

- creator remains readable through reflection
- phone position stays plausible
- product is not blocked unnecessarily
- mirror edges/background remain coherent

### Talking head

- face remains readable
- product remains sufficiently visible
- framing leaves enough room for natural gesture

### Product detail

- attribute occupies enough of frame to be understood
- hands interact naturally
- product geometry remains stable

### Before / After

- framing should be sufficiently comparable
- creator scale should remain similar
- environment should remain identifiable

---

# 11. Product Visibility Budget

The storyboard must define when the product is:

- hidden
- partially visible
- visible
- dominant
- detail-focused
- final-state visible

Example:

~~~yaml
product_visibility:
  scene_1: "visible"
  scene_2: "visible"
  scene_3: "detail_focus"
  scene_4: "full_fit"
  scene_5: "final_visible"
~~~

The product should not disappear without a narrative or physical reason.

For affiliate-oriented content, the storyboard should ensure the viewer has enough visual information to identify the product before the CTA.

---

# 12. Human Realism Layer

The storyboard must support natural human behavior.

Every scene should answer:

- Where is the creator's weight?
- What are the hands doing?
- Why is the creator moving?
- Where is attention directed?
- What is the phone doing?
- What is the product doing?
- Does the transition require impossible movement?

### Preferred

- small weight shifts
- minor hand repositioning
- natural pauses
- imperfect framing
- slight handheld drift
- realistic posture
- ordinary environments
- asymmetry
- subtle facial reactions

### Avoid

- runway posing
- symmetrical mannequin posture
- constant smiling
- synchronized body movement
- impossible rotations
- instant wardrobe changes
- perfectly smooth camera paths

---

# 13. Transition Logic

Transitions should be classified.

### Natural continuation

Same state, continuous action.

Use when:

- adjusting garment
- shifting stance
- checking mirror
- speaking

### Reframing

Camera relationship changes slightly while maintaining continuity.

Use when:

- creator steps back
- phone moves slightly
- product becomes more visible

### Cut

A clean scene boundary.

Use when:

- location/state intentionally changes
- a new visual beat is needed
- before/after requires separation

### Action transition

The physical action creates the transition.

Examples:

- hand covers lens
- creator moves past camera
- garment passes close to lens
- packaging opens into reveal

Use sparingly. It should serve the concept.

### Transformation transition

Use for:

- try-on
- before/after
- outfit change

The storyboard must define both source and target states.

---

# 14. Frame A → Frame B Planning

Every video scene should define what changes between its start and end.

Canonical structure:

~~~yaml
video:
  frame_a:
    visual_state: ""
    creator_state: ""
    product_state: ""
    camera_state: ""

  frame_b:
    visual_state: ""
    creator_state: ""
    product_state: ""
    camera_state: ""

  motion:
    primary_action: ""
    secondary_motion: ""
    camera_motion: ""
    duration: 2
~~~

The difference between Frame A and Frame B must be intentional and minimal enough for the model to interpolate plausibly.

### Rule

**Define the state change before defining the motion.**

Bad:

> “Make the camera cinematic while the creator moves naturally.”

Better:

> Frame A: creator facing mirror, hands relaxed, shirt worn naturally.
>
> Frame B: creator has smoothed the hem once and shifted weight back, revealing the final fit.
>
> Motion: one hand moves to hem, smooths once, returns; slight body shift; minor handheld drift.

---

# 15. Image Reference Requirements

Each scene should specify whether an image reference is required.

Usually required when:

- creator identity must be established
- product appearance must be locked
- environment continuity matters
- scene contains a major state change
- final frame needs exact visual control

A continuity anchor should describe the facts that must survive into the next scene.

Example:

~~~yaml
image_reference:
  required: true
  continuity_anchor:
    - "same creator appearance"
    - "same shirt color and pattern"
    - "same mirror and room"
    - "same phone"
    - "same lighting direction"
~~~

---

# 16. Platform-Native Composition

Default output should be designed for vertical short-form video.

Common principles:

- subject readable in 9:16
- product visible without excessive empty space
- important visual information kept away from likely interface obstruction zones
- framing should feel like smartphone capture
- avoid overly wide cinematic compositions unless the concept requires it

Platform adaptation may alter:

- framing
- text-safe area
- CTA placement
- visual density

It should not silently change the core behavior or product identity.

---

# 17. Format-Specific Storyboard Patterns

## Silent Mirror Selfie

Typical:

~~~text
Scene 1: settle into mirror
Scene 2: inspect fit
Scene 3: adjust garment
Scene 4: reveal final fit
Scene 5: natural ending / CTA
~~~

Camera should remain logically inside the mirror relationship.

## Talking Head

Typical:

~~~text
Scene 1: hook
Scene 2: explanation
Scene 3: product observation
Scene 4: payoff
Scene 5: CTA
~~~

Not every spoken beat needs a camera angle change.

## Try-On

Typical:

~~~text
Scene 1: before
Scene 2: transition
Scene 3: newly worn state
Scene 4: fit inspection
Scene 5: final reveal
~~~

## GRWM

Typical:

~~~text
Scene 1: preparation
Scene 2: clothing action
Scene 3: styling action
Scene 4: final adjustment
Scene 5: ready state
~~~

## Product Showcase

Typical:

~~~text
Scene 1: product establish
Scene 2: attribute interaction
Scene 3: detail
Scene 4: final product state
~~~

---

# 18. Storyboard Validation

Before handoff, validate:

### Narrative

- Every scene has a clear purpose.
- Scene order follows the script.
- Product role remains understandable.
- Ending provides payoff.

### Continuity

- Same creator unless intentionally changed.
- Same product identity.
- Same environment unless intentionally changed.
- Lighting remains plausible.
- Product state transitions are possible.

### Camera

- Camera relationship matches format.
- Movement is physically plausible.
- Framing supports the information need.
- No unnecessary cinematic motion.

### Behavior

- Behavior matches Script / Behavior Engine.
- Creator has a reason for each action.
- Actions fit available time.
- Scene boundaries do not break a meaningful action unnecessarily.

### Promptability

Each scene must contain enough information to generate:

1. an image reference prompt
2. a Frame A description
3. a Frame B description
4. a motion description

If a scene cannot produce those without inventing major information, the storyboard is incomplete.

---

# 19. Failure Modes

### Prompt-first storyboard

Scenes are designed around cool-looking prompts instead of behavior.

### Shot spam

Too many scenes for the duration.

### Cinematic drift

UGC gradually becomes a commercial fashion campaign.

### Continuity drift

Creator, product, mirror, room, or lighting changes without reason.

### State ambiguity

Frame A and B are too similar or too different to interpolate reliably.

### Camera impossibility

Camera movement cannot physically occur from the defined starting position.

### Product obstruction

The product is repeatedly blocked during moments when it needs to be understood.

### Behavioral disconnect

The visual shot looks attractive but does not represent the scripted action.

### Unnecessary transitions

Cuts or effects exist only to make the video feel more elaborate.

---

# 20. Storyboard Quality Test

A storyboard passes when:

1. Every scene has one clear visual purpose.
2. Every scene maps to a script beat.
3. Creator state is continuous.
4. Product state is continuous.
5. Camera behavior is physically plausible.
6. The product remains readable at the moments that matter.
7. Frame A and Frame B have a clear, limited state change.
8. The visual language remains believable as human-made UGC.
9. The scene can be converted into prompts without creative invention downstream.
10. The storyboard remains simple enough for the requested duration.

Final test:

> **If the prompts disappeared, would this storyboard still describe a coherent video that a human creator could realistically shoot?**

If not, the storyboard is not ready.

---

# 21. Downstream Handoff

The Storyboard Engine hands each scene to the Image Reference Prompt Engine and Frame-to-Frame Video Prompt Engine.

Canonical handoff:

~~~yaml
prompt_input:
  scene_id: 1
  format: ""
  purpose: ""
  creator:
    identity: ""
    appearance: ""
    state: ""
  product:
    identity: ""
    state: ""
    visibility: ""
  environment:
    location: ""
    background: ""
    lighting: ""
  camera:
    relationship: ""
    framing: ""
    angle: ""
    movement: ""
    stability: ""
  composition:
    subject_position: ""
    product_emphasis: ""
  frame_a: ""
  frame_b: ""
  motion:
    primary_action: ""
    secondary_motion: ""
  continuity_anchors: []
  must_avoid: []
~~~

The downstream engines should transform this structure into prompt language without changing the underlying creative decision.

---

# 22. Engine Boundary

The Storyboard Engine:

### Does

- convert behavior into visual scenes
- determine scene boundaries
- define camera relationship
- define framing
- define composition
- define visual states
- define transitions
- define Frame A → Frame B state changes
- prepare prompt-engine inputs
- enforce visual continuity

### Does not

- invent product claims
- rewrite campaign strategy
- replace Creative Concept
- rewrite the behavioral script
- generate final image prompts
- generate final video prompts
- add cinematic effects merely for impressiveness
- solve continuity problems by silently changing the creator or product

---

# 23. End-to-End Logic

~~~text
Script / Behavior
      ↓
Map beats to visual scenes
      ↓
Assign scene purpose
      ↓
Define creator + product state
      ↓
Define environment + lighting
      ↓
Define camera relationship
      ↓
Define composition
      ↓
Define transition
      ↓
Define Frame A → Frame B
      ↓
Attach continuity anchors
      ↓
Validate realism + promptability
      ↓
Image Prompt Input + Video Prompt Input
~~~

The storyboard should be detailed enough to remove ambiguity, but restrained enough that it still feels like UGC.

That balance is the job.
