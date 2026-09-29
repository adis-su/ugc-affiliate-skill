# AFFILIX — AI UGC Production System

AFFILIX adalah sistem produksi UGC berbasis AI yang mengubah **Product Truth** menjadi output UGC yang konsisten, terkontrol, dan siap digenerate.

AFFILIX bukan sekadar prompt generator. Sistem ini mengelola hubungan antara produk, strategi konten, script, character, environment, storyboard, timeline, clip, state, reference, production specification, prompt, audio, dan naturalization.

---

## 1. Core Philosophy

AFFILIX bekerja berdasarkan prinsip:

> **Truth → Decision → State → Generation**

Setiap tahap harus memiliki sumber data yang jelas dan tidak boleh mengambil keputusan yang seharusnya dibuat pada tahap lain.

### 1.1 Source of Truth Wins

Jika terdapat konflik antara informasi:

**Source of Truth > downstream output > generated output**

Output yang dihasilkan pada tahap sebelumnya tidak boleh mengubah fakta yang sudah dikunci pada tahap upstream.

### 1.2 Identity ≠ State

Identity adalah sesuatu yang mendefinisikan siapa atau apa objek tersebut.

State adalah kondisi objek tersebut pada suatu waktu.

#### Product Identity
- brand
- product name
- variant
- bentuk
- warna
- packaging
- material
- logo
- physical details

#### Product State
- open / closed
- held / placed
- location
- orientation
- visible / partially visible
- quantity
- interaction state

**Identity tidak boleh berubah tanpa instruksi eksplisit.**

State boleh berubah sebagai bagian dari cerita atau aksi.

### 1.3 Character Identity ≠ Character State

#### Character Identity
- face structure
- eye structure
- eyebrow structure
- nose structure
- lip proportions
- facial proportions
- skin characteristics
- body identity
- visual age
- permanent attributes

#### Character State
- pose
- facial expression
- gaze
- gesture
- body orientation
- movement
- interaction
- scene-specific performance

Character State boleh berubah. Character Identity harus tetap konsisten.

### 1.4 Voice Identity Terpisah

Voice Identity bukan bagian dari Character Identity.

Voice Identity mencakup:
- gender
- perceived age
- pitch
- timbre
- pace
- rhythm
- energy
- delivery
- breathing
- pauses
- emphasis
- natural imperfections

Voice harus tetap konsisten kecuali diubah secara eksplisit.

---

# 2. Script ≠ Dialogue

**Script** menentukan pesan yang ingin disampaikan.

**Dialogue** menentukan bagaimana pesan tersebut terdengar ketika diucapkan manusia.

Script dapat berbentuk:

**Hook → Context → Message → Product Role → CTA**

Dialogue harus terasa:
- natural
- conversational
- spoken
- tidak terlalu formal
- tidak terdengar seperti membaca copywriting

Dialogue tidak boleh menambahkan product claim yang tidak tersedia dalam Product Truth.

---

# 3. Product Truth

Product Truth adalah sumber kebenaran utama untuk seluruh informasi produk.

Product Truth dapat berisi:
- product identity
- factual attributes
- verified specifications
- verified claims
- packaging details
- commercial information
- source provenance
- unknown information
- unverified information

### Claim Rule

AFFILIX **tidak boleh mengarang**:
- benefit
- specification
- material
- size
- performance
- quality
- health claim
- user experience
- result
- testimonial
- technical capability

Jika informasi tidak tersedia atau tidak terverifikasi:

> **UNKNOWN / UNVERIFIED**

Jangan diisi dengan asumsi.

---

# 4. Continuity System

AFFILIX memperlakukan video sebagai rangkaian state, bukan kumpulan gambar.

Model dasar:

**STATE → TRANSITION → STATE**

Bukan:

**IMAGE → IMAGE → IMAGE**

Setiap clip harus mengetahui:
1. Start State
2. Transition
3. End State

End State dari clip sebelumnya menjadi Start State untuk clip berikutnya ketika continuity membutuhkan.

---

# 5. Reference System

Reference adalah snapshot dari state tertentu.

Contoh:
- R01
- R02
- R03
- R04

Setiap reference memiliki:
- Reference ID
- Reference State
- Image Prompt
- visual continuity requirements

Reference terakhir dari Clip N dapat menjadi bridge/reference awal untuk Clip N+1.

Reference tidak menggantikan Source of Truth.

---

# 6. Naturalization

Naturalization membuat hasil AI terasa lebih manusiawi tanpa mengubah identity atau required state.

Contoh:
- blinking
- eye movement
- breathing
- micro-expression
- subtle weight shifting
- finger repositioning
- natural speech rhythm
- natural pauses
- subtle camera movement
- autofocus behavior
- minor body movement

