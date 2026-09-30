# Script / Behavior Engine

## Purpose

The Script / Behavior Engine converts a resolved Creative Concept into a **time-feasible sequence of human actions and/or spoken lines**.

It answers:

> “What does the creator actually do, say, and reveal during the available seconds?”

It does **not** decide final shot composition. That belongs to the Storyboard Engine.

The engine must preserve the intended human motivation while preventing the common failure mode of stuffing too many actions, words, or transitions into a short UGC video.

---

## Core Principle

**Prompt is the final output of reasoning, not the reasoning itself.**

The Script / Behavior Engine sits between creative intent and visual execution:

~~~text
Creative Concept
→ Script / Behavior
→ Storyboard
→ Image Reference Prompt
→ Frame-to-Frame Video Prompt
~~~

A script is therefore a **behavioral contract**, not a prompt.

---

## Inputs

Required inputs:

- Product Intelligence
- Campaign Objective
- Campaign Stage
- CTA
- Creator profile
- Content Format
- Content Angle
- Duration
- Scene Count
- Creative Concept

Relevant concept fields:

- `hook`
- `creator_motivation`
- `product_role`
- `behavioral_premise`
- `visual_progression`
- `emotional_tone`
- `must_show`
- `must_avoid`

---

## Output Contract

Canonical structure:

~~~yaml
script:
  total_duration: 10
  timing_mode: "timecoded"
  format: "silent_mirror_selfie"
  beats:
    - start: 0
      end: 2
      purpose: ""
      dialogue: null
      behavior: ""
      product_state: ""
      creator_state: ""
      camera_state: ""
      transition: ""

  ending:
    cta: ""
    dialogue: null
    behavior: ""
    product_state: ""
~~~

### Field definitions

| Field | Purpose |
|---|---|
| `total_duration` | Total video duration in seconds |
| `timing_mode` | Usually `timecoded`; supports deterministic downstream planning |
| `format` | Resolved UGC format |
| `beats` | Meaningful behavioral or dialogue units |
| `start/end` | Time window for each beat |
| `purpose` | Why the beat exists |
| `dialogue` | Spoken line when applicable; otherwise `null` |
| `behavior` | What the creator physically does |
| `product_state` | Product condition/visibility at that moment |
| `creator_state` | Emotional/physical state that must remain continuous |
| `camera_state` | Coarse camera relationship only; detailed composition belongs to storyboard |
| `transition` | How the beat naturally connects to the next |
| `ending` | Final payoff and CTA behavior |

---

# 1. Time Allocation Model

Duration controls how much behavior can realistically happen.

The engine should **compress the story before compressing human movement**.

Do not make a creator move at absurd speed simply because the requested duration is short.

### Default compression model

| Duration | Default structure |
|---|---|
| 4s | Hook → one action → payoff |
| 6s | Setup → one meaningful action → payoff |
| 8s | Setup → 1–2 meaningful actions → payoff |
| 10s | Hook → 2–3 meaningful beats → payoff / CTA |
| Custom | Derive from duration, format, action complexity, and scene count |

These are planning defaults, not rigid laws.

A simple product showcase may need fewer beats. A GRWM may need more sequential states, but each action still needs enough time to read naturally.

---

# 2. Action Density

The engine must distinguish between:

- **Meaningful actions**: change the story or product state.
- **Micro-movements**: natural movement inside a beat.

Examples:

Meaningful actions:

- pick up garment
- put on shirt
- inspect sleeve
- adjust hem
- step back to inspect outfit
- turn slightly to show fit
- look at phone/product page
- point to a product detail

Micro-movements:

- blink
- breathe
- shift weight
- small eye movement
- slight hand reposition
- natural facial reaction

Micro-movements should usually be embedded inside a beat, not promoted to separate scenes.

### Density rule

A beat should normally have:

**one primary action + supporting micro-movements**

Avoid:

> pick up shirt → put it on → button it → fix collar → rotate → walk → point → smile

when all of that is expected to happen in a few seconds.

Human beings remain stubbornly subject to physics.

---

# 3. Format-Specific Script Logic

## 3.1 Talking Head

Talking Head requires a dialogue script.

Default structure:

