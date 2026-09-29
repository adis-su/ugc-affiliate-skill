# AFFILIX — Video Spec

VIDEO-SPEC.md mendefinisikan apa yang harus terjadi antara Start State dan End State sebuah clip.

Video Spec adalah jembatan:

PRODUCTION SPEC
→ VIDEO SPEC
→ VIDEO PROMPT

Video Spec menjawab:

> State apa yang dimulai, perubahan apa yang terjadi, dan state apa yang harus dicapai?

Video Spec bukan:
- Video Prompt
- Clip
- Reference State
- Character Performance
- Naturalization
- Camera movement prose prompt
- validation stage

## 1. Purpose

Video Spec digunakan untuk:
- menerjemahkan Production Spec menjadi transition requirements
- menetapkan Start State
- menetapkan End State
- menetapkan perubahan yang wajib terjadi
- menetapkan continuity constraints
- menentukan timing requirements
- menyediakan input terstruktur untuk Video Prompt
- mencegah prompt menghasilkan perubahan yang tidak diminta

## 2. Core Principle

Video Spec menjawab WHAT CHANGES.

Video Prompt menjawab HOW THE CHANGE IS GENERATED.

Model utama:

> START STATE → TRANSITION → END STATE

Bukan:

> IMAGE → IMAGE → IMAGE

Reference image hanya merepresentasikan state.

## 3. Video Spec Record

Gunakan struktur:

### Video Spec Record

- Video Spec ID:
- Scene ID:
- Clip ID:
- Duration:
- Start Reference ID:
- End Reference ID:
- Start State:
- Required Transition:
- End State:
- Character Requirements:
- Product Requirements:
- Environment Requirements:
- Camera Requirements:
- Timing Requirements:
- Performance Requirements:
- Continuity Requirements:
- Naturalization Constraints:
- Audio Dependencies:
- Prohibited Changes:
- Source References:
- Dependencies:
- Status:

## 4. Clip Duration

Duration mengikuti platform configuration.

Untuk Google Flow, supported clip durations berasal dari:
00_KNOWLEDGE/PLATFORM/GOOGLE-FLOW.md

Current supported values:
- 4s
- 6s
- 8s
- 10s

Duration adalah constraint produksi, bukan alasan untuk mengubah narrative timing.

Scene dapat memiliki duration lebih panjang dan dibagi menjadi beberapa clip.

## 5. Start State

Start State harus merepresentasikan kondisi awal clip.

Start State dapat berasal dari:
- Start Reference
- End State clip sebelumnya
- Reference State
- Visual State
- Character State
- Product State
- Camera State

Untuk continuity antar clip:

> End State Clip N = Start State Clip N+1

jika kedua clip berada dalam continuity chain yang sama.

## 6. Required Transition

Required Transition menjelaskan perubahan yang memang harus terjadi.

Format:

> State A → Action / Movement → State B

Contoh:

> product on table → character picks it up → product held in right hand.

Transition harus observable.

Jangan menulis transition sebagai hasil yang ambigu seperti:
> make it look natural.

Naturalness bukan state transition.

## 7. End State

End State harus mendeskripsikan kondisi akhir clip.

End State dapat menjadi:
- End Reference
- Bridge Reference
- Start Reference clip berikutnya

End State harus cukup stabil untuk menjadi continuity anchor.

## 8. Character Requirements

Video Spec dapat menentukan:
- body movement
- pose transition
- posture transition
- head movement
- gaze movement
- facial expression transition
- hand movement
- gesture
- interaction with product
- spatial movement
- performance timing

Character Identity tetap immutable.

Untuk Rositasari:
- facial identity remains consistent
- hijab remains present
- hair remains fully covered

Video motion tidak boleh mengubah identity.

## 9. Product Requirements

Video Spec dapat menentukan:
- open/close transition
- held/placed transition
- position change
- orientation change
- visibility change
- interaction with character
- quantity change only when explicitly supported

Product Identity tetap immutable.

Video Spec tidak boleh mengarang:
- product contents
- material behavior
- performance
- size
- benefits
- quality
- unsupported physical properties

## 10. Environment Requirements

Environment transition dapat mencakup:
- character movement through space
- object interaction
- spatial relationship change
- environmental object movement
- lighting change when explicitly required

Jangan mengubah environment hanya untuk memperindah motion.

## 11. Camera Requirements

Camera Requirements dapat menentukan:
- static camera
- pan
- tilt
- push-in
- pull-back
- tracking
- reframing
- focus shift
- handheld behavior

Camera movement harus menghasilkan Start Camera State → End Camera State yang jelas.

Contoh:

> medium shot → gradual push-in → medium close-up.

Video Spec mendefinisikan movement requirement.

Video Prompt nantinya mendefinisikan implementasi motion.

## 12. Timing Requirements

