# Content Format Specification

This document defines the execution contract for every supported UGC format.

A format is not merely a visual label. It determines the required behavior, camera relationship, narrative structure, product visibility, and downstream storyboard/prompt requirements.

---

## 1. Format Contract

Every format must define:

- **Primary mode**: talking, silent, visual, or hybrid.
- **Camera relationship**: how the creator and camera interact.
- **Required behavior**: actions that must exist for the format to feel native.
- **Narrative structure**: what changes from beginning to end.
- **Product visibility**: low, medium, high, or dominant.
- **Environment requirement**: what kind of space supports believability.
- **Interaction level**: none, light, medium, or high.
- **Prompt constraints**: details that image/video generation must preserve.
- **Failure modes**: behaviors that make the result look artificial or like an ad.

---

# 2. Talking Head

### Purpose
Direct-to-camera communication where the creator's spoken delivery carries the primary message.

### Required
- Creator faces camera.
- Dialogue or spoken narration is present.
- Natural facial movement.
- Believable eye contact with the phone/camera.
- Small conversational gestures.

### Camera
- Front-facing smartphone perspective.
- Mostly static handheld framing.
- Minor natural hand/camera movement is acceptable.
- Avoid cinematic tracking.

### Narrative
Default structure:

`hook → context/problem → product → specific observation → CTA`

Not every video requires every component. Duration controls compression.

### Product visibility
**Medium → High**

Product should be visible when discussed. If the product is worn, framing must allow the relevant garment area to remain readable.

### Interaction
**Medium**

Creator may touch fabric, adjust clothing, or briefly show a product detail.

### Realism rules
- Do not make every sentence perfectly paced.
- Allow tiny pauses and natural facial reactions.
- Avoid exaggerated influencer gestures.
- Spoken claims should be grounded in visible/product-supported information.

### Failure modes
- Presenter-like delivery.
- Perfectly fixed posture.
- Constant smiling.
- Excessive hand gestures.
- Advertising voice.
- Unnaturally perfect lip movement.

---

# 3. Silent Mirror Selfie

### Purpose
A creator casually shows an outfit/product through a mirror selfie without spoken dialogue.

### Required
- Mirror is part of the visual composition.
- Smartphone is naturally held.
- Creator interacts with their reflection.
- Behavioral sequence replaces dialogue.
- Outfit/product remains readable.

### Camera
- Phone-camera-in-mirror perspective.
- Natural handheld angle.
- Slight framing imperfections are acceptable.
- Reflection geometry must remain consistent.

### Narrative
Default behavioral structure:

`settle → inspect → adjust → reveal → final natural pose`

Example for 10 seconds:
- 0–2s: creator settles into frame.
- 2–4s: adjusts hem or sleeve.
- 4–6s: shifts weight or turns slightly.
- 6–8s: checks phone screen/reflection.
- 8–10s: relaxed final stance.

### Product visibility
**High**

The product is usually the main visual subject.

### Interaction
**Medium → High**

Interaction should be subtle and motivated by the outfit.

### Realism rules
- Uneven weight distribution.
- Small posture corrections.
- One or two natural clothing adjustments.
- Slightly imperfect framing.
- Natural mirror distance.
- Realistic phone grip.
- Reflection must obey camera geometry.

### Failure modes
- Runway posing.
- Repeated identical turns.
- Floating or changing phone position.
- Mirror/reflection mismatch.
- Perfect symmetry.
- Clothing morphing during movement.
- Sudden background changes.

---

# 4. Outfit Showcase

### Purpose
Present the complete outfit clearly with minimal narrative.

### Required
- Full or near-full outfit visibility.
- At least one meaningful change in viewing angle or posture.
- Product silhouette remains readable.

### Camera
- Smartphone social-video framing.
- Mostly stable.
- Small repositioning is acceptable.

### Narrative
`establish outfit → reveal silhouette/detail → final look`

### Product visibility
**Dominant**

### Interaction
**Low → Medium**

