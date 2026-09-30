# Video Prompt Engine Specification\n\nThe Video Prompt Engine converts consecutive Scene States into one frame-to-frame video transition.\n\nIt is the second final-output generation engine.\n\n## Runtime Position\n\nScene N State + Behavior + Image Anchor → Physical Transition → Scene N+1 State\n\nThe engine must describe how one believable visual state changes into the next.\nIt must not reinvent either frame.\n\n## Core Principle\n\nA Video Prompt is:\n\n> A physically plausible transition from one defined visual state to another.\n\nUse:\n\nStarting Frame → Cause → Human Movement → Product / Material Response → Camera / Environment Movement → Ending Frame\n\nDo not use:\n\nStart image → vague cinematic movement → unrelated new scene\n\nThe transition must explain how the ending state is physically reached.\n\n## Inputs\n\nThe engine consumes:\n\n### Starting Scene\n- Scene ID\n- Creator State\n- Product State\n- Environment State\n- Camera State\n- Image Prompt\n\n### Ending Scene\n- Scene ID\n- Creator State\n- Product State\n- Environment State\n- Camera State\n- Image Prompt\n\n### Behavior\n- Primary Action\n- Supporting Action\n- Micro-Behavior\n- Product Interaction\n- Reaction\n- Transition Behavior\n\n### Identity Locks\n- Character Identity Lock\n- Character Reference\n- Product Identity Lock\n- Product Reference\n- Environment Continuity\n- Camera Continuity\n\n### Realism Constraints\n- Human anatomy\n- Natural movement\n- Material physics\n- Product interaction physics\n- Smartphone camera behavior\n- Natural environment movement\n\n## Video Prompt Contract\n\nEvery Frame-to-Frame Video Prompt must resolve:\n\n1. What is the exact starting state?\n2. What changes?\n3. What causes the change?\n4. How does the creator move?\n5. How does the product respond?\n6. How does clothing/material respond?\n7. How does the camera respond?\n8. How does the environment respond?\n9. What is the exact ending state?\n10. Which attributes must remain unchanged?\n\nIf no physical cause exists for a state change, the transition is invalid.\n\n## Output Count Contract\n\nFor N scenes:\n\nImage Prompts = N\nVideo Prompts = N - 1\n\nExamples:\n- 1 scene → 0 video prompts\n- 2 scenes → 1 video prompt\n- 3 scenes → 2 video prompts\n- 4 scenes → 3 video prompts\n- 5 scenes → 4 video prompts\n\nNever create a video prompt for a nonexistent transition.\n\n## Transition Assembly Hierarchy\n\nAssemble in this order:\n\n1. Starting Frame Anchor\n2. Physical Cause\n3. Human Movement\n4. Facial Movement\n5. Product Movement\n6. Material / Clothing Physics\n7. Camera Movement\n8. Environment Movement\n9. Ending Frame Anchor\n10. Continuity Constraints\n\nThis hierarchy prioritizes causality over visual spectacle.\n\n## 1. Starting Frame Anchor\n\nThe starting frame is the Image Prompt for Scene N.\n\nPreserve:\n- creator identity\n- pose\n- wardrobe\n- product identity\n- product state\n- environment\n- camera relationship\n- relevant framing\n\nDo not describe a different opening image.\n\nWhen the generation system supports image-to-video input, the starting image is the primary visual anchor.\n\n## 2. Physical Cause\n\nEvery meaningful state change requires a cause.\n\nExamples:\n\n### Fashion\nhand pulls sleeve upward → sleeve moves and settles\n\n### Beauty\napplicator touches cheek → product transfers to skin\n\n### Home\nhand pushes organizer inward → organizer slides into shelf position\n\n### Camera\ncreator shifts phone slightly → framing changes naturally\n\nBad:\n\n> The outfit suddenly changes.\n\nGood:\n\n> The creator pulls the jacket into place, causing the front panels to shift and settle into the new position.\n\nA transition should be causal, not magical.\n\n## 3. Human Movement\n\nHuman motion must be:\n- anatomically plausible\n- continuous\n- appropriately paced\n- task-driven\n- proportional to the scene duration\n\nPrioritize:\n- weight transfer\n- shoulder movement\n- elbow movement\n- wrist rotation\n- finger contact\n- head movement\n- eye direction\n- natural posture adjustment\n\nAvoid:\n- teleporting limbs\n- sudden pose jumps\n- rubber-like joints\n- accelerated gestures\n- unnecessary full-body motion\n\n### One Primary Movement\n\nEach transition should have one dominant human movement.\nSupporting movements are subordinate.\n\nExample:\n\n> She raises her right hand to adjust the collar while her shoulders make a small natural counter-shift.\n\nNot:\n\n> She adjusts the collar, turns, smiles, waves, fixes her hair, and steps backward.\n\nHuman beings are complicated enough without forcing six actions into half a second.\n\n## 4. Facial Movement\n\nFacial changes should follow the stimulus.\n\nUse:\n- eye movement\n- gaze shift\n- small eyebrow movement\n- subtle smile\n- brief neutral-to-pleased change\n- natural blink when appropriate\n\nDo not force expressions.\n\nA reaction must have a visible cause.\n\nExample:\n\nsees the finished application → eyes inspect the result → subtle satisfied expression\n\nAvoid:\n\ninstant huge smile because the prompt demanded happy\n\n## 5. Product Movement\n\nProduct movement must follow physical interaction.\n\nDescribe:\n- contact\n- grip\n- release\n- placement\n- rotation\n- opening\n- closing\n- application\n- displacement\n\nThe product must preserve:\n- identity\n- shape\n- color\n- pattern\n- packaging\n- visible branding\n- functional parts\n\nDo not allow:\n- product morphing\n- unexplained size changes\n- duplicate products\n- disappearing products\n- impossible grip\n- floating objects\n\n## 6. Material and Clothing Physics\n\nMaterials respond to movement.\n\n### Fashion\nPreserve:\n- fabric folds\n- stretch\n- drape\n- seam behavior\n- sleeve movement\n- hem movement\n- garment settling\n\nA garment should respond to the body rather than independently animating.\n\n### Beauty\nPreserve:\n- product transfer\n- wetness or texture when supported\n- blending behavior\n- skin response\n- realistic applicator contact\n\nDo not invent unsupported physical properties.\n\n### Home\nPreserve:\n- friction\n- contact\n- object weight\n- surface interaction\n- shadows\n- displacement\n- deformation only when physically plausible\n\n## 7. Camera Movement\n\nCamera movement should match ordinary UGC capture.\n\nPossible behaviors:\n- slight handheld drift\n- small phone reposition\n- natural wrist movement\n- subtle reframing\n- minor exposure adjustment\n\nUse camera movement only when motivated by creator behavior.\n\n### Mirror Selfie\n\nThe camera is attached to the creator's phone.\n\nTherefore:\n- phone movement affects framing\n- creator movement affects reflection\n- mirror geometry remains stable\n- phone and reflection remain physically related\n\nDo not use:\n- drone movement\n- orbit shots\n- impossible camera rotations\n- cinematic tracking\n- unexplained camera teleportation\n\n## 8. Environment Movement\n\nEnvironment movement should be minimal.\n\nPossible natural movement:\n- curtain shift\n- hair responding to movement\n- fabric movement\n- subtle background activity\n- shadow movement caused by the creator\n\nDo not animate static objects without cause.\n\nThe environment exists primarily to preserve spatial continuity.\n\n## 9. Ending Frame Anchor\n\nThe ending frame must resolve exactly toward Scene N+1.\n\nPreserve the target:\n- creator identity\n- pose\n- product state\n- product position\n- wardrobe\n- environment\n- camera state\n- evidence visibility\n\nThe transition should terminate in a state compatible with the next Image Prompt.\n\n### End-State Rule\n\nThe final moments of the video prompt should not introduce another action after the target state is reached.\n\nThe ending state is the destination.\n\n## Temporal Pacing\n\nMotion density must respect duration.\n\n### 4 Seconds\nUse:\n- one clear physical transition\n- minimal supporting movement\n\n### 6 Seconds\nUse:\n- one primary movement\n- one supporting reaction or camera adjustment\n\n### 8 Seconds\nUse:\n- one primary interaction\n- one secondary state adjustment\n- restrained reaction\n\n### 10 Seconds\nUse:\n- one coherent behavioral sequence\n- multiple causal micro-transitions only when necessary\n\nNever compress five major actions into a short clip.\n\n## State Delta Rule\n\nCompare Scene N and Scene N+1.\nClassify every changed attribute:\n\n### Required Change\nMust have a physical cause.\n\n### Allowed Natural Drift\nSmall incidental changes such as:\n- blink\n- hair movement\n- fabric settling\n- tiny camera drift\n\n### Forbidden Change\nAnything that changes without cause:\n- face identity\n- body proportions\n- product identity\n- garment color\n- room geometry\n- object scale\n- camera universe\n\nIf a changed attribute cannot be classified, repair the transition before generation.\n\n## Continuity Locks\n\nEvery transition inherits continuity locks.\n\n### Character\n- same face\n- same hair identity\n- same skin identity when defined\n- same body identity\n- same wardrobe unless intentionally changed\n\n### Voice\nWhen speech is used:\n- same Voice Identity\n- same vocal characteristics\n- same speech style\n- same accent/pitch when defined\n\nVoice is separate from visual movement.\n\n### Product\n- same product\n- same variant\n- same visible packaging\n- same color/pattern\n- same material appearance\n- state changes only when caused\n\n### Environment\n- same room\n- same major furniture\n- same spatial geometry\n- same relevant object placement\n\n### Camera\n- same phone relationship\n- compatible orientation\n- compatible framing\n- no unexplained camera relocation\n\n## Silent Video Handling\n\nFor silent formats:\n- no dialogue\n- no voice-over\n- no lip-sync\n- no speech-driven facial movement\n\nBehavior must carry the narrative.\n\nExample:\n\nnotice → inspect → adjust → reveal\n\nThe video prompt should express these through physical movement only.\n\n## Spoken Video Handling\n\nFor spoken formats:\n- maintain Voice Identity continuity\n- allow natural mouth movement\n- preserve gaze and conversational behavior\n- keep gestures subordinate to speech\n- do not insert the dialogue into the visual movement description unless necessary for synchronization\n\nThe spoken script remains a separate output.\n\n## CTA Transition\n\nCTA behavior should be natural.\n\nPossible transitions:\n- product remains visible\n- creator brings product slightly toward camera\n- creator settles into a final readable pose\n- gaze shifts toward product or camera\n\nAvoid:\n- abrupt commercial end cards\n- exaggerated pointing\n- unnatural product zoom\n- sudden frozen poses\n\n## Niche-Specific Motion Rules\n\n### Fashion\nPrioritize:\n- body weight transfer\n- garment movement\n- sleeve and hem behavior\n- natural mirror movement\n- fabric settling\n- believable fit changes\n\n### Beauty\nPrioritize:\n- hand-to-face contact\n- applicator movement\n- controlled product transfer\n- gaze toward mirror\n- subtle facial reaction\n- realistic skin interaction\n\n### Home\nPrioritize:\n- hand-object contact\n- object displacement\n- friction\n- placement\n- spatial consistency\n- shadows and contact points\n\n## UGC Motion Language\n\nDefault motion should feel:\n- handheld\n- human-paced\n- slightly imperfect\n- physically grounded\n- casually captured\n- non-performative\n\nDo not default to:\n- cinematic slow motion\n- speed ramps\n- dramatic push-ins\n- orbiting cameras\n- perfect choreography\n- commercial reveal timing\n\nThe goal is not cinematic realism.\n\nThe goal is:\n\n> ordinary human movement captured by a phone.\n\n## Video Prompt Anti-Patterns\n\nDo not:\n- teleport between poses\n- change identity\n- morph products\n- invent material properties\n- animate unrelated background objects\n- introduce cinematic camera movement\n- stack too many actions\n- describe impossible physics\n- create state changes without causes\n- let the ending state drift away from Scene N+1\n- duplicate the spoken script\n- add speech to silent formats\n\n## Video Prompt Validation\n\n| Area | Check | Severity |\n|---|---|---|\n| Count | N scenes produce N−1 transitions | Blocker |\n| Start | Matches Scene N | Blocker |\n| End | Matches Scene N+1 | Blocker |\n| Cause | Every meaningful state change has a cause | Blocker |\n| Human Motion | Anatomically plausible | Blocker |\n| Product Motion | Physically plausible | Blocker |\n| Material | Clothing/product material responds correctly | Blocker |\n| Camera | Movement is physically plausible | Blocker |\n| Environment | No unexplained movement | Warning |\n| Continuity | Character remains stable | Blocker |\n| Continuity | Product remains stable | Blocker |\n| Continuity | Environment remains stable | Blocker |\n| Speech | Matches silent/spoken mode | Blocker |\n| Timing | Motion density fits duration | Warning |\n| UGC | Motion feels phone-captured and human | Warning |\n| Unsupported | No unsupported physical claims | Blocker |\n\n## Transition Repair Rules\n\nRepair the smallest failed component.\n\nExamples:\n\n### Start mismatch\nRestore the Scene N Image Prompt as the opening anchor.\n\n### End mismatch\nModify the final movement so it settles into Scene N+1.\n\n### Pose jump\nAdd the missing intermediate physical movement.\n\n### Product teleport\nAdd explicit hand contact, movement, and placement.\n\n### Clothing morph\nDescribe realistic fabric movement and settling.\n\n### Camera teleport\nReplace with creator-driven phone repositioning.\n\n### Excessive motion\nRemove secondary actions and retain the primary transition.\n\n### Cinematic drift\nReduce camera movement to subtle handheld behavior.\n\n### Silent violation\nRemove speech, lip-sync, or voice-over behavior.\n\n### Identity drift\nRestore Character Identity Lock and Reference.\n\n## Transition Quality Test\n\nA valid transition should answer:\n\n> If the viewer paused the clip at any moment, would the current body, product, camera, and environment state still make physical sense?\n\nIf no, the transition fails.\n\n## Video Prompt Output\n\nFor every consecutive scene pair produce exactly:\n\n- Transition ID\n- From Scene\n- To Scene\n- Frame-to-Frame Video Prompt\n\nDo not include hidden reasoning.\n\nThe prompt must be generation-ready.\n\n## Video Prompt Invariants\n\nThroughout execution:\n- one scene pair → one Video Prompt\n- starting state is anchored\n- ending state is anchored\n- every meaningful change has a cause\n- human movement remains anatomically plausible\n- product movement remains physically plausible\n- material behavior remains believable\n- camera movement remains motivated\n- environment remains stable unless physically affected\n- Character Identity Lock remains stable\n- Product Identity Lock remains stable\n- silent formats remain silent\n- spoken formats preserve Voice Identity\n- no unsupported details are introduced\n- no cinematic behavior is introduced unless explicitly requested\n\n## Relationship to Image Prompt Engine\n\nThe two engines are complementary:\n\nImage Prompt N = Visual State N\n\nVideo Prompt N→N+1 = Physical Transition from State N to State N+1\n\nImage Prompt N+1 = Visual State N+1\n\nTherefore:\n\n> Image Prompts define where the video starts and ends. Video Prompts define how it gets there.\n\nThis relationship is mandatory for frame-to-frame continuity.\n\n## Runtime Integration\n\nUser Input\n→ Normalize\n→ Validate\n→ Product Intelligence\n→ Creator Intelligence\n→ Campaign Intelligence\n→ Format × Angle\n→ Duration / Scene Count\n→ Creative Logic\n→ Scene Planning\n→ Content Behavior\n→ Image Prompt Engine\n→ Video Prompt Engine\n→ Validation\n→ Repair\n→ Revalidate\n→ Output\n\nThe Video Prompt Engine must never bypass Scene Planning or Content Behavior.\n\nThose upstream layers define the destination and intent. The Video Prompt Engine only translates them into physically plausible motion.

