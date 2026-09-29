# AFFILIX — Video Prompt

VIDEO-PROMPT.md mendefinisikan aturan untuk mengubah Video Spec menjadi prompt video frame-to-frame yang siap digunakan oleh video generation system.

Pipeline:

START REFERENCE
→ VIDEO SPEC
→ VIDEO PROMPT
→ GENERATED VIDEO
→ END STATE

Video Prompt adalah **generation instruction**, bukan Source of Truth.

## 1. Purpose

Video Prompt digunakan untuk:
- menerjemahkan Video Spec menjadi instruksi video generation
- mempertahankan Start State
- menghasilkan Required Transition
- mencapai End State
- mempertahankan identity dan continuity
- menerapkan camera movement dan performance
- menjaga naturalization tetap berada dalam batas state
- mencegah video generator menciptakan perubahan yang tidak diminta

## 2. Core Principle

Video Spec menjawab:

> WHAT must happen?

Video Prompt menjawab:

> HOW should the video generation system make it happen?

Model utama:

> START STATE → TRANSITION → END STATE

Video Prompt tidak boleh mengubah:
- Product Truth
- Product Identity
- Character Identity
- Start State
- End State
- required transition
- declared continuity constraints

## 3. Video Prompt Record

Gunakan struktur:

### Video Prompt Record

- Prompt ID:
- Video Spec ID:
- Scene ID:
- Clip ID:
- Duration:
- Start Reference ID:
- End Reference ID:
- Prompt Objective:
- Identity Block:
- Start State Block:
- Transition Block:
- Character Performance Block:
- Product Action Block:
- Environment Block:
- Camera Movement Block:
- Timing Block:
- End State Block:
- Continuity Block:
- Naturalization Block:
- Audio-Sync Block:
- Negative Constraints:
- Source References:
- Status:

## 4. Prompt Assembly Order

Urutan default:

1. generation objective
2. identity preservation
3. start state
4. primary transition
5. character performance
6. product action
7. environment behavior
8. camera movement
9. timing
10. end state
11. continuity
12. naturalization
13. negative constraints

Semantic priority tetap mengikuti Video Spec meskipun target generator membutuhkan format berbeda.

## 5. Identity Block

Identity Block harus mempertahankan identity sepanjang clip.

### Character

Untuk Rositasari:
- preserve established facial identity
- preserve established facial proportions
- preserve skin characteristics
- hijab remains present
- hair remains fully covered
- preserve established wardrobe when applicable

Identity harus tetap sama di seluruh transition.

### Product

Preserve:
- brand
- product name
- variant
- packaging
- shape
- color
- logo
- documented physical details

Product appearance tidak boleh berubah hanya karena camera movement atau hand interaction.

## 6. Start State Block

Start State Block menjelaskan kondisi awal video.

Contoh:

> Rositasari is seated at the table, facing camera, with the closed product placed in front of her.

Start State harus cocok dengan Start Reference.

Jangan memulai dengan action yang belum terjadi.

## 7. Transition Block

Transition Block adalah inti Video Prompt.

Format:

> Start State → action → End State

Contoh:

> Rositasari reaches forward, picks up the product with her right hand, and brings it to chest height.

Transition harus mengikuti Video Spec.

Jangan menambahkan narrative beat baru.

## 8. Character Performance Block

Character Performance Block dapat menjelaskan:
- movement quality
- gaze behavior
- head movement
- facial expression
- gesture
- posture transition
- hand movement
- speech-related movement
- weight shift

Performance harus natural dan konsisten dengan Performance module.

Performance tidak boleh mengubah identity.

## 9. Product Action Block

Product Action Block menjelaskan:
- pick up
- place down
- open
- close
- rotate
- reposition
- hand transfer
- interaction

Hanya gunakan action yang ditetapkan Video Spec.

Jangan menambahkan:
- invented product mechanisms
- invented contents
- unsupported physical effects
- unsupported product performance

## 10. Environment Block

Environment Block menjaga continuity selama motion.

Contoh:
- table remains fixed
- background remains spatially consistent
- key environment anchors remain in place
- lighting remains coherent

Environmental motion hanya ditambahkan jika diperlukan oleh Video Spec atau naturalization.

## 11. Camera Movement Block

Camera Movement Block menerjemahkan Camera requirements.

Contoh:
- static medium shot
- slow push-in
- subtle handheld drift
- controlled pan
- focus shift

