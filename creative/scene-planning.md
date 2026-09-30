# Scene Planning & Scene State Model Specification

Scene Planning converts the resolved Creative Concept into an executable sequence of scene states.

It is the bridge between **creative direction** and **prompt generation**.

The core rule is:

`Creative Concept → Storyboard → Scene State Model → Image / Video Prompts`

## Storyboard Contract

The Storyboard is the production blueprint for the content sequence. It defines the narrative purpose, visible states, behavior, and causal transitions that must exist before prompt generation.

The Storyboard is **not** an Image Prompt and is **not** a Video Prompt. It is compiled into Scene States and Transition specifications, which then become the single shared source of truth for both generation engines.

Conceptually:

```text
STORYBOARD
    ↓
SCENE / SHOT SPECIFICATION
    ↓
SCENE STATE
    ↓
CONTENT BEHAVIOR
    ↓
STATE TRANSITION
    ↓
IMAGE PROMPT / VIDEO PROMPT
```

### Storyboard Responsibilities

For every scene, the storyboard must establish:

- narrative purpose;
- current creator state;
- current product state;
- environment state;
- camera state;
- dominant behavior/action;
- required visual evidence;
- State In;
- State Out;
- transition intent;
- transition cause;
- continuity locks;
- speech or silent behavior state when applicable.

### State In / State Out Rule

Each scene is treated as a state transition unit:

```text
STATE IN
   ↓
BEHAVIOR / ACTION
   ↓
STATE CHANGE
   ↓
STATE OUT
```

For Scene N+1:

`Scene N State Out = Scene N+1 State In`

Any intentional difference between those states must be represented by a causal transition. Unchanged state is inherited rather than re-invented.

### No Duplicate Reference-State Layer

Scene State is the canonical visual truth for the storyboard pipeline. A separate competing “Reference State” model must not be introduced when it duplicates Scene State.

A reference image is an output/conditioning artifact derived from Scene State, not a second source of truth.

Image Prompts and Video Prompts must never be designed independently from the scene model.

## Purpose

Scene Planning answers:

1. What is visibly true in each scene?
2. What is the creator doing?
3. What is the product doing?
4. What is the environment doing?
5. What does the camera see?
6. What changes between scenes?
7. What physical action causes that change?
8. What must remain locked?

The goal is not to create more scenes. The goal is to create the **minimum useful sequence of believable states**.

## Scene State Model

Every scene has four primary state groups plus transition metadata.

### 1. Creator State

Track only what is visually relevant:

- body position
- orientation
- pose
- hand position
- facial expression
- gaze direction
- hair position when relevant
- wardrobe / styling state
- temporary appearance state
- spoken or silent behavior state

Creator State must reference the Character Identity Lock.

Do not repeat or mutate identity attributes inside every scene.

### 2. Product State

Track:

- product identity
- location
- orientation
- interaction state
- open / closed state
- worn / unworn state
- applied / unapplied state
- placed / in-use state
- visible quantity when relevant
- physical deformation when relevant

Product State must reference the Product Identity Lock.

Identity and state remain separate.

### 3. Environment State

Track:

- location
- room / spatial context
- relevant furniture
- relevant objects
- object placement
- lighting context
- background state
- spatial geometry
- interaction consequences

Do not model every background object. Track only elements that affect continuity or the visual result.

### 4. Camera State

Track:

- capture device style
- orientation
- framing
- approximate distance
- perspective
- camera position
- stability
- mirror relationship when relevant
- lens / focal behavior only when materially useful

Camera State should preserve the ordinary UGC capture relationship.

Avoid cinematic camera changes unless explicitly requested.

## Scene Transition Metadata

Each scene should also define:

- Purpose
- Behavior Cue
- Transition Intent
- Continuity Lock
- Transition Cause
- Required Evidence
- CTA relevance
- Speech state when applicable

The transition metadata explains how the current state becomes the next state.

## State In / State Out Representation

The structured Scene State should expose the state boundaries explicitly, even when the underlying state groups remain unchanged:

