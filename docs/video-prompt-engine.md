# Frame-to-Frame Video Prompt Engine

## Purpose

Converts a validated storyboard transition into one precise video-generation instruction.

The engine answers:

> What must change from Frame A to Frame B, and what must remain physically and visually stable?

It does not invent new actions, locations, outfits, products, or camera ideas. It translates an existing state transition into motion.

Target: believable human-made UGC motion, not maximum cinematic spectacle.

## Inputs

Required:
- storyboard scene
- Frame A visual state
- Frame B visual state
- creator identity anchors
- product identity anchors
- environment anchors
- camera relationship
- Human Realism constraints
- Product Consistency constraints
- scene-specific negative constraints

Frame A normally corresponds to the generated image reference. Frame B corresponds to the next validated visual state.

## Output Contract

yaml:
  video_prompt:
    scene_id: 1
    frame_a: ""
    frame_b: ""
    prompt: ""
    motion:
      primary_action: ""
      body: ""
      hands: ""
      clothing: ""
      product: ""
      camera: ""
    continuity_anchors: []
    negative_constraints: []

The primary output is the final prompt string. Supporting fields exist for QC and regeneration.

## Core Rule

Describe the transition, not just the scene.

Weak:
> A person wearing a shirt in a bedroom mirror.

Better:
> Starting from the existing mirror-selfie pose, the creator briefly looks at the shirt hem, lightly smooths it once with the free hand, then relaxes the hand while the phone stays naturally held in the other hand.

The second prompt contains a state change.

## Motion Hierarchy

Describe:
1. primary human action
2. body mechanics
3. hand interaction
4. clothing response
5. product response
6. camera response
7. environmental response when physically necessary

Use the smallest plausible motion that communicates the intended behavior.

## Human Motion

Protect:
- natural weight shifts
- plausible elbows, wrists, fingers, shoulders
- gaze following the relevant object or reflection
- proportional head movement
- momentum settling

Avoid instant pose changes, frozen joints, robotic movement, repeated identical gestures, runway turns, impossible limb paths, sudden acceleration, and teleportation.

## Hands and Product

When hands touch the product:
- identify which hand
- identify the contact area when relevant
- specify one clear action
- preserve finger plausibility
- preserve garment structure
- allow natural fabric deformation

Prefer concrete language such as:
> The right hand lightly pinches the shirt hem once and releases it.

Avoid vague motion language such as “the hands elegantly interact with the garment.”

## Clothing Physics

Allowed:
- natural folds
- temporary compression
- small tension changes
- fabric displacement from touch
- settling after release
- movement caused by body motion

Forbidden:
- color changes
- pattern or logo morphing
- spontaneous redesign
- unexplained fit changes
- fabric passing through the body

Core rule:

> Physical deformation is allowed. Product identity drift is not.

## Camera

Camera motion must match the capture mechanism.

Handheld smartphone:
- subtle hand movement
- tiny framing variation
- natural micro-jitter

Mirror selfie:
- phone stays in the creator's hand
- reflection geometry remains coherent
- mirror plane stays stable

Static phone:
- camera remains largely stable unless movement is explicitly storyboarded

Avoid cinematic orbiting, crane movement, impossible tracking, drone-like motion, or camera movement unrelated to the creator's physical action.

## Mirror Selfie

Preserve:
- one creator
- one phone
- coherent reflection
- correct hand-to-phone relationship
- stable mirror geometry
- stable room geometry
- realistic body proportions
- product continuity

A typical sequence is:
settle → inspect → adjust → release → settle

Only include the steps actually required by the storyboard.

## Temporal Density

Use:
- 4 sec: one clear action
- 6 sec: one primary action plus small reaction
- 8 sec: one primary action plus one supporting action
- 10 sec: 2–3 meaningful beats across the sequence

Do not solve a crowded storyboard by making the person move faster. Reduce actions instead.

## Prompt Assembly

Use this order:

Start from the exact Frame A state.
Describe the primary action.
Describe plausible body and hand mechanics.
Describe clothing and product response.
Describe camera response.
End in the exact Frame B state.
Preserve continuity anchors.
Add targeted negative constraints.

The final prompt should read as one coherent instruction.

## Failure Modes

- static prompt that does not describe a transition
- too many actions for the duration
- Frame A or B mismatch
- invented behavior
- product drift
- creator drift
- impossible camera motion
- physically incorrect fabric
- environment drift
- cinematic overreach

## Validation

Verify:
- Frame A matches the reference state
- Frame B matches the next validated state
- one clear primary action
- feasible timing
- stable creator identity
- stable product identity
- plausible camera mechanics
- continuous environment
- natural clothing response
- no contradictory instructions

Final test:

> Could a real person physically perform this exact transition while holding the stated camera setup?

If not, simplify the motion.

## Boundary

The engine does:
- translate Frame A to Frame B
- preserve creator and product continuity
- describe body, hand, clothing, and camera mechanics
- enforce physical plausibility
- create targeted negative constraints

The engine does not:
- change strategy
- change format
- invent concepts
- rewrite behavior
- redesign storyboard
- invent product details
- add cinematic effects for spectacle

Its job is to make the transition physically understandable to a video model without changing what the storyboard intended.
