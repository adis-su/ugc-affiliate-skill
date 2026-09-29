# AFFILIX — Product State

PRODUCT-STATE.md mendefinisikan **kondisi produk pada titik waktu tertentu**, tanpa mengubah Product Identity atau Product Truth.

Product State menjawab:

> **Produk sedang dalam kondisi apa sekarang?**

Product Identity menjawab:

> **Produk apa ini?**

Product Truth menjawab:

> **Apa yang secara faktual diketahui benar tentang produk ini?**

Pemisahan ini menjaga agar perubahan seperti open/closed, held/placed, atau orientation tidak menyebabkan AI mengarang produk baru. Karena ternyata benda mati pun butuh administrasi negara.

## 1. Purpose

Product State digunakan untuk:
- mendeskripsikan kondisi produk pada reference
- menentukan Start Product State dan End Product State
- menjaga product continuity antar clip
- menjadi bagian dari Visual State
- menjadi input Image Spec dan Video Spec
- mendefinisikan perubahan kondisi produk
- menjaga hubungan produk dengan karakter dan environment
- mendukung frame-to-frame generation

Product State bukan:
- Product Identity
- Product Truth
- Product description
- Product claim
- Performance
- Video Prompt

## 2. Product Identity Boundary

Product State tidak boleh mengubah:

- brand
- product name
- variant
- model
- packaging identity
- shape
- color identity
- material identity
- logo
- label identity
- established physical details
- permanent product characteristics

Jika Product State bertentangan dengan Product Identity atau Product Truth:

> Product Truth / Product Identity wins.

State hanya boleh mengubah kondisi temporal atau interaksi yang memang dapat berubah.

## 3. Product State Scope

Product State dapat mencakup:

- open / closed
- held / placed
- position
- orientation
- visibility
- occlusion
- quantity
- interaction state
- location within environment
- relation to character
- relation to other objects
- contents visibility when explicitly known
- temporary physical condition when established

## 4. State Must Be Observable

Product State harus mendeskripsikan kondisi yang dapat divisualisasikan.

Benar:

> closed package resting upright on the table.

> product held in Rositasari's right hand, front facing camera.

Tidak tepat:

> feels premium.

> works really well.

Kedua contoh terakhir adalah evaluasi atau claim, bukan state.

## 5. Product State Record

Gunakan struktur:

### Product State Record

- Product State ID:
- Reference ID:
- Scene ID:
- Clip ID:
- Timestamp:
- Product Identity Reference:
- Open/Closed State:
- Position:
- Orientation:
- Visibility:
- Occlusion:
- Quantity:
- Interaction State:
- Character Interaction:
- Environment Relationship:
- Contents Visibility:
- Temporary Physical Condition:
- Continuity Anchors:
- Allowed Changes:
- Prohibited Changes:
- Dependencies:
- Status:

## 6. Open / Closed State

Open/closed adalah state yang sangat penting jika product memiliki kondisi tersebut.

Contoh:

> product package closed.

Transition:

> Rositasari opens the package.

End State:

> product package open.

Jangan mengubah open/closed secara diam-diam antar reference.

## 7. Held / Placed State

Product State harus mencatat apakah produk:

- held by character
- placed on table
- placed on shelf
- inside another object
- outside frame
- partially visible

Contoh:

> product placed on the table in front of Rositasari.

> product held in Rositasari's right hand at chest height.

## 8. Position

Position menjelaskan lokasi produk secara relatif terhadap:

- character
- camera
- environment
- other objects

Contoh:

> centered on the table directly in front of Rositasari.

> held near the center of frame.

Relative positioning biasanya lebih robust daripada koordinat absolut.

## 9. Orientation

Orientation dapat mencakup:

- front facing camera
- back facing camera
- label facing camera
- rotated left
- rotated right
- horizontal
- vertical
- tilted

Orientation adalah state, bukan movement instruction.

Movement:

> rotates the product toward the camera.

Resulting state:

> front label facing camera.

## 10. Visibility and Occlusion

Product State harus mencatat visibility ketika relevan.

Contoh:

- fully visible
- partially occluded by hand
- partially outside frame
- hidden behind object
- not visible

Occlusion harus konsisten dengan spatial relationship.

Jangan mendeskripsikan product sebagai fully visible jika tangan karakter menutup bagian pentingnya.

## 11. Quantity

Quantity harus dicatat jika continuity-critical.

Contoh:

> one product unit visible.

> two identical units visible.

Jangan menambah quantity hanya karena storyboard memerlukan visual yang terasa lebih penuh.

