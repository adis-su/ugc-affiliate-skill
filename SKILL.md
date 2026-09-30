# UGC Affiliate Skill

## Purpose

UGC Affiliate Skill is a reusable creative and prompt-generation system for affiliate UGC across Fashion, Beauty, and Home.

The primary objective is to generate:

1. High-quality Image Prompts
2. High-quality Frame-to-Frame Video Prompts

The generated content should feel like ordinary human-made UGC captured with a smartphone, not polished advertising or cinematic AI content.

## Core Principles

### 1. Human-Looking UGC
Every creative decision must support believable human-made content:
- Natural human anatomy and proportions
- Natural poses and micro-behaviors
- Believable product interaction
- Smartphone camera behavior
- Imperfect but plausible framing
- Natural lighting
- Realistic material and object physics
- Avoid excessive cinematic polish

### 2. Product Consistency
The same product must remain visually consistent across all scenes:
- Shape
- Color
- Material
- Packaging or garment details
- Branding and visible text when applicable
- Functional details
- Interaction state

### 3. Creator Consistency
The selected creator is an identity package. Character Identity controls visual continuity. Voice Identity controls spoken/audio continuity.

### 4. Prompt Is the Final Product
Strategy, analysis, creative concepts, behavior, and scene planning are supporting reasoning layers. The final deliverables are Image Prompts and Frame-to-Frame Video Prompts.

## Workflow

Input
→ Understanding
→ Creative Logic
→ Content Behavior
→ Prompt Assembly
→ Image / Video Prompt Generation
→ Human Realism
→ Consistency
→ Output

## Input

### Guided User Input Flow

The user input experience is sequential, not a single large form. The skill should collect and preserve context step by step.

The default order is:

1. **Product / Product URL**
2. **Campaign Objective**
3. **Content Format**
4. **Angle**
5. **Platform**
6. **CTA**
7. **Creator**
8. **Speech**

The first step establishes Product Intelligence. Each later question should use the already-resolved context to make the next choice more relevant.

Do not ask the user to provide execution-level production details that the skill can safely derive. Camera, lighting, composition, gestures, scene mechanics, continuity, and other generation details belong to the skill unless the user explicitly constrains them.

#### Step 1 — Product / Product URL

Collect at least one reliable product identifier:
- Product name, or
- Product URL

When a Product URL is supplied, resolve Product Intelligence before moving to the next step when retrieval is available.

If the product cannot be identified sufficiently to support the requested content, request the minimum missing product information instead of inventing attributes.

#### Step 2 — Campaign Objective

Collect the intended campaign objective, such as:
- Awareness
- Consideration
- Conversion

The objective determines the creative job of the content and informs later format, angle, behavior, and CTA choices.

#### Step 3 — Content Format

Collect the desired content format.

Examples:
- Product Demo
- Honest Review
- Problem → Solution
- Tutorial
- Unboxing
- Mirror Selfie
- Silent Mirror Selfie

The available formats should be constrained by the relevant niche/content rules when known.

#### Step 4 — Angle

Collect the desired content angle.

Examples:
- First Impression
- How I Use It
- Problem → Solution
- Daily Routine
- Feature Demonstration

Angle should define what the viewer should notice. It must be demonstrated through visible behavior, not merely stated in copy.

If the user does not provide an angle, the skill may propose contextually appropriate options based on Product Intelligence, Campaign Objective, and Content Format.

#### Step 5 — Platform

Collect the target platform, for example:
- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

Platform should influence output conventions, pacing, framing, and CTA behavior without overriding the user's core intent.

#### Step 6 — CTA

Collect the desired CTA when applicable.

CTA is required when the campaign objective or format materially depends on a conversion action. It may be omitted when no CTA is appropriate.

If omitted, the skill may derive a suitable visual or verbal CTA behavior from the campaign objective, but must not invent unsupported product claims.

#### Step 7 — Creator

Collect the creator identity.

Current supported creator:
- Rositasari

Resolve the creator from the Creator Library. Do not infer creator identity from the name alone.

Creator Identity and Character Reference govern visual continuity. Voice Identity and Voice Reference govern spoken continuity.

#### Step 8 — Speech

Determine whether the content is:
- Spoken
- Silent

For silent content, do not generate dialogue, voice-over, or lip-sync.

For spoken content, Voice Identity and an approved Voice Reference are required for production voice generation. If the approved Voice Reference is missing, return a structured blocker rather than fabricating one.

### Input State

Internally preserve the guided flow as normalized state:

```js
{
  product: {
    name: null,
    url: null,
    intelligence: null
  },
  campaign: {
    objective: null,
    stage: null,
    cta: null
  },
  content: {
    format: null,
    angle: null,
    platform: null,
    speech: null,
    duration: null,
    scene_count: null
  },
  creator: {
    name: null
  },
  references: {
    character: null,
    product: null,
    environment: null,
    voice: null
  }
}
```

Duration, scene count, references, campaign stage, and other execution details are optional user constraints. The skill should derive them when safe and when the user has not specified them.

### Input Handling Rules

- Treat explicit user input as the highest-priority source of intent.
- Preserve answers from earlier steps throughout the session.
- Ask only for the next missing decision required by the flow.
- Do not restart the entire input form when one field changes.
- If a later answer invalidates an earlier assumption, update the dependent state and continue from the affected step.
- Offer concise choices when the skill can infer a useful set of options.
- Allow custom user input when none of the suggested choices fit.
- Never invent product, creator, character, voice, or reference facts to complete a missing field.
- Separate user intent from execution details. The user describes what they want; the skill determines how to execute it.

## Niche

- Fashion
- Beauty
- Home

## Product

- Product Name
- Product URL

## Campaign

- Objective
- Stage
- CTA

## Creator

- Rositasari

## Content

- Format
- Angle
- Duration
- Scene Count

## Platform

- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

## Processing Architecture

### 01. Understanding
- Input Validation
- Guided Input State
- Product Retrieval
- Product Intelligence
- Creator Identity Retrieval
- Campaign Understanding
- Content Understanding

### 02. Creative Logic
- Niche Logic
- Format Logic
- Angle Logic
- Format × Angle Matrix
- Creative Concept
- Scene Planning

### 03. Content Behavior
- Script Engine
- Behavior Engine
- Human Micro-Behavior
- Product Interaction
- Scene Behavior

Script and behavior are format-dependent. Silent formats such as Silent Mirror Selfie use behavioral scripting rather than spoken dialogue.

### 04. Prompt Assembly
Convert resolved scene states and continuity locks into generation-ready prompts.

- Image Prompt Assembly
- Video Prompt Assembly
- State Anchoring
- Prompt Compression
- Constraint Handling

### 05. Image Prompt Engine
Build each image prompt from:
- Character
- Product
- Pose & Behavior
- Environment
- Camera
- Composition
- Lighting
- UGC Visual Language

### 06. Video Prompt Engine
Build each frame-to-frame video prompt from:
- Starting Frame
- Ending Frame
- Human Movement
- Facial Movement
- Product Movement
- Material Physics
- Camera Movement
- Environment Movement
- Frame Continuity

### 07. Human Realism Engine
Apply cross-cutting realism constraints:
- Human Anatomy
- Natural Pose
- Micro Movement
- Facial Expression
- Imperfection
- Smartphone Camera Behavior
- Natural Lighting
- UGC Authenticity

### 08. Consistency Engine
Maintain:
- Character Identity Lock
- Character Reference
- Voice Identity Lock when voice is used
- Voice Reference when voice is used
- Product Consistency
- Clothing / Appearance Consistency
- Environment Consistency
- Scene-to-Scene Consistency

## Output

### Image Prompts
Generate one prompt per planned scene.

### Frame-to-Frame Video Prompts
Generate one transition prompt for each consecutive scene pair:
- Scene 01 → 02
- Scene 02 → 03
- Scene 03 → 04
- etc.

## Quality Philosophy

Quality control is embedded into the engines rather than implemented as a separate QC layer.

Do not optimize for generic photorealism alone. Optimize for believable, ordinary, human-made UGC.

## Niche
- Fashion
- Beauty
- Home

### Product
- Product Name
- Product URL

### Campaign
- Objective
- Stage
- CTA

### Creator
- Rositasari

### Content
- Format
- Angle
- Duration
- Scene Count

### Platform
- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

## Processing Architecture

### 01. Understanding
- Input Validation
- Product Retrieval
- Product Intelligence
- Creator Identity Retrieval
- Campaign Understanding
- Content Understanding

### 02. Creative Logic
- Niche Logic
- Format Logic
- Angle Logic
- Format × Angle Matrix
- Creative Concept
- Scene Planning

### 03. Content Behavior
- Script Engine
- Behavior Engine
- Human Micro-Behavior
- Product Interaction
- Scene Behavior

Script and behavior are format-dependent. Silent formats such as Silent Mirror Selfie use behavioral scripting rather than spoken dialogue.

### 04. Prompt Assembly
Convert resolved scene states and continuity locks into generation-ready prompts.

- Image Prompt Assembly
- Video Prompt Assembly
- State Anchoring
- Prompt Compression
- Constraint Handling

### 05. Image Prompt Engine
Build each image prompt from:
- Character
- Product
- Pose & Behavior
- Environment
- Camera
- Composition
- Lighting
- UGC Visual Language

### 06. Video Prompt Engine
Build each frame-to-frame video prompt from:
- Starting Frame
- Ending Frame
- Human Movement
- Facial Movement
- Product Movement
- Material Physics
- Camera Movement
- Environment Movement
- Frame Continuity

### 07. Human Realism Engine
Apply cross-cutting realism constraints:
- Human Anatomy
- Natural Pose
- Micro Movement
- Facial Expression
- Imperfection
- Smartphone Camera Behavior
- Natural Lighting
- UGC Authenticity

### 08. Consistency Engine
Maintain:
- Character Identity Lock
- Character Reference
- Voice Identity Lock when voice is used
- Voice Reference when voice is used
- Product Consistency
- Clothing / Appearance Consistency
- Environment Consistency
- Scene-to-Scene Consistency

## Output

### Image Prompts
Generate one prompt per planned scene.

### Frame-to-Frame Video Prompts
Generate one transition prompt for each consecutive scene pair:
- Scene 01 → 02
- Scene 02 → 03
- Scene 03 → 04
- etc.

## Quality Philosophy

Quality control is embedded into the engines rather than implemented as a separate QC layer.

Do not optimize for generic photorealism alone. Optimize for believable, ordinary, human-made UGC.


# Execution Contract

This section defines how the skill turns user input into final prompt outputs.

## Input Validation

Validate niche, product, campaign, creator, format, angle, duration, scene count, and platform before generation. Do not silently replace invalid choices. If a duration/scene combination is implausible, adjust the scene plan rather than forcing too many actions into too little time.

## Product Retrieval

