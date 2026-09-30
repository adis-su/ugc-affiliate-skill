# Creative Concept Engine

The Creative Concept Engine converts normalized campaign, creator, content, and product inputs into one coherent UGC concept.

It is the bridge between **what the campaign needs** and **what the creator actually does on camera**.

It must produce a creative premise before any dialogue, behavioral script, storyboard, or generation prompt is written.

---

## 1. Engine Input

Required inputs:

- Product Intelligence
- Campaign Objective
- Campaign Stage
- CTA
- Creator Profile
- Content Format
- Content Angle
- Duration
- Scene Count
- Platform

The engine may use inferred product characteristics such as:
- garment category
- color
- silhouette
- material
- fit
- visible construction details
- styling potential
- likely use context

It must not invent product facts that are unavailable.

---

# 2. Concept Output Contract

Every concept must contain:

~~~yaml
concept:
  title: ""
  core_idea: ""
  hook: ""
  creator_motivation: ""
  product_role: ""
  behavioral_premise: ""
  visual_progression: []
  emotional_tone: ""
  authenticity_strategy: []
  format_fit: ""
  angle_fit: ""
  must_show: []
  must_avoid: []
~~~

### Field definitions

**title**
- Short internal concept name.
- Descriptive, not advertising copy.

**core_idea**
- One sentence explaining what the viewer experiences.

**hook**
- The opening visual or verbal event that earns attention.
- Must fit the selected format.

**creator_motivation**
- Why the creator is naturally doing this action.
- This is critical for avoiding artificial UGC behavior.

**product_role**
- Explains how the product functions inside the concept.
- Examples: outfit centerpiece, styling problem solver, wardrobe addition, detail worth inspecting.

**behavioral_premise**
- The underlying human action driving the video.
- For silent content this is more important than dialogue.

**visual_progression**
- Ordered states from opening to payoff.
- Should describe meaningful changes, not camera jargon.

**emotional_tone**
- Natural emotional quality such as casual, curious, satisfied, playful, practical, understated.

**authenticity_strategy**
- Specific choices that make the concept feel creator-made rather than campaign-produced.

**format_fit**
- Why this concept works for the selected format.

**angle_fit**
- Why this concept communicates the selected content angle.

**must_show**
- Product and behavior elements that cannot be omitted.

**must_avoid**
- Concept-level risks that would undermine authenticity or product communication.

---

# 3. Concept Generation Principles

## Principle 1: Start from human motivation

The creator should have a plausible reason for doing the action.

Weak:
> Creator poses in front of a mirror to show the shirt.

Stronger:
> Creator checks how the shirt sits after adjusting the hem before heading out.

The second creates behavior naturally.

---

## Principle 2: Product is part of the situation

Do not treat the product as a floating advertisement inserted into a scene.

The product should have a role:
- being worn,
- being chosen,
- being adjusted,
- being compared,
- being inspected,
- solving a styling problem,
- fitting into an everyday activity.

---

## Principle 3: One concept, one primary idea

A short UGC video should not attempt to:
- review,
- compare,
- educate,
- transform,
- unbox,
- style,
- and sell

all at once.

Choose one primary communication idea and let supporting actions reinforce it.

---

## Principle 4: Format controls execution

The same angle can produce different concepts depending on format.

Example:

**Angle: Styling**

Silent Mirror Selfie:
> Creator experiments with a small tuck and sleeve adjustment to see which version feels more natural.

Talking Head:
> Creator explains one simple styling trick and demonstrates it.

GRWM:
> Creator builds the outfit around the product from the first clothing choice to the final look.

The angle remains styling. The behavior changes.

---

## Principle 5: Duration controls concept complexity

### 4 seconds
One visual idea.

### 6 seconds
One setup + one payoff.

### 8 seconds
Short progression with one meaningful action.

### 10 seconds
Micro-story or compact showcase.

Longer custom durations may support multiple beats, but complexity must still remain believable.

Do not solve short durations by increasing movement speed to absurd levels.

---

# 4. Campaign Objective → Concept Bias

Objective influences what the concept prioritizes.

### Product Awareness
Prioritize:
- recognizable product silhouette
- memorable visual moment
- immediate readability

Avoid:
- dense explanations

### Product Discovery
Prioritize:
- curiosity
- product reveal
- clear product context

Avoid:
- assuming the viewer already knows the product

### Product Consideration
Prioritize:
- fit
- styling
- useful detail
- believable observation

Avoid:
- unsupported hype

### Affiliate Conversion
Prioritize:
- visible product benefit
- purchase-relevant information
- confidence-building behavior
- natural CTA

Avoid:
- hard-sell behavior that breaks the creator's personality

### Product Launch
Prioritize:
- newness
- reveal
- visual identity

Avoid:
- pretending to have long-term experience with a new product

### Product Education
Prioritize:
- one clearly demonstrated attribute
- visual proof

Avoid:
- claims that cannot be shown or supported

### Brand / Product Introduction
Prioritize:
- product identity
- context
- approachable introduction

Avoid:
- excessive brand-campaign language

---

# 5. Campaign Stage → Concept Bias

## Awareness
Concept should work even with minimal context.

## Consideration
Concept should create evidence or useful observation.

## Conversion
Concept should reduce uncertainty and make the next action obvious.

Stage changes emphasis, not the creator's personality.

---

# 6. CTA Integration

CTA should emerge from the concept.

### None
End naturally without a selling gesture.

### Soft CTA
Use subtle visual or textual invitation.

### Check Product / View Product
End after the product has been clearly demonstrated.

### Shop Now
Reserve for concepts where the product has already been established and the stronger CTA does not feel abrupt.

### Learn More
Use when the concept introduces an attribute worth exploring.