Quantity harus berasal dari approved project information.

## 12. Interaction State

Interaction State menjelaskan hubungan produk dengan objek atau karakter.

Contoh:

- held by right hand
- touched by both hands
- resting on table
- being opened
- being placed into bag
- next to phone

Untuk snapshot, gunakan resulting condition:

> product held in right hand.

Action belongs to Performance / Video Spec.

## 13. Character Interaction Boundary

Product State mencatat kondisi hubungan produk dengan karakter.

Character State mencatat kondisi karakter dan relasi dari sisi karakter.

Contoh:

Product State:
> product held by Rositasari's right hand.

Character State:
> right hand holding product at chest height.

Keduanya harus compatible.

## 14. Environment Relationship

Product State harus konsisten dengan Environment State.

Contoh:

> product resting on the front-left area of the table.

Environment State:
> table positioned directly in front of character.

Jika product berpindah lokasi, transition harus tercatat.

## 15. Contents Visibility

Jika product memiliki contents yang dapat terlihat, state dapat mencatat visibility.

Contoh:

> inner compartment visible.

> contents not visible.

Namun jangan mengarang isi product.

Jika contents tidak diketahui:

> UNKNOWN.

## 16. Temporary Physical Condition

Temporary conditions dapat dicatat jika benar-benar established.

Contoh:

- cap removed
- lid open
- folded
- unfolded
- wet surface
- product partially covered

Temporary condition tidak boleh digunakan untuk membuat klaim kualitas.

Contoh yang tidak boleh:

> product looks more effective.

Effectiveness adalah claim, bukan physical state.

## 17. Start Product State

Start Product State adalah kondisi produk ketika clip dimulai.

Harus cocok dengan:
- Start Reference
- Visual State
- previous clip End State jika bridge digunakan

Contoh:

> closed product placed upright on table, front label facing camera.

## 18. End Product State

End Product State adalah kondisi produk ketika clip berakhir.

Contoh:

> product open and held upright in Rositasari's right hand, front label facing camera.

End State harus cukup stabil untuk reference jika diperlukan.

## 19. Bridge Product State

Jika Clip N dilanjutkan Clip N+1:

> End Product State N = Start Product State N+1

Contoh:

Clip N End:
> product open, held in right hand, front label facing camera.

Clip N+1 Start:
> product open, held in right hand, front label facing camera.

Perubahan baru dimulai setelah start state.

## 20. Product State Transition

Gunakan:

**PRODUCT STATE A → ACTION → PRODUCT STATE B**

Contoh:

State A:
> closed product on table.

Action:
> Rositasari picks it up and opens it.

State B:
> open product held in right hand.

Action belongs to Performance / Video Spec.

## 21. Product State and Claims

Product State tidak boleh menjadi jalan belakang untuk membuat product claims.

Dilarang mengubah:
- visual state menjadi performance claim
- appearance menjadi quality claim
- open/closed state menjadi effectiveness claim
- quantity menjadi availability claim
- visible condition menjadi durability claim

Contoh:

State:
> liquid visible inside the bottle.

Bukan:
> the liquid is high quality.

Jika sebuah claim tidak ada dalam Product Truth, jangan membuatnya.

## 22. Product Color and Appearance

Product State dapat menyatakan appearance yang sedang terlihat jika sesuai Product Identity.

Contoh:

> front-facing package with established product color visible.

Jangan mengubah:
- warna produk
- packaging design
- logo
- label
- proportions

hanya karena lighting atau camera angle berubah.

Jika lighting menyebabkan apparent color shift, preserve Product Identity.

## 23. Product State and Camera

Camera State dapat memengaruhi visibility, tetapi tidak mengubah Product State.

Contoh:

Product State:
> product held upright, front label facing camera.

Camera State:
> medium close-up, camera slightly above product level.

Jika camera bergerak, product state tetap sama kecuali ada explicit transition.

## 24. Product State and Character State

Product State dan Character State harus saling compatible.

Contoh:

Product State:
> product held in right hand.

Character State:
> right hand holding product at chest height.

Conflict:

Product State:
> product on table.

Character State:
> right hand holding product.

Conflict harus diselesaikan sebelum downstream generation.

Jangan diam-diam memilih salah satunya.

## 25. State Inheritance

Jika product state tidak berubah, state dapat diwariskan.

Contoh:

R01:
> product closed on table, front facing camera.

R02:
> same product state; character gaze changed.

Product State R02 dapat mewarisi state R01.

Jika hanya orientation berubah:

R03:
> product now rotated slightly right.