When Product URL is available, retrieve it when possible and use it as the source of truth. Extract only supportable facts: product type, brand, color, pattern, material, shape, size, functional features, packaging, visible branding, intended use, and relevant selling points. Separate observed facts from assumptions. If the product cannot be reliably understood, avoid inventing attributes.

## Creator Retrieval

Retrieve the selected creator file from creators/. Character Identity is the visual source of truth. Voice Identity is the spoken/audio source of truth. Missing identity details must not be invented.

## Format And Angle Logic

The niche file defines valid formats, angles, and niche-specific realism. Format determines behavior. Angle determines what the viewer should notice. The angle must be demonstrated through visible behavior, not merely stated in copy.

Evaluate Format × Angle compatibility using four checks: natural demonstration, product visibility, duration fit, and scene-count fit. Preserve the user's intent when resolving weak combinations.

## Creative And Scene Planning

Create one concise concept covering hook, product role, creator behavior, viewer takeaway, and CTA behavior when applicable. Plan each scene around one dominant purpose. Each scene should define objective, creator action, product interaction, environment, camera state, body/facial behavior, transition state, and relevant realism constraints. Prefer continuity over unnecessary scene changes.

## Content Behavior

Spoken formats use a short conversational script aligned with Voice Identity. Silent formats use a behavioral sequence instead of dialogue. Useful silent behavior may follow a pattern such as notice → interact → inspect → react → reveal, adapted to the product and format.

Human micro-behaviors should be restrained and contextual: natural blinking, weight shifts, small posture adjustments, glances, grip changes, clothing adjustments, or subtle reactions. Do not add random motion merely to make content look realistic.

## Prompt Assembly Rules

Prompt assembly is the translation layer between structured reasoning and the final generation prompt. It should preserve the resolved scene state without turning internal planning notes into bloated prompt prose.

### Assembly Principles

1. **State before style**
   - Establish what must be visibly true before describing aesthetic qualities.
   - Character, product, environment, and physical state take priority over mood words.

2. **Facts before interpretation**
   - Use verified product and creator attributes as anchors.
   - Creative interpretation may shape pose, framing, lighting, and behavior, but must not create unsupported product facts or identity details.

3. **One prompt, one visual state**
   - An Image Prompt describes one moment that can exist as a still image.
   - Do not put time-based sequences such as “walks over, picks it up, then turns” into an Image Prompt.
   - Time-based change belongs in the Video Prompt.

4. **Transition, not reinvention**
   - A Video Prompt describes how the starting state physically becomes the ending state.
   - Do not use a transition prompt to invent a new scene, prop, wardrobe, identity, or environment.

5. **Specificity over adjective stacking**
   - Prefer observable details over generic words such as “ultra realistic,” “masterpiece,” “stunning,” or “perfect.”
   - Realism should come from anatomy, materials, camera behavior, lighting, and physical continuity.

6. **Minimum sufficient constraints**
   - Include a negative constraint only when it prevents a likely failure.
   - Avoid giant negative-prompt lists that repeat the positive description.

7. **Continuity is explicit**
   - Reuse the same identity, product, wardrobe, environment, and relevant camera anchors across scenes.
   - A scene may change only the states that the behavior actually changes.

8. **No hidden reasoning in the final prompt**
   - Do not expose internal validation, scoring, matrix logic, or planning labels.
   - Translate them into natural visual instructions.

### Image Prompt Assembly Order

Assemble Image Prompts in this order:

1. **Character Identity**
   - Character profile and reference anchor
   - Stable appearance attributes
   - Current pose and orientation
   - Current facial expression
   - Current hand and hair state when relevant

2. **Product Identity**
   - Exact product identity
   - Verified visible attributes
   - Current location and interaction state
   - Relevant branding or text only when reliably known

3. **Action and Visible Behavior**
   - One dominant action
   - Product interaction
   - Natural micro-behavior supporting the action

4. **Environment**
   - Location/context
   - Relevant furniture or objects
   - Stable geometry
   - Background state

5. **Camera and Composition**
   - Smartphone-style capture
   - Orientation and framing
   - Approximate distance/perspective
   - Natural handheld or supported behavior
   - Intentional but imperfect composition

6. **Lighting**
   - Plausible source and direction
   - Natural exposure
   - Realistic light response on skin, product, clothing, and environment

7. **UGC Realism and Continuity**
   - Natural anatomy and proportions
   - Believable materials and reflections
   - Plausible imperfections
   - Scene continuity locks

The final prompt should read as one coherent visual description, not as a pasted checklist.

### Image Prompt Mandatory vs Optional

**Mandatory when relevant:**
- Character identity
- Product identity
- Current scene state
- Dominant action or pose
- Environment
- Camera/framing
- Product and character continuity

**Optional when relevant:**
- Facial expression
- Hair state
- Accessories
- Fine lighting detail
- Background props
- Visible text
- Specific imperfection

Do not force optional details into every scene. Repetition without purpose is how prompts become soup.

### Video Prompt Assembly Order

Assemble Frame-to-Frame Video Prompts in this order:

1. **Starting Frame Anchor**
   - Identify the exact starting visual state.
   - Preserve character, product, wardrobe, environment, and camera anchors.

2. **Physical Transition**
   - Describe the simplest believable action that connects the two states.
   - Use explicit body mechanics when necessary: reach, grip, turn, step, adjust, place, release.

3. **Human Movement**
   - Natural body motion
   - Weight transfer
   - Hand movement
   - Posture change
   - Restrained micro-movement

4. **Facial Movement**
   - Only when relevant to the transition.
   - Keep expression changes gradual and plausible.

5. **Product and Material Physics**
   - Product moves because the creator moves it or because a believable physical force acts on it.
   - Clothing follows body movement.
   - Flexible materials bend, fold, or settle naturally.
   - Rigid objects maintain shape.
   - Open/closed or worn/unworn states change through visible interaction.

6. **Camera Movement**
   - Describe only movement supported by the scene.
   - Prefer subtle handheld drift, small reframing, or natural phone repositioning.
   - Do not introduce cinematic tracking, orbiting, or dramatic zooms unless explicitly requested.

7. **Environment Movement**
   - Include only relevant motion such as hair reacting to movement, fabric shifting, or a nearby object moving because it was touched.

8. **Ending Frame Anchor**
   - End at the exact target state required by the next Image Prompt.
   - Preserve all unchanged identity and environment attributes.

9. **Continuity Constraints**
   - Explicitly protect high-risk attributes when needed: face, hair, wardrobe, product shape/color, object placement, room geometry, or camera orientation.

The video prompt should describe a continuous physical event, not two disconnected descriptions with “then” inserted between them.

### Prompt Translation Rules

Convert structured fields into natural generation language:

| Internal State | Prompt Translation |
|---|---|
| Creator State | Describe the creator's visible pose, orientation, expression, and appearance |
| Product State | Describe where the product is and how it is being held, worn, placed, opened, or used |
| Environment State | Describe only the environmental elements that affect the frame |
| Camera State | Describe phone capture, framing, distance, perspective, and stability |
| Behavior Cue | Convert the cue into a visible subtle action |
| Continuity Lock | State the attribute that must remain unchanged |
| Transition Intent | Convert intent into a physical action with a believable cause |

Do not expose field names such as “Creator State” or “Continuity Lock” in the final generation prompt unless the target generation system explicitly benefits from structured labels.

### Prompt Compression Rules

Compress prompts by removing:
- Repeated adjectives
- Duplicate identity descriptions
- Generic realism claims
- Irrelevant background details
- Internal planning terminology
- Constraints already guaranteed by the scene state

Do not compress away:
- Product-defining attributes
- Character identity anchors
- Current interaction state
- Required camera/framing information
- Critical continuity constraints
- Physical actions needed to explain a state change

### Cross-Prompt State Anchoring

For Scene N and Scene N+1:

**Image Prompt N**
→ defines Starting State

**Video Prompt N → N+1**
→ defines Physical Transition

**Image Prompt N+1**
→ defines Ending State

The three outputs must agree on all unchanged attributes.

At minimum, preserve:
- Character identity
- Product identity
- Wardrobe / appearance
- Environment geometry
- Product location/state
- Camera orientation when continuity requires it

If an attribute changes, the Video Prompt must explain the physical cause.

### Silent Format Rule

For silent formats:
- Never insert spoken dialogue into Image Prompts or Video Prompts.
- Communicate intention through gaze, hands, posture, product interaction, and expression.
- Do not simulate lip movement unless it is naturally incidental.
- CTA behavior must be visual when a CTA is selected, such as a product reveal, pointing gesture, or product-focused final frame.

### Spoken Format Rule

For spoken formats:
- Visual prompts describe what the creator does while speaking.
- Spoken copy belongs in the Spoken Script output.
- Do not overload the Video Prompt with full dialogue.
- Voice Identity controls vocal continuity, not visual body behavior.

### Unsupported Detail Rule

Never invent:
- Product claims
- Materials not established by product evidence
- Exact measurements without support
- Logos or text not known to exist
- Creator facial, body, hair, skin, or voice details not present in the creator identity source
- New props that materially affect the concept without a scene reason

If a detail is necessary but unknown, use a neutral description rather than fabricating one.

### Default Anti-Pattern List

Avoid these by default:

- “Ultra realistic” as the main realism mechanism
- “Perfect skin,” “perfect body,” or “perfect pose”
- Studio-commercial lighting
- Fashion-editorial posing without a request
- Cinematic camera moves without a request
- Random props
- Random hand gestures
- Instant product or wardrobe changes
- Impossible reflections
- Floating or fused objects
- Unexplained environment changes
- Multiple major actions in one short scene
- Huge negative prompts
- New creator identity details generated per scene

## Output Assembly Templates

These are internal templates for constructing the final prompt text.

### Image Prompt Template

**Character identity + current product state + one dominant action + environment + smartphone camera/composition + plausible lighting + UGC realism + critical continuity constraints**

### Frame-to-Frame Video Prompt Template

**Starting frame + physical transition + human movement + product/material physics + camera movement + relevant environment movement + exact ending frame + critical continuity constraints**

Templates are assembly guides, not text that must be copied verbatim.


# Output Schema And Generation Template

The output schema defines the user-facing structure of every completed generation. It separates planning context from final generation assets while keeping every scene traceable to the same resolved state.

## Output Order

Always return sections in this order:

1. Creative Summary
2. Scene Plan
3. Image Prompts
4. Frame-to-Frame Video Prompts
5. Spoken Script, only when speech is used
6. Silent Behavior Script, only when the format is silent

Do not add internal reasoning, validation scores, hidden matrix calculations, or implementation notes unless explicitly requested.

## 1. Creative Summary

Include:
- Niche
- Product
- Campaign Objective
- Campaign Stage
- CTA
- Creator
- Format
- Angle
- Duration
- Scene Count
- Creative Concept

The Creative Concept should be one concise sentence describing the content idea and viewer takeaway.

## 2. Scene Plan

Create one entry per scene.

Each scene must contain:

| Field | Requirement |
|---|---|
| Scene | Required |
| Purpose | Required |
| State | Required |
| Creator Action | Required |
| Product Interaction | Required when product is visible or used |
| Behavior Cue | Required |
| Environment | Required |
| Camera State | Required |
| Continuity Lock | Required |
| Transition Intent | Required except for final scene |

Keep the Scene Plan structured and concise. It is a bridge to the prompts, not the final creative copy.

### Scene Plan Rule

Every scene must have one dominant visual purpose.

If a scene contains multiple major actions, split them only when duration and scene count allow it. Otherwise simplify the action.

## 3. Image Prompts

Generate exactly one Image Prompt for every planned scene.

Use this naming:
- Scene 01 — Image Prompt
- Scene 02 — Image Prompt
- Scene 03 — Image Prompt
- etc.

Every Image Prompt must describe a single visual state and follow the Prompt Assembly Rules.

### Image Prompt Requirements

Each prompt must preserve, when relevant:
- Character Identity
- Product Identity
- Current pose and behavior
- Product interaction state
- Environment
- Camera/framing
- Lighting
- UGC realism
- Continuity locks

Do not include future actions in the Image Prompt.

## 4. Frame-to-Frame Video Prompts

Generate exactly one transition prompt for every consecutive scene pair.

For N scenes, generate N−1 video prompts.

Use this naming:
- Scene 01 → 02 — Video Prompt
- Scene 02 → 03 — Video Prompt
- Scene 03 → 04 — Video Prompt
- etc.

Each prompt must connect the exact ending state of the previous scene to the exact starting state of the next scene.

### Video Prompt Requirements

Each transition must preserve:
- Starting frame identity
- Physical cause of movement
- Human movement
- Product/material physics
- Camera behavior
- Relevant environment movement
- Ending frame state
- Critical continuity locks

Do not describe an unrelated new scene.

## 5. Spoken Script

Include this section only when the selected format uses speech.

The script should:
- Match the campaign objective and angle
- Fit the selected duration
- Use conversational language
- Follow Voice Identity
- Avoid unsupported product claims
- Support the visible behavior rather than fighting it

Do not duplicate the entire script inside every Image or Video Prompt.

## 6. Silent Behavior Script

Include this section only when the selected format is silent.

Represent behavior as a compact sequence, for example:

`notice → inspect → adjust → reveal`

The behavior script must match the actual Scene Plan.

Do not add dialogue, voice-over, or lip-synced speech instructions to silent content.

## Output Count Rules

For a scene count of N:
- Scene Plan = N entries
- Image Prompts = N prompts
- Video Prompts = N−1 prompts
- Spoken Script = 1 section if speech is used
- Silent Behavior Script = 1 section if the format is silent

Never generate extra prompts to compensate for weak scenes. Fix the scene plan instead.

## Output Consistency Rules

Before returning the final output, ensure:

1. Every Image Prompt maps to exactly one Scene Plan entry.
2. Every Video Prompt maps to exactly one consecutive scene pair.
3. Scene N's Image Prompt is the starting visual anchor for Video Prompt N → N+1.
4. Scene N+1's Image Prompt is the ending visual anchor for Video Prompt N → N+1.
5. Unchanged character attributes remain unchanged.
6. Unchanged product attributes remain unchanged.
7. Unchanged wardrobe and environment remain unchanged.
8. Any state change has a visible or physical cause.
9. Silent formats contain no spoken dialogue.
10. Spoken formats keep dialogue in the Spoken Script section rather than duplicating it throughout visual prompts.
11. CTA behavior appears only when relevant to the selected CTA.
12. Unsupported product or creator details are not invented.

## Generation Template

Use this internal generation sequence:

`Input → Validation → Product/Creator Understanding → Format × Angle → Creative Concept → Scene State Model → Prompt Assembly → Consistency Pass → Output`

For each scene:

`Scene State → Image Prompt`

For each transition:

`Scene N State → Physical Transition → Scene N+1 State → Video Prompt`

The final response should expose the structured output, not the internal generation chain.

## Output Example Structure

Use this shape as the default response structure:

### Creative Summary
- Niche:
- Product:
- Campaign Objective:
- Campaign Stage:
- CTA:
- Creator:
- Format:
- Angle:
- Duration:
- Scene Count:
- Creative Concept:

### Scene Plan

#### Scene 01
- Purpose:
- State:
- Creator Action:
- Product Interaction:
- Behavior Cue:
- Environment:
- Camera State:
- Continuity Lock:
- Transition Intent:

#### Scene 02
- Purpose:
- State:
- Creator Action:
- Product Interaction:
- Behavior Cue:
- Environment:
- Camera State:
- Continuity Lock:
- Transition Intent:

### Image Prompts

#### Scene 01 — Image Prompt
`[complete generation prompt]`

#### Scene 02 — Image Prompt
`[complete generation prompt]`

### Frame-to-Frame Video Prompts

#### Scene 01 → 02 — Video Prompt
`[complete transition prompt]`

### Spoken Script
`[only when applicable]`

### Silent Behavior Script
`[only when applicable]`

This example is a structural template. Do not copy placeholder text into generated content.

# Format × Angle Matrix

The Format × Angle Matrix determines whether a creative combination is natural and what behavior should be generated from it. Format controls **how the creator communicates**. Angle controls **what the viewer should notice**.

A valid combination must satisfy:
1. The angle can be demonstrated visibly in the format.
2. The product can remain clearly identifiable.
3. The required behavior fits the selected duration.
4. The scene count can represent the behavior without rushed actions.

Do not treat the matrix as a rigid script. It is a behavior-generation guide.

## Fashion Matrix

| Format | Angle | Primary Behavior | Typical Visual Evidence |
|---|---|---|---|
| Silent Mirror Selfie | Outfit Inspiration | Show full outfit, small pose changes, natural mirror inspection | Complete outfit and styling relationship |
| Silent Mirror Selfie | Styling | Adjust or point to styling details | Layering, accessories, combinations |
| Silent Mirror Selfie | Fit Check | Turn slightly, inspect silhouette, adjust garment | Fit around body and movement |
| Silent Mirror Selfie | Occasion-Based | Show outfit in a context-appropriate setting | Outfit suitability for the occasion |
| Silent Mirror Selfie | Trend | Casual pose or movement highlighting the trend element | Recognizable trend detail |
| Silent Mirror Selfie | Wardrobe Essential | Show repeated-use styling behavior | Versatile, practical garment use |
| Outfit Showcase | Outfit Inspiration | Reveal outfit naturally | Full-look visibility |
| Outfit Showcase | Styling | Show key styling choices | Garment + accessories |
| Outfit Showcase | Fit Check | Move naturally to show fit | Garment behavior on body |
| Outfit Showcase | Occasion-Based | Perform a simple relevant activity | Outfit in use |
| Outfit Showcase | Trend | Highlight the trend element | Distinctive trend feature |
| Outfit Showcase | Wardrobe Essential | Show practical everyday use | Wearability |
| Try-On | Outfit Inspiration | Put on or reveal garment | Before/after garment state |
| Try-On | Styling | Add or adjust styling elements | Styling transformation |
| Try-On | Fit Check | Move after wearing garment | Fit and drape |
| Try-On | Occasion-Based | Complete a context-relevant action | Practical wear context |
| Try-On | Trend | Reveal trend feature after change | Trend detail |
| Try-On | Wardrobe Essential | Simple everyday reveal | Practical garment use |
| GRWM | Outfit Inspiration | Select, wear, then reveal outfit | Preparation → finished look |
| GRWM | Styling | Build look through small styling actions | Styling sequence |
| GRWM | Fit Check | Final adjustment and movement | Fit after preparation |
| GRWM | Occasion-Based | Prepare specifically for an occasion | Contextual preparation |
| GRWM | Trend | Include trend item during preparation | Trend integration |
| GRWM | Wardrobe Essential | Build a repeatable everyday look | Utility |
| Talking Head | Outfit Inspiration | Explain while showing garment | Garment visible while speaking |
| Talking Head | Styling | Talk through styling choice | Styling detail |
| Talking Head | Fit Check | Describe fit while demonstrating it | Fit evidence |
| Talking Head | Occasion-Based | Explain why it works for context | Context + product |
| Talking Head | Trend | Explain trend element | Trend feature |
| Talking Head | Wardrobe Essential | Explain why it is useful | Everyday utility |
| POV | Outfit Inspiration | First-person outfit interaction | Viewer-perspective styling |
| POV | Styling | Hands adjust or combine pieces | Styling action |
| POV | Fit Check | First-person inspection | Fit detail |
| POV | Occasion-Based | Perform relevant activity | Contextual use |
| POV | Trend | First-person trend interaction | Trend detail |
| POV | Wardrobe Essential | Everyday use | Practicality |
| Lifestyle | Outfit Inspiration | Wear naturally during activity | Outfit in context |
| Lifestyle | Styling | Natural styling interaction | Styling detail |
| Lifestyle | Fit Check | Movement reveals fit | Drape and fit |
| Lifestyle | Occasion-Based | Perform occasion-relevant activity | Context |
| Lifestyle | Trend | Natural use of trend item | Trend feature |
| Lifestyle | Wardrobe Essential | Routine use | Everyday wear |
| Before / After | Outfit Inspiration | Reveal change in styling | Clear visual transformation |
| Before / After | Styling | Compare styling states | Styling difference |
| Before / After | Fit Check | Compare garment state | Fit difference |
| Before / After | Occasion-Based | Show preparation result | Contextual transformation |
| Before / After | Trend | Reveal trend addition | Trend transformation |
| Before / After | Wardrobe Essential | Show practical upgrade | Utility transformation |

## Beauty Matrix

