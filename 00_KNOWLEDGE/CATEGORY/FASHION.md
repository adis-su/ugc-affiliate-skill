# AFFILIX — Fashion Category Knowledge

Fashion adalah category knowledge untuk produk dan konten yang berkaitan dengan pakaian, hijab, footwear, bags, accessories, jewelry, modest wear, dan fashion-related items.

Dokumen ini menyediakan **pattern dan considerations**, bukan Product Truth. Informasi spesifik product tetap berasal dari project Product Truth dan sumber yang tersedia.

## 1. Category Scope

Fashion dapat mencakup:
- clothing
- modest wear
- hijab
- footwear
- bags
- jewelry
- watches
- accessories
- fashion tools atau supporting products

Product dapat memiliki lebih dari satu category jika fungsi atau context-nya overlap.

## 2. Common Content Contexts

Fashion content sering menggunakan:
- try-on
- demonstration
- review
- comparison
- unboxing
- routine
- POV
- storytelling
- tutorial

Format dipilih berdasarkan Content Strategy.

## 3. Product Identity

Fashion product dapat memiliki identity-critical attributes seperti:
- brand
- product name
- model
- variant
- color
- pattern
- material jika diketahui
- silhouette
- cut
- construction
- logo
- hardware
- stitching details
- size
- configuration

Color, pattern, silhouette, dan major construction details harus konsisten.

## 4. Wear State

Fashion product memiliki state yang berbeda dari product identity.

Contoh:

**Garment**
- folded
- hanging
- held
- worn
- adjusted
- removed

**Bag**
- closed
- open
- held
- worn
- placed

**Footwear**
- unworn
- being worn
- worn

State dapat berubah melalui action.

Identity tidak berubah hanya karena state berubah.

## 5. Garment Continuity

Untuk clothing, continuity dapat mencakup:
- garment identity
- color
- pattern
- fit
- sleeve position
- neckline
- hem
- folds
- layering
- accessories

Jika garment memang berubah karena wardrobe transition, perubahan harus menjadi bagian dari timeline atau storyboard.

Jangan mengubah garment hanya karena generation drift.

## 6. Fit and Silhouette

Fit dapat terlihat berbeda karena:
- camera angle
- pose
- garment tension
- movement
- lighting
- lens perspective

Jangan mengubah visual observation menjadi factual size or fit claim tanpa dasar.

Jika ukuran tidak diketahui, jangan mengarang ukuran.

## 7. Hijab and Modest Fashion

Untuk hijab-related content, continuity dapat mencakup:
- hijab presence
- coverage
- color
- fabric appearance
- drape
- folds
- pin/accessory placement
- styling

Jika hijab merupakan permanent character attribute, hair must remain fully covered.

Hijab style/color dapat menjadi wardrobe styling jika tidak ditetapkan sebagai identity attribute.

## 8. Footwear

Footwear content membutuhkan perhatian pada:
- left/right shoe
- pair consistency
- orientation
- sole
- upper
- laces/closures
- worn state
- ground contact

Kesalahan umum adalah shoe orientation atau pair identity berubah antar-frame.

## 9. Bags and Accessories

Bag/accessory continuity dapat mencakup:
- strap configuration
- hardware
- closure
- orientation
- hand/shoulder position
- attachment
- contents if visible

Jika contents tidak diketahui, jangan mengarang isi tas.

## 10. Material Representation

Material dapat terlihat berbeda karena lighting dan rendering.

Jika material adalah Product Truth, representasikan secara konsisten.

Jika material tidak diketahui:
- jangan invent
- gunakan deskripsi visual yang netral
- tandai sebagai unknown jika dibutuhkan

Visual appearance tidak otomatis membuktikan material composition.

## 11. Color Continuity

Fashion sangat sensitif terhadap color drift.

Perhatikan:
- garment color
- pattern color
- accessory color
- hardware color
- background interaction

Lighting dapat mengubah perceived color.

Untuk direct comparison, lighting harus dikontrol agar perbedaan color tidak berasal dari setup.

## 12. Try-On and Outfit Content

Try-on dapat menggunakan struktur:

**BEFORE → INTRODUCE → WEAR → ADJUST → FULL LOOK → DETAIL → CONTEXT**

Jika menggunakan before/after:
- wardrobe state harus jelas
- transition harus masuk akal
- outfit elements harus trackable

Jangan membuat outfit berubah tanpa transition.

