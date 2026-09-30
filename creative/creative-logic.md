# Creative Logic & Creative Concept Specification

Creative Logic converts validated campaign intent, product evidence, creator identity, niche rules, format, angle, duration, and scene count into one coherent creative direction.

It is the bridge between **what the campaign needs** and **what the creator actually does**.

The output of Creative Logic is a Creative Concept and its decision constraints. It is not the final prompt.

## Core Principle

Creative Logic must answer:

1. What is the viewer supposed to notice?
2. Why is the product relevant in this context?
3. What should the creator naturally do?
4. What visual evidence supports the angle?
5. What is the simplest sequence that communicates the idea?
6. What must remain unchanged across scenes?

Use:

`Campaign Intent + Product Evidence + Creator Identity + Niche Behavior + Format + Angle + Duration + Scene Count → Creative Concept`

Then:

`Creative Concept → Scene Sequence → Scene State Model`

Do not jump directly from campaign inputs to prompts.

## Creative Decision Hierarchy

Resolve creative decisions in this order:

1. Product truth
2. Campaign objective
3. Campaign stage
4. Viewer takeaway
5. Required evidence
6. Niche behavior
7. Format behavior
8. Angle emphasis
9. Product role
10. Creator role
11. Hook
12. Scene sequence
13. CTA behavior

Higher-level decisions constrain lower-level decisions.

Do not use a lower-level creative choice to contradict a higher-level fact.

Examples:

- A stylish camera move cannot justify changing product identity.
- A hook cannot introduce an unsupported product claim.
- A CTA cannot override a silent format.
- A trend cannot override realistic product interaction.

## Creative Inputs

Creative Logic consumes:

### Product Intelligence

- Product Identity Lock
- Product State Model
- Supported Claims
- Unknown Attributes
- Visual Reference
- Product-specific evidence

### Creator Intelligence

- Character Identity Lock
- Character Reference
- Voice Identity Lock when speech is used
- Voice Reference when speech is used
- Creator State constraints

### Campaign Intelligence

- Objective
- Stage
- Viewer Takeaway
- Required Evidence
- CTA Behavior
- Speech Requirement

### Niche Intelligence

- Niche-specific formats
- Niche-specific angles
- Human realism priorities
- Product consistency rules
- Typical creator behavior

### Content Inputs

- Format
- Angle
- Duration
- Scene Count
- Platform
- Custom Instructions

## Creative Concept Contract

Every generation must resolve one Creative Concept containing:

| Field | Requirement |
|---|---|
| Core Idea | One sentence describing the content |
| Viewer Takeaway | One primary takeaway |
| Product Role | What the product does in the story |
| Creator Role | What the creator naturally does |
| Hook | First visual or behavioral attention point |
| Evidence | What must become visible |
| Emotional / Behavioral Beat | The creator's natural reaction or behavior |
| CTA Role | How the CTA appears, when applicable |
| Ending State | The final useful visual state |
| UGC Guardrail | The main rule preventing commercial over-polish |

The concept should be concise enough to guide scene planning without becoming a script.

## Product Role

Assign the product one primary role.

Common roles:

- Object of discovery
- Object of inspection
- Tool for solving a problem
- Garment being evaluated
- Beauty product being applied
- Product being compared
- Product producing a visible transformation
- Everyday item integrated into routine
- Final product reveal

Do not assign several major roles unless the duration and scene count can support them.

The product must remain central enough to satisfy the campaign, but not so aggressively centered that the content stops feeling like ordinary UGC.

## Creator Role

The creator should have a believable reason to interact with the product.

Common roles:

- Curious user
- Person getting ready
- Person checking an outfit
- Person demonstrating a routine
- Person solving a small everyday problem
- Person organizing a space
- Person testing or inspecting an item
- Person reacting to a visible result

Avoid fabricated biography.

The creator does not need to claim:
- prior ownership,
- long-term experience,
- professional expertise,
- personal endorsement history,
- emotional attachment,

unless these are explicitly supported.

## Hook Logic

The hook is the first meaningful visual or behavioral event.

A hook should create attention through **observable relevance**, not unsupported hype.

Good hook mechanisms:

- immediate product visibility,
- a visible problem,
- an unusual but plausible object position,
- a quick reveal,
- a recognizable transformation,
- a natural inspection moment,
- a result-first opening when supported.

Avoid default hooks such as:
- exaggerated surprise,
- fake shock,
- invented urgency,
- unsupported “you need this” claims,
- impossible before/after states,
- cinematic spectacle unrelated to the product.

### Hook Selection Rules

Prefer the hook that:

