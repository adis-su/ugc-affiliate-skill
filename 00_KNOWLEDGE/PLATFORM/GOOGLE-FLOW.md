# AFFILIX — Google Flow Platform Configuration

Dokumen ini menyimpan aturan dan konfigurasi yang spesifik untuk Google Flow.

Platform configuration tidak boleh mengubah core logic AFFILIX. Jika aturan platform berubah, update dokumen ini tanpa mengubah prinsip dasar pipeline.

## 1. Role

Google Flow diperlakukan sebagai **generation platform** pada downstream pipeline AFFILIX.

Flow menerima output yang sudah ditentukan oleh stage sebelumnya, terutama:
- Clip
- Start/Reference State
- Production Spec
- Image Prompt
- Video Prompt

Flow bukan sumber Product Truth, Character Identity, atau Content Strategy.

## 2. Scene vs Clip

### Scene
Scene adalah unit storytelling.

Scene dapat memiliki durasi naratif yang ditentukan oleh kebutuhan cerita.

### Clip
Clip adalah unit generation.

Clip harus menggunakan durasi yang didukung oleh konfigurasi platform.

Jangan memaksa durasi scene menjadi satu clip jika durasinya tidak sesuai dengan batas platform.

Contoh:

```text
Scene: 12s
Clip 01: 6s
Clip 02: 6s
```

Pembagian harus dilakukan pada transition point yang logis.

## 3. Supported Clip Durations

Konfigurasi AFFILIX saat ini:

- 4 detik
- 6 detik
- 8 detik
- 10 detik

Nilai ini adalah **platform configuration**, bukan creative rule.

Jika kemampuan platform berubah, update dokumen ini dan dependency terkait. Jangan mengubah Global Timeline hanya karena platform memiliki batas generation tertentu.

## 4. Generation Unit

Setiap clip harus memiliki:

1. Clip ID
2. Duration
3. Start State / Reference
4. Video Prompt
5. End State
6. Continuity requirements

Model konseptual:

**START STATE → TRANSITION → END STATE**

## 5. Reference Continuity

Jika sebuah clip membutuhkan reference image, reference harus merepresentasikan state yang relevan dengan awal clip.

Reference bukan sekadar gambar cantik. Reference adalah representasi visual dari state yang harus dipertahankan.

End State Clip N dapat digunakan sebagai bridge/reference untuk Clip N+1.

## 6. Prompt Separation

Image Prompt menjelaskan **WHAT MUST BE VISIBLE**.

Video Prompt menjelaskan **HOW THE STATE CHANGES**.

Jangan menggunakan Video Prompt untuk membuat keputusan upstream seperti:
- mengganti character identity
- mengganti product identity
- membuat product claim
- mengubah content strategy
- membuat scene baru yang tidak ada di storyboard

## 7. Continuity Requirements

Generation harus menjaga continuity terhadap hal-hal yang sudah dikunci:

- character identity
- character state yang diperlukan
- outfit
- hijab jika merupakan permanent identity attribute
- product identity
- product state
- environment
- spatial relationship
- lighting
- camera relationship
- voice/dialogue requirements

Generation drift tidak boleh dianggap sebagai creative decision.

## 8. Naturalization

Naturalization boleh digunakan untuk membuat motion lebih natural.

Contoh:
- blinking
- breathing
- subtle eye movement
- micro-expression
- natural hand movement
- subtle weight shift
- realistic camera movement
- autofocus behavior

Naturalization tidak boleh mengubah required state atau identity.

## 9. Platform Constraint vs Creative Decision

Pisahkan:

**Creative Decision**
- scene duration
- story beat
- action
- dialogue
- transition
- visual intent

**Platform Constraint**
- supported clip duration
- generation limitations
- input/output requirements
- tool-specific controls

Platform constraint tidak boleh mengambil alih creative decision. Jika perlu, creative timeline dipecah menjadi beberapa generation clip.

## 10. Change Management

Jika Google Flow mengubah supported duration atau generation behavior:

1. update dokumen platform ini
2. identifikasi dependency yang terdampak
3. tandai downstream stage sebagai STALE jika memang diperlukan
4. jangan mengubah upstream Source of Truth tanpa alasan
5. lakukan targeted regeneration

## 11. Non-Negotiable Rules

1. Scene dan Clip bukan hal yang sama.
2. Global Timeline boleh menggunakan durasi naratif bebas.
3. Clip mengikuti durasi yang didukung platform.
4. Clip harus memiliki Start State dan End State.
5. Reference harus merepresentasikan state, bukan sekadar estetika.
6. Platform constraint tidak boleh menjadi sumber Product Truth.
7. Video Prompt tidak boleh membuat keputusan upstream.
8. Naturalization tidak boleh mengubah identity.
9. Perubahan platform harus diperlakukan sebagai configuration change.
10. Jangan mengarang kemampuan platform yang belum diverifikasi.