~~~text
Hook
→ Context / problem
→ Product introduction
→ Specific observation
→ CTA or natural ending
~~~

The exact number of beats depends on duration.

### Dialogue rules

- Write speech that sounds conversational.
- Prefer concrete observations over generic praise.
- Keep sentences short enough for natural delivery.
- Allow pauses and facial reactions.
- Do not write copy that requires announcer-like speed.
- Dialogue should match the creator's apparent age, style, and social context.
- Product claims must come from Product Intelligence, not invention.

### Speech-density guideline

Use approximately **2–2.5 spoken words per second as a planning ceiling** for natural UGC.

Then reduce available words when the beat requires:

- a visible reaction
- product interaction
- a pause
- looking away
- pointing
- repositioning
- a transition

The goal is believable speech, not maximum information density.

### Example: 10-second Talking Head

~~~yaml
script:
  total_duration: 10
  format: "talking_head"
  beats:
    - start: 0
      end: 2
      purpose: "hook"
      dialogue: "I didn't expect the fit to look this clean."
      behavior: "Looks at camera, then briefly checks the shirt."
      product_state: "Worn and clearly visible"
      creator_state: "Genuinely surprised, relaxed"
      camera_state: "Front-facing handheld"
      transition: "Returns attention to camera"

    - start: 2
      end: 5
      purpose: "specific observation"
      dialogue: "The shoulder sits nicely, and it doesn't feel bulky."
      behavior: "Briefly touches shoulder and side seam."
      product_state: "Fit and fabric visible"
      creator_state: "Casual, observational"
      camera_state: "Stable handheld relationship"
      transition: "Small glance toward garment"

    - start: 5
      end: 8
      purpose: "use context"
      dialogue: "This is the kind of shirt I'd actually wear out."
      behavior: "Small step or posture adjustment."
      product_state: "Full upper-body fit readable"
      creator_state: "Settled and confident"
      camera_state: "Still front-facing"
      transition: "Brief natural pause"

    - start: 8
      end: 10
      purpose: "CTA"
      dialogue: "It's linked if you want to check it out."
      behavior: "Small gesture toward phone/product area."
      product_state: "Still clearly visible"
      creator_state: "Casual, non-performative"
      camera_state: "Handheld"
      transition: "Natural ending"

  ending:
    cta: "Check the product"
    dialogue: "It's linked if you want to check it out."
    behavior: "Small directional gesture"
    product_state: "Worn and visible"
~~~

---

## 3.2 Silent Mirror Selfie

Silent Mirror Selfie has **no dialogue by default**.

Behavior replaces verbal explanation.

Default behavioral progression:

~~~text
Settle
→ Inspect
→ Adjust
→ Reveal
→ Natural final state
~~~

Not every video needs every step.

### Behavioral rules

- Mirror interaction is the narrative mechanism.
- Phone is naturally held, not floating.
- The creator should appear to be checking themselves, not performing for a fashion campaign.
- Product interaction should have a plausible reason.
- Adjustments should be small and purposeful.
- Final pose should feel like the creator has finished checking the outfit.
- Reflection geometry must remain stable.
- Do not stack several large gestures into one beat.

### Example: 10-second Silent Mirror Selfie

~~~yaml
script:
  total_duration: 10
  format: "silent_mirror_selfie"
  beats:
    - start: 0
      end: 2
      purpose: "settle into mirror check"
      dialogue: null
      behavior: "Raises phone naturally and settles into the mirror frame."
      product_state: "Worn and visible"
      creator_state: "Casual, checking outfit"
      camera_state: "Handheld phone reflected in mirror"
      transition: "Brief stillness"

    - start: 2
      end: 4
      purpose: "inspect fit"
      dialogue: null
      behavior: "Looks at the shirt fit and makes a small downward glance."
      product_state: "Fit and silhouette readable"
      creator_state: "Focused, neutral"
      camera_state: "Mostly stable with minor hand movement"
      transition: "Moves free hand toward hem"

    - start: 4
      end: 6
      purpose: "make one useful adjustment"
      dialogue: null
      behavior: "Smooths the hem once and lightly adjusts the sleeve."
      product_state: "Fabric and fit visible during adjustment"
      creator_state: "Satisfied, still natural"
      camera_state: "Handheld, no dramatic movement"
      transition: "Hand returns naturally"

    - start: 6
      end: 8
      purpose: "reveal final fit"
      dialogue: null
      behavior: "Takes a small step back and settles into a relaxed stance."
      product_state: "Overall fit clearly visible"
      creator_state: "More confident but not posed"
      camera_state: "Slight reframing caused by the step"
      transition: "Brief hold"

    - start: 8
      end: 10
      purpose: "natural payoff"
      dialogue: null
      behavior: "Checks the outfit once more, then holds a casual final stance."
      product_state: "Final worn state"
      creator_state: "Satisfied, ordinary"
      camera_state: "Stable handheld mirror selfie"
      transition: "Natural stop"

  ending:
    cta: "Check the product"
    dialogue: null
    behavior: "Optional subtle product-page cue only if platform/context supports it."
    product_state: "Clearly visible"
