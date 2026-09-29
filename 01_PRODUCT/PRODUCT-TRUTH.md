# AFFILIX — Product Truth

`PRODUCT-TRUTH.md` adalah **authoritative source of truth** untuk produk dalam project AFFILIX.

Semua downstream stage yang membuat keputusan tentang produk harus mengikuti dokumen ini. Jika output generation bertentangan dengan Product Truth, Product Truth menang.

## 1. Purpose

Product Truth mengubah collected product information menjadi kumpulan fakta yang aman digunakan untuk:
- Content Strategy
- Script
- Dialogue
- Storyboard
- Product State
- Production Spec
- Image Prompt
- Video Prompt
- Naturalization

Product Truth bukan tempat untuk menulis creative angle atau script.

## 2. Authority Model

Priority:

1. verified primary source
2. verified official product information
3. reliable identified source
4. clearly labeled seller information
5. user-provided information
6. unverified information
7. generation inference

Lower-priority information tidak boleh mengalahkan higher-priority evidence.

Jika dua source bertentangan, conflict harus dicatat dan tidak boleh diam-diam diselesaikan dengan tebakan.

## 3. Product Identity

Product Identity adalah atribut yang menentukan **produk apa yang sedang diproduksi atau ditampilkan**.

Typical identity fields:
- Brand
- Product Name
- Category
- Variant
- Model
- SKU
- Shape
- Color
- Packaging
- Material
- Logo
- Label
- Physical Construction
- Distinctive Physical Details

Identity tidak boleh berubah tanpa explicit instruction dan supporting source.

## 4. Product State

Product State adalah kondisi produk pada titik tertentu dalam scene atau frame.

Typical state fields:
- Open / Closed
- Sealed / Unsealed
- Held / Placed
- Active / Inactive
- Assembled / Disassembled
- Visible / Partially Obscured
- Quantity
- Orientation
- Location
- Interaction State

Product State **dapat berubah** selama storytelling melalui logical transition.

Product State tidak boleh mengubah Product Identity.

## 5. Verified Facts

Gunakan bagian ini untuk fakta yang siap digunakan downstream.

### Basic
- Brand:
- Product Name:
- Category:
- Variant:
- Model:

### Physical
- Color:
- Shape:
- Size:
- Dimensions:
- Weight:
- Material:
- Packaging:
- Quantity:
- Capacity:

### Functional
- Primary Function:
- Supported Use Cases:
- Features:
- Controls:
- Compatibility:
- Included Items:
- Usage Instructions:

### Other
- Relevant Facts:

Setiap fact penting sebaiknya memiliki Source ID.

## 6. Commercial Truth

Commercial information harus dipisahkan karena sifatnya volatile.

- Price:
- Currency:
- Discount:
- Promotion:
- Stock:
- Shipping:
- Bundle:
- Availability:
- Effective At:
- Source ID:

Commercial values tidak boleh dianggap permanent product identity.

Jika commercial source sudah stale, informasi tersebut harus ditandai dan tidak digunakan sebagai current fact.

## 7. Claim Truth

Setiap claim yang boleh digunakan harus dapat ditelusuri.

| Claim | Source ID | Status | Allowed Context |
|---|---|---|---|
| | | | |

Status yang dapat digunakan:
- VERIFIED
- SOURCE-ATTRIBUTED
- SELLER-CLAIM
- USER-PROVIDED
- UNVERIFIED
- BLOCKED

Claim berstatus UNVERIFIED atau BLOCKED tidak boleh dipresentasikan sebagai factual product claim.

## 8. Safety Truth

Catat hanya safety information yang didukung source.

- Warnings:
- Restrictions:
- Required Handling:
- Safety Information:
- Age Restrictions:
- Other Relevant Safety Notes:

Safety information tidak boleh diinferensikan dari visual appearance saja.

## 9. Unknowns

Informasi yang belum diketahui harus dicatat secara eksplisit.

- Unknown:
- Missing Evidence:
- Required Source:
- Downstream Impact:

UNKNOWN adalah valid state.

Jangan mengubah UNKNOWN menjadi assumption hanya agar stage dapat dilanjutkan.

## 10. Conflicts

Jika source memberikan informasi berbeda:

| Field | Source A | Source B | Conflict | Resolution |
|---|---|---|---|---|
| | | | | |

Resolution harus berdasarkan evidence.

Jika conflict belum dapat diselesaikan, status tetap unresolved dan downstream yang bergantung padanya dapat diblok.

## 11. Product Truth Lock

Setelah Product Truth disetujui:
- identity fields menjadi locked
- verified facts menjadi authoritative
- downstream stages wajib mengikuti truth
- changes harus melalui revision

Perubahan Product Truth dapat menyebabkan downstream stage menjadi STALE sesuai dependency rules.

## 12. Source Traceability

Gunakan Source ID dari `PRODUCT.md`.

Recommended record:

| Source ID | Field / Claim | Evidence | Status | Notes |
|---|---|---|---|---|
| | | | | |

Source traceability membantu mencegah claim drift.

## 13. Downstream Usage

Product Truth digunakan oleh:

PRODUCT TRUTH
→ CONTENT STRATEGY
→ SCRIPT
→ STORYBOARD
→ PRODUCT STATE
→ PRODUCTION SPEC
→ IMAGE PROMPT
→ VIDEO PROMPT

Downstream output tidak menjadi source baru untuk Product Truth.

## 14. Change Rules

Product Truth hanya boleh berubah jika:
- source baru memberikan evidence
- user memberikan explicit correction
- existing information terbukti salah
- commercial information mendapat current update

Setiap perubahan harus mencatat:
- Previous Value
- New Value
- Reason
- Source
- Changed At
- Affected Downstream Stages

## 15. Failure Behavior

Jika Product Truth belum cukup untuk melanjutkan:
- mark missing information
- identify required evidence
- block dependent decision if necessary
- do not invent a replacement

Pipeline yang berhenti karena fakta belum tersedia lebih aman daripada pipeline yang selesai dengan fakta palsu.

## 16. Non-Negotiable Rules

1. Product Truth adalah authoritative source untuk product facts.
2. Product Identity berbeda dari Product State.
3. Identity tidak boleh drift.
4. State dapat berubah melalui logical transition.
5. Claims harus traceable ke source.
6. Unsupported claims tidak boleh menjadi factual output.
7. Commercial information harus diperlakukan sebagai volatile.
8. UNKNOWN tetap UNKNOWN sampai evidence tersedia.
9. Conflict tidak boleh diselesaikan dengan tebakan.
10. Downstream generation tidak dapat menulis ulang Product Truth.
11. Perubahan harus melalui revision dan dependency handling.
12. Product Truth harus diprioritaskan di atas visual plausibility.