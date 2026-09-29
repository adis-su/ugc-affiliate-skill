# AFFILIX

**Sistem Produksi AI UGC**

AFFILIX adalah sistem produksi AI UGC yang mengubah informasi produk menjadi alur kerja produksi yang terstruktur dan dapat ditelusuri, dari **Kebenaran Produk** sampai **Perintah Gambar** dan **Perintah Video**.

AFFILIX bukan sekadar pembuat perintah. Sistem ini memisahkan keputusan kreatif, fakta produk, identitas karakter, state visual, timing, clip, reference, audio, dan output generatif agar hasil produksi tetap konsisten dan dapat direvisi tanpa menghancurkan bagian yang sudah benar.

## Pipeline

```text
PRODUCT → CONTENT STRATEGY → SCRIPT → DIALOGUE → CHARACTER → ENVIRONMENT → STORYBOARD → GLOBAL TIMELINE → CLIP → STATE → PRODUCTION SPEC → PROMPT OUTPUT → NATURALIZATION → AUDIO
```

Setiap tahap memiliki tanggung jawab, dependency, output, dan keputusan yang jelas. AFFILIX tidak menjalankan seluruh alur produksi sekaligus secara default.

## Prinsip Utama

### Sumber Kebenaran Menjadi Acuan Utama
Informasi yang lebih rendah dalam alur produksi tidak boleh menggantikan sumber kebenaran yang lebih tinggi. Hasil generatif tidak otomatis menjadi Sumber Kebenaran.

### Identitas Produk ≠ Keadaan Produk
Identitas Produk mencakup brand, nama, variant, bentuk, warna, packaging, material, logo, dan detail fisik. Keadaan Produk mencakup terbuka/tertutup, sedang dipegang, lokasi, orientasi, visibility, dan interaksi. Identity dipertahankan kecuali ada instruksi eksplisit; State dapat berubah mengikuti cerita.

### Identitas Karakter ≠ Keadaan Karakter
Identitas Karakter menentukan siapa karakter tersebut. Keadaan Karakter menentukan pose, ekspresi, gaze, gesture, body orientation, dan movement. Perubahan state tidak boleh mengubah identity.

### Identitas Suara Terpisah
Identitas Suara mencakup gender, perceived age, pitch, timbre, pace, rhythm, energy, emotion, delivery, breathing, pauses, emphasis, dan natural imperfection.

### Naskah ≠ Dialog
Naskah menentukan pesan dan struktur komunikasi. Dialog menentukan bagaimana pesan tersebut terdengar ketika benar-benar diucapkan manusia.

### AntarfRangka = STATE → PERALIHAN → STATE
Continuity tidak diperlakukan sebagai gambar → gambar → gambar, melainkan KEADAAN AWAL → PERALIHAN → KEADAAN AKHIR.

## Satu Perintah → Satu Tahap → Satu Keputusan → Satu Hasil

AFFILIX bekerja secara bertahap. Satu command menjalankan satu tahap, menghasilkan satu hasil utama, lalu berhenti pada titik keputusan.

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
- `/Affilix next` maju tepat satu tahap.
- `/Affilix approve` menyetujui output current tahap yang siap diputuskan.
- `/Affilix revise` merevisi current tahap.
- `/Affilix regenerate` melakukan targeted regeneration.
- `/Affilix status` menampilkan status tanpa menjalankan produksi.
- `/Affilix input` memasukkan informasi yang dibutuhkan current tahap.
- `/Affilix reset` melakukan reset yang eksplisit dan ter-scope.

Persetujuan tidak otomatis menjalankan tahap lanjutan tahap.

## Siklus Tahap

```text
NOT_STARTED → IN_PROGRESS → READY_FOR_DECISION → APPROVED → LOCKED
```

Jika tahap sebelumnya berubah:

```text
LOCKED → STALE → REVISED → READY_FOR_DECISION → APPROVED → LOCKED
```

Kondisi Eksekusi berada sebagai lapisan terpisah: READY, NEEDS INPUT, BLOCKED, UNKNOWN, UNVERIFIED, SOURCE UNAVAILABLE, DEPENDENCY INVALID, dan STALE.

Tidak ada validation tahap terpisah.

## Kebenaran Produk

Kebenaran Produk adalah sumber fakta produk yang digunakan tahap lanjutan. AFFILIX tidak boleh mengarang spesifikasi, manfaat, material, ukuran, performa, kualitas, pengalaman pengguna, health claims, atau commercial claims.

Jika informasi tidak tersedia atau belum terverifikasi, statusnya harus tetap terlihat. **Kebenaran yang tidak tersedia tidak boleh berubah menjadi invented truth.**

## Referensi dan Kesinambungan

Setiap reference adalah snapshot state yang dapat digunakan untuk menjaga konsistensi antar-clip.

```text
R01 → R02 → R03 → R04
```

Setiap reference memiliki Keadaan Referensi dan Perintah Gambar. Setiap clip memiliki start state, transition, end state, dan Perintah Video.

Aturan continuity:

```text
KEADAAN AKHIR CLIP N = KEADAAN AWAL CLIP N+1
```

Last reference dari sebuah clip menjadi bridge/reference untuk clip berikutnya jika diperlukan.

## Garis Waktu Global vs Klip

**Garis Waktu Global** mengatur timing naratif, durasi scene, dan urutan kejadian.