~~~

---

## 3.3 Outfit Showcase

Primary goal:

**Make the outfit readable without inventing unnecessary narrative.**

Default structure:

~~~text
Establish outfit
→ Meaningful posture/angle change
→ Product-focused reveal
→ Natural finish
~~~

Rules:

- At least one meaningful change in viewpoint or posture.
- The product remains visually dominant.
- Avoid runway-style posing unless the concept explicitly calls for it.
- Do not force multiple rotations into a short clip.

---

## 3.4 Try-On

Default structure:

~~~text
Initial state
→ Put on / transition
→ Fit inspection
→ Final worn state
~~~

Rules:

- Clothing state must change in a physically plausible sequence.
- The garment should not teleport onto the body.
- Final fit must preserve creator identity and garment identity.
- The action must leave enough time for the viewer to understand the transformation.

For very short durations, simplify to:

~~~text
Before
→ Transition
→ After
~~~

rather than attempting a full dressing sequence.

---

## 3.5 GRWM

GRWM is sequential by nature.

Default structure:

~~~text
Preparation
→ Action 1
→ Action 2
→ Final styling
→ Ready state
~~~

Rules:

- Actions must follow plausible dressing order.
- Every action should contribute to the final look.
- Avoid showing five separate clothing adjustments when two would communicate the same thing.
- Preserve body, clothing, and environment continuity between states.

---

## 3.6 Voice-over + B-roll

Two parallel tracks exist:

~~~yaml
voiceover:
  - dialogue: ""
    purpose: ""

visual_behavior:
  - behavior: ""
    product_state: ""
    purpose: ""
~~~

Rules:

- Narration carries explanation.
- Visual behavior proves or contextualizes what is being said.
- Do not make visuals repeat generic claims without showing relevant evidence.
- The creator can remain silent on camera.

The narration and visual behavior must remain semantically synchronized.

---

## 3.7 POV

POV requires action motivation.

Default:

~~~text
Situation
→ First-person interaction
→ Product interaction
→ Outcome
~~~

Rules:

- Camera perspective must correspond to a plausible human-held or body-mounted viewpoint.
- Hands should enter the frame naturally when required.
- Avoid invisible operators or impossible camera motion.

---

## 3.8 Lifestyle

Lifestyle should feel like an activity that happens to contain the product.

Default:

~~~text
Activity
→ Product naturally used/worn
→ Small relevant interaction
→ Continue activity
~~~

The creator should not suddenly stop behaving normally just because the camera exists.

---

## 3.9 Product Showcase

Default:

~~~text
Product establish
→ Specific attribute interaction
→ Detail / proof
→ Final product state
~~~

The behavior should direct attention to a concrete product property such as:

- fabric texture
- fit
- collar
- sleeve
- pocket
- print
- construction
- packaging detail

Only use attributes supported by Product Intelligence.

---

## 3.10 Before / After

The script must explicitly preserve:

~~~text
BEFORE state
→ transformation event
→ AFTER state
~~~

Both states should remain comparable.

Avoid changing:

- creator identity
- body proportions
- location
- lighting logic
- camera relationship

unless the concept intentionally requires it.

---

## 3.11 Unboxing

Default:

~~~text
Package
→ Open
→ Reveal
→ Inspect
→ Reaction
~~~

