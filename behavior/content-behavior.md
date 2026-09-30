# Content Behavior Engine Specification

Content Behavior converts Scene States into believable human behavior and product interaction.

It is the layer that answers:

> **Given this scene state, what would an ordinary person actually do?**

The engine must make behavior **causal, restrained, context-aware, and physically executable**.

It sits between Scene Planning and Prompt Assembly.

## Runtime Position

`Creative Concept → Scene Planning → Content Behavior → Prompt Assembly`

Content Behavior does not redefine:

- product identity,
- creator identity,
- campaign objective,
- format,
- angle,
- scene count,
- scene state.

It translates those resolved decisions into observable behavior.

## Core Principle

Human realism does not come from adding random movement.

It comes from:

`Intent → Attention → Physical Action → Reaction → Next Intent`

Every meaningful behavior should have a reason.

A creator should not:

- touch hair because “UGC needs movement,”
- smile because “AI videos need expression,”
- move the camera because “dynamic shots look better,”
- gesture randomly because “human behavior is imperfect.”

Behavior must be caused by the scene.

## Behavior Inputs

The engine consumes:

### Scene State

- Creator State
- Product State
- Environment State
- Camera State
- Transition Intent
- Required Evidence
- Continuity Locks

### Creative Logic

- Creative Concept
- Creator Role
- Product Role
- Hook
- Viewer Takeaway
- Evidence
- CTA Role

### Format

- format grammar
- speech state
- silent state
- expected creator-camera relationship

### Niche

- Fashion behavior priorities
- Beauty behavior priorities
- Home behavior priorities

### Creator Identity

- Character Identity Lock
- Voice Identity Lock when speech is used

### Product Intelligence

- Product Identity Lock
- Product State Model
- supported interaction states

## Behavior Model

For each scene, resolve:

| Field | Meaning |
|---|---|
| Intent | What the creator is trying to accomplish |
| Attention Target | What the creator is looking at / attending to |
| Primary Action | One dominant physical action |
| Supporting Action | Optional small action that supports the primary action |
| Micro-Behavior | One or more restrained natural cues |
| Product Interaction | How the product is touched, worn, applied, placed, or used |
| Reaction | Visible response when justified |
| Camera Behavior | How the phone/camera naturally behaves |
| Transition Behavior | What action creates the next state |

The engine should prefer the smallest behavior set that fully explains the scene.

## Behavior Hierarchy

Resolve behavior in this order:

1. Required state change
2. Product interaction
3. Evidence demonstration
4. Creator intent
5. Attention / gaze
6. Supporting body movement
7. Facial reaction
8. Micro-behavior
9. Camera behavior

Higher-priority behavior must not be obscured by lower-priority decoration.

## Primary Action

Every scene has one primary action.

Examples:

- inspect garment fit,
- adjust sleeve,
- hold product toward mirror,
- open cosmetic packaging,
- apply product,
- place organizer,
- move an object into position,
- inspect the result.

The primary action must directly support the Scene Purpose.

Do not combine unrelated major actions.

Bad:

`walk → pick up product → apply product → fix hair → talk → rotate camera`

Better:

`pick up product → inspect it`

Then the next scene can handle application if needed.

## Supporting Action

A supporting action is optional.

Examples:

- slight weight shift while inspecting,
- thumb adjustment on a phone,
- moving hair behind the ear while applying product,
- small posture correction before a mirror reveal.

A supporting action is valid only when it naturally co-occurs with the primary action.

Do not add more than necessary.

## Attention and Gaze

Gaze should follow the creator's actual task.

Examples:

### Product Inspection

`eyes → product`

### Mirror Outfit Check

`eyes → mirror reflection / garment area`

### Product Application

`eyes → application area / mirror`

### Talking Head

`eyes → camera`

### Result Inspection

`eyes → changed result`

Gaze may briefly shift naturally, but it should not wander without reason.

## Hand Behavior

Hands should have clear physical intent.

Valid hand states:

- relaxed,
- reaching,
- gripping,
- holding,
- adjusting,
- applying,
- placing,
- pointing,
- releasing,
- resting.

Hand movement must follow object interaction and body mechanics.

Avoid:

- hovering hands,
- fused fingers,
- unexplained finger movement,
- hands switching sides without cause,
- simultaneous unrelated gestures.

## Posture and Weight Transfer

Natural posture is usually a consequence of the action.

Examples:

- reaching → slight torso shift,
- inspecting mirror → stable stance,
- applying product → head/arm positioning changes,
- placing object → slight forward lean,
- revealing outfit → body rotates naturally.

Do not force exaggerated posture changes.

## Facial Behavior

Facial behavior should be proportional to the stimulus.

Useful levels:

### Neutral

For setup or ordinary interaction.

### Focused

For inspection, application, adjustment, or demonstration.

### Mild Recognition

For noticing a relevant product/result.

### Mild Satisfaction

For a visibly useful result.

### Conversational

