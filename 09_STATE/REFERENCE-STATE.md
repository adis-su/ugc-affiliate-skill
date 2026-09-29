# AFFILIX — Reference State

REFERENCE-STATE.md mendefinisikan **snapshot state yang dipilih sebagai visual reference produksi**.

Reference State menjawab:

> **State apa yang harus direpresentasikan oleh reference ini?**

Reference adalah anchor visual.

Reference State bukan sekadar deskripsi gambar yang sudah dibuat. Ia adalah **state specification yang harus diwujudkan oleh reference**.

## 1. Purpose

Reference State digunakan untuk:
- menentukan kondisi visual yang harus direpresentasikan oleh sebuah reference
- mengikat Character State, Product State, Environment State, dan Camera State
- menjadi bridge antar clip
- menjadi basis Image Spec dan Image Prompt
- menjadi kondisi awal atau akhir Video Prompt
- menjaga frame-to-frame continuity
- menyediakan snapshot yang dapat ditelusuri ke upstream source

Pipeline:

GLOBAL TIMELINE
→ CLIP
→ VISUAL STATE
→ REFERENCE STATE
→ IMAGE SPEC
→ IMAGE PROMPT

Reference State bukan:
- generated image
- Image Prompt
- Video Prompt
- storyboard
- transition
- identity definition

## 2. Reference vs Reference State

Reference State adalah **spesifikasi state**.

Reference Image adalah **visual artifact** yang mencoba merepresentasikan state tersebut.

Contoh:

Reference State:
> Rositasari seated, gaze toward camera, right hand holding closed product, product front-facing, medium close-up.

Reference Image:
> generated image representing that state.

Jika generated image berbeda dari Reference State, generated image tidak otomatis menjadi Source of Truth.

## 3. Reference ID

Setiap reference harus memiliki identifier stabil.

Format:

- R01
- R02
- R03
- R04

Reference ID harus unik dalam project.

Reference ID digunakan oleh:
- Clip
- Visual State
- Image Spec
- Image Prompt
- Video Prompt
- Timeline
- Change Log

## 4. Reference State Record

Gunakan struktur:

### Reference State Record

- Reference ID:
- Reference Type:
- Scene ID:
- Clip ID:
- Timestamp:
- Duration Relevance:
- Character State:
- Product State:
- Environment State:
- Camera State:
- Lighting State:
- Spatial Relationships:
- Visual Priority:
- Continuity Anchors:
- Start/End Role:
- Source References:
- Image Spec Reference:
- Status:

## 5. Reference Type

Reference dapat memiliki role:

### Start Reference

Snapshot yang digunakan sebagai kondisi awal clip.

### End Reference

Snapshot yang digunakan sebagai kondisi akhir clip.

### Bridge Reference

End Reference dari Clip N yang digunakan sebagai Start Reference Clip N+1.

### Standalone Reference

Reference yang tidak digunakan sebagai clip boundary tetapi diperlukan untuk visual planning atau production.

Satu reference dapat memiliki lebih dari satu role jika workflow menetapkannya.

## 6. Reference State as Snapshot

Reference State harus menggambarkan satu kondisi pada satu titik waktu.

Benar:

> product open and held in right hand, front label facing camera.

Bukan:

> Rositasari opens the product and then holds it toward camera.

Kalimat kedua adalah transition.

## 7. Complete State Composition

Reference State biasanya terdiri dari:

> Character State
> +
> Product State
> +
> Environment State
> +
> Camera State
> +
> relevant Lighting State
> +
> Spatial Relationships

Tidak semua field harus ditulis ulang jika dapat diwariskan secara eksplisit.

Namun state yang continuity-critical harus dapat ditelusuri.

## 8. Character State Reference

Reference State harus mengikat Character State yang berlaku.

Untuk Rositasari, Reference State harus preserve:

- established facial identity
- body identity
- established wardrobe
- permanent hijab presence
- full hair coverage

Reference State tidak boleh mengubah Character Identity.

## 9. Product State Reference

Reference State harus mengikat Product State yang berlaku.

Contoh:

> product closed, held in right hand, upright, front label facing camera.

Reference State tidak boleh mengubah:
- product identity
- packaging identity
- established color
- logo
- shape
- variant

## 10. Environment State Reference

Reference State harus mengikat environment condition yang terlihat.

Contoh:

> seated behind the same table, window remains in background, product positioned above table plane.