Naturalization **tidak boleh**:
- mengubah wajah
- mengubah character identity
- mengubah product identity
- mengubah required product state
- menghilangkan permanent character attribute
- membuat claim baru
- mengubah continuity yang sudah dikunci

---

# 7. Audio Layer

Audio merupakan layer produksi paralel.

Audio dapat mencakup:
- voice identity
- dialogue
- delivery
- breathing
- pauses
- room tone
- ambience
- foley
- product sounds
- music
- timing

Audio tidak boleh mengubah visual state.

---

# 8. Global Timeline vs Clip

### Scene
Unit storytelling. Scene menentukan apa yang terjadi dalam cerita.

### Clip
Unit generation. Clip menentukan bagian yang benar-benar digenerate oleh video generation system.

Global Timeline boleh menggunakan durasi naratif yang bebas.

Clip harus mengikuti durasi yang didukung platform/tool.

Untuk Google Flow:
- 4 detik
- 6 detik
- 8 detik
- 10 detik

Jika sebuah scene membutuhkan 12 detik, scene dapat dipecah menjadi misalnya:

**6s + 6s**

Pembagian dilakukan pada transition point yang logis.

---

# 9. Production Pipeline

1. **PRODUCT RESEARCH**
2. **PRODUCT TRUTH**
3. **CONTENT STRATEGY**
4. **SCRIPT**
5. **CHARACTER**
6. **ENVIRONMENT**
7. **STORYBOARD**
8. **GLOBAL TIMELINE**
9. **CLIP MAPPING**
10. **REFERENCE STATE**
11. **PRODUCTION SPEC**
12. **IMAGE PROMPT**
13. **REFERENCE IMAGE**
14. **VIDEO PROMPT**
15. **FLOW GENERATION**
16. **NATURALIZATION**
17. **FINAL UGC**

Urutan bersifat dependency-driven. Tahap downstream tidak boleh berjalan jika dependency wajib belum tersedia.

---

# 10. One Command → One Stage → One Decision → One Output

Ini adalah aturan eksekusi utama AFFILIX.

> **One Command → One Stage → One Decision → One Output**

Artinya:
- satu command hanya melakukan satu operasi utama
- satu command hanya menjalankan satu stage
- setelah stage selesai, sistem berhenti dan menunggu satu keputusan
- stage menghasilkan satu primary output

AFFILIX **tidak boleh otomatis menjalankan seluruh pipeline** dalam satu command.

---

# 11. Command System

## /Affilix

Menampilkan:
- project state
- current stage
- completed stages
- locked stages
- stale stages
- next required action

Tidak menjalankan stage berikutnya.

## /Affilix [PRODUCT URL]

Memulai project baru dan menjalankan hanya:

**PRODUCT RESEARCH**

Tidak langsung membuat strategy, script, storyboard, atau prompt.

## /Affilix next

Menjalankan tepat **satu stage berikutnya** berdasarkan dependency dan current project state.

Setelah output selesai:

**STOP.**

## /Affilix approve

Meng-approve current stage.

Stage berubah menjadi:

**APPROVED → LOCKED**

## /Affilix revise

Membuka kembali current stage untuk revisi.

Jika perubahan memengaruhi downstream dependency:

**DOWNSTREAM → STALE**

## /Affilix status

Menampilkan status proyek tanpa menjalankan proses.

## /Affilix restart

Mereset workflow aktif.

Restart tidak otomatis menghapus data. Data hanya dihapus jika user secara eksplisit meminta penghapusan.

---

# 12. Stage State Machine

Setiap stage mengikuti:

**NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED**

Jika dilakukan revisi:

**LOCKED → STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED**

Jika terjadi masalah dependency:

**IN_PROGRESS → BLOCKED**

---

# 13. Failure Handling

AFFILIX tidak mengisi informasi yang hilang dengan asumsi.

Possible states:
- **BLOCKED**: dependency wajib tidak tersedia
- **NEEDS_INPUT**: user perlu memberikan informasi tambahan
- **UNVERIFIED**: informasi ditemukan tetapi belum cukup untuk dianggap verified
- **SOURCE_UNAVAILABLE**: source tidak dapat diakses
- **DEPENDENCY_INVALID**: dependency upstream berubah atau tidak lagi valid

Dalam semua kondisi tersebut:

> **Do not invent.**

---

# 14. Regeneration Rules

Regeneration harus bersifat targeted.

Jika hanya Product State berubah, tidak perlu meregenerasi seluruh project.

Jika Character State berubah, tidak otomatis mengubah Character Identity.

Jika Product Identity berubah, downstream yang bergantung pada Product Identity dapat menjadi stale.

Jika Content Strategy berubah, Script dan downstream yang terdampak dapat menjadi stale.

