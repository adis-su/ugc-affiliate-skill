# AFFILIX — Storyboard

`STORYBOARD.md` adalah spesifikasi visual tingkat scene yang menerjemahkan Content Strategy dan Script menjadi **apa yang harus terlihat, dilakukan, dan dirasakan secara visual**.

Storyboard menjawab:

> **Apa yang terjadi di layar pada setiap scene, untuk tujuan apa, dan bagaimana visual tersebut mendukung pesan?**

Storyboard bukan Image Prompt dan bukan Video Prompt.

## 1. Purpose

Storyboard menjadi bridge antara:

CONTENT STRATEGY → SCRIPT → STORYBOARD → GLOBAL TIMELINE → CLIP → STATE → PRODUCTION SPEC → OUTPUT

Storyboard digunakan untuk menentukan:
- scene purpose
- visual action
- character performance
- product interaction
- dialogue alignment
- camera direction
- environment context
- approximate narrative duration
- transition logic

Storyboard harus cukup spesifik untuk menjadi dasar downstream production, tetapi tidak mengambil alih fungsi State atau Prompt.

## 2. Storyboard vs Script

**Script** menentukan:
> pesan dan isi yang dikomunikasikan.

**Dialogue** menentukan:
> bagaimana pesan tersebut terdengar ketika diucapkan secara natural.

**Storyboard** menentukan:
> apa yang terlihat saat pesan tersebut disampaikan.

Satu dialogue line dapat memiliki beberapa visual beats.

Sebaliknya, satu visual beat dapat terjadi tanpa dialogue.

## 3. Scene as Storytelling Unit

Scene adalah unit storytelling.

Scene dapat memiliki:
- satu lokasi
- satu tujuan naratif
- beberapa actions
- beberapa performance beats
- beberapa dialogue lines
- beberapa clips

Scene tidak harus sama dengan clip.

Contoh:

> Scene 03 berlangsung 12 detik.

Jika platform generation mendukung clip 6 detik, scene dapat menjadi:

- Clip 03A = 6s
- Clip 03B = 6s

Scene tetap satu storytelling unit.

## 4. Storyboard Components

Setiap scene minimal mendefinisikan:

- Scene ID
- Purpose
- Narrative Beat
- Duration
- Environment
- Character
- Character Performance
- Product
- Product Interaction
- Camera
- Visual Action
- Dialogue
- Audio Intent
- Transition

Detail final dapat diperluas di downstream modules.

## 5. Scene Purpose

Setiap scene harus memiliki fungsi yang jelas.

Contoh:

- hook
- establish problem
- introduce product
- demonstrate action
- explain feature
- show result
- reaction
- proof/context
- CTA
- transition

Jangan menambahkan scene hanya karena "bagus secara visual" jika tidak memiliki fungsi dalam content structure.

## 6. Narrative Beat

Narrative Beat menjelaskan perubahan informasi atau kondisi yang terjadi dalam scene.

Contoh:

> Character notices the problem.

> Character introduces the product.

> Product is opened.

> Product is applied.

> Character reacts naturally.

Beat harus dapat diterjemahkan menjadi state transition.

## 7. Visual Action

Visual Action mendeskripsikan tindakan yang benar-benar terlihat.

Contoh:

> Rositasari picks up the product from the table and brings it toward camera.

Bukan:

> Rositasari shows how amazing the product is.

Kalimat kedua adalah evaluasi/claim, bukan visual action.

Visual Action harus observable.

## 8. Character Performance

Storyboard dapat menentukan performance direction:

- posture
- gesture
- gaze
- expression
- movement
- reaction
- interaction timing

Namun Character Identity tetap berasal dari Character Identity module.

Storyboard tidak boleh mengubah:
- wajah
- struktur wajah
- usia visual
- proporsi tubuh
- hijab identity
- atribut identitas permanen lainnya

Untuk Rositasari:
- hijab tetap hadir.
- seluruh rambut tetap tertutup.

## 9. Product Interaction

Storyboard harus mendeskripsikan interaksi product secara konkret.

Contoh:

> Rositasari picks up the closed product with her right hand.

> She rotates the product so the front label faces the camera.

> She places it back on the table.

Interaksi harus konsisten dengan:
- Product Identity
- Product State
- Product Truth

Jangan menambahkan aksi yang membutuhkan fitur atau mekanisme produk yang belum diketahui.

## 10. Camera Direction

Storyboard dapat memberikan camera direction tingkat scene:

- framing
- camera position
- angle
- movement
- subject emphasis
- transition

Contoh:

> Medium shot, eye-level, handheld smartphone framing.

Camera State kemudian menyimpan kondisi kamera yang lebih spesifik untuk reference/clip.

Storyboard tidak perlu memaksa parameter teknis yang tidak diperlukan.

## 11. Environment Context

Storyboard menentukan environment yang relevan terhadap scene.

Contoh:

> Bedroom, Rositasari seated at a small table near a window.

Environment module menjadi authority untuk detail physical world.

Storyboard tidak boleh silently redefine:
- room layout
- major furniture
- architecture
- established environmental anchors

## 12. Dialogue Alignment

Dialogue harus ditempatkan pada visual beat yang sesuai.

Contoh:

**Visual:**
> Rositasari picks up the product.

**Dialogue:**
> Natural spoken line introducing the product.

Jika dialogue berlangsung 4 detik sementara action membutuhkan 7 detik, timing harus diselesaikan melalui Timeline/Clip planning, bukan dengan mengubah message secara diam-diam.

## 13. Audio Intent

Storyboard dapat menyebutkan audio intention:

- spoken dialogue
- product sound
- environmental ambience
- reaction
- music
- silence/pause

Audio Design tetap menjadi authority untuk detail audio.

Storyboard hanya memberi konteks hubungan audio dengan visual.

## 14. Scene Duration

Storyboard duration adalah **narrative duration**.

Duration tidak harus mengikuti clip duration.

Contoh:

> Scene duration: 12s

Dapat dipecah menjadi:

> Clip A: 6s

> Clip B: 6s

atau pembagian lain yang sesuai dengan supported generation durations.

Clip duration harus mengikuti platform configuration, bukan memaksa Storyboard duration.

## 15. Storyboard → Timeline

Storyboard menentukan urutan storytelling.

Global Timeline kemudian menentukan:

- exact start time
- exact end time
- duration
- overlap
- transition
- clip allocation

Storyboard tidak perlu menjadi stopwatch yang sok presisi. Timeline yang mengurus itu.

## 16. Storyboard → Clip

Satu scene dapat menjadi:
- one clip
- multiple clips

Pemecahan clip harus mengikuti logical transition point.

Contoh:

Scene:
> Rositasari opens the package and begins demonstrating the product.

Possible clips:
- Clip A: picks up and opens package
- Clip B: begins demonstration

Last state of Clip A harus menjadi start/bridge state untuk Clip B.

## 17. State Transition

Storyboard harus dapat diterjemahkan menjadi:

**STATE → ACTION → STATE**

Contoh:

Initial:
> product closed on table.

Action:
> Rositasari picks up product and opens it.

Final:
> product open in Rositasari's right hand.

Storyboard tidak boleh hanya mendeskripsikan aksi tanpa kondisi awal dan akhir jika state tersebut penting untuk continuity.

## 18. Reference Awareness

Storyboard harus memperhatikan kebutuhan reference.

Reference diperlukan ketika:
- visual state penting
- product state berubah
- character pose/state berubah
- camera state berubah
- environment state berubah
- clip boundary membutuhkan bridge state

Storyboard tidak harus membuat reference secara langsung. Reference State module menangani snapshot state.

## 19. Visual Priority

Setiap scene harus memiliki visual priority.

Contoh:

1. Character face
2. Product
3. Product interaction
4. Environment context

Priority harus berasal dari scene purpose dan content strategy.

Jika product demonstration adalah tujuan scene, product interaction tidak boleh tertutup oleh background action yang tidak relevan.

## 20. Continuity

Storyboard harus mempertahankan continuity antar-scene.

Periksa secara konseptual:
- character identity
- character state
- wardrobe
- hijab
- product identity
- product state
- environment
- lighting
- camera
- dialogue
- spatial relationship

Continuity bukan stage terpisah. Ia adalah constraint yang bekerja sepanjang pipeline.

## 21. Storyboard Record

Gunakan struktur:

### Storyboard Record

- Scene ID:
- Scene Purpose:
- Narrative Beat:
- Duration:
- Environment:
- Character:
- Performance:
- Product:
- Product Interaction:
- Camera:
- Visual Action:
- Dialogue:
- Audio Intent:
- Start State:
- End State:
- Transition:
- Visual Priority:
- Continuity Notes:
- Dependencies:
- Status:

## 22. Example

