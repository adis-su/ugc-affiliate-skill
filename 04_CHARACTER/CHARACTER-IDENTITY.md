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

## 2. Rositasari — Character Identity

### Basic Identity
- Name: Rositasari
- Age: 25
- Gender: Female
- Height: 165 cm
- Appearance: Young adult
- Ethnicity Style: Southeast Asian visual appearance
- Headwear: Hijab
- Permanent Attributes: Hijab presence and full hair coverage

### Face
- Shape: Oval-rounded
- Forehead: Moderately wide and smooth
- Cheeks: Soft and naturally rounded
- Jawline: Soft and rounded
- Chin: Short-to-medium and rounded

### Eyes
- Size: Medium
- Shape: Almond-round
- Iris Color: Very dark brown
- Gaze Baseline: Natural and direct
- Eyelids: Natural
- Eyelashes: Subtle
- Eye Spacing: Balanced

### Eyebrows
- Color: Very dark brown
- Thickness: Medium
- Shape: Natural soft arch
- Density: Moderately full
- Tail: Slightly tapered

### Nose
- Size: Medium
- Bridge: Relatively straight
- Width: Narrow-to-medium
- Tip: Rounded
- Nostrils: Small-to-medium
- Appearance: Natural

### Lips
- Size: Medium
- Upper Lip: Medium-thin
- Lower Lip: Slightly fuller
- Cupid Bow: Soft and defined
- Color: Natural muted pink
- Corners: Neutral

### Skin
- Tone: Light-medium
- Undertone: Warm-neutral
- Texture: Natural
- Pores: Subtle
- Facial Marks: Subtle natural marks
- Finish: Natural skin
- Makeup: Minimal

### Hijab
Hijab adalah **permanent character identity attribute** untuk Rositasari.

- Required: True
- Permanence: Permanent identity attribute
- Style: Modest
- Coverage: Full hair coverage
- Appearance: Natural and neatly worn
- Styling: Simple and non-dramatic
- Hair Visibility: None

#### Hijab Identity Rules
- Hair harus selalu tertutup sepenuhnya.
- Hijab harus tetap ada sepanjang generation kecuali identity memang diubah secara explicit.
- Hijab tidak boleh dilepas.
- Hijab tidak boleh diganti dengan hairstyle yang memperlihatkan rambut.
- Rambut tidak boleh muncul akibat camera angle, motion, transition, atau generation artifact.
- Hijab harus tetap physically consistent antar-frame.
- Warna, styling, atau model hijab dapat diperlakukan sebagai wardrobe/styling selama tidak bertentangan dengan permanent requirement bahwa Rositasari memakai hijab.

### Facial Expression Baseline
Default baseline Rositasari:
- Default Expression: Calm neutral
- Personality Impression: Approachable
- Gaze: Natural
- Smile: Subtle when required

Baseline ini bukan expression yang wajib digunakan di setiap frame. Expression scene-specific berada di Character State / Performance.

## 3. Identity vs State

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

Untuk Rositasari, hijab presence dan full hair coverage termasuk permanent identity attributes.

### Character State
Kondisi karakter pada moment tertentu:
- pose
- expression
- gaze direction
- gesture
- body orientation
- movement
- interaction
- spatial position

State dapat berubah.

Identity tidak boleh drift.

## 4. Character Record

Gunakan struktur berikut untuk karakter lain:

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

## 5. Permanent Identity Attributes

Permanent attributes harus dicatat secara eksplisit.

Untuk Rositasari:
- Hijab is required.
- Hair must remain fully covered.
- Hijab cannot be removed as a scene-level state change.

Contoh atribut permanent lain:
- required headwear
- permanent accessory
- defining physical characteristic
- fixed visual feature

Jika atribut bersifat permanent, generation tidak boleh menghapus, mengganti, atau menegasikan atribut tersebut tanpa explicit identity change.

## 6. Headwear and Wardrobe Boundary

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

Untuk Rositasari, **hijab presence dan full hair coverage adalah permanent identity**, sementara warna atau styling hijab dapat tetap berada di layer wardrobe/styling kecuali secara eksplisit dipromosikan menjadi identity.

## 7. Body Identity

Catat jika relevan:
- height
- body proportions
- build
- visual age
- distinctive physical attributes

Untuk Rositasari:
- Height: 165 cm
- Visual Age: 25 / young adult

Body identity harus konsisten antar-reference.

Pose atau body orientation bukan body identity.

## 8. Facial Expression Boundary

Default expression dapat dicatat sebagai baseline.

Untuk Rositasari:
- default expression: calm neutral
- personality impression: approachable
- gaze baseline: natural
- smile: subtle when required

Expression scene-specific berada di Character State / Performance.

