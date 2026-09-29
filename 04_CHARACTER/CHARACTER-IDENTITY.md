# AFFILIX — Character Identity

`CHARACTER-IDENTITY.md` adalah authoritative specification untuk identitas visual karakter dalam project AFFILIX.

Character Identity menjawab **siapa karakter tersebut secara visual dan fisik**.

Identity harus dipisahkan dari Character State, Performance, dan Voice Identity.

## 1. Purpose

Character Identity digunakan sebagai source untuk:
- Storyboard
- Reference State
- Production Spec
- Image Prompt
- Video Prompt
- Naturalization

Identity harus tetap konsisten sepanjang production kecuali ada explicit identity change.

## 2. Identity vs State

### Character Identity
Atribut yang menentukan siapa karakter:
- face structure
- facial proportions
- eyes
- eyebrows
- nose
- lips
- skin characteristics
- visual age
- body identity
- height
- permanent attributes

### Character State
Kondisi karakter pada moment tertentu:
- pose
- expression
- gaze direction
- gesture
- body orientation
- movement
- interaction

State dapat berubah.
Identity tidak boleh drift.

## 3. Character Record

Gunakan struktur berikut:

### Basic Identity
- Name:
- Age:
- Gender:
- Height:
- Appearance:
- Visual Style:
- Permanent Attributes:

### Face
- Shape:
- Forehead:
- Cheeks:
- Jawline:
- Chin:

### Eyes
- Size:
- Shape:
- Iris Color:
- Eyelids:
- Eyelashes:
- Eye Spacing:

### Eyebrows
- Color:
- Thickness:
- Shape:
- Density:
- Tail:

### Nose
- Size:
- Bridge:
- Width:
- Tip:
- Nostrils:
- Appearance:

### Lips
- Size:
- Upper Lip:
- Lower Lip:
- Cupid Bow:
- Color:
- Corners:

### Skin
- Tone:
- Undertone:
- Texture:
- Pores:
- Facial Marks:
- Finish:
- Makeup:

## 4. Permanent Identity Attributes

Permanent attributes harus dicatat secara eksplisit.

Contoh:
- required headwear
- permanent accessory
- defining physical characteristic
- fixed visual feature

Jika atribut bersifat permanent, generation tidak boleh menghapus, mengganti, atau menegasikan atribut tersebut.

## 5. Headwear and Wardrobe Boundary

Headwear dapat menjadi:
- permanent identity attribute
- wardrobe choice
- scene styling

Jika headwear ditetapkan sebagai permanent identity attribute:
- presence must remain consistent
- required coverage must remain consistent
- hair visibility must follow identity rule
- removal is prohibited unless identity is explicitly changed

Color, style, atau wardrobe detail tidak otomatis menjadi identity.

## 6. Body Identity

Catat jika relevan:
- height
- body proportions
- build
- visual age
- distinctive physical attributes

Body identity harus konsisten antar-reference.

Pose atau body orientation bukan body identity.

## 7. Facial Expression Boundary

Default expression dapat dicatat sebagai baseline.

Contoh:
- default expression: calm neutral
- personality impression: approachable

Expression scene-specific berada di Character State / Performance.

Default expression tidak berarti karakter harus menggunakan expression yang sama di setiap frame.

## 8. Identity Priority

Jika generation mengalami identity drift, prioritaskan atribut yang paling menentukan karakter.

Recommended priority:
1. face shape
2. eye structure
3. eyebrow structure
4. nose structure
5. lip proportions
6. facial proportions
7. skin characteristics
8. permanent identity attributes

Project-specific priority dapat ditambahkan jika diperlukan.

## 9. Reference Consistency

Reference image harus merepresentasikan Character Identity dengan jelas.

Reference State dapat berubah, tetapi Identity tetap.

Perhatikan continuity pada:
- face
- headwear
- body identity
- visual age
- distinctive features

Reference baru tidak boleh secara tidak sengaja mendefinisikan karakter baru.

## 10. Prompt Usage

Jika Identity penting untuk generation, Image Prompt dan Video Prompt harus membawa identity specification yang cukup untuk menjaga consistency.

Jangan mengganti identity dengan deskripsi generik seperti:
- pretty woman
- young man
- attractive person

Generic descriptors tidak cukup untuk identity continuity.

## 11. Naturalization Boundary

Naturalization boleh mengubah:
- blinking
- eye movement
- breathing
- micro-expression
- subtle posture adjustment
- natural gesture

Naturalization tidak boleh mengubah:
- face structure
- eye structure
- nose structure
- lip proportions
- skin identity
- permanent identity attributes
- visual age

## 12. Identity Change

Character Identity hanya berubah jika:
- user memberikan explicit instruction
- project intentionally introduces identity revision
- authoritative source berubah untuk alasan yang valid

Identity change harus dicatat sebagai revision.

Downstream references dan prompts yang terdampak menjadi STALE sesuai dependency rules.

## 13. Missing Identity Data

Jika identity membutuhkan data yang belum tersedia:
- mark UNKNOWN
- identify required input
- block dependent generation jika identity tersebut critical

Jangan mengisi physical identity dengan tebakan.

## 14. Character Identity Status

Status dapat mengikuti:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Setelah LOCKED, identity menjadi constraint untuk downstream generation.

## 15. Boundary with Performance

Character Identity menentukan:
- who the character is
- physical appearance
- permanent attributes

Performance menentukan:
- how the character behaves
- expression
- gesture
- movement
- gaze
- emotional behavior

Performance tidak boleh mengubah identity.

## 16. Boundary with Voice Identity

Voice Identity adalah layer terpisah.

Visual character identity tidak otomatis menentukan:
- pitch
- timbre
- speaking pace
- vocal energy
- accent

Voice Identity berada di `VOICE-IDENTITY.md`.

## 17. Non-Negotiable Rules

1. Character Identity adalah source of truth untuk visual character identity.
2. Identity berbeda dari Character State.
3. Identity berbeda dari Performance.
4. Identity berbeda dari Voice Identity.
5. Permanent attributes harus tetap konsisten.
6. Generic descriptors tidak cukup untuk identity continuity.
7. Naturalization tidak boleh mengubah identity.
8. Identity change harus explicit dan traceable.
9. Missing identity data tidak boleh diisi dengan tebakan.
10. Locked identity menjadi downstream constraint.
11. Identity drift harus ditangani dengan targeted regeneration.
12. Reference image tidak otomatis menjadi source of truth baru.