# Video Prompt Engine Specification

The Video Prompt Engine converts consecutive Scene States into one frame-to-frame video transition.

It is the second final-output generation engine.

## 1. Purpose

The engine translates two resolved visual states into one physically plausible transition.

`Scene N State + Behavior + Image Anchor → Physical Transition → Scene N+1 State`

The engine must describe how one believable visual state changes into the next.

It must not reinvent either frame or introduce new creative direction.

## 2. Core Principle

A Video Prompt is:

> A physically plausible transition from one defined visual state to another.

Use:

`Starting State → Trigger → Creator Movement → Product / Material Response → Camera / Environment Response → Ending State`

Do not use:

`Start image → vague cinematic movement → unrelated new scene`

The transition must explain how the ending state is physically reached.

Causality has priority over visual spectacle.

## 3. Inputs

The engine consumes five input groups.

### 3.1 Starting Scene

- Scene ID
- Creator State
- Product State
- Environment State
- Camera State
- Image Prompt

### 3.2 Ending Scene

- Scene ID
- Creator State
- Product State
- Environment State
- Camera State
- Image Prompt

### 3.3 Content Behavior

- Primary Action
- Supporting Action
- Micro-Behavior
- Product Interaction
- Reaction
- Transition Behavior

### 3.4 Identity Sources

- Character Identity Lock
- Character Reference
- Product Identity Lock
- Product Reference
- Environment Continuity
- Camera Continuity

### 3.5 Realism Constraints

- Human anatomy
- Natural movement
- Material physics
- Product interaction physics
- Smartphone camera behavior
- Natural environment movement

## 4. Transition Model

Every transition follows:

`STATE A → STATE DELTA → CAUSE → BEHAVIOR → STATE B`

Where:

- **State A** is the exact starting state from Scene N.
- **State Delta** is the meaningful difference between Scene N and Scene N+1.
- **Cause** explains why the state changes.
- **Behavior** describes the physical movement that produces the change.
- **State B** is the exact target state from Scene N+1.

### 4.1 State Delta Classification

Compare Scene N and Scene N+1 and classify every changed attribute.

#### Required Change

A meaningful state change that must have a physical cause.

#### Allowed Natural Drift

Small incidental changes such as:

- blink
- hair movement
- fabric settling
- tiny camera drift

#### Forbidden Change

Anything that changes without cause:

- face identity
- body proportions
- product identity
- garment color
- room geometry
- object scale
- camera universe

If a changed attribute cannot be classified, repair the transition before generation.

## 5. Video Prompt Contract

Every Frame-to-Frame Video Prompt must resolve:

1. What is the exact starting state?
2. What changes?
3. What causes the change?
4. How does the creator move?
5. How does the product respond?
6. How does clothing or material respond?
7. How does the camera respond?
8. How does the environment respond?
9. What is the exact ending state?
10. Which attributes must remain unchanged?

If no physical cause exists for a required state change, the transition is invalid.

## 6. Transition Assembly

Assemble every transition in this exact order:

1. Starting State
2. Trigger
3. Creator Movement
4. Product Movement
5. Material Response
6. Camera Movement
7. Environment Response
8. Speech
9. Ending State
10. Continuity Lock
11. Forbidden Motion

This order is the canonical semantic hierarchy for the final Video Prompt.

### 6.1 Starting State

The starting frame is the Image Prompt for Scene N.

Preserve:

- creator identity
- pose
- wardrobe
- product identity
- product state
- environment
- camera relationship
- relevant framing

Do not describe a different opening image.

When the generation system supports image-to-video input, the starting image is the primary visual anchor.

### 6.2 Trigger

Every meaningful state change requires a cause.

Examples:

#### Fashion

`hand pulls sleeve upward → sleeve moves and settles`

#### Beauty

`applicator touches cheek → product transfers to skin`

#### Home

`hand pushes organizer inward → organizer slides into shelf position`

#### Camera

`creator shifts phone slightly → framing changes naturally`

Bad:

> The outfit suddenly changes.

Good:

> The creator pulls the jacket into place, causing the front panels to shift and settle into the new position.

A transition should be causal, not magical.

### 6.3 Creator Movement

Human motion must be:

- anatomically plausible
- continuous
- appropriately paced
- task-driven
- proportional to the scene duration

Prioritize:

- weight transfer
- shoulder movement
- elbow movement
- wrist rotation
- finger contact
- head movement
- eye direction
- natural posture adjustment

Avoid:

- teleporting limbs
- sudden pose jumps
- rubber-like joints
- accelerated gestures
- unnecessary full-body motion

#### One Primary Movement

Each transition should have one dominant human movement.

Supporting movements are subordinate.

Example:

> She raises her right hand to adjust the collar while her shoulders make a small natural counter-shift.

Not:

> She adjusts the collar, turns, smiles, waves, fixes her hair, and steps backward.

### 6.4 Facial Movement

Facial changes must follow the stimulus.

Use:

- eye movement
- gaze shift
- small eyebrow movement
- subtle smile
- brief neutral-to-pleased change
- natural blink when appropriate

Do not force expressions.

A reaction must have a visible cause.

Example:

`sees the finished application → eyes inspect the result → subtle satisfied expression`

Avoid:

`instant huge smile because the prompt demanded happy`

### 6.5 Product Movement

Product movement must follow physical interaction.

Describe:

- contact
- grip
- release
- placement
- rotation
- opening
- closing
- application
- displacement

The product must preserve:

- identity
- shape
- color
- pattern
- packaging
- visible branding
- functional parts

Do not allow:

- product morphing
- unexplained size changes
- duplicate products
- disappearing products
- impossible grip
- floating objects

### 6.6 Material Response

Materials respond to movement.

#### Fashion

Preserve:

- fabric folds
- stretch
- drape
- seam behavior
- sleeve movement
- hem movement
- garment settling

A garment should respond to the body rather than independently animating.

#### Beauty

Preserve:

- product transfer
- wetness or texture when supported
- blending behavior
- skin response
- realistic applicator contact

Do not invent unsupported physical properties.

#### Home

Preserve:

- friction
- contact
- object weight
- surface interaction
- shadows
- displacement
- deformation only when physically plausible

### 6.7 Camera Movement

Camera movement should match ordinary UGC capture.

Possible behaviors:

- slight handheld drift
- small phone reposition
- natural wrist movement
- subtle reframing
- minor exposure adjustment

Use camera movement only when motivated by creator behavior.

#### Mirror Selfie

The camera is attached to the creator's phone.

Therefore:

- phone movement affects framing
- creator movement affects reflection
- mirror geometry remains stable
- phone and reflection remain physically related

Do not use:

- drone movement
- orbit shots
- impossible camera rotations
- cinematic tracking
- unexplained camera teleportation

### 6.8 Environment Response

Environment movement should be minimal.

Possible natural movement:

- curtain shift
- hair responding to movement
- fabric movement
- subtle background activity
- shadow movement caused by the creator

Do not animate static objects without cause.

The environment exists primarily to preserve spatial continuity.

### 6.9 Speech

Speech is a format constraint, not a replacement for visual behavior.

#### Silent Formats

For silent formats:

- no dialogue
- no voice-over
- no lip-sync
- no speech-driven facial movement

Behavior must carry the narrative.

Example:

`notice → inspect → adjust → reveal`

The video prompt should express these through physical movement only.

#### Spoken Formats

For spoken formats:

- maintain Voice Identity continuity
- allow natural mouth movement
- preserve gaze and conversational behavior
- keep gestures subordinate to speech
- do not insert the dialogue into the visual movement description unless necessary for synchronization

The spoken script remains a separate output.

### 6.10 Ending State

The ending frame must resolve exactly toward Scene N+1.

Preserve the target:

- creator identity
- pose
- product state
- product position
- wardrobe
- environment
- camera state
- evidence visibility

The transition should terminate in a state compatible with the next Image Prompt.

#### End-State Rule

The final moments of the video prompt should not introduce another action after the target state is reached.

The ending state is the destination.

### 6.11 Continuity Lock

Every transition inherits continuity locks.

#### Character

- same face
- same hair identity
- same skin identity when defined
- same body identity
- same wardrobe unless intentionally changed

#### Voice

When speech is used:

- same Voice Identity
- same vocal characteristics
- same speech style
- same accent/pitch when defined

Voice is separate from visual movement.

#### Product

- same product
- same variant
- same visible packaging
- same color/pattern
- same material appearance
- state changes only when caused

#### Environment

- same room
- same major furniture
- same spatial geometry
- same relevant object placement

#### Camera

- same phone relationship
- compatible orientation
- compatible framing
- no unexplained camera relocation

### 6.12 Forbidden Motion

Protect against known transition failures.

Typical forbidden motion:

- teleporting between poses
- identity changes
- product morphing
- unsupported material behavior
- unrelated background animation
- cinematic camera movement
- excessive simultaneous actions
- impossible physics
- unexplained state changes
- ending-state drift
- duplicated spoken script
- speech in silent formats

## 7. Temporal Rules

Motion density must respect duration.

### 4 Seconds

Use:

- one clear physical transition
- minimal supporting movement

### 6 Seconds

Use:

- one primary movement
- one supporting reaction or camera adjustment

### 8 Seconds

Use:

- one primary interaction
- one secondary state adjustment
- restrained reaction

### 10 Seconds

Use:

- one coherent behavioral sequence
- multiple causal micro-transitions only when necessary

Never compress five major actions into a short clip.

## 8. Context Rules

### 8.1 CTA Transition

CTA behavior should remain natural.

Possible transitions:

- product remains visible
- creator brings product slightly toward camera
- creator settles into a final readable pose
- gaze shifts toward product or camera

Avoid:

- abrupt commercial end cards
- exaggerated pointing
- unnatural product zoom
- sudden frozen poses

### 8.2 Niche-Specific Motion

#### Fashion

Prioritize:

- body weight transfer
- garment movement
- sleeve and hem behavior
- natural mirror movement
- fabric settling
- believable fit changes

#### Beauty

Prioritize:

- hand-to-face contact
- applicator movement
- controlled product transfer
- gaze toward mirror
- subtle facial reaction
- realistic skin interaction

#### Home

Prioritize:

- hand-object contact
- object displacement
- friction
- placement
- spatial consistency
- shadows and contact points

### 8.3 UGC Motion Language

Default motion should feel:

- handheld
- human-paced
- slightly imperfect
- physically grounded
- casually captured
- non-performative

Do not default to:

- cinematic slow motion
- speed ramps
- dramatic push-ins
- orbiting cameras
- perfect choreography
- commercial reveal timing

The goal is not cinematic realism.

The goal is:

> ordinary human movement captured by a phone.

## 9. Failure Prevention

### 9.1 Video Prompt Anti-Patterns

Do not:

- teleport between poses
- change identity
- morph products
- invent material properties
- animate unrelated background objects
- introduce cinematic camera movement
- stack too many actions
- describe impossible physics
- create state changes without causes
- let the ending state drift away from Scene N+1
- duplicate the spoken script
- add speech to silent formats

### 9.2 Video Prompt Validation

| Area | Check | Severity |
|---|---|---|
| Count | N scenes produce N−1 transitions | Blocker |
| Start | Matches Scene N | Blocker |
| End | Matches Scene N+1 | Blocker |
| Cause | Every meaningful state change has a cause | Blocker |
| Human Motion | Anatomically plausible | Blocker |
| Product Motion | Physically plausible | Blocker |
| Material | Clothing/product material responds correctly | Blocker |
| Camera | Movement is physically plausible | Blocker |
| Environment | No unexplained movement | Warning |
| Continuity | Character remains stable | Blocker |
| Continuity | Product remains stable | Blocker |
| Continuity | Environment remains stable | Blocker |
| Speech | Matches silent/spoken mode | Blocker |
| Timing | Motion density fits duration | Warning |
| UGC | Motion feels phone-captured and human | Warning |
| Unsupported | No unsupported physical claims | Blocker |

### 9.3 Transition Repair Rules

Repair the smallest failed component.

#### Start Mismatch

Restore the Scene N Image Prompt as the opening anchor.

#### End Mismatch

Modify the final movement so it settles into Scene N+1.

#### Pose Jump

Add the missing intermediate physical movement.

#### Product Teleport

Add explicit hand contact, movement, and placement.

#### Clothing Morph

Describe realistic fabric movement and settling.

#### Camera Teleport

Replace with creator-driven phone repositioning.

#### Excessive Motion

Remove secondary actions and retain the primary transition.

#### Cinematic Drift

Reduce camera movement to subtle handheld behavior.

#### Silent Violation

Remove speech, lip-sync, or voice-over behavior.

#### Identity Drift

Restore Character Identity Lock and Reference.

### 9.4 Transition Quality Test

A valid transition should answer:

> If the viewer paused the clip at any moment, would the current body, product, camera, and environment state still make physical sense?

If no, the transition fails.

## 10. Output Contract

### 10.1 Output Count

For N scenes:

`Image Prompts = N`

`Video Prompts = N - 1`

Examples:

- 1 scene → 0 video prompts
- 2 scenes → 1 video prompt
- 3 scenes → 2 video prompts
- 4 scenes → 3 video prompts
- 5 scenes → 4 video prompts

