# Human Realism Engine

## Purpose

The Human Realism Engine is a cross-cutting realism layer applied to UGC generation regardless of format.

Its purpose is to make the generated content feel like it was **actually created by an ordinary person with a smartphone**, rather than rendered as a polished fashion advertisement.

It operates across:

- image reference prompts
- frame-to-frame video prompts
- creator behavior
- camera behavior
- body movement
- facial behavior
- clothing movement
- environment
- imperfections
- continuity

The engine does not create the concept or decide what the creator should do.

It makes the already-decided behavior feel physically and socially believable.

---

# 1. Core Principle

**Human realism is behavioral realism, not adjective density.**

Adding words such as:

- realistic
- photorealistic
- natural
- authentic
- candid
- cinematic

does not guarantee human realism.

The engine instead asks:

> “What would a real person actually do, and what imperfections would naturally appear while they do it?”

The target is:

~~~text
believable human behavior
+
believable smartphone capture
+
believable physical interaction
+
believable imperfections
=
human-made UGC
~~~

---

# 2. Engine Position

Human Realism is a cross-cutting layer.

It should not replace upstream decisions.

Canonical architecture:

~~~text
Creative Concept
      ↓
Script / Behavior
      ↓
Storyboard
      ↓
Image Prompt / Video Prompt
      ↓
Human Realism Engine
      ↓
Product Consistency Engine
      ↓
Quality Control
~~~

Human Realism can also provide constraints earlier when an upstream decision is physically implausible.

It may flag a problem, but should not silently rewrite the creative concept.

---

# 3. Input Contract

The engine receives:

- creator identity
- creator body type
- creator style
- content format
- content angle
- storyboard
- behavior script
- image reference prompt
- video prompt
- camera relationship
- environment
- product state
- scene duration
- continuity anchors
- platform

Relevant context:

~~~yaml
human_realism_input:
  creator:
    gender: ""
    age_range: ""
    appearance: ""
    body_type: ""
    style: ""

  format: ""
  angle: ""
  duration: 2

  behavior:
    primary_action: ""
    secondary_actions: []

  camera:
    relationship: ""
    stability: ""
    framing: ""

  environment:
    type: ""
    complexity: ""
    lighting: ""

  product:
    state: ""
    interaction: ""

  continuity_anchors: []
~~~

---

# 4. Output Contract

Canonical structure:

~~~yaml
human_realism:
  body:
    posture: ""
    movement: []
    weight_shift: ""
    gesture_style: ""

  face:
    expression: ""
    gaze: ""
    blinking: ""
    micro_reactions: []

  hands:
    behavior: ""
    grip: ""
    interaction: ""

  camera:
    capture_device: ""
    stability: ""
    handheld_variation: ""
    framing_imperfection: ""

  clothing:
    fit_behavior: ""
    fabric_response: ""
    fold_behavior: ""

  environment:
    stability: ""
    ambient_elements: []
    lighting_behavior: ""

  imperfections:
    selected: []

  realism_constraints: []
  realism_negative_constraints: []
~~~

The output should contain only realism details that are relevant to the scene.

---

# 5. Human Behavior Model

Real people rarely execute movements as perfectly isolated commands.

Natural behavior contains:

1. intention
2. preparation
3. action
4. reaction
5. settling

Example:

~~~text
notice shirt
→ shift attention
→ touch hem
→ inspect result
→ relax hand
~~~

The engine should preserve this causal chain where time allows.

Avoid:

~~~text
pose A
→ instant pose B
~~~

unless the storyboard explicitly calls for a cut.

---

# 6. Body Movement

Human body movement should contain small, plausible variations.

Useful cues:

- subtle weight shifts
- uneven stance
- relaxed shoulders
- natural arm positioning
- slight torso adjustment
- minor posture correction
- asymmetrical resting positions

Avoid defaulting every creator to:

- perfectly straight posture
- symmetrical shoulders
- identical arm angles
- perfectly centered stance
- mannequin-like stillness

Human bodies are inconveniently non-geometric. That inconvenience is useful.

---

# 7. Gesture Realism

Gestures should be motivated by the interaction.

Examples:

- touching sleeve because the creator is checking fit
- pulling hem because it feels slightly uneven
- moving hair away because it obstructs the face
- adjusting phone grip because the wrist position changes
- pointing toward a product feature because it is being explained

Avoid:

- random hand waving
- repetitive gestures
- exaggerated influencer gestures
- perfectly timed gestures for every spoken phrase

