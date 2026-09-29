# AFFILIX — Content Strategy

`CONTENT-STRATEGY.md` adalah keputusan komunikasi tingkat project yang menerjemahkan Product Truth dan project context menjadi arah content.

Dokumen ini menentukan **apa yang ingin dikomunikasikan, kepada siapa, melalui konteks apa, dan dengan pendekatan seperti apa**.

Content Strategy bukan script, storyboard, atau prompt.

## 1. Purpose

Content Strategy menjadi upstream decision untuk:
- Script
- Dialogue
- Character Performance
- Environment
- Storyboard
- Global Timeline
- Clip Mapping
- Production Spec
- Output Prompts

Downstream stage tidak boleh mengubah strategic decision secara diam-diam.

## 2. Strategy Record

Gunakan struktur berikut:

### Project Context
- Product:
- Category:
- Platform:
- Format:
- Campaign / Context:
- Content Type:

### Audience
- Primary Audience:
- Audience Context:
- Relevant Need:
- Relevant Problem:
- Awareness Level:

### Objective
- Primary Objective:
- Secondary Objective:
- Desired Audience Action:

Objective harus dapat dibedakan dari CTA.

Objective = hasil komunikasi yang diinginkan.
CTA = action yang diminta dari audience.

## 3. Core Message

- Core Message:
- Supporting Message:
- Product Role:
- Key Takeaway:

Core Message harus dapat ditelusuri ke Product Truth.

Jangan menjadikan unsupported benefit sebagai core message.

## 4. Angle

Angle menjelaskan **cara content membingkai message**.

Possible angles:
- problem-solution
- demonstration
- education
- discovery
- personal context
- comparison
- routine
- storytelling
- POV
- unboxing
- review

Angle bukan klaim produk.

Angle harus sesuai dengan evidence yang tersedia.

## 5. Hook

Hook adalah mekanisme opening untuk mendapatkan attention dan menetapkan context.

Possible hook mechanisms:
- problem
- question
- observation
- product action
- visual reveal
- situation
- statement
- curiosity

Hook harus:
- relevant dengan core message
- understandable
- consistent dengan Product Truth
- tidak menggunakan fabricated claims

Hook tidak harus selalu menyebut product name.

## 6. Value Proposition

Catat nilai komunikasi yang ingin diterima audience:

- Audience Value:
- Product Value:
- Evidence:

Pisahkan:
- documented product benefit
- practical use case
- communication benefit

Jangan menyamakan audience value dengan guaranteed product result.

## 7. Story Structure

Tentukan struktur komunikasi:

- Opening:
- Context:
- Development:
- Demonstration / Evidence:
- Resolution:
- Takeaway:
- CTA:

Semua bagian tidak selalu wajib digunakan.

Story structure harus cukup untuk memberi arah kepada Script dan Storyboard tanpa menulis script lengkap.

## 8. Format Selection

Format dipilih berdasarkan strategy, bukan sebaliknya.

Possible format knowledge:
- Problem-Solution
- Unboxing
- Review
- Tutorial
- Demonstration
- Routine
- Storytelling
- POV
- Comparison

Format-specific guidance berada di `00_KNOWLEDGE/FORMAT/`.

Format knowledge memberikan pattern.
Content Strategy membuat keputusan penggunaan pattern tersebut.

## 9. Platform Context

Platform harus dicatat sebagai context:

- Primary Platform:
- Secondary Platform:
- Placement:
- Output Context:
- Platform Constraints:

Platform constraint yang time-sensitive harus berasal dari platform knowledge/configuration.

Platform tidak otomatis menentukan strategic angle.

## 10. Character Strategy

Jika content menggunakan character:

- Character Role:
- Relationship to Product:
- Personality Context:
- Performance Direction:
- Point of View:

Character Identity disimpan di `04_CHARACTER/CHARACTER-IDENTITY.md`.

Content Strategy hanya menentukan **peran dan communication context** karakter.

## 11. Visual Strategy

Tentukan visual communication direction:

- Visual Priority:
- Product Visibility:
- Character Visibility:
- Environment Role:
- Camera Language:
- Visual Tone:
- Pacing:

Visual Strategy memberi arah kepada Storyboard.

Visual Strategy tidak boleh mengubah Product Identity.

## 12. CTA Strategy

CTA harus sesuai dengan objective.

Possible CTA contexts:
- learn more
- check details
- view product
- compare variants
- try the demonstrated workflow
- visit product page
- consider purchase

CTA tidak boleh membuat commercial claim yang tidak supported.

## 13. Claim Strategy

Catat batas claim untuk project:

- Allowed Claims:
- Restricted Claims:
- Unsupported Claims:
- Required Attribution:

Semua product claims tetap tunduk pada `PRODUCT-TRUTH.md` dan `CLAIM-RULES.md`.

Content Strategy tidak boleh memperluas Product Truth.

## 14. Constraints

Catat constraint project:

- Must Include:
- Must Avoid:
- Required Product State:
- Required Character State:
- Required Environment:
- Required CTA:
- Commercial Constraints:
- Safety Constraints:

Constraints menjadi input untuk downstream stages.

## 15. Success Criteria

Success criteria harus menjelaskan apakah communication objective tercapai, bukan memberi skor kreatif pada output.

Possible criteria:
- message clarity
- product clarity
- audience relevance
- demonstration clarity
- CTA clarity
- continuity
- source consistency

Jangan menggunakan success criteria sebagai hidden ranking mechanism.

## 16. Strategy Decisions

Catat keputusan strategis yang telah dibuat:

| Decision | Reason | Source / Input | Status |
|---|---|---|---|
| | | | |

Keputusan yang sudah approved menjadi constraint downstream sampai direvisi.

## 17. Unknowns and Open Decisions

Jika strategic information belum tersedia:

- Unknown:
- Why Needed:
- Impact:
- Decision Required:

Jangan mengisi strategic gap dengan asumsi yang tidak diketahui user.

## 18. Revision Rules

Content Strategy dapat direvisi jika:
- Product Truth berubah
- audience/context berubah
- platform context berubah
- user memberikan explicit strategic change
- objective berubah

Revision dapat membuat downstream stages menjadi STALE sesuai dependency rules.

Regeneration harus targeted, bukan otomatis mengulang seluruh pipeline.

## 19. Boundary with Script

Content Strategy menentukan:
- message
- objective
- angle
- hook direction
- story structure
- CTA

Script menentukan:
- exact communication sequence
- spoken content
- wording
- information order

Content Strategy tidak boleh berubah menjadi script hanya karena stage berikutnya membutuhkan detail.

## 20. Non-Negotiable Rules

1. Content Strategy adalah strategic decision layer.
2. Product Truth adalah source of truth untuk product facts.
3. Strategy tidak boleh invent product claims.
4. Platform context tidak otomatis menentukan creative strategy.
5. Format knowledge memberikan pattern, bukan keputusan otomatis.
6. Objective berbeda dari CTA.
7. Angle berbeda dari claim.
8. Character strategy tidak mengubah Character Identity.
9. Visual strategy tidak mengubah Product Identity.
10. Approved decisions menjadi downstream constraints.
11. Revision harus memicu stale propagation sesuai dependency.
12. Regeneration harus targeted.