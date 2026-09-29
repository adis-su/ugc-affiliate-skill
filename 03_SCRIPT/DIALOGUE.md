# AFFILIX — Dialogue

`DIALOGUE.md` menerjemahkan Script menjadi spoken language yang terdengar natural ketika diucapkan oleh character.

Dialogue menjawab **apa yang benar-benar diucapkan**, bukan sekadar apa yang ingin dikomunikasikan.

## 1. Purpose

Dialogue menerima:
- Script
- Content Strategy
- Product Truth
- Character Identity
- Voice Identity
- Performance direction

Dialogue menjadi input untuk:
- Storyboard
- Audio Design
- Character Performance
- Global Timeline
- Video Prompt

## 2. Dialogue Record

Gunakan struktur berikut:

### Context
- Speaker:
- Beat:
- Purpose:
- Emotional Direction:
- Delivery:

### Spoken Line
- Dialogue:

### Delivery Notes
- Pace:
- Rhythm:
- Energy:
- Emphasis:
- Pause:
- Breathing:
- Imperfection:

## 3. Script vs Dialogue

Script = communication structure.

Dialogue = natural spoken realization.

Script dapat mengatakan:

> memperkenalkan masalah dan menghubungkannya dengan product use case

Dialogue harus menghasilkan kalimat yang benar-benar dapat diucapkan manusia secara natural.

Dialogue tidak boleh menambahkan product facts yang tidak ada di Script atau Product Truth.

## 4. Natural Spoken Language

Dialogue sebaiknya mempertimbangkan:
- conversational phrasing
- natural sentence length
- contractions jika sesuai karakter/bahasa
- pauses
- emphasis
- incomplete phrases jika natural
- repetition yang wajar
- self-correction ringan
- breathing

Natural tidak berarti memasukkan filler secara acak.

Setiap imperfection harus mendukung believable delivery.

## 5. Voice Identity

Dialogue harus konsisten dengan Voice Identity.

Voice Identity dapat mencakup:
- gender
- perceived age
- pitch
- timbre
- pace
- rhythm
- energy
- emotional quality
- delivery style
- breathing
- pause behavior
- emphasis
- natural imperfection

Dialogue tidak boleh mengubah Voice Identity.

## 6. Character Context

Character Identity dan Character State harus dipisahkan.

Dialogue dapat dipengaruhi oleh:
- character personality
- emotional state
- situation
- relationship with product
- physical activity

Namun physical identity tetap mengikuti Character Identity.

## 7. Claim Safety

Product-related dialogue harus tunduk pada Product Truth.

Jangan mengarang:
- benefits
- specifications
- material
- size
- performance
- durability
- compatibility
- safety claims
- medical claims
- guaranteed outcomes

Jika dialogue menggunakan subjective language seperti:
- aku suka
- menurutku
- rasanya
- buat aku

pastikan subjective framing tidak berubah menjadi objective product fact.

## 8. Product Demonstration Dialogue

Jika character melakukan demonstration, dialogue harus mengikuti action.

Contoh structure:

1. verbal context
2. physical action
3. observation
4. explanation
5. conclusion

Jangan membuat character mengatakan hasil sebelum action yang relevan terjadi jika sequence tersebut membutuhkan evidence.

## 9. Timing

Dialogue dapat diberi timing intent:

| Beat | Dialogue | Approx. Timing | Notes |
|---|---|---:|---|
| | | | |

Timing di sini adalah narrative intent.

Global Timeline menentukan actual narrative timing.

Clip Mapping menentukan generation unit.

Dialogue tidak mengunci clip duration.

## 10. Pauses and Breathing

Gunakan pause untuk:
- natural sentence separation
- thought transition
- emphasis
- reaction
- emotional shift

Breathing dapat digunakan untuk membuat delivery lebih believable.

Jangan menambahkan breathing atau pause sampai mengganggu clarity.

## 11. Emphasis

Catat kata atau phrase yang membutuhkan emphasis:

- Emphasis:
- Reason:

Emphasis harus mengikuti communication objective.

Jangan memberi emphasis pada unsupported product claim hanya agar terdengar lebih meyakinkan.

## 12. Language and Localization

Dialogue harus mempertimbangkan:
- project language
- audience language
- local conversational style
- pronunciation
- terminology
- product naming

Product name atau technical term harus dipertahankan jika diperlukan untuk identity atau clarity.

Jangan menerjemahkan product name menjadi istilah yang mengubah identity.

## 13. Audio Relationship

Dialogue adalah content layer.

Audio Design mengatur:
- voice performance
- room tone
- ambience
- foley
- product sound
- music
- mix relationship

Dialogue harus dapat dipetakan ke Audio Design tanpa mengubah message.

## 14. Visual Relationship

Dialogue dapat memerlukan visual support.

Contoh:
- character points to product
- character opens package while speaking
- product close-up follows spoken statement
- reaction follows demonstrated action

Storyboard menentukan visual execution.

Dialogue tidak boleh memaksa visual state yang tidak didukung Storyboard atau Product Truth.

## 15. Naturalization Compatibility

Naturalization dapat menambahkan:
- micro-pauses
- subtle breathing
- eye movement
- facial micro-expression
- small gesture changes
- realistic speech rhythm

Naturalization tidak boleh:
- mengubah wording
- mengubah product claim
- mengubah character identity
- mengubah product identity
- mengubah required state

## 16. Unknowns

Jika dialogue membutuhkan information yang belum tersedia:

- Unknown:
- Affected Line:
- Required Source:
- Impact:

Jangan mengisi missing product information dengan improvisasi.

## 17. Dialogue Approval

Status dapat mengikuti:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Approved dialogue menjadi downstream constraint untuk visual timing dan audio execution.

## 18. Revision Rules

Dialogue harus direvisi jika:
- Script berubah
- Product Truth berubah
- Voice Identity berubah
- Character context berubah
- user memberikan explicit wording change

Regeneration harus targeted.

Perubahan satu line tidak otomatis memerlukan regeneration seluruh dialogue.

## 19. Boundary with Script

Script menentukan:
- message
- information order
- narrative intent

Dialogue menentukan:
- exact spoken wording
- natural phrasing
- delivery cues
- pauses
- emphasis

Dialogue tidak boleh mengubah strategic message tanpa explicit decision.

## 20. Non-Negotiable Rules

1. Dialogue berasal dari Script.
2. Product facts berasal dari Product Truth.
3. Dialogue harus terdengar speakable.
4. Voice Identity harus konsisten.
5. Subjective language tidak boleh berubah menjadi factual claim.
6. Demonstration dialogue harus sinkron dengan action.
7. Dialogue tidak mengunci clip duration.
8. Naturalization tidak boleh mengubah wording atau identity.
9. Missing information tidak boleh diimprovisasi.
10. Approved dialogue menjadi downstream constraint.
11. Revision harus mengikuti dependency rules.
12. Regeneration harus targeted.