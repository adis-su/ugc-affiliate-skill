# AFFILIX — Camera State

CAMERA-STATE.md mendefinisikan **kondisi kamera pada titik waktu tertentu**, bukan instruksi pergerakan kamera.

Camera State menjawab:

> **Kamera sedang berada dalam kondisi visual apa sekarang?**

Camera movement menjawab:

> **Bagaimana kamera berpindah dari kondisi A ke kondisi B?**

Pemisahan ini penting karena kamera yang tiba-tiba pindah tempat adalah salah satu cara termudah membuat continuity terlihat seperti hasil kerja lima orang yang tidak pernah bertemu.

## 1. Purpose

Camera State digunakan untuk:
- mendeskripsikan kondisi kamera pada reference
- menjaga framing continuity
- menentukan Start Camera State dan End Camera State
- menjadi bagian dari Visual State
- menjadi input Image Spec dan Video Spec
- menjaga hubungan camera dengan character, product, dan environment
- mendukung frame-to-frame generation

Camera State bukan:
- Camera Identity
- Visual Language
- Camera movement instruction
- Video Prompt
- Storyboard action

## 2. Camera State Scope

Camera State dapat mencakup:

- camera position
- camera height
- camera orientation
- camera distance
- shot size
- framing
- camera angle
- lens/focal relationship when relevant
- focus target
- depth of field state when relevant
- camera movement status
- stabilization status
- visible field
- subject-to-frame relationship

Gunakan hanya detail yang diperlukan untuk continuity.

## 3. Camera State Record

Gunakan struktur:

### Camera State Record

- Camera State ID:
- Reference ID:
- Scene ID:
- Clip ID:
- Timestamp:
- Camera Position:
- Camera Height:
- Camera Distance:
- Camera Orientation:
- Shot Size:
- Framing:
- Camera Angle:
- Focal/Lens Relationship:
- Focus Target:
- Depth of Field:
- Movement Status:
- Stabilization:
- Visible Field:
- Subject-to-Frame Relationship:
- Continuity Anchors:
- Allowed Changes:
- Prohibited Changes:
- Dependencies:
- Status:

## 4. Camera Position

Camera Position menjelaskan lokasi kamera relatif terhadap scene.

Contoh:

> camera positioned directly in front of Rositasari.

> camera positioned slightly to the left of the table.

Relative descriptions biasanya lebih robust daripada absolute coordinates.

## 5. Camera Height

Camera Height dapat dinyatakan relatif terhadap subject.

Contoh:

- eye level
- slightly above eye level
- slightly below eye level
- chest level
- table level

Jika exact measurement penting, gunakan measurement yang sudah established.

Jangan mengarang measurement hanya untuk membuat prompt terlihat lebih ilmiah.

## 6. Camera Distance

Camera Distance menjelaskan hubungan kamera dengan subject.

Contoh:

- close
- medium
- medium-close
- wide
- approximately 1.2m from subject when established

Distance harus konsisten dengan Shot Size dan Framing.

## 7. Camera Orientation

Camera Orientation menjelaskan arah kamera.

Contoh:

- facing subject directly
- angled slightly from camera-left
- facing product front
- three-quarter view relative to subject

Orientation adalah state, bukan movement.

## 8. Shot Size

Shot Size dapat mencakup:

- extreme close-up
- close-up
- medium close-up
- medium shot
- medium full shot
- full shot
- wide shot

Shot Size harus digunakan secara konsisten dengan visual intent.

## 9. Framing

Framing menjelaskan bagaimana subject berada di dalam frame.

Contoh:

> Rositasari centered in frame with upper torso visible.

> product occupies the lower center of frame while face remains visible.

Framing harus mempertahankan continuity untuk critical subjects.

## 10. Camera Angle

Camera Angle dapat mencakup:

- eye level
- slightly high angle
- slightly low angle
- top-down
- low-angle
- neutral frontal angle

Jangan mengubah camera angle hanya karena generation membutuhkan variasi.

Jika angle berubah, perubahan harus berasal dari approved storyboard/timeline/transition.

## 11. Focal / Lens Relationship

Lens information hanya perlu ditentukan jika memengaruhi continuity.

Contoh:

> smartphone-like moderate wide perspective.

> shallow portrait perspective when explicitly established.

Jangan memaksakan angka focal length jika tidak ada source.

Focal relationship harus konsisten dengan:
- perspective
- subject scale
- environment geometry
- visual language

## 12. Focus State

Focus State menjelaskan target fokus pada snapshot.

