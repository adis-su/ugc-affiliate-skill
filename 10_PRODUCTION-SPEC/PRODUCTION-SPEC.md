# AFFILIX — Production Spec

PRODUCTION-SPEC.md mendefinisikan **apa yang secara produksi wajib diwujudkan dari state yang sudah ditetapkan**.

Production Spec adalah jembatan antara State dan Output.

Pipeline:

STATE
→ PRODUCTION SPEC
→ IMAGE SPEC / VIDEO SPEC
→ OUTPUT PROMPT

Production Spec menjawab:

> **Apa yang harus diproduksi, berdasarkan state dan kebutuhan downstream?**

Production Spec bukan:
- Product Truth
- Character Identity
- Storyboard
- Timeline
- Clip
- Visual State
- Reference State
- Image Prompt
- Video Prompt
- validation stage

## 1. Purpose

Production Spec digunakan untuk:
- menerjemahkan state menjadi production requirements
- memisahkan requirement dari prompt wording
- menetapkan elemen yang wajib dipertahankan
- mengidentifikasi continuity-critical elements
- menentukan requirement untuk image dan video production
- menjadi upstream authority untuk Image Spec dan Video Spec
- menjaga agar prompt tidak mengarang requirement baru

Production Spec harus tetap cukup abstrak untuk digunakan oleh beberapa output type.

## 2. Core Principle

Production Spec bukan prompt.

Contoh:

Production Spec:
> Product must remain front-facing and fully recognizable.

Image Spec:
> Product front label must be clearly visible.

Image Prompt:
> rendering instruction that produces the required visual.

Video Spec:
> product rotates from side-facing to front-facing.

Video Prompt:
> instruction for the actual frame-to-frame transition.

Setiap layer memiliki tanggung jawab berbeda.

## 3. Production Requirement Hierarchy

Production requirements dapat dibagi menjadi:

### Identity Requirements

Hal yang tidak boleh berubah.

Contoh:
- character face identity
- permanent hijab
- product packaging identity
- established logo
- established color

### State Requirements

Kondisi yang harus benar pada snapshot.

Contoh:
- product open
- product held in right hand
- character seated
- camera medium close-up

### Continuity Requirements

Hal yang harus tetap konsisten antar state.

Contoh:
- same character
- same product
- same wardrobe
- same environment
- consistent camera relationship

### Transition Requirements

Hal yang harus berubah antara Start State dan End State.

Contoh:
- product moves from table to hand
- gaze moves from product to camera
- camera moves from medium shot to medium close-up

### Output Requirements

Hal yang berkaitan dengan artifact yang harus dihasilkan.

Contoh:
- start reference image
- end reference image
- frame-to-frame video transition
- required duration

## 4. Production Spec Record

Gunakan struktur:

### Production Spec Record

- Spec ID:
- Scene ID:
- Clip ID:
- Reference IDs:
- Input States:
- Identity Requirements:
- Start State Requirements:
- End State Requirements:
- Continuity Requirements:
- Transition Requirements:
- Visual Requirements:
- Camera Requirements:
- Product Requirements:
- Character Requirements:
- Environment Requirements:
- Audio Dependencies:
- Output Requirements:
- Prohibited Changes:
- Source References:
- Dependencies:
- Status:

## 5. Input States

Production Spec harus memiliki traceability ke state.

Input dapat berasal dari:
- Visual State
- Character State
- Product State
- Camera State
- Reference State
- Environment State
- Timeline
- Clip

Production Spec tidak boleh menciptakan state baru tanpa upstream source.

## 6. Identity Requirements

Identity Requirements harus mengambil authority dari upstream identity modules.

Character:
> preserve established facial identity and permanent hijab coverage.

Product:
> preserve established packaging, shape, color identity, logo, and variant.

Identity requirements bersifat persistent.

## 7. State Requirements

State Requirements berasal dari state modules.

Contoh:

Character:
> seated, body facing camera, gaze toward product.

Product:
> closed, placed on table, front-facing.

Camera:
> medium shot, eye-level.

State requirements harus dapat diverifikasi secara visual, tetapi tidak menciptakan validation stage.

## 8. Continuity Requirements