### Realism rules
- Use natural standing posture.
- Avoid fashion-editorial poses.
- Small body shifts are preferable to dramatic posing.

### Failure modes
- Catwalk behavior.
- Excessive camera choreography.
- Product being obscured by hands or props.
- Unrealistically perfect posture.

---

# 5. Try-On

### Purpose
Show what the product looks like when worn and communicate fit/appearance through behavior.

### Required
At least one of:
- transition into wearing the product,
- visible before/after state,
- product being put on,
- fit inspection,
- final worn state.

### Camera
- Phone/social-video perspective.
- Framing should prioritize body area relevant to the product.

### Narrative
`initial state → wearing/change → inspection → final look`

### Product visibility
**High → Dominant**

### Interaction
**High**

### Realism rules
- Garment must deform naturally when touched.
- Sleeves, hem, collar, seams, and folds must behave consistently.
- Body proportions cannot change between states.

### Failure modes
- Instant unexplained outfit teleportation.
- Clothing appearing/disappearing through morphing.
- Impossible hand/arm movement.
- Fit changing without a reason.
- Product details changing between shots.

---

# 6. GRWM

### Purpose
Show a believable sequence of getting ready while building the final outfit.

### Required
- Multiple sequential actions.
- Each action contributes to the final look.
- At least one clear styling/dressing progression.

### Camera
- Smartphone/social-native.
- Can use multiple framing states.
- Transitions should remain simple and believable.

### Narrative
`starting state → choose/wear → style → refine → final look`

### Product visibility
**Medium → High**

### Interaction
**High**

### Realism rules
- Actions should happen in plausible order.
- Hands must interact correctly with garments.
- No unnecessary filler movements.
- Final outfit must preserve product identity.

### Failure modes
- Random dressing actions.
- Repeated fake adjustments.
- Impossible object placement.
- Product changing shape/color between actions.

---

# 7. Voice-over + B-roll

### Purpose
Use narration to provide context while visuals demonstrate or support the message.

### Required
- Voice-over.
- Visual actions related to the narration.
- B-roll should have semantic relevance to spoken claims.

### Camera
Flexible smartphone B-roll.

### Narrative
`spoken claim → visual evidence/example → next claim → payoff/CTA`

### Product visibility
**Medium → High**

### Interaction
**Medium → High**

### Realism rules
- Do not show visuals unrelated to the narration.
- Match timing between voice-over and visual emphasis.
- Keep B-roll social-native rather than commercial.

### Failure modes
- Generic B-roll.
- Narration describing details not shown.
- Overly cinematic montage.
- Mismatched timing.

---

# 8. POV

### Purpose
Place the viewer inside a first-person situation.

### Required
- Camera behaves as a plausible first-person viewpoint.
- Actions have situational motivation.
- Product appears naturally within the POV.

### Camera
- Handheld first-person smartphone.
- Motion follows realistic human movement.

### Narrative
`situation → interaction → product moment → outcome`

### Product visibility
**Medium → High**

### Interaction
**Medium → High**

### Failure modes
- Floating camera.
- Impossible head/body motion.
- Camera moving independently of the person.
- Product inserted unnaturally into the scene.

---

# 9. Lifestyle

### Purpose
Show the product as part of ordinary life rather than as the sole subject.

### Required
- A recognizable everyday activity or context.
- Product integrated into that activity.
- Behavior remains natural even when camera is present.

### Camera
- Smartphone handheld.
- Can be self-shot or observed from nearby.

### Narrative
`activity → natural product presence → small product moment → continuation`

### Product visibility
**Medium**

### Interaction
**Low → Medium**

### Failure modes
- Creator stopping the activity to advertise.
- Artificial posing.
- Product constantly facing camera.
- Environment feeling like a commercial set.

---

# 10. Product Showcase

### Purpose
Make product details, construction, texture, silhouette, or function visually legible.

### Required
- Product is the dominant subject.
- At least one specific product attribute is visually emphasized.

### Camera
- Smartphone close-up or medium shot.
- Controlled but still social-native.

### Narrative
`establish product → inspect detail → demonstrate attribute → final view`

