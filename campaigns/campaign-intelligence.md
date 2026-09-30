# Campaign Intelligence & Content Understanding

Campaign Intelligence translates campaign intent into observable content behavior. It answers four separate questions:

1. **Objective** — what the campaign is trying to achieve.
2. **Stage** — where the viewer is in the decision journey.
3. **CTA** — what action, if any, the viewer is invited to take.
4. **Content Behavior** — what the creator actually does on camera.

Campaign strategy must influence the creative without turning ordinary UGC into a scripted advertisement.

## Core Principle

Do not write a campaign objective directly into the scene.

Translate:

`Campaign Intent → Viewer Takeaway → Required Evidence → Creator Behavior → Scene State`

The final prompts should show the evidence and behavior. They should not expose campaign-planning terminology unless the user explicitly requests it.

## Campaign Intelligence Record

Build an internal record containing:

| Field | Meaning |
|---|---|
| Objective | Primary campaign goal |
| Stage | Awareness / Consideration / Conversion |
| CTA | Selected action or None |
| Product Role | How the product functions inside the creative |
| Viewer Takeaway | One thing the viewer should understand or notice |
| Required Evidence | Observable evidence needed to support the takeaway |
| Behavior Direction | Creator behavior that can produce the evidence |
| CTA Behavior | Visual or spoken behavior associated with the CTA |
| Speech Requirement | Whether speech is required, optional, or disallowed by the format |
| Campaign Constraints | Explicit campaign instructions |
| Unknowns | Missing campaign information |

## Objective Translation

Translate each objective into a content job, not a slogan.

### Product Awareness

Primary job:
- make the product recognizable,
- establish what it is,
- create a clear first visual impression.

Typical evidence:
- product appears clearly,
- recognizable form or packaging,
- simple contextual use.

Avoid:
- forcing detailed feature explanations into a short awareness asset.

### Product Discovery

Primary job:
- help the viewer notice the product in a useful context,
- establish why the product is relevant to the creator's situation.

Typical evidence:
- natural discovery,
- inspection,
- contextual use,
- one or two visible product characteristics.

Avoid:
- pretending the creator has an unsupported personal history with the product.

### Product Consideration

Primary job:
- help the viewer evaluate whether the product fits the demonstrated use case.

Typical evidence:
- fit,
- texture,
- finish,
- organization,
- functionality,
- ease of interaction,
- relevant visible comparison.

Only use evidence supported by Product Intelligence.

### Affiliate Conversion

Primary job:
- make the product easy to identify and easy to act on,
- create a clear product-focused ending when appropriate.

Typical evidence:
- product visibility,
- recognizable state,
- concise benefit framing when supported,
- CTA-compatible final behavior.

Do not turn every conversion asset into aggressive advertising. UGC still needs to behave like UGC.

### Product Launch

Primary job:
- introduce the product clearly,
- establish novelty only when novelty is actually supported,
- show the product in a simple, understandable context.

Do not invent launch timing, exclusivity, scarcity, or availability.

### Product Education

Primary job:
- demonstrate how the product works or how it is used,
- make the relevant process understandable.

Typical evidence:
- step,
- interaction,
- resulting state.

The demonstration must remain physically plausible and supported by product evidence.

### Brand / Product Introduction

Primary job:
- introduce the product and its basic context without overloading the viewer.

Keep the message simple and grounded in visible evidence.

## Campaign Stage Translation

Campaign Stage changes the emphasis of the content.

### Awareness

Prioritize:
- recognition,
- context,
- simple visual hook,
- product identity.

Keep behavior simple. The viewer should understand what they are looking at quickly.

### Consideration

Prioritize:
- inspection,
- demonstration,
- relevant product evidence,
- creator reaction when naturally available.

The viewer should have enough information to understand the demonstrated use case.

### Conversion

Prioritize:
- product clarity,
- useful final state,
- CTA-compatible behavior,
- minimal friction between product recognition and action.

Do not add urgency, scarcity, discounts, or performance claims unless supplied and supported.

## CTA Intelligence

CTA is a behavior constraint, not permission to add marketing copy everywhere.

### CTA = None

- no explicit CTA,
- no pointing-to-link behavior,
- no shopping-oriented ending,
- let the product or result stand on its own.

### Soft CTA