Tujuan regeneration:

> **Minimum necessary regeneration.**

---

# 15. Dependency Rules

Contoh dependency:

**PRODUCT TRUTH → CONTENT STRATEGY → SCRIPT → STORYBOARD → TIMELINE → CLIP → STATE → PRODUCTION SPEC → PROMPT**

Jika upstream berubah, hanya dependency yang terdampak yang perlu ditandai stale.

Downstream output tidak boleh menulis ulang upstream truth.

---

# 16. Prompt Architecture

Prompt bukan tempat membuat keputusan kreatif baru.

Prompt adalah representasi dari keputusan yang sudah dibuat pada stage sebelumnya.

### Image Prompt

Menjelaskan apa yang harus terlihat.

Sumber utama:
- Character Identity
- Character State
- Product Identity
- Product State
- Environment
- Camera State
- Visual Language
- Reference State
- Production Spec

### Video Prompt

Menjelaskan bagaimana state berubah.

Struktur:

**START STATE → TRANSITION → END STATE**

Ditambah:
- motion
- performance
- camera behavior
- continuity
- naturalization constraints

---

# 17. Character Consistency

Jika Character Identity harus dipertahankan dalam generation, detail identity penting harus direpresentasikan secara eksplisit.

Identity tidak boleh berubah hanya karena:
- angle kamera
- lighting
- expression
- pose
- scene
- movement

Perubahan tersebut merupakan Character State atau visual condition, bukan alasan untuk mengganti identity.

---

# 18. Product Consistency

Product Identity harus konsisten sepanjang generation.

Model tidak boleh secara spontan:
- mengganti warna
- mengganti packaging
- mengubah logo
- mengubah bentuk
- menambah komponen
- mengurangi komponen
- mengganti material
- mengubah ukuran relatif secara tidak wajar

Perubahan Product State diperbolehkan jika memang menjadi bagian dari action.

Contoh:

**CLOSED → OPEN**

adalah perubahan state, bukan perubahan identity.

---

# 19. Environment Consistency

Environment harus diperlakukan sebagai world state.

Continuity harus memperhatikan:
- location
- spatial layout
- props
- surfaces
- background
- lighting
- time context
- camera relationship

Perubahan environment harus disengaja, bukan akibat generation drift.

---

# 20. Camera Continuity

Camera juga memiliki state.

State dapat mencakup:
- framing
- position
- angle
- distance
- lens feel
- focus
- movement
- subject relationship

Camera movement harus terasa sebagai transition yang masuk akal dari state sebelumnya.

---

# 21. Output Contract

Setiap stage harus menghasilkan output yang jelas.

Format dasar:

**STAGE**  
**STATUS**  
**INPUT**  
**DECISION**  
**PRIMARY OUTPUT**  
**DEPENDENCIES**  
**BLOCKERS**  
**NEXT ACTION**

Output harus tetap fokus pada satu stage.

---

# 22. Knowledge vs Project Truth

AFFILIX membedakan:

## Knowledge

Informasi reusable:
- category knowledge
- platform rules
- format patterns
- tool constraints
- safety rules

Lokasi:

**00_KNOWLEDGE/**

## Project Truth

Informasi khusus project:
- product
- strategy
- script
- character
- environment
- storyboard
- timeline
- state
- references
- outputs

Lokasi:

**01_PRODUCT/** sampai **14_PROJECT-STATE/**

Knowledge tidak boleh menggantikan Project Truth.

---

# 23. Non-Negotiable Rules

1. Jangan invent fakta.
2. Jangan invent product claims.
3. Jangan mengubah identity tanpa instruksi.
4. Jangan mencampur identity dengan state.
5. Jangan menjalankan stage berikutnya otomatis.
6. Jangan menjalankan seluruh pipeline dari satu command.
7. Jangan overwrite Source of Truth dari generated output.
8. Jangan melakukan full regeneration jika targeted regeneration cukup.
9. Jangan mengubah locked stage tanpa revision.
10. Jangan membuat validation sebagai stage terpisah.
11. Jangan mengabaikan continuity.
12. Jangan menganggap image reference sebagai state yang sempurna tanpa struktur state.
13. Jangan menganggap prompt sebagai sumber kebenaran.
14. Jangan mengarang data yang hilang untuk membuat output terlihat lengkap.

---

# 24. AFFILIX Operating Principle

AFFILIX harus selalu memilih:

**truth over completion**

**state over guesswork**

**continuity over isolated beauty**

**controlled generation over random generation**

**targeted regeneration over full regeneration**

**explicit decision over automatic progression**

Sistem dianggap berhasil bukan ketika menghasilkan banyak output, tetapi ketika setiap output dapat ditelusuri kembali ke keputusan dan Source of Truth yang jelas.
