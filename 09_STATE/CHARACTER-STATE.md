# AFFILIX — Character State

CHARACTER-STATE.md mendefinisikan **kondisi karakter pada titik waktu tertentu**, tanpa mengubah Character Identity.

Character State menjawab: **Dalam kondisi apa karakter berada sekarang?**

Character Identity menjawab: **Siapa karakter ini?**

## 1. Purpose

Character State digunakan untuk:
- mendeskripsikan kondisi visual karakter pada reference
- menentukan Start State dan End State
- menjaga continuity antar clip
- menjadi input Visual State
- menjadi dasar Image Spec dan Video Spec
- menentukan perubahan pose, expression, gaze, gesture, dan interaction
- mendukung frame-to-frame generation

Character State bukan:
- Character Identity
- Performance
- Dialogue
- Voice Identity
- Video Prompt

## 2. Character Identity Boundary

Character State tidak boleh mengubah atau mendefinisikan ulang:
- face structure
- facial proportions
- eye structure
- eyebrow structure
- nose structure
- lip proportions
- skin characteristics
- visual age
- body identity
- permanent wardrobe identity
- permanent hijab requirement

Untuk Rositasari, hijab adalah permanent identity constraint:
- hijab selalu hadir
- seluruh rambut tetap tertutup
- tidak boleh muncul rambut karena camera angle, movement, transition, atau generation artifact

Jika Character State bertentangan dengan Character Identity, Character Identity wins.

## 3. Character State Scope

Character State dapat mencakup:
- body position
- pose
- posture
- body orientation
- head orientation
- gaze direction
- facial expression
- hand position
- arm position
- leg position
- gesture
- movement phase
- interaction state
- position in environment
- product interaction
- emotional performance state when visually observable

## 4. State Must Be Observable

Character State harus mendeskripsikan kondisi yang dapat divisualisasikan.

Benar:
> seated behind the table, torso facing camera, gaze toward the product, right hand holding the product.

Kurang tepat:
> feels confident.

Jika kondisi internal tidak menghasilkan visual yang jelas, gunakan observable performance instead.

Contoh:
> relaxed posture, steady gaze, subtle smile.

## 5. Character State Record

Gunakan struktur:

### Character State Record

- Character State ID:
- Reference ID:
- Scene ID:
- Clip ID:
- Timestamp:
- Body Position:
- Pose:
- Posture:
- Body Orientation:
- Head Orientation:
- Gaze:
- Facial Expression:
- Hand/Arm Position:
- Leg Position:
- Gesture:
- Movement Phase:
- Interaction State:
- Spatial Position:
- Product Interaction:
- Performance Notes:
- Continuity Anchors:
- Allowed Changes:
- Prohibited Changes:
- Dependencies:
- Status:

## 6. Body Position

Body Position menjelaskan posisi karakter dalam environment.

Contoh:
> seated on the chair behind the table.

> standing beside the kitchen counter.

> leaning slightly toward the camera.

Body Position harus konsisten dengan Environment State.

## 7. Pose

Pose menjelaskan konfigurasi tubuh pada snapshot.

Contoh:
> torso upright, shoulders relaxed, both feet grounded.

Pose bukan movement instruction.

Movement:
> Rositasari raises her right hand.

Resulting pose:
> right hand raised to chest level.

## 8. Posture

Posture mencakup kondisi tubuh seperti:
- upright
- relaxed
- slightly leaned forward
- slightly leaned backward
- weight shifted to one leg
- seated upright
- seated casually

Gunakan istilah yang cukup spesifik untuk continuity tetapi tidak berlebihan.

## 9. Body Orientation

Body Orientation menentukan arah tubuh relatif terhadap environment atau camera.

Contoh:
- facing camera
- three-quarter left
- three-quarter right
- turned toward product
- side profile

Body Orientation dapat berubah tanpa mengubah Body Identity.

## 10. Head Orientation

Head Orientation terpisah dari Body Orientation.

Contoh:
> body facing camera, head turned slightly toward the product.

Pemisahan ini penting untuk natural performance dan continuity.

## 11. Gaze State

Gaze dapat mencakup:
- target
- direction
- intensity
- duration when relevant

Contoh:
> gaze directed at product in right hand.

> direct gaze toward camera.

Gaze changes are state changes when visually important.

## 12. Facial Expression State