Rules:

- Hands, package, and product remain physically consistent.
- Opening actions must happen in plausible order.
- Reaction should follow the reveal, not precede it.

---

## 3.12 Hybrid

Hybrid scripts must explicitly define:

~~~yaml
primary_format: ""
secondary_format: ""
transition_point: ""
reason_for_transition: ""
~~~

A hybrid format should exist because the creative idea benefits from it, not because combining formats sounds sophisticated.

---

# 4. Silent Behavioral Vocabulary

For silent content, the engine should prefer ordinary human actions.

Useful behavioral primitives:

### Mirror / phone

- raise phone
- settle framing
- glance at screen
- check reflection
- lower phone slightly
- reposition phone naturally

### Garment

- smooth hem
- adjust sleeve
- touch collar
- check shoulder
- straighten fabric
- lightly tug garment into place

### Body

- shift weight
- take a small step back
- turn slightly
- relax shoulders
- lean subtly
- settle into stance

### Reaction

- brief satisfied glance
- small smile
- neutral approval
- curious inspection
- slight nod
- return attention to mirror

These primitives should be combined sparingly.

---

# 5. Product State Continuity

Every beat must make the product state understandable.

Typical states:

~~~text
not_visible
held
being_put_on
partially_visible
worn
being_adjusted
detail_visible
fully_revealed
final_worn_state
~~~

The engine should not create impossible state transitions.

Bad:

~~~text
not_visible
→ fully_revealed
→ being_put_on
~~~

Better:

~~~text
not_visible
→ held
→ being_put_on
→ worn
→ being_adjusted
→ final_worn_state
~~~

When a transition is intentionally stylized, the storyboard and video prompt must explicitly account for it.

---

# 6. Creator State Continuity

Creator state tracks the human through the sequence.

Examples:

- relaxed
- curious
- inspecting
- mildly surprised
- satisfied
- confident
- focused
- ready to leave

Avoid abrupt emotional jumps.

A creator should not go from:

~~~text
neutral
→ exaggerated excitement
→ deadpan
~~~

without a narrative reason.

The goal is a person behaving naturally, not an emotional dashboard being rapidly toggled by an intern.

---

# 7. CTA Timing

CTA must not destroy the behavioral payoff.

### Default rules

- Awareness: CTA may be absent or extremely soft.
- Discovery: CTA usually follows product understanding.
- Consideration: CTA follows the useful observation.
- Conversion: CTA appears after desirability/uncertainty reduction.
- Product Launch: CTA can support discovery.
- Product Education: CTA follows the explanation/demo.
- Brand/Product Introduction: CTA remains secondary unless explicitly required.

For silent formats, CTA can be:

- subtle phone interaction
- glance toward product area
- natural ending gesture
- platform-native product cue

Do not force spoken CTA into a silent format.

---

# 8. Scene Count vs Behavioral Beats

**Scene count is not the same as action count.**

One scene can contain several micro-movements.

Example:

~~~text
Scene 3:
  Beat:
    "Creator smooths the hem once, shifts weight, and checks the mirror."
~~~

This is one coherent behavioral beat.

Do not turn:

~~~text
blink
→ move hand
→ touch hem
→ return hand
~~~

into four scenes.

Storyboard will later decide whether the coherent beat needs one shot or a transition.

---

# 9. Duration Compression Rules

When the requested duration is too short, simplify the behavior.

### 4 seconds

Use:

~~~text
Hook / establish
→ One meaningful action
→ Payoff
~~~

Maximum complexity should remain very low.

### 6 seconds

Use:

~~~text
Setup
→ One meaningful action
→ Payoff
~~~

A second action is allowed only if it can happen naturally inside the same beat.

### 8 seconds

Use:

~~~text
Setup
→ Action 1
→ Action 2 or reveal
→ Payoff
~~~

### 10 seconds

Use:

~~~text
Hook
→ Meaningful beat 1
→ Meaningful beat 2
→ Reveal / payoff
→ CTA if needed
~~~

### Custom duration

Derive complexity from:

~~~text
available_seconds
+ format
+ number_of_required_product_states
+ action_complexity
+ dialogue_density
+ scene_count
~~~

