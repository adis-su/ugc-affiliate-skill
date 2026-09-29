# AFFILIX — Global Timeline

GLOBAL-TIMELINE.md mendefinisikan **urutan waktu naratif seluruh project**.

Global Timeline menjawab:

> **Kapan setiap scene dan event terjadi, berapa lama berlangsung, dan bagaimana satu kondisi berpindah ke kondisi berikutnya?**

Global Timeline adalah pengatur waktu cerita, bukan generator clip.

## 1. Purpose

Global Timeline digunakan untuk:
- mengurutkan scene
- menentukan start dan end time
- menentukan narrative duration
- menyelaraskan dialogue dengan visual
- menentukan state transitions
- menentukan scene transitions
- memetakan scene ke clip
- menjaga continuity waktu
- menyediakan timing authority untuk downstream production

Pipeline:

STORYBOARD → GLOBAL TIMELINE → CLIP → STATE → PRODUCTION SPEC → OUTPUT

## 2. Timeline vs Storyboard

**Storyboard**
> Apa yang terjadi dalam sebuah scene?

**Global Timeline**
> Kapan kejadian tersebut terjadi dalam keseluruhan video?

Storyboard dapat mengatakan:

> Scene 03: Rositasari picks up the product.

Timeline menentukan:

> Scene 03 starts at 00:12 and ends at 00:20.

Storyboard dan Timeline saling terkait tetapi bukan dokumen yang sama.

## 3. Timeline vs Clip

Scene adalah storytelling unit.

Clip adalah generation unit.

Global Timeline menggunakan **narrative duration** dan kemudian memetakan scene ke clip generation units.

Contoh:

Scene 03:
> 12 seconds

Dapat diproduksi sebagai:

- Clip 03A = 6s
- Clip 03B = 6s

atau pembagian lain yang sesuai dengan supported platform configuration.

Jangan mengubah scene duration hanya karena clip generation memiliki batas durasi tertentu.

## 4. Time Model

Gunakan absolute project time:

- start time
- end time
- duration

Contoh:

| Scene | Start | End | Duration |
|---|---:|---:|---:|
| S01 | 00:00 | 00:05 | 5s |
| S02 | 00:05 | 00:11 | 6s |
| S03 | 00:11 | 00:23 | 12s |

Duration harus konsisten:

> End Time − Start Time = Duration

Timeline tidak boleh memiliki overlap atau gap yang tidak disengaja.

## 5. Timeline Units

Gunakan:
- milliseconds only when necessary
- seconds for normal project planning
- MM:SS display format for human-readable timeline

Contoh:

> 00:08.5

digunakan hanya jika timing sub-second benar-benar dibutuhkan.

Jangan membuat timeline seperti laporan NASA jika video cuma 30 detik.

## 6. Scene Timing

Setiap scene minimal memiliki:

- Scene ID
- Start Time
- End Time
- Duration
- Purpose
- Primary Visual Beat
- Dialogue Timing
- State Transition
- Transition to Next Scene

Contoh:

### Scene 03

- Start: 00:11
- End: 00:23
- Duration: 12s
- Purpose: product introduction
- Visual Beat: character picks up and presents product
- Dialogue: 00:13–00:19
- End State: product held upright facing camera

## 7. Event Timing

Satu scene dapat memiliki beberapa timed events.

Contoh:

| Time | Event |
|---|---|
| 00:11.0 | Rositasari reaches toward product |
| 00:13.0 | Hand contacts product |
| 00:14.0 | Product lifted |
| 00:16.0 | Product rotated toward camera |
| 00:18.0 | Dialogue emphasis |
| 00:22.0 | Product held in final state |

Event timing harus mendukung natural human movement.

Jangan membuat karakter bergerak seperti spreadsheet yang kebetulan punya tangan.

## 8. Dialogue Timing

Dialogue timing harus memiliki hubungan yang masuk akal dengan:
- mouth movement
- gesture
- gaze
- product interaction
- reaction

Dialogue dapat:
- start before action
- overlap with action
- end before action
- pause during action

Jangan memaksa setiap dialogue line berdiri sendiri jika natural delivery membutuhkan overlap.

## 9. Audio Timing

Global Timeline dapat menandai:
- dialogue
- music
- ambience
- product sound
- foley
- pauses
- silence

Audio Design adalah authority untuk detail audio.

Timeline hanya menentukan **kapan** audio event terjadi.

## 10. State Timing

Timeline harus dapat menunjukkan kapan state berubah.

Contoh:

### Product

00:00:
> product closed on table

