# AFFILIX

**AI UGC Production System**

AFFILIX adalah sistem produksi AI UGC yang mengubah informasi produk menjadi workflow produksi yang terstruktur dan dapat ditelusuri, dari **Product Truth** sampai **Image Prompt** dan **Video Prompt**.

AFFILIX bukan sekadar prompt generator. Sistem ini memisahkan keputusan kreatif, fakta produk, identitas karakter, state visual, timing, clip, reference, audio, dan output generatif agar hasil produksi tetap konsisten dan dapat direvisi tanpa menghancurkan bagian yang sudah benar.

## Pipeline

```text
PRODUCT → CONTENT STRATEGY → SCRIPT → DIALOGUE → CHARACTER → ENVIRONMENT → STORYBOARD → GLOBAL TIMELINE → CLIP → STATE → PRODUCTION SPEC → PROMPT OUTPUT → NATURALIZATION → AUDIO
```

Setiap tahap memiliki tanggung jawab, dependency, output, dan keputusan yang jelas. AFFILIX tidak menjalankan seluruh pipeline sekaligus secara default.

## Prinsip Utama

### Source of Truth Wins
Informasi yang lebih rendah dalam pipeline tidak boleh menggantikan sumber kebenaran yang lebih tinggi. Generated output tidak otomatis menjadi Source of Truth.

### Product Identity ≠ Product State
Product Identity mencakup brand, nama, variant, bentuk, warna, packaging, material, logo, dan detail fisik. Product State mencakup terbuka/tertutup, sedang dipegang, lokasi, orientasi, visibility, dan interaksi. Identity dipertahankan kecuali ada instruksi eksplisit; State dapat berubah mengikuti cerita.

### Character Identity ≠ Character State
Character Identity menentukan siapa karakter tersebut. Character State menentukan pose, ekspresi, gaze, gesture, body orientation, dan movement. Perubahan state tidak boleh mengubah identity.

### Voice Identity Terpisah
Voice Identity mencakup gender, perceived age, pitch, timbre, pace, rhythm, energy, emotion, delivery, breathing, pauses, emphasis, dan natural imperfection.

### Script ≠ Dialogue
Script menentukan pesan dan struktur komunikasi. Dialogue menentukan bagaimana pesan tersebut terdengar ketika benar-benar diucapkan manusia.

### Frame-to-Frame = STATE → TRANSITION → STATE
Continuity tidak diperlakukan sebagai image → image → image, melainkan START STATE → TRANSITION → END STATE.

## One Command → One Stage → One Decision → One Output

AFFILIX bekerja secara bertahap. Satu command menjalankan satu stage, menghasilkan satu primary output, lalu berhenti pada decision point.

```text
/Affilix
/Affilix next
/Affilix approve
/Affilix revise
/Affilix regenerate
/Affilix status
/Affilix input
/Affilix reset
```

- `/Affilix` menginspeksi kondisi project saat ini.
- `/Affilix next` maju tepat satu stage.
- `/Affilix approve` menyetujui output current stage yang siap diputuskan.
- `/Affilix revise` merevisi current stage.
- `/Affilix regenerate` melakukan targeted regeneration.
- `/Affilix status` menampilkan status tanpa menjalankan produksi.
- `/Affilix input` memasukkan informasi yang dibutuhkan current stage.
- `/Affilix reset` melakukan reset yang eksplisit dan ter-scope.

Approval tidak otomatis menjalankan downstream stage.

## Stage Lifecycle

```text
NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED
```

Jika upstream berubah:

```text
LOCKED → STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED
```

Execution condition berada sebagai lapisan terpisah: READY, NEEDS INPUT, BLOCKED, UNKNOWN, UNVERIFIED, SOURCE UNAVAILABLE, DEPENDENCY INVALID, dan STALE.

Tidak ada validation stage terpisah.

## Product Truth

Product Truth adalah sumber fakta produk yang digunakan downstream. AFFILIX tidak boleh mengarang spesifikasi, manfaat, material, ukuran, performa, kualitas, pengalaman pengguna, health claims, atau commercial claims.

Jika informasi tidak tersedia atau belum terverifikasi, statusnya harus tetap terlihat. **Missing truth tidak boleh berubah menjadi invented truth.**

## Reference dan Continuity

Setiap reference adalah snapshot state yang dapat digunakan untuk menjaga konsistensi antar-clip.

```text
R01 → R02 → R03 → R04
```

Setiap reference memiliki Reference State dan Image Prompt. Setiap clip memiliki start state, transition, end state, dan Video Prompt.

Aturan continuity:

```text
END STATE CLIP N = START STATE CLIP N+1
```

Last reference dari sebuah clip menjadi bridge/reference untuk clip berikutnya jika diperlukan.

## Global Timeline vs Clip

**Global Timeline** mengatur timing naratif, durasi scene, dan urutan kejadian.

**Clip** adalah unit produksi/generasi.

Scene storytelling dapat memiliki durasi lebih panjang dan dipecah menjadi beberapa clip pada titik transisi yang logis. Durasi clip mengikuti konfigurasi platform yang relevan, termasuk Google Flow.

