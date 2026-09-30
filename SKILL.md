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

### 04. Image Prompt Engine
Build each image prompt from:
- Character
- Product
- Pose & Behavior
- Environment
- Camera
- Composition
- Lighting
- UGC Visual Language

### 05. Video Prompt Engine
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

### 06. Human Realism Engine
Apply cross-cutting realism constraints:
- Human Anatomy
- Natural Pose
- Micro Movement
- Facial Expression
- Imperfection
- Smartphone Camera Behavior
- Natural Lighting
- UGC Authenticity

### 07. Consistency Engine
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

## Image Prompt Contract

Generate one complete Image Prompt per scene. Each prompt must resolve Character, Product, Pose & Behavior, Environment, Camera, Composition, Lighting, and UGC Visual Language. Prioritize visible evidence over generic adjectives. Preserve product, creator, wardrobe, and environment continuity. Avoid cinematic or commercial polish unless explicitly requested.

## Video Prompt Contract

Generate one Frame-to-Frame Video Prompt for every consecutive scene pair. Each transition must specify Starting Frame, Ending Frame, Human Movement, Facial Movement, Product Movement, Material Physics, Camera Movement, Environment Movement, and Frame Continuity. Describe a believable transition, not a newly invented scene. No teleportation, identity changes, unexplained wardrobe changes, impossible hand movement, sudden cinematic camera moves, or broken room geometry.

## Cross-Cutting Realism

Human Realism and Consistency apply throughout generation. Check anatomy, pose, micro-movement, facial expression, plausible imperfection, smartphone camera behavior, lighting, character identity, voice identity when used, product identity, appearance, environment, and scene continuity. The goal is ordinary human-made UGC, not generic photorealism or polished advertising.

## Output Contract

Return, in order:

1. Creative Summary: niche, format, angle, concept, duration, scene count.
2. Scene Plan: objective, action, product interaction, behavior, environment for each scene.
3. Image Prompts: one complete prompt per scene.
4. Frame-to-Frame Video Prompts: one transition prompt per consecutive scene pair.
5. Spoken Script: only for formats using speech.
6. Silent Behavior Script: for silent formats.

Do not expose internal validation or reasoning unless explicitly requested.


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
| Lifestyle | Convenience | Routine task | Practical benefit |
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