```text
Scene
├── scene_id
├── purpose
├── state_in
│   ├── creator_state
│   ├── product_state
│   ├── environment_state
│   ├── camera_state
│   └── speech_state
├── behavior_cue
├── state_change
│   ├── changed_attributes[]
│   ├── transition_intent
│   └── transition_cause
├── state_out
│   ├── creator_state
│   ├── product_state
│   ├── environment_state
│   ├── camera_state
│   └── speech_state
├── required_evidence[]
└── continuity_lock
```

`state_in` and `state_out` are boundary views over the same canonical state model. They must not become independent sources of truth.

## Scene Contract

A valid scene contains:

| Field | Requirement |
|---|---|
| Scene ID | Required |
| Purpose | One dominant purpose |
| Creator State | Required |
| Product State | Required when product is relevant |
| Environment State | Required |
| Camera State | Required |
| Behavior Cue | Required |
| Required Evidence | Required when campaign demands evidence |
| Continuity Lock | Required |
| Transition Intent | Required except final scene |
| Transition Cause | Required except final scene |
| Speech State | Required when format supports speech |

The Scene Plan may use concise structured language. The final prompts should translate these states into natural generation instructions.

## One Scene, One Dominant Purpose

A scene should primarily do one job.

Valid purposes include:

- Hook
- Product Recognition
- Inspection
- Demonstration
- Application
- Problem Establishment
- Solution
- Transformation
- Result
- Reaction
- CTA-compatible Reveal
- Final Product State

Secondary micro-behavior is allowed when it supports the dominant purpose.

Avoid scenes containing multiple major actions that cannot plausibly happen within the available duration.

## Scene State vs Creative Concept

Creative Concept defines **what the content means**.

Scene State defines **what is physically visible**.

Example:

Creative Concept:
> Show a creator noticing how a garment fits and naturally adjusting it before revealing the complete outfit.

Scene sequence:

- Scene 01: garment worn, creator notices fit in mirror
- Scene 02: creator adjusts garment
- Scene 03: adjusted garment visible in full outfit reveal

Do not put the abstract concept directly into every prompt.

## State Changes

Every meaningful state change must have a cause.

Examples:

- hand moves because creator reaches,
- garment changes position because creator adjusts it,
- product opens because creator opens it,
- room object moves because creator places it,
- facial expression changes because creator notices the result,
- camera framing changes because the phone is repositioned.

Do not allow unexplained state jumps.

### State Change Test

For every difference between Scene N and Scene N+1:

1. Identify the changed attribute.
2. Identify the physical or intentional cause.
3. Confirm the Video Prompt can represent the cause.
4. Confirm the ending state matches Scene N+1.

If no believable cause exists, simplify the state change.

## Transition Types

Use the simplest transition that can produce the required next state.

### Body Transition

Examples:

- stand → slight turn
- front-facing → three-quarter angle
- seated → standing
- arms relaxed → hand reaches product

### Hand Transition

Examples:

- empty hand → grip product
- holding product → place product
- hand near garment → adjust garment
- applicator held away → applicator touches skin

### Product Transition

Examples:

- closed → opened
- off-desk → placed
- unworn → worn
- untouched → applied
- stationary → being used

Product transitions require believable physical interaction.

### Facial Transition

Examples:

- neutral → mild recognition
- neutral → focused inspection
- focused → subtle satisfaction

Avoid instant exaggerated emotional changes.

### Camera Transition

Examples:

- slightly wider → slightly closer
- mirror framing → phone repositioned
- static supported phone → small handheld reframing

Camera movement should be motivated by the creator or capture situation.

## Scene Count Adaptation

Scene count is a planning constraint, not an invitation to add filler.

### 1 Scene

Represent the entire idea in one strong state.

Pattern:

`Hook + Evidence + Result`

Use when:
- duration is very short,
- product is immediately understandable,
- no physical transformation is necessary.

### 2 Scenes

Pattern:

`Initial State → Evidence / Result`

Use one meaningful transition.

### 3 Scenes

Pattern:

`Hook → Interaction / Demonstration → Result`

This is the default structure for many short UGC concepts.

### 4 Scenes

