# Frame-to-Frame Video Prompt Engine

## Purpose

The Frame-to-Frame Video Prompt Engine converts a validated Storyboard scene and Image Reference state into a motion instruction describing how Frame A becomes Frame B.

It answers:

> “What physically happens between these two visual states?”

The engine is responsible for motion continuity, human movement, camera movement, clothing physics, product consistency, environment stability, and realistic temporal interpolation.

It does not invent new story beats.

---

# 1. Core Principle

**Define the state change first. Define the motion second.**

The engine should never begin with “Make this cinematic.”

It should begin with:

~~~text
Frame A
→ intended state change
→ physical action
→ secondary motion
→ camera response
→ Frame B
~~~

The desired result is not maximum motion.

The desired result is **the smallest believable movement required to connect the two states**.

---

# 2. Inputs

Required:

- Storyboard scene
- Image Reference Prompt
- Frame A state
- Frame B state
- Script / Behavior beat
- Product Intelligence
- Creator identity
- Human Realism constraints
- Product Consistency constraints
- Duration

Relevant storyboard fields:

- purpose
- creator state
- product state
- environment
- camera relationship
- framing
- composition
- transition
- continuity anchors
- must-avoid

---

# 3. Output Contract

Canonical structure:

~~~yaml
video_prompt:
  scene_id: 1
  duration: 2
  frame_a:
    creator_state: ""
    product_state: ""
    environment_state: ""
    camera_state: ""

  frame_b:
    creator_state: ""
    product_state: ""
    environment_state: ""
    camera_state: ""

  motion:
    primary_action: ""
    secondary_motion: ""
    body_motion: ""
    hand_motion: ""
    clothing_motion: ""
    camera_motion: ""
    environment_motion: ""

  continuity:
    creator: []
    product: []
    environment: []
    camera: []

  realism_constraints:
    - ""

  negative_constraints:
    - ""

  final_prompt: ""
~~~

The primary output is the final_prompt string.

Supporting fields make the motion plan auditable and allow QC to detect continuity failures.

---

# 4. Frame A Definition

Frame A is the **starting physical state**, not merely a copy of the image prompt.

Define:

- creator posture
- gaze
- hand positions
- body orientation
- product state
- garment tension/folds
- environment state
- camera position
- camera framing

Example:

~~~yaml
frame_a:
  creator_state: "standing naturally, looking at mirror"
  product_state: "shirt worn normally, hem resting naturally"
  environment_state: "bedroom mirror unchanged"
  camera_state: "phone held in right hand, medium-full mirror framing"
~~~

Frame A should match the actual reference image as closely as possible.

---

# 5. Frame B Definition

Frame B is the intended **ending physical state**.

It should differ from Frame A only where the storyboard requires a change.

Example:

~~~yaml
frame_b:
  creator_state: "slightly shifted weight, looking at adjusted hem"
  product_state: "hem smoothed once and resting naturally"
  environment_state: "same bedroom and mirror"
  camera_state: "phone remains in right hand with slight natural drift"
~~~

If Frame B introduces major changes that are not explained by the storyboard, reject or revise the scene.

---

# 6. State Difference

Before writing motion, calculate the meaningful differences:

~~~text
Frame A
  creator: standing
  hand: relaxed
  product: natural hem
  camera: stable

Frame B
  creator: slight weight shift
  hand: touches hem
  product: smoother hem
  camera: slight drift
~~~

State difference:

~~~text
1 primary body action
1 hand action
1 product response
minor camera drift
~~~

This becomes the motion plan.

---

# 7. Primary Action

Each scene should have **one primary action**.

Examples:

- turn slightly
- step backward
- smooth hem
- adjust sleeve
- lift garment
- open package
- sit down
- stand up
- bring product closer
- look at reflection
- gesture while speaking

The primary action should explain the major Frame A → Frame B change.

Avoid stacking unrelated actions.

---

# 8. Secondary Motion

Secondary motion supports the primary action.

Examples:

- subtle weight shift
- natural arm follow-through
- slight head movement
- fabric settling
- hair movement caused by body movement
- natural phone drift

Secondary motion should remain subordinate.

Default limit:

**0–2 meaningful secondary motions per scene.**

---

# 9. Human Movement Model

Human movement should follow physical causality.

Preferred sequence:

~~~text
intention
→ body preparation
→ action
→ follow-through
→ settling
~~~

