# AFFILIX — Clip

`CLIP.md` mendefinisikan **generation unit** dalam AFFILIX.

Clip menjawab:

> **Bagian mana dari timeline yang akan diproduksi sebagai satu unit generasi video, dengan state awal dan state akhir yang jelas?**

Clip berbeda dari Scene.

- **Scene** = storytelling unit.
- **Clip** = generation unit.
- **Reference** = snapshot state.
- **Video Prompt** = instruction untuk menghasilkan transition dalam clip.

## 1. Purpose

Clip digunakan untuk:
- memetakan narrative timeline ke generation units
- menentukan duration generation
- menetapkan start reference
- menetapkan end/bridge reference
- menentukan state transition
- menjaga continuity antar generation units
- menjadi container untuk Video Prompt
- menghubungkan Timeline, State, Production Spec, dan Output

Pipeline:

GLOBAL TIMELINE → CLIP → STATE → PRODUCTION SPEC → VIDEO PROMPT

## 2. Scene vs Clip

Scene adalah unit cerita.

Clip adalah unit produksi.

Contoh:

Scene 03:
> Product introduction, 12 seconds.

Dapat menjadi:

- C03A = 6s
- C03B = 6s

Scene tetap satu scene.

Clip adalah dua generation units.

Jangan memaksa setiap scene menjadi satu clip.

## 3. Supported Duration

Clip duration harus menggunakan durasi yang tersedia pada platform generation yang aktif.

Untuk Google Flow, konfigurasi saat ini berada di:

00_KNOWLEDGE/PLATFORM/GOOGLE-FLOW.md

Creative logic tidak boleh hardcode daftar durasi platform.

Jika platform configuration berubah, Clip Allocation mengikuti konfigurasi terbaru tanpa mengubah konsep Scene.

## 4. Clip Boundary

Clip boundary harus dipilih berdasarkan logical state transition.

Boundary yang baik:
- action selesai
- product mencapai stable state
- character mencapai stable pose
- camera mencapai stable framing
- dialogue beat selesai
- environment transition selesai
- scene beat berubah

Boundary yang buruk:
- action terputus tanpa alasan
- hand/product berada dalam unstable intermediate position
- dialogue terpotong secara tidak natural
- camera sedang berada dalam transition penting
- state belum cukup jelas untuk menjadi reference

## 5. Start State

Setiap clip harus memiliki start state yang jelas.

Start State menentukan:
- character state
- product state
- environment state
- camera state
- relevant visual state
- audio/dialogue context when needed

Start State biasanya berasal dari:
- previous clip end state
- scene start reference
- explicit state transition

Start State bukan deskripsi generik seperti:
> character in room.

Gunakan kondisi konkret jika state tersebut penting.

## 6. End State

End State mendefinisikan kondisi clip ketika generation selesai.

End State penting karena menjadi:
- bridge state
- reference candidate
- start condition untuk clip berikutnya

Contoh:

> Rositasari holds the closed product in her right hand at chest level, front facing camera.

End State harus cukup stabil untuk diteruskan.

## 7. Bridge Reference

Jika Clip N berlanjut ke Clip N+1:

> End State Clip N = Start State Clip N+1

Reference yang merepresentasikan kondisi tersebut disebut bridge reference.

Bridge reference harus mempertahankan:
- character identity
- character state
- product identity
- product state
- environment
- camera relationship
- lighting
- spatial relationship

Clip N+1 tidak boleh memulai dari visual yang hanya "mirip".

Ia harus dimulai dari state yang sama.

## 8. Clip State Model

Gunakan:

**START STATE → TRANSITION → END STATE**

Contoh:

Start:
> Product closed on table.

Transition:
> Rositasari reaches, picks up, and rotates the product.

End:
> Product held upright in right hand, front facing camera.

Video Prompt menginstruksikan transition.

Image Prompt merepresentasikan state.

## 9. Clip as Generation Container

Setiap clip dapat berisi:

- Clip ID
- Scene ID
- Start Time
- Duration
- Start Reference
- Start State
- Transition
- End State
- End Reference
- Dialogue Segment
- Audio Context
- Camera State
- Environment State
- Production Spec
- Video Prompt
- Status

Clip tidak perlu mengulang semua data upstream jika reference ke source cukup jelas.