Hanya changed property yang perlu diperbarui.

## 26. Continuity Anchors

Critical Product State anchors dapat mencakup:

- open/closed
- held/placed
- hand relationship
- orientation
- label direction
- visibility
- quantity
- location
- interaction
- critical temporary condition

Prioritaskan anchor yang berpengaruh pada frame-to-frame continuity.

## 27. Prohibited State Changes

Product State tidak boleh secara diam-diam mengubah:

- brand
- product name
- variant
- packaging
- shape
- color identity
- logo
- material identity
- physical dimensions
- established product features
- contents not established by Product Truth

Jika perubahan tersebut diperlukan, lakukan upstream change terhadap Product Truth / Product Identity sesuai workflow.

## 28. Missing Product State

Jika critical state belum diketahui:

- mark UNKNOWN
- preserve known information
- do not invent
- block dependent generation when ambiguity affects continuity

Contoh:

Jika tidak diketahui apakah package sudah dibuka, jangan mengasumsikan open atau closed.

## 29. Common Failure Modes

### Product Teleportation

Product tiba-tiba berpindah lokasi.

Correction:
> define the transition and resulting state.

### Identity Drift

Packaging, logo, color, shape, atau variant berubah.

Correction:
> restore Product Identity and Product Truth.

### Open/Closed Drift

Product tiba-tiba berubah dari closed menjadi open.

Correction:
> define explicit state transition.

### Hand Swap

Product berpindah tangan tanpa transition.

Correction:
> record the hand relationship.

### Orientation Drift

Label atau front face berubah arah tanpa reason.

Correction:
> define orientation state and transition.

### Quantity Drift

Jumlah product berubah tanpa explanation.

Correction:
> preserve approved quantity state.

### Occlusion Error

Product disebut visible penuh tetapi secara visual tertutup.

Correction:
> update visibility/occlusion state.

### Invented Contents

AI menambahkan isi product yang tidak diketahui.

Correction:
> mark contents UNKNOWN or preserve only established information.

## 30. Change Propagation

Product State depends on:

- Product Truth
- Product Identity
- Storyboard
- Timeline
- Clip
- Character State
- Environment State
- Camera State

Changes may propagate downstream.

Examples:

Product Identity change:
→ affected Product States become STALE.

Open/closed change:
→ affected references and clips become STALE.

Hand relationship change:
→ affected Character States and downstream outputs may become STALE.

Timeline change:
→ affected timestamped Product States may become STALE.

## 31. Regeneration

Product State changes require targeted regeneration.

Examples:

**Open → Closed**
→ update affected reference and dependent video transition.

**Table → Hand**
→ update product state, compatible character state, and dependent reference.

**Front-facing → rotated**
→ update only affected reference/clip chain.

Do not regenerate unrelated product states.

## 32. Status

Product State follows the project state machine:

- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

A LOCKED Product State becomes a constraint for dependent production outputs.

## 33. Boundary with Product Identity

Product Identity:
> permanent definition of the product.

Product State:
> temporary condition of the product.

Identity:
> established package, shape, color, logo, and physical details.

State:
> open, held in right hand, front facing camera.

## 34. Boundary with Product Truth

Product Truth:
> factual authority about what is known to be true.

Product State:
> project-specific condition at a declared time.

Product State cannot invent facts absent from Product Truth.

## 35. Boundary with Visual State

Product State is one component.

Visual State is the complete snapshot:

> Character State + Product State + Environment State + Camera State + other relevant visual conditions.

## 36. Source of Truth

Product Truth remains authoritative for factual product information.

Product Identity remains authoritative for permanent product identity.

Product State is authoritative for project-specific product condition at its declared time/reference.

Generated images and videos do not automatically replace Product State.

## 37. Non-Negotiable Rules

1. Product Identity, Product Truth, and Product State are separate.
2. Product State describes a snapshot, not an action sequence.
3. Product State must be observable.
4. Open/closed changes must be explicit.
5. Held/placed changes must be explicit.
6. Orientation changes must be traceable.
7. Quantity must not drift without an established change.
8. Product State cannot override Product Identity or Product Truth.
9. Character/Product interaction must remain mutually compatible.
10. Start Product State must match the start reference.
11. End Product State must support the next clip when continuity requires it.
12. Missing critical state must not be fabricated.
13. Product State must not create unsupported product claims.
14. Generated output does not automatically become a new Source of Truth.
15. Changes propagate downstream through dependency rules.
16. Regeneration must be targeted.
17. No separate validation stage is introduced.