## 13. Character Identity

Fashion content sering menampilkan character secara penuh.

Pertahankan:
- face
- body identity
- visual age
- skin characteristics
- height/proportions jika menjadi project identity
- permanent attributes

Pose dan styling dapat berubah tanpa mengubah identity.

## 14. Camera and Framing

Useful fashion framing dapat mencakup:
- full-body
- three-quarter
- medium
- detail close-up
- mirror shot
- walking shot
- POV

Camera distance memengaruhi perceived silhouette.

Untuk comparison, gunakan framing yang comparable ketika objective-nya membandingkan visual appearance.

## 15. Movement and Fabric

Naturalization dapat memperlihatkan:
- natural fabric movement
- walking motion
- garment folds
- hand adjustment
- strap movement
- realistic weight shift

Movement tidak boleh membuat material, silhouette, atau construction berubah secara implausible.

## 16. Product Interaction

Fashion interaction dapat berupa:
- picking up
- unfolding
- wearing
- adjusting
- fastening
- carrying
- walking
- rotating for display

Setiap interaction harus menghasilkan state yang konsisten.

Contoh:

**Garment FOLDED → PICKED UP → UNFOLDED → WORN**

## 17. Size and Fit Claims

Claims seperti:
- "oversized"
- "slim fit"
- "true to size"
- "one size"
- "muat untuk..."
- "lebih panjang"

harus memiliki dasar yang sesuai.

Character appearance dalam generated content tidak boleh digunakan sebagai bukti ukuran produk jika measurement tidak diketahui.

## 18. Script Pattern

Fashion script dapat menggunakan:

```text
HOOK
CONTEXT
PRODUCT INTRO
LOOK / WEAR SETUP
KEY DETAILS
USE / MOVEMENT
OBSERVATION
CTA
```

Dialogue harus membedakan:
- product facts
- visual observations
- personal preference

## 19. Storyboard Pattern

Storyboard dapat mendefinisikan:
- wardrobe state
- product state
- character pose
- camera
- environment
- movement
- detail shot
- transition

Jika outfit continuity penting, reference harus dibuat pada state wardrobe yang stabil.

## 20. Reference System

Reference State harus menjaga:
- character identity
- outfit identity
- product identity
- garment state
- accessory state
- camera
- environment
- spatial relationship

Wardrobe changes membutuhkan reference baru jika downstream scene bergantung pada outfit baru.

## 21. Common Category Failure Modes

### Color Drift
Warna garment atau accessory berubah.

### Pattern Drift
Pattern, print, atau logo berubah.

### Garment Morphing
Cut, sleeve, hem, atau silhouette berubah.

### Wrong Wear State
Garment tiba-tiba sudah dipakai atau dilepas tanpa transition.

### Pair Mismatch
Footwear kiri/kanan atau pasangan tidak konsisten.

### Accessory Teleportation
Bag, jewelry, hijab accessory, atau hardware berpindah tanpa action.

### Material Invention
Material composition dibuat-buat dari visual saja.

### Size Overclaim
Generated character digunakan sebagai bukti ukuran atau fit.

### Outfit Teleportation
Outfit berubah antar-scene tanpa wardrobe transition.

### Identity Drift
Character identity berubah karena generation variation.

## 22. Best Format Pairings

Fashion category sering cocok dengan:
- **Try-On / Demonstration:** menunjukkan wear state dan movement.
- **Review:** detail, fit context, dan observations.
- **Comparison:** color, silhouette, feature, atau variant differences.
- **Unboxing:** reveal garment/accessory.
- **POV:** shopping, wearing, or hands-on interaction.
- **Routine:** outfit preparation atau daily workflow.
- **Storytelling:** outfit sebagai bagian dari narrative.

Pemilihan format tetap ditentukan oleh Content Strategy.

## 23. Non-Negotiable Rules

1. Product Identity harus konsisten.
2. Color dan pattern harus konsisten.
3. Wardrobe state harus dapat dijelaskan.
4. Outfit changes harus memiliki transition.
5. Character Identity tidak boleh berubah.
6. Size/fit claims harus memiliki dasar.
7. Material tidak boleh diinvent.
8. Camera perspective harus diperhitungkan untuk fit dan silhouette.
9. Product State hanya berubah melalui logical interaction.
10. Permanent character attributes, termasuk hijab presence jika ditetapkan, harus tetap konsisten.