00:14:
> product picked up

00:16:
> product held upright

00:20:
> product opened

State change harus memiliki event atau action yang menjelaskannya.

Jangan mengubah state secara teleportasi.

## 11. Transition Model

Gunakan:

**STATE A → ACTION / TRANSITION → STATE B**

Contoh:

> Product closed on table → Rositasari picks it up → product held in right hand.

Jika perubahan tidak terlihat di layar tetapi tetap dibutuhkan, transition harus memiliki penjelasan yang cukup untuk menjaga continuity.

## 12. Scene Transition

Scene transition dapat berupa:
- continuous action
- camera reframing
- character movement
- object movement
- cut
- environmental transition
- time transition
- location transition

Contoh:

> S02 bedroom → character walks toward doorway → S03 living room.

Jika transition adalah hard cut:

> S02 ends in bedroom → cut → S03 starts in kitchen.

Timeline harus mencatat transition type jika relevan.

## 13. Overlap and Gap Rules

Default:
- no unintended overlap
- no unintended gap

Overlap diperbolehkan jika memang bagian dari storytelling, misalnya:
- audio overlap
- crossfade
- simultaneous action
- dialogue over visual transition

Jika overlap terjadi, harus memiliki alasan yang jelas.

## 14. Narrative Pacing

Timeline dapat membantu mengatur pacing:
- hook
- setup
- development
- demonstration
- reaction
- conclusion
- CTA

Pacing berasal dari Content Strategy dan Storyboard, bukan angka durasi semata.

Durasi harus mendukung information density dan natural delivery.

## 15. Clip Allocation

Setelah narrative timeline disetujui, scene dipetakan ke generation clips.

Contoh:

### Scene 03
Narrative duration: 12s

Clip allocation:
- C03A: 6s
- C03B: 6s

Bridge:
> End state C03A = Start state C03B

Jika scene 18s:
- C04A: 8s
- C04B: 6s
- C04C: 4s

Durasi clip harus mengikuti platform configuration.

Jangan hardcode supported durations di creative logic. Source configuration berada di:

00_KNOWLEDGE/PLATFORM/GOOGLE-FLOW.md

## 16. Clip Boundary Selection

Clip boundary sebaiknya ditempatkan pada logical transition points.

Contoh baik:
- setelah product diangkat
- setelah package terbuka
- setelah character berpindah posisi
- setelah camera reframing
- setelah action selesai

Contoh buruk:
- memotong tepat ketika tangan berada di tengah aksi tanpa alasan
- memotong saat product belum memiliki stable reference state
- memotong sebelum dialogue/action beat memiliki coherent endpoint

## 17. Bridge State

Clip boundary harus menghasilkan bridge state.

Contoh:

Clip A end:
> Rositasari holds the closed product at chest level, front facing camera.

Clip B start:
> Same character, same pose relationship, same product state, same environment, continuing from that condition.

Bridge state bukan image generik.

Bridge state adalah kondisi aktual yang harus dipertahankan.

## 18. Reference Timing

Reference State harus ditempatkan ketika timing membutuhkan stable visual anchor.

Reference dapat dibuat:
- pada scene start
- pada state change
- pada clip start
- pada clip end
- pada major camera change
- pada major product interaction change

Tidak semua detik membutuhkan reference.

Reference dibuat berdasarkan kebutuhan state continuity.

## 19. Timeline Record

Gunakan struktur:

### Timeline Record

- Project Duration:
- Scene ID:
- Start Time:
- End Time:
- Duration:
- Purpose:
- Narrative Beat:
- Visual Events:
- Dialogue Events:
- Audio Events:
- State Changes:
- Transition:
- Clip Allocation:
- Bridge State:
- Dependencies:
- Status:

## 20. Timeline Table

Format utama:

| ID | Start | End | Duration | Scene | Primary Event | State Change | Clip |
|---|---:|---:|---:|---|---|---|---|
| S01 | 00:00 | 00:05 | 5s | Hook | Character reacts | baseline → reaction | C01 |
| S02 | 00:05 | 00:11 | 6s | Problem | Character explains | reaction → explanation | C02 |
| S03 | 00:11 | 00:23 | 12s | Product intro | Picks up product | table → hand | C03A/C03B |

## 21. Timing Precision

Use precision appropriate to the task.

### Narrative planning
Whole seconds are usually enough.

### Dialogue
Tenths of a second may be useful.

### Product/state transitions
Use more precise timing when needed to define:
- contact
- pickup
- opening
- placement
- release

Do not create fake precision when the source information does not support it.