Continuity Requirements menjelaskan apa yang harus tetap sama.

Contoh:
- same character identity
- same product identity
- same environment
- same wardrobe
- same lighting direction
- same camera side
- same spatial relationship

Tidak semua attribute harus persistent.

Hanya continuity-critical properties yang perlu dipertahankan.

## 9. Transition Requirements

Transition Requirements menjelaskan perubahan yang memang diminta.

Format:

> Start State → Required Change → End State

Contoh:

> product closed on table → picked up and opened → product open in right hand.

Transition Requirement bukan Video Prompt.

Ia adalah logical requirement yang nantinya diterjemahkan oleh Video Spec.

## 10. Visual Requirements

Visual Requirements menjelaskan hasil visual yang wajib tersedia.

Contoh:
- face remains recognizable
- product is readable
- hand/product relationship is visible
- critical environment anchor remains visible
- required framing is maintained

Gunakan requirement yang observable.

## 11. Character Requirements

Character Requirements dapat mencakup:
- identity preservation
- pose
- gaze
- expression
- hand position
- body orientation
- wardrobe continuity
- hijab coverage
- product interaction

Character Requirements tidak boleh redefine Character Identity.

## 12. Product Requirements

Product Requirements dapat mencakup:
- product identity preservation
- open/closed state
- position
- orientation
- visibility
- quantity
- character interaction
- environment relationship

Product Requirements tidak boleh menciptakan unsupported claims.

## 13. Camera Requirements

Camera Requirements dapat mencakup:
- shot size
- framing
- camera angle
- camera side
- subject scale
- focus target
- perspective relationship
- movement requirement when applicable

Camera Requirements harus mengikuti Camera State dan Visual Language.

## 14. Environment Requirements

Environment Requirements dapat mencakup:
- spatial continuity
- background anchor
- surface relationship
- lighting environment
- object placement
- environment transitions

Jangan menambahkan decorative detail yang tidak diperlukan.

## 15. Audio Dependencies

Production Spec dapat mencatat audio dependency jika visual harus sync dengan audio.

Contoh:
- mouth movement must align with dialogue timing
- product action occurs on a specified sound cue
- camera movement begins after spoken phrase

Audio authority tetap berada di AUDIO-DESIGN.md.

Production Spec hanya mencatat dependency yang memengaruhi production timing.

## 16. Output Requirements

Output Requirements menentukan artifact yang diperlukan.

Contoh:
- Image Prompt for Start Reference
- Image Prompt for End Reference
- Video Prompt for Clip
- naturalization constraints

Output Requirements tidak menentukan wording final prompt.

## 17. Prohibited Changes

Prohibited Changes harus eksplisit untuk high-risk constraints.

Contoh:

Character:
- no facial identity change
- no hair visibility
- no wardrobe drift

Product:
- no packaging change
- no logo change
- no color identity change
- no unsupported contents

Camera:
- no silent camera-side change
- no unsupported reframing

Environment:
- no spatial teleportation
- no object duplication

## 18. Production Spec and Reference State

Reference State:
> kondisi snapshot yang harus direpresentasikan.

Production Spec:
> requirement produksi yang harus dipenuhi untuk merealisasikan snapshot dan transition.

Contoh:

Reference State:
> product open, held in right hand, front-facing.

Production Spec:
> preserve product identity; show open product in right hand; front label readable; maintain established camera framing.

## 19. Production Spec and Image Spec

Production Spec memberi constraint.

Image Spec menerjemahkan constraint menjadi daftar visual requirements untuk satu image.

Relationship:

> Production Spec → Image Spec → Image Prompt

Image Spec tidak boleh menambahkan requirement yang tidak berasal dari Production Spec atau upstream source.

## 20. Production Spec and Video Spec

Production Spec mendefinisikan:
- start requirements
- transition requirements
- end requirements
- continuity requirements

Video Spec menerjemahkannya menjadi:
- start condition
- movement/action
- end condition
- camera behavior
- naturalization constraints

Relationship:

> Production Spec → Video Spec → Video Prompt

## 21. Production Spec and Naturalization

Naturalization berada downstream.

Production Spec menetapkan prohibited state changes.