For spoken formats.

Avoid default:

- exaggerated surprise,
- huge smiles,
- shock faces,
- repeated eyebrow raises,
- artificial influencer reactions.

A small expression change is often more believable than a dramatic reaction.

## Human Micro-Behavior

Micro-behavior should make the scene feel lived-in without becoming choreography.

Useful cues:

- natural blink,
- subtle weight shift,
- small grip adjustment,
- brief glance,
- slight posture correction,
- clothing adjustment,
- hair settling after movement,
- tiny pause before inspecting,
- natural breathing movement,
- small hand repositioning.

### Micro-Behavior Selection Rule

Choose micro-behavior only when it supports:

1. physical realism,
2. task realism,
3. continuity,
4. emotional readability.

If it serves none of these, remove it.

## Behavior Density

Behavior density must match duration.

### 4 sec

Use:
- one primary action,
- zero or one supporting cue.

### 6 sec

Use:
- one primary action,
- one supporting cue or reaction.

### 8 sec

Use:
- one primary action,
- one supporting behavior,
- one restrained reaction or transition.

### 10 sec

Use:
- one primary action per scene,
- gradual transition,
- reaction only when justified.

Do not fit more behavior by accelerating the creator.

## Product Interaction

Product interaction must match the Product State Model.

### Fashion

Examples:

- touch fabric,
- adjust sleeve,
- smooth garment,
- turn body to inspect fit,
- hold phone while checking mirror.

Fabric behavior:

- folds where compressed,
- drapes with gravity,
- moves with body,
- settles after movement.

### Beauty

Examples:

- open container,
- dispense product,
- hold applicator,
- apply to intended area,
- inspect texture,
- compare result.

Application behavior:

- hand moves toward target,
- contact occurs,
- product state changes,
- applicator follows a believable path,
- skin/product interaction remains physically coherent.

### Home

Examples:

- pick up,
- place,
- open,
- adjust,
- switch on when supported,
- organize,
- interact with functional part.

Object behavior:

- rigid objects maintain shape,
- objects move when touched,
- weight and placement remain plausible,
- contact and release are visible when necessary.

## Behavior Causality

For every transition:

`Previous State + Creator Action + Physical Interaction → Next State`

Examples:

### Fashion

`garment sleeve loose + hand grips sleeve → sleeve adjusted`

### Beauty

`product closed + hand opens container → product open`

### Home

`item off-desk + hand places item → item on desk`

If the next state cannot be explained by the action, the behavior plan is invalid.

## Format-Specific Behavior

### Silent Mirror Selfie

Behavior grammar:

`notice → inspect → adjust → reveal`

Typical behavior:

- look at reflection,
- shift body angle,
- inspect garment,
- make one small adjustment,
- return to a natural reveal pose.

Do not add speech behavior.

### Outfit Showcase

Behavior grammar:

`present → inspect → reveal`

Keep the garment visible.

Avoid theatrical runway behavior unless explicitly requested.

### GRWM

Behavior grammar:

`prepare → apply / dress → inspect → continue`

Each action should represent a believable preparation step.

### Talking Head

Behavior grammar:

`address → demonstrate → react / explain → CTA`

Visual gestures support speech but do not replace the Spoken Script.

### Product Application

Behavior grammar:

`show → apply → inspect → result`

Hands and application area remain visually coherent.

### Before / After

Behavior grammar:

`establish before → perform meaningful change → establish after`

The transformation must have a visible cause.

### Problem → Solution

Behavior grammar:

`notice problem → intervene → inspect result`

Do not skip the intervention.

### Product Demo

Behavior grammar:

`show function → interact → observe result`

Functional changes require physical cause.

## Niche Behavior Priorities

### Fashion

Prioritize:

- mirror awareness,
- garment inspection,
- fit adjustment,
- natural body rotation,
- fabric handling,
- restrained reveal behavior.

Avoid:

- runway posing,
- exaggerated hip poses,
- impossible garment movement,
- repetitive body turns.

### Beauty

Prioritize:

- careful hand placement,
- realistic application speed,
- eye/mirror coordination,
- subtle facial inspection,
- realistic product amount,
- natural reaction to visible result.

Avoid:

- rubbing product through the face unnaturally fast,
- excessive beauty-model posing,
- impossible applicator paths,
- instant perfect transformations.

### Home

Prioritize:

- reaching,
- lifting,
- placing,
- opening,
- adjusting,
- organizing,
- observing spatial change.

Avoid:

- teleporting objects,
- unrealistic one-handed heavy movements,
- objects moving before contact,
- impossible room-scale transformations.

## Camera Behavior

Camera behavior is part of human behavior when the creator holds or repositions the phone.

Use:

- subtle handheld drift,
- small framing correction,
- natural phone tilt,
- slight reframing after movement,
- mirror-centered framing when appropriate.

Avoid:

- orbiting,
- cinematic tracking,
- impossible stabilization,
- dramatic zooms,
- camera movement with no physical cause.