Facial Expression mendeskripsikan kondisi ekspresi pada snapshot.

Contoh:
- neutral
- subtle smile
- warm smile
- focused
- mildly surprised
- concerned

Expression tidak boleh mengubah facial identity.

Jangan menggunakan expression untuk mengubah:
- eye shape
- lip proportions
- face shape
- facial structure

## 13. Expression vs Emotion

Emotion adalah performance intention.

Expression adalah visible state.

Contoh:

Emotion intention:
> friendly and enthusiastic.

Visible state:
> relaxed brows, direct gaze, subtle smile.

Character State menyimpan visible state.

Performance module menyimpan bagaimana state tersebut dimainkan.

## 14. Hand and Arm State

Hand/arm state sangat penting untuk product interaction.

Catat:
- left/right hand
- hand position
- object contact
- grip
- finger placement when continuity-critical
- arm position

Contoh:
> right hand holding the product at chest height, left hand resting on the table.

Jika finger placement tidak penting, jangan over-specify.

## 15. Product Interaction State

Character State harus mencatat hubungan karakter dengan product jika relevan.

Contoh:
> right hand holding product upright.

> both hands touching the package.

> product placed on table, both hands free.

Product State tetap menjadi authority untuk kondisi produk.

Character State hanya mencatat **hubungan karakter dengan produk**.

## 16. Spatial Character State

Character position harus konsisten dengan:
- environment
- camera
- product
- other objects
- previous reference

Contoh:
> seated centered behind table, approximately aligned with the center of frame.

Gunakan relative spatial descriptions jika cukup.

## 17. Movement Phase

Jika snapshot diambil selama movement, state dapat mencatat phase:
- beginning
- mid-transition
- near-end
- settled

Namun Character State tetap snapshot.

Jangan menulis:
> reaches for product and picks it up.

Gunakan:
> right hand extended toward product.

Kemudian state berikutnya:
> right hand holding product.

## 18. Start Character State

Start Character State adalah kondisi karakter ketika clip dimulai.

Harus cocok dengan:
- Start Reference
- Visual State
- previous clip End State jika bridge digunakan

Contoh:
> seated upright, body facing camera, gaze toward product, right hand resting beside product on table.

## 19. End Character State

End Character State adalah kondisi karakter saat clip berakhir.

Contoh:
> seated upright, body facing camera, gaze toward camera, right hand holding product upright at chest level.

End state harus cukup stabil untuk reference jika diperlukan.

## 20. Bridge Character State

Jika Clip N dilanjutkan Clip N+1:

> End Character State N = Start Character State N+1

Tidak boleh ada teleportation atau silent pose reset.

Contoh:

Clip N End:
> right hand holding product at chest height.

Clip N+1 Start:
> right hand holding product at chest height.

Perubahan baru dimulai setelah start state.

## 21. Character State Transition

Gunakan:

**CHARACTER STATE A → PERFORMANCE/ACTION → CHARACTER STATE B**

Contoh:

State A:
> gaze toward product, right hand resting on table.

Action:
> lifts product and shifts gaze to camera.

State B:
> gaze toward camera, right hand holding product at chest height.

Action belongs to Performance/Video Spec.

## 22. Naturalization

Naturalization boleh menambahkan micro-motion:
- blinking
- subtle breathing
- tiny gaze adjustment
- slight weight shift
- natural finger repositioning
- subtle facial micro-expression
- natural head movement

Naturalization tidak boleh mengubah required Character State.

Contoh allowed:
> subtle blink while maintaining direct gaze.

Not allowed:
> gaze shifts to another object when direct gaze is required.

## 23. Character State and Voice

Character State tidak menyimpan Voice Identity.

Voice Identity tetap berada di:
04_CHARACTER/VOICE-IDENTITY.md

Audio delivery dapat memengaruhi performance timing, tetapi tidak mengubah Character Identity.

## 24. Character State and Dialogue

Dialogue menentukan apa yang diucapkan.

Character State menentukan kondisi visual ketika dialogue berlangsung.

Contoh:
Dialogue:
> spoken line from Dialogue module.

Character State:
> direct gaze toward camera, subtle smile, product held at chest height.

Performance:
> natural speech with small hand gesture.

Ketiganya harus tetap terhubung tanpa dicampur menjadi satu field.

## 25. State Inheritance