### Custom
Follow the user-defined instruction while preserving format authenticity.

Silent formats should normally express CTA through:
- final frame text,
- product-page cue,
- natural pointing/phone action,
- caption guidance,

rather than inventing dialogue.

---

# 7. Creator Fit

Concept generation must respect the creator profile.

Consider:
- age range
- gender
- body type
- style
- appearance
- creator reference

Do not force behaviors inconsistent with the selected creator style.

Examples:

A minimalist creator can naturally perform:
- subtle mirror adjustment,
- understated outfit inspection,
- simple styling.

A sporty creator can naturally perform:
- movement-based fit check,
- practical outfit adjustment,
- activity context.

Creator identity is not decoration. It is part of the concept logic.

---

# 8. Authenticity Strategy

Every concept should include explicit authenticity decisions.

Possible strategies:

- casual personal-space environment
- slightly imperfect framing
- one-handed phone handling
- natural weight shift
- brief glance at screen
- small clothing adjustment
- practical reason for movement
- imperfect but plausible timing
- understated facial reaction
- ordinary background activity
- minimal camera choreography

Do not stack every imperfection into every scene.

Authenticity is selective variation, not random mess.

---

# 9. Concept Quality Test

A concept is valid only if it passes all checks:

### Human motivation
Can a real creator plausibly choose to do this?

### Product relevance
Does the product have a meaningful role?

### Format compatibility
Could this naturally be executed in the selected format?

### Angle clarity
Can the viewer understand the intended angle?

### Duration feasibility
Can the concept fit the available time without rushing?

### Scene feasibility
Can it be expressed with the selected scene count?

### Creator fit
Does the behavior fit the creator profile?

### Platform fit
Would the concept feel native to the selected platform?

### Promptability
Can the concept be converted into stable image and frame-to-frame video states?

If any answer is no, revise the concept before continuing.

---

# 10. Concept Diversity

When generating multiple concepts internally, vary the **human premise**, not merely the wording.

Useful variation dimensions:
- motivation
- environment
- product interaction
- visual hook
- behavior
- emotional tone
- storytelling mechanism

Bad variation:
> “Creator checks the shirt.”
> “Creator looks at the shirt.”
> “Creator shows the shirt.”

These are the same concept wearing different hats.

Better variation:
1. Creator checks fit before leaving.
2. Creator experiments with one styling adjustment.
3. Creator notices how the fabric moves while walking.
4. Creator compares two ways of wearing the same piece.

The engine should select one concept that best satisfies the input constraints rather than outputting a random collection of vaguely different ideas.

---

# 11. Anti-Generic Rules

Avoid concept descriptions containing only generic phrases such as:
- “show the product”
- “look stylish”
- “create engaging content”
- “highlight the product”
- “make it aesthetic”
- “show the outfit”

These may appear only when followed by a concrete human action and product-specific reason.

Concepts must answer:

> **Why is this person doing this, right now?**

---

# 12. Downstream Handoff

The Creative Concept Engine passes:

### To Script / Behavior Engine
- hook
- creator motivation
- behavioral premise
- visual progression
- CTA behavior

### To Storyboard Engine
- visual progression
- product role
- must-show elements
- environment assumptions
- authenticity strategy

### To Image Prompt Engine
- creator state
- environment
- product state
- camera relationship
- opening/ending visual state

### To Video Prompt Engine
- start state
- end state
- movement intent
- behavioral continuity
- camera movement constraints

### To Quality Control
- concept-specific must-show
- concept-specific must-avoid
- expected product role
- expected behavioral logic

---

# 13. Example: Silent Mirror Selfie

Input:

~~~yaml
objective: Affiliate Conversion
stage: Conversion
cta: Check Product
format: Silent Mirror Selfie
angle: Styling
duration: 10s
scene_count: 5
~~~

Output:

~~~yaml
concept:
  title: "One Small Styling Change"
  core_idea: "The creator casually tests one small styling adjustment to make the outfit feel more put-together."
  hook: "Creator enters the mirror frame already wearing the product."
  creator_motivation: "They are checking the outfit before going out and want to see whether a small adjustment improves the look."
  product_role: "Outfit centerpiece whose fit and styling flexibility are being evaluated."
  behavioral_premise: "Inspect the fit, make one adjustment, step back, and check the final look."
  visual_progression:
    - "Natural mirror stance"
    - "Inspect shirt fit"
    - "Adjust hem or sleeve"
    - "Step back and shift weight"
    - "Relaxed final look with subtle product-page cue"
  emotional_tone: "casual, satisfied, understated"
  authenticity_strategy:
    - "slightly imperfect framing"
    - "natural weight shift"
    - "brief phone-screen glance"
    - "single meaningful clothing adjustment"
  format_fit: "The mirror selfie format naturally supports visual styling without dialogue."
  angle_fit: "The styling angle is communicated through one visible adjustment rather than verbal explanation."
  must_show:
    - "product silhouette"
    - "fit after adjustment"
    - "final styled appearance"
  must_avoid:
    - "runway posing"
    - "multiple unnecessary outfit changes"
    - "dramatic camera movement"
    - "product morphing"
~~~

This example is intentionally concrete enough to become behavior and storyboard instructions without prematurely becoming a generation prompt.

---

# 14. Engine Boundary

The Creative Concept Engine must **not**:

- write final image-generation prompts,
- write final video-generation prompts,
- invent unsupported product claims,
- decide exact frame composition before storyboard,
- generate dialogue before format and behavior are resolved,
- add visual effects merely to make the content look impressive.

Its job is to determine **what the video is about and why the creator behaves that way**.

The next engine turns that concept into precise time-based behavior.