Example:

> Creator decides to inspect the hem, shifts weight slightly backward, reaches down with one hand, smooths the hem once, then lets the hand relax.

This is more believable than an instant pose change.

---

# 10. Hand Motion

Hands are high-risk areas for generative video.

Keep hand actions simple.

Preferred:

- one hand moves toward one object
- one hand adjusts one garment area
- hand opens one package flap
- hand lightly grips one product
- hand returns to a resting position

Avoid:

- both hands performing unrelated actions simultaneously
- rapid finger articulation
- complicated object manipulation
- hand passing through fabric
- impossible grip changes
- sudden hand duplication

When hand detail is not important, keep the motion subtle.

---

# 11. Clothing Physics

Clothing must react to body movement.

When a creator:

- raises an arm → sleeve tension changes
- steps backward → hem and fabric shift
- turns → fabric follows the torso
- smooths fabric → folds change locally
- sits → garment compresses naturally

Do not instruct the model to “animate the shirt.”

Describe the physical cause:

> The creator lightly smooths the hem, causing the fabric folds around the touched area to settle naturally.

This gives the model a causal event rather than an abstract animation command.

---

# 12. Product Consistency During Motion

Product identity must remain stable throughout the transition.

Lock:

- color
- pattern
- logo
- graphic placement
- collar
- sleeves
- hem
- seams
- material
- fit
- construction

The product may deform temporarily due to realistic fabric movement, but it must return to the same underlying design.

### Critical rule

**Physical deformation is allowed. Identity deformation is not.**

Good:

> fabric wrinkles slightly as the creator moves, then settles.

Bad:

> shirt pattern changes while the creator moves.

---

# 13. Camera Motion

Camera movement should be caused by the capture mechanism.

### Handheld smartphone

Allow:

- slight hand drift
- tiny framing correction
- subtle vertical/horizontal movement
- natural stabilization imperfections

### Mirror selfie

Allow:

- slight phone repositioning
- small wrist movement
- minor framing change
- natural body-phone relationship

### Static phone

Camera should remain mostly stable.

### POV

Camera follows the creator's head/body relationship.

Avoid:

- unexplained orbiting
- impossible camera acceleration
- floating camera
- sudden zoom without physical reason
- camera passing through objects

---

# 14. Camera vs Subject Motion

Do not make both camera and subject move heavily unless the storyboard requires it.

Default hierarchy:

1. primary human action
2. natural secondary body movement
3. clothing response
4. minimal camera response

This prevents the common failure where everything moves at once and the scene becomes synthetic mush.

---

# 15. Environment Motion

Most UGC environments are static.

Default:

- background remains stable
- furniture remains fixed
- mirror remains fixed
- walls remain fixed
- lighting remains stable

Allow only physically motivated changes:

- curtain moves from airflow
- hair moves because of body movement
- packaging shifts because it is touched
- fabric moves because of body movement

Do not animate background elements merely to create “energy.”

---

# 16. Timing

Motion should have a beginning, middle, and settling phase.

For a 2-second scene:

~~~text
0.0–0.3s  preparation
0.3–1.4s  primary action
1.4–2.0s  settling
~~~

For a 3-second scene:

~~~text
0.0–0.5s  preparation
0.5–2.2s  primary action
2.2–3.0s  settling
~~~

These are defaults, not rigid animation curves.

The engine should adapt timing to the action.

---

# 17. Duration Feasibility

The engine must not force impossible movement into short durations.

### 4 seconds total

Prefer:

- one primary action
- one clear payoff

### 6 seconds

Prefer:

- setup
- one primary action
- payoff

### 8 seconds

Allow:

- setup
- one or two meaningful actions
- payoff

### 10 seconds

Allow:

- hook/setup
- two or three meaningful beats
- payoff/CTA

A shorter duration means **less action**, not faster humans.

---

# 18. Transition Types

## Natural Continuation

Frame B is the next physical moment after Frame A.

Use for speaking, checking fit, adjusting clothing, and ordinary movement.

## Reframing

The creator or phone moves slightly while the same action continues.

## Cut

Frame A and B represent distinct states.

The prompt should not imply continuous physical motion if the edit is intentionally discontinuous.

## Action Transition

A physical action bridges the states.

Examples:

- hand crosses lens
- package opens
- garment passes close to camera
- creator steps past camera

## Transformation

