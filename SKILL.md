# Fashion UGC Skill

## Purpose

This skill generates production-ready fashion UGC packages from simple user inputs.

The skill behaves as a coordinated creative system, not as a single prompt generator.

It must:

- understand the product
- resolve campaign strategy
- select and interpret the UGC format
- develop one coherent creative concept
- create dialogue or behavioral execution
- build a storyboard
- generate image reference prompts
- generate frame-to-frame video prompts
- enforce human realism
- protect product consistency
- run quality control
- revise failed outputs through the correct upstream stage

Primary goal:

> Produce UGC that feels like believable human-created fashion content, not an over-produced fashion campaign.

---

# 1. Operating Model

Use this pipeline for every generation:

~~~text
USER INPUT
→ NORMALIZE
→ VALIDATE
→ INFER
→ PRODUCT INTELLIGENCE
→ CONTENT STRATEGY
→ UGC FORMAT
→ CREATIVE CONCEPT
→ SCRIPT / BEHAVIOR
→ STORYBOARD
→ IMAGE REFERENCE PROMPTS
→ FRAME-TO-FRAME VIDEO PROMPTS
→ HUMAN REALISM
→ PRODUCT CONSISTENCY
→ QUALITY CONTROL
→ REVISION IF NEEDED
→ FINAL UGC PACKAGE
~~~

The prompt is the final expression of upstream decisions.

Do not use prompts to invent missing strategy, behavior, scene structure, or product facts.

---

# 2. User Input

Accept this canonical input:

~~~yaml
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

Keep user-facing interaction simple.

Do not expose internal engine complexity unless useful.

---

# 3. Input Rules

## Product

Required:

- product name
- product URL

A valid product reference image or sufficiently detailed product description may be used as fallback when the URL cannot be accessed.

Never invent product facts.

## Campaign

Supported objectives:

- Product Awareness
- Product Discovery
- Product Consideration
- Affiliate Conversion
- Product Launch
- Product Education
- Brand / Product Introduction

Supported stages:

- Awareness
- Consideration
- Conversion

Supported CTA values:

- None
- Soft CTA
- Check the Product
- Shop Now
- View Product
- Learn More
- Custom CTA

## Creator

Supported fields:

- gender
- age range
- appearance
- body type
- style
- creator reference

If appearance is Auto Generate, create a plausible creator identity and preserve it across all scenes.

## Content

Supported formats:

- Talking Head
- Silent Mirror Selfie
- Outfit Showcase
- Try-On
- GRWM
- Voice-over + B-roll
- POV
- Lifestyle
- Product Showcase
- Before / After
- Unboxing
- Hybrid

Supported angles:

- Product Showcase
- Outfit Inspiration
- Styling
- Try-On
- First Impression
- Problem → Solution
- Product Review
- Product Comparison
- Transformation
- Everyday
- Lifestyle
- Trend
- Aesthetic

Duration may be:

- 4 seconds
- 6 seconds
- 8 seconds
- 10 seconds
- custom

Scene count may be:

- Auto
- explicit number
- custom

Platforms may include:

- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

---

# 4. Input Priority

Resolve conflicts in this order:

1. explicit user input
2. explicit creator/product reference
3. verified product information
4. engine rules
5. safe defaults

Never silently override an explicit user choice.

If a combination is technically infeasible, preserve the user's choice and surface the constraint.

---

# 5. Product Intelligence

Before creative generation, establish Product Intelligence.

Extract and classify:

- product category
- identity
- color
- pattern
- logo / graphic
- silhouette
- fit
- collar
- sleeves
- hem
- construction
- material appearance
- texture
- hardware
- packaging where relevant
- known product claims
- unknown attributes

Classify evidence as:

- verified
- visually observed
- inferred
- unknown

Use this source-of-truth hierarchy:

1. product reference image
2. product URL information
3. verified Product Intelligence
4. user-provided description
5. generic visual assumptions

Do not turn unknown information into invented certainty.

---

# 6. Content Strategy

Resolve the relationship between:

- objective
- campaign stage
- CTA
- format
- angle
- duration
- scene count
- platform

Use the Content Logic specification.

The strategy must answer:

- what the content needs to accomplish
- what the audience should understand
- what product information matters
- what action the CTA supports
- how much information the duration can realistically carry

Do not create the final creative concept until strategy is coherent.

---

# 7. UGC Format

Treat format and angle as separate dimensions.

Format answers:

> How is the content executed?

Angle answers:

> What does the content communicate?

Preserve explicit user format choices unless they are impossible.

Format-specific execution is mandatory.

### Talking Head

Use:

- direct smartphone relationship
- dialogue
- natural facial behavior
- conversational delivery

