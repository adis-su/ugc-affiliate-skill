# AFFILIX — Character Performance

## 1. Purpose

`PERFORMANCE.md` mendefinisikan **bagaimana karakter bertindak, bereaksi, berbicara, dan bergerak di dalam scene**.

Performance menjawab:

> **Bagaimana karakter berperilaku dalam moment ini?**

Performance bukan Character Identity.

- Character Identity = siapa karakter secara visual.
- Character State = kondisi karakter pada moment tertentu.
- Performance = bagaimana karakter melakukan atau mengalami kondisi tersebut.
- Voice Identity = karakteristik suara yang stabil.

Performance harus menjaga semua constraint dari upstream source of truth.

## 2. Performance Inputs

Performance dapat menggunakan:

- Character Identity
- Voice Identity
- Content Strategy
- Script
- Dialogue
- Storyboard
- Character State
- Product Identity
- Product State
- Environment
- Camera State
- Reference State

Performance tidak boleh mengubah source of truth tersebut secara diam-diam.

## 3. Identity Boundary

Performance boleh mengubah perilaku dan kondisi sementara karakter, tetapi tidak boleh mengubah Character Identity.

### Performance may change

- pose
- posture
- gaze
- facial expression
- gesture
- movement
- body orientation
- hand position
- reaction
- interaction
- emotional presentation
- movement timing
- speech timing
- spatial behavior

### Performance must not change

- face structure
- eye structure
- eyebrow structure
- nose structure
- lip proportions
- stable skin characteristics
- visual age
- body identity
- permanent identity attributes
- Rositasari's permanent hijab requirement

For Rositasari:

> Hijab must remain present and hair must remain fully covered during all performance states.

## 4. Performance Dimensions

Performance dapat dideskripsikan melalui beberapa dimensi.

### Posture

- standing
- sitting
- leaning
- relaxed
- upright
- slightly forward
- slightly backward

### Pose

- body position
- head position
- shoulder position
- arm position
- hand position
- leg position

### Gaze

- looking at camera
- looking at product
- looking at another subject
- looking toward environment
- brief glance
- sustained gaze
- gaze shift

### Facial Expression

- neutral
- subtle smile
- focused
- curious
- pleased
- surprised
- concerned
- thoughtful
- amused

Expression must remain natural and proportional to the scene.

### Gesture

- pointing
- holding
- presenting
- touching
- opening
- closing
- reaching
- adjusting
- demonstrating
- subtle conversational gestures

### Movement

- walking
- turning
- reaching
- lifting
- lowering
- shifting weight
- repositioning hands
- changing posture
- moving through the environment

Movement should follow logical body mechanics and scene continuity.

### Reaction

A reaction should have a readable cause.

Examples:

- noticing a product
- seeing a result
- hearing something
- remembering something
- reacting to an unexpected event

Do not create an emotional reaction without a narrative or visual cause.

### Emotional Direction

Performance may specify an emotional direction, but should not overstate it unless required by the script.

Examples:

- calm
- warm
- curious
- mildly surprised
- relieved
- enthusiastic
- thoughtful

Emotion is a performance instruction, not a permanent personality rewrite.

## 5. Natural Human Behavior

Performance should include subtle behavior where appropriate.

Examples:

- natural blinking
- breathing
- small eye movements
- micro-expressions
- subtle posture adjustment
- natural weight shifting
- small finger repositioning
- brief gaze changes
- natural reaction delay
- conversational head movement
- realistic hand movement

These details should support realism without becoming distracting.

Naturalization may add or refine these behaviors, but it must not alter required state or identity.

## 6. Performance and Dialogue

Performance must coordinate with Dialogue.

Consider:

- speech start
- speech rhythm
- pauses
- emphasis
- facial reaction
- gaze behavior
- hand gestures
- breathing
- reaction timing

Speech should not produce physically impossible or visually disconnected behavior.

For example:

- A character saying something while looking at the product may naturally glance toward it.
- A character emphasizing a point may use a subtle hand gesture.
- A reaction may begin shortly after the triggering event rather than before it.

Voice characteristics belong to `VOICE-IDENTITY.md`.

## 7. Product Interaction

When the character interacts with a product, Performance must respect:

- Product Identity
- Product State
- Product Truth

Performance may specify:

- reach
- pick up
- hold
- rotate
- open
- close
- place
- point
- demonstrate
- inspect
- use

Performance must not invent:

- product features
- product specifications
- product materials
- product benefits
- product results
- product behavior
- user experience claims

If an interaction requires information that is not available from Product Truth, mark it as unresolved rather than inventing it.

## 8. State Transition

Performance often causes a Character State transition.

The transition should be represented as:

**STATE → ACTION → STATE**

Example:

`standing, arms relaxed`
→ reaches toward product
→ `standing, one hand holding product`

Do not describe performance as disconnected image changes.

Every meaningful movement should have a logical starting condition and ending condition.

## 9. Performance Record

Use the following structure when defining scene-specific performance:

### Performance Record