Used for try-on, before/after, and outfit change.

Transformation requires explicit source and target states.

---

# 19. Dialogue Motion

For talking formats, speech should be represented as natural physical behavior.

Include:

- subtle mouth movement
- natural blinking
- small facial reactions
- occasional head movement
- restrained hand gestures

Do not require every word to create a visible gesture.

The visual action should remain subordinate to the dialogue unless the storyboard explicitly says otherwise.

---

# 20. Silent Behavior Motion

For silent formats, behavior is the narrative.

Examples:

### Silent Mirror Selfie

~~~text
look at reflection
→ inspect fit
→ adjust hem
→ step back slightly
→ settle
~~~

### Outfit Showcase

~~~text
stand naturally
→ shift angle
→ reveal side silhouette
→ settle
~~~

### Product Showcase

~~~text
hold product
→ rotate slightly
→ reveal detail
→ return to stable position
~~~

---

# 21. Voice-over + B-roll

The video motion should support the narration semantically.

Example:

Narration:

> “I like how the fabric sits without feeling stiff.”

Visual:

> creator lightly pinches and releases the fabric near the sleeve, allowing it to fall naturally.

Avoid unrelated movement merely because the voice-over continues.

---

# 22. Hybrid Format

Define:

- primary behavior
- secondary behavior
- transition point

Example:

~~~yaml
hybrid:
  primary: "talking_head"
  secondary: "product_showcase"
  transition:
    time: 4.0
    action: "creator brings shirt sleeve closer to camera"
~~~

Do not make both formats compete for attention at the same moment.

---

# 23. Prompt Construction

A final video prompt should follow:

~~~text
1. Starting state
2. Ending state
3. Primary action
4. Body mechanics
5. Hand mechanics
6. Clothing/product response
7. Camera response
8. Environmental stability
9. Timing
10. Realism constraints
11. Negative constraints
~~~

Example:

> Start with the creator standing naturally in front of the bedroom mirror, holding the smartphone in the right hand and looking at their reflection, wearing the same casual shirt shown in the reference. Over the next two seconds, the creator shifts weight slightly backward, uses the free hand to smooth the shirt hem once, then lets the hand relax as the fabric settles naturally. The phone remains in the same hand with only subtle handheld drift and a small framing correction. The shirt color, pattern, logo, collar, sleeves, seams, hem, material, and overall fit remain unchanged. The mirror, bedroom background, and lighting remain stable. Natural human timing with a brief preparation, one clear adjustment, and a short settling phase. Avoid sudden pose changes, teleportation, extra fingers, duplicated hands, floating phone, warped reflection, garment morphing, changing product design, excessive camera movement, or cinematic motion.

The example demonstrates structure, not fixed wording.

---

# 24. Motion Vocabulary

Prefer physically descriptive verbs:

- shift
- turn
- reach
- lift
- lower
- smooth
- adjust
- hold
- release
- step
- lean
- glance
- inspect
- settle
- rotate slightly
- bring closer
- move away
- open
- close

Avoid vague verbs:

- animate
- enhance
- make dynamic
- make cinematic
- make energetic
- bring to life

The model needs a physical action, not a motivational speech.

---

# 25. Realism Constraints

Useful constraints:

- natural acceleration and deceleration
- realistic joint movement
- believable hand placement
- plausible weight transfer
- realistic fabric response
- subtle facial motion
- natural blinking
- ordinary handheld movement
- stable environment
- consistent object scale

Do not force every realism constraint into every scene. Only include constraints relevant to the motion.

---

# 26. Negative Constraints

Target known video-generation failures:

- no body morphing
- no face morphing
- no identity change
- no extra limbs
- no duplicated hands
- no finger deformation
- no floating phone
- no object teleportation
- no clothing color change
- no pattern change
- no logo movement
- no garment redesign
- no background morphing
- no mirror distortion
- no sudden camera orbit
- no impossible acceleration
- no frozen facial expression during speech

Use only applicable constraints.

---

# 27. Scene Chaining

The final state of Scene N should become the starting state of Scene N+1.

Canonical rule:

~~~text
Scene 1 Frame B
        =
Scene 2 Frame A
~~~

unless a deliberate cut or transformation exists.

Continuity must cover:

- creator
- product
- clothing
- environment
- props
- phone
- lighting
- camera relationship

This is critical for multi-scene generation.

---

# 28. Continuity Anchors