Timing dapat mencakup:
- transition start
- transition duration
- action timing
- dialogue timing
- camera timing
- product interaction timing
- end-state stabilization

Timing harus mengikuti Global Timeline.

Jika Timeline memiliki event:

> product lifted at 3.2s

Video Spec harus mempertahankan timing tersebut.

## 13. Performance Requirements

Performance Requirements menentukan bagaimana action dilakukan secara behaviorally, tanpa menggantikan Character Identity.

Contoh:
- natural hand repositioning
- brief gaze shift
- conversational head movement
- weight shift while standing
- natural pause before action

Performance harus tetap konsisten dengan Character State dan Performance module.

## 14. Continuity Requirements

Continuity requirements mencakup:

### Character
- same identity
- same wardrobe
- same hijab coverage
- consistent body identity

### Product
- same identity
- consistent packaging
- correct state progression
- correct hand relationship

### Environment
- same spatial layout
- same key anchors
- consistent lighting environment

### Camera
- coherent movement
- consistent perspective
- no unexplained teleportation

## 15. Naturalization Constraints

Naturalization dapat menambahkan micro-motion seperti:
- blinking
- breathing
- eye movement
- subtle facial movement
- finger repositioning
- slight weight shift
- natural speech rhythm
- subtle handheld drift
- autofocus behavior

Namun naturalization tidak boleh:
- change identity
- change required state
- change product identity
- change narrative action
- invent a new interaction
- alter required camera state
- change dialogue meaning

Naturalization is subordinate to state continuity.

## 16. Audio Dependencies

Video Spec dapat mencatat synchronization dependencies.

Contoh:

> hand reaches product during the phrase describing the action.

> product closes immediately after the corresponding dialogue beat.

Audio authority tetap berada pada AUDIO-DESIGN.md.

Video Spec hanya mendefinisikan visual synchronization requirements.

## 17. Dialogue Relationship

Dialogue berasal dari Script / Dialogue modules.

Video Spec hanya menggunakan timing dan delivery dependencies yang diperlukan untuk visual production.

Jangan menulis ulang Dialogue di Video Spec kecuali diperlukan sebagai timing reference.

## 18. Reference Relationship

Video Spec menggunakan reference sebagai state anchor.

Relationship:

> Start Reference → Video Transition → End Reference

Reference bukan animation instruction.

Video Spec harus memastikan transition logically connects kedua state.

## 19. Bridge Reference

Bridge Reference adalah End Reference yang menjadi Start Reference untuk clip berikutnya.

Untuk continuity chain:

> Clip 01 End State = R02
> Clip 02 Start State = R02

Jangan membuat state baru hanya karena clip berganti.

## 20. State Transition Model

Gunakan:

> STATE A
> ↓
> ACTION / TRANSITION
> ↓
> STATE B

Contoh:

> Rositasari seated, product on table
> ↓
> reaches forward and picks product up
> ↓
> Rositasari holds product near chest

Action adalah transition.

State A dan State B adalah conditions.

## 21. Atomic Transition

Satu Video Spec harus memiliki satu primary transition.

Jika satu clip membutuhkan beberapa perubahan yang saling bergantung, perubahan tersebut boleh berada dalam satu transition chain selama semuanya diperlukan untuk mencapai End State.

Hindari memasukkan beberapa narrative beats yang tidak berhubungan hanya karena masih muat dalam durasi clip.

## 22. Transition Boundaries

Clip boundary sebaiknya berada pada state yang stabil.

Contoh:

Scene:
> character walks to table and picks up product.

Dapat dibagi:

Clip 01:
> standing → arrives at table.

Clip 02:
> arrives at table → product held.

Boundary berada pada state yang dapat direpresentasikan dengan reference stabil.

## 23. Visual Priority

Jika banyak perubahan terjadi bersamaan, priority mengikuti:
1. required state transition
2. identity preservation
3. critical product interaction
4. critical character performance
5. camera transition
6. secondary environmental motion
7. decorative motion

Priority menentukan fokus produksi, bukan ranking kualitas.

## 24. Prohibited Changes

Video Spec dapat menetapkan:

### Character
- no face drift
- no hair visibility
- no wardrobe change
- no body identity change

### Product
- no packaging change
- no logo change
- no unsupported contents
- no unsupported quantity change

### Environment
- no spatial teleportation
- no unexplained object duplication
- no arbitrary scene transformation

### Camera
- no silent perspective jump
- no unsupported camera-side change
- no arbitrary reframing

## 25. Unsupported Claims

Video Spec tidak boleh menghasilkan visual yang menyiratkan unsupported product claims.

Contoh yang harus dihindari tanpa Product Truth:
- product visibly performs an unverified function
- product produces an unsupported effect
- product changes physical properties without basis
- user reaction implying guaranteed benefit

Visual action must remain within documented Product Truth.

## 26. Missing Data

