# Quality Control Engine

## Purpose

The Quality Control Engine is the final validation layer of the Fashion UGC Skill.

Its purpose is to verify that the generated UGC package is:

- strategically coherent
- format-correct
- behaviorally feasible
- visually consistent
- physically plausible
- product-consistent
- platform-appropriate
- promptable
- recognizably human-made

QC does not create the content. It evaluates whether the content produced by upstream engines is internally coherent and ready to pass downstream.

---

# 1. Core Principle

**QC validates decisions. It does not replace them.**

The QC Engine should answer:

> “Does the final UGC package still represent the intended product, creator, behavior, format, and campaign objective without obvious generation failures?”

It should not answer:

> “Can I make this more exciting?”

That belongs upstream.

---

# 2. Engine Position

QC is the final gate.

Canonical architecture:

~~~text
Product Intelligence
      ↓
Content Strategy
      ↓
UGC Format
      ↓
Creative Concept
      ↓
Script / Behavior
      ↓
Storyboard
      ↓
Image Reference Prompt
      ↓
Frame-to-Frame Video Prompt
      ↓
Human Realism
      ↓
Product Consistency
      ↓
QUALITY CONTROL
      ↓
FINAL UGC PACKAGE
~~~

QC may send the package backward for correction when a blocking failure is found.

---

# 3. Input Contract

QC receives the complete generation package.

Canonical:

~~~yaml
qc_input:
  product: {}
  campaign: {}
  creator: {}
  content: {}
  platform: []

  concept: {}
  script_behavior: {}
  storyboard: {}
  image_prompts: []
  video_prompts: []

  human_realism: {}
  product_consistency: {}

  continuity_anchors: []
~~~

QC should validate both individual scenes and the entire package.

---

# 4. Output Contract

Canonical:

~~~yaml
quality_control:
  status: "pass"
  blocking_issues: []
  warnings: []
  checks:
    strategy: "pass"
    format: "pass"
    concept: "pass"
    behavior: "pass"
    storyboard: "pass"
    image_prompts: "pass"
    video_prompts: "pass"
    human_realism: "pass"
    product_consistency: "pass"
    continuity: "pass"
    platform: "pass"

  scene_checks: []

  corrections:
    - engine: ""
      issue: ""
      correction: ""

  final_notes: []
~~~

Possible status values:

- pass
- pass_with_warnings
- revise
- block

---

# 5. Severity Model

QC should classify findings.

## Blocking

The output cannot reliably proceed.

Examples:

- wrong product
- product identity changes
- creator identity changes unexpectedly
- scene behavior contradicts format
- Frame A does not match reference state
- impossible physical transition
- missing required dialogue
- missing required behavioral sequence
- broken scene continuity
- unsupported product claim
- critical platform mismatch

## Major

The output can be generated but has a substantial quality problem.

Examples:

- excessive action density
- unclear product visibility
- weak concept-to-behavior connection
- unnatural camera movement
- major clothing inconsistency
- poor CTA placement
- scene transition that requires revision

## Minor

The output remains usable but can be improved.

Examples:

- slightly generic behavior
- redundant motion
- unnecessary realism cue
- weak negative constraint
- minor composition inefficiency

---

# 6. Decision Logic

QC should follow:

~~~text
Check critical identity
        ↓
Check strategy
        ↓
Check format
        ↓
Check concept
        ↓
Check behavior
        ↓
Check storyboard
        ↓
Check image prompts
        ↓
Check video prompts
        ↓
Check human realism
        ↓
Check product consistency
        ↓
Check continuity
        ↓
Check platform
        ↓
Determine severity
        ↓
Pass / Warn / Revise / Block
~~~

A later-stage prompt cannot compensate for a broken earlier-stage decision.

---

# 7. Strategy Validation

Verify:

- objective is explicit
- campaign stage is explicit
- CTA is compatible with objective
- content angle supports objective
- format supports angle
- duration supports intended complexity
- scene count is feasible

Example:

~~~text
Objective:
Affiliate Conversion

Angle:
Product Showcase

Format:
Silent Mirror Selfie

CTA:
Check the Product

Compatibility:
valid
~~~

QC should flag mismatches such as an educational concept that has no product information or a conversion goal with no meaningful product visibility.

---

# 8. Format Validation

Verify the execution contract for the selected format.

Examples:

### Talking Head

Must include:

- dialogue
- speaking behavior
- front-facing camera relationship

### Silent Mirror Selfie

Must include:

- mirror relationship
- phone
- behavioral sequence
- product visibility

### Try-On

Must include:

- dressing or transition logic
- fit inspection
- consistent product state

### GRWM

Must include:

- sequential actions
- plausible preparation order

### Voice-over + B-roll

Must include:

- narration
- semantically related visuals

### Product Showcase