Jika karakter tidak berubah dari reference sebelumnya, state dapat diwariskan.

Contoh:

R01:
> seated upright, body facing camera, both hands on table.

R02:
> same character state; right hand now holding product.

Only changed state:
> right hand position and product interaction.

Unchanged properties may be inherited.

## 26. Continuity Anchors

Critical Character State anchors dapat mencakup:
- body position
- body orientation
- head orientation
- gaze target
- expression
- hand/product relationship
- spatial position
- wardrobe continuity
- hijab coverage

Untuk Rositasari, hijab coverage adalah permanent continuity anchor.

## 27. Prohibited State Changes

Character State tidak boleh secara diam-diam mengubah:
- facial identity
- body identity
- visual age
- hijab presence
- hair coverage
- permanent wardrobe identity
- established physical characteristics

State changes yang valid harus berasal dari:
- explicit user instruction
- approved upstream change
- established project logic

## 28. Missing Character State

Jika critical state belum diketahui:
- mark UNKNOWN
- preserve known information
- do not invent
- block dependent output if continuity would be ambiguous

Contoh:
Jika tidak diketahui tangan mana yang memegang product, jangan memilih kanan hanya karena "biasanya begitu".

## 29. Common Failure Modes

### Pose Teleportation
Character suddenly changes pose between references.

Correction: define transition and intermediate state.

### Identity Drift
State description accidentally changes facial or body identity.

Correction: restore Character Identity.

### Gaze Drift
Character looks somewhere else without an intentional transition.

Correction: define gaze target explicitly.

### Hand Continuity Failure
Product jumps from one hand to another.

Correction: record hand state and transition.

### Hijab/Hair Failure
Hair becomes visible between references.

Correction: enforce permanent hijab and full hair coverage constraints.

### Expression Drift
Expression changes unexpectedly.

Correction: establish required expression state and transition.

### Over-Specification
Every finger, muscle, and millimeter is constrained unnecessarily.

Correction: specify only continuity-critical details.

## 30. Change Propagation

Character State depends on:
- Character Identity
- Storyboard
- Timeline
- Clip
- Product State
- Environment State
- Camera State

Changes may propagate downstream.

Example:
Character Identity change → all affected Character States become STALE.

Pose change → affected references and clips become STALE.

Dialogue timing change → affected performance timing and state references may become STALE.

## 31. Regeneration

Character State changes require targeted regeneration.

Examples:

Gaze change:
→ update affected reference image prompt and dependent video prompt.

Hand change:
→ update affected reference and clips using the changed state.

Pose change:
→ update only affected state chain.

Do not regenerate unrelated project stages.

## 32. Status

Character State follows the project state machine:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED Character State becomes a constraint for dependent production outputs.

## 33. Boundary with Character Identity

Character Identity:
> permanent definition of who the character is.

Character State:
> temporary condition of that character.

Identity:
> oval-rounded face, established eyes, permanent hijab.

State:
> seated, looking at camera, subtle smile, right hand holding product.

## 34. Boundary with Performance

Character State:
> right hand raised to chest height.

Performance:
> raises right hand from table to chest height.

State is the result.

Performance is the change.

## 35. Boundary with Visual State

Character State is one component.

Visual State is the complete visual snapshot:
> Character State + Product State + Environment State + Camera State + other relevant visual conditions.

## 36. Source of Truth

Character Identity remains the authoritative source for identity.

Character State is authoritative for project-specific character condition at its declared time/reference.

Generated images and videos do not automatically replace Character State.

## 37. Non-Negotiable Rules

1. Character Identity and Character State are separate.
2. Character State describes a snapshot, not an action sequence.
3. Character State must be observable.
4. Pose changes must be traceable.
5. Gaze changes must be explicit when continuity-critical.
6. Hand/product relationships must remain continuous.
7. Rositasari's hijab remains present and fully covers the hair.
8. Character State cannot override Character Identity.
9. Performance describes transitions; Character State describes resulting conditions.
10. Start Character State must match the start reference.
11. End Character State must support the next clip when continuity requires it.
12. Missing critical state must not be fabricated.
13. Naturalization may add micro-motion but cannot alter required state.
14. Changes propagate downstream through dependency rules.
15. Regeneration must be targeted.
16. Generated output does not automatically become a new Source of Truth.
17. No separate validation stage is introduced.