Never create a video prompt for a nonexistent transition.

### 10.2 Required Output Shape

For every consecutive scene pair, produce exactly:

```text
Transition ID: {scene_a}_TO_{scene_b}
From Scene: {scene_a}
To Scene: {scene_b}

Frame-to-Frame Video Prompt:
{canonical video prompt}
```

Do not include hidden reasoning, implementation notes, or alternate prompt versions in the generation-ready output.

## 11. Canonical Prompt Format

The final Video Prompt must use a stable, ordered transition structure so every clip explains the physical path between two Scene States.

### 11.1 Canonical Structure

```text
[VIDEO PROMPT]

TRANSITION:
{scene_a} → {scene_b}

DURATION:
{duration}

STARTING STATE:
- Creator: {creator_start}
- Pose: {pose_start}
- Expression: {expression_start}
- Gaze: {gaze_start}
- Product: {product_start}
- Environment: {environment_start}
- Camera: {camera_start}

TRIGGER:
{what_causes_the_change}

CREATOR MOVEMENT:
- Body: {body_movement}
- Hands: {hand_movement}
- Head: {head_movement}
- Face: {facial_movement}
- Gaze: {gaze_movement}

PRODUCT MOVEMENT:
{product_movement}

MATERIAL RESPONSE:
{material_response}

CAMERA MOVEMENT:
{camera_movement}

ENVIRONMENT RESPONSE:
{environment_response}

SPEECH:
{speech_or_silent_behavior}

ENDING STATE:
- Creator: {creator_end}
- Pose: {pose_end}
- Expression: {expression_end}
- Gaze: {gaze_end}
- Product: {product_end}
- Environment: {environment_end}
- Camera: {camera_end}

CONTINUITY LOCK:
{unchanged_attributes}

FORBIDDEN MOTION:
{forbidden_motion}
```

### 11.2 Assembly Rule

The canonical fields are an output format, not a second source of truth.

Populate them only from:

- Starting Scene State
- Ending Scene State
- Content Behavior
- State Delta
- Transition Cause
- Identity Sources
- Realism Constraints

The generation prompt may be rendered as a natural-language paragraph after assembly, but the semantic field order must remain stable:

`Starting State → Trigger → Creator Movement → Product Movement → Material Response → Camera Movement → Environment Response → Speech → Ending State → Continuity Lock → Forbidden Motion`

Do not add fields ad hoc per transition.

### 11.3 Field Rules

- `TRANSITION` identifies the exact consecutive scene pair.
- `DURATION` constrains motion density.
- `STARTING STATE` must match Scene N.
- `TRIGGER` explains the cause of the required state change.
- `CREATOR MOVEMENT` describes the dominant human motion.
- `PRODUCT MOVEMENT` explains product displacement or interaction.
- `MATERIAL RESPONSE` covers clothing, skin, liquid, or object physics only when supported.
- `CAMERA MOVEMENT` describes motivated smartphone movement.
- `ENVIRONMENT RESPONSE` stays minimal unless the environment is physically affected.
- `SPEECH` distinguishes spoken from silent behavior without duplicating the script.
- `ENDING STATE` must match Scene N+1.
- `CONTINUITY LOCK` lists attributes that remain unchanged.
- `FORBIDDEN MOTION` protects known transition failure modes.

## 12. Relationship to Image Prompt Engine

The two engines are complementary.

`Image Prompt N = Visual State N`

`Video Prompt N→N+1 = Physical Transition from State N to State N+1`

`Image Prompt N+1 = Visual State N+1`

Therefore:

> Image Prompts define where the video starts and ends. Video Prompts define how it gets there.

This relationship is mandatory for frame-to-frame continuity.

## 13. Runtime Integration

```text
User Input
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
→ Output
```

The Video Prompt Engine must never bypass Scene Planning or Content Behavior.

Those upstream layers define the destination and intent.

The Video Prompt Engine only translates them into physically plausible motion.

## 14. Video Prompt Invariants

Throughout execution:

- one scene pair → one Video Prompt
- starting state is anchored
- ending state is anchored
- every meaningful change has a cause
- human movement remains anatomically plausible
- product movement remains physically plausible
- material behavior remains believable
- camera movement remains motivated
- environment remains stable unless physically affected
- Character Identity Lock remains stable
- Product Identity Lock remains stable
- silent formats remain silent
- spoken formats preserve Voice Identity
- no unsupported details are introduced
- no cinematic behavior is introduced unless explicitly requested