Environment continuity harus dipertahankan ketika reference digunakan sebagai bridge.

## 11. Camera State Reference

Reference State harus mengikat camera condition.

Contoh:

> medium close-up, eye-level, subject centered, face and product both visible.

Reference State tidak boleh menyimpan camera movement sebagai snapshot action.

## 12. Lighting State Reference

Lighting harus dicatat jika critical terhadap continuity.

Contoh:

> soft daylight from camera-left, consistent exposure, soft shadow toward camera-right.

Jika lighting tidak berubah dan sudah inherited, tidak perlu mengulang seluruh detail.

## 13. Spatial Relationship Reference

Reference State harus menjaga relationship penting:

- character ↔ product
- character ↔ environment
- product ↔ environment
- camera ↔ subject
- camera ↔ product

Contoh:

> product held near centerline of torso, camera directly facing subject.

## 14. Visual Priority

Setiap reference dapat memiliki visual priority.

Contoh:

1. Character face
2. Product
3. Hand/product interaction
4. Environment continuity
5. Background detail

Visual priority membantu downstream Image Spec menentukan apa yang tidak boleh hilang.

Priority bukan ranking kualitas. Ia adalah urutan perhatian produksi.

## 15. Continuity Anchors

Reference State harus mengidentifikasi anchor yang perlu dipertahankan.

Critical anchors dapat mencakup:

- face identity
- hijab coverage
- body orientation
- gaze
- hand/product relationship
- product orientation
- open/closed state
- character position
- camera framing
- environment anchor
- lighting direction

Gunakan hanya anchor yang relevan.

## 16. Start Reference

Start Reference harus menggambarkan kondisi nyata ketika clip dimulai.

Start Reference harus match:

> Clip Start State

dan:

> Start Character State
> + Start Product State
> + Start Environment State
> + Start Camera State

Jika salah satu component mismatch, clip start tidak reliable.

## 17. End Reference

End Reference menggambarkan kondisi ketika clip selesai.

End Reference harus match:

> Clip End State

dan seluruh state component yang relevan.

End Reference harus cukup stabil jika digunakan sebagai bridge.

## 18. Bridge Reference

Bridge Reference adalah continuity anchor antar clip.

Aturan:

> End Reference Clip N = Start Reference Clip N+1

Secara state:

> End Reference State N = Start Reference State N+1

Tidak boleh ada hidden reset.

## 19. Reference State and Video Transition

Video Prompt menggunakan:

> Start Reference State → Transition → End Reference State

Reference State tidak menyimpan action.

Action berada pada:
- Performance
- Video Spec
- Video Prompt

## 20. Reference State and Image Prompt

Image Prompt bertugas menghasilkan visual yang merepresentasikan Reference State.

Reference State:
> product open, held in right hand, front-facing.

Image Prompt:
> rendering instruction for that exact condition.

Image Prompt tidak boleh:
- mengubah product state
- mengubah character identity
- mengubah camera state
- menambah unsupported environment detail

## 21. Reference State and Image Spec

Image Spec menjawab:

> Apa yang wajib terlihat pada reference?

Reference State menjawab:

> Dalam kondisi apa hal tersebut harus terlihat?

Contoh:

Reference State:
> product open and held in right hand.

Image Spec:
> show open product clearly in right hand with front-facing orientation.

## 22. State Inheritance

Reference State dapat mewarisi state dari reference sebelumnya.

Contoh:

R01:
> Rositasari seated, camera medium shot, product closed on table.

R02:
> same character, environment, and camera state; product now held in right hand.

Inherited:
- character identity
- character pose if unchanged
- environment
- camera

Changed:
- product position
- interaction state

Inheritance harus dapat ditelusuri.

## 23. Reference Stability

Reference harus memiliki state yang cukup stabil untuk digunakan sebagai anchor.

Hindari reference yang merepresentasikan:

- motion blur as required state
- ambiguous hand position
- partially undefined product orientation
- unstable camera position
- transitional pose tanpa alasan

Jika transitional frame memang diperlukan, state harus dinyatakan eksplisit.

## 24. Reference State and Naturalization

Naturalization tidak mengubah Reference State.

Allowed:
- subtle blink
- breathing
- tiny finger reposition
- subtle camera micro-drift

Not allowed:
- change product state
- change gaze target when fixed
- change pose
- reveal hidden hair
- alter product identity