Default expression tidak berarti karakter harus menggunakan expression yang sama di setiap frame.

## 9. Identity Priority

Jika generation mengalami identity drift, prioritaskan atribut yang paling menentukan karakter.

Rositasari priority:
1. face shape
2. eye shape and structure
3. eyebrow structure
4. nose structure
5. lip proportions
6. facial proportions
7. skin characteristics
8. hijab presence and coverage

Priority ini digunakan untuk identity preservation, bukan untuk menentukan scene performance.

## 10. Reference Consistency

Reference image harus merepresentasikan Character Identity dengan jelas.

Reference State dapat berubah, tetapi Identity tetap.

Perhatikan continuity pada:
- face
- eyes
- eyebrows
- nose
- lips
- skin
- hijab
- hair coverage
- body identity
- visual age
- distinctive features

Reference baru tidak boleh secara tidak sengaja mendefinisikan karakter baru.

## 11. Prompt Usage

Jika Identity penting untuk generation, Image Prompt dan Video Prompt harus membawa identity specification yang cukup untuk menjaga consistency.

Untuk Rositasari, prompt yang relevan harus mempertahankan:
- stable facial structure
- stable facial proportions
- stable skin characteristics
- Southeast Asian visual appearance
- 25-year-old young adult appearance
- 165 cm body identity when relevant
- hijab presence
- full hair coverage

Jangan mengganti identity dengan deskripsi generik seperti:
- pretty woman
- young woman
- attractive person

Generic descriptors tidak cukup untuk identity continuity.

## 12. Naturalization Boundary

Naturalization boleh mengubah:
- blinking
- eye movement
- breathing
- micro-expression
- subtle posture adjustment
- natural gesture
- natural speech timing

Naturalization tidak boleh mengubah:
- face structure
- eye structure
- eyebrow structure
- nose structure
- lip proportions
- skin identity
- visual age
- permanent identity attributes
- hijab presence
- hair coverage

## 13. Identity Change

Character Identity hanya berubah jika:
- user memberikan explicit instruction
- project intentionally introduces identity revision
- authoritative source berubah untuk alasan yang valid

Identity change harus dicatat sebagai revision.

Untuk Rositasari, contoh identity change:
- mengubah bentuk wajah
- mengubah atribut fisik yang stabil
- mengubah visual age
- menghapus permanent hijab requirement

Perubahan seperti tersenyum, melihat ke kiri, duduk, berdiri, atau mengangkat tangan **bukan** identity change.

Downstream references dan prompts yang terdampak menjadi STALE sesuai dependency rules.

## 14. Missing Identity Data

Jika identity membutuhkan data yang belum tersedia:
- mark UNKNOWN
- identify required input
- block dependent generation jika identity tersebut critical

Jangan mengisi physical identity dengan tebakan.

## 15. Character Identity Status

Status dapat mengikuti:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Setelah LOCKED, identity menjadi constraint untuk downstream generation.

## 16. Boundary with Performance

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

Untuk Rositasari, detail seperti subtle smile, hand gesture, gaze shift, body movement, dan reaction harus didefinisikan di Performance / Character State, bukan dimasukkan sebagai identity baru.

## 17. Boundary with Voice Identity

Voice Identity adalah layer terpisah.

Visual character identity tidak otomatis menentukan:
- pitch
- timbre
- speaking pace
- vocal energy
- accent

Voice Identity berada di `VOICE-IDENTITY.md`.

## 18. Source of Truth

Dokumen ini adalah source of truth untuk **visual Character Identity**.

Downstream module boleh membaca dan menggunakan identity ini, tetapi tidak boleh mengubahnya secara diam-diam.

Jika module downstream bertentangan dengan Character Identity:
> **Character Identity wins untuk stable visual identity attributes.**

Generated output tidak pernah menjadi Source of Truth baru.

## 19. Non-Negotiable Rules

1. Character Identity adalah source of truth untuk visual character identity.
2. Identity berbeda dari Character State.
3. Identity berbeda dari Performance.
4. Identity berbeda dari Voice Identity.
5. Permanent attributes harus tetap konsisten.
6. Untuk Rositasari, hijab presence dan full hair coverage adalah permanent identity constraints.
7. Generic descriptors tidak cukup untuk identity continuity.
8. Naturalization tidak boleh mengubah identity.
9. Identity change harus explicit dan traceable.
10. Missing identity data tidak boleh diisi dengan tebakan.
11. Locked identity menjadi downstream constraint.
12. Identity drift harus ditangani dengan targeted regeneration.
13. Reference image tidak otomatis menjadi source of truth baru.
14. Downstream output tidak boleh overwrite upstream Character Identity.