## Final Prompt Format

The final Video Prompt must use a stable, ordered transition structure so every clip explains the physical path between two Scene States.

### Canonical Structure

```text
[VIDEO PROMPT]

TRANSITION:
{scene_a} → {scene_b}

DURATION:
{duration}

STARTING STATE:
- Creator: {creator_start}
- Pose: {pose_start}
- Expression: {expression_start}
- Gaze: {gaze_start}
- Product: {product_start}
- Environment: {environment_start}
- Camera: {camera_start}

TRIGGER:
{what_causes_the_change}

CREATOR MOVEMENT:
- Body: {body_movement}
- Hands: {hand_movement}
- Head: {head_movement}
- Face: {facial_movement}
- Gaze: {gaze_movement}

PRODUCT MOVEMENT:
{product_movement}

MATERIAL RESPONSE:
{material_response}

CAMERA MOVEMENT:
{camera_movement}

ENVIRONMENT RESPONSE:
{environment_response}

SPEECH:
{speech_or_silent_behavior}

ENDING STATE:
- Creator: {creator_end}
- Pose: {pose_end}
- Expression: {expression_end}
- Gaze: {gaze_end}
- Product: {product_end}
- Environment: {environment_end}
- Camera: {camera_end}

CONTINUITY LOCK:
{unchanged_attributes}

FORBIDDEN MOTION:
{forbidden_motion}
```