## 25. Reference State and Audio

Audio tidak menjadi bagian utama Reference State.

Namun jika visual harus sync dengan audio, reference dapat memiliki timing dependency.

Contoh:

> mouth position and expression must correspond to spoken phrase timing.

Audio authority tetap berada di AUDIO-DESIGN.md.

## 26. Reference Selection

Reference dipilih pada titik yang memiliki continuity value tinggi.

Prioritaskan reference pada:

- clip start
- clip end
- major product state change
- major character state change
- major camera state change
- scene transition
- environment transition

Tidak setiap second membutuhkan reference.

## 27. Reference Density

Reference density harus mengikuti continuity risk.

High-risk transition:
> more explicit references.

Low-risk continuous movement:
> fewer references may be sufficient.

Tujuannya bukan menghasilkan sebanyak mungkin reference.

Tujuannya menghasilkan reference yang cukup untuk mengunci state.

## 28. Reference Failure Modes

### State Mismatch

Reference tidak sesuai dengan declared state.

Correction:
> reconcile the actual Source of Truth and regenerate only affected reference/output.

### Identity Drift

Reference mengubah face, body, hijab, atau product identity.

Correction:
> restore upstream identity constraints.

### Bridge Mismatch

End Reference dan next Start Reference berbeda.

Correction:
> use the same bridge state/reference.

### Ambiguous State

Reference tidak jelas apakah product open atau closed.

Correction:
> define state explicitly and regenerate if needed.

### Camera Drift

Reference framing changes unexpectedly.

Correction:
> restore Camera State.

### Environment Drift

Background geometry changes between bridge references.

Correction:
> restore Environment State.

## 29. Change Propagation

Reference State depends on:

- Character Identity
- Product Truth
- Product Identity
- Character State
- Product State
- Environment State
- Camera State
- Storyboard
- Timeline
- Clip

Changes may make affected Reference States STALE.

Examples:

Character Identity change:
→ affected Reference States become STALE.

Product Identity change:
→ affected Reference States become STALE.

Character State change:
→ affected references become STALE.

Product State change:
→ affected references become STALE.

Camera State change:
→ affected references become STALE.

## 30. Regeneration

Reference regeneration must be targeted.

Examples:

**Product orientation change**
→ regenerate affected reference only.

**Character gaze change**
→ regenerate affected reference and dependent video prompt.

**Camera framing change**
→ regenerate affected reference chain where required.

Do not regenerate the whole project for a local state change.

## 31. Status

Reference State follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED Reference State becomes a production constraint for dependent outputs.

## 32. Source of Truth

Reference State is authoritative for the intended project snapshot.

Upstream sources remain authoritative for their domains:

- Product Truth → factual product information
- Product Identity → permanent product identity
- Character Identity → permanent character identity
- Environment → physical environment
- Character State → character condition
- Product State → product condition
- Camera State → camera condition

Generated reference images do not automatically become Reference State.

## 33. Boundary with Visual State

Visual State:
> complete visual condition at a point in time.

Reference State:
> the selected visual state packaged as a production reference.

Visual State may exist without a generated reference.

Reference State exists when a state is assigned to a reference anchor.

## 34. Boundary with Clip

Clip:
> generation unit.

Reference State:
> state anchor used by the clip.

A clip can use:
- one Start Reference
- one End Reference
- bridge reference when applicable

## 35. Boundary with Production Spec

Reference State:
> what the reference state is.

Image Spec:
> what must be visible in the generated reference.

Video Spec:
> how state changes between references.

## 36. Non-Negotiable Rules

1. Reference State is a state specification, not a generated image.
2. Reference must represent one snapshot condition.
3. Reference ID must be stable and unique.
4. Start Reference must match Clip Start State.
5. End Reference must match Clip End State.
6. Bridge Reference must preserve continuity across clips.
7. Character Identity cannot be changed through Reference State.
8. Product Identity and Product Truth cannot be changed through Reference State.
9. Reference State must be traceable to upstream states.
10. Missing critical state must not be fabricated.
11. Image Prompt must follow Reference State.
12. Video Prompt must transition between declared states.
13. Naturalization cannot alter Reference State.
14. Generated images do not automatically become Source of Truth.
15. Reference changes propagate downstream through dependency rules.
16. Regeneration must be targeted.
17. No separate validation stage is introduced.