Camera movement harus menghasilkan Camera State yang sesuai dengan End State.

Jangan menggunakan camera movement untuk menutupi state transition yang belum didefinisikan.

## 12. Timing Block

Timing Block dapat menentukan:
- when transition starts
- action duration
- dialogue synchronization
- camera timing
- end-state stabilization

Contoh:

> hold the opening state briefly, then begin the pickup action, and allow the final held state to settle before the clip ends.

Jika Global Timeline memiliki timing spesifik, prompt harus menghormatinya.

## 13. End State Block

End State Block mendeskripsikan kondisi akhir.

Contoh:

> The product ends open and held in Rositasari's right hand near chest height, front-facing toward the camera.

End State harus sesuai dengan End Reference jika tersedia.

## 14. Continuity Block

Continuity Block menjaga:

### Character
- face
- body identity
- wardrobe
- hijab
- spatial position

### Product
- packaging
- logo
- color
- orientation
- quantity
- hand relationship

### Environment
- layout
- surfaces
- background anchors
- lighting

### Camera
- perspective
- framing
- camera side
- subject relationship

Continuity requirements harus berasal dari upstream state and specs.

## 15. Naturalization Block

Naturalization dapat membuat motion lebih believable.

Allowed examples:
- natural blinking
- breathing
- subtle eye movement
- small facial adjustments
- finger repositioning
- natural weight shift
- realistic speech rhythm
- slight handheld camera behavior
- subtle autofocus behavior

Naturalization must not:
- change identity
- change required state
- change product identity
- change narrative action
- invent interaction
- change camera requirement
- change dialogue meaning

Naturalization is subordinate to Video Spec.

## 16. Audio-Sync Block

Audio synchronization dapat digunakan untuk visual timing.

Contoh:
- mouth movement aligns with dialogue
- hand action occurs on spoken beat
- product sound corresponds to product action
- camera transition aligns with narrative beat

Audio authority tetap berada di AUDIO-DESIGN.md.

Video Prompt hanya mengimplementasikan visual timing dependency.

## 17. Negative Constraints

Negative constraints melindungi high-risk continuity requirements.

Contoh:
- no face drift
- no visible hair
- no wardrobe change
- no packaging redesign
- no logo alteration
- no extra product
- no unsupported product contents
- no object teleportation
- no arbitrary scene change
- no camera-side jump
- no sudden reframing

Negative constraints harus spesifik dan relevan.

## 18. State Preservation

State preservation harus eksplisit ketika state mudah drift.

Contoh:

> Keep the product in Rositasari's right hand throughout the transition.

> Maintain the same table position and camera side.

State preservation tidak boleh bertentangan dengan Required Transition.

## 19. Motion Specificity

Gunakan motion verbs yang observable:

- reaches
- picks up
- opens
- closes
- places
- turns
- raises
- lowers
- looks toward
- returns gaze
- steps forward
- sits
- stands

Hindari instruction yang terlalu abstrak:

> make it dynamic

> make it engaging

> make it cinematic

Jika motion memang diperlukan, jelaskan perubahan state yang dimaksud.

## 20. One Primary Transition

Satu Video Prompt mengikuti satu primary Video Spec.

Jika beberapa micro-actions diperlukan untuk mencapai End State, gabungkan hanya jika semuanya merupakan bagian dari transition yang sama.

Jangan memasukkan narrative beat tambahan hanya karena generator mampu membuat lebih banyak gerakan.

## 21. Clip Duration

Duration harus mengikuti active platform configuration.

Untuk Google Flow:

- 4s
- 6s
- 8s
- 10s

Duration tidak boleh diubah oleh prompt.

Narrative timing berasal dari Global Timeline.

## 22. Prompt and Reference

Start Reference adalah anchor utama untuk initial visual state.

End Reference, jika tersedia, adalah anchor untuk target state.

Video Prompt harus menjembatani keduanya.

Jangan memperlakukan reference image sebagai storyboard motion.

## 23. Bridge Continuity

Jika clip adalah bagian dari continuity chain:

> Clip N End State = Clip N+1 Start State

Video Prompt Clip N harus mencapai state yang dapat digunakan oleh Clip N+1.

Jangan menambahkan reset visual di akhir clip hanya karena clip akan selesai.

## 24. Claim Safety

Video Prompt tidak boleh menghasilkan visual yang menyiratkan unsupported product claims.

