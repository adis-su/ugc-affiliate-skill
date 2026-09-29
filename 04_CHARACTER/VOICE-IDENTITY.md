# AFFILIX — Voice Identity

`VOICE-IDENTITY.md` adalah specification untuk identitas suara karakter dalam project AFFILIX.

Voice Identity menjawab **seperti apa suara karakter dan bagaimana suara tersebut terdengar konsisten**, bukan apa yang dikatakan.

Voice Identity adalah layer terpisah dari Character Identity.

## 1. Purpose

Voice Identity digunakan oleh:
- Dialogue
- Audio Design
- Character Performance
- Video Prompt
- Naturalization

Voice Identity harus tetap konsisten sepanjang production kecuali ada explicit revision.

## 2. Voice Identity vs Dialogue

Voice Identity menentukan **how the character sounds**.

Dialogue menentukan **what the character says**.

Voice Identity tidak boleh berubah hanya karena wording dialogue berubah.

## 3. Voice Record

Gunakan struktur berikut:

### Basic
- Voice Name / ID:
- Gender Presentation:
- Perceived Age:
- Language:
- Accent / Pronunciation Context:

### Vocal Characteristics
- Pitch:
- Timbre:
- Resonance:
- Brightness / Warmth:
- Texture:
- Vocal Weight:

### Delivery
- Pace:
- Rhythm:
- Energy:
- Articulation:
- Emotional Range:
- Conversational Style:

### Natural Behavior
- Breathing:
- Pauses:
- Hesitation:
- Emphasis:
- Self-Correction:
- Sentence Endings:
- Filler Behavior:

## 4. Perceived Age

Perceived vocal age harus konsisten dengan project character context.

Perceived age adalah vocal perception, bukan perubahan Character Identity.

Voice generation tidak boleh secara tidak sengaja membuat karakter terdengar jauh lebih muda atau lebih tua tanpa instruction.

## 5. Pitch

Catat pitch sebagai qualitative description atau project-specific range jika memang tersedia.

Contoh:
- medium
- medium-high
- low-medium

Jangan menggunakan angka teknis yang tidak memiliki basis.

Pitch harus tetap stabil secara identity, sementara natural variation diperbolehkan selama delivery.

## 6. Timbre

Timbre menjelaskan karakter suara.

Possible descriptors:
- warm
- clear
- soft
- slightly husky
- bright
- mellow
- textured

Gunakan kombinasi descriptor yang cukup spesifik untuk menjaga consistency.

## 7. Pace and Rhythm

Pace dapat dipengaruhi oleh:
- emotion
- sentence complexity
- action
- emphasis
- audience context

Voice Identity menetapkan baseline.

Scene-specific performance dapat mengubah pace secara terkontrol tanpa mengganti identity.

## 8. Energy

Energy dapat berada pada spectrum:
- calm
- moderate
- lively
- energetic

Energy adalah delivery characteristic, bukan emotional state permanen.

Character Performance menentukan perubahan energy per scene.

## 9. Emotional Range

Catat emotional range yang masuk akal untuk karakter:
- calm
- curious
- pleased
- surprised
- concerned
- excited

Emotional variation tidak berarti voice identity berubah.

Voice should remain recognizable across emotional states.

## 10. Breathing

Natural breathing dapat membantu believable speech.

Catat:
- breathing intensity
- breathing frequency
- audible vs subtle
- breath placement

Breathing harus mengikuti physical activity dan dialogue timing.

Breathing tidak boleh mengganggu speech clarity.

## 11. Pauses

Pause dapat digunakan untuk:
- thought transition
- emphasis
- reaction
- emotional shift
- natural speech rhythm

Pause pattern harus terasa consistent dengan character.

Jangan menambahkan pause secara mekanis di setiap sentence.

## 12. Natural Imperfection

Natural voice dapat memiliki:
- slight hesitation
- small restart
- uneven emphasis
- tiny timing variation
- subtle breath

Natural imperfection harus controlled.

Tujuannya adalah believable human delivery, bukan membuat speech terdengar rusak.

## 13. Pronunciation

Catat pronunciation requirement untuk:
- character name
- product name
- brand
- technical terminology
- local terms

Product name dan brand pronunciation harus konsisten jika penting untuk identity atau clarity.

Jika pronunciation tidak diketahui, jangan menebak untuk istilah yang critical.

## 14. Voice and Character Relationship

Voice Identity dan Character Identity saling terkait tetapi tidak sama.

Character Identity:
- face
- body
- permanent visual attributes

Voice Identity:
- pitch
- timbre
- pace
- rhythm
- vocal energy
- delivery

Perubahan visual character tidak otomatis mengubah voice identity.

## 15. Audio Design Relationship

Voice Identity memberi baseline.

Audio Design mengatur:
- recording context
- room tone
- ambience
- foley
- music
- mix
- loudness relationship

Audio Design tidak boleh mengubah identity suara tanpa explicit instruction.

## 16. Naturalization Compatibility

Naturalization dapat memperhalus:
- breath timing
- pause timing
- micro variation
- articulation timing
- emphasis variation

Naturalization tidak boleh mengubah:
- core timbre
- perceived vocal identity
- characteristic pitch range
- language identity
- pronunciation identity

## 17. Voice Continuity

Track voice continuity across:
- clips
- scenes
- references
- dialogue lines
- emotional transitions

Voice harus tetap recognizable meskipun camera, environment, atau emotional state berubah.

## 18. Missing Voice Data

Jika voice identity belum cukup:
- mark UNKNOWN
- identify required specification
- avoid inventing highly specific vocal characteristics

Generic voice descriptors dapat digunakan sementara jika project belum mengunci identity, tetapi tidak boleh dianggap final.

## 19. Voice Identity Status

Status dapat mengikuti:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Setelah LOCKED, Voice Identity menjadi constraint downstream.

## 20. Revision Rules

Voice Identity harus direvisi jika:
- user mengubah voice specification
- character concept berubah secara explicit
- voice generation requirement berubah
- pronunciation requirement berubah

Perubahan dapat membuat Dialogue, Audio Design, dan Video Prompt menjadi STALE sesuai dependency rules.

Regeneration harus targeted.

## 21. Non-Negotiable Rules

1. Voice Identity adalah source of truth untuk character voice.
2. Voice Identity berbeda dari Character Identity.
3. Voice Identity berbeda dari Dialogue.
4. Voice Identity berbeda dari Performance.
5. Core vocal characteristics harus konsisten.
6. Emotional variation tidak boleh menghapus voice identity.
7. Natural imperfection harus controlled.
8. Pronunciation harus konsisten untuk important terms.
9. Naturalization tidak boleh mengubah core voice identity.
10. Missing voice data tidak boleh diisi dengan tebakan detail.
11. Locked voice identity menjadi downstream constraint.
12. Voice revision harus memicu targeted stale propagation.