When the phone is supported, camera movement should be minimal unless the support or framing is intentionally changed.

## Spoken Behavior

When speech is used, separate:

- what the creator says,
- what the creator physically does.

The Spoken Script belongs to the speech layer.

Behavior may include:

- looking at camera,
- natural hand gesture,
- holding product,
- demonstrating product,
- brief glance toward product,
- conversational facial response.

Do not encode full dialogue into visual behavior.

Speech timing must fit the selected duration.

## Silent Behavior

Silent formats communicate intent through:

- gaze,
- hands,
- posture,
- object interaction,
- facial response,
- camera relationship.

The engine should produce a compact behavioral sequence such as:

`notice → inspect → adjust → reveal`

No dialogue or voice-over.

## CTA Behavior

CTA behavior must remain subordinate to the content.

Examples:

- product remains clearly visible,
- creator holds product naturally,
- final frame keeps product unobstructed,
- creator points only when that gesture fits the format.

Avoid:

- forced pointing,
- frozen sales poses,
- end-card behavior,
- exaggerated “buy now” gestures.

## Behavior-to-Prompt Translation

Content Behavior does not directly write the final prompt.

Instead:

`Scene State + Behavior Plan → Prompt Assembly`

Translate:

| Behavior Field | Prompt Consequence |
|---|---|
| Intent | Visible purpose of the action |
| Attention Target | Gaze direction |
| Primary Action | Main physical movement |
| Supporting Action | Optional subtle movement |
| Micro-Behavior | Small realistic cue |
| Product Interaction | Contact and object movement |
| Reaction | Facial/body response |
| Camera Behavior | Phone movement or framing change |
| Transition Behavior | Physical bridge to next scene |

Internal field names should not appear in final prompts unless the generation system explicitly benefits from structured syntax.

## Behavior Validation

Validate:

| Area | Check | Severity |
|---|---|---|
| Purpose | Primary action supports scene purpose | Blocker |
| Causality | Action explains state change | Blocker |
| Product | Product interaction is physically plausible | Blocker |
| Hands | Hand behavior has clear intent | Blocker |
| Body | Posture and movement are anatomically plausible | Blocker |
| Gaze | Attention follows the task | Warning |
| Face | Reaction is proportionate | Warning |
| Micro-Behavior | Micro-motion has a reason | Warning |
| Camera | Camera movement has physical motivation | Warning |
| Duration | Behavior density fits duration | Blocker |
| Format | Behavior matches format grammar | Blocker |
| Silent | No speech behavior is introduced | Blocker |
| Spoken | Visual behavior is compatible with speech | Warning |
| CTA | CTA behavior remains natural | Warning |

### Local Repair Rules

Repair only the failed behavior.

Examples:

- random gesture → remove it,
- excessive reaction → reduce expression,
- impossible hand path → simplify reach/grip,
- missing state cause → add physical interaction,
- too much motion → remove supporting action,
- camera drift without cause → stabilize camera,
- speech in silent format → remove speech behavior.

## Behavior Anti-Patterns

Do not:

- add movement just to make AI video “look alive,”
- make every scene contain a smile,
- make every scene contain a hair touch,
- make every transition include a camera move,
- use random hand gestures,
- accelerate human movement to fit timing,
- make reactions larger than the stimulus,
- use influencer choreography by default,
- treat imperfection as randomness,
- add micro-behavior that competes with product evidence,
- use cinematic movement as a substitute for natural movement.

## Behavior Engine Output

Produce:

1. Scene Behavior Plan
2. Primary Action per scene
3. Attention / Gaze
4. Product Interaction
5. Supporting Action when needed
6. Micro-Behavior
7. Facial / Body Reaction when justified
8. Camera Behavior
9. Transition Behavior
10. Speech Behavior when applicable
11. Silent Behavior when applicable
12. Behavior Constraints

These outputs become direct inputs to Image Prompt and Video Prompt assembly.

## Behavior Invariants

Throughout execution:

- every major behavior has a reason,
- every state transition has a physical cause,
- one primary action per scene,
- product interaction remains plausible,
- creator identity remains unchanged,
- micro-behavior is restrained,
- reactions are proportional,
- camera movement is motivated,
- behavior density fits duration,
- silent formats remain silent,
- spoken formats preserve Voice Identity,
- behavior supports the campaign evidence,
- behavior never replaces product truth.

## Runtime Integration

`User Input
→ Normalize
→ Validate
→ Product Intelligence
→ Creator Intelligence
→ Campaign Intelligence
→ Format × Angle
→ Duration / Scene Count
→ Creative Logic
→ Scene Planning
→ Content Behavior
→ Image Prompt Engine
→ Video Prompt Engine
→ Validation
→ Repair
→ Revalidate
→ Output`

The Content Behavior Engine is the final behavioral translation layer before prompt assembly. It should make the generation feel like a person performing a task, not an animation system executing arbitrary motion.