Use subtle emphasis:
- final product look,
- brief product hold,
- natural glance toward product,
- simple end-state emphasis.

Avoid explicit sales gestures unless requested.

### Check the Product / View Product

Make the product easy to identify in the final state.

Possible behavior:
- hold product naturally,
- final product-focused frame,
- glance or gesture toward the product when contextually natural.

Do not invent UI elements or platform interface graphics.

### Shop Now

A stronger shopping-oriented ending is allowed:
- clear product presentation,
- direct product-facing gesture,
- concise spoken CTA when speech is used.

Do not introduce fake buttons, prices, discount badges, or platform UI unless explicitly requested.

### Learn More

Favor:
- clear product visibility,
- demonstration or explanation,
- informational ending.

Do not manufacture technical details to make the CTA feel more justified.

### Custom CTA

Preserve the user's wording exactly for planning.

Validate whether the requested behavior is compatible with:
- selected format,
- duration,
- scene count,
- product evidence,
- UGC style.

If incompatible, block or minimally adjust the behavior without silently changing the CTA text.

## Objective × Stage Logic

Objective and Stage are independent inputs, but they should produce a coherent creative emphasis.

Use this decision model:

`Objective = what must happen`

`Stage = how much information / action is appropriate`

Examples:

- Product Awareness + Awareness → recognition-first.
- Product Discovery + Consideration → context and inspection.
- Product Consideration + Consideration → evidence-first demonstration.
- Affiliate Conversion + Conversion → product clarity and CTA-compatible ending.
- Product Education + Consideration → demonstration-first.
- Product Launch + Awareness → introduction-first.

These are behavioral directions, not fixed scripts.

## Format × Angle × Campaign

Campaign Intelligence must sit above the Format × Angle Matrix.

Resolve in this order:

1. Campaign Objective
2. Campaign Stage
3. Format
4. Angle
5. Product evidence
6. CTA
7. Duration / Scene Count

Then derive:

`Campaign Intent + Format Behavior + Angle Evidence + Product State → Scene Sequence`

### Example

Fashion + Silent Mirror Selfie + Fit Check + Product Consideration

Campaign intent:
- help the viewer evaluate fit.

Angle evidence:
- silhouette,
- movement,
- garment adjustment.

Behavior:
- inspect outfit,
- slight body turn,
- small garment adjustment,
- final mirror view.

The campaign objective changes the emphasis, but the physical behavior still comes from the selected format and angle.

## Viewer Takeaway

Every generation should resolve one primary viewer takeaway.

Good takeaway forms:
- “I can see how this garment fits.”
- “I understand how this product is used.”
- “I can see the product in a normal home context.”
- “I can identify the product clearly.”

Avoid multiple competing takeaways in a short asset.

For short UGC, one strong observable takeaway is usually more useful than several weak messages.

## Required Evidence

Translate the viewer takeaway into evidence that can actually appear on screen.

Examples:

| Viewer Takeaway | Required Evidence |
|---|---|
| Understand garment fit | silhouette, movement, garment adjustment |
| Notice product texture | visible product/application texture |
| Understand product use | interaction sequence and resulting state |
| See space improvement | before/after spatial state |
| Identify product | recognizable product appearance |
| Understand a feature | feature visibly operated or demonstrated |

Evidence must come from Product Intelligence, Creator Identity, and scene behavior. Do not substitute unsupported claims for missing evidence.

## Speech Decision

Campaign Intelligence may recommend speech, but it cannot override format rules.

Classify speech as:

- **Required** — the selected format fundamentally depends on explanation.
- **Optional** — the format can work silently but speech may improve understanding.
- **Disallowed** — silent format or explicit user instruction prohibits speech.

When speech is optional:
- choose speech only if it materially improves the viewer takeaway,
- keep the spoken script short,
- keep visual evidence independent of dialogue.

Dialogue must never be the only evidence for a product property that should be visually demonstrated.

## CTA Placement

CTA should normally appear at the end of the behavioral sequence unless the format naturally integrates it earlier.

Default pattern:

`Evidence → Result → CTA`

For very short content:

`Product / Result → CTA`

Do not interrupt the core demonstration with unnecessary CTA behavior.

## Campaign-to-Scene Mapping

Before Scene Planning, create a compact mapping:

| Campaign Layer | Scene Planning Output |
|---|---|
| Objective | Creative job |
| Stage | Information/action emphasis |
| Viewer Takeaway | Primary scene outcome |
| Required Evidence | Visible proof |
| Format | Behavior pattern |
| Angle | What evidence to foreground |
| CTA | Final behavior constraint |
| Duration | Behavior density |
| Scene Count | Number of visual beats |

This mapping is the bridge between campaign intent and the Scene State Model.

## Campaign Failure Modes

### Objective Too Broad

If the objective contains several unrelated jobs:
- choose the explicit primary objective,
- preserve secondary context only when it does not compete with the main takeaway,
- do not create multiple competing storylines.

### Stage / Objective Tension

If Stage and Objective create conflicting emphasis:
- preserve both as inputs,
- prioritize the objective's core product job,
- use Stage to control depth and CTA intensity,
- flag a warning when the combination is unusually constrained.

### CTA Incompatible With Format

Example:
- a silent format with a spoken-only CTA requirement.

Resolve only when the CTA can be expressed visually without changing its meaning. Otherwise block.

### CTA Incompatible With Duration

If the CTA requires a long explanation but the duration is too short:
- simplify the behavior,
- do not silently change the CTA wording,
- block when the required meaning cannot fit.

### Missing Campaign Context

If Objective, Stage, or CTA is required by the request contract but missing:
- block generation,
- request the minimum missing field,
- do not invent campaign intent.

## Campaign Intelligence Output

The campaign stage should produce:

1. Campaign Intelligence Record
2. Viewer Takeaway
3. Required Evidence
4. Behavior Direction
5. Speech Requirement
6. CTA Behavior
7. Campaign Constraints
8. Warnings / Conflicts

These outputs become inputs to Creative Logic, Scene Planning, Content Behavior, Prompt Assembly, and Validation.

## Campaign Validation

The validator must check:

| Area | Check | Severity |
|---|---|---|
| Campaign | Objective exists and is supported | Blocker |
| Campaign | Stage exists and is supported | Blocker |
| Campaign | CTA exists and is supported | Blocker |
| Campaign | Objective and Stage are coherent enough to execute | Warning / Blocker |
| Campaign | One primary viewer takeaway | Blocker |
| Evidence | Required evidence can be shown | Blocker |
| Evidence | Evidence is supported by Product Intelligence | Blocker |
| Format | Behavior is compatible with selected format | Blocker |
| CTA | CTA behavior matches CTA input | Warning / Blocker |
| Duration | Campaign behavior fits duration | Warning / Blocker |
| Speech | Speech requirement matches format | Blocker |
| UGC | Campaign behavior does not force commercial polish | Warning |

## Campaign Anti-Patterns

Do not:

- turn every campaign into a sales pitch,
- repeat the objective as dialogue,
- use unsupported benefits as evidence,
- add fake urgency,
- invent scarcity,
- invent discounts,
- invent platform UI,
- add a CTA when CTA = None,
- let CTA dominate the entire asset,
- use dialogue as a substitute for visible product evidence,
- force multiple viewer takeaways into a short asset,
- let campaign intent override physical plausibility,
- let marketing language override creator or product consistency.

## Campaign Invariants

Throughout execution:

- one primary campaign objective,
- one campaign stage,
- one CTA state,
- one primary viewer takeaway,
- one evidence model,
- CTA behavior remains compatible with the selected format,
- required evidence remains grounded in Product Intelligence,
- campaign intent does not mutate Creator Identity or Product Identity,
- campaign intent does not override human or physical realism,
- no unsupported urgency, scarcity, discount, or performance claim,
- no hidden campaign assumptions enter the final prompts.

## Runtime Integration

Insert Campaign Intelligence after Product and Creator retrieval and before Format × Angle resolution:

`User Input
→ Normalize
→ Validate
→ Product Intelligence
→ Creator Intelligence
→ Campaign Intelligence
→ Format × Angle
→ Duration / Scene Count
→ Creative Concept
→ Scene State Model
→ Content Behavior
→ Prompt Assembly
→ Validation
→ Repair
→ Revalidate
→ Output`

Campaign Intelligence should remain a reasoning layer. The final Image and Video Prompts should contain only the observable consequences of the campaign intent.