### Assembly Rule

The canonical fields are an **output format**, not a second source of truth. Populate them only from the starting Scene State, ending Scene State, Content Behavior, transition cause, Identity Sources, and Realism Constraints.

The generation prompt may be rendered as a natural-language paragraph after assembly, but the semantic field order must remain stable:

`Starting State → Trigger → Creator Movement → Product Movement → Material Response → Camera Movement → Environment Response → Speech → Ending State → Continuity Lock → Forbidden Motion`

Do not add fields ad hoc per transition.

### Field Rules

- `TRANSITION` identifies the exact consecutive scene pair.
- `DURATION` constrains motion density.
- `STARTING STATE` must match Scene N.
- `TRIGGER` explains the cause of the required state change.
- `CREATOR MOVEMENT` describes the dominant human motion.
- `PRODUCT MOVEMENT` explains product displacement or interaction.
- `MATERIAL RESPONSE` covers clothing, skin, liquid, or object physics only when supported.
- `CAMERA MOVEMENT` describes motivated smartphone movement.
- `ENVIRONMENT RESPONSE` stays minimal unless the environment is physically affected.
- `SPEECH` distinguishes spoken from silent behavior without duplicating the script.
- `ENDING STATE` must match Scene N+1.
- `CONTINUITY LOCK` lists attributes that remain unchanged.
- `FORBIDDEN MOTION` protects known transition failure modes.

### Required Output Shape

For each consecutive scene pair, return exactly:

```text
Transition ID: {scene_a}_TO_{scene_b}
From Scene: {scene_a}
To Scene: {scene_b}

Frame-to-Frame Video Prompt:
{canonical video prompt}
```

No hidden reasoning, implementation notes, or alternate prompt versions belong in the generation-ready output.