### Scene 03

**Purpose**
> Product introduction.

**Narrative Beat**
> Rositasari introduces the product after establishing the problem.

**Environment**
> Existing bedroom environment.

**Character Performance**
> Seated upright, natural gaze toward camera, relaxed expression.

**Product**
> Product initially resting closed on table.

**Visual Action**
> Rositasari reaches toward the product, picks it up, and holds the front of the product toward camera.

**Camera**
> Medium close-up, eye-level, subtle handheld smartphone framing.

**Dialogue**
> Natural introduction line from the approved Dialogue.

**Start State**
> Product closed on table.

**End State**
> Product held upright in Rositasari's right hand, front facing camera.

**Transition**
> Continuous action into next demonstration scene.

This scene can later be divided into one or more generation clips.

## 23. Missing Data

If required storyboard data is missing:

- preserve all known upstream information
- mark UNKNOWN where a decision is required
- do not invent product claims
- do not invent product mechanisms
- do not invent character identity
- do not invent environment facts
- do not invent dialogue
- do not silently alter upstream decisions

If missing information prevents a coherent scene, downstream generation must be blocked until the dependency is resolved.

## 24. Common Failure Modes

### Script-to-Visual Mismatch

Dialogue says one thing while visual action shows something unrelated.

**Correction:** align visual action with the message.

### Non-Observable Description

Storyboard uses abstract statements such as:
> "She feels that the product is better."

**Correction:** convert into observable behavior or dialogue.

### Product State Jump

Product suddenly changes from closed to open.

**Correction:** add the required action or reference transition.

### Character Identity Drift

Storyboard introduces appearance changes.

**Correction:** restore Character Identity authority.

### Environment Drift

Scene silently changes room or furniture.

**Correction:** restore Environment authority.

### Clip Confusion

Storyboard duration is treated as a generation clip duration.

**Correction:** keep Scene and Clip as separate concepts.

### Over-Specification

Storyboard contains every pixel-level generation instruction.

**Correction:** move state-specific detail to Production Spec and prompt modules.

## 25. Change Control

Storyboard is downstream from Content Strategy and Script.

Changes to:
- content goal
- angle
- core message
- script
- dialogue

may make affected storyboard scenes STALE.

Changes to Storyboard may propagate downstream to:
- Global Timeline
- Clip
- State
- Production Spec
- Image Prompt
- Video Prompt

Do not silently patch downstream output while leaving Storyboard inconsistent.

## 26. Regeneration

Storyboard changes use targeted propagation.

Examples:

**Change scene action**
→ update affected scene state, timeline, clip, and prompts.

**Change dialogue only**
→ update affected dialogue/audio timing and dependent clips if timing changes.

**Change camera framing**
→ update affected camera state and visual outputs.

**Change product interaction**
→ update affected product states and downstream references.

Unrelated scenes should remain unchanged.

## 27. Status

Storyboard follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED Storyboard becomes a downstream constraint.

## 28. Boundary with Production Spec

Storyboard:
> scene-level visual intent.

Production Spec:
> exact production requirements for a specific output.

Storyboard:
> Rositasari presents the product to camera.

Production Spec:
> medium close-up, product held in right hand at chest level, front label visible, face unobstructed, eye-level camera.

## 29. Boundary with State

Storyboard describes the narrative action.

State records the exact condition.

Storyboard:
> Rositasari picks up the product and opens it.

State:
> Character hand position, product position, product open/closed status, camera condition, environment condition.

## 30. Source of Truth

Storyboard is the source of truth for scene-level visual intent.

Downstream modules may operationalize it, but must not silently change its narrative purpose.

Generated output does not become a new Storyboard Source of Truth.

## 31. Non-Negotiable Rules

1. Storyboard defines scene-level visual intent.
2. Storyboard is not a prompt.
3. Storyboard is not a state snapshot.
4. Scene and Clip are separate concepts.
5. Storyboard duration is narrative duration.
6. Clip duration follows platform-supported generation constraints.
7. Visual actions must be observable.
8. Product interaction must respect Product Truth and Product Identity.
9. Character appearance must respect Character Identity.
10. Environment must respect Environment authority.
11. State transitions must remain continuous.
12. Missing critical data must not be fabricated.
13. Changes propagate downstream through dependency rules.
14. Regeneration must be targeted.
15. Generated outputs never become a new Source of Truth.
16. No separate validation stage is introduced; constraints operate throughout the pipeline.