| Format | Angle | Primary Behavior | Typical Visual Evidence |
|---|---|---|---|
| GRWM | Shade / Color | Select and apply shade | Visible color choice |
| GRWM | Texture | Pick up, apply, inspect | Product texture |
| GRWM | Finish | Apply and turn toward light | Skin/makeup finish |
| GRWM | Skin Concern | Apply to relevant area | Targeted application |
| GRWM | Makeup Look | Build look progressively | Finished look |
| GRWM | Routine | Sequential product use | Routine order |
| GRWM | Transformation | Reveal before → finished state | Visible change |
| Tutorial | Shade / Color | Demonstrate shade application | Color on skin |
| Tutorial | Texture | Demonstrate consistency/application | Texture |
| Tutorial | Finish | Show result under natural movement/light | Finish |
| Tutorial | Skin Concern | Explain and demonstrate targeted use | Relevant area |
| Tutorial | Makeup Look | Apply steps | Makeup progression |
| Tutorial | Routine | Show ordered steps | Routine |
| Tutorial | Transformation | Demonstrate change | Before/after |
| Product Application | Shade / Color | Apply controlled amount | Shade on skin |
| Product Application | Texture | Spread/blend product | Texture behavior |
| Product Application | Finish | Show settled result | Finish |
| Product Application | Skin Concern | Apply to target area | Targeted use |
| Product Application | Makeup Look | Build a specific feature | Makeup result |
| Product Application | Routine | Use within routine | Product sequence |
| Product Application | Transformation | Show immediate visual change | Result |
| Before / After | Shade / Color | Compare color result | Color difference |
| Before / After | Texture | Compare product texture/result | Texture difference |
| Before / After | Finish | Compare finish | Finish difference |
| Before / After | Skin Concern | Compare visible state | Relevant area |
| Before / After | Makeup Look | Compare makeup state | Look transformation |
| Before / After | Routine | Compare routine state | Routine outcome |
| Before / After | Transformation | Clear visual reveal | Transformation |
| Talking Head | Shade / Color | Speak while showing product/result | Shade visibility |
| Talking Head | Texture | Discuss while demonstrating | Texture evidence |
| Talking Head | Finish | Describe while showing result | Finish |
| Talking Head | Skin Concern | Explain use without unsupported claims | Relevant demonstration |
| Talking Head | Makeup Look | Explain look | Finished look |
| Talking Head | Routine | Explain sequence | Product visibility |
| Talking Head | Transformation | Explain visible change | Before/after evidence |
| Close-Up Demo | Shade / Color | Close framing of application | Color detail |
| Close-Up Demo | Texture | Macro-ish product/application view | Texture detail |
| Close-Up Demo | Finish | Close result view | Finish detail |
| Close-Up Demo | Skin Concern | Close target-area demonstration | Application |
| Close-Up Demo | Makeup Look | Detail application | Makeup detail |
| Close-Up Demo | Routine | Show product step | Routine detail |
| Close-Up Demo | Transformation | Close before/after result | Visible change |
| Routine | Shade / Color | Use product in sequence | Shade |
| Routine | Texture | Apply during routine | Texture |
| Routine | Finish | Show result after routine | Finish |
| Routine | Skin Concern | Targeted routine action | Relevant use |
| Routine | Makeup Look | Build look | Makeup |
| Routine | Routine | Sequential use | Routine |
| Routine | Transformation | Reveal final state | Change |
| First Impression | Shade / Color | Inspect, react, then apply/show | Genuine-looking reaction |
| First Impression | Texture | Inspect texture before use | Texture |
| First Impression | Finish | Observe result | Finish |
| First Impression | Skin Concern | Try product without unsupported claim | Application |
| First Impression | Makeup Look | Try and inspect look | Look |
| First Impression | Routine | Insert product into routine | Routine |
| First Impression | Transformation | React to visible result | Change |
| POV | Shade / Color | First-person product/application | Color |
| POV | Texture | First-person inspection/application | Texture |
| POV | Finish | First-person result view | Finish |
| POV | Skin Concern | First-person targeted use | Application |
| POV | Makeup Look | First-person makeup action | Look |
| POV | Routine | First-person routine | Sequence |
| POV | Transformation | First-person reveal | Change |

## Home Matrix

| Format | Angle | Primary Behavior | Typical Visual Evidence |
|---|---|---|---|
| Product Showcase | Space Improvement | Place product into space | Improved placement |
| Product Showcase | Organization | Arrange items with product | Order |
| Product Showcase | Convenience | Use product for a simple task | Easier action |
| Product Showcase | Aesthetic Upgrade | Place and reveal | Visual improvement |
| Product Showcase | Problem Solving | Demonstrate solution | Problem → product response |
| Product Showcase | Functionality | Operate product | Functional feature |
| Product Showcase | Before / After | Reveal changed space | Visible transformation |
| Room Makeover | Space Improvement | Rearrange or add product | Spatial change |
| Room Makeover | Organization | Organize with product | Organized state |
| Room Makeover | Convenience | Improve workflow | Practical use |
| Room Makeover | Aesthetic Upgrade | Add product and reveal | Aesthetic change |
| Room Makeover | Problem Solving | Address visible problem | Solution |
| Room Makeover | Functionality | Use functional feature | Feature in action |
| Room Makeover | Before / After | Clear room-state transition | Transformation |
| Before / After | Space Improvement | Compare spatial states | Space difference |
| Before / After | Organization | Compare order | Organization difference |
| Before / After | Convenience | Compare task state | Easier workflow |
| Before / After | Aesthetic Upgrade | Compare appearance | Aesthetic difference |
| Before / After | Problem Solving | Show problem resolved | Solution evidence |
| Before / After | Functionality | Show feature result | Functional evidence |
| Before / After | Before / After | Direct state comparison | Transformation |
| Lifestyle | Space Improvement | Use product naturally at home | Context |
| Lifestyle | Organization | Everyday organizing | Order |
| Lifestyle | Convenience | Routine task | Practical use |
| Lifestyle | Aesthetic Upgrade | Natural placement | Visual context |
| Lifestyle | Problem Solving | Solve a routine annoyance | Solution |
| Lifestyle | Functionality | Use product normally | Feature |
| Lifestyle | Before / After | Natural state change | Transformation |
| POV | Space Improvement | First-person placement | Spatial result |
| POV | Organization | First-person organizing | Order |
| POV | Convenience | First-person task | Practical use |
| POV | Aesthetic Upgrade | First-person reveal | Visual change |
| POV | Problem Solving | First-person solution | Problem solved |
| POV | Functionality | First-person operation | Feature |
| POV | Before / After | First-person transformation | State change |
| Problem → Solution | Space Improvement | Show problem then product solution | Spatial evidence |
| Problem → Solution | Organization | Show clutter then organize | Order |
| Problem → Solution | Convenience | Show friction then simplify | Workflow |
| Problem → Solution | Aesthetic Upgrade | Show dull/problem area then improve | Appearance |
| Problem → Solution | Problem Solving | Explicit problem and response | Solution |
| Problem → Solution | Functionality | Demonstrate relevant feature | Function |
| Problem → Solution | Before / After | Show problem state then result | Transformation |
| Unboxing | Space Improvement | Remove and place product | Placement |
| Unboxing | Organization | Unbox then organize | Order |
| Unboxing | Convenience | Unbox then demonstrate use | Utility |
| Unboxing | Aesthetic Upgrade | Unbox then reveal placement | Aesthetic |
| Unboxing | Problem Solving | Unbox then address problem | Solution |
| Unboxing | Functionality | Unbox then operate | Feature |
| Unboxing | Before / After | Unbox then show changed state | Transformation |
| Product Demo | Space Improvement | Demonstrate placement/use | Spatial evidence |
| Product Demo | Organization | Demonstrate organizing function | Order |
| Product Demo | Convenience | Demonstrate task improvement | Utility |
| Product Demo | Aesthetic Upgrade | Demonstrate visual change | Appearance |
| Product Demo | Problem Solving | Demonstrate solution | Problem solved |
| Product Demo | Functionality | Operate key feature | Function |
| Product Demo | Before / After | Demonstrate state change | Transformation |
| Routine | Space Improvement | Use product in recurring routine | Context |
| Routine | Organization | Organize during routine | Order |
| Routine | Convenience | Simplify recurring task | Utility |
| Routine | Aesthetic Upgrade | Add product naturally | Appearance |
| Routine | Problem Solving | Address recurring issue | Solution |
| Routine | Functionality | Use key feature in routine | Function |
| Routine | Before / After | Show routine state change | Transformation |

## Matrix Output Rule

The matrix should produce a **behavioral direction**, not a copywriting slogan.

For every selected Format × Angle pair, convert:

**Format behavior + Angle evidence + Product interaction + Duration + Scene count**

into a scene sequence.

Example:

**Fashion / Silent Mirror Selfie / Fit Check**

→ inspect outfit → slight body turn → small garment adjustment → final mirror view

The exact sequence may change based on the product, but the visual evidence must still prove the selected angle.


# Scene Behavior Library

The Scene Behavior Library converts a selected Format × Angle direction into a sequence of believable scene states.

The library is a generation framework, not a fixed storyboard. Product type, campaign objective, duration, and scene count determine the final sequence.

## Scene Design Rules

Every scene has:

- Purpose — why the scene exists
- State — what is visibly true at that moment
- Action — what the creator is doing
- Product State — how the product is positioned or being used
- Behavior Cue — small human behavior that makes the action believable
- Camera State — approximate phone position and framing
- Continuity Lock — attributes that must remain unchanged
- Transition Intent — what naturally changes toward the next scene

A scene should contain one dominant action. Avoid packing multiple unrelated actions into a single short scene.

## Universal Scene Patterns

### Reveal

Use when the product or final result is initially hidden.

context → reveal → inspect → reaction

### Demonstration

Use when the product's function or appearance needs to be shown.

setup → interaction → visible result

### Problem → Solution

Use when the angle depends on solving a visible problem.

problem state → product interaction → improved state

### Transformation

Use for Before / After and makeover-style content.

before state → transition action → after state

### Inspection

Use for fit, texture, finish, detail, and first-impression content.

initial view → inspect / interact → closer evidence → reaction

### Routine

Use when the product naturally belongs inside a repeated activity.

routine context → product use → completed routine

### Selection

Use when the creator chooses among items or prepares a look.

options → selection → use → result

## Scene Count Adaptation

### 1 Scene

Use one complete visual beat.

Structure:

context + action + evidence

Do not attempt a full transformation or multi-step tutorial in one scene.

### 2 Scenes

Use:

setup → result

or:

before → after

or:

interaction → reaction

### 3 Scenes

Default structure:

setup → interaction → result

This is the preferred structure for many 6–8 second UGC concepts.

### 4 Scenes

Use:

hook → interaction → detail / proof → result

Keep each action extremely simple.

### 5 Scenes

Use:

hook → setup → interaction → detail / reaction → result

Five scenes should only be used when the actions can remain visually simple. More scenes do not automatically create better content.

## Duration Adaptation

Approximate pacing guidance:

| Duration | Scene Count | Behavior Density |
|---|---:|---|
| 4 sec | 1–2 | One clear action |
| 6 sec | 2–3 | Simple sequence |
| 8 sec | 3–4 | Demonstration or reveal |
| 10 sec | 4–5 | Short narrative sequence |

If the requested combination exceeds realistic human movement speed, reduce behavior density before adding more visual complexity.

## Scene State Model

Track these states across scenes.

### Creator State

- Position
- Orientation
- Pose
- Facial expression
- Hand position
- Hair state
- Clothing state
- Makeup state

### Product State

- Location
- Orientation
- Held / worn / placed state
- Open / closed state
- Applied / unapplied state
- Visible features
- Interaction state

### Environment State

- Location
- Major object placement
- Lighting direction
- Background geometry
- Relevant environmental movement

### Camera State

- Phone position
- Orientation
- Framing
- Approximate distance
- Perspective
- Handheld / supported state

A transition may change a state only when the movement between the two scenes explains the change.

## Transition Patterns

### Body Transition

neutral stance → weight shift → turn → new stance

Use for fashion and mirror content.

### Hand Transition

hand at rest → reach → grip → interact → release / reposition