Each scene should expose explicit anchors.

Example:

~~~yaml
continuity:
  creator:
    - "same hairstyle"
    - "same body proportions"
  product:
    - "same shirt color"
    - "same logo position"
    - "same sleeve length"
  environment:
    - "same bedroom mirror"
    - "same background furniture"
  camera:
    - "phone remains in right hand"
    - "same mirror relationship"
~~~

Anchors should be reused consistently across neighboring scenes.

---

# 29. Validation

Before output, validate:

### State

- Frame A is compatible with the image reference.
- Frame B is compatible with the storyboard.
- State difference is intentional.

### Motion

- One clear primary action.
- Secondary motion is limited.
- Movement fits duration.
- Human mechanics are plausible.

### Product

- Product identity remains stable.
- Clothing responds physically.
- No redesign occurs.

### Camera

- Camera movement follows capture mechanism.
- No impossible motion.
- Camera does not become more cinematic than the format allows.

### Environment

- Background remains stable.
- Objects move only when physically affected.

### Continuity

- Scene N ends where Scene N+1 begins.
- Any discontinuity is intentional and classified.

---

# 30. Failure Modes

### Motion stuffing

Too many actions in too little time.

### State teleportation

Frame B appears without a plausible path from Frame A.

### Everything moves

Creator, camera, clothing, background, and props all move simultaneously.

### Garment morphing

Clothing changes shape beyond plausible physical deformation.

### Product identity drift

Color, logo, pattern, or construction changes during motion.

### Hand failure

Hands duplicate, merge, disappear, or interact impossibly.

### Camera failure

Camera floats, orbits, zooms, or moves without physical cause.

### Frozen human

Creator moves unnaturally while face and body remain rigid.

### Over-animation

The output looks like an AI animation rather than smartphone footage.

### Cinematic drift

UGC becomes a polished commercial because the prompt writer added a dolly shot.

---

# 31. Quality Test

A video prompt passes when:

1. Frame A is clearly defined.
2. Frame B is clearly defined.
3. The state change is intentional.
4. One primary action explains the change.
5. Motion fits the available time.
6. Human movement is physically plausible.
7. Product identity remains stable.
8. Clothing reacts naturally.
9. Camera movement is physically motivated.
10. Environment remains stable.
11. Adjacent scenes can connect without unexplained discontinuity.
12. The result still looks like believable human-made UGC.

Final test:

> **Could a real person holding a smartphone physically perform this exact transition in the allotted time without needing supernatural assistance?**

If not, simplify the motion.

---

# 32. Downstream Handoff

The Frame-to-Frame Video Prompt Engine hands the final scene prompt to Human Realism, Product Consistency, and Quality Control layers.

Canonical handoff:

~~~yaml
video_qc_input:
  scene_id: 1
  duration: 2
  frame_a: ""
  frame_b: ""
  motion: ""
  product_constraints: []
  creator_constraints: []
  continuity_anchors: []
  negative_constraints: []
~~~

The QC layer verifies the generated instruction against upstream decisions.

---

# 33. Engine Boundary

The Frame-to-Frame Video Prompt Engine:

### Does

- define Frame A and Frame B
- define physical state changes
- define primary and secondary motion
- describe body mechanics
- describe hand mechanics
- describe clothing response
- describe camera response
- preserve product identity
- preserve scene continuity
- prepare video-generation instructions

### Does not

- rewrite the creative concept
- invent new scenes
- change the product
- change the creator identity
- add unsupported product claims
- redesign the storyboard
- turn ordinary UGC into cinematic advertising
- compensate for bad story structure with more motion

---

# 34. End-to-End Logic

~~~text
Storyboard Scene
      ↓
Image Reference State
      ↓
Define Frame A
      ↓
Define Frame B
      ↓
Calculate meaningful state difference
      ↓
Select one primary action
      ↓
Add limited secondary motion
      ↓
Apply human body mechanics
      ↓
Apply clothing/product physics
      ↓
Apply camera response
      ↓
Stabilize environment
      ↓
Add continuity anchors
      ↓
Add scene-specific negative constraints
      ↓
Validate duration + realism
      ↓
Final Frame-to-Frame Video Prompt
      ↓
Human Realism + Product Consistency + QC
~~~

The goal is not to make the video move as much as possible.

The goal is to make the movement feel like the unavoidable physical consequence of a real human doing something on camera.