- Character:
- Scene:
- Start State:
- Action:
- Gesture:
- Gaze:
- Facial Expression:
- Emotional Direction:
- Body Movement:
- Product Interaction:
- Dialogue Coordination:
- Reaction Timing:
- End State:
- Continuity Notes:

## 10. Performance Beats

A complex scene can be divided into performance beats.

Example:

1. Establish neutral posture.
2. Notice product.
3. Shift gaze to product.
4. Reach toward product.
5. Pick up product.
6. Briefly inspect product.
7. Look back toward camera.
8. Deliver dialogue.
9. End in stable holding state.

Each beat should have a clear relationship to the preceding and following state.

## 11. Scene-Specific Overrides

Performance may override the default baseline for a specific scene.

Examples:

- Default: calm neutral.
- Scene: subtle smile while presenting product.

The scene-specific performance does not redefine the character.

After the scene ends, the character can return to the established baseline or transition to another explicitly defined state.

## 12. Continuity

Performance must preserve continuity across:

- face
- hijab
- body identity
- wardrobe
- gaze
- pose
- hand position
- product position
- product state
- environment
- camera position
- lighting
- dialogue timing

The final performance state of one clip should be compatible with the starting performance state of the next clip.

## 13. Performance and Reference State

Reference State captures the visual condition at a specific point.

Performance describes how the character moves between states.

Therefore:

- Reference State = snapshot
- Performance = behavior and transition
- Character State = condition

A performance instruction should not contradict the reference state.

## 14. Common Failure Modes

### Identity Drift

Performance instructions accidentally cause changes to the character's face or permanent attributes.

**Correction:** preserve Character Identity and revise only performance.

### State Jump

Character suddenly changes pose or position without a logical movement.

**Correction:** add the missing transition.

### Overacting

Gestures or expressions are much stronger than the scene requires.

**Correction:** reduce intensity and use subtle human behavior.

### Mechanical Movement

Character movement looks robotic or perfectly repetitive.

**Correction:** introduce natural timing, micro-adjustments, breathing, and small variations without changing required state.

### Unmotivated Reaction

Character reacts emotionally without a visible or narrative trigger.

**Correction:** connect reaction to dialogue, product interaction, environment, or story event.

### Product Inconsistency

Performance changes how a product is held or used in a way that conflicts with Product State or Product Truth.

**Correction:** align performance with the authoritative product state and facts.

### Overwritten Identity

Performance starts redefining who the character is.

**Correction:** move stable visual attributes back to Character Identity.

## 15. Missing Performance Data

If a required performance detail is missing:

- preserve all known constraints
- do not invent critical identity attributes
- infer only ordinary physical transitions when they are unambiguous
- mark unresolved performance when the missing information materially affects continuity
- block dependent generation when the missing performance information is critical

Performance should not fabricate product claims or identity details to fill a gap.

## 16. Status

Performance follows the project stage state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A locked Performance becomes a constraint for downstream Storyboard, State, Production Spec, and Prompt generation where applicable.

## 17. Regeneration

Performance changes should trigger **targeted regeneration**.

Do not regenerate unrelated upstream or downstream modules.

Examples:

- Change hand gesture → regenerate affected performance/state/prompt outputs.
- Change facial expression → regenerate affected state and visual prompts.
- Change Character Identity → propagate only to dependent references and outputs.
- Change Product State → update affected interaction and dependent prompts.

## 18. Boundary with Character Identity

Character Identity defines:

> who the character is.

Performance defines:

> what the character does.

Performance must never silently promote a temporary behavior into permanent identity.

## 19. Boundary with Voice Identity

Voice Identity defines stable voice characteristics.

Performance may coordinate delivery timing and physical behavior with speech, but does not redefine:

- pitch
- timbre
- perceived vocal age
- speaking pace baseline
- vocal energy baseline
- other stable voice characteristics

## 20. Boundary with Storyboard

Storyboard defines the scene-level visual plan.

Performance provides the character behavior required to realize that plan.

Storyboard may specify:

> Rositasari presents the product to camera.

Performance expands this into:

> Rositasari maintains a relaxed posture, shifts gaze from the product to camera, raises the product naturally to presentation position, gives a subtle smile, and delivers the dialogue with small conversational hand and head movements.

Performance should not replace the storyboard or create a new story structure.

## 21. Non-Negotiable Rules

1. Performance defines character behavior, not character identity.
2. Character Identity always constrains Performance.
3. Permanent identity attributes must remain intact.
4. Rositasari's hijab must remain present and hair fully covered.
5. Performance must follow logical STATE → ACTION → STATE transitions.
6. Performance must coordinate with Dialogue and Voice Identity.
7. Product interaction must respect Product Identity, Product State, and Product Truth.
8. Performance must not invent product claims or physical product facts.
9. Naturalization may improve realism but must not alter identity or required state.
10. Missing critical performance data must not be fabricated.
11. Scene-specific performance does not redefine the character.
12. Performance changes use targeted regeneration.
13. Generated output never becomes a new Source of Truth.
14. No separate validation stage is introduced; constraints operate throughout the pipeline.