Use for product demonstrations and routines.

### Camera Transition

stable frame → slight handheld reframing → new composition

Use when a creator naturally repositions a phone.

Avoid unexplained camera jumps.

### Product Transition

visible → picked up → used → placed

or:

worn → adjusted → inspected

or:

closed → opened → used

Every product-state change must have a plausible physical cause.

### Facial Transition

neutral → attention → subtle reaction

Avoid exaggerated expression changes unless explicitly requested.

## Silent Behavior Patterns

Silent formats should use visible intention rather than empty posing.

Useful patterns:

- Notice → inspect → react
- Pick up → inspect → use
- Look → adjust → reveal
- Reach → place → step back → inspect
- Compare → choose → use
- Before → interact → after

Choose the smallest sequence that communicates the angle.

## Spoken Behavior Patterns

For talking formats, visual behavior supports the spoken point.

Use:

look at camera → speak → demonstrate / gesture → finish

The creator should not perform complex physical actions while delivering dense dialogue.

Voice Identity controls how the speech sounds. Scene Behavior controls what the creator visibly does.

## Niche Behavior Priorities

### Fashion

Prefer:

- mirror inspection
- small body turns
- garment adjustments
- natural walking
- accessory interaction
- looking at fit rather than posing continuously

Avoid:

- runway behavior
- exaggerated model poses
- unexplained outfit changes

### Beauty

Prefer:

- product pickup
- opening / closing packaging
- controlled application
- mirror inspection
- subtle facial reaction
- showing finish under plausible light

Avoid:

- impossible application paths
- excessive face movement
- instant unexplained makeup transformations

### Home

Prefer:

- reaching
- placing
- organizing
- operating
- stepping back to inspect
- ordinary household movement

Avoid:

- objects appearing from nowhere
- impossible object movement
- room geometry changes between scenes

## Scene Behavior Output

For every planned scene, internally resolve:

Scene Purpose → Scene State → Action → Product State → Behavior Cue → Camera State → Continuity Lock → Transition Intent

Then use that resolved state to build the Image Prompt.

For every consecutive pair, use:

Starting State + Physical Action + Ending State

to build the Frame-to-Frame Video Prompt.

Do not generate the Image Prompt and Video Prompt independently. Both must derive from the same scene state model.


## Validation Rules & Test Matrix

The skill must validate generated content against the same contracts used to plan and assemble it. Validation is a required execution stage, not a cosmetic review step.

### Validation Principles

1. Validate structure before style.
2. Validate factual support before creative polish.
3. Validate continuity across scenes, not only individual prompts.
4. Validate format and angle compatibility.
5. Validate physical causality for state changes.
6. Validate output counts deterministically.
7. Reject unsupported details instead of silently inventing them.
8. A prompt that looks good but violates the contract is invalid.

### Input Validation Tests

| Test | Rule | Result |
|---|---|---|
| Niche | Must be Fashion, Beauty, or Home | Pass / Fail |
| Product | Product name is required | Pass / Fail |
| Product URL | Retrieve when provided; do not invent product facts when absent | Pass / Fail |
| Campaign Objective | Must be one of the supported objectives or explicitly custom | Pass / Fail |
| Campaign Stage | Awareness, Consideration, or Conversion | Pass / Fail |
| CTA | Must match the supplied CTA option or custom CTA | Pass / Fail |
| Creator | Must resolve to a creator in Creator Library | Pass / Fail |
| Format | Must be supported by the selected niche | Pass / Fail |
| Angle | Must be supported by the selected niche | Pass / Fail |
| Duration | Must be supported or explicitly custom | Pass / Fail |
| Scene Count | Must be supported or explicitly custom | Pass / Fail |
| Platform | Must be one or more supported platforms | Pass / Fail |

### Format × Angle Validation

Before generation, check the selected Format × Angle pair against the niche matrix.

- Supported pair → continue.
- Unsupported pair with an obvious adjacent interpretation → normalize only when the intended meaning remains unambiguous.
- Unsupported pair with unclear intent → flag the combination instead of inventing a creative interpretation.

The validator must never treat every combination as valid merely because both values exist independently.

### Duration × Scene Count Validation

Use the approximate planning ranges as defaults:

| Duration | Typical Scene Count |
|---|---:|
| 4 sec | 1–2 |
| 6 sec | 2–3 |
| 8 sec | 3–4 |
| 10 sec | 4–5 |

Rules:

- A value inside the typical range → valid.
- A value slightly outside the range → valid only when the scene plan remains physically and temporally plausible.
- A value that requires impossible pacing or excessive scene changes → invalid.
- Custom duration or scene count must still satisfy temporal plausibility.

### Output Count Tests

For N scenes:

- Image Prompts = N
- Video Prompts = N - 1
- Scene Plan entries = N
- Each Image Prompt maps to exactly one scene.
- Each Video Prompt maps to exactly one consecutive scene pair.
- Spoken Script exists only when speech is used.
- Silent Behavior Script exists only for silent formats.

### Scene Contract Tests

Every scene must contain:

- Purpose
- State
- Creator Action
- Product Interaction
- Behavior Cue
- Environment
- Camera State
- Continuity Lock
- Transition Intent

Every scene must describe a single visual state.

Reject a scene when it:

- contains multiple future actions as if they already happened,
- changes identity without cause,
- introduces unsupported product attributes,
- breaks environment continuity,
- requires an impossible physical state.

### Image Prompt Tests

Every Image Prompt must:

- identify the same creator identity package,
- preserve locked character attributes,
- preserve locked product attributes,
- represent exactly one scene state,
- include only visible or inferable visual information,
- preserve relevant environment and wardrobe continuity,
- express the selected UGC visual language,
- avoid cinematic or commercial polish unless explicitly requested.

Reject when:

- a future action is embedded as a current state,
- product identity changes,
- creator identity changes,
- visual details contradict the scene state,
- unsupported product facts are introduced.

### Video Prompt Tests

Every Video Prompt must:

- start from the exact preceding Image Prompt state,
- describe a physical transition,
- explain the movement causing the state change,
- preserve character identity,
- preserve product identity,
- preserve relevant wardrobe and environment state,
- preserve material and interaction physics,
- end at the exact next Image Prompt state.

Reject when:

- the ending state cannot result from the described movement,
- an object teleports, floats, duplicates, or changes size without cause,
- the camera transition contradicts the stated camera state,
- the creator changes identity,
- the product changes identity,
- a scene transition relies on unexplained magic or hard discontinuity.

### Human Realism Tests

#### Fashion

Check:

- anatomy
- pose
- garment fit
- fabric folds
- garment movement
- mirror reflection
- smartphone framing
- natural movement

#### Beauty

Check:

- skin texture
- facial anatomy
- hand anatomy
- application path
- product texture
- makeup state
- reflection
- lighting on skin

#### Home

Check:

- object scale
- room geometry
- object placement
- shadows
- material behavior
- interaction physics
- lighting continuity

### Consistency Tests

Track the following state across scenes:

#### Character

- identity
- face
- hair
- skin
- body
- style
- wardrobe

#### Voice

When speech is used:

- voice characteristics
- tone
- pitch
- speaking style
- speech pace
- accent
- energy

#### Product

- identity
- visible design
- color
- material
- shape
- size
- relevant state
- functional parts

#### Environment

- room or location
- geometry
- major objects
- lighting
- camera orientation
- relevant object placement

A change is valid only when it is explicitly caused by a scene action, interaction, or intentional camera/environment transition.

### Silent vs Spoken Validation

#### Silent Format

Must:

- contain no dialogue,
- contain no voice-over,
- contain no lip-sync instruction,
- use visible behavior as the communication mechanism,
- include a Silent Behavior Script.

#### Spoken Format

Must:

- use the Creator's Voice Identity,
- keep dialogue separate from visual prompts,
- fit the selected duration,
- avoid unsupported product claims,
- keep spoken claims consistent with visible evidence.

### CTA Validation

CTA behavior must match the selected CTA.

- None → no CTA behavior.
- Soft CTA → subtle end-state emphasis is allowed.
- Check the Product / View Product → product visibility or attention may be emphasized.
- Shop Now → direct shopping-oriented behavior may be used.
- Learn More → informational framing may be used.
- Custom CTA → use only the supplied instruction.

CTA must not override the selected format's natural behavior or turn ordinary UGC into an unsolicited advertisement.

### Unsupported Detail Validation

The validator must distinguish:

- supplied product facts,
- retrieved product facts,
- creator identity facts,
- creative inference,
- unsupported invention.

Only the first four may enter the generation. Unsupported invention must be removed or explicitly marked as unavailable.

Examples of invalid invention:

- naming an unprovided product shade,
- claiming a material not supplied or retrieved,
- inventing a creator's physical features,
- inventing product performance,
- adding logos or packaging details not supported by the source.

### Severity Levels

#### Blocker

Generation must stop.

Examples:

- missing required input,
- unresolved creator,
- invalid format,
- impossible scene count,
- contradictory product identity,
- broken scene continuity,
- unsupported factual claim presented as fact.

#### Warning

Generation may continue, but the issue must be corrected or explicitly acknowledged.

Examples:

- scene count outside the typical range but still plausible,
- CTA weakly aligned with the scene,
- minor camera continuity drift,
- optional visual detail missing.

#### Pass

The output satisfies the relevant contract without unresolved contradictions.

### Validation Matrix

| Area | Check | Severity |
|---|---|---|
| Input | Required fields present | Blocker |
| Input | Supported niche | Blocker |
| Input | Creator resolves | Blocker |
| Input | Format supported by niche | Blocker |
| Input | Angle supported by niche | Blocker |
| Planning | Duration / scene count plausible | Warning / Blocker |
| Planning | Scene state is single-state | Blocker |
| Image | One prompt per scene | Blocker |
| Image | Character consistency | Blocker |
| Image | Product consistency | Blocker |
| Image | UGC realism | Warning / Blocker |
| Video | One prompt per transition | Blocker |
| Video | Physical causality | Blocker |
| Video | Start/end state continuity | Blocker |
| Video | Material / interaction physics | Blocker |
| Speech | Voice Identity applied | Blocker when speech is used |
| Speech | Dialogue separated from visual prompts | Blocker |
| Silent | No speech or lip-sync | Blocker |
| CTA | CTA behavior matches input | Warning |
| Facts | No unsupported product claims | Blocker |
| Output | Exact count contract satisfied | Blocker |

### Validation Pass Order

Run validation in this order:

1. Input Validation
2. Format × Angle Validation
3. Duration × Scene Count Validation
4. Scene Contract Validation
5. Image Prompt Validation
6. Video Prompt Validation
7. Human Realism Validation
8. Character / Voice / Product / Environment Consistency Validation
9. CTA Validation
10. Unsupported Detail Validation
11. Output Count Validation
12. Final Pass / Warning Report

Do not polish a generation that still contains a blocker.

### Validation Report

The validator should return:

- Status: Pass / Warning / Blocked
- Blockers
- Warnings
- Corrective Actions
- Contract Checks
- Output Counts
- Continuity Checks

A concise report is preferred over a long narrative. Validation exists to catch failure modes, not to write another essay about them.

### Fixture Coverage

The current example fixtures provide minimum regression coverage:

| Fixture | Niche | Format | Key Tests |
|---|---|---|---|
| examples/fashion-silent-mirror-selfie.md | Fashion | Silent Mirror Selfie | silent behavior, mirror continuity, garment consistency |
| examples/beauty-product-application.md | Beauty | Product Application | spoken script separation, application physics, shade consistency |
| examples/home-problem-solution.md | Home | Problem → Solution | object placement, physical causality, room continuity |

Every future change to the execution contract should be checked against all fixtures to prevent regressions.


## Runtime Execution Specification

This section defines how the skill behaves when it receives a real generation request. The runtime must follow the execution order below rather than jumping directly from user input to prompt writing.

### Runtime Objective

Transform a validated UGC request into:

1. A creative concept.
2. A scene state model.
3. One Image Prompt per scene.
4. One Frame-to-Frame Video Prompt per consecutive scene pair.
5. A Spoken Script when speech is used.
6. A Silent Behavior Script when the format is silent.
7. A final validation report.

The runtime must preserve the same source-of-truth state across planning, image generation, video generation, and validation.

### Runtime Pipeline

```text
User Input
    ↓
Normalize Input
    ↓
Validate Required Input
    ↓
Retrieve Product Intelligence
    ↓
Retrieve Creator Identity
    ↓
Resolve Format × Angle
    ↓
Resolve Duration × Scene Count
    ↓
Build Creative Concept
    ↓
Build Scene State Model
    ↓
Build Content Behavior
    ↓
Assemble Image Prompts
    ↓
Assemble Video Prompts
    ↓
Assemble Speech / Silent Behavior
    ↓
Run Validation
    ↓
Repair Blockers
    ↓
Run Validation Again
    ↓
Return Final Output
```

### Stage 1 — Normalize Input

Normalize user input before creative reasoning.

Normalization includes:

- map equivalent niche names to the supported niche vocabulary,
- normalize capitalization and spacing,
- normalize CTA names,
- normalize duration values into seconds,
- normalize scene count into an integer or Auto,
- normalize platform names,
- preserve user-provided product facts exactly,
- preserve explicit custom instructions.

Normalization must not add missing facts.

Example:

- "fashion" → Fashion
- "6 sec" → 6 sec
- "mirror selfie" → Silent Mirror Selfie only when the surrounding intent clearly indicates a silent mirror format
- "no CTA" → None

When intent remains ambiguous, keep the ambiguity visible rather than guessing.

### Stage 2 — Validate Required Input

Run the Input Validation Tests.

If a Blocker exists:

- stop generation,
- identify the missing or invalid field,
- state the minimum correction required,
- do not fabricate a value.

If the user supplied a valid Custom value, preserve it and validate its downstream implications.

### Stage 3 — Retrieve Product Intelligence

If a Product URL is supplied:

1. Retrieve the product information.
2. Extract only relevant product facts.
3. Separate retrieved facts from creative interpretation.
4. Ignore unsupported marketing claims unless the source explicitly supports them.
5. Use the retrieved product information as the Product Identity source of truth.

If no Product URL is supplied:

- use only product facts supplied by the user,
- mark unavailable attributes as unknown,
- do not invent packaging, material, shade, dimensions, ingredients, performance, or branding.

Product retrieval failure is not permission to hallucinate product details.

### Stage 4 — Retrieve Creator Identity

Resolve the Creator against the Creator Library.

For Rositasari:

- retrieve Character Identity,
- retrieve Character Reference when available,
- retrieve Voice Identity when speech is used,
- retrieve Voice Reference when available.

Do not invent missing identity attributes.

Character Identity is required for visual continuity.

Voice Identity is required only when speech or voice-over is used.

### Stage 5 — Resolve Format × Angle

Use the selected niche's Format × Angle Matrix.

Decision order:

1. Check exact pair.
2. If unsupported, check whether the user's intent clearly maps to a supported adjacent pair.
3. If the mapping is unambiguous, normalize to that supported pair.
4. If not unambiguous, block generation and report the invalid combination.

Do not silently substitute a different format or angle.

### Stage 6 — Resolve Duration × Scene Count

Use the default duration-to-scene ranges.

If Scene Count is Auto:

- select the smallest scene count that can express the intended creative behavior,
- keep the count within the typical range when possible,
- increase count only when the selected format or angle requires additional state changes.

If both duration and scene count are custom:

- test temporal plausibility,
- reject combinations that require physically impossible pacing.

The runtime should prefer fewer meaningful scenes over many shallow scenes.

### Stage 7 — Build Creative Concept

Create one concise creative concept from:

- niche,
- product,
- campaign objective,
- campaign stage,
- CTA,
- creator,
- format,
- angle,
- duration,
- platform.

The concept must explain the observable content behavior, not hidden reasoning.

A valid concept answers:

- What happens?
- What does the viewer notice?
- What product evidence is visible?
- Why does the selected format fit the behavior?

Do not turn the concept into a long script.

### Stage 8 — Build Scene State Model

Create the complete scene state model before writing prompts.

For each scene define:

- Creator State
- Product State
- Environment State
- Camera State
- Creator Action
- Product Interaction
- Behavior Cue
- Transition Intent

Scene N+1 must be reachable from Scene N.

Every meaningful state change must have a cause.

### Stage 9 — Build Content Behavior

Translate the scene state model into observable human behavior.

Use:

- micro-movements,
- natural pauses,
- hand repositioning,
- weight shifts,
- eye direction,
- facial reactions,
- object handling,
- ordinary smartphone movement.

Behavior must remain appropriate to the selected format.

For silent formats:

- communicate through visible behavior,
- use the Silent Behavior Script,
- do not introduce speech.

For spoken formats:

- create a compact Spoken Script,
- preserve conversational delivery,
- use Voice Identity,
- keep dialogue separate from visual prompts.

### Stage 10 — Assemble Image Prompts

For each scene, assemble exactly one Image Prompt.

Use this order:

1. Character Identity
2. Product Identity
3. Action and Visible Behavior
4. Environment
5. Camera and Composition
6. Lighting
7. UGC Realism and Continuity

The Image Prompt describes only the target visual state.

Do not include future actions such as "then she turns" or "will apply next."

### Stage 11 — Assemble Video Prompts

For each consecutive scene pair, assemble exactly one Frame-to-Frame Video Prompt.

Use this order:

1. Starting Frame Anchor
2. Physical Transition
3. Human Movement
4. Facial Movement
5. Product and Material Physics
6. Camera Movement
7. Environment Movement
8. Ending Frame Anchor
9. Continuity Constraints

The Video Prompt must describe how the starting state physically becomes the ending state.

### Stage 12 — Assemble Speech / Silent Behavior

#### Spoken

Generate the Spoken Script separately from the visual prompts.

Requirements:

- duration-fit,
- conversational,
- consistent with Voice Identity,
- grounded in visible or retrieved facts,
- no unsupported product claims.

#### Silent

Generate the Silent Behavior Script as a compact behavioral sequence.

Example:

`notice → inspect → adjust → reveal`

Do not add dialogue, VO, lip-sync, or implied speech instructions.

### Stage 13 — Run Validation

Run the complete Validation Pass Order.

Collect:

- Blockers
- Warnings
- Contract Checks
- Output Counts
- Continuity Checks

Do not return a final generation while a Blocker remains.

### Stage 14 — Repair Blockers

Repair only the failed contract.

Examples:

- Wrong prompt count → regenerate output structure.
- Character drift → restore Character Identity Lock.
- Product drift → restore Product Identity.
- Impossible transition → rebuild the affected scene transition.
- Unsupported claim → remove the claim.
- Silent format contains speech → remove speech and preserve behavioral communication.

Do not regenerate unrelated sections when a local repair is sufficient.

### Stage 15 — Revalidate

After any repair:

1. rerun the affected validation checks,
2. rerun the complete validation pass when the repair affects continuity or structure,
3. stop only when no Blocker remains.

Warnings may remain only when they do not violate the execution contract.

### Stage 16 — Return Final Output

Return output in this order:

1. Creative Summary
2. Scene Plan
3. Image Prompts
4. Frame-to-Frame Video Prompts
5. Spoken Script when applicable
6. Silent Behavior Script when applicable
7. Validation Report

Do not expose hidden reasoning or internal chain-of-thought.

### Runtime Decision Rules

#### Missing Product URL

Proceed only with supplied product facts.

#### Missing Creator Reference

Proceed using the Creator Identity fields that exist, but do not invent visual details.

#### Unsupported Format

Block unless an unambiguous normalization to a supported format exists.

#### Unsupported Angle

Block unless an unambiguous normalization to a supported angle exists.

#### Impossible Duration / Scene Count

Block or reduce the scene count only when Scene Count was Auto. Never silently override an explicit user-provided count.

#### Product Retrieval Failure

Proceed with supplied facts only and mark unavailable product attributes as unknown.

#### Conflicting User Instructions

Prioritize:

1. explicit current request,
2. required execution contract,
3. niche rules,
4. default behavior.

Never violate a hard consistency or factual-support rule merely to satisfy a stylistic preference.

### Runtime Anti-Patterns

Do not:

- jump directly to prompt generation,
- invent product facts to make a prompt richer,
- redesign the creator per scene,
- generate video prompts independently from image states,
- add dialogue to silent formats,
- use dialogue as a substitute for visual product evidence,
- create unnecessary scene changes,
- hide unsupported assumptions inside polished language,
- regenerate the entire output for a local validation failure,
- expose internal reasoning as final output.

### Runtime Invariants

The following must remain true throughout execution:

- One creator identity package per generation.
- One product identity source of truth per generation.
- One environment continuity model per generation unless a deliberate transition is planned.
- One scene state model shared by image and video generation.
- One validation contract shared across all outputs.
- No unsupported factual invention.
- Every state change has a physical or intentional cause.
- Every final prompt maps to a defined scene state.


## Input Schema & Request Contract

The runtime accepts a structured UGC generation request. The schema below defines the canonical request contract before normalization.

### Request Object

| Field | Type | Required | Allowed / Default |
|---|---|---:|---|
| niche | enum | Yes | Fashion / Beauty / Home |
| product | object | Yes | Product Name + optional Product URL |
| campaign | object | Yes | Objective + Stage + CTA |
| creator | enum | Yes | Rositasari |
| content | object | Yes | Format + Angle + Duration + Scene Count |
| platform | array | Yes | TikTok / Instagram Reels / Facebook Reels / Shopee Video |

### Product Object

| Field | Type | Required | Notes |
|---|---|---:|---|
| product_name | string | Yes | Human-readable product name |
| product_url | string | No | Retrieved when supplied |
| product_facts | object | No | User-supplied product facts; preserve as source facts |