---

# 8. Facial Realism

Facial behavior should remain subtle unless the concept requires a strong reaction.

Useful cues:

- natural blinking
- brief gaze shifts
- slight eyebrow movement
- restrained smile
- small mouth movement
- micro-expression after noticing something
- relaxed jaw

For product reactions:

Prefer:

> brief approving expression after inspecting the fit

over:

> exaggerated surprised face

The goal is recognizable human reaction, not emoji cosplay.

---

# 9. Gaze Behavior

Gaze should have a reason.

Possible gaze targets:

- mirror reflection
- phone screen
- product
- garment detail
- camera lens
- environment
- another person

Gaze should shift when attention shifts.

Examples:

~~~text
mirror
→ shirt hem
→ reflection
~~~

or:

~~~text
camera lens
→ product
→ camera
~~~

Avoid unexplained eye wandering.

---

# 10. Blinking

Blinking should be natural and irregular.

Do not specify an exact blink schedule unless technically required.

Avoid:

- synchronized blinking
- repeated rapid blinking
- perfectly timed blinking
- completely frozen eyes during long shots

The engine may add:

> natural occasional blinking

when facial realism is relevant.

---

# 11. Handheld Smartphone Realism

Smartphone footage is not perfectly stable.

Realistic variation can include:

- tiny framing drift
- slight wrist movement
- subtle vertical movement
- minor angle changes
- small stabilization imperfections
- occasional reframing

However:

**imperfection must remain subordinate to the content.**

Avoid:

- severe camera shake
- random rotation
- constant drifting
- aggressive zooming
- cinematic camera movement

The target is ordinary smartphone capture, not found-footage horror.

---

# 12. Camera Operator Model

The camera behaves according to who or what holds it.

### Selfie

Camera movement follows:

- wrist
- arm
- body
- phone grip

### Mirror Selfie

Camera relationship is constrained by:

- mirror geometry
- phone position
- wrist
- arm
- body position

### Third-Person Smartphone

Camera may respond to:

- hand movement
- operator repositioning
- walking
- framing correction

### Static Phone

Camera should remain mostly fixed.

### POV

Camera movement should follow plausible head/body movement.

---

# 13. Mirror Selfie Realism

Mirror selfies require special constraints.

Maintain:

- correct reflection geometry
- consistent phone visibility
- correct mirrored orientation
- consistent body position
- stable mirror frame
- plausible hand placement
- realistic distance between creator and mirror

The phone should not float independently of the hand.

The reflection should not behave like a second person.

Avoid:

- incorrect reflection direction
- disappearing phone
- duplicated phone
- impossible arm geometry
- mismatched body orientation
- background appearing different inside the mirror

---

# 14. Clothing Realism

Clothing should behave as physical material.

The engine should consider:

- fabric weight
- stiffness
- looseness
- fit
- gravity
- body movement
- tension points
- folds
- compression
- settling

Examples:

### Loose shirt

- hem moves slightly
- fabric folds respond to torso motion
- sleeves shift naturally

### Fitted shirt

- fabric tension follows torso movement
- folds remain smaller and localized

### Hoodie

- heavier fabric
- slower fold response
- sleeves and hem move with more weight

### Structured jacket

- shape holds more strongly
- folds occur around joints and compression points

Do not invent material properties unsupported by the product reference.

---

# 15. Product Interaction

Human realism applies to how the creator handles the product.

Examples:

- grip changes when lifting an object
- hand pressure affects fabric
- garment moves when pulled
- object weight affects wrist position
- packaging resists slightly when opened

Avoid:

- object moving before the hand reaches it
- object floating
- fingers passing through objects
- product changing scale during interaction

---

# 16. Environment Realism

Ordinary UGC environments are imperfect.

Possible details:

- slightly uneven room arrangement
- ordinary furniture
- lived-in but not chaotic background
- practical household lighting
- minor clutter
- realistic shadows
- subtle exposure variation

Do not add environmental mess merely to appear authentic.

The environment should feel:

> plausible, ordinary, and incidental.

It should not become the subject.

---

# 17. Lighting Realism

Lighting should follow the environment.

Possible sources:

- window light
- ceiling light
- bedside lamp
- bathroom lighting
- store lighting
- outdoor daylight

Allow realistic properties:

- slight exposure variation
- natural shadow softness
- mixed lighting when appropriate
- imperfect white balance
- subtle phone-camera exposure response

Avoid:

- dramatic studio key light
- artificial rim lighting
- perfect commercial fill
- excessive bloom
- unexplained light sources

unless the actual scene requires them.

---

# 18. Smartphone Image Characteristics

UGC may contain ordinary camera characteristics:

- moderate sharpening
- realistic exposure
- mild digital noise in low light
- ordinary depth rendering
- slight lens distortion
- imperfect white balance
- computational-phone-camera look

These are secondary cues.

Do not overload prompts with technical camera jargon.

The physical behavior is more important than pretending to configure a camera manually.

---

# 19. Imperfection Budget

Imperfections should be selected intentionally.

Possible imperfections:

- slightly uneven framing
- minor posture asymmetry
- subtle hair displacement
- small clothing fold irregularity
- tiny exposure variation
- natural blinking
- slight hand repositioning
- minor background clutter
- small camera drift

Default:

**select 2–5 relevant imperfections per scene.**

Do not stack every possible imperfection.

Too much imperfection becomes another form of artificiality.

---

# 20. Authenticity vs Sloppiness

Human realism does not mean:

- bad lighting
- dirty background
- poor composition
- blurry subject
- random camera shake
- badly fitted clothing

The content can still be:

- clear
- attractive
- well-composed
- useful
- product-focused

The difference is that it should not feel unnaturally perfect.

---

# 21. Format Adaptation

Human realism must adapt to the chosen format.

## Talking Head

Prioritize:

- natural speaking rhythm
- small head movement
- gaze toward lens
- restrained hand gestures
- occasional posture correction
- natural facial reaction

Avoid:

- presenter posture
- teleprompter stiffness
- constant smiling
- perfect gesture timing

## Silent Mirror Selfie

Prioritize:

- natural phone grip
- mirror gaze
- body inspection
- subtle posture shifts
- garment adjustment
- realistic reflection

Avoid:

- runway posing
- exaggerated turns
- impossible phone movement

## Outfit Showcase

Prioritize:

- natural stance
- small angle changes
- garment inspection
- believable weight distribution

Avoid:

- model runway behavior
- repeated perfect poses

## Try-On

Prioritize:

- realistic garment handling
- physical dressing sequence
- fit inspection
- fabric response

Avoid:

- teleportation
- instant wardrobe transformation without transition logic

## GRWM

Prioritize:

- sequential task behavior
- plausible dressing order
- object handling
- attention shifts

Avoid:

- impossible multitasking
- compressed movement that exceeds human speed

## Voice-over + B-roll

Prioritize:

- actions that naturally illustrate narration
- observational camera behavior
- subtle movement

Avoid:

- generic cinematic montage

## POV

Prioritize:

- plausible head/hand movement
- natural viewpoint
- situational action

Avoid:

- floating camera

## Lifestyle

Prioritize:

- product integrated into ordinary activity
- attention remaining on the activity

Avoid:

- creator stopping unnaturally to advertise

## Product Showcase

Prioritize:

- controlled human handling
- realistic object weight
- small intentional movements

Avoid:

- product floating
- perfect robotic rotations

## Before / After

Prioritize:

- stable identity
- consistent framing
- explicit transition logic

Avoid:

- pretending a large state change happened through impossible continuous motion

## Unboxing

Prioritize:

- realistic packaging resistance
- hand placement
- sequential opening
- natural inspection

Avoid:

- packaging opening itself
- object appearing before it is removed

## Hybrid

Prioritize:

- realism constraints from both formats
- clear transition
- no competing behaviors

---

# 22. Social Realism

UGC is not only physically realistic. It is socially recognizable.

The creator should behave like a person making content for other people.

Useful cues:

- occasionally checking framing
- brief self-conscious adjustment
- natural pause before speaking
- small reaction after seeing the result
- minor repositioning to fit the frame
- not constantly performing for the camera

Avoid:

- nonstop eye contact
- constant smiling
- exaggerated enthusiasm
- polished presenter cadence

---

# 23. Creator Self-Awareness

A person filming themselves may naturally:

- check their reflection
- adjust posture
- reposition the phone
- inspect the outfit
- briefly look at the screen
- repeat a movement because the first one was awkward

Use sparingly.

The creator should still feel purposeful, not incompetent.

---

# 24. Temporal Imperfection

Real recordings contain tiny timing irregularities.

Examples:

- a gesture starts slightly before speech
- a reaction happens a fraction after seeing the product
- a hand pauses briefly
- a movement settles unevenly
- a camera adjustment happens after the creator moves