If the result is infeasible, reduce action complexity before increasing movement speed.

---

# 10. Feasibility Validation

Before handoff to Storyboard, validate:

### Timing

- Total beat duration equals total video duration.
- No overlapping beats unless explicitly intentional.
- No zero-duration beats.

### Behavior

- Each beat has one clear primary purpose.
- Each beat has no more than one primary physical action unless actions are naturally coupled.
- Actions are physically plausible.
- Transitions are understandable.

### Dialogue

For talking formats:

- Dialogue fits available time.
- Speech does not require unnatural speed.
- Pauses/reactions are accounted for.
- CTA does not exceed the remaining time.

### Product

- Product state progresses logically.
- Required product visibility occurs before payoff/CTA.
- No unsupported product claim appears.

### Creator

- Identity remains stable.
- Body state remains plausible.
- Emotional state progresses naturally.

### Format

- Talking formats contain dialogue.
- Silent formats do not accidentally require dialogue.
- Mirror selfie behavior uses mirror/phone interaction.
- GRWM preserves dressing sequence.
- POV preserves plausible first-person behavior.
- Hybrid has an explicit transition reason.

---

# 11. Failure Modes

Reject or revise scripts that contain:

### Action stuffing

Too many major actions for the duration.

### Dialogue stuffing

Too many words for natural speech.

### Teleportation

Product or creator changes state without a plausible transition.

### Behavioral contradiction

The action does not support the concept.

### Product disconnect

The product is present but not meaningfully integrated into the behavior.

### Format violation

The script behaves like another format without an intentional hybrid structure.

### Artificial posing

The creator behaves like a catalog model instead of a normal person.

### Camera over-direction

The script attempts to prescribe detailed cinematography that belongs in Storyboard.

### CTA interruption

The CTA appears before the product/value payoff has happened.

### Emotional overacting

The reaction is much stronger than the situation warrants.

---

# 12. Script Quality Test

A script passes when:

1. The creator has a clear reason to perform each meaningful action.
2. The product has a clear role in the behavior.
3. The sequence fits the requested duration.
4. The format's execution contract is respected.
5. The creator can plausibly perform the sequence at human speed.
6. Product state remains continuous.
7. The ending provides a readable payoff.
8. CTA, when present, feels attached to the behavior rather than pasted onto it.
9. The sequence can be translated into storyboard beats without inventing missing logic.

A useful final test:

> **Could a real person perform this sequence naturally while holding a smartphone, without looking like they are following a robot's choreography?**

If not, simplify it.

---

# 13. Downstream Handoff

The Script / Behavior Engine hands the following to Storyboard:

~~~yaml
storyboard_input:
  format: ""
  duration: 10
  scene_count: 5
  beats:
    - purpose: ""
      behavior: ""
      dialogue: null
      product_state: ""
      creator_state: ""
      transition: ""
  ending:
    cta: ""
    behavior: ""
~~~

Storyboard then determines:

- shot boundaries
- framing
- camera distance
- camera movement
- composition
- environment
- lighting
- visual emphasis
- image reference requirements
- frame A → frame B transitions

The Script / Behavior Engine should **not** preempt those decisions.

---

# 14. Engine Boundary

The Script / Behavior Engine:

### Does

- translate concept into behavior
- allocate time
- write dialogue when required
- define silent behavior
- preserve product and creator state
- enforce realistic action density
- validate feasibility
- prepare storyboard input

### Does not

- write final image prompts
- write final video prompts
- determine exact camera composition
- invent product claims
- replace Product Intelligence
- replace Creative Concept
- add cinematic effects for visual impressiveness
- force every beat into a separate scene

---

# 15. End-to-End Logic

~~~text
Creative Concept
      ↓
Identify format behavior
      ↓
Determine duration budget
      ↓
Define meaningful beats
      ↓
Add dialogue or silent behavior
      ↓
Track product state
      ↓
Track creator state
      ↓
Attach transitions
      ↓
Attach CTA when appropriate
      ↓
Run feasibility validation
      ↓
Compress complexity if necessary
      ↓
Storyboard Input
~~~

The output should feel like a simple plan a real creator could actually perform.

That is the standard.