Rules:

- product_name cannot be empty.
- product_url is a retrieval source, not proof that every marketing claim on the page is factual.
- product_facts may contain only facts explicitly supplied by the user.
- Do not silently replace user-supplied product facts with retrieved claims when they conflict. Preserve the conflict for validation.

### Campaign Object

| Field | Type | Required | Allowed |
|---|---|---:|---|
| objective | enum | Yes | Product Awareness / Product Discovery / Product Consideration / Affiliate Conversion / Product Launch / Product Education / Brand / Product Introduction |
| stage | enum | Yes | Awareness / Consideration / Conversion |
| cta | enum or string | Yes | None / Soft CTA / Check the Product / Shop Now / View Product / Learn More / Custom CTA |

Rules:

- Objective and Stage are independent but must remain semantically plausible.
- cta may be a supported option or a custom string.
- Custom CTA must be preserved exactly before validation.

### Creator Field

creator must resolve to an entry in Creator Library.

Current supported creator:

- Rositasari

Creator resolution must load:

- Character Identity
- Character Reference when available
- Voice Identity when speech is used
- Voice Reference when available

Do not infer missing creator identity attributes from the creator name.

### Content Object

| Field | Type | Required | Allowed / Default |
|---|---|---:|---|
| format | enum | Yes | Niche-specific |
| angle | enum | Yes | Niche-specific |
| duration_sec | integer | Yes | 4 / 6 / 8 / 10, or custom integer |
| scene_count | integer or Auto | Yes | Auto / 1–5, or custom integer when explicitly supported |
| custom_instructions | string | No | Preserved exactly |

### Fashion Format Values

- Silent Mirror Selfie
- Outfit Showcase
- Try-On
- GRWM
- Talking Head
- POV
- Lifestyle
- Before / After

### Fashion Angle Values

- Outfit Inspiration
- Styling
- Fit Check
- Occasion-Based
- Trend
- Wardrobe Essential

### Beauty Format Values

- GRWM
- Tutorial
- Product Application
- Before / After
- Talking Head
- Close-Up Demo
- Routine
- First Impression
- POV

### Beauty Angle Values

- Shade / Color
- Texture
- Finish
- Skin Concern
- Makeup Look
- Routine
- Transformation

### Home Format Values

- Product Showcase
- Room Makeover
- Before / After
- Lifestyle
- POV
- Problem → Solution
- Unboxing
- Product Demo
- Routine

### Home Angle Values

- Space Improvement
- Organization
- Convenience
- Aesthetic Upgrade
- Problem Solving
- Functionality
- Before / After

### Platform Field

Supported platforms:

- TikTok
- Instagram Reels
- Facebook Reels
- Shopee Video

Rules:

- At least one platform is required.
- Multiple platforms may be selected.
- Platform selection does not change the core scene state.
- Platform-specific output constraints may be applied later without changing product or creator identity.

### Cross-Field Dependencies

#### Niche → Format

content.format must belong to the selected niche.

#### Niche → Angle

content.angle must belong to the selected niche.

#### Format → Speech

Formats that do not inherently require speech may still use speech when the content design explicitly calls for it.

Silent formats must not contain spoken dialogue or voice-over.

#### Creator → Voice

Voice Identity is required only when speech or voice-over is used.

#### Duration → Scene Count

Default planning ranges:

- 4 sec → 1–2 scenes
- 6 sec → 2–3 scenes
- 8 sec → 3–4 scenes
- 10 sec → 4–5 scenes

These are planning defaults, not absolute mathematical limits. Physical plausibility remains the final constraint.

#### Campaign → CTA

CTA behavior must remain compatible with the campaign objective and selected format.

The runtime must not invent a CTA when cta = None.

### Minimal Valid Request

A request is structurally valid when it contains:

- supported niche,
- product name,
- campaign objective,
- campaign stage,
- CTA,
- supported creator,
- supported format,
- supported angle,
- duration,
- scene count,
- at least one platform.

### Canonical Request Example

    niche: Fashion

    product:
      product_name: Example everyday knit top
      product_url: null
      product_facts:
        color: neutral
        use_case: everyday outfit

    campaign:
      objective: Product Discovery
      stage: Consideration
      cta: View Product

    creator: Rositasari

    content:
      format: Silent Mirror Selfie
      angle: Fit Check
      duration_sec: 6
      scene_count: 3
      custom_instructions: "Keep the content casual and phone-shot."

    platform:
      - TikTok

### Invalid Request Examples

#### Invalid Creator

    creator: Unknown Creator

Result: Blocker. Creator cannot be resolved from Creator Library.

#### Invalid Niche / Format Pair

    niche: Beauty
    content:
      format: Silent Mirror Selfie

Result: Blocker unless the runtime can make an unambiguous normalization supported by the contract.

#### Unsupported Product Claim

    product:
      product_name: Example lip product
      product_facts:
        claim: "guarantees all-day wear"

Result: The claim must not be presented as independently verified unless supported by retrieved or otherwise authoritative product information.

### Normalization Rules

Normalize only representation, never meaning.

Allowed:

- fashion → Fashion
- instagram reels → Instagram Reels
- 6 sec → duration_sec: 6
- auto → scene_count: Auto
- extra whitespace or capitalization differences

Not allowed:

- inventing a missing product name,
- inventing creator identity details,
- inventing product attributes,
- silently changing a user's explicit format,
- silently changing an explicit scene count,
- silently changing an explicit CTA.

### Request Validation Result

Before creative generation, the runtime should internally produce:

- normalized request,
- validation status,
- resolved niche,
- resolved format,
- resolved angle,
- resolved creator,
- resolved product source,
- resolved duration,
- resolved scene count,
- validation blockers,
- validation warnings.

Only a request without Blockers may proceed to creative planning.


## Product Intelligence & Retrieval Specification

Product Intelligence is the source-of-truth layer for product-related generation. Its purpose is to understand what the product is, what can be safely shown, what claims are supported, and which attributes remain unknown.

The runtime must never enrich a product by inventing missing facts.

### Product Source Priority

Use product information in this priority order:

1. Explicit user-provided product facts.
2. Retrieved product facts from the supplied Product URL.
3. Directly observable visual attributes from the retrieved product source.
4. Creative inference that does not introduce factual claims.
5. Unknown.

When sources conflict:

- preserve the conflict,
- prefer explicit user facts for the user's intended generation context,
- do not silently overwrite one source with another,
- flag material conflicts for validation.

### Product Retrieval Trigger

Run Product Retrieval when the product object contains a Product URL, or when the runtime has an approved product data source.

Do not attempt retrieval when no source exists.

If retrieval fails:

- continue only with supplied facts,
- mark unavailable attributes as unknown,
- do not infer missing product details from the product name alone.

### Product Intelligence Record

Build an internal Product Intelligence record containing:

| Field | Meaning |
|---|---|
| Product Name | Canonical product name |
| Source URL | Retrieval source when available |
| Brand | Explicit or retrieved brand |
| Category | Product category |
| Variant | Relevant variant, size, or version |
| Color | Supported visible or stated color |
| Material | Supported material |
| Shape / Cut | Relevant physical form |
| Size / Dimensions | Supported measurements or relative scale |
| Texture | Supported physical or cosmetic texture |
| Finish | Supported visual or cosmetic finish |
| Packaging | Supported packaging appearance |
| Functional Parts | Relevant components |
| Usage State | Closed / Open / Applied / Worn / Placed / In Use |
| Product Claims | Claims explicitly supported by source |
| Visual Reference | Product image/reference when available |
| Unknown Attributes | Missing or unresolved attributes |
| Source Notes | Provenance and conflict notes |

Only fields supported by evidence may be populated as facts.

### Fact Classification

Every product detail should be classified internally as one of:

#### Source Fact

Explicitly provided by the user.

Example:

- color: neutral
- material: cotton

#### Retrieved Fact

Supported by the supplied product source.

Example:

- packaging shape shown on the product page,
- listed material,
- listed dimensions.

#### Visual Fact

Directly observable from an available product image or reference.

Example:

- visible bottle shape,
- visible cap color,
- visible garment pattern.

Visual facts must not be expanded into unsupported specifications.

#### Creative Inference

A generation choice that does not claim to be factual.

Example:

- placing a supplied garment in an ordinary bedroom,
- choosing a natural hand position,
- selecting a plausible camera angle.

Creative inference may guide generation but must not be phrased as a product fact.

#### Unknown

The attribute is not sufficiently supported.

Example:

- exact fabric composition not supplied or retrieved,
- exact shade name not available,
- internal mechanism not visible.

Unknown attributes must remain unspecified.

### Product Claim Handling

Separate product claims from observable product properties.

Examples of claims requiring support:

- waterproof,
- long-lasting,
- clinically tested,
- hypoallergenic,
- stain resistant,
- guaranteed,
- medical or performance claims.

Do not convert a marketing statement into an independently verified fact.

When a claim is relevant to the creative:

- preserve the claim with source attribution internally,
- use it only when appropriate to the supplied campaign context,
- avoid strengthening or generalizing the claim.

### Product Identity Lock

After Product Intelligence is built, create a Product Identity Lock.

The lock should contain only the product attributes necessary for scene continuity.

#### Fashion

Lock:

- garment identity
- color
- pattern
- material when supported
- cut
- fit
- visible branding
- relevant accessories
- clothing state

#### Beauty

Lock:

- product identity
- packaging
- brand when supported
- shade / color when supported
- texture
- finish
- application state
- visible product amount when relevant

#### Home

Lock:

- product identity
- shape
- size or relative scale
- material
- color
- texture
- functional parts
- placement
- interaction state

The Product Identity Lock is carried unchanged across scenes unless a physical or intentional state transition modifies a state field.

### Product State Model

Track product state separately from product identity.

#### Identity

What the product is.

#### State

What condition the product is currently in.

Examples:

- Beauty: closed → opened → applied
- Fashion: unworn → worn → adjusted
- Home: off-desk → placed → in use

A state change must have a physical cause.

### Product Visual Consistency

Across Image Prompts and Video Prompts:

- preserve identity,
- preserve relevant appearance,
- preserve packaging or garment design,
- preserve material behavior,
- preserve scale,
- preserve functional parts,
- preserve state unless a transition changes it.

Do not regenerate the product independently per scene.

### Product Retrieval Output

The retrieval stage should produce:

1. Product Intelligence Record
2. Product Identity Lock
3. Product State Model
4. Supported Claims
5. Unknown Attributes
6. Source / Conflict Notes

These outputs become the source of truth for Creative Logic, Scene Planning, Image Prompt Assembly, Video Prompt Assembly, and Validation.

### Product Retrieval Failure Modes

#### No URL + No Product Facts

Block generation when the product cannot be identified sufficiently to support the requested content.

#### No URL + Basic Product Name

Proceed only with generic visual treatment and mark unsupported attributes as unknown.