Pattern:

`Hook → Setup → Demonstration / Transformation → Result`

Use only when the setup materially improves understanding.

### 5 Scenes

Pattern:

`Hook → Setup → Interaction → Result / Reaction → CTA-compatible Final State`

Do not force five scenes into content that only contains three meaningful states.

## Duration Adaptation

Approximate planning density:

| Duration | Recommended State Density |
|---|---|
| 4 sec | 1–2 states |
| 6 sec | 2–3 states |
| 8 sec | 3–4 states |
| 10 sec | 4–5 states |

These are planning defaults, not hard mathematical limits.

When duration is short:

- reduce actions,
- reduce travel distance,
- reduce camera changes,
- reduce dialogue,
- keep transitions physically simple.

Never make human movement unnaturally fast merely to fit the plan.

## Scene Dependency

Scenes should form a chain:

`State 01 → Transition 01→02 → State 02 → Transition 02→03 → State 03`

Each scene inherits unchanged state from the previous scene.

### Inheritance Rule

Unless deliberately changed:

- creator identity remains the same,
- wardrobe remains the same,
- product identity remains the same,
- environment remains the same,
- relevant object placement remains the same,
- camera relationship remains the same.

Only explicitly changed state fields may differ.

## Continuity Locks

Continuity Locks protect high-risk attributes.

Common locks:

### Character

- face identity
- hair identity
- body proportions
- campaign wardrobe
- makeup state when relevant

### Product

- shape
- color
- pattern
- packaging
- branding
- material behavior
- orientation when continuity-critical

### Environment

- room geometry
- furniture placement
- product placement
- lighting direction
- background structure

### Camera

- phone orientation
- mirror relationship
- framing relationship
- approximate camera position

Use only relevant locks. Excessive locks make scene planning noisy without improving reliability.

## Required Evidence Mapping

Every campaign-required evidence item must map to at least one scene.

Example:

Campaign requirement:
- show product texture

Scene mapping:
- Scene 02: product visibly applied with texture observable on skin.

Do not satisfy evidence requirements only through dialogue when the requirement can be demonstrated visually.

If evidence cannot be visually demonstrated, keep the claim out of visual prompts and handle it only where supported by the campaign and product evidence.

## Hook Placement

The first scene should establish the hook with minimal setup.

Possible first-scene states:

- product already visible,
- visible problem,
- result-first state,
- creator inspecting product,
- creator checking outfit,
- product in an unexpected but plausible everyday location.

Avoid long walking, opening drawers, searching bags, or other setup actions unless the search itself is the creative point.

## Result State

The result state should make the Creative Concept legible without requiring internal explanation.

A valid result may be:

- full outfit visible,
- applied beauty result visible,
- organized space visible,
- product functioning,
- problem visibly reduced,
- creator inspecting the result.

The result does not need an exaggerated reaction.

## CTA State

When CTA is selected, represent it through a natural final state.

Examples:

- product clearly visible,
- creator holds product toward camera,
- creator looks at product after demonstration,
- final frame leaves product unobstructed,
- pointing gesture only when natural to the format.

Do not let CTA behavior obscure the product or turn the scene into a commercial end card.

For silent formats, CTA must be visual.

For spoken formats, spoken CTA remains in Spoken Script and visual behavior supports it.

## Silent Scene Planning

Silent formats must communicate through visible behavior.

Useful patterns:

- notice → inspect → adjust → reveal
- problem → interact → solve
- select → try → inspect
- show → use → result
- open → apply → inspect
- before → action → after

Do not add:

- dialogue,
- voice-over,
- lip-sync direction,
- fake speaking gestures.

Natural incidental mouth movement is allowed only when it is not being used as speech.

## Spoken Scene Planning

When speech is used:

- assign speech state per scene,
- keep visual behavior compatible with the Spoken Script,
- do not place the full dialogue inside scene visual state,
- preserve Voice Identity Lock,
- ensure speech density fits duration.

Speech should not force unrealistic hand or body movement.

## Niche-Specific Planning Priorities

### Fashion

Prioritize:

- garment visibility,
- fit,
- silhouette,
- styling,
- body movement,
- mirror continuity,
- fabric behavior.

Typical state progression:

`wearing → inspecting → adjusting → revealing`

### Beauty

Prioritize:

- product/application visibility,
- hand anatomy,
- facial orientation,
- skin/product interaction,
- texture or finish evidence,
- realistic application state.

Typical state progression:

`product shown → opened → applied → inspected`

### Home

Prioritize:

- spatial relationships,
- object scale,
- placement,
- function,
- before/after geometry,
- realistic interaction.

Typical state progression:

`problem state → product placed → product used → improved state`

## Scene Planning Anti-Patterns

Do not:

- create a scene only to increase scene count,
- change locations without a creative reason,
- change wardrobe without a planned state transition,
- change product appearance between scenes,
- move objects without physical cause,
- change camera perspective dramatically without motivation,
- introduce random background props,
- use multiple major actions in one very short state,
- make every scene a different composition,
- rely on dialogue to hide missing visual evidence,
- treat scene labels as prompts,
- write future actions into Image Prompt state,
- let Video Prompt end somewhere different from the next Image Prompt.

## Scene Planning Output

The Scene Planning stage should produce a storyboard-backed production plan:

1. Storyboard / Scene Sequence
2. Scene State Model for every scene
3. Required Evidence Mapping
4. Transition Map
5. Continuity Locks
6. Speech State when applicable
7. Silent Behavior State when applicable
8. Scene Count / Duration Fit
9. Scene Planning Constraints

These outputs become the direct inputs to Content Behavior and Prompt Assembly.

## Scene Validation

Validate:

| Area | Check | Severity |
|---|---|---|
| Scene | Every scene has one dominant purpose | Blocker |
| State | Creator State is defined | Blocker |
| State | Product State is defined when relevant | Blocker |
| State | Environment State is defined | Blocker |
| State | Camera State is defined | Blocker |
| Transition | Every non-final scene has a transition intent | Blocker |
| Transition | Every changed state has a believable cause | Blocker |
| Evidence | Required campaign evidence maps to scenes | Blocker |
| Continuity | Unchanged identity/product/environment state is inherited | Blocker |
| Duration | Scene density fits duration | Blocker / Warning |
| Scene Count | Number of states fits requested scene count | Blocker |
| Silent | No speech state in silent format | Blocker |
| Spoken | Voice continuity exists when speech is used | Blocker |
| CTA | CTA state is compatible with campaign | Warning / Blocker |
| UGC | Camera and behavior remain plausible | Warning |

### Local Repair Rules

Repair only the failed scene or transition.

Examples:

- too many actions → simplify one scene,
- unexplained product change → add physical interaction,
- continuity drift → inherit prior state,
- missing evidence → modify the relevant scene rather than adding filler,
- duration overload → remove secondary behavior,
- camera jump → use a motivated phone reposition,
- silent speech → remove speech state.

Do not rebuild the entire sequence when a local repair solves the failure.

## Scene Planning Invariants

Throughout execution:

- every scene corresponds to one executable visual state,
- every state change has a cause,
- every non-final scene has a transition,
- every transition resolves to the next scene,
- unchanged attributes are inherited,
- Character Identity Lock remains stable,
- Product Identity Lock remains stable,
- environment continuity is preserved,
- camera continuity is preserved when relevant,
- campaign-required evidence is visible in at least one scene,
- scene count and duration remain feasible,
- Image Prompt and Video Prompt derive from the same scene states,
- no hidden reasoning is required to understand a scene state.

## Runtime Integration

Scene Planning runs after Creative Logic and before Content Behavior:

`User Input
→ Normalize
→ Validate
→ Product Intelligence
→ Creator Intelligence
→ Campaign Intelligence
→ Format × Angle
→ Duration / Scene Count
→ Creative Logic
→ Storyboard / Scene Planning
→ Content Behavior
→ Prompt Assembly
→ Validation
→ Repair
→ Revalidate
→ Output`

The Scene State Model is the canonical bridge between creative reasoning and generation prompts.