Must include:

- product-dominant visual state

If the scene contradicts the format contract, QC should flag it.

---

# 9. Angle Validation

Verify that the content actually communicates the selected angle.

Examples:

### Styling

The creator should demonstrate or communicate styling.

### Try-On

The creator should show fit or wearing behavior.

### First Impression

There should be a discovery/reaction moment.

### Problem → Solution

The problem must appear before the product solution.

### Product Review

The content should provide an observation rather than only posing with the product.

### Lifestyle

The product should naturally exist inside an activity.

Avoid angle labels that exist only in metadata.

---

# 10. Concept Validation

Check:

- one primary idea
- clear human motivation
- product relevance
- format fit
- angle fit
- duration feasibility
- scene feasibility
- creator fit
- promptability

Reject concepts that depend on:

- unsupported product claims
- excessive effects
- impossible physical actions
- generic “show the product” behavior
- unnecessary cinematic staging

---

# 11. Behavior Validation

Verify the Script / Behavior layer.

Check:

- one meaningful action per beat
- action density fits duration
- behavior follows concept
- product state is explicit
- creator state is continuous
- CTA timing is feasible
- dialogue word count is feasible for the duration

For silent formats:

- no accidental dialogue dependence
- behavior communicates the intended message

For talking formats:

- dialogue exists
- dialogue is speakable
- behavior supports rather than contradicts dialogue

---

# 12. Dialogue Feasibility

As an internal guideline:

**approximately 2–2.5 spoken words per second**

This is not a hard speech-rate rule.

QC should account for:

- pauses
- reactions
- gestures
- product handling
- natural conversational rhythm

If dialogue is too long:

- shorten dialogue
- simplify behavior
- increase duration only if allowed

Do not force the creator to speak unnaturally fast.

---

# 13. Storyboard Validation

Check every scene for:

- one clear purpose
- correct timing
- correct behavior
- correct product state
- correct creator state
- stable environment
- valid camera relationship
- meaningful composition
- explicit transition
- image reference requirement
- video Frame A / Frame B state

Scene count must match the requested or automatically derived count.

---

# 14. Scene Timing Validation

Verify:

~~~text
scene start
≤
scene end
≤
total duration
~~~

No:

- overlapping scenes unless intentional
- empty time gaps without purpose
- impossible action density
- final CTA outside total duration

For auto scene count:

QC verifies that the chosen number remains feasible after storyboard complexity is known.

---

# 15. Image Prompt Validation

Each image prompt must:

- describe one coherent visual state
- match storyboard
- match product identity
- match creator identity
- preserve environment
- define camera relationship
- define framing
- include relevant realism
- include relevant negative constraints
- preserve continuity anchors

Reject prompts that:

- invent unsupported product details
- contradict the storyboard
- over-specify irrelevant visual details
- create impossible mirror geometry
- turn UGC into commercial fashion photography without reason

---

# 16. Video Prompt Validation

Each video prompt must:

- define Frame A
- define Frame B
- define state change
- define primary action
- define realistic motion
- define camera response
- preserve product identity
- preserve environment
- fit scene duration
- include relevant negative constraints

Core test:

> Could the described transition physically happen in the available time?

If not, simplify.

---

# 17. Human Realism Validation

Check:

### Body

- plausible posture
- plausible weight shift
- natural gesture
- no mannequin behavior

### Face

- natural gaze
- proportional reaction
- natural blinking
- no frozen expression

### Hands

- plausible grip
- no duplicated fingers
- no impossible interaction

### Camera

- physically plausible capture
- appropriate handheld variation
- no unexplained cinematic movement

### Clothing

- physical response to movement
- no garment morphing

### Environment

- stable background
- only physically affected objects move

---

# 18. Product Consistency Validation

Check identity-critical attributes:

- category
- color
- pattern
- logo
- graphic
- silhouette
- collar
- sleeves
- hem
- seams
- material
- distinctive details

Then check:

- fit
- scale
- state
- interaction
- occlusion
- scene chaining

Any identity-critical drift is a blocking issue.

---

# 19. Creator Consistency Validation

Across scenes, preserve:

- gender presentation
- age range appearance
- face identity
- hairstyle
- body proportions
- body type
- style
- clothing base layer where relevant

Allowed variation:

- posture
- expression
- gaze
- hair displacement
- natural clothing folds

Not allowed without explicit concept:

- different person
- dramatic body transformation
- unexplained wardrobe identity change
- incompatible appearance

---

# 20. Environment Consistency Validation

Track:

- room/location
- mirror
- furniture
- major props
- lighting direction
- background structure
- time-of-day appearance when relevant

Allowed:

- small exposure changes
- natural shadows
- minor clutter variation if visually plausible

Not allowed:

- furniture teleportation
- changing room geometry
- mirror relocation
- unexplained background redesign

