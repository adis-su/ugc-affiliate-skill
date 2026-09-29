# AFFILIX — Voice Identity

`VOICE-IDENTITY.md` adalah specification untuk identitas suara karakter dalam project AFFILIX.

Voice Identity menjawab **seperti apa suara karakter dan bagaimana suara tersebut terdengar konsisten**, bukan apa yang dikatakan.

Voice Identity adalah layer terpisah dari Character Identity dan harus dapat diterjemahkan ke workflow voice generation seperti Google Flow tanpa mengubah source of truth AFFILIX.

## 1. Purpose

Voice Identity digunakan oleh:
- Dialogue
- Audio Design
- Character Performance
- Video Prompt
- Naturalization
- Google Flow voice configuration / voice performance instructions

Voice Identity harus tetap konsisten sepanjang production kecuali ada explicit revision.

## 2. Rositasari — Master Voice Identity

### Basic
- Voice Name / ID: Rositasari Voice
- Gender Presentation: Female
- Perceived Age: Late 20s to early 30s
- Language: Indonesian
- Accent / Pronunciation Context: Natural Indonesian conversational pronunciation; avoid exaggerated regional accent unless explicitly instructed

### Vocal Characteristics
- Pitch: Medium, slightly warm
- Timbre: Warm, clear, soft, natural
- Resonance: Natural, close, intimate
- Brightness / Warmth: Warm with enough brightness for speech clarity
- Texture: Clean but not overly polished
- Vocal Weight: Light-to-medium

### Baseline Delivery
- Pace: Moderate
- Rhythm: Conversational and varied, never metronomic
- Energy: Medium to medium-high
- Articulation: Clear but relaxed
- Emotional Range: Calm, curious, pleased, surprised, excited, mildly skeptical, concerned
- Conversational Style: Friendly, approachable, spontaneous, intimate

### Core Vocal Direction

Rositasari memiliki suara perempuan dewasa muda dengan karakter hangat, natural, dan approachable. Suaranya berada di register medium dengan timbre lembut namun tetap jelas.

Delivery terasa conversational dan spontaneous, seperti berbicara langsung kepada seseorang yang dikenalnya, bukan membaca iklan. Energinya cukup hidup untuk menarik perhatian tetapi tidak hiperaktif.

Saat antusias, tempo dapat sedikit meningkat dan pitch naik secara alami. Gunakan variasi intonasi, jeda pendek, subtle breathing, dan micro-hesitations untuk mempertahankan kesan manusiawi.

Emphasis digunakan secara selektif pada kata atau frasa penting.

### Avoid
- Announcer voice
- Commercial voice
- Overly polished delivery
- Robotic rhythm
- Excessive enthusiasm
- Perfect sentence timing
- Artificially deep or artificially high pitch
- Forced emotional acting
- Excessive breathiness
- Exaggerated accent

## 3. Voice Identity vs Voice Performance

**Voice Identity** menjawab:

> Who is Rositasari vocally?

**Voice Performance** menjawab:

> How is Rositasari delivering this specific line in this specific scene?

Voice Identity tetap stabil.

Voice Performance dapat berubah berdasarkan:
- scene
- emotion
- action
- dialogue intent
- audience context
- physical activity

Contoh:

| Clip | Voice Identity | Performance |
|---|---|---|
| C01 | Rositasari | Calm, conversational |
| C02 | Rositasari | Curious, slightly excited |
| C03 | Rositasari | Impressed, slightly faster |
| C04 | Rositasari | Reassuring, relaxed |

Performance berubah. Identitas suara tidak.

## 4. Google Flow Translation

Voice Identity AFFILIX adalah **master specification**, bukan sekadar prompt yang harus ditempel mentah-mentah ke setiap generation.

Jika menggunakan Google Flow, terjemahkan Voice Identity menjadi dua layer:

### Layer A — Voice Reference / Custom Voice

Gunakan voice reference atau custom voice untuk menetapkan identitas suara dasar Rositasari jika fitur/model Flow yang digunakan mendukungnya.

Target identitas:

```
Female adult voice.
Perceived age: late 20s to early 30s.
Medium pitch, slightly warm.
Warm, clear, soft, natural timbre.
Clean but not overly polished vocal texture.
Natural Indonesian conversational pronunciation.
Friendly, approachable, intimate vocal character.
```

### Layer B — Voice Performance Instruction

Untuk setiap clip, tambahkan hanya performa yang spesifik terhadap scene.

Template:

```
Use Rositasari's established voice identity.

Voice performance:
[energy]
[emotion]
[pace]
[rhythm]
[intonation]
[emphasis]
[pauses]
[breathing]
[natural imperfections]

Do not change Rositasari's core vocal identity.

Dialogue:
"[dialogue]"
```

Contoh:

```
Use Rositasari's established voice identity.

Voice performance:
Friendly and genuinely curious.
Medium energy.
Moderate conversational pace with a slight increase when expressing excitement.
Natural pitch variation.
Short conversational pauses.
Subtle breathing.
Selective emphasis on key words.
Small natural timing variation.

Do not sound like an announcer or commercial narrator.
Do not change Rositasari's core vocal identity.

Dialogue:
"Eh, ternyata yang ini gampang banget dipakainya."
```