**Klip** adalah unit produksi/generasi.

Scene storytelling dapat memiliki durasi lebih panjang dan dipecah menjadi beberapa clip pada titik transisi yang logis. Durasi clip mengikuti konfigurasi platform yang relevan, termasuk Google Flow.

## Pewajaran Gerakan

Pewajaran Gerakan membuat gerakan AI terasa lebih manusiawi tanpa mengubah identity atau state yang diwajibkan. Contohnya blinking, eye movement, breathing, micro-expression, weight shifting, finger repositioning, speech rhythm, subtle camera movement, dan autofocus behavior.

Pewajaran Gerakan tidak boleh mengubah character identity, product identity, required state, atau continuity.

## Audio

Audio merupakan lapisan produksi yang berjalan paralel terhadap visual dan dapat mencakup voice identity, dialogue delivery, breathing, pauses, emphasis, room tone, ambience, foley, product sounds, music, dan timing.

Audio tetap mengikuti dependency dan keputusan terkontrol AFFILIX.

## Struktur Repositori

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

`00_KNOWLEDGE/` berisi knowledge reusable untuk category, platform, format, dan safety. Folder lainnya berisi modul produksi, system control, dan keadaan proyek.

## Sistem Ketergantungan

AFFILIX menggunakan produksi berbasis ketergantungan. Ketergantungan dapat berupa ketergantungan keras, lunak, sumber, turunan, atau konfigurasi.

Jika tahap sebelumnya berubah, hanya bagian tahap lanjutan yang terdampak yang perlu menjadi stale atau diregenerasi.

> Buat ulang hanya bagian terkecil yang terdampak.

AFFILIX tidak melakukan full regeneration secara default.

## Penanganan Kegagalan

Kondisi seperti BLOCKED, NEEDS INPUT, UNKNOWN, UNVERIFIED, SOURCE UNAVAILABLE, DEPENDENCY INVALID, dan STALE harus dinyatakan secara eksplisit.

Sistem tidak boleh menyembunyikan kegagalan dependency atau mengatasinya dengan tebakan. Artifact yang tidak terdampak harus tetap dipertahankan.

## Pembuatan Ulang Terarah

Pembuatan Ulang bersifat dependency-aware. Jika hanya Perintah Video Klip 03 yang berubah, AFFILIX tidak perlu membangun ulang seluruh project.

Jika Kebenaran Produk berubah, AFFILIX menelusuri dependency dan menentukan artefak terdampak paling awal. Hasil generatif tetap merupakan tahap lanjutan output dan tidak otomatis menjadi Sumber Kebenaran.

## Catatan Keputusan dan Catatan Perubahan

**Catatan Keputusan** mencatat keputusan user, approval, revision decision, lock decision, dan keputusan penting pada artifact.

**Catatan Perubahan** mencatat perubahan sistem, artifact, dependency, configuration, dan keadaan proyek.

Keduanya menjaga traceability.

## Status Proyek

AFFILIX dikembangkan sebagai sistem modular dengan fokus pada alur kerja produksi, pengelolaan ketergantungan, pengelolaan keadaan, continuity, pembuatan perintah, targeted regeneration, dan ketertelusuran proyek.

Repository ini berisi definisi sistem dan knowledge yang diperlukan untuk menjalankan workflow AFFILIX.

## Prinsip Tidak Dapat Ditawar

1. Sumber Kebenaran wins.
2. Identitas tidak boleh berubah tanpa instruksi eksplisit.
3. Keadaan boleh berubah sesuai kebutuhan cerita.
4. Kebenaran yang tidak tersedia tidak boleh diisi dengan asumsi sebagai fakta.
5. Hasil generatif bukan Sumber Kebenaran.
6. Satu project memiliki satu primary Tahap Saat Ini.
7. `/Affilix next` maju tepat satu tahap.
8. Persetujuan harus eksplisit.
9. Tidak ada silent tahap skip.
10. Tidak ada silent tahap lanjutan execution.
11. Tidak ada silent regeneration.
12. Ketergantungan keras harus terpenuhi.
13. Ketergantungan usang tidak boleh diperlakukan sebagai kebenaran terkini.
14. Klip continuity harus dipertahankan.
15. Pembuatan Ulang harus targeted.
16. Audio adalah lapisan terkontrol.
17. Tidak ada validation tahap terpisah.

## Dokumentasi Utama

Mulai dari `MASTER-SKILL.md`.

Untuk eksekusi sistem:

```text
13_SYSTEM/WORKFLOW.md
13_SYSTEM/DEPENDENCY.md
13_SYSTEM/STATE-MACHINE.md
13_SYSTEM/STAGE-EXECUTION.md
13_SYSTEM/FAILURE-HANDLING.md
13_SYSTEM/REGENERATION.md
```

Untuk keadaan proyek:

```text
14_PROJECT-STATE/PROJECT-STATE.md
14_PROJECT-STATE/CURRENT-STAGE.md
14_PROJECT-STATE/DECISION-LOG.md
14_PROJECT-STATE/CHANGE-LOG.md
```

## Repository

Repository: https://github.com/adis-su/ugc-skill

AFFILIX dirancang sebagai sistem produksi yang dapat ditelusuri, direvisi secara terkontrol, dan dikembangkan tanpa kehilangan hubungan antara fakta, keputusan kreatif, keadaan, dan hasil generatif.