Contoh:

> focus on Rositasari's face.

> focus on product held near chest.

> both face and product sufficiently readable.

Focus target dapat berubah jika transition memang mengharuskannya.

## 13. Depth of Field

Depth of Field dapat mencakup:

- deep focus
- moderate depth
- shallow depth
- background softly separated

DOF harus konsisten dengan Visual Language dan established camera behavior.

Jangan menggunakan extreme blur jika membuat environment continuity tidak dapat dibaca.

## 14. Movement Status

Movement Status adalah kondisi kamera pada snapshot, bukan movement instruction.

Contoh:

- static
- stabilized
- movement in progress
- settled after movement

Action seperti:

> camera pushes in.

adalah movement instruction, bukan Camera State.

Resulting state:

> tighter medium close-up framing after the push-in.

## 15. Start Camera State

Start Camera State adalah kondisi kamera ketika clip dimulai.

Harus cocok dengan:
- Start Reference
- Visual State
- previous clip End Camera State jika bridge digunakan

Contoh:

> medium shot, eye-level, centered framing, focus on Rositasari.

## 16. End Camera State

End Camera State adalah kondisi kamera ketika clip berakhir.

Contoh:

> medium close-up, eye-level, product and face both visible, focus biased toward product.

End state harus cukup stabil untuk reference jika diperlukan.

## 17. Bridge Camera State

Jika Clip N dilanjutkan Clip N+1:

> End Camera State N = Start Camera State N+1

Contoh:

Clip N End:
> medium close-up, eye-level, product at center-lower frame.

Clip N+1 Start:
> medium close-up, eye-level, product at center-lower frame.

Tidak boleh ada silent reframing.

## 18. Camera State Transition

Gunakan:

**CAMERA STATE A → CAMERA MOVEMENT → CAMERA STATE B**

Contoh:

State A:
> medium shot, eye-level, Rositasari centered.

Movement:
> camera slowly moves closer.

State B:
> medium close-up, eye-level, Rositasari and product both visible.

Movement belongs to Video Spec / Naturalization.

## 19. Camera and Character State

Camera State dan Character State harus compatible.

Contoh:

Character State:
> seated, upper torso visible.

Camera State:
> medium close-up, eye-level.

Jika Character State menyatakan full body visible tetapi Camera State adalah extreme close-up, ada conflict yang harus diselesaikan.

Jangan diam-diam memilih salah satunya.

## 20. Camera and Product State

Camera State menentukan bagaimana product terlihat, tetapi tidak mengubah Product State.

Contoh:

Product State:
> front label facing camera.

Camera State:
> camera directly facing product.

Jika camera berpindah ke side angle, Product State tetap sama kecuali product juga bergerak.

## 21. Camera and Environment State

Camera State menentukan bagian environment yang masuk frame.

Environment State menentukan kondisi physical world.

Perubahan framing tidak otomatis berarti environment berubah.

Contoh:

Camera moves closer:
> less background visible.

Environment:
> same table, wall, window, and lighting conditions.

## 22. Framing Continuity

Critical framing anchors dapat mencakup:

- face position
- product position
- headroom
- subject scale
- horizon level
- table edge
- key background anchor

Tidak semua pixel harus sama.

Tujuannya adalah mempertahankan spatial logic, bukan membuat video terlihat seperti satu frame yang dipaksa hidup.

## 23. Camera State and Visual Language

Visual Language menentukan visual character:

> smartphone UGC, natural perspective, handheld feel.

Camera State menentukan kondisi aktual:

> medium shot, eye-level, slightly left of center, product visible at chest height.

Visual Language tidak digantikan oleh Camera State.

Camera State tidak mendefinisikan keseluruhan visual style.

## 24. Camera State and Production Spec

Camera State:
> kondisi kamera pada snapshot.

Production Spec:
> camera condition that must be produced and, for video, how it changes.

Image Spec dapat menggunakan Camera State untuk menentukan framing.

Video Spec dapat menggunakan Start Camera State + camera movement + End Camera State.

## 25. Naturalization

Naturalization dapat menambahkan:

- subtle handheld drift
- tiny stabilization correction
- natural autofocus adjustment
- slight framing micro-shift
- realistic camera inertia

Naturalization tidak boleh menyebabkan:
- subject teleportation
- unintended reframing
- identity drift
- product visibility failure
- unsupported camera angle change
- narrative change

Micro-motion harus mempertahankan required Camera State.

## 26. State Inheritance

Jika camera tidak berubah:

R01:
> medium shot, eye-level, centered framing.

R02:
> same camera state; product state changed.

Camera State R02 dapat mewarisi R01.

Jika framing berubah:

R03:
> medium close-up after intentional camera move.

Hanya changed properties yang perlu diperbarui.

## 27. Critical Camera Anchors

Gunakan anchors sesuai continuity risk:

- camera side relative to subject
- shot size
- subject scale
- framing
- eye level
- product visibility
- face visibility
- horizon
- key environment anchor
- focus target

Prioritaskan camera properties yang memengaruhi frame-to-frame continuity.

## 28. Prohibited Camera Changes

Camera State tidak boleh secara diam-diam mengubah:

- camera side
- shot size
- subject scale
- framing
- angle
- focus target
- visible field

jika perubahan tersebut tidak didukung oleh storyboard, timeline, clip transition, atau explicit instruction.

## 29. Missing Camera State

Jika critical camera state belum diketahui:

- mark UNKNOWN
- preserve known information
- do not invent
- block dependent generation when ambiguity affects continuity

Contoh:

Jika tidak diketahui apakah camera berada di eye level atau high angle, jangan memilih salah satu hanya karena terasa "lebih cinematic".

## 30. Common Failure Modes

### Camera Teleportation

Camera suddenly changes side or position.

Correction:
> define transition or restore previous Camera State.

### Silent Reframing

Subject scale changes without an intentional camera transition.

Correction:
> define Start and End Camera State.

### Focus Drift

Focus jumps to another object without reason.

Correction:
> define focus target and transition.

### Lens/Perspective Drift

Perspective changes between clips.

Correction:
> preserve focal relationship and Visual Language.

### Background Geometry Drift

Camera state and environment relationship become incompatible.

Correction:
> restore camera/environment spatial relationship.

### Over-Cinematic Drift

UGC framing becomes unnecessarily cinematic.

Correction:
> follow Visual Language and platform/category configuration.

### Excessive Micro-Movement

Naturalization makes camera movement distracting.

Correction:
> reduce movement while preserving required state.

## 31. Change Propagation

Camera State depends on:
- Visual Language
- Environment
- Character State
- Product State
- Storyboard
- Timeline
- Clip

Changes may propagate downstream.

Examples:

Visual Language change:
→ affected Camera States may become STALE.

Shot size change:
→ affected references and clips become STALE.

Character position change:
→ affected framing states may become STALE.

Product visibility requirement change:
→ affected camera states may become STALE.

## 32. Regeneration

Camera State changes require targeted regeneration.

Examples:

**Medium shot → medium close-up**
→ update affected reference image prompt and dependent video transition.

**Focus target change**
→ update affected camera specification and video prompt.

**Camera side change**
→ update affected reference chain and dependent clips.

Do not regenerate unrelated camera states.

## 33. Status

Camera State follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED Camera State becomes a constraint for dependent production outputs.

## 34. Boundary with Visual Language

Visual Language:
> how the project should look.

Camera State:
> where the camera is and what it sees now.

Example:

Visual Language:
> natural smartphone UGC.

Camera State:
> medium close-up, eye-level, face and product both visible.

## 35. Boundary with Camera Movement

Camera State:
> medium shot, eye-level, centered framing.

Camera Movement:
> slowly pushes in.

End Camera State:
> medium close-up, eye-level, centered framing.

State is the condition.

Movement is the transition.

## 36. Boundary with Visual State

Camera State is one component.

Visual State is the complete snapshot:

> Character State + Product State + Environment State + Camera State + other relevant visual conditions.

## 37. Source of Truth

Visual Language remains authoritative for visual camera character and style.

Camera State is authoritative for project-specific camera condition at its declared time/reference.

Generated images and videos do not automatically replace Camera State.

## 38. Non-Negotiable Rules

1. Camera State describes a snapshot condition.
2. Camera movement is separate from Camera State.
3. Camera State must be compatible with Character, Product, and Environment State.
4. Start Camera State must match the start reference.
5. End Camera State must support the next clip when continuity requires it.
6. Silent reframing is not allowed when continuity-critical.
7. Focus changes must be traceable.
8. Lens/perspective changes must be intentional.
9. Camera State cannot override Visual Language.
10. Missing critical camera state must not be fabricated.
11. Naturalization may add subtle camera micro-motion but cannot alter required state.
12. Changes propagate downstream through dependency rules.
13. Regeneration must be targeted.
14. Generated output does not automatically become a new Source of Truth.
15. No separate validation stage is introduced.