Contoh:
- unverified performance effect
- invented product mechanism
- guaranteed result
- exaggerated reaction implying factual benefit
- invented product contents

Semua product-related visual claims harus grounded in Product Truth.

## 25. Missing Data

Jika Video Spec memiliki UNKNOWN:

- preserve UNKNOWN
- do not invent
- block generation if ambiguity materially affects the transition

Jangan memilih action arbitrer untuk mengisi missing state.

## 26. Prompt Conflict Resolution

Jika prompt sections conflict:

1. Source of Truth
2. Identity constraints
3. Start/End State
4. Required Transition
5. Continuity requirements
6. Camera requirements
7. Naturalization
8. decorative detail

Lower-priority instructions cannot override higher-priority constraints.

## 27. Generated Video

Generated video adalah output.

Ia bukan Source of Truth.

Jika generated video menghasilkan:
- face drift
- product drift
- wrong state
- wrong camera state
- wrong transition

jangan mengubah upstream source hanya agar hasil generator terlihat benar.

Revise affected specification or prompt and regenerate.

## 28. Regeneration

Regeneration harus targeted.

Examples:

Face drift:
→ strengthen Identity Block and reference constraints.

Product hand drift:
→ strengthen Product Action Block and state preservation.

Camera drift:
→ revise Camera Movement Block.

Wrong End State:
→ revise End State Block and affected Video Spec.

Tidak perlu regenerate unrelated clips.

## 29. Dependency Rules

Video Prompt depends on:
- Video Spec
- Production Spec
- Clip
- Global Timeline
- Start Reference
- End Reference
- Character Identity
- Product Truth
- Character State
- Product State
- Environment State
- Camera State
- Performance
- Audio timing dependencies
- active platform configuration

Changes upstream may make Video Prompt STALE.

## 30. Stale Propagation

Examples:

Character Identity change:
→ affected Character State
→ affected Reference State
→ Video Spec stale
→ Video Prompt stale

Product State change:
→ affected Reference State
→ Video Spec stale
→ Video Prompt stale

Camera State change:
→ Video Spec stale
→ Video Prompt stale

Timeline change:
→ Video Spec stale
→ Video Prompt stale

Platform duration change:
→ affected Clip
→ affected Video Spec
→ Video Prompt stale where duration changes.

## 31. Status

Video Prompt follows:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

LOCKED Video Prompt is the current generation instruction for the clip.

## 32. Boundary with Video Spec

Video Spec:
> required transition.

Video Prompt:
> generation instruction implementing that transition.

Video Prompt may change wording without changing the required transition.

## 33. Boundary with Image Prompt

Image Prompt produces a snapshot.

Video Prompt produces a transition.

Image Prompt:
> stable state.

Video Prompt:
> State A → State B.

Do not put motion logic into Image Prompt.

## 34. Boundary with Naturalization

Naturalization is a controlled part of the video generation instruction.

It may add micro-motion.

It may not override Video Spec.

## 35. Boundary with Audio Design

Audio Design defines audio.

Video Prompt may reference audio synchronization.

It does not redefine Voice Identity or Audio Design.

## 36. Boundary with Clip

Clip defines the generation unit.

Video Prompt is the generation instruction for that clip.

One clip has one primary Video Prompt.

## 37. Prompt Quality Rules

A good Video Prompt:
- starts from a clear state
- defines one coherent primary transition
- ends in a clear state
- preserves identity
- preserves product truth
- preserves continuity
- uses observable motion
- respects timing
- keeps naturalization controlled
- avoids unsupported details
- avoids contradictory instructions

## 38. Non-Negotiable Rules

1. Video Prompt is downstream of Video Spec.
2. Video Prompt implements the required transition.
3. Every clip must have a clear Start State.
4. Every clip must have a clear End State.
5. The transition must connect Start State to End State.
6. One clip has one primary Video Prompt.
7. Duration must follow active platform configuration.
8. Character Identity must remain stable.
9. Product Identity must remain stable.
10. Product state changes must be explicit.
11. Naturalization cannot change required identity or state.
12. Unsupported product claims must not be introduced.
13. Missing critical data must not be fabricated.
14. Audio synchronization does not override Audio Design authority.
15. Prompt conflicts resolve through Source of Truth and priority rules.
16. Generated video does not become Source of Truth automatically.
17. Changes propagate through dependency rules.
18. Regeneration must be targeted.
19. Video Prompt must remain distinct from Image Prompt.
20. No separate validation stage is introduced.
