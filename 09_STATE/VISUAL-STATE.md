# AFFILIX — Visual State

`VISUAL-STATE.md` mendefinisikan **kondisi visual aktual pada satu titik waktu atau reference**.

Visual State menjawab:

> **Apa kondisi yang benar-benar terlihat sekarang?**

Visual State adalah gabungan kondisi visual yang diperlukan untuk menjaga continuity, tetapi tetap memisahkan identity dari state.

## 1. Purpose

Visual State digunakan untuk:
- mendeskripsikan kondisi aktual sebuah reference
- menjadi dasar Image Prompt
- menjadi input Start State dan End State Clip
- menjaga continuity antar reference
- menyatukan Character State, Product State, Camera State, dan Environment State
- menyediakan snapshot yang dapat direproduksi

Pipeline:

CLIP → VISUAL STATE → PRODUCTION SPEC → IMAGE/VIDEO OUTPUT

Visual State bukan prompt dan bukan storyboard.

## 2. State vs Identity

Identity menjawab:

> **Siapa atau apa objeknya?**

State menjawab:

> **Sedang dalam kondisi apa objek tersebut?**

Contoh Character Identity:
> Rositasari, 25, female, established facial structure, permanent hijab.

Character State:
> seated, looking toward camera, holding product with right hand.

Contoh Product Identity:
> established brand, packaging, shape, color, material, logo.

Product State:
> open, held in right hand, front facing camera.

Identity tidak berubah hanya karena state berubah.

## 3. Visual State Composition

Visual State dapat terdiri dari:

- Character State
- Product State
- Environment State
- Camera State
- Spatial Relationships
- Lighting State
- Relevant Visual Conditions

Tidak semua component harus ditulis ulang jika tidak berubah.

Namun critical state harus eksplisit.

## 4. Snapshot Principle

Reference adalah snapshot.

Visual State harus menggambarkan kondisi pada moment tertentu, bukan rangkaian aksi.

Benar:

> Rositasari is seated, looking toward camera, product held upright in her right hand.

Bukan:

> Rositasari reaches for the product and then holds it.

Kalimat kedua adalah transition/performance, bukan snapshot.

## 5. State Record

Gunakan struktur:

### Visual State Record

- State ID:
- Reference ID:
- Timestamp:
- Scene ID:
- Clip ID:
- Character State:
- Product State:
- Environment State:
- Camera State:
- Lighting State:
- Spatial Relationships:
- Relevant Visual Conditions:
- Source References:
- Status:

## 6. Character State

Character State dapat mencakup:

- pose
- posture
- body orientation
- gaze direction
- facial expression
- hand position
- gesture
- movement phase
- interaction state
- position in environment

Character State tidak boleh mendefinisikan ulang:
- face identity
- facial structure
- visual age
- body identity
- permanent wardrobe identity
- permanent hijab requirement

Untuk Rositasari:
- hijab tetap hadir.
- seluruh rambut tetap tertutup.

Pose dan expression boleh berubah.

## 7. Product State

Product State dapat mencakup:

- open/closed
- held/placed
- position
- orientation
- visible/partially occluded
- quantity
- interaction state
- contents visibility when explicitly known

Product State tidak boleh mengubah:
- brand
- product name
- variant
- shape
- packaging identity
- logo
- material identity
- established physical details

Jika Product Identity tidak mendukung suatu detail, jangan menciptakannya melalui state.

## 8. Environment State

Environment State dapat mencakup:

- object positions
- door state
- curtain state
- light state
- temporary clutter
- character position relative to environment
- product position relative to environment
- temporary environmental changes

Environment Identity tetap berasal dari Environment module.

## 9. Camera State

Camera State dapat mencakup:

- position
- height
- orientation
- framing
- shot size
- angle
- focal relationship
- movement status
- focus target
- camera distance
- visible field

Camera State adalah kondisi kamera pada snapshot.

Contoh:

> medium close-up, eye-level, camera 1.2m from subject, product visible at chest level.