### Product visibility
**Dominant**

### Interaction
**Medium → High**

### Realism rules
- Texture must remain stable.
- Logos, patterns, seams, labels, buttons, and hardware must not change.
- Hand/product contact must obey physical geometry.

### Failure modes
- Product morphing.
- Texture hallucination.
- Logo distortion.
- Impossible hand placement.
- Excessive macro-commercial look.

---

# 11. Before / After

### Purpose
Communicate a visible transformation.

### Required
- Clearly distinguishable initial and final states.
- Transition must be understandable.
- Product or styling change is the causal event.

### Camera
Prefer consistent framing across states.

### Narrative
`before → change → after`

### Product visibility
**High**

### Interaction
**Medium**

### Realism rules
- Keep camera position and creator identity stable.
- Changes must be attributable to the transformation.
- Avoid unrelated environmental changes.

### Failure modes
- Different person between states.
- Different body proportions.
- Background teleportation.
- Product details changing for no reason.

---

# 12. Unboxing

### Purpose
Reveal a product from packaging and create a discovery sequence.

### Required
- Packaging is initially present.
- Opening/reveal action is clear.
- Product becomes progressively visible.

### Camera
- Smartphone close/medium framing.
- Hands and packaging should remain visible when relevant.

### Narrative
`package → open → reveal → inspect → first reaction`

### Product visibility
**Low → Dominant**

### Interaction
**High**

### Failure modes
- Packaging changes dimensions.
- Product appears before reveal.
- Hands pass through packaging.
- Product changes between reveal and inspection.

---

# 13. Hybrid

### Purpose
Combine two or more formats only when the combination adds meaningful communication value.

### Required
- Explicit primary format.
- Explicit secondary format.
- Clear transition between modes.
- No unnecessary format switching.

### Examples
- Talking Head → Silent Mirror Selfie
- Voice-over → Try-On
- GRWM → Silent Mirror Selfie
- Talking Head → Product Showcase

### Product visibility
Depends on the component formats.

### Failure modes
- Format switching without narrative reason.
- Too many modes for the duration.
- Each component feeling like a separate advertisement.

---

# 14. Cross-Format Behavioral Rules

All formats share these baseline constraints:

## Human behavior
- Movement begins and ends naturally.
- Weight shifts are plausible.
- Hands have a reason to move.
- Eyes have a plausible target.
- No unnecessary repeated gestures.

## Camera behavior
- Camera motion follows the person holding it.
- Handheld footage may contain tiny framing corrections.
- Camera should not move like a stabilized commercial rig unless requested.

## Clothing behavior
- Fabric follows body movement.
- Folds change gradually.
- Garments retain cut, color, material, and construction.
- Hands can compress fabric but cannot pass through it.

## Environment behavior
- Lighting direction remains stable within a scene.
- Objects do not teleport.
- Background geometry stays consistent.
- Reflections obey physical positioning.

---

# 15. Format Selection Priority

When multiple formats could satisfy a request, resolve them in this order:

1. Respect explicit user format.
2. Check compatibility with campaign objective and angle.
3. Check duration feasibility.
4. Check scene-count feasibility.
5. Prefer the format requiring the fewest unnecessary production assumptions.
6. Preserve the user's intended UGC behavior over visual spectacle.

The system should **not silently replace** a requested format. If the combination is weak or infeasible, it should flag the conflict and provide a constrained adaptation.

---

# 16. Downstream Requirements

The format specification must feed these later engines:

### Script / Behavior Engine
Determines whether output requires:
- dialogue,
- behavioral sequence,
- or both.

### Storyboard Engine
Determines:
- framing,
- action,
- product visibility,
- environment,
- transitions.

### Image Prompt Engine
Must encode:
- format-specific camera relationship,
- creator behavior,
- product state,
- environment.

### Video Prompt Engine
Must encode:
- start state,
- end state,
- movement,
- camera motion,
- clothing physics,
- identity/product continuity.

### Quality Control
Must check format-specific failure modes before final output.