## 22. Natural Timing

Human actions need realistic temporal relationships.

Consider:
- reaction delay
- hand movement time
- gaze shift
- blink timing
- breathing
- speech pauses
- object contact
- weight shift
- camera response

Timeline should not dictate unnatural micro-timing simply to fill a duration.

Naturalization may add micro-motion later, but cannot change required state or narrative timing.

## 23. Timeline and Performance

Performance is not only a visual description.

Timeline can coordinate:

> gaze → gesture → dialogue → reaction → product interaction

Example:

00:10:
> gaze toward product

00:11:
> hand reaches

00:12:
> contact

00:13:
> pickup

00:14:
> gaze returns to camera

This creates a coherent performance sequence.

## 24. Timeline and Camera

Camera changes must be timed.

Examples:
- static → reframing
- medium → close-up
- camera follows character
- camera shifts toward product
- focus transitions

Camera changes should have logical timing and must preserve state continuity.

## 25. Missing Timing Data

If exact timing is unknown:
- preserve known sequence
- use approximate duration only when safe
- mark timing as ESTIMATED when appropriate
- do not invent exact sub-second timing without basis
- block downstream timing-dependent generation when the missing timing makes the scene incoherent

Estimated timing must not be silently treated as confirmed timing.

## 26. Common Failure Modes

### Timeline Drift

Scene durations no longer add up to total project duration.

**Correction:** recalculate dependent start/end times.

### Dialogue Collision

Two dialogue events overlap impossibly.

**Correction:** adjust timing or dialogue structure.

### State Teleportation

Product or character changes state without an action.

**Correction:** insert or restore the required transition.

### Clip Boundary Failure

Clip ends in an unstable state.

**Correction:** move the boundary to a logical state endpoint.

### Over-Precision

Timeline contains invented exact timing unsupported by source data.

**Correction:** use appropriate precision or mark timing estimated.

### Pacing Distortion

Scene is stretched or compressed only to fit clip durations.

**Correction:** preserve narrative duration and remap clips instead.

### Platform Constraint Leakage

Creative timeline is hardcoded to one generation platform's current clip limits.

**Correction:** keep platform limits in platform configuration and use them during clip allocation.

## 27. Change Control

Timeline is downstream from Storyboard.

Changes to:
- scene order
- scene duration
- dialogue timing
- state transition
- clip allocation

may propagate to:
- Clip
- Reference State
- Production Spec
- Image Prompt
- Video Prompt
- Audio timing

If an upstream scene changes, dependent timestamps must be recalculated.

Do not manually patch isolated timestamps while leaving the timeline internally inconsistent.

## 28. Regeneration

Timeline changes use targeted propagation.

Examples:

**Scene duration changes**
→ recalculate affected timestamps and downstream clip allocation.

**Dialogue timing changes**
→ update affected performance, audio, and clip timing.

**State transition changes**
→ update affected reference states and prompts.

**Scene order changes**
→ update downstream timeline and all affected dependencies.

Unrelated scenes should remain unchanged.

## 29. Status

Global Timeline follows the project state machine:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED timeline becomes timing authority for downstream modules.

## 30. Boundary with Clip

Global Timeline:
> narrative time.

Clip:
> generation unit.

Timeline may say:
> Scene 03 = 12s.

Clip decides:
> C03A = 6s, C03B = 6s.

Clip does not redefine narrative duration without an upstream decision.

## 31. Boundary with State

Timeline:
> when a state change occurs.

State:
> what the exact state is.

Timeline:
> product is picked up at 00:14.

Product State:
> product is held in Rositasari's right hand, upright, front facing camera.

## 32. Source of Truth

Global Timeline is the source of truth for project-level narrative timing.

Downstream modules may operationalize timing but must not silently change the narrative timeline.

Generated outputs do not become a new Timeline Source of Truth.

## 33. Non-Negotiable Rules

1. Global Timeline controls narrative time.
2. Scene duration is not automatically clip duration.
3. Clip duration follows platform configuration.
4. Timeline must remain internally consistent.
5. State changes require coherent transitions.
6. Dialogue and visual timing must remain aligned.
7. Natural human timing must be preserved.
8. Unsupported precision must not be fabricated.
9. Platform limits must remain configuration, not creative logic.
10. Clip boundaries should preserve stable bridge states.
11. Changes propagate downstream through dependency rules.
12. Regeneration must be targeted.
13. Generated outputs never become a new Source of Truth.
14. No separate validation stage is introduced; constraints operate throughout the pipeline.