Jangan menganggap Camera State sebagai camera movement instruction.

Movement belongs to transition/video behavior.

## 10. Lighting State

Lighting State mendeskripsikan kondisi aktual pada reference:

- light direction
- dominant source
- intensity relationship
- shadow direction
- exposure condition
- color temperature character
- practical lights state

Lighting State berbeda dari Visual Language.

Visual Language:
> natural soft daylight.

Lighting State:
> window light coming from camera-left, soft shadow falling toward camera-right.

## 11. Spatial Relationships

Spatial relationships adalah bagian penting dari Visual State.

Gunakan relasi seperti:

- character in front of table
- product on table
- product in right hand
- window behind character
- camera facing character
- character 1m from table

Relasi sering lebih berguna daripada absolute coordinates.

## 12. Relative Positioning

Gunakan relative positioning jika absolute measurement tidak diperlukan.

Contoh:

> product centered between both hands.

> Rositasari seated behind the table.

> camera positioned slightly above eye level.

Absolute measurement hanya digunakan jika benar-benar diperlukan.

## 13. State Transitions

Visual State tidak menjelaskan transition.

Transition menggunakan:

**STATE A → ACTION → STATE B**

Contoh:

State A:
> product closed on table.

Action:
> Rositasari picks it up.

State B:
> product closed in right hand.

State records A dan B.

Action belongs to Performance/Video Spec.

## 14. Reference State

Reference State adalah state package yang dipilih untuk menjadi visual anchor.

Visual State menyediakan kondisi.

Reference State dapat menggabungkan state tersebut menjadi reference snapshot yang siap digunakan downstream.

Relationship:

> Visual State = kondisi visual.

> Reference State = selected state snapshot used as a production reference.

## 15. Start State

Start State adalah Visual State yang berlaku ketika clip dimulai.

Start State harus cocok dengan Start Reference.

Jika mismatch:

> Clip cannot safely continue without resolving the state difference.

Jangan memperbaiki mismatch dengan prompt yang ambigu.

## 16. End State

End State adalah Visual State yang berlaku ketika clip berakhir.

End State harus cukup stabil untuk:
- reference
- bridge
- next clip

Contoh:

> Rositasari remains seated, right hand holding the closed product upright, front facing camera.

## 17. Bridge State

Bridge State adalah End State yang digunakan sebagai Start State berikutnya.

Form:

> End State Clip N = Bridge State = Start State Clip N+1

Bridge State harus menjaga:
- character identity
- character state
- product identity
- product state
- environment
- camera relationship
- lighting
- spatial relationship

## 18. Visual State and Image Prompt

Image Prompt menjelaskan bagaimana menghasilkan visual yang merepresentasikan state.

Visual State:
> product held in right hand, front facing camera.

Image Prompt:
> instruction to render that exact visual condition.

Image Prompt tidak boleh mengubah state.

## 19. Visual State and Video Prompt

Video Prompt menggunakan:

> Start State + Transition + End State

Video Prompt tidak boleh mengarang kondisi awal yang berbeda dari Start State.

## 20. State Granularity

Tidak semua detail perlu disimpan pada setiap state.

Gunakan level detail sesuai continuity risk.

### Low Risk

Background decoration yang tidak berubah dan tidak relevan.

### Medium Risk

Furniture position, camera framing, hand position.

### High Risk

- face
- hijab
- product identity
- product open/closed
- product orientation
- hand/product contact
- critical environment transition

High-risk state harus lebih eksplisit.

## 21. State Inheritance

Jika state tidak berubah, state dapat diwariskan dari previous state.

Contoh:

R01:
> product on table, closed.

R02:
> same product identity and environment; product now in right hand.

Yang berubah:
> product state.

Yang tidak berubah:
> character identity, environment identity, visual language, camera properties that remain fixed.

Inheritance harus eksplisit atau dapat ditelusuri.

Jangan membuat state baru yang ambigu hanya karena sebagian informasi tidak ditulis ulang.

## 22. State Change Log

Setiap significant state change dapat dicatat:

| Time | Component | Before | Action | After |
|---|---|---|---|---|
| 00:12 | Product | on table | pickup | right hand |
| 00:15 | Product | closed | open | open |
| 00:18 | Character | looking at product | gaze shift | looking at camera |

Change log membantu menentukan reference dan clip boundaries.

## 23. State Consistency

State harus konsisten dengan upstream:

- Product Truth
- Product Identity
- Character Identity
- Environment
- Storyboard
- Timeline
- Clip

Jika state conflict dengan upstream source, upstream Source of Truth wins.

State tidak boleh memperbaiki upstream conflict dengan diam-diam mengubah source.

## 24. Missing State Data

Jika state penting belum diketahui:

- mark UNKNOWN
- preserve known state
- do not invent
- block dependent generation if ambiguity affects continuity
- request/update upstream source when appropriate

State yang tidak diketahui bukan izin untuk "kira-kira aja".

## 25. Common Failure Modes

### Identity-as-State Error

Character state menulis ulang identity secara berbeda.

**Correction:** restore Character Identity.

### State Teleportation

Product suddenly changes position.

**Correction:** define action and intermediate state.

### Snapshot-as-Action Error

State berisi sequence of actions.

**Correction:** split into separate states.

### Reference Mismatch

Image reference does not match declared state.

**Correction:** update the reference or state, according to the actual Source of Truth.

### Hidden State Change

Door, product, camera, or character changes without a recorded transition.

**Correction:** record the state change and its cause.

### Over-Specification

Every irrelevant object receives unnecessary state data.

**Correction:** preserve only continuity-relevant state.

## 26. Change Control

Visual State is downstream from:
- Storyboard
- Global Timeline
- Clip
- Character Identity
- Product Identity
- Environment

Changes to those sources may make affected states STALE.

Examples:

Character Identity changes:
→ affected character states become STALE.

Product Identity changes:
→ affected product states become STALE.

Environment change:
→ affected spatial/environment states become STALE.

Timeline change:
→ affected timestamped states become STALE.

## 27. Regeneration

State changes require targeted downstream propagation.

Examples:

**Product open/closed change**
→ update affected reference, production spec, and prompts.

**Character pose change**
→ update affected reference and dependent clip output.

**Environment object moved**
→ update affected spatial states and downstream visual outputs.

Unrelated states remain unchanged.

## 28. Status

Visual State follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

LOCKED states become production constraints for dependent outputs.

## 29. Boundary with Character State

Visual State:
> complete visual snapshot.

Character State:
> character-specific condition within that snapshot.

Character State does not replace Visual State.

## 30. Boundary with Product State

Visual State:
> complete visual snapshot.

Product State:
> product-specific condition within that snapshot.

Product State does not replace Product Identity.

## 31. Boundary with Camera State

Visual State:
> complete visual snapshot.

Camera State:
> camera-specific condition within that snapshot.

Camera State describes the camera condition, not the motion instruction.

## 32. Source of Truth

Visual State is the source of truth for project-specific snapshot conditions.

Downstream prompts must follow the declared state.

Generated images and videos do not become a new Visual State Source of Truth unless explicitly adopted through the project workflow.

## 33. Non-Negotiable Rules

1. Visual State describes a snapshot condition.
2. Identity and State are separate.
3. State must be observable or explicitly defined.
4. State does not contain action sequences.
5. Transitions use STATE → ACTION → STATE.
6. Start State must match Start Reference.
7. End State must be suitable as a bridge when continuity requires it.
8. Product State cannot override Product Identity or Product Truth.
9. Character State cannot override Character Identity.
10. Environment State cannot redefine Environment Identity.
11. Camera State describes camera condition, not movement instruction.
12. Missing critical state must not be fabricated.
13. Significant changes must be traceable.
14. Changes propagate downstream through dependency rules.
15. Regeneration must be targeted.
16. Generated outputs do not automatically become a new Source of Truth.
17. No separate validation stage is introduced; constraints operate throughout the pipeline.