---

# 21. Mirror Validation

For any mirror-based scene, validate:

- reflection exists
- reflection geometry is plausible
- phone relationship is correct
- body orientation is consistent
- product appears correctly in reflection
- background relationship is consistent

Mirror scenes are high-risk and should receive additional scrutiny.

---

# 22. Continuity Validation

The continuity rule:

~~~text
Scene N Frame B
=
Scene N+1 Frame A
~~~

unless a deliberate transition exists.

Check:

- creator
- product
- clothing
- phone
- props
- environment
- lighting
- camera relationship

If a discontinuity is intentional, it must be classified as:

- cut
- transformation
- location change
- time change
- other explicit transition

---

# 23. Platform Validation

Platform adaptation should verify:

- vertical/mobile composition where applicable
- product remains visible
- text/CTA placement does not obstruct important visual information
- duration is compatible with requested output
- content remains understandable without unnecessary platform-specific effects

Platform should influence packaging and presentation, not rewrite the core human behavior.

---

# 24. CTA Validation

Check:

- CTA matches campaign input
- CTA appears at the correct stage
- CTA does not interrupt the main behavior unnecessarily
- CTA is visually or verbally feasible within duration

Examples:

### None

No forced sales language.

### Soft CTA

Natural closing cue.

### Check the Product

Product remains visible near CTA.

### Shop Now

Requires clear conversion context.

### Custom CTA

Validate against the user-provided wording.

---

# 25. Product Claim Validation

QC must distinguish:

### Verified product facts

Can be used.

### Reasonable visual observations

Can be described carefully.

### Unsupported claims

Must be removed.

Examples of risky unsupported claims:

- guaranteed comfort
- premium quality
- medically beneficial
- sweat-proof
- guaranteed durability
- exact fabric composition without source

The prompt engine must not invent marketing facts to make the content sound persuasive.

---

# 26. Prompt Bloat Validation

More prompt text does not automatically mean more control.

Flag prompts that contain:

- repeated instructions
- contradictory instructions
- irrelevant camera jargon
- excessive adjectives
- duplicated negative constraints
- conflicting style references

Prefer:

~~~text
specific
→ causal
→ relevant
→ concise
~~~

over:

~~~text
long
→ repetitive
→ contradictory
→ impressive-looking
~~~

---

# 27. Negative Constraint Validation

Negative constraints should target actual risks.

Good:

- no logo drift
- no floating phone
- no mirror distortion
- no garment morphing

Weak:

- no bad quality
- no weirdness
- no ugliness
- no artificial look

QC should reject vague negative constraints when a specific failure mode can be named.

---

# 28. Cross-Engine Consistency

QC should compare outputs from all engines.

Example:

### Concept says

> creator checks shirt before leaving

### Behavior says

> creator checks shirt

### Storyboard says

> creator adjusts sleeve

### Image prompt says

> creator holds coffee and waves

### Video prompt says

> creator spins

This is a cross-engine contradiction.

QC should identify the earliest source of drift and request correction there.

---

# 29. Upstream Correction Routing

When QC finds an issue, route it to the correct engine.

Examples:

| Issue | Correct engine |
|---|---|
| Wrong objective | Content Strategy |
| Wrong format | UGC Format Engine |
| Generic concept | Creative Concept Engine |
| Too many actions | Script / Behavior Engine |
| Bad scene structure | Storyboard Engine |
| Weak visual state | Image Reference Prompt Engine |
| Impossible motion | Frame-to-Frame Video Prompt Engine |
| Unnatural human behavior | Human Realism Engine |
| Product drift | Product Consistency Engine |
| Only wording inefficiency | Prompt layer |

QC should not fix every problem itself.

---

# 30. Scene-Level QC Contract

Canonical:

~~~yaml
scene_qc:
  scene_id: 1
  status: "pass"

  checks:
    purpose: "pass"
    timing: "pass"
    creator: "pass"
    product: "pass"
    environment: "pass"
    camera: "pass"
    behavior: "pass"
    image_prompt: "pass"
    video_prompt: "pass"
    realism: "pass"
    continuity: "pass"

  blocking_issues: []
  warnings: []
  correction_targets: []
~~~

Every scene should be independently valid before package-level validation.

---

# 31. Package-Level QC

After scene validation, verify:

- strategy coherence
- creator consistency
- product consistency
- narrative progression
- CTA placement
- scene transitions
- platform adaptation
- overall realism

The package should feel like one piece of content, not several unrelated AI generations wearing the same shirt.

---

# 32. QC Pass Conditions

A package may receive pass when:

- no blocking issues exist
- no major contradiction exists
- product identity is stable
- creator identity is stable
- scene transitions are valid
- behavior fits duration
- prompts match upstream decisions
- human realism constraints are present where needed
- platform requirements are satisfied