#### URL Available + Retrieval Fails

Proceed with user-supplied facts only when they are sufficient.

#### Conflicting Sources

Do not silently resolve material conflicts. Preserve the conflict and prevent unsupported claims from entering the final prompts.

#### Product Variant Ambiguity

If multiple variants exist and the selected variant is unclear:

- use only attributes common to the available variants,
- or block when the distinction materially affects the requested content.

### Product Intelligence Anti-Patterns

Do not:

- infer exact material from appearance alone,
- infer exact shade names from generic color appearance,
- invent dimensions,
- invent ingredients,
- invent performance,
- invent packaging details,
- assume a product claim is verified merely because it appears in marketing copy,
- change product identity between scenes,
- use product name alone as evidence for detailed attributes.

### Product Intelligence Invariants

Throughout execution:

- one Product Intelligence source of truth,
- one Product Identity Lock,
- one Product State Model,
- no unsupported product claims,
- no unexplained product identity changes,
- every state change has a physical or intentional cause,
- unknown attributes remain unknown until supported.

## Creator Intelligence & Identity Lock Specification

Creator Intelligence is the source-of-truth layer for creator-related generation. Its purpose is to preserve the same human identity across scenes while separating visual identity from voice identity.

The runtime must never enrich a creator by inventing personal, physical, or vocal attributes that are not present in the Creator Library or supplied reference material.

### Creator Source Priority

Use creator information in this priority order:

1. Explicit creator identity fields in the Creator Library.
2. Character Reference or Voice Reference supplied by the creator record.
3. Directly observable attributes from an approved creator reference.
4. Creative choices that do not assert identity facts.
5. Unknown.

When sources conflict:

- preserve the conflict,
- prefer the canonical Creator Library field for identity continuity,
- do not silently overwrite identity attributes,
- flag material conflicts for validation.

The creator name itself is never evidence for appearance, voice, age, body type, ethnicity, accent, or any other identity attribute.

### Creator Identity Record

Build an internal Creator Identity record containing two independent but linked identity systems.

#### Character Identity Record

| Field | Meaning |
|---|---|
| Creator Name | Canonical creator identity |
| Age Appearance | Supported apparent age range or descriptor when provided |
| Face | Supported facial identity anchors |
| Hair | Supported hair identity anchors |
| Skin | Supported skin identity anchors |
| Body | Supported body/proportion anchors |
| Style | Supported clothing, grooming, or styling identity |
| Reference | Character Reference when available |
| Unknown Attributes | Missing or unresolved identity details |
| Source Notes | Provenance and conflict notes |

Only attributes supported by the creator source may be populated as identity facts.

#### Voice Identity Record

| Field | Meaning |
|---|---|
| Creator Name | Canonical creator identity |
| Voice Characteristics | Supported vocal identity traits |
| Tone | Supported tonal identity |
| Pitch | Supported pitch characteristics |
| Speaking Style | Supported speaking behavior |
| Speech Pace | Supported pace |
| Accent | Supported accent when provided |
| Energy | Supported vocal energy |
| Voice Reference | Voice Reference when available |
| Unknown Attributes | Missing or unresolved voice details |
| Source Notes | Provenance and conflict notes |

Voice Identity is only required when spoken dialogue or voice-over is used.

### Character Reference Handling

The Character Reference is the visual anchor for creator continuity when available.

Rules:

- use the same Character Reference across scenes whenever the generation system supports reference conditioning,
- do not regenerate the creator independently from scene to scene,
- preserve recognizable identity anchors even when pose, framing, expression, or environment changes,
- do not treat wardrobe or temporary styling as permanent identity unless the creator record defines it as such,
- do not replace a missing reference with an invented portrait.

If no Character Reference exists, use only the Character Identity fields that are actually defined.

A missing reference reduces visual anchoring strength. It does not authorize identity invention.

### Voice Reference Handling

The Voice Reference is the audio anchor for spoken continuity when available.

Rules:

- use the same Voice Reference across spoken scenes whenever supported,
- preserve Voice Identity characteristics across all spoken output,
- do not create a new vocal personality for individual scenes,
- do not infer accent, pitch, speaking style, or vocal age from the creator name,
- if no Voice Reference exists, use only the defined Voice Identity fields.

A missing Voice Reference reduces audio anchoring strength. It does not authorize voice invention.

### Character Identity Lock

After Creator Intelligence is built, create a Character Identity Lock.

The lock contains only stable visual attributes required for continuity:

- face / recognizable facial identity
- hair identity
- skin appearance when defined
- body/proportion identity when defined
- creator style when defined
- Character Reference when available

The lock must remain unchanged across scenes unless a change is explicitly supported as temporary scene state.

Examples of temporary state rather than identity:

- pose,
- facial expression,
- hand position,
- hair position caused by movement,
- wardrobe changes intentionally planned by the content,
- makeup state when the concept includes application,
- accessories added or removed as part of the scene.

A temporary state change must not mutate the underlying Character Identity Lock.

### Voice Identity Lock

When speech is used, create a Voice Identity Lock containing:

- voice characteristics,
- tone,
- pitch,
- speaking style,
- speech pace,
- accent when defined,
- energy,
- Voice Reference when available.

The Voice Identity Lock remains stable across all spoken scenes.

Changes in emotional delivery may alter expression or energy within the defined identity, but must not create a different voice persona.

### Identity vs State

Creator Identity and Creator State must remain separate.

#### Identity

Who the creator is.

Examples:

- facial identity,
- hair identity,
- stable body/proportion attributes,
- stable style,
- stable voice characteristics.

#### State

What the creator is doing or how the creator appears in the current scene.

Examples:

- standing vs sitting,
- facing mirror vs camera,
- smiling vs neutral expression,
- hand position,
- posture,
- temporary hair position,
- clothing adjustment,
- makeup application state.

State can change. Identity must not drift.

### Visual Continuity Rules

Across Image Prompts and Video Prompts:

- preserve the same Character Identity Lock,
- preserve the same Character Reference when available,
- preserve stable identity anchors,
- preserve wardrobe and styling when they are continuity-critical,
- preserve temporary appearance state unless a transition changes it,
- keep facial and body proportions stable,
- allow natural pose and expression changes,
- do not make every scene a new interpretation of the creator.

For frame-to-frame video:

- the starting frame must use the exact creator identity of the prior ending state,
- movement may change pose, expression, hair position, or hand position only when physically caused,
- the ending frame must still resolve to the same Character Identity Lock.

### Wardrobe and Appearance Continuity

Wardrobe is not automatically part of permanent creator identity.

Classify wardrobe and appearance elements as:

1. Identity-level: stable creator style explicitly defined in the Creator Library.
2. Campaign-level: selected outfit or appearance for the current generation.
3. Scene-state: temporary changes caused by action, application, or adjustment.

Campaign-level and scene-state attributes must be locked across scenes unless the scene plan deliberately changes them.

Examples:

- Fashion garment worn throughout a mirror-selfie sequence → campaign-level continuity lock.
- Hair moved behind the ear during a transition → scene-state change with physical cause.
- Makeup being applied in a Beauty routine → scene-state progression, not identity mutation.

### Spoken Content Continuity

When speech is used:

- the Spoken Script must reference the same Creator Voice Identity,
- visual prompts must not contain full dialogue,
- spoken claims must remain supported by product evidence,
- delivery can vary naturally by scene without changing the creator's voice identity,
- pronunciation or wording should not imply an unsupported accent or persona.

When the format is silent:

- do not invoke Voice Identity as a content-generation requirement,
- do not add speech, voice-over, or lip-sync,
- communicate intent through visible behavior.

### Missing Reference and Retrieval Failure Modes

#### Creator Not Found

Block generation.

The runtime cannot safely invent a creator identity from a name alone.

#### Character Identity Exists, Character Reference Missing

Proceed with the defined Character Identity fields.

Mark reference anchoring as unavailable and do not invent missing visual attributes.

#### Voice Identity Exists, Voice Reference Missing

Proceed with the defined Voice Identity fields when speech is used.

Do not invent missing vocal characteristics.

#### Character Identity Incomplete

Proceed only when the remaining fields are sufficient for the requested visual generation.

Otherwise block or request the minimum missing identity information.

#### Voice Identity Incomplete

If speech is required and the remaining fields are insufficient to maintain voice continuity, block or require the minimum missing voice information.

If the format is silent, incomplete Voice Identity does not block visual generation.

#### Conflicting Creator References

Do not silently merge materially different references.

Preserve the conflict and block when it could cause identity drift.

### Creator Identity Anti-Patterns

Do not:

- infer facial features from the creator name,
- invent body proportions,
- invent skin tone or complexion details,
- invent hair texture or style,
- invent age appearance,
- invent accent,
- invent pitch,
- invent vocal personality,
- change the creator's identity between scenes,
- use a different Character Reference per scene without an explicit reason,
- use a different Voice Reference per spoken scene without an explicit reason,
- treat a temporary pose or expression as a permanent identity change,
- use generic photorealism language as a substitute for identity anchoring.

### Creator Intelligence Output

The creator retrieval stage should produce:

1. Character Identity Record
2. Character Reference status
3. Character Identity Lock
4. Voice Identity Record when speech is used
5. Voice Reference status when speech is used
6. Voice Identity Lock when speech is used
7. Unknown Attributes
8. Source / Conflict Notes

These outputs become the source of truth for Creative Logic, Scene Planning, Image Prompt Assembly, Video Prompt Assembly, Spoken Script generation, and Validation.

### Creator Consistency Validation

The validator must check:

| Area | Check | Severity |
|---|---|---|
| Character | Creator resolves from Creator Library | Blocker |
| Character | Identity anchors remain stable | Blocker |
| Character | Character Reference remains stable when used | Blocker |
| Character | No unsupported identity attributes are introduced | Blocker |
| Character | Temporary state changes have a scene cause | Blocker |
| Voice | Voice Identity exists when speech is used | Blocker |
| Voice | Voice Identity remains stable across spoken scenes | Blocker |
| Voice | Voice Reference remains stable when used | Blocker |
| Voice | No unsupported vocal attributes are introduced | Blocker |
| Silent | Voice generation is not introduced | Pass / Blocker if violated |

A validation failure should be repaired locally whenever possible.

Examples:

- face drift → restore Character Identity Lock,
- reference drift → restore the canonical Character Reference,
- invented appearance detail → remove the unsupported detail,
- voice drift → restore Voice Identity Lock,
- silent format contains speech → remove speech and preserve visual behavior.

### Creator Identity Invariants

Throughout execution:

- one creator identity package per generation,
- one Character Identity source of truth,
- one Character Identity Lock,
- one Voice Identity source of truth when speech is used,
- one Voice Identity Lock when speech is used,
- references remain stable when used,
- temporary scene state never mutates identity,
- unknown identity attributes remain unknown,
- no creator identity changes without an explicit supported source or deliberate state transition,
- creator name alone is never used as evidence for identity details.
