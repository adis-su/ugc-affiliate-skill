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

### Niche
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