Naturalization dapat membuat movement lebih natural tetapi tidak boleh:
- mengubah identity
- mengubah state
- mengubah narrative transition
- menambah product claim
- mengubah required camera state

## 22. Production Spec and Audio

Audio dapat berjalan sebagai parallel production layer.

Production Spec dapat menyimpan dependency:

> visual event must align with dialogue timing.

Namun Audio Design tetap authority untuk:
- voice identity
- dialogue delivery
- breathing
- pauses
- room tone
- ambience
- foley
- product sounds
- music

## 23. Claim Safety

Production Spec tidak boleh menjadi tempat untuk menyisipkan product claims.

Dilarang membuat requirement seperti:
- product performs better
- product is safer
- product lasts longer
- product is more effective
- user experience is guaranteed

kecuali didukung Product Truth dan memang merupakan approved content requirement.

Visual requirements juga tidak boleh menyiratkan unsupported factual claims.

## 24. Missing Data

Jika requirement membutuhkan data yang belum tersedia:

- mark UNKNOWN
- preserve known requirements
- do not invent
- block only the dependent output when ambiguity is material

Contoh:

Jika exact product orientation belum ditentukan, jangan memilih orientation secara otomatis jika orientation penting untuk continuity.

## 25. Dependency Rules

Production Spec depends on:
- Product Truth
- Product Identity
- Content Strategy
- Script
- Dialogue
- Character Identity
- Voice Identity
- Performance
- Environment
- Visual Language
- Storyboard
- Timeline
- Clip
- State modules
- Audio Design when synchronization is relevant

Changes upstream dapat membuat Production Spec STALE.

## 26. Stale Propagation

Contoh:

Product Identity change:
→ Product State stale
→ Reference State stale
→ Production Spec stale
→ Image/Video Specs stale
→ prompts stale

Character Identity change:
→ Character State stale
→ Reference State stale
→ Production Spec stale
→ downstream outputs stale

Local state change:
→ hanya affected dependency chain menjadi stale.

## 27. Targeted Regeneration

Production Spec mendukung targeted regeneration.

Contoh:

Product orientation berubah:
→ update Product State
→ update affected Reference State
→ update Production Spec
→ regenerate affected Image/Video Spec and prompts

Tidak perlu regenerate:
- Content Strategy
- Script
- unrelated scenes
- unrelated references

## 28. Status

Production Spec mengikuti project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

LOCKED Production Spec menjadi constraint downstream.

## 29. Source of Truth

Production Spec adalah source of truth untuk **production requirements** pada scope yang ditetapkan.

Namun domain authority tetap upstream:

- Product Truth → product facts
- Character Identity → character identity
- Environment → physical environment
- Visual Language → visual style
- State modules → current state
- Timeline → timing
- Clip → generation unit

Production Spec tidak boleh overwrite upstream truth.

## 30. Boundary with Workflow

Workflow menentukan:
> kapan Production Spec dibuat dan apa dependency-nya.

Production Spec menentukan:
> apa yang harus diproduksi.

## 31. Boundary with Validation

AFFILIX tidak membuat Production Spec sebagai validation stage.

Requirements dan constraints bekerja throughout the pipeline.

Jika requirement conflict ditemukan, sistem mengikuti Source of Truth dan failure-handling rules.

## 32. Non-Negotiable Rules

1. Production Spec adalah production requirement layer.
2. Production Spec bukan prompt.
3. Production Spec harus traceable ke upstream source.
4. Identity requirements tidak boleh berubah secara downstream.
5. State requirements harus mengikuti declared states.
6. Continuity requirements harus eksplisit untuk high-risk elements.
7. Transition requirements harus memiliki Start dan End State.
8. Production Spec tidak boleh menciptakan unsupported product claims.
9. Missing critical data tidak boleh ditebak.
10. Image Spec harus mengikuti Production Spec.
11. Video Spec harus mengikuti Production Spec.
12. Naturalization tidak boleh mengubah required identity, state, atau transition.
13. Audio dependency dicatat tanpa mengambil alih Audio Design authority.
14. Changes propagate downstream through dependency rules.
15. Regeneration must be targeted.
16. Generated outputs do not become Source of Truth automatically.
17. No separate validation stage is introduced.