Avoid synchronizing everything perfectly.

Perfect synchronization can feel more artificial than mild timing variation.

---

# 25. Audio-Relevant Behavior

When audio is part of the content, realism can be supported visually through:

- natural breathing
- small pauses
- mouth movement
- swallowing
- restrained facial reactions
- minor head movement

Do not invent audible events unless the audio system supports them.

---

# 26. Realism Hierarchy

When realism constraints conflict, prioritize:

1. physical plausibility
2. creator identity continuity
3. product identity continuity
4. behavior clarity
5. camera plausibility
6. environment stability
7. minor imperfections
8. stylistic polish

Do not sacrifice physical or product continuity merely to add authenticity.

---

# 27. Anti-Pattern Library

### AI mannequin

Symptoms:

- rigid posture
- symmetrical stance
- frozen face
- perfect hands

Correction:

- introduce plausible weight shift
- relax shoulders
- vary gaze
- add natural hand behavior

### AI camera

Symptoms:

- impossible camera path
- smooth cinematic orbit
- unexplained zoom

Correction:

- tie movement to phone/operator mechanics

### AI garment

Symptoms:

- texture morphing
- changing logo
- impossible folds
- floating sleeves

Correction:

- describe physical cause and lock product identity

### AI environment

Symptoms:

- furniture shifts
- mirror changes
- background geometry warps

Correction:

- stabilize environment and limit motion to affected objects

### AI influencer

Symptoms:

- constant smile
- constant eye contact
- exaggerated gestures
- polished presentation

Correction:

- add attention shifts and ordinary self-recording behavior

---

# 28. Realism Density

Not every prompt needs the same realism density.

### Low complexity scene

Use:

- 2–3 realism cues
- 1–2 imperfections

### Medium complexity scene

Use:

- 4–6 realism cues
- 2–4 imperfections

### High interaction scene

Use:

- 5–8 targeted realism cues
- 3–5 imperfections

The goal is **specificity without prompt bloat**.

---

# 29. Validation

Before passing output downstream, check:

### Human behavior

- Does every movement have a reason?
- Is the movement physically plausible?
- Is the creator behaving like a person rather than a presenter model?

### Camera

- Could the camera physically be where it is?
- Does movement match the capture method?
- Is the amount of shake/drift believable?

### Face and gaze

- Does attention have a clear target?
- Are facial reactions proportional?
- Is the face too static or too expressive?

### Clothing

- Does fabric respond to movement?
- Does the garment retain its identity?

### Environment

- Does the environment remain stable?
- Are moving objects actually affected by the creator?

### Imperfection

- Are imperfections subtle?
- Do they improve believability rather than reduce usability?

### Overall

- Does the result feel like ordinary human UGC?
- Does it still look intentional and useful?

---

# 30. Engine Boundary

The Human Realism Engine:

### Does

- add believable human behavior
- add realistic body mechanics
- add gaze and facial behavior
- add plausible hand behavior
- model handheld smartphone imperfections
- model clothing response
- stabilize ordinary environments
- select subtle imperfections
- adapt realism to content format
- flag physically implausible upstream decisions

### Does not

- invent campaign strategy
- choose the content angle
- choose the format
- rewrite the concept
- invent product claims
- redesign the product
- replace the storyboard
- determine the CTA
- add cinematic effects merely for visual impact

---

# 31. Final Human Realism Test

Ask:

> **If this exact clip appeared on TikTok or Instagram without context, would a viewer reasonably believe a real person recorded it on a phone?**

Then ask:

> **Which specific physical behaviors make that believable?**

If the answer is only:

> “Because the prompt says photorealistic.”

the realism layer has failed.

---

# 32. End-to-End Logic

~~~text
Generated Scene
      ↓
Inspect human actions
      ↓
Add causal body mechanics
      ↓
Add gaze + facial behavior
      ↓
Add hand interaction
      ↓
Apply clothing physics
      ↓
Apply smartphone capture behavior
      ↓
Stabilize environment
      ↓
Select subtle imperfections
      ↓
Check social realism
      ↓
Check format-specific realism
      ↓
Preserve product + creator continuity
      ↓
Human Realism Output
      ↓
Product Consistency Engine
      ↓
Quality Control
~~~

The Human Realism Engine should make the generation feel **less generated without making it feel deliberately messy**.

Its job is not to simulate imperfection for its own sake.

Its job is to model the small, causal, slightly imperfect behaviors that naturally happen when a real person makes fashion content with a real phone.