---

# 33. Pass With Warnings

Use pass_with_warnings when:

- the content is valid
- only minor improvements are suggested
- warnings do not threaten product or creator continuity
- warnings do not create physical impossibility

Examples:

- slightly generic background
- one redundant realism cue
- minor composition inefficiency

Warnings should never hide a critical identity failure.

---

# 34. Revise

Use revise when:

- a major issue exists
- the output is salvageable
- correction can be made without redesigning the entire concept

Examples:

- too many actions
- weak product visibility
- unclear CTA
- camera movement too ambitious
- scene transition needs simplification

---

# 35. Block

Use block when:

- product identity is unreliable
- creator identity is unreliable
- physical behavior is impossible
- required format behavior is absent
- unsupported claims are embedded
- critical continuity is broken
- prompts contradict upstream decisions

Blocked output should not be passed as final.

---

# 36. QC Does Not Score Creativity

QC should not assign:

- creativity scores
- attractiveness scores
- best-concept rankings
- subjective quality grades

QC is a validation system.

It can determine whether requirements are satisfied.

It should not decide which creative direction is superior.

---

# 37. Final Validation Checklist

Before final output:

### Strategy

- [ ] Objective valid
- [ ] Stage valid
- [ ] CTA compatible

### Format

- [ ] Format contract satisfied
- [ ] Angle represented
- [ ] Duration feasible
- [ ] Scene count feasible

### Concept

- [ ] One clear idea
- [ ] Human motivation exists
- [ ] Product has a role

### Behavior

- [ ] Actions fit duration
- [ ] Product state tracked
- [ ] Creator state continuous

### Storyboard

- [ ] Every scene has purpose
- [ ] Timing valid
- [ ] Transitions explicit
- [ ] Frame A/B defined

### Image Prompts

- [ ] Visual state matches storyboard
- [ ] Creator consistent
- [ ] Product consistent
- [ ] Camera relationship valid

### Video Prompts

- [ ] Motion physically plausible
- [ ] Product stable
- [ ] Environment stable
- [ ] Duration feasible

### Human Realism

- [ ] Natural body movement
- [ ] Natural gaze/face
- [ ] Plausible hands
- [ ] Smartphone realism
- [ ] Clothing physics

### Product Consistency

- [ ] Identity locked
- [ ] Color stable
- [ ] Logo/pattern stable
- [ ] Construction stable
- [ ] Fit stable

### Continuity

- [ ] Scene chaining valid
- [ ] Creator continuity valid
- [ ] Product continuity valid
- [ ] Environment continuity valid

### Platform

- [ ] Composition appropriate
- [ ] CTA readable
- [ ] Product visible

---

# 38. Final Output Contract

The final UGC package should expose:

~~~yaml
final_ugc_package:
  status: "pass"

  input:
    product: {}
    campaign: {}
    creator: {}
    content: {}
    platform: []

  strategy: {}
  concept: {}
  script_behavior: {}
  storyboard: {}

  image_prompts: []
  video_prompts: []

  realism_constraints: {}
  product_consistency: {}

  quality_control:
    status: "pass"
    blocking_issues: []
    warnings: []
    corrections: []

  final_notes: []
~~~

The user-facing output should prioritize:

1. the actual usable prompts
2. the behavior/storyboard when needed
3. concise QC notes
4. warnings only when relevant

Internal diagnostic detail should not overwhelm the final deliverable.

---

# 39. End-to-End QC Logic

~~~text
Complete UGC Package
        ↓
Validate strategy
        ↓
Validate format + angle
        ↓
Validate concept
        ↓
Validate behavior
        ↓
Validate storyboard
        ↓
Validate image prompts
        ↓
Validate video prompts
        ↓
Validate human realism
        ↓
Validate product consistency
        ↓
Validate creator continuity
        ↓
Validate environment continuity
        ↓
Validate scene chaining
        ↓
Validate platform + CTA
        ↓
Classify issues
        ↓
Route corrections upstream
        ↓
Revalidate
        ↓
PASS / PASS WITH WARNINGS / REVISE / BLOCK
        ↓
FINAL UGC PACKAGE
~~~

---

# 40. Final QC Principle

The Quality Control Engine should make the system **hard to fool with good-looking prompts**.

A prompt can sound sophisticated while producing:

- the wrong shirt
- the wrong person
- impossible motion
- broken reflections
- morphing clothing
- inconsistent scenes
- meaningless behavior
- unsupported product claims

QC exists to catch those failures before they become output.

The final question is not:

> “Does this prompt sound impressive?”

It is:

> **“Does every layer agree on what is happening, who is doing it, which product is being shown, how the action can physically happen, and why this scene exists?”**

If the answer is yes, the package is ready to move forward.
