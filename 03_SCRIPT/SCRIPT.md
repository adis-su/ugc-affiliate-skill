# AFFILIX — Script

`SCRIPT.md` adalah dokumen yang menerjemahkan Content Strategy menjadi urutan komunikasi yang siap diterjemahkan ke Dialogue, Storyboard, dan Timeline.

Script menjawab **apa yang harus dikomunikasikan dan dalam urutan apa**.

Script bukan storyboard dan bukan prompt generation.

## 1. Purpose

Script menerima keputusan dari:
- Product Truth
- Content Strategy
- Format Knowledge
- Platform Context

Script menjadi input untuk:
- Dialogue
- Character Performance
- Storyboard
- Global Timeline
- Clip Mapping
- Audio Design

## 2. Script Record

Gunakan struktur berikut:

### Context
- Project:
- Product:
- Platform:
- Format:
- Objective:
- Core Message:
- Angle:
- Target Audience:

### Narrative
- Opening:
- Context:
- Development:
- Demonstration / Evidence:
- Resolution:
- Takeaway:
- CTA:

Tidak semua bagian harus digunakan. Struktur harus mengikuti kebutuhan content.

## 3. Message Sequence

Setiap beat komunikasi dapat dicatat sebagai:

| Beat | Purpose | Message | Evidence | Visual Implication |
|---|---|---|---|---|
| | | | | |

Message sequence menentukan urutan informasi.

Jika suatu message membutuhkan visual evidence, tandai agar Storyboard dapat menerjemahkannya.

## 4. Script vs Dialogue

Script adalah **communication structure**.

Dialogue adalah **spoken realization**.

Contoh konsep:

- Script: memperkenalkan masalah yang dialami audience.
- Dialogue: kalimat natural yang benar-benar diucapkan karakter.

Script tidak harus ditulis seperti transkrip percakapan.

`DIALOGUE.md` menangani natural spoken delivery.

## 5. Opening

Opening harus mengikuti Hook Strategy dari Content Strategy.

Possible opening functions:
- establish problem
- establish situation
- reveal product
- ask a question
- show an action
- state an observation
- create curiosity

Opening tidak boleh bergantung pada fabricated product claims.

## 6. Product Information

Setiap product-related statement harus dapat ditelusuri ke Product Truth.

Pisahkan:
- Product Fact
- Use Case
- Demonstrated Action
- Audience Interpretation

Jangan mengubah audience interpretation menjadi product fact.

## 7. Demonstration Logic

Jika script membutuhkan demonstration, definisikan:

- Starting State:
- Action:
- Expected Result:
- Evidence:
- Ending State:

Demonstration harus mengikuti:

**STATE → TRANSITION → STATE**

Jika expected result tidak didukung Product Truth, script harus direvisi atau ditandai blocked.

## 8. Character Communication

Jika character digunakan, catat:

- Speaker:
- Point of View:
- Emotional Direction:
- Performance Context:
- Interaction with Product:

Character Identity berada di `04_CHARACTER/CHARACTER-IDENTITY.md`.

Voice Identity berada di `04_CHARACTER/VOICE-IDENTITY.md`.

Script tidak boleh mengubah identity tersebut.

## 9. Information Density

Setiap beat harus memiliki fungsi komunikasi.

Hindari:
- redundant statements
- repeated claims
- unnecessary exposition
- information yang tidak mendukung objective

Short-form content tetap membutuhkan logical progression. Pendek bukan berarti semua kalimat harus ditembakkan seperti printer rusak.

## 10. CTA

CTA berasal dari Content Strategy.

Catat:
- CTA Message:
- Intended Action:
- Supporting Context:

CTA harus konsisten dengan objective.

Jangan menambahkan urgency, discount, guarantee, atau commercial condition tanpa source.

## 11. Claim Handling

Script harus membedakan:
- verified product fact
- source-attributed claim
- demonstrated observation
- subjective statement
- unsupported claim

Unsupported product claims harus diblok.

Subjective wording tidak boleh disajikan sebagai verified product fact.

## 12. Timing Intent

Script dapat mencatat approximate narrative timing:

| Beat | Narrative Duration | Notes |
|---|---:|---|
| | | |

Timing di sini adalah **narrative intent**.

Global Timeline kemudian menetapkan actual timing.

Clip Mapping kemudian menerjemahkan timeline menjadi generation units.

Script tidak boleh mengunci clip duration.

## 13. Visual Implications

Script dapat memberikan visual requirement tanpa menjadi storyboard.

Contoh:
- product must be visible
- character demonstrates opening package
- close view needed for label
- before/after state must be distinguishable

Storyboard menentukan bagaimana requirement tersebut divisualisasikan.

## 14. Audio Implications

Jika relevan, script dapat menandai:
- spoken dialogue required
- voice-over required
- product sound
- ambience
- pause
- emphasis

Detail audio production berada di `12_AUDIO/AUDIO-DESIGN.md`.

## 15. Unknowns and Missing Inputs

Jika script membutuhkan informasi yang belum tersedia:

- Unknown:
- Required Input:
- Affected Beat:
- Impact:

Jangan mengarang missing product information untuk membuat script terlihat lengkap.

## 16. Script Approval

Script dapat memiliki status:
- NOT_STARTED
- IN_PROGRESS
- READY_FOR_DECISION
- APPROVED
- LOCKED
- STALE
- REVISED

Setelah approved, perubahan strategic atau product dependency harus memicu review sesuai dependency rules.

## 17. Revision Rules

Script harus direvisi jika:
- Content Strategy berubah
- Product Truth berubah
- required format changes
- user memberikan explicit wording/content change

Regeneration harus targeted.

Perubahan pada satu beat tidak otomatis berarti seluruh script harus ditulis ulang jika bagian lain tetap valid.

## 18. Boundary with Storyboard

Script menentukan:
- what is communicated
- information order
- dialogue intent
- narrative progression
- required evidence

Storyboard menentukan:
- what is seen
- scene composition
- action
- camera
- environment
- visual state

Script tidak boleh diam-diam mengambil alih fungsi Storyboard.

## 19. Non-Negotiable Rules

1. Script berasal dari Content Strategy.
2. Product facts berasal dari Product Truth.
3. Script berbeda dari Dialogue.
4. Script berbeda dari Storyboard.
5. Demonstration harus mengikuti STATE → TRANSITION → STATE.
6. Unsupported claims harus diblok.
7. Subjective statements tidak boleh disamarkan sebagai facts.
8. Narrative timing berbeda dari clip duration.
9. Approved script menjadi downstream constraint.
10. Revision harus mengikuti dependency rules.
11. Regeneration harus targeted.
12. Missing information tidak boleh diisi dengan tebakan.