# AFFILIX — Claim Rules

Dokumen ini mendefinisikan aturan global untuk klaim dalam produksi UGC AFFILIX.

Claim Rules adalah **knowledge/policy layer**, bukan stage pipeline terpisah.

## 1. Prinsip Utama

> **No Source → No Claim**

AFFILIX hanya boleh menyampaikan klaim yang memiliki dasar dari Product Truth atau sumber yang secara eksplisit ditetapkan sebagai sumber terpercaya untuk project.

Jika sebuah informasi tidak tersedia, jangan mengubah asumsi menjadi fakta.

Gunakan:

**UNKNOWN / UNVERIFIED**

## 2. Product Truth sebagai Sumber Utama

Semua klaim produk harus dapat ditelusuri ke:
- Product Truth
- sumber resmi produk
- sumber resmi brand
- sumber project yang telah ditetapkan
- data yang secara eksplisit diberikan user

Informasi dari output AI sebelumnya bukan Source of Truth.

## 3. Jenis Informasi

### VERIFIED
Informasi yang memiliki sumber yang cukup dan dapat digunakan sebagai fakta.

Contoh:
- nama produk
- variant
- ukuran
- bahan yang tercantum
- ingredient yang tercantum
- fitur yang dinyatakan brand
- harga pada source tertentu, dengan konteks waktu/source

### UNVERIFIED
Informasi ditemukan tetapi belum memiliki dasar yang cukup untuk dianggap fakta.

Tidak boleh dipresentasikan sebagai fakta final.

### UNKNOWN
Informasi tidak ditemukan atau tidak tersedia.

Jangan diisi dengan tebakan.

## 4. Dilarang Mengarang

AFFILIX tidak boleh mengarang:
- benefit produk
- spesifikasi
- material
- ukuran
- performa
- durability
- kualitas
- hasil penggunaan
- pengalaman pengguna
- testimonial
- clinical/medical claim
- safety claim
- before/after result
- technical capability
- comparative superiority

## 5. Bedakan Feature dan Benefit

### Feature
Sesuatu yang secara eksplisit dimiliki atau dinyatakan tentang produk.

### Benefit
Interpretasi tentang hasil atau keuntungan bagi pengguna.

Benefit hanya boleh digunakan jika sumber produk memang mendukungnya.

## 6. Bedakan Product Claim dan User Experience

Product Claim adalah pernyataan yang berasal dari brand atau sumber produk.

User Experience adalah pengalaman seseorang ketika menggunakan produk.

AFFILIX tidak boleh membuat pengalaman pengguna fiktif dan menyajikannya sebagai pengalaman nyata.

## 7. Testimonial dan Social Proof

Jangan membuat testimonial palsu.

Jangan membuat:
- kutipan pengguna fiktif
- rating fiktif
- jumlah pembeli fiktif
- review fiktif
- before/after fiktif
- klaim 'banyak orang suka' tanpa sumber

Jika menggunakan testimonial atau review, sumber harus dapat ditelusuri.

## 8. Medical dan Health Claims

Klaim kesehatan memerlukan kehati-hatian lebih tinggi.

Jangan mengubah klaim kosmetik, lifestyle, atau marketing menjadi klaim medis.

Hindari membuat klaim seperti menyembuhkan penyakit, mengobati kondisi medis, mencegah penyakit, menggantikan terapi, atau memberikan hasil medis tertentu, kecuali klaim tersebut memang memiliki dasar yang sesuai dan konteksnya jelas.

## 9. Comparative Claims

Klaim perbandingan harus memiliki dasar.

Hindari klaim absolut seperti 'paling bagus', 'nomor satu', 'terbaik', 'paling murah', atau 'lebih awet dari semua produk lain' kecuali terdapat sumber yang benar-benar mendukung konteks perbandingan tersebut.

Perbandingan harus menjelaskan: **dibandingkan dengan apa, berdasarkan parameter apa, dan berdasarkan sumber apa.**

## 10. Harga dan Commercial Information

Harga, diskon, stok, voucher, dan promosi bersifat dinamis.

Informasi tersebut harus diperlakukan sebagai **time-sensitive data**.

Jangan menganggap harga atau promosi lama sebagai kondisi saat ini.

## 11. Dialogue Safety

Dialogue harus tetap natural, tetapi naturalisasi bahasa tidak boleh menambahkan fakta baru.

## 12. Hook Safety

Hook boleh dramatis secara storytelling, tetapi tidak boleh memalsukan fakta produk.

Jangan membuat hook yang sengaja menciptakan klaim palsu hanya demi retention.

## 13. CTA Safety

CTA tidak boleh menjanjikan hasil yang tidak didukung.

CTA boleh mengarahkan user untuk melihat produk, membaca detail, mengecek harga, melihat variant, mempertimbangkan produk, atau mengunjungi halaman produk.

## 14. Missing Information Protocol

Jika data yang dibutuhkan tidak tersedia:
1. tandai sebagai **UNKNOWN**
2. jika ditemukan tetapi belum cukup kuat, tandai **UNVERIFIED**
3. jangan mengisi dengan asumsi
4. jangan menyamarkan ketidakpastian melalui bahasa yang terdengar yakin
5. jika informasi tersebut merupakan dependency wajib, stage dapat menjadi **BLOCKED** atau **NEEDS_INPUT**

## 15. Traceability

Setiap klaim penting idealnya dapat ditelusuri:

**CLAIM → PRODUCT TRUTH → SOURCE**

Generated prompt bukan sumber untuk claim.

## 16. Rule of Least Claim

Jika sebuah kalimat dapat disampaikan tanpa menambahkan klaim yang tidak diperlukan, gunakan versi yang lebih aman.

Prioritas:

**verified fact > qualified statement > unknown**

bukan:

**complete-sounding statement > assumption**

AFFILIX lebih memilih output yang sedikit lebih sederhana daripada output lengkap yang berisi fakta buatan.

## 17. Non-Negotiable Rules

1. Jangan invent claim.
2. Jangan mengubah assumption menjadi fact.
3. Jangan membuat testimonial palsu.
4. Jangan membuat social proof palsu.
5. Jangan membuat medical claim tanpa dasar.
6. Jangan membuat comparative claim tanpa parameter dan sumber.
7. Jangan menganggap harga lama sebagai harga saat ini.
8. Jangan mengubah feature menjadi benefit secara otomatis.
9. Jangan menggunakan generated output sebagai Source of Truth.
10. Jika tidak tahu, gunakan **UNKNOWN / UNVERIFIED**.