Jika transition membutuhkan data yang tidak tersedia:
- mark UNKNOWN
- preserve known states
- do not invent action
- block dependent video generation when ambiguity is material

Contoh:

Jika destination position product tidak diketahui, jangan memilih posisi arbitrer jika posisi tersebut diperlukan untuk continuity.

## 27. Video Spec and Video Prompt

Relationship:

> Video Spec = WHAT
> Video Prompt = HOW

Video Spec:
> product moves from table to right hand while camera remains medium shot.

Video Prompt:
> generation instructions for implementing that movement.

Prompt wording may vary.

Required transition may not.

## 28. Video Spec and Image Spec

Image Spec defines snapshot.

Video Spec defines transition between snapshots.

Relationship:

> Image Spec / Reference State
> ↓
> Video Spec
> ↓
> Video Prompt

## 29. Video Spec and Production Spec

Production Spec defines production requirements at a broader level.

Video Spec specializes those requirements for a clip.

Example:

Production Spec:
> product must remain recognizable and transition from placed to held.

Video Spec:
> product starts closed on table, is picked up by right hand, and ends held at chest height while remaining front-facing.

## 30. Video Spec and Camera State

Camera State defines camera condition.

Video Spec defines how camera condition changes when movement is required.

Example:

Camera State A:
> medium eye-level.

Video Spec:
> gradual push-in.

Camera State B:
> medium close-up eye-level.

## 31. Video Spec and Performance

Performance module defines character behavior style.

Video Spec defines performance required for this clip.

Example:

Performance:
> natural conversational movement.

Video Spec:
> brief gaze shift to product followed by return to camera.

## 32. Video Spec and Naturalization

Video Spec sets the boundary.

Naturalization adds micro-movement within that boundary.

If Video Spec requires:
> product remains in right hand at End State.

Naturalization cannot:
> transfer product to left hand.

## 33. Dependency Rules

Video Spec depends on:
- Production Spec
- Clip
- Global Timeline
- Start State
- End State
- Character State
- Product State
- Environment State
- Camera State
- Reference State
- Performance
- Dialogue timing
- Audio Design when synchronization is relevant
- Google Flow configuration when platform is Google Flow

Changes upstream may make Video Spec STALE.

## 34. Stale Propagation

Examples:

Start State change:
→ Video Spec stale.

End State change:
→ Video Spec stale.

Character Identity change:
→ affected Video Spec stale.

Product State change:
→ affected Video Spec stale.

Timeline change:
→ affected Video Spec stale.

Platform duration configuration change:
→ affected Clip and Video Spec stale where duration is affected.

## 35. Targeted Regeneration

Video Spec supports targeted regeneration.

Examples:

Only gaze transition changed:
→ revise affected Video Spec and Video Prompt.

Product hand changed:
→ revise affected Product State, Reference State, Video Spec, and Video Prompt.

Camera movement changed:
→ revise affected Camera State and Video Spec.

Unrelated clips remain unchanged.

## 36. Status

Video Spec follows:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

LOCKED Video Spec becomes a constraint for Video Prompt generation.

## 37. Source of Truth

Video Spec is authoritative for the required transition of its clip.

Upstream domains remain authoritative for:
- Product Truth
- Character Identity
- Voice Identity
- Environment
- Visual Language
- State
- Timeline
- Audio

Video Spec cannot overwrite upstream truth.

## 38. Boundary with Video Prompt

Video Spec:
> required state transition.

Video Prompt:
> generation instruction.

Video Prompt may be rewritten without changing Video Spec.

## 39. Boundary with Clip

Clip defines the generation unit.

Video Spec defines the required production transition inside that unit.

## 40. Boundary with Naturalization

Video Spec defines required behavior and prohibited state changes.

Naturalization adds subtle realism without changing those requirements.

## 41. Boundary with Validation

AFFILIX does not create a separate validation stage.

Requirements remain active throughout production.

If generated output fails to represent the required state, the appropriate affected production layer is revised or regenerated according to failure-handling and regeneration rules.

## 42. Non-Negotiable Rules

1. Video Spec defines the required transition.
2. Video Prompt defines how that transition is generated.
3. Every Video Spec must have a Start State.
4. Every Video Spec must have an End State.
5. Required transition must connect Start State to End State.
6. One clip has one primary Video Spec.
7. Clip duration must follow active platform configuration.
8. End State must be stable enough for continuity when used as a bridge.
9. Identity must not drift during transition.
10. Product state changes must be explicit.
11. Naturalization cannot change identity, state, or narrative transition.
12. Unsupported product claims must not enter the transition.
13. Missing critical data must not be fabricated.
14. Audio synchronization may be referenced without taking over Audio Design authority.
15. Changes propagate through dependency rules.
16. Regeneration must be targeted.
17. Generated video does not become Source of Truth automatically.
18. No separate validation stage is introduced.