## Naturalization

Naturalization membuat gerakan AI terasa lebih manusiawi tanpa mengubah identity atau state yang diwajibkan. Contohnya blinking, eye movement, breathing, micro-expression, weight shifting, finger repositioning, speech rhythm, subtle camera movement, dan autofocus behavior.

Naturalization tidak boleh mengubah character identity, product identity, required state, atau continuity.

## Audio

Audio merupakan layer produksi yang berjalan paralel terhadap visual dan dapat mencakup voice identity, dialogue delivery, breathing, pauses, emphasis, room tone, ambience, foley, product sounds, music, dan timing.

Audio tetap mengikuti dependency dan keputusan terkontrol AFFILIX.

## Repository Structure

```text
AFFILIX/
├── MASTER-SKILL.md
├── 00_KNOWLEDGE/
├── 01_PRODUCT/
├── 02_CONTENT-STRATEGY/
├── 03_SCRIPT/
├── 04_CHARACTER/
├── 05_ENVIRONMENT/
├── 06_STORYBOARD/
├── 07_GLOBAL-TIMELINE/
├── 08_CLIP/
├── 09_STATE/
├── 10_PRODUCTION-SPEC/
├── 11_OUTPUT/
├── 12_AUDIO/
├── 13_SYSTEM/
└── 14_PROJECT-STATE/
```

`00_KNOWLEDGE/` berisi knowledge reusable untuk category, platform, format, dan safety. Folder lainnya berisi modul produksi, system control, dan project state.

## Dependency System

AFFILIX menggunakan dependency-aware production. Dependency dapat berupa hard, soft, source, derived, atau configuration dependency.

Jika upstream berubah, hanya bagian downstream yang terdampak yang perlu menjadi stale atau diregenerasi.

> Regenerate the smallest affected scope.

AFFILIX tidak melakukan full regeneration secara default.

## Failure Handling

Kondisi seperti BLOCKED, NEEDS INPUT, UNKNOWN, UNVERIFIED, SOURCE UNAVAILABLE, DEPENDENCY INVALID, dan STALE harus dinyatakan secara eksplisit.

Sistem tidak boleh menyembunyikan kegagalan dependency atau mengatasinya dengan tebakan. Artifact yang tidak terdampak harus tetap dipertahankan.

## Targeted Regeneration

Regeneration bersifat dependency-aware. Jika hanya Video Prompt Clip 03 yang berubah, AFFILIX tidak perlu membangun ulang seluruh project.

Jika Product Truth berubah, AFFILIX menelusuri dependency dan menentukan earliest affected artifact. Generated output tetap merupakan downstream output dan tidak otomatis menjadi Source of Truth.

## Decision Log dan Change Log

**Decision Log** mencatat keputusan user, approval, revision decision, lock decision, dan keputusan penting pada artifact.

**Change Log** mencatat perubahan sistem, artifact, dependency, configuration, dan project state.

Keduanya menjaga traceability.

## Status Proyek

AFFILIX dikembangkan sebagai sistem modular dengan fokus pada production workflow, dependency management, state management, continuity, prompt generation, targeted regeneration, dan project traceability.

Repository ini berisi definisi sistem dan knowledge yang diperlukan untuk menjalankan workflow AFFILIX.

## Prinsip Non-Negotiable

1. Source of Truth wins.
2. Identity tidak boleh berubah tanpa instruksi eksplisit.
3. State boleh berubah sesuai kebutuhan cerita.
4. Missing truth tidak boleh diisi dengan asumsi sebagai fakta.
5. Generated output bukan Source of Truth.
6. Satu project memiliki satu primary Current Stage.
7. `/Affilix next` maju tepat satu stage.
8. Approval harus eksplisit.
9. Tidak ada silent stage skip.
10. Tidak ada silent downstream execution.
11. Tidak ada silent regeneration.
12. Hard dependency harus terpenuhi.
13. Stale dependency tidak boleh diperlakukan sebagai current truth.
14. Clip continuity harus dipertahankan.
15. Regeneration harus targeted.
16. Audio adalah layer terkontrol.
17. Tidak ada validation stage terpisah.

## Dokumentasi Utama

Mulai dari `MASTER-SKILL.md`.

Untuk system execution:

```text
13_SYSTEM/WORKFLOW.md
13_SYSTEM/DEPENDENCY.md
13_SYSTEM/STATE-MACHINE.md
13_SYSTEM/STAGE-EXECUTION.md
13_SYSTEM/FAILURE-HANDLING.md
13_SYSTEM/REGENERATION.md
```

Untuk project state:

```text
14_PROJECT-STATE/PROJECT-STATE.md
14_PROJECT-STATE/CURRENT-STAGE.md
14_PROJECT-STATE/DECISION-LOG.md
14_PROJECT-STATE/CHANGE-LOG.md
```

## Repository

Repository: https://github.com/adis-su/ugc-skill

AFFILIX dirancang sebagai sistem produksi yang dapat ditelusuri, direvisi secara terkontrol, dan dikembangkan tanpa kehilangan hubungan antara fakta, keputusan kreatif, state, dan output generatif.