## 5. Google Flow Usage Rule

AFFILIX harus memperlakukan Google Flow sebagai **downstream execution environment**, bukan sebagai source of truth.

Relationship:

```
VOICE IDENTITY
      ↓
Rositasari Master Voice
      ↓
Google Flow Voice Reference / Custom Voice
      ↓
Voice Performance per Clip
      ↓
Dialogue
```

Jika kemampuan voice/reference berbeda antar model atau versi Flow, jangan mengubah Voice Identity untuk menyesuaikan keterbatasan tool.

Sesuaikan **translation layer**, bukan source of truth.

## 6. Voice Performance Structure

Untuk setiap clip, Voice Performance dapat menggunakan:

### Energy
- calm
- moderate
- lively
- energetic

### Emotion
- calm
- curious
- pleased
- surprised
- excited
- concerned
- mildly skeptical

### Pace
- slow
- moderate
- slightly fast
- controlled acceleration

### Rhythm
- conversational
- relaxed
- slightly punchy
- reflective

### Intonation
- neutral
- rising curiosity
- warm emphasis
- surprised lift
- reassuring fall

### Emphasis
Gunakan selective emphasis pada kata atau frasa yang memang penting terhadap dialogue.

### Pauses
Gunakan short natural pauses untuk:
- thought transition
- emphasis
- reaction
- emotional shift

### Breathing
Natural, subtle, dan mengikuti physical activity serta dialogue timing.

### Micro-imperfections
Gunakan secara ringan:
- tiny hesitation
- slight timing variation
- small restart
- uneven emphasis
- subtle breath

Jangan membuat speech terdengar rusak.

## 7. Dialogue Relationship

Voice Identity menentukan **how it sounds**.

Dialogue menentukan **what is said**.

Performance menentukan **how this particular dialogue is delivered**.

Ketiganya tidak boleh dicampur.

## 8. Pronunciation

Untuk Google Flow dan voice generation, pronunciation requirement harus dicatat jika penting untuk:
- character name
- product name
- brand
- technical terminology
- local terms

Jika pronunciation critical tetapi belum diketahui, gunakan `UNKNOWN` dan jangan menebak.

## 9. Voice and Character Relationship

Character Identity:
- face
- body
- permanent visual attributes

Voice Identity:
- pitch
- timbre
- resonance
- vocal texture
- vocal weight
- language identity
- characteristic vocal range

Character State:
- expression
- gaze
- pose
- gesture
- movement

Voice Performance:
- energy
- emotion
- pace
- rhythm
- intonation
- emphasis
- pauses
- breathing

Perubahan Character State tidak otomatis mengubah Voice Identity.

## 10. Audio Design Relationship

Voice Identity memberi baseline karakter suara.

Audio Design mengatur:
- recording context
- room tone
- ambience
- foley
- music
- mix
- loudness relationship

Audio Design tidak boleh mengubah identity suara tanpa explicit instruction.

## 11. Naturalization Compatibility

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

## 12. Voice Continuity

Track voice continuity across:
- clips
- scenes
- references
- dialogue lines
- emotional transitions

Voice harus tetap recognizable meskipun camera, environment, atau emotional state berubah.

Jika Google Flow menggunakan voice reference, gunakan reference yang sama atau equivalent locked voice configuration sepanjang continuity chain, selama kompatibel dengan model yang digunakan.

## 13. Missing Voice Data

Jika voice identity belum cukup:
- mark UNKNOWN
- identify required specification
- avoid inventing highly specific vocal characteristics

Generic descriptors dapat digunakan sementara jika project belum mengunci identity, tetapi tidak boleh dianggap final.

## 14. Voice Identity Status

Status dapat mengikuti:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Setelah LOCKED, Voice Identity menjadi constraint downstream.

## 15. Revision Rules

Voice Identity harus direvisi jika:
- user mengubah voice specification
- character concept berubah secara explicit
- voice generation requirement berubah secara material
- pronunciation requirement berubah

Perubahan dapat membuat Dialogue, Audio Design, Voice Performance, dan Video Prompt menjadi STALE sesuai dependency rules.

Regeneration harus targeted.

## 16. Non-Negotiable Rules

1. Voice Identity adalah source of truth untuk character voice.
2. Rositasari memiliki baseline voice identity yang stabil.
3. Voice Identity berbeda dari Character Identity.
4. Voice Identity berbeda dari Dialogue.
5. Voice Identity berbeda dari Voice Performance.
6. Core vocal characteristics harus konsisten.
7. Emotional variation tidak boleh menghapus voice identity.
8. Natural imperfection harus controlled.
9. Pronunciation harus konsisten untuk important terms.
10. Naturalization tidak boleh mengubah core voice identity.
11. Google Flow adalah downstream execution environment, bukan source of truth.
12. Gunakan voice reference/custom voice bila tersedia dan sesuai model.
13. Gunakan Voice Performance instruction untuk variasi per clip.
14. Jangan menyesuaikan source of truth hanya karena keterbatasan generation tool.
15. Missing voice data tidak boleh diisi dengan tebakan detail.
16. Locked voice identity menjadi downstream constraint.
17. Voice revision harus memicu targeted stale propagation.