1. can be shown immediately,
2. requires minimal setup,
3. fits the selected format,
4. supports the selected angle,
5. does not require unsupported claims,
6. can transition naturally into the next scene.

For very short content, the hook and first evidence beat may be the same scene.

## Angle Logic

The Angle defines what the viewer should pay attention to.

The same product may produce different concepts depending on angle.

### Fashion

- Outfit Inspiration → overall look and styling
- Styling → how pieces are combined
- Fit Check → silhouette, fit, and movement
- Occasion-Based → suitability in context
- Trend → trend-relevant styling without forced trend language
- Wardrobe Essential → practical repeat-use context

### Beauty

- Shade / Color → visible color result
- Texture → visible product texture and application
- Finish → resulting surface appearance
- Skin Concern → relevant visible routine or application, without unsupported medical claims
- Makeup Look → final look and application sequence
- Routine → repeatable application behavior
- Transformation → visible before/after state when supportable

### Home

- Space Improvement → visible spatial change
- Organization → placement and order
- Convenience → reduced effort or simpler interaction
- Aesthetic Upgrade → visible appearance improvement
- Problem Solving → problem state and solution state
- Functionality → product operation
- Before / After → two clearly distinguishable states

Angle must be expressed through behavior and visual evidence, not just mentioned in text.

## Format Logic

Format determines the natural content grammar.

Examples:

### Silent Mirror Selfie

Primary grammar:
`notice → inspect → adjust → reveal`

Prioritize:
- mirror interaction,
- body positioning,
- garment visibility,
- smartphone framing,
- subtle expression,
- natural adjustment behavior.

Do not force spoken explanation into the format.

### Talking Head

Primary grammar:
`hook → explain → show → react → CTA`

Prioritize:
- direct camera relationship,
- conversational delivery,
- product visibility,
- natural gestures.

Spoken Script remains separate from visual prompts.

### Product Application

Primary grammar:
`show → apply → inspect → result`

Prioritize:
- hand/product interaction,
- application state,
- realistic texture,
- visible result.

### Problem → Solution

Primary grammar:
`problem → intervention → changed state`

Prioritize:
- clear initial problem,
- believable intervention,
- visible resulting state.

Do not compress several unrelated problems into one short asset.

## Format × Angle × Campaign Resolution

Resolve the creative direction through four questions:

### 1. What must happen?

Campaign Objective + Stage.

### 2. What must be noticed?

Angle + Viewer Takeaway.

### 3. How can it naturally happen?

Format + Niche Behavior.

### 4. What must be shown?

Product Evidence + Product State.

Then derive:

`Campaign Job → Viewer Focus → Format Behavior → Evidence Beat → Scene Sequence`

The final concept should be explainable in one sentence.

## Concept Selection

When several concepts are possible, compare them using constraints rather than subjective scoring.

Prefer concepts that satisfy more of these conditions:

- product evidence is clear,
- viewer takeaway is singular,
- format behavior is natural,
- angle is visually demonstrated,
- creator behavior is believable,
- product interaction is physically plausible,
- scene count is sufficient,
- duration is sufficient,
- CTA can fit naturally,
- continuity is simple,
- UGC character is preserved.

Do not assign a numeric quality score or declare a universal “best” concept.

If concepts are equally valid, prefer the one with fewer assumptions and fewer state transitions.

## Concept Complexity

Concept complexity should be proportional to duration and scene count.

### 1 Scene

Use one dominant visual idea.

Pattern:

`Hook + Evidence + Result`

### 2 Scenes

Use:

`Hook → Evidence / Result`

### 3 Scenes

Use:

`Hook → Interaction / Demonstration → Result`

### 4 Scenes

Use:

`Hook → Setup → Demonstration / Transformation → Result`

### 5 Scenes

Use:

`Hook → Setup → Interaction → Reaction / Result → CTA / Final State`

These are planning patterns, not mandatory scripts.

## Duration Logic

Approximate planning guidance:

| Duration | Creative Density |
|---|---|
| 4 sec | One idea, minimal transition |
| 6 sec | One idea + evidence |
| 8 sec | Hook + demonstration + result |
| 10 sec | Hook + demonstration + result + CTA when needed |

Shorter content should reduce actions before reducing clarity.

Do not solve a duration problem by speeding up human movement to an unnatural level.

## Scene Economy

Every scene should earn its existence.

A scene should contribute at least one of:

- hook,
- product recognition,
- required evidence,
- interaction,
- transformation,
- reaction,
- result,
- CTA-compatible ending.

Remove scenes that add no new information or meaningful state.

Do not add scenes merely to make the output look more sophisticated.

## Creative Continuity

A concept is valid only if its scene sequence can be executed without unnecessary identity or environment changes.

