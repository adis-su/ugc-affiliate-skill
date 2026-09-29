# AFFILIX — Product

Dokumen ini menyimpan informasi produk untuk project AFFILIX aktif.

## 1. Purpose

`PRODUCT.md` adalah **project input layer**.

Dokumen ini menyimpan informasi yang ditemukan atau diberikan tentang produk sebelum informasi tersebut diproses menjadi Product Truth.

Product information dapat berasal dari:
- product URL
- marketplace listing
- official product page
- seller information
- user-provided information
- product images
- product documents
- other identified sources

## 2. Product Record

Gunakan struktur berikut:

### Basic Information

- Product Name:
- Brand:
- Category:
- Subcategory:
- Variant:
- Model:
- SKU:
- Product URL:
- Official URL:
- Seller:
- Platform:

### Commercial Information

- Price:
- Currency:
- Discount:
- Promotion:
- Stock:
- Shipping:
- Bundle:
- Availability:
- Source Timestamp:

Commercial information adalah **volatile** dan harus memiliki source/timestamp jika digunakan dalam output.

### Physical Information

- Color:
- Shape:
- Size:
- Dimensions:
- Weight:
- Material:
- Packaging:
- Quantity:
- Capacity:
- Other Physical Details:

Physical information hanya boleh diisi jika didukung source.

### Functional Information

- Primary Function:
- Supported Use Cases:
- Features:
- Controls:
- Compatibility:
- Performance Information:
- Included Items:
- Usage Instructions:

Functional information harus dibedakan antara:
- documented fact
- seller claim
- user-provided information
- unverified information

### Safety-Relevant Information

- Warnings:
- Restrictions:
- Required Handling:
- Safety Information:
- Age Restrictions:
- Other Relevant Notes:

Safety information tidak boleh dibuat berdasarkan asumsi.

## 3. Source Registry

Setiap informasi penting sebaiknya dapat ditelusuri ke source.

| Field | Value |
|---|---|
| Source ID | |
| Source Type | |
| URL / Reference | |
| Retrieved At | |
| Information Obtained | |
| Reliability Context | |
| Notes | |

Source ID dapat digunakan ketika menghubungkan informasi dengan `PRODUCT-TRUTH.md`.

## 4. Evidence Status

Setiap informasi dapat diberi status:

### VERIFIED
Informasi didukung oleh source yang dapat diidentifikasi.

### USER-PROVIDED
Informasi diberikan langsung oleh user tetapi belum diverifikasi secara eksternal.

### SELLER-CLAIM
Informasi berasal dari klaim seller/listing.

### UNVERIFIED
Informasi ditemukan tetapi belum cukup kuat untuk diperlakukan sebagai fact.

### UNKNOWN
Informasi belum tersedia.

Status ini membantu mencegah informasi yang lemah berubah menjadi Product Truth tanpa dasar.

## 5. Product Images

Jika product images tersedia, catat:

- Image ID:
- Source:
- Visible Product:
- Variant:
- Packaging State:
- Visible Details:
- Camera/View:
- Notes:

Product image dapat digunakan sebagai visual reference, tetapi tidak otomatis membuktikan informasi yang tidak terlihat.

## 6. Product Identity Candidates

Catat detail yang berpotensi menjadi Product Identity:

- brand
- product name
- variant
- model
- shape
- color
- packaging
- material
- logo
- label
- physical construction
- distinctive visual details

Detail tersebut harus dipromosikan ke Product Truth hanya setelah evidence cukup.

## 7. Product State Candidates

Catat kondisi produk yang terlihat atau didokumentasikan:

- open / closed
- sealed / unsealed
- held / placed
- active / inactive
- assembled / disassembled
- visible / partially obscured
- quantity
- orientation
- location

Product State dapat berubah selama storytelling. Product Identity tidak.

## 8. Claim Inventory

Pisahkan setiap claim yang ditemukan.

| Claim | Source | Status | Safe to Use |
|---|---|---|---|
| | | | |

Claim yang belum didukung tidak boleh diteruskan sebagai factual product claim.

## 9. Unknowns

Catat informasi yang belum diketahui:

- Unknown:
- Why Unknown:
- Required Source:
- Impact on Production:

Unknown harus tetap menjadi unknown.

Jangan mengisi gap dengan tebakan.

## 10. Change Tracking

Jika source produk berubah:

- Previous Value:
- New Value:
- Source:
- Changed At:
- Affected Fields:
- Impact:

Perubahan pada Product information harus ditinjau terhadap downstream Product Truth dan production outputs.

## 11. Boundary with Product Truth

`PRODUCT.md` adalah **collected product information**.

`PRODUCT-TRUTH.md` adalah **authoritative project truth**.

Alurnya:

PRODUCT SOURCES
→ PRODUCT.md
→ PRODUCT TRUTH
→ downstream production stages

Informasi downstream tidak boleh menulis ulang Product Truth hanya karena generation menghasilkan visual berbeda.

## 12. Missing Data Behavior

Jika informasi wajib belum tersedia:
- tandai sebagai UNKNOWN
- identifikasi source yang diperlukan
- block bagian downstream yang bergantung pada informasi tersebut jika diperlukan

Jangan invent information hanya untuk membuat pipeline terlihat selesai.

## 13. Non-Negotiable Rules

1. Product information harus memiliki source atau status yang jelas.
2. Commercial information harus dianggap volatile.
3. Product Identity harus dipisahkan dari Product State.
4. Seller claims tidak otomatis menjadi verified facts.
5. User-provided information harus diberi status yang sesuai.
6. Unknown tetap unknown sampai ada evidence.
7. Product images tidak otomatis membuktikan invisible properties.
8. Unsupported claims tidak boleh diteruskan ke script atau prompt.
9. Downstream generation tidak mengubah Product Truth.
10. Perubahan product information harus dapat ditelusuri.