Avoid presenter-style performance.

### Silent Mirror Selfie

No spoken dialogue by default.

Use a behavioral script such as:

~~~text
settle
→ inspect
→ adjust
→ reveal
→ natural final state
~~~

The phone, reflection, body, mirror, environment, and product must obey realistic reflection geometry.

### Outfit Showcase

Show the complete outfit with meaningful but limited movement.

### Try-On

Show a plausible transition into the worn state.

### GRWM

Use sequential dressing/styling actions.

### Voice-over + B-roll

Narration must correspond to the visuals.

### POV

Maintain a plausible first-person camera relationship.

### Lifestyle

Integrate the product into an ordinary activity.

### Product Showcase

Prioritize product identity and a specific visible attribute.

### Before / After

Maintain identity and framing continuity.

### Unboxing

Use:

~~~text
package
→ open
→ reveal
→ inspect
→ reaction
~~~

### Hybrid

Declare a primary and secondary format.

Do not add hybrid complexity without a meaningful reason.

---

# 8. Creative Concept

Create exactly one primary concept unless the user explicitly requests alternatives.

The concept must define:

- title
- core idea
- hook
- creator motivation
- product role
- behavioral premise
- visual progression
- emotional tone
- authenticity strategy
- format fit
- angle fit
- must-show elements
- must-avoid elements

Start from a human situation or motivation.

Do not start from generic advertising language.

Avoid concepts such as:

- “show the product”
- “look stylish”
- “create an aesthetic video”

unless converted into a concrete human situation.

---

# 9. Script / Behavior

Use the format to decide the execution mode.

~~~text
Talking Head
→ dialogue

Silent Mirror Selfie
→ behavior

GRWM
→ sequential behavior

Voice-over + B-roll
→ narration + behavior

Hybrid
→ dialogue + behavior
~~~

Time allocation must respect physical plausibility.

Baseline action density:

~~~text
4 sec → hook + one action/payoff
6 sec → setup + one action + payoff
8 sec → setup + 1–2 meaningful actions + payoff
10 sec → hook + 2–3 meaningful beats + payoff/CTA
~~~

Do not make people move unnaturally fast to fit more information.

For dialogue, use approximately 2–2.5 spoken words per second as an internal planning guideline, with less available capacity when pauses or reactions are needed.

Each beat should represent a meaningful state or action.

---

# 10. Storyboard

Create a visual execution contract.

Every scene should define:

- scene ID
- timing
- purpose
- behavior
- dialogue if relevant
- creator state
- product state
- environment
- background
- lighting
- camera relationship
- framing
- angle
- movement
- stability
- subject position
- product emphasis
- negative space
- transition
- Frame A
- Frame B
- continuity anchors

One scene should have one clear purpose.

Do not make every micro movement its own scene.

---

# 11. Image Reference Prompts

Generate one image reference prompt per storyboard scene unless a scene explicitly requires another treatment.

Construct prompts in this order:

1. scene identity
2. creator identity
3. product identity
4. creator behavior/state
5. environment
6. camera relationship
7. framing/composition
8. lighting
9. human realism
10. product consistency
11. continuity anchors
12. scene-specific negative constraints

The prompt must render the storyboard state.

It must not invent a new story.

For mirror selfie scenes, explicitly protect:

- mirror geometry
- reflection
- phone position
- body position
- product visibility
- background continuity

Prefer concrete visual constraints over adjective-heavy prose.

---

# 12. Frame-to-Frame Video Prompts

Generate one transition prompt per storyboard scene.

Define:

- Frame A state
- Frame B state
- exact motion
- camera movement
- body movement
- clothing movement
- product movement
- transition behavior
- continuity constraints
- negative constraints

Frame A must correspond to the image reference state.

Frame B must correspond to the next validated state.

Do not introduce new objects, outfits, body proportions, locations, or product designs during motion.

---

# 13. Human Realism

Apply the Human Realism Engine to every scene.

Protect:

- natural body mechanics
- weight shift
- gaze behavior
- blinking
- facial micro-reactions
- realistic hand behavior
- smartphone handling
- handheld camera imperfections
- clothing physics
- environmental interaction
- ordinary social behavior
- subtle visual imperfection

Avoid:

- mannequin movement
- perfect symmetry
- floating hands
- impossible joints
- teleporting objects
- robotic gaze
- excessive camera choreography
- fashion-editorial posing
- generic AI beauty
- commercial-studio staging

The goal is believable human UGC, not maximum cinematic polish.

---

# 14. Product Consistency

Apply Product Consistency across every scene.

Lock:

- product identity
- color
- pattern
- logo / graphic
- silhouette
- construction
- material
- fit relationship
- creator-product interaction

Physical deformation is allowed.

Identity drift is not.

Maintain stable product identity while allowing natural changes in:

- pose
- folds
- occlusion
- lighting
- perspective
- movement

---

# 15. Continuity

Maintain continuity for:

- creator identity
- body type
- hairstyle and appearance
- outfit
- product
- environment
- lighting
- props
- mirror
- camera relationship

Every scene must inherit the relevant continuity anchors from previous scenes.

Do not allow visual novelty to break continuity.

---

# 16. Quality Control

Run QC after generation.

QC status values:

- pass
- pass_with_warnings
- revise
- block

Check:

- strategy
- format
- angle
- concept
- timing
- dialogue feasibility
- behavior feasibility
- storyboard
- image prompts
- video prompts
- human realism
- product consistency
- creator continuity
- environment continuity
- mirror geometry
- product claims
- platform constraints
- CTA
- prompt bloat
- cross-engine consistency

Do not score or rank creative quality.

QC validates compliance and coherence.

---

# 17. Correction Routing

When QC returns revise, route to the responsible upstream layer.

~~~yaml
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
~~~

Do not patch downstream wording to hide an upstream decision error.

---

# 18. Revision Policy

Default:

~~~yaml
revision_policy:
  max_global_revisions: 2
  max_scene_revisions: 2
~~~

When only one scene fails, revise only that scene where possible.

When an upstream decision changes, regenerate only dependent downstream outputs.

Preserve valid outputs.

Never regenerate the whole package just because Scene 3 decided to become a digital giraffe.

---

# 19. Runtime State

Maintain:

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

Maintain immutable anchors for:

- product identity
- creator identity
- campaign objective
- selected format
- selected angle
- duration
- platform

unless an explicit revision targets them.

---

# 20. Execution Modes

## Full Mode

Run the complete pipeline and return:

1. concept
2. script / behavior
3. storyboard
4. image prompts
5. video prompts
6. continuity notes
7. QC notes

## Prompt-Focused Mode

If the user asks only for prompts, still perform the required upstream reasoning internally.

Do not skip:

- product identity
- format interpretation
- storyboard logic
- continuity
- product consistency
- QC

Expose only the requested prompt layers.

---

# 21. Minimal Clarification Rule

Ask the user only when required information cannot be safely inferred.

Do not ask for details that can be resolved through documented defaults.

Examples of safely inferable information:

- creator appearance when Auto Generate is selected
- scene count when Auto is selected
- ordinary environment when not specified
- compatible action density
- default visual behavior appropriate to the format

Examples requiring clarification:

- missing product identity
- inaccessible product source with no fallback
- invalid explicit duration
- contradictory mandatory inputs that cannot be resolved without changing user intent

---

# 22. Final Output

Return a production-ready package.

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

The user-facing response should prioritize usable artifacts over internal diagnostics.

---

# 23. Runtime Invariants

Always preserve:

1. Product identity.
2. Creator identity.
3. Explicit user choices.
4. Storyboard as scene-structure authority.
5. Image prompt as visual-state authority.
6. Video prompt as state-transition authority.
7. Human realism as plausibility layer.
8. Product consistency as identity layer.
9. QC as final gate.
10. Bounded revision.

---

# 24. Canonical Runtime Algorithm

~~~text
1. Receive request
2. Normalize
3. Validate
4. Retrieve/analyze product
5. Build Product Intelligence
6. Infer safe missing values
7. Resolve Content Strategy
8. Resolve UGC Format
9. Generate Creative Concept
10. Generate Script / Behavior
11. Generate Storyboard
12. Generate Image Reference Prompts
13. Generate Frame-to-Frame Video Prompts
14. Apply Human Realism
15. Apply Product Consistency
16. Run scene QC
17. Run package QC
18. PASS → assemble final package
19. PASS WITH WARNINGS → assemble package + warnings
20. REVISE → route to responsible engine and regenerate affected scope
21. BLOCK → stop and surface the blocking issue
22. Return final package
~~~

---

# 25. Definition of Done

A generation is complete only when:

- the product is correctly identified
- campaign intent is coherent
- format and angle are compatible
- concept is singular and concrete
- behavior is physically feasible
- storyboard is executable
- image prompts match storyboard states
- video prompts describe valid state transitions
- creator identity is stable
- product identity is stable
- human behavior is believable
- clothing physics are plausible
- scene continuity is maintained
- platform and CTA constraints are satisfied
- QC passes or explicitly returns pass_with_warnings

The system is successful when the result feels like something a real person could have casually created with a smartphone, while still being precise enough for controlled AI generation.