Prefer:

- one environment,
- one wardrobe state,
- one product instance,
- one camera relationship,
- small physical transitions.

Introduce a new environment, wardrobe, or camera relationship only when it materially improves the concept and can be supported by the scene count.

## UGC Guardrails

Every Creative Concept must define one primary UGC Guardrail.

Examples:

- phone-shot mirror framing,
- ordinary bedroom lighting,
- slightly imperfect composition,
- casual hand movement,
- natural pause before reacting,
- no cinematic camera movement,
- no commercial studio setup.

The guardrail should prevent one obvious failure mode, not become a giant style paragraph.

## Platform Consideration

Platform selection may influence presentation constraints, but must not change the underlying creative truth.

Do not create separate product identities or creator identities for different platforms.

When multiple platforms are selected:

- resolve one core creative concept,
- preserve the same scene states,
- apply platform-specific formatting only where necessary,
- do not duplicate creative reasoning unnecessarily.

## Custom Instructions

Custom Instructions may refine:

- tone,
- environment,
- pacing,
- styling,
- camera preference,
- behavior,
- CTA presentation.

They may not override:

- Product Identity Lock,
- Character Identity Lock,
- supported product claims,
- physical plausibility,
- silent/spoken rules,
- required output counts.

If a custom instruction conflicts with a hard constraint, preserve the hard constraint and flag the conflict.

## Creative Anti-Patterns

Do not:

- build the concept around an unsupported product claim,
- make the creator perform unrelated actions,
- use a cinematic story arc for a 4-second UGC clip,
- cram multiple product benefits into one short asset,
- invent personal creator testimony,
- invent urgency or scarcity,
- make every scene visually different,
- introduce unnecessary locations,
- introduce unnecessary props,
- use exaggerated influencer reactions by default,
- confuse “hook” with shouting,
- confuse “UGC” with random camera chaos,
- confuse “realistic” with low-quality,
- let CTA become the main story,
- let aesthetic style override product evidence.

## Creative Logic Output

The Creative Logic stage should produce:

1. Creative Concept
2. Product Role
3. Creator Role
4. Hook
5. Viewer Takeaway
6. Required Evidence
7. Behavior Direction
8. CTA Role
9. Ending State
10. UGC Guardrail
11. Concept Constraints

These outputs become the direct inputs to Scene Planning.

## Creative Validation

Validate:

| Area | Check | Severity |
|---|---|---|
| Concept | One coherent concept | Blocker |
| Concept | One primary viewer takeaway | Blocker |
| Product | Product role is clear | Blocker |
| Product | Product role uses supported evidence | Blocker |
| Creator | Creator behavior is believable | Blocker |
| Format | Concept follows format grammar | Blocker |
| Angle | Angle is visually demonstrated | Blocker |
| Campaign | Concept serves campaign objective | Blocker |
| Duration | Concept fits duration | Blocker / Warning |
| Scene Count | Concept fits scene count | Blocker / Warning |
| CTA | CTA role is compatible | Warning / Blocker |
| Continuity | Concept does not require unnecessary identity/environment changes | Warning |
| UGC | Concept preserves ordinary human-made feel | Warning |

### Repair Rules

Repair only the failed decision.

Examples:

- unclear angle → strengthen evidence beat,
- too many actions → remove secondary action,
- concept too complex → reduce state transitions,
- CTA too dominant → move emphasis back to product/result,
- unsupported claim → replace with observable evidence,
- format mismatch → rewrite behavior using format grammar,
- continuity burden too high → consolidate environment or wardrobe.

Do not rewrite the entire concept when a local repair is sufficient.

## Creative Logic Invariants

Throughout execution:

- one primary Creative Concept,
- one primary viewer takeaway,
- one clear product role,
- one clear creator role,
- one hook,
- one evidence model,
- concept complexity matches duration and scene count,
- format behavior remains recognizable,
- angle is demonstrated visually,
- product evidence remains grounded,
- creator behavior remains believable,
- UGC character is preserved,
- no unsupported claims or invented creator testimony,
- concept does not require unnecessary continuity changes.

## Runtime Integration

Creative Logic runs after Campaign Intelligence and before Scene Planning:

`User Input
→ Normalize
→ Validate
→ Product Intelligence
→ Creator Intelligence
→ Campaign Intelligence
→ Format × Angle
→ Duration / Scene Count
→ Creative Logic
→ Scene State Model
→ Content Behavior
→ Prompt Assembly
→ Validation
→ Repair
→ Revalidate
→ Output`

The Creative Concept is an internal bridge. Final Image Prompts and Video Prompts should express its observable consequences, not expose the planning framework.