## 10. Clip Record

Gunakan struktur:

### Clip Record

- Clip ID:
- Scene ID:
- Start Time:
- Duration:
- Generation Platform:
- Start Reference:
- Start State:
- Transition:
- End State:
- End Reference:
- Dialogue Segment:
- Audio Context:
- Camera State:
- Environment State:
- Production Spec:
- Video Prompt:
- Dependencies:
- Status:

## 11. Clip Timing

Clip timing berasal dari Global Timeline.

Clip duration harus:
- mengikuti platform configuration
- mencakup transition yang dimaksud
- memberikan waktu cukup untuk natural movement
- tidak memaksa narrative pacing menjadi unnatural

Clip duration tidak boleh mengubah Storyboard narrative intent secara diam-diam.

## 12. Clip Allocation

Scene allocation harus dilakukan setelah narrative timing stabil.

Contoh:

Scene 05:
> 18 seconds.

Platform configuration:
> supported generation durations include 8s, 6s, and 4s.

Possible allocation:
- C05A = 8s
- C05B = 6s
- C05C = 4s

Total:
> 18s

Pembagian harus mengikuti logical transition points, bukan hanya matematika duration.

## 13. Multi-Clip Scene

Satu scene dapat memiliki beberapa clip.

Contoh:

### Scene 05

**C05A**
- picks up product
- ends with product stable in hand

**C05B**
- opens product
- ends with product open

**C05C**
- begins demonstration
- ends with product positioned for next scene

Setiap boundary menghasilkan stable state.

## 14. Clip Continuity

Continuity harus dijaga pada:

### Character
- face
- body identity
- wardrobe
- hijab
- pose relationship
- gaze
- expression when required

### Product
- identity
- shape
- color
- packaging
- open/closed state
- location
- orientation
- quantity

### Environment
- room
- furniture
- spatial layout
- background anchors
- lighting

### Camera
- framing
- position
- orientation
- movement
- visual language

### Audio
- dialogue continuity
- voice identity
- room tone
- ambience
- relevant product sounds

## 15. Clip and Character Identity

Clip generation must never redefine Character Identity.

For Rositasari:
- facial identity remains unchanged
- hijab remains present
- all hair remains covered
- visual age remains consistent
- facial proportions remain consistent

Pose, gaze, expression, gesture, and movement may change as part of Character State or Performance.

## 16. Clip and Product Identity

Clip generation must never redefine Product Identity.

Product may change state:

> closed → open

or:

> table → hand

without becoming a different product.

Product Identity remains fixed unless explicitly changed by upstream instruction.

## 17. Clip and Environment

Clip generation must preserve Environment Identity across clips belonging to the same continuous environment.

Temporary Environment State may change:

- door open
- curtain position
- object moved
- product placement
- lighting state

Only when supported by the timeline and transition.

## 18. Clip and Camera

Camera may change inside a clip if the transition is explicitly part of the Video Spec.

Examples:
- subtle reframing
- push-in
- follow movement
- focus shift

However, unnecessary camera movement should not be added merely to create activity.

Camera changes must not break required state visibility.

## 19. Video Prompt Relationship

Each clip has one primary Video Prompt.

Video Prompt describes:

> how Start State becomes End State.

It should not become a replacement for:
- Character Identity
- Product Truth
- Environment definition
- Timeline
- State specification

The prompt operationalizes upstream constraints.

## 20. Image Prompt Relationship

Image Prompt is used to represent a specific reference state.

For a clip:

- Start Reference → Image Prompt
- End Reference → Image Prompt when required
- Video Prompt → transition between states

This creates:

**IMAGE STATE → VIDEO TRANSITION → IMAGE STATE**

not:

**IMAGE → random motion → random image**

## 21. Naturalization

Naturalization may be applied inside the clip to improve believable motion:

- blinking
- breathing
- micro-expression
- gaze movement
- finger repositioning
- subtle weight shift
- realistic speech rhythm
- minor camera movement
- autofocus behavior
- natural exposure response

Naturalization must not:
- alter identity
- alter required product state
- alter environment state
- change narrative purpose
- introduce unsupported product claims

## 22. Audio and Clip

Audio is a parallel production layer.

Clip may specify:
- dialogue segment
- music timing
- ambience
- product sound
- foley
- silence

Audio Design remains the authority for audio details.

Clip timing must still allow visual and audio events to align naturally.

## 23. Reference Requirements

A reference is especially important when:
- clip starts from a critical visual state
- product state changes
- character pose/state changes
- camera changes significantly
- environment state changes
- clip boundary requires continuity
- product visibility is critical

Not every clip requires a separate end reference if the final state can be reliably represented by the next established reference.

## 24. Stable State Requirement

A clip should end in a state that is:
- visually coherent
- spatially coherent
- identifiable
- reproducible
- usable as a bridge

Avoid ending a clip during:
- ambiguous hand contact
- object deformation
- extreme motion blur
- uncontrolled camera movement
- unstable framing

unless the transition itself intentionally requires it.

## 25. Failure Modes

### Identity Drift

Character or product changes across clips.

**Correction:** restore upstream identity source and regenerate affected clip.

### State Jump

Product suddenly opens or moves.

**Correction:** define the missing transition.

### Bridge Mismatch

End state Clip N does not match Start State Clip N+1.

**Correction:** synchronize both states and reference.

### Duration Distortion

Scene is shortened or stretched solely to fit generation duration.

**Correction:** preserve narrative timeline and reallocate clips.

### Platform Leakage

Creative logic directly depends on hardcoded platform durations.

**Correction:** use platform configuration.

### Prompt Overload

Video Prompt repeats every upstream document in a huge block.

**Correction:** keep source modules authoritative and prompt only the information needed to execute the clip.

### Unnecessary Regeneration

A small change triggers regeneration of the entire project.

**Correction:** use dependency graph and targeted regeneration.

## 26. Change Control

Clip is downstream from Global Timeline and Storyboard.

Changes to:
- scene duration
- scene action
- state transition
- platform configuration
- reference state
- camera direction

may make affected clips STALE.

Do not silently rewrite clip structure without updating the upstream dependency.

## 27. Regeneration

Regeneration must be targeted.

Examples:

**Change start reference**
→ regenerate affected clip and dependent downstream output.

**Change product state**
→ regenerate affected clip and dependent references/prompts.

**Change duration allocation**
→ regenerate only affected clip mapping.

**Change one camera movement**
→ regenerate affected video prompt and dependent output.

Unrelated clips remain unchanged.

## 28. Clip State Machine

Clip follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED clip becomes the production specification for its generation unit.

## 29. Boundary with Reference State

Clip:
> defines the generation unit and transition.

Reference State:
> defines the exact snapshot condition.

Clip may point to:
- start reference
- bridge reference
- end reference

Reference State remains the authority for the actual visual condition.

## 30. Boundary with Production Spec

Clip:
> identifies what generation unit is being produced.

Production Spec:
> defines exactly what must be visible and how the required transition must behave.

Clip does not replace Production Spec.

## 31. Boundary with Video Prompt

Clip:
> context and container.

Video Prompt:
> executable generation instruction.

One clip has one primary Video Prompt.

If the clip needs to change, update its upstream state/spec first, then regenerate the prompt.

## 32. Source of Truth

Clip is the source of truth for project-specific generation-unit allocation and transition boundaries.

Downstream outputs must follow Clip.

Generated videos do not become a new Clip Source of Truth.

## 33. Non-Negotiable Rules

1. Scene is a storytelling unit.
2. Clip is a generation unit.
3. Clip duration follows platform configuration.
4. Scene duration must not be distorted merely to fit clip limits.
5. Every clip must have a coherent Start State.
6. Every clip must have a coherent End State.
7. Clip transitions follow STATE → TRANSITION → STATE.
8. The last reference of Clip N becomes the bridge/start reference for Clip N+1 when continuity requires it.
9. Character Identity cannot change inside a clip unless explicitly changed upstream.
10. Product Identity cannot change inside a clip unless explicitly changed upstream.
11. Environment continuity must be preserved.
12. One clip has one primary Video Prompt.
13. Naturalization cannot alter identity or required state.
14. Missing critical data must not be fabricated.
15. Changes propagate through dependencies.
16. Regeneration must be targeted.
17. Generated output never becomes a new Source of Truth.
18. No separate validation stage is introduced; constraints operate throughout the pipeline.
